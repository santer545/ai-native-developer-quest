import { QUEST_IDS, SESSION_SIZE } from "@/types/game";
import type { QuestDefinition, QuestId } from "@/types/game";

export const QUESTS = [
  {
    id: "biopharm-mcp",
    level: 1,
    hue: "#5fb3a3",
    title: "The runaway AI bill",
    company: "Insilico",
    role: "Senior JavaScript Engineer",
    period: "11/2025 – 08/2026",
    domain: "Biopharmaceutical data visualisation",
    scenario: {
      kind: "screening",
      scenario:
        "A biopharma dashboard used an AI agent to build biological maps. The AI bill kept climbing and the pages got slow. The team was stuck.",
      ask: "What would you ask a senior engineer to focus on first?",
      options: [
        {
          id: "cut-cost",
          label: "Cut the cost without losing the feature.",
        },
        {
          id: "rethink-ai",
          label: "Rethink whether AI is even the right tool.",
        },
        {
          id: "ship-now",
          label: "Ship what works now and optimise later.",
        },
      ],
      reveal: {
        approach:
          "He chose lighter models, capped how many times the agent could call tools, and cached repeated diagrams.",
        outcome:
          "Kept the live biological maps while cutting agent execution costs.",
        signal: "Cost-aware AI engineering",
      },
      technicalDetail:
        "Model selection and token-budget strategy across MCP tool calls, on Nx monorepo frontends with Angular 17–21, React/Next.js dashboard modules, and ECharts / Escher / GoJS visualisations.",
    },
    proof: "Cut agent execution costs through model selection and token-budget strategy.",
    pitchLine:
      "Cost-aware AI engineering — kept live biopharma maps while cutting agent execution costs.",
    achievements: [
      "Architected Nx monorepo frontends with Angular 17–21 and Angular Signal Store.",
      "Embedded React / Next.js dashboard modules alongside the Angular micro-frontends.",
      "Rendered interactive canvas workflows with GoJS.",
      "Built biological flux-map visualisations with Escher.",
      "Shipped comparison dashboards with Apache ECharts and PrimeNG.",
      "Cut agent execution costs through model selection and token-budget strategy.",
    ],
    stack: [
      "MCP",
      "AI Agents",
      "Angular 21",
      "Signal Store",
      "React 19",
      "Next.js",
      "GoJS",
      "Escher",
      "ECharts",
      "Nx",
    ],
  },
  {
    id: "payroll-modernization",
    level: 2,
    hue: "#6b8cff",
    title: "Modernise without breaking payroll",
    company: "Strada",
    role: "Senior Frontend Software Engineer",
    period: "03/2023 – 10/2025",
    domain: "Global payroll microservices",
    scenario: {
      kind: "screening",
      scenario:
        "A global payroll product ran on aging Angular screens. The business wanted modern React pages — but payroll and logins could not break.",
      ask: "What is the priority for a migration like this?",
      options: [
        {
          id: "zero-disruption",
          label: "Zero disruption to payroll.",
        },
        {
          id: "modernise-fast",
          label: "Modernise as fast as possible.",
        },
        {
          id: "protect-performance",
          label: "Protect speed and search ranking.",
        },
      ],
      reveal: {
        approach:
          "He migrated screens incrementally into React 19 server-rendered islands behind a clean state layer, without touching the authentication boundary.",
        outcome:
          "Modernised the product with zero payroll downtime and no performance regressions.",
        signal: "Safe, incremental modernisation",
      },
      technicalDetail:
        "React 19 SSR islands with a Zustand state slice alongside Angular Signals and Signal Store, inside a micro-frontend architecture secured with JWT and shipped via Azure DevOps.",
    },
    proof: "Migrated a payroll micro-frontend to React 19 SSR + Zustand with zero regressions.",
    pitchLine:
      "Safe, incremental modernisation — migrated payroll to React 19 with zero downtime and no regressions.",
    achievements: [
      "Designed payroll SPAs inside a microservices architecture.",
      "Secured role-based access with Identity service and JWT.",
      "Upgraded Angular apps to Signals, Signal Store, and standalone components.",
      "Customised reusable web components, modules, and services.",
      "Supported Azure DevOps pipelines, releases, and deployments.",
    ],
    stack: [
      "React 19",
      "Next.js",
      "Zustand",
      "Angular Signals",
      "Micro Frontends",
      "JWT",
      "Azure DevOps",
    ],
  },
  {
    id: "disaster-map",
    level: 3,
    hue: "#e0913f",
    title: "The map that gets slower every minute",
    company: "Swiss Re",
    role: "Senior Frontend Software Engineer",
    period: "09/2022 – 12/2022",
    domain: "Insurance risk & GIS",
    scenario: {
      kind: "screening",
      scenario:
        "An insurance disaster map got slower the longer analysts used it. Lag and crashes were hurting real risk decisions.",
      ask: "Where would you point the engineer?",
      options: [
        {
          id: "make-fast",
          label: "Make it fast and stable.",
        },
        {
          id: "add-features",
          label: "Add more features.",
        },
        {
          id: "rebuild",
          label: "Rebuild it from scratch.",
        },
      ],
      reveal: {
        approach:
          "He found and fixed memory leaks, tuned the render path, and trimmed wasted work.",
        outcome:
          "More than doubled UI speed so analysts could work on live risk data without waiting.",
        signal: "Performance rescue under pressure",
      },
      technicalDetail:
        "MapBox disaster-analysis tooling with Angular, NgRx, and Nx shared libraries; render-path tuning and leak fixes delivered a 2x UI speedup.",
    },
    proof: "Achieved 2x UI speedup through architecture tuning.",
    pitchLine:
      "Performance rescue — more than doubled UI speed on an insurance risk map.",
    achievements: [
      "Built MapBox disaster-analysis tools with drawing, custom styles, uploads, and Excel/PDF export.",
      "Modelled shared state with Angular, NgRx, and Nx libraries.",
      "Achieved over 2x UI speed improvements through architecture tuning.",
      "Integrated Stripe and Google Play Billing; mentored junior developers.",
    ],
    stack: [
      "MapBox",
      "Angular",
      "NgRx",
      "Nx",
      "Web Performance",
      "Stripe",
    ],
  },
  {
    id: "benefits-ssr",
    level: 4,
    hue: "#a884ff",
    title: "The page search engines never saw",
    company: "Alight",
    role: "Frontend Software Engineer",
    period: "03/2021 – 09/2022",
    domain: "Employee benefits platform",
    scenario: {
      kind: "screening",
      scenario:
        "A benefits platform rendered everything in the browser. The first screen stayed blank for seconds and search engines saw almost nothing.",
      ask: "What should the team prioritise?",
      options: [
        {
          id: "server-first",
          label: "Render the first screen on the server.",
        },
        {
          id: "client-heavy",
          label: "Push even more work to the browser.",
        },
        {
          id: "redesign",
          label: "Redesign the visuals first.",
        },
      ],
      reveal: {
        approach:
          "He introduced Angular server-side rendering so real HTML reached the browser and crawlers immediately, keeping the interactive app underneath.",
        outcome:
          "Faster first paint and pages search engines could actually index.",
        signal: "Performance & discoverability",
      },
      technicalDetail:
        "Angular Universal SSR on a benefits platform with large reactive forms, SignalR real-time updates, and modular SCSS theming.",
    },
    proof: "Introduced Angular server-side rendering for first-paint speed and SEO.",
    pitchLine:
      "Performance & discoverability — added server-side rendering so a heavy app loaded fast and got indexed.",
    achievements: [
      "Implemented Angular Server-Side Rendering.",
      "Built large reactive forms with real-time SignalR updates.",
      "Delivered modular components, modules, and services.",
      "Optimised application architecture for evolving requirements.",
    ],
    stack: [
      "Angular",
      "Angular Universal (SSR)",
      "RxJS",
      "SignalR",
      "SCSS",
    ],
  },
  {
    id: "release-pipeline",
    level: 5,
    hue: "#4bb98a",
    title: "The release everyone dreaded",
    company: "NGA HR",
    role: "Frontend Software Engineer",
    period: "11/2020 – 03/2021",
    domain: "HR & payroll software",
    scenario: {
      kind: "screening",
      scenario:
        "Releases were done by hand. Every deploy was risky, slow, and stressful, and the team quietly avoided shipping.",
      ask: "Where would you invest first?",
      options: [
        {
          id: "automate",
          label: "Automate the release pipeline.",
        },
        {
          id: "more-checks",
          label: "Add more manual checks.",
        },
        {
          id: "freeze",
          label: "Freeze releases until it settles.",
        },
      ],
      reveal: {
        approach:
          "He set up Azure DevOps pipelines with release tags and clear review gates, so shipping became repeatable instead of heroic.",
        outcome: "Predictable, low-stress releases the whole team could trust.",
        signal: "Reliable delivery",
      },
      technicalDetail:
        "Azure DevOps build and release pipelines, release tagging, and a modular Angular architecture backed by peer code review.",
    },
    proof: "Automated CI/CD with Azure DevOps pipelines and release tags.",
    pitchLine:
      "Reliable delivery — automated CI/CD so the team shipped safely and often.",
    achievements: [
      "Configured CI/CD pipelines and release tags.",
      "Maintained scalable Angular module architecture.",
      "Supported releases and deployments.",
      "Interviewed candidates for technical roles.",
    ],
    stack: ["Azure DevOps", "CI/CD", "Angular", "Git", "Code Review"],
  },
  {
    id: "admin-refactor",
    level: 6,
    hue: "#d9a441",
    title: "The admin tool only one person dared to change",
    company: "MyCredit",
    role: "Frontend Software Engineer",
    period: "11/2018 – 11/2020",
    domain: "Fintech admin platform",
    scenario: {
      kind: "screening",
      scenario:
        "A lending admin tool had grown tangled. Only one developer could safely change it, and every new feature risked breaking three others.",
      ask: "What is the first move?",
      options: [
        {
          id: "refactor",
          label: "Refactor into clear modules and add tests.",
        },
        {
          id: "patch",
          label: "Keep patching features quickly.",
        },
        {
          id: "rewrite",
          label: "Rewrite the whole thing from scratch.",
        },
      ],
      reveal: {
        approach:
          "He broke the app into modular, tested pieces with shared components and reactive forms, then mentored the team so the knowledge was shared, not hoarded.",
        outcome: "A codebase the whole team could extend safely and quickly.",
        signal: "Maintainable architecture & mentorship",
      },
      technicalDetail:
        "Angular admin platform with Angular Material, reactive forms, RxJS, and NgRx over .NET-backed APIs.",
    },
    proof: "Rebuilt a tangled admin app into a modular, tested Angular platform.",
    pitchLine:
      "Maintainable foundations — turned a fragile admin tool into a modular, well-tested platform.",
    achievements: [
      "Built an Angular admin platform with Angular Material and reactive forms.",
      "Managed state with RxJS and NgRx over .NET-backed APIs.",
      "Visualised business data for marketing dashboards.",
      "Integrated Facebook and third-party APIs.",
      "Mentored junior developers.",
    ],
    stack: [
      "Angular",
      "Angular Material",
      "RxJS",
      "NgRx",
      "Reactive Forms",
      ".NET",
    ],
  },
  {
    id: "ai-standards",
    level: 7,
    hue: "#5fb3a3",
    title: "Every developer used AI differently",
    company: "Insilico",
    role: "Senior JavaScript Engineer",
    period: "11/2025 – 08/2026",
    domain: "Biopharmaceutical data visualisation",
    scenario: {
      kind: "screening",
      scenario:
        "The team leaned on AI assistants, but every developer used them differently. Code style drifted, effort was duplicated, and nobody fully trusted the output.",
      ask: "How would you bring consistency?",
      options: [
        {
          id: "standardise",
          label: "Define shared AI rules and agents.",
        },
        {
          id: "ban",
          label: "Ban AI tools on the team.",
        },
        {
          id: "free-for-all",
          label: "Let each developer decide.",
        },
      ],
      reveal: {
        approach:
          "He standardised AI-assisted engineering with custom agents, hooks, and a shared agents.md of conventions, so the tools produced code the team actually wanted.",
        outcome:
          "Consistent, reviewable AI-assisted code across the whole team.",
        signal: "AI-native engineering practices",
      },
      technicalDetail:
        "Custom Copilot agents and hooks, an agents.md of team conventions, and prompt engineering tuned to an Nx monorepo of Angular and React modules.",
    },
    proof: "Standardised AI-assisted engineering with custom agents, hooks, and prompt engineering.",
    pitchLine:
      "AI-native practices — standardised agent workflows so the whole team shipped consistently.",
    achievements: [
      "Standardised AI-assisted engineering with custom agents, hooks, and prompt engineering.",
      "Defined shared team conventions in agents.md.",
      "Optimised LLM token budgets and model selection against delivery constraints.",
      "Architected Nx monorepo frontends with Angular 17–21 and Angular Signal Store.",
    ],
    stack: [
      "MCP",
      "AI Agents",
      "GitHub Copilot",
      "agents.md",
      "Prompt Engineering",
      "Nx",
    ],
  },
  {
    id: "security-lockdown",
    level: 8,
    hue: "#6b8cff",
    title: "The feature that failed security review",
    company: "Strada",
    role: "Senior Frontend Software Engineer",
    period: "03/2023 – 10/2025",
    domain: "Global payroll microservices",
    scenario: {
      kind: "screening",
      scenario:
        "A new payroll feature was blocked in security review. Roles and sessions were handled loosely, and the reviewers would not sign off.",
      ask: "What is the right first step?",
      options: [
        {
          id: "secure",
          label: "Lock down roles and tokens properly.",
        },
        {
          id: "bypass",
          label: "Ship it behind a flag anyway.",
        },
        {
          id: "rebuild-auth",
          label: "Rebuild the whole auth system.",
        },
      ],
      reveal: {
        approach:
          "He tightened role-based access with an Identity service and JWT, keeping a clean authentication boundary instead of bolting on checks.",
        outcome: "A secure feature that passed review and shipped on schedule.",
        signal: "Security-first delivery",
      },
      technicalDetail:
        "Role-based access control via an Identity service and JWT inside a payroll microservices architecture, with Angular micro-frontends on Azure DevOps.",
    },
    proof: "Secured role-based access with an Identity service and JWT.",
    pitchLine:
      "Security-first delivery — shipped payroll features behind solid role-based access and JWT.",
    achievements: [
      "Secured role-based access with an Identity service and JWT.",
      "Designed payroll SPAs inside a microservices architecture.",
      "Reviewed PRs and supported Azure DevOps releases.",
      "Optimised architecture for scalability and reliability.",
    ],
    stack: [
      "JWT",
      "RBAC",
      "Identity",
      "Angular",
      "Micro Frontends",
      "Azure DevOps",
    ],
  },
] satisfies readonly QuestDefinition[];

export function getQuestById(id: QuestId): QuestDefinition {
  const quest = QUESTS.find((candidate) => candidate.id === id);

  if (!quest) {
    throw new Error(`Unknown quest id: ${id}`);
  }

  return quest;
}

export function findQuestByInput(input: string): QuestDefinition | undefined {
  const normalised = input.trim().toLowerCase();

  return QUESTS.find(
    (quest) =>
      String(quest.level) === normalised ||
      quest.id === normalised ||
      `quest-${quest.level}` === normalised ||
      quest.title.toLowerCase() === normalised,
  );
}

export function pickSessionQuestIds(count: number = SESSION_SIZE): QuestId[] {
  const pool = [...QUEST_IDS];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = pool[index];
    const swap = pool[swapIndex];

    if (current === undefined || swap === undefined) {
      continue;
    }

    pool[index] = swap;
    pool[swapIndex] = current;
  }

  return pool.slice(0, count);
}
