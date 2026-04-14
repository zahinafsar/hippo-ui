"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

type Props = {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
  siblings?: number;
  className?: string;
};

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(page: number, pageCount: number, siblings: number): (number | "…")[] {
  const total = siblings * 2 + 5;
  if (pageCount <= total) return range(1, pageCount);
  const left = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, pageCount);
  const showLeftDots = left > 2;
  const showRightDots = right < pageCount - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblings * 2), "…", pageCount];
  }
  if (showLeftDots && !showRightDots) {
    return [1, "…", ...range(pageCount - (2 + siblings * 2), pageCount)];
  }
  return [1, "…", ...range(left, right), "…", pageCount];
}

export function Pagination({ page, pageCount, onPageChange, siblings = 1, className }: Props) {
  const pages = buildPages(page, pageCount, siblings);
  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-muted-foreground">…</span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "primary" : "outline"}
            size="icon"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        )
      )}
      <Button variant="outline" size="icon" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} aria-label="Next">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
