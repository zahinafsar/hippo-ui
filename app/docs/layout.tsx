import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { ReactNode } from "react";
import { registry } from "@/lib/registry";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { PaletteSwitcher } from "@/components/docs/palette-switcher";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src={logo} alt="hippo-ui" width={24} height={24} />
          HippoUI
        </Link>
        <div className="flex items-center gap-1">
          <PaletteSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-border p-6">
          <nav className="flex flex-col gap-1">
            <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Get Started</div>
            <Link
              href="/docs/getting-started"
              className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
            >
              Introduction
            </Link>
            <Link
              href="/docs/theming"
              className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
            >
              Theming
            </Link>
            <Link
              href="/docs/skill"
              className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
            >
              Agent Skill
            </Link>
            <div className="mb-2 mt-4 text-xs font-semibold uppercase text-muted-foreground">Components</div>
            {registry.map((c) => (
              <Link
                key={c.slug}
                href={`/docs#${c.slug}`}
                className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-10">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
