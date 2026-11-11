import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const SITE_TITLE = "Oleksandr Obramenko — Interactive CV";
const SITE_DESCRIPTION =
  "Review three real work scenarios, make your call, and see how Oleksandr Obramenko — senior frontend engineer across React 19, Next.js and Angular — handled them.";

const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('cv-theme');if(t==='warm'||t==='bright'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | Oleksandr Obramenko",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
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
    "Interactive CV",
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
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#14110d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="warm" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh bg-ink-950 font-sans text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
