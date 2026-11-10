import { create } from "zustand";

import {
  QUEST_IDS,
  type QuestId,
  type TerminalEntry,
  type TerminalEntryDraft,
} from "@/types/game";

export const QUEST_SCORE = 100;

const INITIAL_TERMINAL_LOG = [
  {
    id: 1,
    tone: "system",
    text: "AI-NATIVE DEVELOPER QUEST v1.0.0",
  },
  {
    id: 2,
    tone: "system",
    text: "Boot sequence complete. Candidate profile loaded: Oleksandr Obramenko.",
  },
  {
    id: 3,
    tone: "output",
    text: 'Type "help" for the command list, or tap a prompt pill to begin.',
  },
] as const satisfies readonly TerminalEntry[];

function createCompletionMap(value: boolean): Record<QuestId, boolean> {
  return QUEST_IDS.reduce<Record<QuestId, boolean>>(
    (completion, questId) => {
      completion[questId] = value;
      return completion;
    },
    {} as Record<QuestId, boolean>,
  );
}

function createInitialTerminalLog(): TerminalEntry[] {
  return INITIAL_TERMINAL_LOG.map((entry) => ({ ...entry }));
}

export interface GameStore {
  activeLevel: QuestId | null;
  completedQuests: Record<QuestId, boolean>;
  terminalLog: TerminalEntry[];
  score: number;
  fastPassEnabled: boolean;
  nextEntryId: number;
  setActiveLevel: (questId: QuestId | null) => void;
  completeQuest: (questId: QuestId) => void;
  completeAllQuests: () => void;
  activateFastPass: () => void;
  resetGame: () => void;
  appendTerminalEntries: (entries: readonly TerminalEntryDraft[]) => void;
  clearTerminal: () => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  activeLevel: null,
  completedQuests: createCompletionMap(false),
  terminalLog: createInitialTerminalLog(),
  score: 0,
  fastPassEnabled: false,
  nextEntryId: INITIAL_TERMINAL_LOG.length + 1,

  setActiveLevel: (questId) => {
    set({ activeLevel: questId });
  },

  completeQuest: (questId) => {
    set((state) => {
      if (state.completedQuests[questId]) {
        return state;
      }

      return {
        completedQuests: {
          ...state.completedQuests,
          [questId]: true,
        },
        score: state.score + QUEST_SCORE,
        activeLevel:
          state.activeLevel === questId ? null : state.activeLevel,
      };
    });
  },

  completeAllQuests: () => {
    set((state) => {
      const remainingQuests = QUEST_IDS.filter(
        (questId) => !state.completedQuests[questId],
      );

      if (remainingQuests.length === 0) {
        return state;
      }

      return {
        completedQuests: createCompletionMap(true),
        score: state.score + remainingQuests.length * QUEST_SCORE,
        activeLevel: null,
      };
    });
  },

  activateFastPass: () => {
    set((state) => {
      const remainingQuests = QUEST_IDS.filter(
        (questId) => !state.completedQuests[questId],
      );

      return {
        fastPassEnabled: true,
        completedQuests: createCompletionMap(true),
        score: state.score + remainingQuests.length * QUEST_SCORE,
        activeLevel: null,
      };
    });
  },

  resetGame: () => {
    set({
      activeLevel: null,
      completedQuests: createCompletionMap(false),
      terminalLog: createInitialTerminalLog(),
      score: 0,
      fastPassEnabled: false,
      nextEntryId: INITIAL_TERMINAL_LOG.length + 1,
    });
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
}));
