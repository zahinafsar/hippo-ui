"use client";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-1.5 pr-8">
          <h2 className="text-lg font-semibold">Edit profile</h2>
          <p className="text-sm text-muted-foreground">Make changes to your profile here.</p>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </div>
      </Dialog>
    </>
  );
}
