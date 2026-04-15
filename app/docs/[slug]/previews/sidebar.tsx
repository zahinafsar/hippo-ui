"use client";
import { useState } from "react";
import { User, Settings, LogOut, FileText, Users, LayoutGrid, CheckSquare } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarGroup, SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarPreview() {
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
