"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function DropdownMenuPreview() {
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
