import { QuestBoard } from "@/features/quest-board";
import { Terminal } from "@/features/terminal";

import { GameHeader } from "./game-header";

export function GameDashboard() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-neon-green/[0.055] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-neon-cyan/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <GameHeader />
        <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)]">
          <Terminal />
          <QuestBoard />
        </main>
      </div>
    </div>
  );
}
