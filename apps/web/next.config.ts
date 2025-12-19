import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@template-tauri-next-shadcn-monorepo/ui", "@template-tauri-next-shadcn-monorepo/shared"],
};

export default nextConfig;
