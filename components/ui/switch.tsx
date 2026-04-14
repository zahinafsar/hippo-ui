"use client";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Switch({ className, checked, ...p }: Props) {
  return (
    <label className={cn("relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center", className)}>
      <input type="checkbox" checked={checked} className="peer sr-only" {...p} />
      <span className="h-6 w-10 rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:opacity-50" />
      <span
        className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform"
        style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
      />
    </label>
  );
}
