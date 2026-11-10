"use client";

import { Modal } from "@/components/ui/modal";
import { PROFILE } from "@/lib/content/profile";

interface HireDialogProps {
  open: boolean;
  onClose: () => void;
}

const CONTACT_LINKS = [
  {
    label: "Email",
    value: PROFILE.contact.email,
    href: `mailto:${PROFILE.contact.email}`,
    external: false,
  },
  {
    label: "Phone",
    value: PROFILE.contact.phone,
    href: `tel:${PROFILE.contact.phone}`,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/oleksandr-obramenko",
    href: PROFILE.contact.linkedin,
    external: true,
  },
] as const;

export function HireDialog({ open, onClose }: HireDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Recruiter quick-contact"
      description={`${PROFILE.name} — ${PROFILE.role}. Direct channels are listed below.`}
    >
      <p className="text-sm leading-6 text-slate-300">{PROFILE.tagline}</p>

      <div className="mt-5 space-y-2">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer noopener" : undefined}
            className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 transition-colors hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 group-hover:text-neon-cyan/80">
              {link.label}
            </span>
            <span className="min-w-0 truncate text-sm text-slate-200 group-hover:text-white">
              {link.value}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-neon-green/20 bg-neon-green/[0.04] p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-green/80">
          Current focus
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          React 19 and Next.js delivery, Angular Signals modernisation,
          performance engineering, and AI-native agent workflows.
        </p>
      </div>
    </Modal>
  );
}
