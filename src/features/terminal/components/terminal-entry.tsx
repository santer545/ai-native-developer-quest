"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getQuestById } from "@/lib/content/quests";
import { cn } from "@/lib/utils";
import type { QuestId, TerminalEntry, TerminalTone } from "@/types/game";

import { TypewriterText } from "./typewriter-text";

interface TerminalEntryViewProps {
  entry: TerminalEntry;
  onActivateQuest: (questId: QuestId) => void;
}

interface TonePresentation {
  text: string;
  prefix: string;
}

const TONE_PRESENTATION: Record<TerminalTone, TonePresentation> = {
  system: { text: "text-slate-500", prefix: "::" },
  command: { text: "text-slate-100", prefix: "$" },
  output: { text: "text-slate-300", prefix: ">" },
  success: { text: "text-neon-green", prefix: "✓" },
  warning: { text: "text-neon-amber", prefix: "!" },
  error: { text: "text-neon-red", prefix: "×" },
};

const TYPEWRITER_CHARACTER_LIMIT = 260;

export function TerminalEntryView({
  entry,
  onActivateQuest,
}: TerminalEntryViewProps) {
  const presentation = TONE_PRESENTATION[entry.tone];

  if (entry.tone === "command") {
    return (
      <div className="flex items-start gap-2 font-mono text-[13px] leading-6">
        <span className="select-none text-neon-green" aria-hidden="true">
          $
        </span>
        <span className="min-w-0 break-words text-slate-100">
          {entry.text}
        </span>
      </div>
    );
  }

  const shouldType = entry.text.length <= TYPEWRITER_CHARACTER_LIMIT;

  return (
    <div className="animate-fade-in">
      <div className="flex items-start gap-2 font-mono text-[13px] leading-6">
        <span
          className={cn(
            "mt-0.5 select-none text-[11px] font-semibold",
            presentation.text,
          )}
          aria-hidden="true"
        >
          {presentation.prefix}
        </span>
        <div
          className={cn(
            "min-w-0 flex-1 whitespace-pre-wrap break-words",
            presentation.text,
          )}
        >
          {shouldType ? (
            <TypewriterText text={entry.text} />
          ) : (
            entry.text
          )}
        </div>
      </div>

      {entry.badges && entry.badges.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5 pl-5">
          {entry.badges.map((badge) => (
            <Badge key={badge} tone="neutral">
              {badge}
            </Badge>
          ))}
        </div>
      ) : null}

      {entry.questIds && entry.questIds.length > 0 ? (
        <div className="mt-3 space-y-2 pl-5">
          {entry.questIds.map((questId) => {
            const quest = getQuestById(questId);

            return (
              <div
                key={questId}
                className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    Lvl {String(quest.level).padStart(2, "0")} ·{" "}
                    {quest.company}
                  </p>
                  <p className="truncate text-sm text-slate-200">
                    {quest.title}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onActivateQuest(questId)}
                  className="shrink-0"
                >
                  Activate
                </Button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
