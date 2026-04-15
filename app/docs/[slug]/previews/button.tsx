"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1500);
        }}
      >
        Click to load
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="custom">Custom</Button>
      <Button size="sm"><PlusIcon />Small</Button>
      <Button size="md"><PlusIcon />Medium</Button>
      <Button size="lg"><PlusIcon />Large</Button>
    </div>
  );
}
