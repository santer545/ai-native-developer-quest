"use client";

import { Badge } from "@/components/ui/badge";
import { getQuestById } from "@/lib/content/quests";
import { useGameStore } from "@/store/use-game-store";

import { OfferScreen } from "./offer-screen";
import { ScreeningScenario } from "./screening-scenario";

const STEP_LABELS = {
  scenario: "Scenario",
  call: "Your call",
  reveal: "Reveal",
} as const;

export function MissionStage() {
  const view = useGameStore((state) => state.view);
  const activeLevel = useGameStore((state) => state.activeLevel);
  const step = useGameStore((state) => state.step);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);

  if (view === "offer") {
    return <OfferScreen />;
  }

  if (!activeLevel) {
    return (
      <section className="grid min-h-[34rem] place-items-center rounded-2xl border border-white/10 bg-ink-900/60 p-8 text-center">
        <p className="text-sm text-slate-400">
          All scenarios are reviewed. Open your profile to see the pitch.
        </p>
      </section>
    );
  }

  const quest = getQuestById(activeLevel);
  const sessionIndex = sessionQuestIds.indexOf(quest.id);
  const position = sessionIndex >= 0 ? sessionIndex + 1 : quest.level;

  return (
    <section
      aria-label={`Scenario stage — ${quest.title}`}
      className="flex min-h-[34rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 shadow-panel backdrop-blur lg:h-full lg:min-h-0"
    >
      <header className="border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-xs font-semibold"
              style={{
                borderColor: `${quest.hue}55`,
                backgroundColor: `${quest.hue}1a`,
                color: quest.hue,
              }}
            >
              {String(position).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold tracking-tight text-slate-100 sm:text-lg">
                {quest.title}
              </h2>
              <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                {quest.company} · {quest.period} · {quest.domain}
              </p>
            </div>
          </div>
          <Badge tone={step === "reveal" ? "success" : "info"}>
            {STEP_LABELS[step]}
          </Badge>
        </div>
      </header>

      <div className="scrollbar-terminal flex-1 overflow-y-auto px-4 py-5 sm:px-5">
        <ScreeningScenario key={quest.id} quest={quest} />
      </div>
    </section>
  );
}
