"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getQuestById } from "@/lib/content/quests";
import { useGameStore } from "@/store/use-game-store";
import type {
  CommandSnapshot,
  QuestId,
  TerminalEntryDraft,
} from "@/types/game";

import { executeCommand, type CommandContext } from "../api/commands";
import { HireDialog } from "./hire-dialog";
import { PromptPills } from "./prompt-pills";
import { TerminalEntryView } from "./terminal-entry";

const HISTORY_LIMIT = 40;

export function Terminal() {
  const terminalLog = useGameStore((state) => state.terminalLog);
  const appendTerminalEntries = useGameStore(
    (state) => state.appendTerminalEntries,
  );
  const clearTerminal = useGameStore((state) => state.clearTerminal);
  const setActiveLevel = useGameStore((state) => state.setActiveLevel);
  const completeQuest = useGameStore((state) => state.completeQuest);
  const activateFastPass = useGameStore((state) => state.activateFastPass);

  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<readonly string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number | null>(null);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion, terminalLog]);

  const appendEntries = (entries: readonly TerminalEntryDraft[]) => {
    appendTerminalEntries(entries);
  };

  const buildCommandContext = (): CommandContext => ({
    setActiveLevel,
    completeQuest,
    openHireDialog: () => {
      setHireDialogOpen(true);
    },
    clearTerminal,
    activateFastPass,
    getSnapshot: (): CommandSnapshot => {
      const state = useGameStore.getState();

      return {
        score: state.score,
        completedQuests: state.completedQuests,
        fastPassEnabled: state.fastPassEnabled,
        activeLevel: state.activeLevel,
      };
    },
  });

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim();

    if (!command) {
      return;
    }

    appendEntries([{ tone: "command", text: command }]);
    setHistory((currentHistory) => {
      if (currentHistory.at(-1) === command) {
        return currentHistory;
      }

      return [...currentHistory, command].slice(-HISTORY_LIMIT);
    });
    setHistoryCursor(null);
    setInput("");

    const result = executeCommand(command, buildCommandContext());

    if (result) {
      appendEntries(result.entries);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  const handleHistoryNavigation = (direction: "older" | "newer") => {
    if (history.length === 0) {
      return;
    }

    if (direction === "older") {
      const nextCursor =
        historyCursor === null
          ? history.length - 1
          : Math.max(0, historyCursor - 1);
      const command = history[nextCursor];

      setHistoryCursor(nextCursor);

      if (command !== undefined) {
        setInput(command);
      }

      return;
    }

    if (historyCursor === null) {
      return;
    }

    const nextCursor = historyCursor + 1;

    if (nextCursor >= history.length) {
      setHistoryCursor(null);
      setInput("");
      return;
    }

    const command = history[nextCursor];

    setHistoryCursor(nextCursor);

    if (command !== undefined) {
      setInput(command);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      handleHistoryNavigation("older");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      handleHistoryNavigation("newer");
    }
  };

  const handleActivateQuest = (questId: QuestId) => {
    const quest = getQuestById(questId);

    setActiveLevel(questId);
    appendEntries([
      {
        tone: "success",
        text: `Level ${quest.level} active — ${quest.title}. Mission Control synced.`,
      },
    ]);
  };

  return (
    <section
      aria-label="Interactive terminal"
      className="relative flex min-h-[34rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/75 shadow-panel backdrop-blur lg:h-full lg:min-h-0"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-red/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon-green/70" />
          </div>
          <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
            alex@quest<span className="text-slate-600">:</span>
            <span className="text-neon-cyan/80">~/portfolio</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neon-green/80 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-neon-green" />
            online
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => runCommand("clear")}
            aria-label="Clear terminal output"
          >
            clear
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label="Terminal output"
        className="scrollbar-terminal relative flex-1 overflow-y-auto px-4 py-4 sm:px-5"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]"
          aria-hidden="true"
        />
        <div className="relative space-y-3">
          {terminalLog.map((entry) => (
            <TerminalEntryView
              key={entry.id}
              entry={entry}
              onActivateQuest={handleActivateQuest}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-ink-950/60 px-4 py-4 sm:px-5">
        <PromptPills onSelect={runCommand} />

        <form onSubmit={handleSubmit} className="mt-3">
          <label htmlFor="terminal-command" className="sr-only">
            Terminal command
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 transition-shadow focus-within:border-neon-green/50 focus-within:shadow-glow-green">
            <span
              className="shrink-0 font-mono text-xs text-neon-green"
              aria-hidden="true"
            >
              alex@quest:~$
            </span>
            <input
              id="terminal-command"
              ref={inputRef}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                if (historyCursor !== null) {
                  setHistoryCursor(null);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="type a command…"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="send"
              aria-describedby="terminal-hint"
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-100 caret-neon-green placeholder:text-slate-600 focus:outline-none"
            />
          </div>
        </form>

        <p
          id="terminal-hint"
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600"
        >
          help · start-quest 1 · complete-quest · inspect --experience · hire
        </p>
      </div>

      <HireDialog
        open={hireDialogOpen}
        onClose={() => setHireDialogOpen(false)}
      />
    </section>
  );
}
