"use client";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export default function ToastPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast({ title: "Default toast" })}>Default</Button>
      <Button variant="outline" onClick={() => toast({ title: "Success!", description: "Saved.", variant: "success" })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast({ title: "Error", description: "Try again.", variant: "error" })}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast({ title: "Info", variant: "info" })}>
        Info
      </Button>
    </div>
  );
}
