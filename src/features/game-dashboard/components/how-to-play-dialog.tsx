import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface HowToPlayDialogProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: "Start a mission",
    body: "Pick a quest card in Mission Control, or run:",
    command: "start-quest 1",
  },
  {
    title: "Complete the briefing",
    body: "Claim the mission XP from the card or run:",
    command: "complete-quest",
  },
  {
    title: "Clear all three levels",
    body: "Repeat for quests 2 and 3, then check your progress with:",
    command: "status",
  },
  {
    title: "Open recruiter contact",
    body: "Open the contact card whenever you are ready:",
    command: "hire",
  },
] as const;

export function HowToPlayDialog({ open, onClose }: HowToPlayDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How to play"
      description="Complete all three mission briefings to finish the run, then open the recruiter contact card."
    >
      <ol className="space-y-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-neon-cyan/25 bg-neon-cyan/10 font-mono text-[11px] text-neon-cyan">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-100">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {step.body}
              </p>
              <code className="mt-2 inline-block rounded border border-neon-green/20 bg-neon-green/[0.06] px-2 py-1 font-mono text-xs text-neon-green">
                {step.command}
              </code>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Recruiter shortcut
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          In a hurry? Run{" "}
          <code className="font-mono text-neon-amber">fast-pass</code> to resolve
          every quest at full XP instantly.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="primary" size="sm" onClick={onClose}>
          Got it
        </Button>
      </div>
    </Modal>
  );
}
