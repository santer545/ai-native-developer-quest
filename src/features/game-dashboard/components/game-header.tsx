"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/content/profile";
import { QUESTS } from "@/lib/content/quests";
import { QUEST_SCORE, useGameStore } from "@/store/use-game-store";

import { HowToPlayDialog } from "./how-to-play-dialog";

const HOW_TO_PLAY_STORAGE_KEY = "ai-native-quest:how-to-play-seen";

export function GameHeader() {
  const score = useGameStore((state) => state.score);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const completedQuests = useGameStore((state) => state.completedQuests);
  const fastPassEnabled = useGameStore((state) => state.fastPassEnabled);
  const activateFastPass = useGameStore((state) => state.activateFastPass);
  const resetGame = useGameStore((state) => state.resetGame);
  const appendTerminalEntries = useGameStore(
    (state) => state.appendTerminalEntries,
  );

  const completedCount = QUESTS.filter(
    (quest) => completedQuests[quest.id],
  ).length;

  useEffect(() => {
    let hasSeenTips = true;

    try {
      hasSeenTips =
        window.localStorage.getItem(HOW_TO_PLAY_STORAGE_KEY) === "seen";
    } catch {
      hasSeenTips = false;
    }

    if (!hasSeenTips) {
      setHowToPlayOpen(true);
    }
  }, []);

  const handleCloseHowToPlay = () => {
    setHowToPlayOpen(false);

    try {
      window.localStorage.setItem(HOW_TO_PLAY_STORAGE_KEY, "seen");
    } catch {
      return;
    }
  };

  const handleFastPass = () => {
    activateFastPass();
    appendTerminalEntries([
      {
        tone: "warning",
        text: "RECRUITER FAST-PASS engaged. All quest briefings resolved at full XP.",
      },
      {
        tone: "success",
        text: `Score locked at ${QUESTS.length * QUEST_SCORE} XP. Run "hire" to open direct contact details.`,
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
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-neon-green/30 bg-neon-green/10 font-mono text-sm text-neon-green shadow-glow-green">
          &gt;_
        </div>
        <div className="min-w-0">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-neon-cyan/80">
            The AI-Native Developer Quest
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
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Score
          </span>
          <span className="font-mono text-sm text-neon-green">{score} XP</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Quests
          </span>
          <span className="font-mono text-sm text-slate-200">
            {completedCount}/{QUESTS.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setHowToPlayOpen(true)}
        >
          How to play
        </Button>

        {fastPassEnabled ? (
          <Badge tone="success" className="h-8 px-2.5">
            Fast-pass active
          </Badge>
        ) : (
          <Button variant="primary" size="sm" onClick={handleFastPass}>
            Fast-pass
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>
      </header>
      <HowToPlayDialog open={howToPlayOpen} onClose={handleCloseHowToPlay} />
    </>
  );
}
