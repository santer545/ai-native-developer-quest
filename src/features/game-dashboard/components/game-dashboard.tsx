"use client";

import { useEffect, useRef } from "react";

import {
  ConsolePanel,
  MissionList,
  MissionStage,
  ObjectiveBanner,
  ProofCollection,
} from "@/features/mission";
import { useGameStore } from "@/store/use-game-store";

import { GameHeader } from "./game-header";

export function GameDashboard() {
  const view = useGameStore((state) => state.view);
  const shuffleSession = useGameStore((state) => state.shuffleSession);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) {
      return;
    }

    initialised.current = true;
    shuffleSession();
  }, [shuffleSession]);

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
        <ObjectiveBanner />

        {view === "offer" ? (
          <main className="flex min-h-0 flex-1 flex-col">
            <MissionStage />
          </main>
        ) : (
          <>
            <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
              <MissionStage />

              <aside
                aria-label="Mission control"
                className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 shadow-panel backdrop-blur"
              >
                <div className="scrollbar-terminal flex-1 space-y-5 overflow-y-auto p-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Your screening
                    </p>
                    <h2 className="mt-1 text-sm font-semibold tracking-tight text-slate-100">
                      Scenarios
                    </h2>
                    <div className="mt-3">
                      <MissionList />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                      Highlights unlocked
                    </p>
                    <div className="mt-3">
                      <ProofCollection />
                    </div>
                  </div>
                </div>
              </aside>
            </main>

            <ConsolePanel />
          </>
        )}
      </div>
    </div>
  );
}
