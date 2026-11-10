# AGENTS.md — React 19 & Next.js Project Guidelines

This document defines coding standards, architectural patterns, and engineering best practices for building scalable applications with React 19, Next.js (App Router), Zustand, and Tailwind CSS.

---

## 1. Tech Stack Summary

* **Framework**: React 19 & Next.js (App Router, TypeScript ONLY)
* **Styling**: Tailwind CSS (`clsx` + `tailwind-merge` via `cn` helper)
* **Client State**: Zustand (Slice Pattern with atomic selectors)
* **Server State**: TanStack Query v5 / Native React 19 Server Actions
* **Form & Validation**: React Hook Form + Zod

---

## 2. Core Architecture Rules (Feature-Driven Structure)

Organize code by isolated business domains inside `src/features/`.

```text
src/
├── app/                  # Next.js pages, layouts, global providers
├── components/           # Reusable atomic UI components (Button, Modal, Card)
├── features/             # Isolated domain modules
│   └── terminal/         # CLI & Terminal feature
│       ├── api/          # Commands & async handlers
│       ├── components/   # Terminal-specific UI
│       ├── store/        # Terminal Zustand slice
│       └── index.ts      # Public API export
├── hooks/                # Reusable custom hooks
├── lib/                  # 3rd party initializations (cn utility, query client)
├── store/                # Root Zustand store
└── types/                # Global TypeScript definitions
```

### Module Boundary Enforcement:
- Cross-feature imports MUST go through the feature's `index.ts` public API (e.g., `import { Terminal } from '@/features/terminal'`).
- Direct internal file imports across features are prohibited.

---

## 3. React 19 & Next.js Standards

1. **TypeScript Strictness**:
   - Zero `any` tolerance. Use `unknown`, generics, or explicit interfaces.

2. **React 19 Features**:
   - **Refs as Props**: Pass `ref` directly as a prop (`ref: React.Ref<HTMLDivElement>`). Do not use `forwardRef`.
   - **`use` Hook**: Use `use(Promise)` or `use(Context)` for async resource unwrapping.
   - **Form Actions**: Prefer native actions and `useActionState` / `useOptimistic` over manual state flags.
   - **`useEffect` Minimization**: Avoid using `useEffect` for state sync or computations that can be calculated during render.

3. **Zustand State Usage**:
   - Use atomic selectors to extract state and prevent unnecessary re-renders:
     ```typescript
     // GOOD
     const activeQuest = useGameStore((state) => state.activeQuest);
     const completeQuest = useGameStore((state) => state.completeQuest);

     // BAD
     const { activeQuest, completeQuest } = useGameStore();
     ```

4. **Tailwind Styling**:
   - Merge dynamic class names with `cn()`:
     ```typescript
     import { clsx, type ClassValue } from 'clsx';
     import { twMerge } from 'tailwind-merge';

     export function cn(...inputs: ClassValue[]) {
       return twMerge(clsx(inputs));
     }
     ```
   - For components with complex variants, use `class-variance-authority` (CVA).