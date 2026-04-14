import type { ComponentSlug } from "@/lib/registry";

export const usage: Record<ComponentSlug, string> = {
  button: `import { Button } from "@/components/ui/button";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`,

  badge: `import { Badge } from "@/components/ui/badge";

<Badge>Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="danger">Danger</Badge>`,

  card: `import { Card } from "@/components/ui/card";

<Card className="w-80">
  <p>A simple card. Compose anything inside.</p>
</Card>`,

  input: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Label content="Email">
  <Input type="email" placeholder="you@example.com" />
</Label>`,

  label: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<Label content="Form label">
  <Input />
</Label>`,

  separator: `import { Separator } from "@/components/ui/separator";

<div>Above</div>
<Separator />
<div>Below</div>`,

  skeleton: `import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />`,

  spinner: `import { Spinner } from "@/components/ui/spinner";

<Spinner className="h-6 w-6" />`,

  textarea: `import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

<Label content="Message">
  <Textarea placeholder="Type your message..." />
</Label>`,

  checkbox: `import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const [checked, setChecked] = useState(true);

<Checkbox id="cb" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
<Label htmlFor="cb">Accept terms</Label>`,

  radio: `import { useState } from "react";
import { RadioGroup, Radio } from "@/components/ui/radio";

const [value, setValue] = useState("medium");

<RadioGroup value={value} onValueChange={setValue} name="size">
  <label><Radio value="small" /> Small</label>
  <label><Radio value="medium" /> Medium</label>
  <label><Radio value="large" /> Large</label>
</RadioGroup>`,

  switch: `import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const [on, setOn] = useState(false);

<Switch id="sw" checked={on} onChange={(e) => setOn(e.target.checked)} />
<Label htmlFor="sw">Notifications</Label>`,

  select: `import { useState } from "react";
import { Select } from "@/components/ui/select";

const [value, setValue] = useState("");

<Select
  value={value}
  onValueChange={setValue}
  placeholder="Pick a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "durian", label: "Durian", disabled: true },
  ]}
/>`,

  portal: `import { Portal } from "@/components/ui/portal";

<Portal>
  <div>Rendered into document.body</div>
</Portal>`,

  dialog: `import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <h2 className="text-lg font-semibold">Edit profile</h2>
  <p className="text-sm text-muted-foreground">Make changes here.</p>
  <div className="mt-6 flex justify-end gap-2">
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Save</Button>
  </div>
</Dialog>`,

  "confirm-modal": `// 1. Mount once (e.g. app/layout.tsx):
import { ConfirmRoot } from "@/components/ui/confirm-modal";
<ConfirmRoot />

// 2. Call imperatively:
import { useConfirm } from "@/components/ui/confirm-modal";
import { Button } from "@/components/ui/button";

const { confirm } = useConfirm();

<Button
  variant="danger"
  onClick={() =>
    confirm({
      title: "Are you sure?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: () => console.log("deleted"),
      // or: onAsyncConfirm: async () => { await api.delete() }
    })
  }
>
  Delete
</Button>`,

  sheet: `import {
  Sheet, SheetTrigger, SheetContent,
  SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

<Sheet>
  <SheetTrigger><Button>Open sheet</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Notifications</SheetTitle>
      <SheetDescription>Recent activity.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,

  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

<Popover>
  <PopoverTrigger><Button>Open popover</Button></PopoverTrigger>
  <PopoverContent>
    <h4>Dimensions</h4>
  </PopoverContent>
</Popover>`,

  tooltip: `import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

<Tooltip content="Save your changes">
  <Button>Hover me</Button>
</Tooltip>`,

  "dropdown-menu": `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger><Button>Open menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onSelect={() => {}}>Profile</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => {}}>Settings</DropdownMenuItem>
    <DropdownMenuItem disabled>Billing</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,

  toast: `import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

<Button onClick={() => toast({ title: "Default toast" })}>Default</Button>
<Button onClick={() => toast({ title: "Saved!", variant: "success" })}>Success</Button>
<Button onClick={() => toast({ title: "Error", variant: "error" })}>Error</Button>

// Mount <Toaster /> once in your root layout.`,

  alert: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert variant="info">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>New update available.</AlertDescription>
</Alert>`,

  avatar: `import { Avatar } from "@/components/ui/avatar";

<Avatar src="https://github.com/zahinafsar.png" alt="zahinafsar" fallback="SC" />
<Avatar fallback="JD" size="sm" />
<Avatar fallback="AB" size="lg" />`,

  progress: `import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const [v, setV] = useState(33);

<Progress value={v} />`,

  breadcrumb: `import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbItem>Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>Settings</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem current>Profile</BreadcrumbItem>
</Breadcrumb>`,

  pagination: `import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

const [page, setPage] = useState(1);

<Pagination page={page} pageCount={10} onPageChange={setPage} />`,

  "empty-state": `import { Inbox, Plus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

<EmptyState
  icon={<Inbox className="h-12 w-12" />}
  title="No messages"
  description="When you receive messages, they'll show up here."
  action={<Button><Plus className="h-4 w-4" /> New message</Button>}
/>`,

  tabs: `import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const [tab, setTab] = useState("account");

<TabsList value={tab} onChange={setTab}>
  <TabsTrigger value="account">Account</TabsTrigger>
  <TabsTrigger value="password">Password</TabsTrigger>
</TabsList>
{tab === "account" && <div>Account settings here.</div>}
{tab === "password" && <div>Password settings here.</div>}`,

  accordion: `import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

<Accordion defaultValue="1">
  <AccordionItem value="1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. Follows WAI-ARIA patterns.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="2">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>Yes, via motion/react.</AccordionContent>
  </AccordionItem>
</Accordion>`,

  table: `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,

  sidebar: `import { User, Settings, LogOut, FileText } from "lucide-react";
import {
  Sidebar, SidebarHeader, SidebarContent, SidebarItem,
  SidebarGroup, SidebarTrigger,
} from "@/components/ui/sidebar";

<Sidebar>
  <SidebarHeader>
    <span>App</span>
    <SidebarTrigger className="ml-auto" />
  </SidebarHeader>
  <SidebarContent>
    <SidebarItem icon={<User />} label="Dashboard" active />
    <SidebarGroup icon={<FileText />} label="Projects" defaultOpen>
      <SidebarItem label="Overview" />
      <SidebarItem label="Tasks" />
    </SidebarGroup>
    <SidebarItem icon={<Settings />} label="Settings" />
    <SidebarItem icon={<LogOut />} label="Logout" />
  </SidebarContent>
</Sidebar>`,

  combobox: `import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const [value, setValue] = useState("");

<Combobox
  value={value}
  onValueChange={setValue}
  placeholder="Search fruit..."
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ]}
/>`,

  calendar: `import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const [date, setDate] = useState<Date>(new Date());

<Calendar value={date} onChange={setDate} />`,

  "date-picker": `import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

const [date, setDate] = useState<Date>();

<DatePicker value={date} onValueChange={setDate} />`,

  "command-palette": `import { useState } from "react";
import {
  CommandPalette, CommandGroup, CommandItem,
} from "@/components/ui/command-palette";
import { Button } from "@/components/ui/button";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open (\u2318K)</Button>
<CommandPalette open={open} onOpenChange={setOpen}>
  <CommandGroup heading="Suggestions">
    <CommandItem value="Calendar">Calendar</CommandItem>
    <CommandItem value="Search emoji">Search emoji</CommandItem>
  </CommandGroup>
</CommandPalette>`,

  "data-table": `import { DataTable, type DataTableColumn } from "@/components/ui/data-table";

type Person = { id: number; name: string; email: string; role: string };

const data: Person[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "Editor" },
];

const columns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { key: "email", header: "Email", accessor: (r) => r.email, sortable: true },
  { key: "role", header: "Role", accessor: (r) => r.role, sortable: true },
];

<DataTable columns={columns} data={data} filterKey="name" pageSize={10} />`,
};
