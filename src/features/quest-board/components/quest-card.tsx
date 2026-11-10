"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QuestDefinition, QuestId } from "@/types/game";

interface QuestCardProps {
  quest: QuestDefinition;
  isActive: boolean;
  isComplete: boolean;
  onSelect: (questId: QuestId) => void;
  onComplete: (questId: QuestId) => void;
}

export function QuestCard({
  quest,
  isActive,
  isComplete,
  onSelect,
  onComplete,
}: QuestCardProps) {
  const status = isComplete ? "complete" : isActive ? "active" : "queued";

  return (
    <article
      className={cn(
        "rounded-xl border p-3.5 transition-colors",
        isActive
          ? "border-neon-green/45 bg-neon-green/[0.05] shadow-glow-green"
          : isComplete
            ? "border-neon-cyan/25 bg-neon-cyan/[0.035]"
            : "border-white/10 bg-white/[0.02] hover:border-white/20",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-md border font-mono text-[11px]",
              isActive
                ? "border-neon-green/40 bg-neon-green/10 text-neon-green"
                : isComplete
                  ? "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
                  : "border-white/10 bg-white/5 text-slate-500",
            )}
          >
            {String(quest.level).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-100">
              {quest.title}
            </h3>
            <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
              {quest.company} · {quest.period}
            </p>
          </div>
        </div>
        <Badge
          tone={
            status === "complete"
              ? "success"
              : status === "active"
                ? "info"
                : "neutral"
          }
          className="shrink-0"
        >
          {status}
        </Badge>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-400">{quest.challenge}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {quest.stack.slice(0, 4).map((technology) => (
          <Badge key={technology} tone="neutral">
            {technology}
          </Badge>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-slate-600">
          {quest.domain}
        </span>
        {isComplete ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelect(quest.id)}
            className="shrink-0"
          >
            Review
          </Button>
        ) : isActive ? (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onComplete(quest.id)}
            className="shrink-0"
          >
            Complete
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onSelect(quest.id)}
            className="shrink-0"
          >
            Brief
          </Button>
        )}
      </div>
    </article>
  );
}
