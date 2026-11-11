"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUEST_SCORE, useGameStore } from "@/store/use-game-store";
import type { QuestDefinition } from "@/types/game";

const OPTION_LABELS = ["A", "B", "C"] as const;

interface ScreeningScenarioProps {
  quest: QuestDefinition;
}

export function ScreeningScenario({ quest }: ScreeningScenarioProps) {
  const step = useGameStore((state) => state.step);
  const selectedOptionId = useGameStore((state) => state.selectedOptionId);
  const selectOption = useGameStore((state) => state.selectOption);
  const beginCall = useGameStore((state) => state.beginCall);
  const submitCall = useGameStore((state) => state.submitCall);
  const nextScenario = useGameStore((state) => state.nextScenario);
  const completedQuests = useGameStore((state) => state.completedQuests);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);
  const [technicalOpen, setTechnicalOpen] = useState(false);

  const { scenario, ask, options, reveal, technicalDetail } = quest.scenario;
  const selectedOption = options.find(
    (option) => option.id === selectedOptionId,
  );
  const allReviewed = sessionQuestIds.every(
    (questId) => completedQuests[questId],
  );

  if (step === "scenario") {
    return (
      <div className="space-y-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            The situation
          </p>
          <p className="mt-2 text-base leading-7 text-slate-100">{scenario}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Your role
          </p>
          <p className="mt-1.5 text-sm leading-6 text-slate-300">
            You are the hiring manager. There are no wrong answers — just make
            the call you would make, then see how Oleksandr handled it.
          </p>
        </div>

        <div className="flex justify-end">
          <Button variant="primary" size="md" onClick={beginCall}>
            Make your call
          </Button>
        </div>
      </div>
    );
  }

  if (step === "call") {
    return (
      <div className="space-y-5">
        <div className="rounded-lg border border-neon-amber/25 bg-neon-amber/[0.05] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-amber/80">
            Your call
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{ask}</p>
        </div>

        <div role="radiogroup" aria-label="Choose an answer" className="space-y-2">
          {options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => selectOption(option.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70",
                  isSelected
                    ? "border-neon-green/50 bg-neon-green/[0.07]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-md border font-mono text-[11px]",
                    isSelected
                      ? "border-neon-green/50 bg-neon-green/10 text-neon-green"
                      : "border-white/15 bg-white/5 text-slate-400",
                  )}
                  aria-hidden="true"
                >
                  {OPTION_LABELS[index] ?? String(index + 1)}
                </span>
                <span className="min-w-0 text-sm leading-6 text-slate-200">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            disabled={!selectedOptionId}
            onClick={submitCall}
          >
            See how Oleksandr answered
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {selectedOption ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          Your call:{" "}
          <span className="text-slate-300">{selectedOption.label}</span>
        </p>
      ) : null}

      <div className="rounded-lg border border-neon-cyan/25 bg-neon-cyan/[0.05] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/80">
          How Oleksandr answered
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-100">
          {reveal.approach}
        </p>
      </div>

      <div className="rounded-xl border border-neon-green/30 bg-neon-green/[0.07] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green">
            Outcome
          </p>
          <Badge tone="success">+{QUEST_SCORE} XP</Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-100">
          {reveal.outcome}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="info">{reveal.signal}</Badge>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
            Proof unlocked
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setTechnicalOpen((open) => !open)}
          aria-expanded={technicalOpen}
          className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            See the technical detail
          </span>
          <span className="font-mono text-xs text-neon-green">
            {technicalOpen ? "−" : "+"}
          </span>
        </button>
        {technicalOpen ? (
          <p className="border-t border-white/10 px-4 py-3 text-xs leading-6 text-slate-400">
            {technicalDetail}
          </p>
        ) : null}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" size="md" onClick={nextScenario}>
          {allReviewed ? "See your profile" : "Next scenario"}
        </Button>
      </div>
    </div>
  );
}
