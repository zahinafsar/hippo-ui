"use client";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
];

export default function ComboboxPreview() {
  const [v, setV] = useState("");
  return <Combobox options={FRUITS} value={v} onValueChange={setV} placeholder="Search fruit..." />;
}
