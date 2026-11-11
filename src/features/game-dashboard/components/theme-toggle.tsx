"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type ThemeName = "warm" | "bright";

const STORAGE_KEY = "cv-theme";

function readTheme(): ThemeName {
  if (typeof document === "undefined") {
    return "warm";
  }

  return document.documentElement.getAttribute("data-theme") === "bright"
    ? "bright"
    : "warm";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("warm");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const nextTheme: ThemeName = theme === "warm" ? "bright" : "warm";
  const targetLabel = nextTheme === "bright" ? "Light" : "Dark";

  const handleToggle = () => {
    document.documentElement.setAttribute("data-theme", nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Storage unavailable (private mode) — theme still applies for the session.
    }

    setTheme(nextTheme);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      aria-label={`Switch to ${targetLabel.toLowerCase()} theme`}
      title={`Switch to ${targetLabel.toLowerCase()} theme`}
    >
      {nextTheme === "bright" ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
      {targetLabel}
    </Button>
  );
}
