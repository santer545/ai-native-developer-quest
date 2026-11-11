"use client";

import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/use-game-store";

export function ObjectiveBanner() {
  const completedQuests = useGameStore((state) => state.completedQuests);
  const view = useGameStore((state) => state.view);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);

  const completedCount = sessionQuestIds.filter(
    (questId) => completedQuests[questId],
  ).length;
  const total = sessionQuestIds.length;
  const isComplete = completedCount === total;

  return (
    <section
      aria-label="Screening objective"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.04] px-4 py-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neon-cyan/80">
            Your goal
          </p>
          <p className="text-sm leading-5 text-slate-200">
            Review all {total} scenarios to unlock Oleksandr&apos;s full profile
            and a ready-to-forward pitch.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex gap-1.5"
          role="progressbar"
          aria-label="Missions solved"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completedCount}
        >
          {sessionQuestIds.map((questId) => (
            <span
              key={questId}
              className={cn(
                "h-2 w-6 rounded-full transition-colors",
                completedQuests[questId] ? "bg-neon-green" : "bg-white/10",
              )}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-slate-400">
          {isComplete || view === "offer"
            ? "Screening complete"
            : `Scenario ${completedCount + 1} of ${total}`}
        </span>
      </div>
    </section>
  );
}
