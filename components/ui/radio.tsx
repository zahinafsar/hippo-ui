"use client";
import { InputHTMLAttributes, createContext, useContext, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useControllable } from "@/lib/hooks";

type Ctx = { value: string; setValue: (v: string) => void; name: string };
const RadioGroupCtx = createContext<Ctx | null>(null);

type GroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  name?: string;
  className?: string;
  children: ReactNode;
};

export function RadioGroup({ value, defaultValue = "", onValueChange, name = "radio", className, children }: GroupProps) {
  const [val, setVal] = useControllable(value, defaultValue, onValueChange);
  return (
    <RadioGroupCtx.Provider value={{ value: val, setValue: setVal, name }}>
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        {children}
      </div>
    </RadioGroupCtx.Provider>
  );
}

type ItemProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "checked" | "onChange"> & {
  value: string;
};

export function Radio({ value, className, ...p }: ItemProps) {
  const ctx = useContext(RadioGroupCtx);
  if (!ctx) throw new Error("Radio must be inside RadioGroup");
  const checked = ctx.value === value;
  return (
    <label className={cn("relative inline-flex h-4 w-4 shrink-0 items-center justify-center", className)}>
      <input
        type="radio"
        name={ctx.name}
        value={value}
        checked={checked}
        onChange={() => ctx.setValue(value)}
        className="peer absolute inset-0 h-4 w-4 cursor-pointer opacity-0"
        {...p}
      />
      <span className="pointer-events-none flex h-4 w-4 items-center justify-center rounded-full border border-input bg-background transition-colors duration-150 peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:opacity-50">
        <span
          className={cn(
            "h-2 w-2 rounded-full bg-primary transition-all duration-150 ease-out",
            checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      </span>
    </label>
  );
}
