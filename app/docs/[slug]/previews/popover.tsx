"use client";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Dimensions</h4>
          <Input placeholder="Width" />
          <Input placeholder="Height" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
