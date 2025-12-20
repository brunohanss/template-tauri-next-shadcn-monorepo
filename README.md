# Tauri + Next.js Monorepo Template (Empty Shell)

This repository is an **empty starter scaffold** for projects that need a **Tauri desktop app** and a **Next.js web app** sharing the same UI components.

It is **not a production-ready example** and does **not implement any real product logic**.  
Its purpose is to save me time whenn starting another project (from the initial setup and wiring work).

---

## What This Template Is

- A working monorepo shell  
- A known-good baseline where everything builds and runs  
- A starting point you can fork and customize for your own project  

---

## What This Template Is Not

- Not a finished app  
- Not an opinionated architecture for business logic  
- Not a polished example or reference implementation  

---

## The Key Value

**shadcn-style UI components are already shared between the desktop app and the web app — with zero extra configuration required.**

That means:

- No manual TypeScript path juggling  
- No Tailwind content glob debugging  
- No ESM/CommonJS mismatch fixes  
- No Vite or Next.js workspace hacks to “make it compile”  

You can import shared components immediately:

    import { Button } from "@template-tauri-next-shadcn-monorepo/ui";

…and they work in:

- The Tauri desktop app  
- The Next.js web app  

Out of the box.

---

## What’s Included

### Tauri v2 Desktop App
- React + Vite  
- Runs from the monorepo root  
- Correctly linked to shared UI  

### Next.js Web App
- Minimal setup  
- Ready for landing pages, docs, or downloads  
- Uses the same shared UI package  

### Shared Packages
- `ui` — React component library (shadcn-style, Tailwind)  
- `shared` — shared types and schemas (Zod)  
- `controller` — placeholder Node/TypeScript engine package  

### Monorepo Tooling
- Turborepo  
- npm workspaces  
- Single root lockfile  
- ESM-safe package builds  
