"use client";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: {
    root: "h-4 w-7",
    track: "h-4 w-7",
    thumb: "h-3 w-3 left-0.5 top-0.5",
    translate: 12,
  },
  md: {
    root: "h-6 w-10",
    track: "h-6 w-10",
    thumb: "h-5 w-5 left-0.5 top-0.5",
    translate: 16,
  },
  lg: {
    root: "h-7 w-12",
    track: "h-7 w-12",
    thumb: "h-6 w-6 left-0.5 top-0.5",
    translate: 20,
  },
};

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  size?: keyof typeof sizes;
};

export function Switch({ className, checked, size = "md", ...p }: Props) {
  const s = sizes[size];
  return (
    <label className={cn("relative inline-flex shrink-0 cursor-pointer items-center", s.root, className)}>
      <input type="checkbox" checked={checked} className="peer sr-only" {...p} />
      <span className={cn("rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:opacity-50", s.track)} />
      <span
        className={cn("pointer-events-none absolute rounded-full bg-background shadow transition-transform", s.thumb)}
        style={{ transform: checked ? `translateX(${s.translate}px)` : "translateX(0)" }}
      />
    </label>
  );
}
