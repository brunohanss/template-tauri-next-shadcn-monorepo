import { execa } from "execa";
import { RunProjectSchema, type RunProject } from "@template-tauri-next-shadcn-monorepo/shared";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

export async function ensureDockerInstalled(): Promise<{ ok: boolean; message: string }> {
  try {
    await execa("docker", ["version"], { stdout: "ignore", stderr: "ignore" });
    return { ok: true, message: "Docker is installed." };
  } catch {
    return { ok: false, message: "Docker not found." };
  }
}

function runtimeDirFor(projectPath: string) {
  const id = Buffer.from(projectPath).toString("base64url").slice(0, 16);
  return path.join(os.homedir(), ".template-tauri-next-shadcn-monorepo", "projects", id);
}

function composeYaml({ dbType }: RunProject) {
  // Minimal placeholder. You will refine Node app build/run later.
  const dbService =
    dbType === "postgres"
      ? `
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: processbuddy
      POSTGRES_USER: processbuddy
      POSTGRES_DB: processbuddy
    volumes:
      - db_data:/var/lib/postgresql/data
`
      : dbType === "mongo"
      ? `
  db:
    image: mongo:7
    volumes:
      - db_data:/data/db
`
      : "";

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

export async function writeCompose(input: unknown): Promise<{ runtimeDir: string }> {
  const parsed = RunProjectSchema.parse(input);
  const runtimeDir = runtimeDirFor(parsed.projectPath);
  await mkdir(runtimeDir, { recursive: true });
  await mkdir(path.join(runtimeDir, "app"), { recursive: true });
  // For MVP, we mount the user project into runtime/app by copying later (or symlink).
  // We'll keep this simple for now: user will choose a project that is already a Node app.
  await writeFile(path.join(runtimeDir, "docker-compose.yml"), composeYaml(parsed), "utf-8");
  return { runtimeDir };
}

export async function up(runtimeDir: string) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "up", "-d"], { cwd: runtimeDir });
}

export async function down(runtimeDir: string) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "down"], { cwd: runtimeDir });
}

export function logsProcess(runtimeDir: string) {
  return execa("docker", ["compose", "-f", "docker-compose.yml", "logs", "-f", "--tail=200"], {
    cwd: runtimeDir
  });
}
