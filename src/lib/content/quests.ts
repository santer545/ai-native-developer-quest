import type { QuestDefinition, QuestId } from "@/types/game";

export const QUESTS = [
  {
    id: "biopharm-mcp",
    level: 1,
    title: "BioPharm AI-Native Pipeline",
    company: "Insilico",
    role: "Senior JavaScript Engineer",
    period: "11/2025 – 08/2026",
    domain: "Biopharmaceutical data visualisation",
    challenge:
      "Tune MCP tool-calling parameters and token budgets so an agent can render interactive biological flux maps without exceeding cost limits.",
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
    title: "Payroll Modernisation",
    company: "Strada",
    role: "Senior Frontend Software Engineer",
    period: "03/2023 – 10/2025",
    domain: "Global payroll microservices",
    challenge:
      "Migrate legacy Angular payroll widgets into React 19 SSR islands backed by a Zustand slice — without breaking auth or Core Web Vitals.",
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
    title: "Disaster Analysis MapBox",
    company: "Swiss Re",
    role: "Senior Frontend Software Engineer",
    period: "09/2022 – 12/2022",
    domain: "Insurance risk & GIS",
    challenge:
      "Hunt down MapBox widget memory leaks and tune render paths until the disaster-analysis interface runs at least 2x faster.",
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
