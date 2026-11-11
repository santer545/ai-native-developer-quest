"use client";

import { Badge } from "@/components/ui/badge";
import { getQuestById } from "@/lib/content/quests";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/use-game-store";

export function ProofCollection() {
  const completedQuests = useGameStore((state) => state.completedQuests);
  const unlockedProofs = useGameStore((state) => state.unlockedProofs);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);

  return (
    <div className="space-y-2">
      {sessionQuestIds.map((questId, index) => {
        const quest = getQuestById(questId);
        const unlocked =
          unlockedProofs.includes(quest.id) || completedQuests[quest.id];

        return (
          <div
            key={quest.id}
            className={cn(
              "rounded-lg border p-3",
              unlocked
                ? "border-neon-green/25 bg-neon-green/[0.05]"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Scenario {index + 1}
              </p>
              <Badge tone={unlocked ? "success" : "neutral"}>
                {unlocked ? "Unlocked" : "Locked"}
              </Badge>
            </div>
            <p
              className={cn(
                "mt-1.5 text-xs leading-5",
                unlocked ? "text-slate-200" : "text-slate-600",
              )}
            >
              {unlocked
                ? quest.proof
                : "Review this scenario to reveal the proof."}
            </p>
          </div>
        );
      })}
    </div>
  );
}
