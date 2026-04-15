"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function ProgressPreview() {
  const [v, setV] = useState(33);
  return (
    <div className="flex w-80 flex-col gap-3">
      <Progress value={v} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.max(0, x - 10))}>-</Button>
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.min(100, x + 10))}>+</Button>
      </div>
    </div>
  );
}
