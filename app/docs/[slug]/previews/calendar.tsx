"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPreview() {
  const [d, setD] = useState<Date>(new Date());
  return <Calendar value={d} onChange={setD} />;
}
