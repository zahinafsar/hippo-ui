"use client";
import { ReactNode, createContext, useContext, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Portal } from "./portal";
import { cn } from "@/lib/cn";
import { useClickOutside, useEscapeKey, useControllable } from "@/lib/hooks";
import { useAnchorPosition, type Side, type Align } from "@/lib/anchor";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
};
const MenuCtx = createContext<Ctx | null>(null);

function useMenuCtx() {
  const ctx = useContext(MenuCtx);
  if (!ctx) throw new Error("DropdownMenu parts must be inside <DropdownMenu>");
  return ctx;
}

type Props = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: ReactNode;
};

export function DropdownMenu({ open, defaultOpen = false, onOpenChange, children }: Props) {
  const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return <MenuCtx.Provider value={{ open: isOpen, setOpen, anchorRef }}>{children}</MenuCtx.Provider>;
}

export function DropdownMenuTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { setOpen, open, anchorRef } = useMenuCtx();
  return (
    <button
      ref={anchorRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={className}
    >
      {children}
    </button>
  );
}

type ContentProps = {
  children: ReactNode;
  className?: string;
  side?: Side;
  align?: Align;
};

export function DropdownMenuContent({ children, className, side = "bottom", align = "start" }: ContentProps) {
  const { open, setOpen, anchorRef } = useMenuCtx();
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const pos = useAnchorPosition(anchorRef, contentRef, open, side, align);

  useClickOutside(contentRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    if (open) setActive(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      const items = contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      if (!items || !items.length) return;
      const n = items.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % n);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + n) % n);
      } else if (e.key === "Enter") {
        e.preventDefault();
        items[active]?.click();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const items = contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    items?.forEach((el, i) => {
      el.dataset.active = i === active ? "true" : "false";
    });
  }, [active, open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{ position: "absolute", top: pos.top, left: pos.left }}
            className={cn("z-50 min-w-48 rounded-md border border-border bg-card p-1 shadow-md", className)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

type ItemProps = {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
};

export function DropdownMenuItem({ children, onSelect, disabled, className }: ItemProps) {
  const { setOpen } = useMenuCtx();
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        setOpen(false);
      }}
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}>{children}</div>;
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-border", className)} />;
}
