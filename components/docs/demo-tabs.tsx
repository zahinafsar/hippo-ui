"use client";
import { ReactNode, useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      <TabsList variant="underline" value={tab} onChange={(v) => setTab(v as Tab)}>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
      </TabsList>
      {tab === "preview" && <Preview>{preview}</Preview>}
      {tab === "code" && code}
      {tab === "install" && install}
    </div>
  );
}
