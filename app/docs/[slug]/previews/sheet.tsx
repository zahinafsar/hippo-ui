"use client";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Recent activity.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
