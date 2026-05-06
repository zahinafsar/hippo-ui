"use client";
import { useEffect, useRef, useState } from "react";
import { format, setHours, setMinutes } from "date-fns";
import { Calendar as CalIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Portal } from "./portal";
import { Calendar } from "./calendar";
import { cn } from "@/lib/cn";
import { useClickOutside, useEscapeKey, useControllable } from "@/lib/hooks";
import { useAnchorPosition } from "@/lib/anchor";

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const MERIDIEMS = ["AM", "PM"] as const;
type Meridiem = (typeof MERIDIEMS)[number];

type Props = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (d: Date) => void;
  placeholder?: string;
  className?: string;
};

export function DateTimePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick date & time",
  className,
}: Props) {
  const [val, setVal] = useControllable<Date | undefined>(value, defaultValue, (v) => v && onValueChange?.(v));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pos = useAnchorPosition(anchorRef, contentRef, open, "bottom", "start");

  useClickOutside(contentRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  const base = val ?? new Date();
  const hours24 = base.getHours();
  const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minute = base.getMinutes();
  const meridiem: Meridiem = hours24 >= 12 ? "PM" : "AM";

  const setTime = (h12: number, m: number, mer: Meridiem) => {
    const h24 = (h12 % 12) + (mer === "PM" ? 12 : 0);
    setVal(setMinutes(setHours(val ?? new Date(), h24), m));
  };

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-10 w-64 items-center gap-2 rounded-md border border-input bg-muted px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <CalIcon className="h-4 w-4 opacity-70" />
        <span className={cn(!val && "text-muted-foreground")}>
          {val ? format(val, "PPP p") : placeholder}
        </span>
      </button>
      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              style={{ position: "absolute", top: pos.top, left: pos.left }}
              className="z-50 flex items-stretch rounded-md border border-border bg-card shadow-md"
            >
              <Calendar
                className="w-auto rounded-none border-0 bg-transparent"
                value={val}
                onChange={(d) => {
                  const next = setMinutes(setHours(d, base.getHours()), base.getMinutes());
                  setVal(next);
                }}
              />
              <div className="flex gap-1 border-l border-border py-3 pl-2 pr-3">
                <TimeColumn
                  items={HOURS_12}
                  value={hour12}
                  format2={(n) => String(n).padStart(2, "0")}
                  onSelect={(h) => setTime(h, minute, meridiem)}
                />
                <TimeColumn
                  items={MINUTES}
                  value={minute}
                  format2={(n) => String(n).padStart(2, "0")}
                  onSelect={(m) => setTime(hour12, m, meridiem)}
                />
                <TimeColumn
                  items={[...MERIDIEMS]}
                  value={meridiem}
                  format2={(m) => String(m)}
                  onSelect={(m) => setTime(hour12, minute, m as Meridiem)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

function TimeColumn<T extends string | number>({
  items,
  value,
  format2,
  onSelect,
}: {
  items: readonly T[];
  value: T;
  format2: (v: T) => string;
  onSelect: (v: T) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.querySelector<HTMLButtonElement>(`[data-selected="true"]`);
    el?.scrollIntoView({ block: "center" });
  }, [value]);

  return (
    <div ref={ref} className="flex h-64 w-12 flex-col gap-1 overflow-y-auto scroll-smooth px-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      {items.map((v) => {
        const selected = v === value;
        return (
          <button
            key={String(v)}
            type="button"
            data-selected={selected}
            onClick={() => onSelect(v)}
            className={cn(
              "h-9 shrink-0 rounded-md text-sm font-medium transition-colors",
              selected
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-accent"
            )}
          >
            {format2(v)}
          </button>
        );
      })}
    </div>
  );
}
