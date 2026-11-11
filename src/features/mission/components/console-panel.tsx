"use client";

import { Terminal } from "@/features/terminal";
import { useGameStore } from "@/store/use-game-store";

export function ConsolePanel() {
  const consoleOpen = useGameStore((state) => state.consoleOpen);
  const toggleConsole = useGameStore((state) => state.toggleConsole);

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900/40">
      <button
        type="button"
        onClick={toggleConsole}
        aria-expanded={consoleOpen}
        className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Console
          </span>
          <span className="hidden truncate text-xs text-slate-500 sm:inline">
            Optional — for engineers who prefer the command line
          </span>
        </span>
        <span className="font-mono text-xs text-neon-green">
          {consoleOpen ? "−" : "+"}
        </span>
      </button>

      {consoleOpen ? (
        <div className="border-t border-white/10 p-3">
          <Terminal />
        </div>
      ) : null}
    </div>
  );
}
