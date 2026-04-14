"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEMES, themeToCss, type Theme } from "./themes";
import { ThemeCompare } from "./compare";

type Props = {
  active?: Theme;
  onChange?: (t: Theme) => void;
};

export function ThemePicker({ active: activeProp, onChange }: Props = {}) {
  const [internal, setInternal] = useState<Theme>(THEMES[0]);
  const active = activeProp ?? internal;
  const setActive = (t: Theme) => {
    if (onChange) onChange(t);
    else setInternal(t);
  };
  const [copied, setCopied] = useState(false);
  const css = useMemo(() => themeToCss(active), [active]);

  async function onCopy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {THEMES.map((t) => {
          const selected = t.name === active.name;
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(t)}
              className={[
                "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition",
                selected
                  ? "border-ring bg-accent text-accent-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <span
                className="h-4 w-4 rounded-full border border-border"
                style={{ background: t.swatch }}
              />
              {t.label}
            </button>
          );
        })}
      </div>

      <ThemeCompare theme={active} />

      <div className="relative overflow-hidden rounded-md border border-border bg-muted">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">
            {active.label} — paste into your global stylesheet
          </span>
          <Button variant="outline" size="sm" onClick={onCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="max-h-96 overflow-auto p-4 font-mono text-xs leading-relaxed text-foreground">
          {css}
        </pre>
      </div>
    </div>
  );
}
