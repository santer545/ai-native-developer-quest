import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-[0.12em]",
  {
    variants: {
      tone: {
        neutral: "border-white/10 bg-white/[0.04] text-slate-400",
        success: "border-neon-green/30 bg-neon-green/10 text-neon-green",
        info: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
        warning: "border-neon-amber/30 bg-neon-amber/10 text-neon-amber",
        danger: "border-neon-red/30 bg-neon-red/10 text-neon-red",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export interface BadgeProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
