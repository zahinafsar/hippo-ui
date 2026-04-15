"use client";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function TooltipPreview() {
  return (
    <Tooltip content="Save your changes">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}
