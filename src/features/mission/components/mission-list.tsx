"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getQuestById } from "@/lib/content/quests";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/use-game-store";
import type { QuestStatus } from "@/types/game";

const STATUS_TONE: Record<
  QuestStatus,
  "neutral" | "info" | "warning" | "success"
> = {
  locked: "neutral",
  available: "info",
  active: "warning",
  solved: "success",
};

export function MissionList() {
  const questStatus = useGameStore((state) => state.questStatus);
  const startQuest = useGameStore((state) => state.startQuest);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);

  return (
    <div className="space-y-2">
      {sessionQuestIds.map((questId, index) => {
        const quest = getQuestById(questId);
        const status = questStatus[questId];
        const isLocked = status === "locked";
        const isActive = status === "active";

        return (
          <div
            key={quest.id}
            className={cn(
              "rounded-xl border p-3 transition-colors",
              isActive
                ? "border-neon-amber/40 bg-neon-amber/[0.05]"
                : status === "solved"
                  ? "border-neon-green/20 bg-neon-green/[0.03]"
                  : "border-white/10 bg-white/[0.02]",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-[11px] font-semibold"
                  style={{
                    borderColor: `${quest.hue}55`,
                    backgroundColor: `${quest.hue}1a`,
                    color: quest.hue,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-100">
                    {quest.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                    {quest.company}
                  </p>
                </div>
              </div>
              <Badge tone={STATUS_TONE[status]} className="shrink-0">
                {status}
              </Badge>
            </div>

            <div className="mt-3 flex justify-end">
              <Button
                variant={isActive ? "primary" : "secondary"}
                size="sm"
                disabled={isLocked || isActive}
                onClick={() => startQuest(quest.id)}
              >
                {isLocked
                  ? "Locked"
                  : isActive
                    ? "In progress"
                    : status === "solved"
                      ? "Review"
                      : "Start"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
