"use client";

import { Button } from "@/components/ui/button";

interface PromptPillsProps {
  onSelect: (command: string) => void;
}

const PROMPTS = [
  { label: "help", command: "help", description: "List every command." },
  {
    label: "inspect",
    command: "inspect --experience",
    description: "Print the career timeline.",
  },
  {
    label: "skills",
    command: "skills",
    description: "Render the grouped skill matrix.",
  },
  {
    label: "start-quest",
    command: "start-quest",
    description: "Open the quest directory.",
  },
  {
    label: "complete-quest",
    command: "complete-quest",
    description: "Claim XP for the active quest.",
  },
  {
    label: "hire",
    command: "hire",
    description: "Open the recruiter contact card.",
  },
] as const;

export function PromptPills({ onSelect }: PromptPillsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Suggested commands"
    >
      {PROMPTS.map((prompt) => (
        <Button
          key={prompt.command}
          variant="secondary"
          size="sm"
          title={prompt.description}
          onClick={() => onSelect(prompt.command)}
        >
          {prompt.label}
        </Button>
      ))}
    </div>
  );
}
