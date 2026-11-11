import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface HowToPlayDialogProps {
  open: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: "Read the scenario",
    body: "A real work situation from Oleksandr's career, written in plain language.",
    hint: "No jargon · no typing",
  },
  {
    title: "Make your call",
    body: "Pick the priority you would choose as the hiring manager. There are no wrong answers.",
    hint: "3 options · one click",
  },
  {
    title: "See how he answered",
    body: "The reveal shows his approach, the outcome, and what it says about him.",
    hint: "Optional technical detail",
  },
  {
    title: "Take the pitch",
    body: "Finish to unlock the full profile and a copy-ready summary you can forward to a hiring manager.",
    hint: "Email · CV · LinkedIn",
  },
] as const;

export function HowToPlayDialog({ open, onClose }: HowToPlayDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How to play"
      description="Review three scenarios, make your calls, and unlock the profile plus a forwardable pitch. No typing required."
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
              <span className="mt-2 inline-block rounded border border-neon-green/20 bg-neon-green/[0.06] px-2 py-1 font-mono text-xs text-neon-green">
                {step.hint}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
          In a hurry?
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Use{" "}
          <span className="font-mono text-neon-amber">Skip to profile</span> in
          the top-right menu to jump straight to the contact card.
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
