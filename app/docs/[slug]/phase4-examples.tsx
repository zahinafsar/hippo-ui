"use client";
import { useState } from "react";
import { Inbox, Plus, User, Settings, LogOut, FileText, Users, LayoutGrid, CheckSquare } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarGroup, SidebarTrigger } from "@/components/ui/sidebar";
import { Combobox } from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { CommandPalette, CommandGroup, CommandItem } from "@/components/ui/command-palette";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

export function AlertExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>New update available.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  );
}

export function AvatarExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar src="https://github.com/zahinafsar.png" alt="zahinafsar" fallback="SC" />
      <Avatar fallback="JD" size="sm" />
      <Avatar fallback="AB" size="lg" />
    </div>
  );
}

export function ProgressExample() {
  const [v, setV] = useState(33);
  return (
    <div className="flex w-80 flex-col gap-3">
      <Progress value={v} />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.max(0, x - 10))}>-</Button>
        <Button size="sm" variant="outline" onClick={() => setV((x) => Math.min(100, x + 10))}>+</Button>
      </div>
    </div>
  );
}

export function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>Settings</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem current>Profile</BreadcrumbItem>
    </Breadcrumb>
  );
}

export function PaginationExample() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
}

export function EmptyStateExample() {
  return (
    <EmptyState
      icon={<Inbox className="h-12 w-12" />}
      title="No messages"
      description="When you receive messages, they'll show up here."
      action={<Button><Plus className="h-4 w-4" /> New message</Button>}
    />
  );
}

export function TabsExample() {
  const [tab, setTab] = useState("account");
  return (
    <div className="flex w-80 flex-col gap-3">
      <TabsList value={tab} onChange={setTab}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      {tab === "account" && <div>Account settings here.</div>}
      {tab === "password" && <div>Password settings here.</div>}
    </div>
  );
}

export function AccordionExample() {
  return (
    <Accordion defaultValue="1" className="w-80">
      <AccordionItem value="1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Follows WAI-ARIA patterns.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes, via motion/react.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alan Turing</TableCell>
          <TableCell>Editor</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function SidebarExample() {
  const [active, setActive] = useState("dashboard");
  return (
    <div className="h-96 overflow-hidden rounded-md border border-border">
      <Sidebar>
        <SidebarHeader>
          <span className="font-semibold">App</span>
          <SidebarTrigger className="ml-auto" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem icon={<User className="h-4 w-4" />} label="Dashboard" active={active === "dashboard"} onClick={() => setActive("dashboard")} />
          <SidebarGroup icon={<FileText className="h-4 w-4" />} label="Projects" defaultOpen>
            <SidebarItem icon={<LayoutGrid className="h-4 w-4" />} label="Overview" active={active === "overview"} onClick={() => setActive("overview")} />
            <SidebarItem icon={<CheckSquare className="h-4 w-4" />} label="Tasks" active={active === "tasks"} onClick={() => setActive("tasks")} />
            <SidebarItem icon={<Users className="h-4 w-4" />} label="Team" active={active === "team"} onClick={() => setActive("team")} />
          </SidebarGroup>
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" active={active === "settings"} onClick={() => setActive("settings")} />
          <SidebarItem icon={<LogOut className="h-4 w-4" />} label="Logout" active={active === "logout"} onClick={() => setActive("logout")} />
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
];

export function ComboboxExample() {
  const [v, setV] = useState("");
  return <Combobox options={FRUITS} value={v} onValueChange={setV} placeholder="Search fruit..." />;
}

export function CalendarExample() {
  const [d, setD] = useState<Date>(new Date());
  return <Calendar value={d} onChange={setD} />;
}

export function DatePickerExample() {
  const [d, setD] = useState<Date>();
  return <DatePicker value={d} onValueChange={setD} />;
}

export function CommandPaletteExample() {
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

type Person = { id: number; name: string; email: string; role: string };
const PEOPLE: Person[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: 2, name: "Alan Turing", email: "alan@example.com", role: "Editor" },
  { id: 3, name: "Grace Hopper", email: "grace@example.com", role: "Admin" },
  { id: 4, name: "Linus Torvalds", email: "linus@example.com", role: "Viewer" },
  { id: 5, name: "Margaret Hamilton", email: "margaret@example.com", role: "Editor" },
];

const personColumns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { key: "email", header: "Email", accessor: (r) => r.email, sortable: true },
  { key: "role", header: "Role", accessor: (r) => r.role, sortable: true },
];

export function DataTableExample() {
  return <DataTable columns={personColumns} data={PEOPLE} filterKey="name" filterPlaceholder="Filter names..." pageSize={3} />;
}
