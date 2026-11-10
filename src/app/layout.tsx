import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const SITE_TITLE =
  "The AI-Native Developer Quest | Oleksandr Obramenko";
const SITE_DESCRIPTION =
  "Interactive developer portfolio game for Oleksandr Obramenko — senior frontend engineer across React 19, Next.js, Angular Signals, performance engineering, and AI-native agent workflows.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | The AI-Native Developer Quest",
  },
  description: SITE_DESCRIPTION,
  applicationName: "The AI-Native Developer Quest",
  authors: [{ name: "Oleksandr Obramenko" }],
  keywords: [
    "Oleksandr Obramenko",
    "Senior Frontend Engineer",
    "React 19",
    "Next.js",
    "Angular",
    "TypeScript",
    "Zustand",
    "AI-native engineering",
    "MCP",
    "Interactive portfolio",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#05070a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-ink-950 font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
