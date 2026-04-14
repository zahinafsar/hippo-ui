"use client";
import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useClickOutside, useEscapeKey, useControllable } from "@/lib/hooks";

export type SelectOption = { value: string; label: string; disabled?: boolean };

type Props = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function Select({
  options,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Select...",
  disabled,
  className,
}: Props) {
  const [val, setVal] = useControllable(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(() => {
    const i = options.findIndex((o) => o.value === val);
    return i >= 0 ? i : 0;
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const selected = options.find((o) => o.value === val);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[active];
      if (opt && !opt.disabled) {
        setVal(opt.value);
        setOpen(false);
      }
    }
  }

  return (
    <div ref={rootRef} className={cn("relative inline-block w-56", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-1 max-h-60 w-full origin-top overflow-auto rounded-md border border-border bg-card py-1 shadow-md"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === val;
              const isActive = i === active;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    if (opt.disabled) return;
                    setVal(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-3 py-1.5 text-sm",
                    isActive && "bg-accent text-accent-foreground",
                    opt.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {opt.label}
                  {isSelected && <Check className="h-4 w-4" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
