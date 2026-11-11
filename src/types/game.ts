export const QUEST_IDS = [
  "biopharm-mcp",
  "payroll-modernization",
  "disaster-map",
  "benefits-ssr",
  "release-pipeline",
  "admin-refactor",
  "ai-standards",
  "security-lockdown",
] as const;

export type QuestId = (typeof QUEST_IDS)[number];

export const SESSION_SIZE = 3;

export type QuestStatus = "locked" | "available" | "active" | "solved";

export type GameView = "play" | "offer";

export type MissionStep = "scenario" | "call" | "reveal";

export interface ScreeningOption {
  readonly id: string;
  readonly label: string;
}

export interface ScreeningReveal {
  readonly approach: string;
  readonly outcome: string;
  readonly signal: string;
}

export interface ScreeningScenario {
  readonly kind: "screening";
  readonly scenario: string;
  readonly ask: string;
  readonly options: readonly ScreeningOption[];
  readonly reveal: ScreeningReveal;
  readonly technicalDetail: string;
}

export interface QuestDefinition {
  readonly id: QuestId;
  readonly level: number;
  readonly hue: string;
  readonly title: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly domain: string;
  readonly scenario: ScreeningScenario;
  readonly proof: string;
  readonly pitchLine: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
}

export interface CareerMilestone {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
}

export interface SkillGroup {
  readonly label: string;
  readonly skills: readonly string[];
}

export interface ProfileContact {
  readonly email: string;
  readonly phone: string;
  readonly linkedin: string;
}

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly summary: string;
  readonly contact: ProfileContact;
  readonly skillGroups: readonly SkillGroup[];
}

export type TerminalTone =
  | "system"
  | "command"
  | "output"
  | "success"
  | "warning"
  | "error";

export interface TerminalEntry {
  readonly id: number;
  readonly tone: TerminalTone;
  readonly text: string;
  readonly badges?: readonly string[];
  readonly questIds?: readonly QuestId[];
}

export type TerminalEntryDraft = Omit<TerminalEntry, "id">;

export interface CommandSnapshot {
  readonly score: number;
  readonly completedQuests: Readonly<Record<QuestId, boolean>>;
  readonly activeLevel: QuestId | null;
  readonly view: GameView;
  readonly sessionQuestIds: readonly QuestId[];
}
