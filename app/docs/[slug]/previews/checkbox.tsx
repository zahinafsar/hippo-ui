"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxPreview() {
  const [checked, setChecked] = useState(true);
  return (
    <Label content="Accept terms" position="right">
      <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    </Label>
  );
}
