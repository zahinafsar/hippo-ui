import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckboxExample,
  RadioExample,
  SwitchExample,
  SelectExample,
  DialogExample,
  ConfirmModalExample,
  SheetExample,
  PopoverExample,
  TooltipExample,
  DropdownMenuExample,
  ToastExample,
} from "./client-examples";
import {
  AlertExample,
  AvatarExample,
  ProgressExample,
  BreadcrumbExample,
  PaginationExample,
  EmptyStateExample,
  TabsExample,
  AccordionExample,
  TableExample,
  SidebarExample,
  ComboboxExample,
  CalendarExample,
  DatePickerExample,
  CommandPaletteExample,
  DataTableExample,
} from "./phase4-examples";
import type { ComponentSlug } from "@/lib/registry";

export const examples: Record<ComponentSlug, ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
  card: (
    <Card className="w-80">
      <p className="text-sm">A simple card. Compose anything inside.</p>
    </Card>
  ),
  input: (
    <Label content="Email" className="w-80">
      <Input type="email" placeholder="you@example.com" />
    </Label>
  ),
  label: (
    <Label content="Form label" className="w-80">
      <Input />
    </Label>
  ),
  separator: (
    <div className="flex w-80 flex-col gap-4">
      <div>Above</div>
      <Separator />
      <div>Below</div>
    </div>
  ),
  skeleton: (
    <div className="flex w-80 flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
  spinner: <Spinner className="h-6 w-6" />,
  textarea: (
    <Label content="Message" className="w-80">
      <Textarea placeholder="Type your message..." />
    </Label>
  ),
  checkbox: <CheckboxExample />,
  radio: <RadioExample />,
  switch: <SwitchExample />,
  select: <SelectExample />,
  portal: <span className="text-sm text-muted-foreground">Utility — see source.</span>,
  dialog: <DialogExample />,
  "confirm-modal": <ConfirmModalExample />,
  sheet: <SheetExample />,
  popover: <PopoverExample />,
  tooltip: <TooltipExample />,
  "dropdown-menu": <DropdownMenuExample />,
  toast: <ToastExample />,
  alert: <AlertExample />,
  avatar: <AvatarExample />,
  progress: <ProgressExample />,
  breadcrumb: <BreadcrumbExample />,
  pagination: <PaginationExample />,
  "empty-state": <EmptyStateExample />,
  tabs: <TabsExample />,
  accordion: <AccordionExample />,
  table: <TableExample />,
  sidebar: <SidebarExample />,
  combobox: <ComboboxExample />,
  calendar: <CalendarExample />,
  "date-picker": <DatePickerExample />,
  "command-palette": <CommandPaletteExample />,
  "data-table": <DataTableExample />,
};
