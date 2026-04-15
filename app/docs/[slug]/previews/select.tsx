"use client";
import { useState } from "react";
import { Select } from "@/components/ui/select";

export default function SelectPreview() {
  const [value, setValue] = useState("");
  return (
    <Select
      value={value}
      onValueChange={setValue}
      placeholder="Pick a fruit"
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "durian", label: "Durian", disabled: true },
        { value: "elderberry", label: "Elderberry" },
      ]}
    />
  );
}
