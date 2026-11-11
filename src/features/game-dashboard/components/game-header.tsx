"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/content/profile";
import { useGameStore } from "@/store/use-game-store";

import { HowToPlayDialog } from "./how-to-play-dialog";
import { ThemeToggle } from "./theme-toggle";

export function GameHeader() {
  const score = useGameStore((state) => state.score);
  const completedQuests = useGameStore((state) => state.completedQuests);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);
  const skipToOffer = useGameStore((state) => state.skipToOffer);
  const resetGame = useGameStore((state) => state.resetGame);
  const appendTerminalEntries = useGameStore(
    (state) => state.appendTerminalEntries,
  );
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  const completedCount = sessionQuestIds.filter(
    (questId) => completedQuests[questId],
  ).length;

  const handleSkip = () => {
    skipToOffer();
    appendTerminalEntries([
      {
        tone: "warning",
        text: "Recruiter shortcut engaged. Jumping straight to the profile and pitch.",
      },
    ]);
  };

  const handleReset = () => {
    resetGame();
    appendTerminalEntries([
      {
        tone: "system",
        text: "New run initialised. Score reset to 0 XP.",
      },
    ]);
  };

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink-900/60 px-4 py-3 shadow-panel backdrop-blur">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-neon-green/30 bg-neon-green/10 text-sm font-semibold text-neon-green shadow-glow-green">
            OO
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-neon-cyan/80">
              Interactive CV
            </p>
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
              <h1 className="truncate text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
                {PROFILE.name}
              </h1>
              <span className="truncate font-mono text-[11px] text-slate-500">
                — {PROFILE.role}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-850 px-3 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Score
            </span>
            <span className="font-mono text-sm text-neon-green">
              {score} XP
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-850 px-3 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Scenarios
            </span>
            <span className="font-mono text-sm text-slate-200">
              {completedCount}/{sessionQuestIds.length}
            </span>
          </div>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHowToPlayOpen(true)}
          >
            How to play
          </Button>

          <Button variant="secondary" size="sm" onClick={handleSkip}>
            Skip to profile
          </Button>

          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </header>

      <HowToPlayDialog
        open={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />
    </>
  );
}
