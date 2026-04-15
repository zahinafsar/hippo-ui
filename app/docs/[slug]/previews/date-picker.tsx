"use client";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerPreview() {
  const [d, setD] = useState<Date>();
  return <DatePicker value={d} onValueChange={setD} />;
}
