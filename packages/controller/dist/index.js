// src/index.ts
import { execa } from "execa";
import { RunProjectSchema } from "@template-tauri-next-shadcn-monorepo/shared";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import os from "os";
async function ensureDockerInstalled() {
  try {
    await execa("docker", ["version"], { stdout: "ignore", stderr: "ignore" });
    return { ok: true, message: "Docker is installed." };
  } catch {
    return { ok: false, message: "Docker not found." };
  }
}
function runtimeDirFor(projectPath) {
  const id = Buffer.from(projectPath).toString("base64url").slice(0, 16);
  return path.join(os.homedir(), ".template-tauri-next-shadcn-monorepo", "projects", id);
}
function composeYaml({ dbType }) {
  const dbService = dbType === "postgres" ? `
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: processbuddy
      POSTGRES_USER: processbuddy
      POSTGRES_DB: processbuddy
    volumes:
      - db_data:/var/lib/postgresql/data
` : dbType === "mongo" ? `
  db:
    image: mongo:7
    volumes:
      - db_data:/data/db
` : "";
  const dbVolumes = dbType === "sqlite" ? "" : "volumes:\n  db_data:\n";
  return `name: template-tauri-next-shadcn-monorepo
services:
  app:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - ./app:/app
    command: sh -lc "npm install && npm run dev"
    ports:
      - "3000:3000"
${dbService}
${dbVolumes}`;
}
async function writeCompose(input) {
  const parsed = RunProjectSchema.parse(input);
  const runtimeDir = runtimeDirFor(parsed.projectPath);
  await mkdir(runtimeDir, { recursive: true });
  await mkdir(path.join(runtimeDir, "app"), { recursive: true });
  await writeFile(path.join(runtimeDir, "docker-compose.yml"), composeYaml(parsed), "utf-8");
  return { runtimeDir };
}
async function up(runtimeDir) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "up", "-d"], { cwd: runtimeDir });
}
async function down(runtimeDir) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "down"], { cwd: runtimeDir });
}
function logsProcess(runtimeDir) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "logs", "-f", "--tail=200"], {
    cwd: runtimeDir
  });
}
export {
  down,
  ensureDockerInstalled,
  logsProcess,
  up,
  writeCompose
};
//# sourceMappingURL=index.js.map