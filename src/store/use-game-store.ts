import { create } from "zustand";

import { pickSessionQuestIds } from "@/lib/content/quests";
import {
  QUEST_IDS,
  SESSION_SIZE,
  type GameView,
  type MissionStep,
  type QuestId,
  type QuestStatus,
  type TerminalEntry,
  type TerminalEntryDraft,
} from "@/types/game";

export const QUEST_SCORE = 100;

const DEFAULT_SESSION_IDS: QuestId[] = QUEST_IDS.slice(0, SESSION_SIZE);

const INITIAL_TERMINAL_LOG = [
  {
    id: 1,
    tone: "system",
    text: "AI-NATIVE DEVELOPER QUEST v3.1",
  },
  {
    id: 2,
    tone: "system",
    text: "Candidate profile loaded: Oleksandr Obramenko. Screening session ready.",
  },
  {
    id: 3,
    tone: "output",
    text: "Review the three scenarios to unlock the full profile and a ready-to-forward pitch.",
  },
] as const satisfies readonly TerminalEntry[];

function createCompletionMap(
  ids: readonly QuestId[],
  value: boolean,
): Record<QuestId, boolean> {
  const completion = {} as Record<QuestId, boolean>;

  for (const questId of QUEST_IDS) {
    completion[questId] = ids.includes(questId) ? value : false;
  }

  return completion;
}

function deriveQuestStatus(
  ids: readonly QuestId[],
  completed: Readonly<Record<QuestId, boolean>>,
  activeLevel: QuestId | null,
): Record<QuestId, QuestStatus> {
  const status = {} as Record<QuestId, QuestStatus>;

  for (const questId of QUEST_IDS) {
    status[questId] = "locked";
  }

  let previousReviewed = true;

  for (const questId of ids) {
    if (completed[questId]) {
      status[questId] = "solved";
    } else if (activeLevel === questId) {
      status[questId] = "active";
    } else if (previousReviewed) {
      status[questId] = "available";
    } else {
      status[questId] = "locked";
    }

    previousReviewed = previousReviewed && completed[questId];
  }

  return status;
}

function firstUnreviewed(
  ids: readonly QuestId[],
  completed: Readonly<Record<QuestId, boolean>>,
): QuestId | null {
  return ids.find((questId) => !completed[questId]) ?? null;
}

function createInitialTerminalLog(): TerminalEntry[] {
  return INITIAL_TERMINAL_LOG.map((entry) => ({ ...entry }));
}

function buildSessionState(sessionQuestIds: QuestId[]) {
  const completedQuests = createCompletionMap(sessionQuestIds, false);
  const activeLevel = sessionQuestIds[0] ?? null;

  return {
    view: "play" as GameView,
    sessionQuestIds,
    activeLevel,
    step: "scenario" as MissionStep,
    completedQuests,
    questStatus: deriveQuestStatus(sessionQuestIds, completedQuests, activeLevel),
    unlockedProofs: [] as QuestId[],
    selectedOptionId: null,
    score: 0,
    consoleOpen: false,
    terminalLog: createInitialTerminalLog(),
    nextEntryId: INITIAL_TERMINAL_LOG.length + 1,
  };
}

export interface GameStore {
  view: GameView;
  sessionQuestIds: QuestId[];
  activeLevel: QuestId | null;
  step: MissionStep;
  completedQuests: Record<QuestId, boolean>;
  questStatus: Record<QuestId, QuestStatus>;
  unlockedProofs: QuestId[];
  selectedOptionId: string | null;
  score: number;
  consoleOpen: boolean;
  terminalLog: TerminalEntry[];
  nextEntryId: number;

  startQuest: (questId: QuestId) => void;
  beginCall: () => void;
  selectOption: (optionId: string) => void;
  submitCall: () => void;
  nextScenario: () => void;
  skipToOffer: () => void;
  reviewMissions: () => void;
  shuffleSession: () => void;
  toggleConsole: () => void;
  appendTerminalEntries: (entries: readonly TerminalEntryDraft[]) => void;
  clearTerminal: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  ...buildSessionState(DEFAULT_SESSION_IDS),

