import { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "content"> {
  content?: ReactNode;
  children?: ReactNode;
}

export function Label({ className, content, children, ...p }: LabelProps) {
  return (
    <label className={cn("flex flex-col gap-2", className)} {...p}>
      {content !== undefined && (
        <span className="text-sm font-medium leading-none">{content}</span>
      )}
      {children}
    </label>
  );
}
