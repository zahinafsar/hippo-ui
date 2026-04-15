"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, MailIcon, SearchIcon } from "lucide-react";

export default function InputPreview() {
  const [show, setShow] = useState(false);
  return (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Plain" />
      <Input iconLeft={<MailIcon />} type="email" placeholder="you@example.com" />
      <Input iconRight={<SearchIcon />} placeholder="Search..." />
      <Input
        type={show ? "text" : "password"}
        placeholder="Password"
        iconRight={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="pointer-events-auto hover:text-foreground"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
    </div>
  );
}
