import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
  {
    variants: {
      tone: {
        neutral: "border-white/10 bg-white/[0.05] text-slate-400",
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
