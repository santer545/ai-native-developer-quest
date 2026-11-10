# PLAN.md — "The AI-Native Developer Quest" Interactive CV Roadmap

This document outlines the step-by-step plan for building an interactive developer portfolio game based on Oleksandr Obramenko's CV using React 19, Next.js App Router, Zustand, and Tailwind CSS.

---

## 🎯 Executive Summary & Goal

* **Target Audience**: Tech Leads, Engineering Managers, Technical Recruiters.
* **Format**: Retro-Modern Tech Dashboard & AI CLI Quest (2-minute interactive experience).
* **Core Value**: Showcases 8+ years of Senior Frontend experience, React 19 / Next.js fluency, Angular Signals knowledge, and AI-Native Agentic / MCP capabilities through playable scenarios based on real enterprise career milestones (Insilico, Strada, Swiss Re).
* **Deployment**: Vercel / GitHub Pages (Free Tier).

---

## 🧭 Architecture & Gameplay Breakdown

### 1. Retro CLI / AI Agent Terminal
- Interactive command-line prompt supporting commands like `help`, `inspect alex`, `run mcp-agent`, `skills`, `hire`.
- Preset prompt pills for non-technical recruiters to play with single clicks.

### 2. Interactive Quest Levels (Based on Oleksandr's CV)
- **Quest 1: BioPharm AI-Native MCP Pipeline (Insilico 2023–2025)**
  - *Challenge*: Configure Model Context Protocol (MCP) tool-calling parameters and token budget limits to render ECharts / Biological Flux Maps.
  - *Unlock*: Insilico Senior AI-Native Engineer achievements.
- **Quest 2: Modernization & Core Web Vitals (Strada 2023–2025)**
  - *Challenge*: Perform micro-frontend migration from legacy Angular components to React 19 SSR + Zustand state slice to drop LCP/FID by 50%.
  - *Unlock*: Strada enterprise payroll & micro-frontend achievements.
- **Quest 3: Disaster Analysis MapBox Optimization (Swiss Re 2022)**
  - *Challenge*: Fix dynamic map widget memory leaks and achieve 2x UI speedup.
  - *Unlock*: Swiss Re MapBox & GIS integration achievements.

### 3. Interactive Skill Tree & Victory Modal
- Live interactive tech tree (React 19, Next.js, Signals, MCP, Zustand, Vitest).
- Direct "Hire Oleksandr" trigger with contact details (Email, LinkedIn, Telegram).

---

## 🚀 Execution Phases

### Phase 1: Infrastructure & Tech Stack Setup
- [ ] Initialize Next.js (App Router, React 19, TypeScript strict mode).
- [ ] Setup Tailwind CSS, `clsx`, `tailwind-merge`, and `cva`.
- [ ] Build global game state using Zustand (`src/store/use-game-store.ts`) for unlocked quests, score, terminal history, and active level.
- [ ] Implement base layout with split screen: Left CLI Terminal, Right Interactive Canvas.

### Phase 2: Terminal Engine & Command Handler
- [ ] Create `Terminal` component with typewriter effect for outputs.
- [ ] Implement command parser:
  - `help` -> List all commands.
  - `inspect --experience` -> Output career overview.
  - `skills` -> Render visual skill badges.
  - `start-quest` -> Launch interactive minigame.
  - `hire` -> Open recruiter quick-contact dialog.

### Phase 3: Interactive Quests (Minigames)
- [ ] **Quest 1**: Tool & Prompt Orchestrator widget (MCP agent simulator).
- [ ] **Quest 2**: Drag-and-Drop / Toggle Migration UI (Angular to React 19 component refactoring).
- [ ] **Quest 3**: Performance Profiler widget (tweak slider settings to hit 60 FPS / 2x speedup).

### Phase 4: Sound, Polish & Easter Eggs
- [ ] Add subtle retro UI sound effects (Web Audio API / Howler.js).
- [ ] Implement "Recruiter Fast-Pass" button to immediately auto-solve quests and view summary.
- [ ] Add confetti celebration upon completing all quests.

### Phase 5: CI/CD & Deployment
- [ ] Configure `next.config.js` for standalone build or static export.
- [ ] Deploy to Vercel / GitHub Pages.
- [ ] Add link to GitHub repository README and LinkedIn header.