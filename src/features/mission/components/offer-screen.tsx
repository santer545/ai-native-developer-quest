"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CAREER_MILESTONES, PROFILE } from "@/lib/content/profile";
import { getQuestById } from "@/lib/content/quests";
import { useGameStore } from "@/store/use-game-store";
import type { QuestDefinition } from "@/types/game";

const CV_FILE = "/Oleksandr_Obramenko_CV_updated.pdf";
const PITCH_STACK = "React 19 · Next.js · Angular Signals · MCP · Zustand";

function buildPitch(quests: readonly QuestDefinition[]): string {
  return [
    `${PROFILE.name} — ${PROFILE.role}, 8+ years of production frontend experience.`,
    "",
    "Highlights from three real scenarios:",
    ...quests.map((quest) => `• ${quest.pitchLine}`),
    "",
    `Stack: ${PITCH_STACK}`,
    `Contact: ${PROFILE.contact.email} · ${PROFILE.contact.phone} · linkedin.com/in/oleksandr-obramenko`,
  ].join("\n");
}

const NEXT_STEPS = [
  {
    label: "Start the conversation",
    href: `mailto:${PROFILE.contact.email}`,
    external: false,
    primary: true,
  },
  {
    label: "Download CV",
    href: CV_FILE,
    external: false,
    primary: false,
    download: true,
  },
  {
    label: "Share profile",
    href: PROFILE.contact.linkedin,
    external: true,
    primary: false,
  },
] as const;

export function OfferScreen() {
  const score = useGameStore((state) => state.score);
  const reviewMissions = useGameStore((state) => state.reviewMissions);
  const sessionQuestIds = useGameStore((state) => state.sessionQuestIds);
  const [copied, setCopied] = useState(false);

  const sessionQuests = sessionQuestIds.map(getQuestById);
  const pitch = buildPitch(sessionQuests);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      aria-label="Profile and hiring pitch"
      className="scrollbar-terminal flex-1 space-y-6 overflow-y-auto rounded-2xl border border-neon-green/20 bg-ink-900/60 p-5 shadow-panel backdrop-blur sm:p-7"
    >
      <header className="rounded-xl border border-neon-green/30 bg-neon-green/[0.06] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-neon-green">
            Screening complete
          </p>
          <Badge tone="success">{score} XP</Badge>
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          {PROFILE.name}
        </h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neon-cyan/80">
          {PROFILE.role}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          {PROFILE.tagline}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {NEXT_STEPS.map((step) => (
          <a
            key={step.label}
            href={step.href}
            target={step.external ? "_blank" : undefined}
            rel={step.external ? "noreferrer noopener" : undefined}
            download={"download" in step && step.download ? true : undefined}
            className={
              step.primary
                ? "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neon-green bg-neon-green px-4 text-sm font-medium text-ink-950 transition-colors hover:brightness-105"
                : "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-200 transition-colors hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-neon-cyan"
            }
          >
            {step.label}
          </a>
        ))}
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Hiring scorecard
        </h3>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {sessionQuests.map((quest) => (
            <div
              key={quest.id}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: quest.hue }}
              >
                {quest.scenario.reveal.signal}
              </p>
              <p className="mt-1.5 text-xs leading-5 text-slate-300">
                {quest.scenario.reveal.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neon-cyan/25 bg-neon-cyan/[0.04] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/80">
            Why Oleksandr — forwardable summary
          </h3>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? "Copied" : "Copy summary"}
          </Button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs leading-6 text-slate-300">
          {pitch}
        </pre>
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Profile
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          {PROFILE.summary}
        </p>
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Career timeline
        </h3>
        <ol className="mt-3 space-y-3">
          {CAREER_MILESTONES.map((milestone) => (
            <li
              key={`${milestone.company}-${milestone.period}`}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-3.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm font-semibold text-slate-100">
                  {milestone.company}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                  {milestone.period}
                </p>
              </div>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-neon-cyan/70">
                {milestone.role}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {milestone.summary}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Skill matrix
        </h3>
        <div className="mt-3 space-y-3">
          {PROFILE.skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-neon-cyan/70">
                {group.label}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <Badge key={skill} tone="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <p className="text-xs text-slate-500">
          Want to replay the screening or inspect the source?
        </p>
        <Button variant="secondary" size="sm" onClick={reviewMissions}>
          Review scenarios
        </Button>
      </div>
    </section>
  );
}
