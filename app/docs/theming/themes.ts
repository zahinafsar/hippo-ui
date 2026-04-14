import themesData from "@/themes/themes.json";

export type ThemeVars = Record<string, string>;

export type Theme = {
  name: string;
  label: string;
  swatch: string;
  light: ThemeVars;
  dark: ThemeVars;
};

export const THEMES: Theme[] = themesData as Theme[];

export type ThemeName = (typeof THEMES)[number]["name"];

export function themeToCss(theme: Theme): string {
  const vars = (obj: ThemeVars) =>
    Object.entries(obj)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");
  return `:root {\n${vars(theme.light)}\n}\n\n.dark {\n${vars(theme.dark)}\n}\n`;
}
