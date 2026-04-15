"use client";
import { useState } from "react";
import { CommandPalette, CommandGroup, CommandItem } from "@/components/ui/command-palette";
import { Button } from "@/components/ui/button";

export default function CommandPalettePreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)}>Open (⌘K)</Button>
      <div className="text-xs text-muted-foreground">Press ⌘K / Ctrl+K to toggle</div>
      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandGroup heading="Suggestions">
          <CommandItem value="Calendar">Calendar</CommandItem>
          <CommandItem value="Search emoji">Search emoji</CommandItem>
          <CommandItem value="Calculator">Calculator</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem value="Profile">Profile</CommandItem>
          <CommandItem value="Billing">Billing</CommandItem>
        </CommandGroup>
      </CommandPalette>
    </div>
  );
}
