export const QUEST_IDS = [
  "biopharm-mcp",
  "payroll-modernization",
  "disaster-map",
] as const;

export type QuestId = (typeof QUEST_IDS)[number];

export interface QuestDefinition {
  readonly id: QuestId;
  readonly level: number;
  readonly title: string;
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly domain: string;
  readonly challenge: string;
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
  readonly fastPassEnabled: boolean;
  readonly activeLevel: QuestId | null;
}
