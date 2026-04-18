import { CodeBlock } from "@/components/docs/code-block";

const peerDeps = `npm i motion lucide-react`;
const cloneAll = `npx myhippo clone`;
const addSome = `npx myhippo add button card dialog`;
const updateSome = `npx myhippo update button dialog`;
const removeSome = `npx myhippo remove dialog`;
const themeInstall = `npx myhippo theme midnight`;
const skillInstall = `npx myhippo skill hippo-ui`;

const hippoJson = `{
  "components": "components/ui",
  "lib": "lib"
}`;

const manualLib = `// lib/cn.ts
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}`;

const usageExample = `import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button>Click me</Button>;
}`;

export default function GettingStarted() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold">Getting started</h1>
        <p className="mt-2 text-muted-foreground">
          Copy-paste React components. Tailwind tokens, motion animations, no runtime package. You own every file.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Requirements</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          <li>React 19 (or 18)</li>
          <li>Tailwind CSS 4</li>
          <li>Node 18+</li>
          <li>TypeScript project with <code className="rounded bg-muted px-1 py-0.5 text-xs">@/*</code> path alias (or run the CLI — it rewrites imports)</li>
        </ul>
        <p className="text-sm text-muted-foreground">Install peer deps:</p>
        <CodeBlock code={peerDeps} lang="bash" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install with the CLI</h2>
        <p className="text-sm text-muted-foreground">
          The <code className="rounded bg-muted px-1 py-0.5 text-xs">myhippo</code> CLI fetches component source
          from the registry, rewrites imports to match your project layout, and writes files into your repo. Nothing stays on
          <code className="rounded bg-muted px-1 py-0.5 text-xs mx-1">node_modules</code> — every file is yours to edit.
        </p>

        <h3 className="mt-2 text-lg font-semibold">Clone everything</h3>
        <p className="text-sm text-muted-foreground">
          Pulls all components into <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/</code> plus helpers
          (<code className="rounded bg-muted px-1 py-0.5 text-xs">cn</code>,
          <code className="rounded bg-muted px-1 py-0.5 text-xs mx-1">hooks</code>,
          <code className="rounded bg-muted px-1 py-0.5 text-xs">anchor</code>) into{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/</code>.
        </p>
        <CodeBlock code={cloneAll} lang="bash" />

        <h3 className="mt-4 text-lg font-semibold">Add specific components</h3>
        <p className="text-sm text-muted-foreground">
          Pass one or more slugs. Helpers are always included so imports resolve.
        </p>
        <CodeBlock code={addSome} lang="bash" />

        <h3 className="mt-4 text-lg font-semibold">Update or remove</h3>
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 text-xs">update</code> redownloads and overwrites.{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">remove</code> deletes the component file (helpers stay).
        </p>
        <CodeBlock code={updateSome} lang="bash" />
        <CodeBlock code={removeSome} lang="bash" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Config (hippo.json)</h2>
        <p className="text-sm text-muted-foreground">
          On first run the CLI asks where to put files. Choose <strong>default</strong> (
          <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui</code> and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">lib</code>) or <strong>custom</strong> (pick folders). It
          writes <code className="rounded bg-muted px-1 py-0.5 text-xs">hippo.json</code> at the repo root:
        </p>
        <CodeBlock code={hippoJson} lang="json" />
        <p className="text-sm text-muted-foreground">
          Edit this file anytime. The CLI rewrites <code className="rounded bg-muted px-1 py-0.5 text-xs">@/lib/*</code> and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">@/components/ui/*</code> imports to relative paths matching
          your config.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install a theme</h2>
        <p className="text-sm text-muted-foreground">
          Themes are CSS-variable presets. The CLI prompts for your global CSS file, then writes Tailwind 4 imports, the
          theme variables, and the <code className="rounded bg-muted px-1 py-0.5 text-xs">@theme inline</code> mapping.
        </p>
        <CodeBlock code={themeInstall} lang="bash" />
        <p className="text-sm text-muted-foreground">
          Available: <code className="rounded bg-muted px-1 py-0.5 text-xs">midnight</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">graphite</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">claude</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">sunset</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">ocean</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">forest</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">nord</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">dracula</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">mocha</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">sakura</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">solarized</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">monokai</code>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Agent skill</h2>
        <p className="text-sm text-muted-foreground">
          Install a component-aware skill for Claude Code, Codex, OpenCode, or Cursor. Your agent learns the registry and
          can add or edit hippo-ui components for you.
        </p>
        <CodeBlock code={skillInstall} lang="bash" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Manual install</h2>
        <p className="text-sm text-muted-foreground">
          Skip the CLI? Open any component page in the docs and copy the source into{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/&lt;name&gt;.tsx</code>. Add this helper at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/cn.ts</code>:
        </p>
        <CodeBlock code={manualLib} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Use it</h2>
        <p className="text-sm text-muted-foreground">
          Import from your local path. Every component is a plain React component — no provider, no wrapper.
        </p>
        <CodeBlock code={usageExample} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Theme tokens</h2>
        <p className="text-sm text-muted-foreground">
          Components read CSS variables —{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--background</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--primary</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--muted</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--border</code>, and more. Install a theme preset with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">npx myhippo theme &lt;name&gt;</code>, or define your own
          in <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code>. Toggle dark mode with a{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.dark</code> class on any ancestor.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">You own the code</h2>
        <p className="text-sm text-muted-foreground">
          Everything lands in your repo. No package upgrades, no breaking changes, no wrapper API. Rename, refactor, delete
          — the code is yours.
        </p>
      </section>
    </div>
  );
}
