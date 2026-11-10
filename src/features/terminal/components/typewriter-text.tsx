"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

const TICK_INTERVAL_MS = 12;
const CHARACTERS_PER_TICK = 2;

export function TypewriterText({ text, className }: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || text.length === 0) {
      setVisibleCharacters(text.length);
      return;
    }

    setVisibleCharacters(0);

    let currentCharacters = 0;
    const interval = window.setInterval(() => {
      currentCharacters = Math.min(
        text.length,
        currentCharacters + CHARACTERS_PER_TICK,
      );
      setVisibleCharacters(currentCharacters);

      if (currentCharacters >= text.length) {
        window.clearInterval(interval);
      }
    }, TICK_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [prefersReducedMotion, text]);

  const isComplete = visibleCharacters >= text.length;

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, visibleCharacters)}
        {!isComplete ? (
          <span className="ml-0.5 inline-block h-[0.95em] w-2 translate-y-[0.1em] animate-caret bg-neon-green/80 align-baseline" />
        ) : null}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
