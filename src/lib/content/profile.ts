import type { CareerMilestone, Profile } from "@/types/game";

export const PROFILE = {
  name: "Oleksandr Obramenko",
  role: "Senior Frontend Engineer",
  tagline:
    "I build high-performance, AI-native web platforms with React, Angular, and agentic tooling.",
  summary:
    "8+ years across the modern web stack, with deep expertise in Angular 17–21, React, TypeScript, and performance engineering. I design complex, scalable single-page applications, lead architecture decisions, and ship production-grade interfaces for biopharma, payroll, and insurance domains.",
  contact: {
    email: "obram22@gmail.com",
    phone: "+380996647007",
    linkedin: "https://www.linkedin.com/in/oleksandr-obramenko-a3a781102",
  },
  skillGroups: [
    {
      label: "Frontend core",
      skills: [
        "TypeScript",
        "React 19",
        "Next.js",
        "Angular 17–21",
        "Angular Signals",
        "RxJS",
        "HTML5",
        "CSS3 / SCSS",
        "Tailwind CSS",
      ],
    },
    {
      label: "State & data",
      skills: [
        "Zustand",
        "TanStack Query",
        "Angular Signal Store",
        "NgRx",
        "Redux Toolkit",
        "Jotai",
        "Recoil",
        "Apollo Client",
        "GraphQL",
        "REST",
      ],
    },
    {
      label: "AI-native engineering",
      skills: [
        "MCP",
        "AI Agents",
        "GitHub Copilot",
        "Prompt Engineering",
        "Token Budgeting",
        "Model Selection",
        "agents.md",
      ],
    },
    {
      label: "Visualisation & GIS",
      skills: [
        "Apache ECharts",
        "GoJS",
        "Escher",
        "MapBox",
        "PrimeNG",
        "Data Visualisation",
      ],
    },
    {
      label: "Architecture & delivery",
      skills: [
        "Micro Frontends",
        "Nx Monorepo",
        "Server Components",
        "Core Web Vitals",
        "Azure DevOps",
        "CI / CD",
        "Code Review",
        "Mentorship",
      ],
    },
    {
      label: "Testing",
      skills: [
        "React Testing Library",
        "Jest",
        "Cypress",
        "Jasmine",
        "Karma",
        "Unit Testing",
        "Integration Testing",
      ],
    },
  ],
} satisfies Profile;

export const CAREER_MILESTONES = [
  {
    company: "Insilico",
    role: "Senior JavaScript Engineer",
    period: "11/2025 – 08/2026",
    summary:
      "Architected biopharma frontends with Nx, Angular 17–21, and Signal Store; embedded React / Next.js dashboard modules and shipped GoJS, Escher, and ECharts visualisation workflows.",
    highlights: [
      "Embedded React and Next.js dashboard modules into the Angular/Nx biopharma platform.",
      "Built interactive biological flux maps with Escher.",
      "Rendered canvas-based domain workflows with GoJS.",
      "Standardised AI-assisted engineering with custom agents, hooks, and prompt engineering.",
      "Optimised LLM token budgets and model selection against delivery constraints.",
    ],
  },
  {
    company: "Strada",
    role: "Senior Frontend Software Engineer",
    period: "03/2023 – 10/2025",
    summary:
      "Delivered payroll applications inside a microservices architecture, secured role-based access with Identity and JWT, and modernised Angular with Signals and standalone components.",
    highlights: [
      "Engineered reusable web components, modules, and services.",
      "Integrated Signals, Signal Store, and standalone components.",
      "Reviewed PRs and supported Azure DevOps releases.",
      "Optimised architecture for scalability and reliability.",
    ],
  },
  {
    company: "Swiss Re",
    role: "Senior Frontend Software Engineer",
    period: "09/2022 – 12/2022",
    summary:
      "Owned MapBox disaster-analysis tooling, NgRx state, and Nx shared libraries while driving a 2x UI performance improvement.",
    highlights: [
      "Built drawing tools, custom map styles, location-set uploads, and Excel/PDF exports.",
      "Achieved over 2x UI speed improvements through architecture tuning.",
      "Integrated Stripe and Google Play Billing.",
      "Mentored junior developers and authored technical specifications.",
    ],
  },
  {
    company: "Alight",
    role: "Frontend Software Engineer",
    period: "03/2021 – 09/2022",
    summary:
      "Built large Angular forms with real-time charts and SignalR updates, and introduced Angular SSR for performance and SEO.",
    highlights: [
      "Implemented Angular Server-Side Rendering.",
      "Delivered modular components, modules, and services.",
      "Optimised application architecture for evolving requirements.",
    ],
  },
  {
    company: "NGA HR",
    role: "Frontend Software Engineer",
    period: "11/2020 – 03/2021",
    summary:
      "Developed Angular features, maintained application architecture, and supported Azure DevOps pipelines, releases, and technical interviews.",
    highlights: [
      "Maintained scalable Angular module architecture.",
      "Configured CI/CD pipelines and release tags.",
      "Interviewed candidates for technical roles.",
    ],
  },
  {
    company: "MyCredit",
    role: "Frontend Software Engineer",
    period: "11/2018 – 11/2020",
    summary:
      "Built and maintained an Angular 5–8 admin platform with Angular Material, reactive forms, RxJS, NgRx, and .NET-backed APIs.",
    highlights: [
      "Visualised business data for marketing dashboards.",
      "Integrated Facebook and third-party APIs.",
      "Mentored junior developers.",
    ],
  },
] satisfies readonly CareerMilestone[];
