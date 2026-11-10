"use client";

import { Badge } from "@/components/ui/badge";
import { QUESTS, getQuestById } from "@/lib/content/quests";
import { QUEST_SCORE, useGameStore } from "@/store/use-game-store";
import type { QuestId } from "@/types/game";

import { QuestCard } from "./quest-card";

const CORE_STACK = [
  "React 19",
  "Next.js",
  "TypeScript",
  "Zustand",
  "Tailwind CSS",
  "Angular Signals",
  "MCP",
] as const;

export function QuestBoard() {
  const activeLevel = useGameStore((state) => state.activeLevel);
  const completedQuests = useGameStore((state) => state.completedQuests);
  const fastPassEnabled = useGameStore((state) => state.fastPassEnabled);
  const setActiveLevel = useGameStore((state) => state.setActiveLevel);
  const completeQuest = useGameStore((state) => state.completeQuest);
  const appendTerminalEntries = useGameStore(
    (state) => state.appendTerminalEntries,
  );

  const completedCount = QUESTS.filter(
    (quest) => completedQuests[quest.id],
  ).length;
  const progress = Math.round((completedCount / QUESTS.length) * 100);
  const activeQuest = activeLevel ? getQuestById(activeLevel) : null;

  const handleSelectQuest = (questId: QuestId) => {
    const quest = getQuestById(questId);

    setActiveLevel(questId);
    appendTerminalEntries([
      {
        tone: "success",
        text: `Level ${quest.level} active — ${quest.title}. Briefing is live in Mission Control.`,
      },
    ]);
  };

  const handleCompleteQuest = (questId: QuestId) => {
    const quest = getQuestById(questId);

    completeQuest(questId);
    appendTerminalEntries([
      {
        tone: "success",
        text: `+${QUEST_SCORE} XP — Level ${quest.level} ${quest.title} complete.`,
      },
    ]);
  };

  return (
    <aside
      id="quest-board"
      aria-label="Mission control quest map"
      className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 shadow-panel backdrop-blur lg:h-full"
    >
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Mission control
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-100">
              Enterprise quest map
            </h2>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Progress
            </p>
            <p className="font-mono text-sm text-neon-green">
              {completedCount}/{QUESTS.length}
            </p>
          </div>
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5"
          role="progressbar"
          aria-label="Quests completed"
          aria-valuemin={0}
          aria-valuemax={QUESTS.length}
          aria-valuenow={completedCount}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-cyan transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="scrollbar-terminal flex-1 space-y-3 overflow-y-auto p-4">
        {fastPassEnabled ? (
          <div className="rounded-lg border border-neon-green/25 bg-neon-green/[0.06] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neon-green">
              Fast-pass complete
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-300">
              All mission briefings are resolved at full XP. Use the terminal
              to request the recruiter contact card.
            </p>
          </div>
        ) : null}

        {QUESTS.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            isActive={activeLevel === quest.id}
            isComplete={completedQuests[quest.id]}
            onSelect={handleSelectQuest}
            onComplete={handleCompleteQuest}
          />
        ))}
      </div>

      <div className="border-t border-white/10 bg-ink-950/40 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Signal stack
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CORE_STACK.map((technology) => (
            <Badge key={technology} tone="neutral">
              {technology}
            </Badge>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Active briefing:{" "}
          <span className="text-slate-300">
            {activeQuest
              ? `Lvl ${activeQuest.level} — ${activeQuest.title}`
              : 'none — run "start-quest 1" in the terminal'}
          </span>
        </p>
      </div>
    </aside>
  );
}
