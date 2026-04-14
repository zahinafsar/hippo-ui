import { CodeBlock } from "@/components/docs/code-block";
import { ThemePicker } from "./picker";
import { THEMES } from "./themes";

const cliCmd = `npx myhippo theme midnight`;

const importCmd = `/* app/globals.css */
@import "tailwindcss";
@import "./styles/hippo-theme.css";

@custom-variant dark (&:where(.dark, .dark *));`;

const themeMapping = `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --radius-md: var(--radius);
}`;

export default function Theming() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold">Theming</h1>
        <p className="mt-2 text-muted-foreground">
          12 curated presets inspired by real products and editor classics — Linear, Stripe, Anthropic, Nord, Dracula,
          Solarized, Monokai, Catppuccin. Pick one, copy the CSS, paste into your Tailwind global stylesheet. Every
          component reads CSS variables, so swapping the palette swaps the whole UI.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Preset picker</h2>
        <p className="text-sm text-muted-foreground">
          Click a preset to preview. Hit <code className="rounded bg-muted px-1 py-0.5 text-xs">Copy</code> and paste the
          block into <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code>.
        </p>
        <ThemePicker />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install via CLI</h2>
        <p className="text-sm text-muted-foreground">
          Prefer a one-liner? The <code className="rounded bg-muted px-1 py-0.5 text-xs">myhippo</code> CLI writes the
          chosen preset to <code className="rounded bg-muted px-1 py-0.5 text-xs">styles/hippo-theme.css</code>.
        </p>
        <CodeBlock code={cliCmd} lang="bash" />
        <p className="text-sm text-muted-foreground">Available presets:</p>
        <div className="flex flex-wrap gap-1.5">
          {THEMES.map((t) => (
            <code
              key={t.name}
              className="inline-flex items-center gap-1.5 rounded bg-muted px-2 py-1 text-xs"
            >
              <span
                className="h-3 w-3 rounded-full border border-border"
                style={{ background: t.swatch }}
              />
              {t.name}
            </code>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Wire it up</h2>
        <p className="text-sm text-muted-foreground">Import the theme file and enable the dark variant:</p>
        <CodeBlock code={importCmd} lang="css" />
        <p className="text-sm text-muted-foreground">
          Then map each variable to a Tailwind color token so classes like{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">bg-primary</code> resolve:
        </p>
        <CodeBlock code={themeMapping} lang="css" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Customize</h2>
        <p className="text-sm text-muted-foreground">
          Presets are just starting points. Edit any variable — every component updates because none of them hardcode
          colors. Keep the variable names identical so components keep resolving.
        </p>
      </section>
    </div>
  );
}
