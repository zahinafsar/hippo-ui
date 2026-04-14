"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEMES } from "@/app/docs/theming/themes";
import { usePalette } from "./palette-provider";

export function PaletteSwitcher() {
  const { palette, setPalette } = usePalette();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Change palette"
        onClick={() => setOpen((v) => !v)}
      >
        <Palette className="h-4 w-4" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-md border border-border bg-card p-1 shadow-md">
          {THEMES.map((t) => {
            const selected = t.name === palette;
            return (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  setPalette(t.name);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded-full border border-border"
                    style={{ background: t.swatch }}
                  />
                  {t.label}
                </span>
                {selected && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
