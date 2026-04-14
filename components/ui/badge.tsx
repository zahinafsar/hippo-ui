import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  danger: "bg-destructive text-destructive-foreground",
};

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({ variant = "primary", className, ...p }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...p}
    />
  );
}
