"use client";

import { CSSProperties, useCallback, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import type { Theme, ThemeVars } from "./themes";
import { PreviewScene } from "./preview-scene";

function varsStyle(vars: ThemeVars): CSSProperties {
  return vars as unknown as CSSProperties;
}

export function ThemeCompare({ theme }: { theme: Theme }) {
  const [split, setSplit] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    update(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 2));
    if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 2));
    if (e.key === "Home") setSplit(0);
    if (e.key === "End") setSplit(100);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-96 w-full select-none overflow-hidden rounded-md border border-border"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "none", cursor: "ew-resize" }}
    >
      <div className="absolute inset-0" style={varsStyle(theme.light)}>
        <PreviewScene />
      </div>

      <div
        className="dark absolute inset-0"
        style={{
          ...varsStyle(theme.dark),
          clipPath: `inset(0 0 0 ${split}%)`,
        }}
      >
        <PreviewScene />
      </div>

      <div
        className="pointer-events-none absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          background: theme.light["--card"],
          color: theme.light["--foreground"],
          border: `1px solid ${theme.light["--border"]}`,
        }}
      >
        Light
      </div>
      <div
        className="pointer-events-none absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{
          background: theme.dark["--card"],
          color: theme.dark["--foreground"],
          border: `1px solid ${theme.dark["--border"]}`,
        }}
      >
        Dark
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `calc(${split}% - 1px)` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare light and dark"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-700 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{ left: `${split}%` }}
      >
        <GripVertical className="h-4 w-4" />
      </div>
    </div>
  );
}
