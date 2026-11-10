import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "border-neon-green/50 bg-neon-green/10 text-neon-green hover:bg-neon-green/20 hover:shadow-glow-green",
        secondary:
          "border-white/10 bg-white/[0.03] text-slate-300 hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-neon-cyan",
        ghost:
          "border-transparent bg-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-100",
        danger:
          "border-neon-red/40 bg-neon-red/10 text-neon-red hover:bg-neon-red/20",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        icon: "h-9 w-9 px-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
