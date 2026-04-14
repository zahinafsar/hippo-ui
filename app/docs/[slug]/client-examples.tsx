"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, Radio } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { useConfirm } from "@/components/ui/confirm-modal";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";

export function CheckboxExample() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="cb" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <Label htmlFor="cb">Accept terms</Label>
    </div>
  );
}

export function RadioExample() {
  const [value, setValue] = useState("medium");
  return (
    <RadioGroup value={value} onValueChange={setValue} name="size">
      {["small", "medium", "large"].map((v) => (
        <label key={v} className="flex items-center gap-2 text-sm">
          <Radio value={v} />
          <span className="capitalize">{v}</span>
        </label>
      ))}
    </RadioGroup>
  );
}

export function SwitchExample() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Switch id="sw" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <Label htmlFor="sw">Notifications</Label>
    </div>
  );
}

export function DialogExample() {
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

export function ConfirmModalExample() {
  const { confirm } = useConfirm();
  return (
    <Button
      variant="danger"
      onClick={() =>
        confirm({
          title: "Are you sure?",
          message: "This action cannot be undone.",
          confirmText: "Delete",
          variant: "danger",
          onConfirm: () => toast({ title: "Deleted", variant: "success" }),
        })
      }
    >
      Delete account
    </Button>
  );
}

export function SheetExample() {
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

export function PopoverExample() {
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

export function TooltipExample() {
  return (
    <Tooltip content="Save your changes">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast({ title: "Profile" })}>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast({ title: "Settings" })}>Settings</DropdownMenuItem>
        <DropdownMenuItem disabled>Billing (soon)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast({ title: "Logged out", variant: "info" })}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ToastExample() {
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

export function SelectExample() {
  const [value, setValue] = useState("");
  return (
    <Select
      value={value}
      onValueChange={setValue}
      placeholder="Pick a fruit"
      options={[
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "durian", label: "Durian", disabled: true },
        { value: "elderberry", label: "Elderberry" },
      ]}
    />
  );
}
