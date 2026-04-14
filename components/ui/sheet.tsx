"use client";
import { ReactNode, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Portal } from "./portal";
import { cn } from "@/lib/cn";
import { useControllable, useEscapeKey, useFocusTrap } from "@/lib/hooks";

type Side = "left" | "right" | "top" | "bottom";
type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const SheetCtx = createContext<Ctx | null>(null);

function useSheetCtx() {
  const ctx = useContext(SheetCtx);
  if (!ctx) throw new Error("Sheet parts must be inside <Sheet>");
  return ctx;
}

type SheetProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: ReactNode;
};

export function Sheet({ open, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  return <SheetCtx.Provider value={{ open: isOpen, setOpen }}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({ children }: { children: ReactNode }) {
  const { setOpen } = useSheetCtx();
  return <span onClick={() => setOpen(true)}>{children}</span>;
}

const positions: Record<Side, string> = {
  left: "left-0 top-0 h-full w-80 border-r",
  right: "right-0 top-0 h-full w-80 border-l",
  top: "left-0 top-0 w-full h-80 border-b",
  bottom: "left-0 bottom-0 w-full h-80 border-t",
};

const slideFrom: Record<Side, { x?: number | string; y?: number | string }> = {
  left: { x: "-100%" },
  right: { x: "100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" },
};

type ContentProps = { children: ReactNode; className?: string; side?: Side };

export function SheetContent({ children, className, side = "right" }: ContentProps) {
  const { open, setOpen } = useSheetCtx();
  useEscapeKey(() => setOpen(false), open);
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60"
            />
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              initial={slideFrom[side]}
              animate={{ x: 0, y: 0 }}
              exit={slideFrom[side]}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed z-50 border-border bg-card p-6 shadow-lg",
                positions[side],
                className
              )}
            >
              {children}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export function SheetHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1.5 pr-8", className)}>{children}</div>;
}
export function SheetTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}
export function SheetDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}
