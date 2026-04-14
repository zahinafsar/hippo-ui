import { ReactNode } from "react";

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-md border border-border bg-background p-8">
      {children}
    </div>
  );
}
