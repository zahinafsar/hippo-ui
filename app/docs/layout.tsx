import Link from "next/link";
import { ReactNode } from "react";
import { registry } from "@/lib/registry";
import { ThemeToggle } from "@/components/docs/theme-toggle";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
        <Link href="/" className="font-semibold">hunny-ui</Link>
        <ThemeToggle />
      </header>
      <div className="flex">
        <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-border p-6">
          <nav className="flex flex-col gap-1">
            <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Components</div>
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
