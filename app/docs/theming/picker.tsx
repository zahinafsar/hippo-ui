"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEMES, themeToCss, type Theme } from "./themes";

export function ThemePicker() {
  const [active, setActive] = useState<Theme>(THEMES[0]);
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

      <div
        className="rounded-md border border-border p-4"
        style={{
          background: active.light["--background"],
          color: active.light["--foreground"],
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          {(
            ["primary", "secondary", "accent", "muted", "destructive"] as const
          ).map((token) => (
            <span
              key={token}
              className="h-6 w-6 rounded-full border"
              style={{
                background: active.light[`--${token}`],
                borderColor: active.light["--border"],
              }}
              title={token}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-md px-3 py-1.5 text-xs font-medium"
            style={{
              background: active.light["--primary"],
              color: active.light["--primary-foreground"],
            }}
          >
            Primary
          </span>
          <span
            className="rounded-md px-3 py-1.5 text-xs font-medium"
            style={{
              background: active.light["--secondary"],
              color: active.light["--secondary-foreground"],
            }}
          >
            Secondary
          </span>
          <span
            className="rounded-md px-3 py-1.5 text-xs"
            style={{ color: active.light["--muted-foreground"] }}
          >
            Muted text
          </span>
        </div>
      </div>

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
