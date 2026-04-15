"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchPreview() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col items-start gap-3">
      <Label content="Small" position="right">
        <Switch size="sm" checked={on} onChange={(e) => setOn(e.target.checked)} />
      </Label>
      <Label content="Notifications" position="right">
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} />
      </Label>
      <Label content="Large" position="right">
        <Switch size="lg" checked={on} onChange={(e) => setOn(e.target.checked)} />
      </Label>
    </div>
  );
}
