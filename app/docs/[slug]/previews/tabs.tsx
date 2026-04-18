"use client";
import { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsPreview() {
  const [tab, setTab] = useState("account");
  const [tab2, setTab2] = useState("account");
  return (
    <div className="flex w-80 flex-col gap-8">
      <div className="flex flex-col gap-3">
        <TabsList value={tab} onChange={setTab}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        {tab === "account" && <div>Account settings here.</div>}
        {tab === "password" && <div>Password settings here.</div>}
      </div>

      <div className="flex flex-col gap-3">
        <TabsList variant="underline" value={tab2} onChange={setTab2}>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        {tab2 === "account" && <div>Account settings here.</div>}
        {tab2 === "password" && <div>Password settings here.</div>}
      </div>
    </div>
  );
}
