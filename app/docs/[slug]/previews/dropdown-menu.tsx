"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => toast({ title: "Copied link" })}>Copy link</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast({ title: "Shared to email" })}>Email</DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Social</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => toast({ title: "Shared to Twitter" })}>Twitter</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({ title: "Shared to LinkedIn" })}>LinkedIn</DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Messengers</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => toast({ title: "Shared to Slack" })}>Slack</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toast({ title: "Shared to Discord" })}>Discord</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toast({ title: "Shared to Telegram" })}>Telegram</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Preferences</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onSelect={() => toast({ title: "Language set" })}>Language</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast({ title: "Theme updated" })}>Theme</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Notifications</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => toast({ title: "Email notifications on" })}>Email</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({ title: "Push notifications on" })}>Push</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({ title: "SMS notifications on" })}>SMS</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem disabled>Billing (soon)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast({ title: "Logged out", variant: "info" })}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
