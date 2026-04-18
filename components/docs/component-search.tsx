"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type Item = { slug: string; name: string };

export function ComponentSearch({ items }: { items: readonly Item[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (c) => c.name.toLowerCase().includes(needle) || c.slug.toLowerCase().includes(needle)
    );
  }, [q, items]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className="relative w-40 sm:w-56 md:w-64">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Search components..."
        iconLeft={<SearchIcon />}
        className="h-9 text-sm"
      />
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-md">
          {filtered.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">No matches</div>
          ) : (
            filtered.map((c) => (
              <Link
                key={c.slug}
                href={`/docs/${c.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
                className="block rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
              >
                {c.name}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
