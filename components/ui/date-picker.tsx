"use client";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Portal } from "./portal";
import { Calendar } from "./calendar";
import { cn } from "@/lib/cn";
import { useClickOutside, useEscapeKey, useControllable } from "@/lib/hooks";
import { useAnchorPosition } from "@/lib/anchor";

type Props = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (d: Date) => void;
  placeholder?: string;
  className?: string;
};

export function DatePicker({ value, defaultValue, onValueChange, placeholder = "Pick a date", className }: Props) {
  const [val, setVal] = useControllable<Date | undefined>(value, defaultValue, (v) => v && onValueChange?.(v));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pos = useAnchorPosition(anchorRef, contentRef, open, "bottom", "start");

  useClickOutside(contentRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-10 w-64 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
      >
        <CalIcon className="h-4 w-4 opacity-70" />
        <span className={cn(!val && "text-muted-foreground")}>
          {val ? format(val, "PPP") : placeholder}
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
              className="z-50"
            >
              <Calendar
                value={val}
                onChange={(d) => {
                  setVal(d);
                  setOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
