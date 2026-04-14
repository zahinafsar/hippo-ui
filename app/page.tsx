"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Zap, Layers, Code2 } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.2.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  );
}

const ACCENT = "#e2c4b3";
const ACCENT_SOFT = "#feefe1";
const BUTTON = "#3d2e24";
const BG = "#000000";

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
        style={{ background: `radial-gradient(closest-side, ${ACCENT_SOFT}25, ${ACCENT}20, transparent)` }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#000000] to-transparent" />
    </div>
  );
}

function FloatingNav() {
  return (
    <nav className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-5xl rounded-2xl border border-white/[0.08] bg-[#000000]/80 px-6 py-3 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="hippo-ui" width={28} height={28} className="rounded-lg" />
          <span className="text-sm font-semibold text-white">HippoUI</span>
        </Link>
        <Link
          href="/docs"
          className="rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: BUTTON }}
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

const FEATURES = [
  {
    icon: Code2,
    title: "No headless UI",
    body: "Zero external component packages. Every line of HippoUI lives inside your codebase. You ship it, you own it.",
  },
  {
    icon: Layers,
    title: "Tailwind + JavaScript, balanced",
    body: "Not thousands of utility classes crammed into one div. Tailwind for tokens, JavaScript for logic. The right tool for each job.",
  },
  {
    icon: Zap,
    title: "We respect JavaScript",
    body: "We don't hide behind DSLs or config-driven variants. State, behavior, composition — handled in plain React, the way it was meant to be.",
  },
  {
    icon: Sparkles,
    title: "Zero requirements",
    body: "No CLI to install. No config to wire. One curl command drops the components into your repo. Start in seconds.",
  },
];

function Features() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-32">
      <div className="mb-16 text-center">
        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: ACCENT }}>
          Our motivations
        </div>
        <h2 className="mt-3 text-4xl font-bold text-white">Why HippoUI exists</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
          We got tired of bloated component libraries, invisible abstractions,
          and utility-class soup. HippoUI is our answer: honest code you can read, own, and change.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col gap-3 bg-[#000000] p-8">
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
          <Image src="/logo.png" alt="hippo-ui" width={20} height={20} />
          hippo-ui — MIT
        </div>
        <div className="flex items-center gap-5 text-xs text-white/30">
          <Link href="/docs" className="hover:text-white">Docs</Link>
          <Link href="https://github.com/zahinafsar/hippo-ui" className="flex items-center gap-1.5 hover:text-white">
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
            className="rounded-full px-3 py-0.5 text-xs font-semibold text-black"
            style={{ background: ACCENT }}
          >
            v1.0
          </span>
          <span className="text-sm text-white/60">33 React components, copy-paste ready</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
          Honest UI.<br />In your codebase.
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
          No headless packages. No utility-class soup. No config to wire.
          <br className="hidden sm:block" />
          Just Tailwind and JavaScript, working together the way they should.
        </p>

        <div className="mb-24 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex h-12 items-center gap-2 rounded-lg px-7 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: BUTTON }}
          >
            Browse components <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
}
