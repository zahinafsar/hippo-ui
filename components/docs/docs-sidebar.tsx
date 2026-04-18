"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  AppWindow,
  Bell,
  Bone,
  Calendar,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ChevronsRight,
  ChevronsUpDown,
  CircleDot,
  Command,
  FileUp,
  Folders,
  Gauge,
  HelpCircle,
  Inbox,
  LoaderCircle,
  Menu,
  MessageSquare,
  Minus,
  MousePointerClick,
  MoveHorizontal,
  PanelLeft,
  PanelRightOpen,
  Palette,
  PenLine,
  Rocket,
  ShieldCheck,
  Sparkles,
  SquareCheck,
  SquareChevronDown,
  Table,
  Tag,
  TextCursorInput,
  ToggleLeft,
  Type,
  User,
  type LucideIcon,
} from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import type { registry } from "@/lib/registry";

type RegistryItem = (typeof registry)[number];

const GETTING_STARTED: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/docs/getting-started", label: "Introduction", icon: Rocket },
  { href: "/docs/theming", label: "Theming", icon: Palette },
  { href: "/docs/skill", label: "Agent Skill", icon: Sparkles },
];

const COMPONENT_ICONS: Record<string, LucideIcon> = {
  accordion: ChevronsUpDown,
  alert: AlertTriangle,
  avatar: User,
  badge: Tag,
  breadcrumb: ChevronsRight,
  button: MousePointerClick,
  calendar: Calendar,
  card: AppWindow,
  checkbox: SquareCheck,
  combobox: SquareChevronDown,
  "command-palette": Command,
  "confirm-modal": ShieldCheck,
  "data-table": Table,
  "date-picker": CalendarDays,
  "date-time-picker": CalendarClock,
  dialog: MessageSquare,
  "dropdown-menu": ChevronDown,
  "empty-state": Inbox,
  "file-input": FileUp,
  input: TextCursorInput,
  label: Type,
  pagination: MoveHorizontal,
  popover: MessageSquare,
  portal: PanelRightOpen,
  progress: Gauge,
  radio: CircleDot,
  select: ChevronDown,
  separator: Minus,
  sheet: PanelRightOpen,
  sidebar: PanelLeft,
  skeleton: Bone,
  spinner: LoaderCircle,
  switch: ToggleLeft,
  tabs: Folders,
  textarea: PenLine,
  toast: Bell,
  tooltip: HelpCircle,
};

function normalize(p: string) {
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

function NavBody({
  items,
  pathname,
  onNavigate,
}: {
  items: readonly RegistryItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <SectionLabel>Get Started</SectionLabel>
      {GETTING_STARTED.map((l) => (
        <NavLink key={l.href} href={l.href} active={pathname === l.href} icon={l.icon} onClick={onNavigate}>
          {l.label}
        </NavLink>
      ))}
      <SectionLabel className="mt-4">Components</SectionLabel>
      {items.map((c) => (
        <NavLink
          key={c.slug}
          href={`/docs/${c.slug}`}
          active={pathname === `/docs/${c.slug}`}
          icon={COMPONENT_ICONS[c.slug]}
          onClick={onNavigate}
        >
          {c.name}
        </NavLink>
      ))}
    </>
  );
}

export function DocsSidebar({ items }: { items: readonly RegistryItem[] }) {
  const pathname = normalize(usePathname() ?? "");
  return (
    <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 md:block">
      <Sidebar className="h-full border-r-0">
        <SidebarContent className="min-h-0 p-3">
          <NavBody items={items} pathname={pathname} />
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export function DocsMobileNav({ items }: { items: readonly RegistryItem[] }) {
  const pathname = normalize(usePathname() ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col gap-1 overflow-y-auto p-4 pt-12">
        <NavBody items={items} pathname={pathname} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", className)}>
      {children}
    </div>
  );
}

function NavLink({
  href,
  active,
  icon: Icon,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  icon?: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-r before:bg-primary before:transition-opacity",
        active
          ? "bg-accent text-accent-foreground font-medium before:opacity-100"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground before:opacity-0"
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="truncate">{children}</span>
    </Link>
  );
}
