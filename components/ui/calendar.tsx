"use client";
import { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

type Props = {
  value?: Date;
  onChange?: (d: Date) => void;
  className?: string;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({ value, onChange, className }: Props) {
  const [month, setMonth] = useState(() => value ?? new Date());

  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));
  const days = eachDayOfInterval({ start, end });

  return (
    <div className={cn("w-72 rounded-md border border-border bg-card p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => subMonths(m, 1))} aria-label="Previous month">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">{format(month, "MMMM yyyy")}</div>
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => addMonths(m, 1))} aria-label="Next month">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-xs font-medium text-muted-foreground">{w}</div>
        ))}
        {days.map((d) => {
          const selected = value && isSameDay(d, value);
          const outside = !isSameMonth(d, month);
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => onChange?.(d)}
              className={cn(
                "h-8 w-8 rounded-md text-sm transition-colors",
                outside && "text-muted-foreground/50",
                !selected && !outside && "hover:bg-accent",
                selected && "bg-primary text-primary-foreground hover:bg-primary/90",
                !selected && isToday(d) && "ring-1 ring-ring"
              )}
            >
              {format(d, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
