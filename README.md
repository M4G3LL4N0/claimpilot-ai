# ClaimPilot AI

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/hero-reduced.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/hero-light.svg">
    <img src="assets/hero/hero-motion.svg" alt="ClaimPilot AI — animated project plate showing capital &rarr; allocate &rarr; mark &rarr; settle. Motion depicts this project's real state transition." width="100%">
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-reduced-motion: reduce)" srcset="assets/hero/computational-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/hero/computational-light.svg">
    <img src="assets/hero/computational-motion.svg" alt="State machine: capital &rarr; allocate &rarr; mark &rarr; settle." width="100%">
  </picture>
</p>

AI-native insurance brokerage MVP for SMB policy matching, quote comparison, renewal planning, and broker actioning.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Prisma + SQLite
- pnpm

## Routes
- `/` product overview
- `/intake` interactive insurance intake demo
- `/dashboard` renewal calendar dashboard
- `/dashboard/runs/[id]` run detail
- `/pricing` SMB insurance pricing

## Commands
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm db:push`
