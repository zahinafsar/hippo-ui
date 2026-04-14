"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { THEMES, themeToCss, type ThemeName } from "@/app/docs/theming/themes";

type Ctx = {
  palette: ThemeName;
  setPalette: (name: ThemeName) => void;
};

const PaletteContext = createContext<Ctx | null>(null);
const STYLE_ID = "hippo-palette";
const STORAGE_KEY = "hippo-palette";

function applyPalette(name: ThemeName) {
  const theme = THEMES.find((t) => t.name === name) ?? THEMES[0];
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = themeToCss(theme);
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<ThemeName>("zinc");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && THEMES.some((t) => t.name === stored)) {
      setPaletteState(stored);
    }
  }, []);

  useEffect(() => {
    applyPalette(palette);
    localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette: setPaletteState }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette outside provider");
  return ctx;
}
