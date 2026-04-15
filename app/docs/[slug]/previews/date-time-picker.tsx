"use client";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export default function DateTimePickerPreview() {
  const [d, setD] = useState<Date>();
  return <DateTimePicker value={d} onValueChange={setD} />;
}
