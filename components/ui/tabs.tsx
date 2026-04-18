"use client";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "pill" | "underline";
type Ctx = { value: string; onChange: (v: string) => void; variant: Variant };
const TabsCtx = createContext<Ctx | null>(null);

type TabsListProps = {
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

export function TabsList({ value, onChange, children, className, variant = "pill" }: TabsListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLButtonElement>(
      `[data-value="${CSS.escape(value)}"]`
    );
    if (!el) return;
    setRect({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, children]);

  const container =
    variant === "underline"
      ? "relative inline-flex items-center gap-4 border-b border-border"
      : "relative inline-flex items-center gap-1 rounded-md bg-muted p-1";

  return (
    <TabsCtx.Provider value={{ value, onChange, variant }}>
      <div ref={ref} role="tablist" className={cn(container, className)}>
        {rect && variant === "pill" && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: rect.left, width: rect.width }}
            transition={{ type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ top: 4, bottom: 4 }}
            className="pointer-events-none absolute left-0 rounded-sm bg-background shadow-sm"
          />
        )}
        {rect && variant === "underline" && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{ x: rect.left, width: rect.width }}
            transition={{ type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute -bottom-px left-0 h-0.5 bg-foreground"
          />
        )}
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

export function TabsTrigger({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("TabsTrigger must be inside <TabsList>");
  const active = ctx.value === value;
  const base =
    ctx.variant === "underline"
      ? "relative inline-flex h-9 items-center justify-center px-1 pb-2 text-sm font-medium transition-colors"
      : "relative inline-flex h-8 items-center justify-center rounded-sm px-3 text-sm font-medium transition-colors";
  return (
    <button
      type="button"
      role="tab"
      data-value={value}
      aria-selected={active}
      onClick={() => ctx.onChange(value)}
      className={cn(
        base,
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}