  startQuest: (questId) => {
    set((state) => {
      if (state.questStatus[questId] === "locked") {
        return state;
      }

      return {
        view: "play",
        activeLevel: questId,
        step: "scenario",
        selectedOptionId: null,
        questStatus: deriveQuestStatus(
          state.sessionQuestIds,
          state.completedQuests,
          questId,
        ),
      };
    });
  },

  beginCall: () => {
    set((state) => {
      if (!state.activeLevel) {
        return state;
      }

      return { step: "call", selectedOptionId: null };
    });
  },

  selectOption: (optionId) => {
    set({ selectedOptionId: optionId });
  },

  submitCall: () => {
    set((state) => {
      const { activeLevel, selectedOptionId } = state;

      if (!activeLevel || !selectedOptionId) {
        return state;
      }

      const alreadyReviewed = state.completedQuests[activeLevel];
      const completedQuests = alreadyReviewed
        ? state.completedQuests
        : { ...state.completedQuests, [activeLevel]: true };
      const unlockedProofs =
        alreadyReviewed || state.unlockedProofs.includes(activeLevel)
          ? state.unlockedProofs
          : [...state.unlockedProofs, activeLevel];

      return {
        step: "reveal",
        completedQuests,
        unlockedProofs,
        score: alreadyReviewed ? state.score : state.score + QUEST_SCORE,
        questStatus: deriveQuestStatus(
          state.sessionQuestIds,
          completedQuests,
          activeLevel,
        ),
      };
    });
  },

  nextScenario: () => {
    set((state) => {
      const next = firstUnreviewed(state.sessionQuestIds, state.completedQuests);

      if (!next) {
        return {
          view: "offer",
          activeLevel: null,
          step: "scenario",
          selectedOptionId: null,
          questStatus: deriveQuestStatus(
            state.sessionQuestIds,
            state.completedQuests,
            null,
          ),
        };
      }

      return {
        view: "play",
        activeLevel: next,
        step: "scenario",
        selectedOptionId: null,
        questStatus: deriveQuestStatus(
          state.sessionQuestIds,
          state.completedQuests,
          next,
        ),
      };
    });
  },

  skipToOffer: () => {
    set((state) => {
      const completedQuests = createCompletionMap(state.sessionQuestIds, true);
      const score = state.sessionQuestIds.length * QUEST_SCORE;

      return {
        view: "offer",
        activeLevel: null,
        step: "scenario",
        selectedOptionId: null,
        completedQuests,
        questStatus: deriveQuestStatus(
          state.sessionQuestIds,
          completedQuests,
          null,
        ),
        unlockedProofs: [...state.sessionQuestIds],
        score: Math.max(state.score, score),
      };
    });
  },

  reviewMissions: () => {
    set((state) => {
      const target =
        firstUnreviewed(state.sessionQuestIds, state.completedQuests) ??
        state.sessionQuestIds[0] ??
        null;

      return {
        view: "play",
        activeLevel: target,
        step: "scenario",
        selectedOptionId: null,
        questStatus: deriveQuestStatus(
          state.sessionQuestIds,
          state.completedQuests,
          target,
        ),
      };
    });
  },

  shuffleSession: () => {
    set(() => buildSessionState(pickSessionQuestIds()));
  },

  toggleConsole: () => {
    set((state) => ({ consoleOpen: !state.consoleOpen }));
  },

  appendTerminalEntries: (entries) => {
    if (entries.length === 0) {
      return;
    }

    set((state) => {
      let nextEntryId = state.nextEntryId;
      const appendedEntries = entries.map<TerminalEntry>((entry) => {
        const entryWithId: TerminalEntry = {
          ...entry,
          id: nextEntryId,
        };
        nextEntryId += 1;
        return entryWithId;
      });

      return {
        terminalLog: [...state.terminalLog, ...appendedEntries],
        nextEntryId,
      };
    });
  },

  clearTerminal: () => {
    set({ terminalLog: [] });
  },

  resetGame: () => {
    set(() => buildSessionState(pickSessionQuestIds()));
  },
}));
