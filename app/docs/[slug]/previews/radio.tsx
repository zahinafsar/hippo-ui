"use client";
import { useState } from "react";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { Label } from "@/components/ui/label";

export default function RadioPreview() {
  const [value, setValue] = useState("medium");
  return (
    <RadioGroup value={value} onValueChange={setValue} name="size">
      {["small", "medium", "large"].map((v) => (
        <Label key={v} content={<span className="capitalize">{v}</span>} position="right">
          <Radio value={v} />
        </Label>
      ))}
    </RadioGroup>
  );
}
