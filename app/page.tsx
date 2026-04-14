"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Copy, Check, Sparkles, Zap, Layers, Code2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

const ACCENT = "#7c3aed";
const BG = "#0a0a0f";

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function move(e: MouseEvent) {
      if (ref.current) {
        ref.current.style.left = `${e.clientX}px`;
        ref.current.style.top = `${e.clientY}px`;
      }
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-30 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-[left,top] duration-200 ease-out"
      style={{ background: `${ACCENT}20` }}
    />
  );
}

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          <pattern id="dots" width="64" height="64" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div
        className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[140px]"
        style={{ background: `${ACCENT}25` }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </div>
  );
}

function FloatingNav() {
  return (
    <nav className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/80 px-6 py-3 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg font-bold text-white"
            style={{ background: ACCENT }}
          >
            h
          </div>
          <span className="text-sm font-semibold text-white">hunny-ui</span>
        </Link>
        <div className="hidden items-center gap-7 sm:flex">
          <Link href="/docs" className="text-sm text-white/50 transition-colors hover:text-white">
            Components
          </Link>
          <Link href="/docs#button" className="text-sm text-white/50 transition-colors hover:text-white">
            Examples
          </Link>
          <Link href="https://github.com" className="text-sm text-white/50 transition-colors hover:text-white">
            GitHub
          </Link>
        </div>
        <Link
          href="/docs"
          className="rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: ACCENT }}
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

const SNIPPET = `import { Button } from "@/components/ui/button";

<Button>Click me</Button>`;

function CopySnippet() {
  const [copied, setCopied] = useState(false);
  function onCopy() {
    navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={onCopy}
      className="group flex items-center gap-3 rounded-lg border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 backdrop-blur-sm transition-all hover:border-white/[0.2] hover:bg-white/[0.06]"
    >
      <span className="font-mono text-xs text-white/50">$</span>
      <span className="font-mono text-xs text-white/80">npx hunny-ui add button</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-white/40 group-hover:text-white/70" />
      )}
    </button>
  );
}

const FEATURES = [
  {
    icon: Layers,
    title: "33 components",
    body: "Buttons, dialogs, tables, command palette, date picker — admin-dashboard ready.",
  },
  {
    icon: Code2,
    title: "Copy, don't install",
    body: "Source lives in your repo. Edit anything. No package upgrades to worry about.",
  },
  {
    icon: Zap,
    title: "React-first",
    body: "State and behavior in React. Tailwind only for color, spacing, typography.",
  },
  {
    icon: Sparkles,
    title: "Zero variant cruft",
    body: "No cva, no clsx, no tailwind-merge. Plain maps and keyof typeof.",
  },
];

function Features() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-32">
      <div className="mb-16 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>
          Why hunny-ui
        </div>
        <h2 className="mt-3 text-4xl font-bold text-white">Built different</h2>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-3 bg-[#0a0a0f] p-8">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: `${ACCENT}20`, color: ACCENT }}
            >
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-white/50">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <div
            className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
            style={{ background: ACCENT }}
          >
            h
          </div>
          hunny-ui — MIT
        </div>
        <div className="flex items-center gap-5 text-xs text-white/30">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <Link href="https://github.com" className="flex items-center gap-1.5 hover:text-white">
            <GithubIcon className="h-3.5 w-3.5" /> GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden" style={{ background: BG }}>
      <CursorGlow />
      <FloatingNav />
      <GridBackground />

      <section className="relative z-10 flex flex-col items-center px-4 pt-40 text-center sm:pt-48">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] py-1 pl-1 pr-4 backdrop-blur-sm">
          <span
            className="rounded-full px-3 py-0.5 text-xs font-semibold text-white"
            style={{ background: ACCENT }}
          >
            v1.0
          </span>
          <span className="text-sm text-white/60">33 React components, copy-paste ready</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          UI components,<br />without the bloat.
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
          Tailwind for tokens. React for logic. No cva, no clsx, no tailwind-merge.
          <br className="hidden sm:block" />
          Just components you copy into your repo.
        </p>

        <div className="mb-24 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: ACCENT, boxShadow: `0 8px 30px -8px ${ACCENT}` }}
          >
            Browse components <ArrowRight className="h-4 w-4" />
          </Link>
          <CopySnippet />
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
}
