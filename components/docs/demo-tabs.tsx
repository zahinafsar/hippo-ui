"use client";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { Preview } from "./preview";

type Tab = "preview" | "code" | "install";

type Props = {
  preview: ReactNode;
  code: ReactNode;
  install: ReactNode;
};

export function DemoTabs({ preview, code, install }: Props) {
  const [tab, setTab] = useState<Tab>("preview");

  return (
    <div className="flex flex-col gap-3">
      <div className="inline-flex w-fit items-center gap-1 rounded-md bg-muted p-1">
        <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
          Preview
        </TabButton>
        <TabButton active={tab === "code"} onClick={() => setTab("code")}>
          Code
        </TabButton>
        <TabButton active={tab === "install"} onClick={() => setTab("install")}>
          Install
        </TabButton>
      </div>
      {tab === "preview" && <Preview>{preview}</Preview>}
      {tab === "code" && code}
      {tab === "install" && install}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center justify-center rounded-sm px-3 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
