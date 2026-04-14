import { CodeBlock } from "@/components/docs/code-block";

const installAll = `curl -fsSL https://zahinafsar.github.io/hippo-ui/install.sh | bash`;
const installOne = `curl -fsSL https://zahinafsar.github.io/hippo-ui/install.sh | bash -s button card dialog`;
const manualLib = `// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

export default function GettingStarted() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold">Getting started</h1>
        <p className="mt-2 text-muted-foreground">
          Copy-paste React components. Tailwind tokens, framer-motion animations, no runtime package.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Requirements</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          <li>React 19 (or 18)</li>
          <li>Tailwind CSS 4</li>
          <li>
            Peer deps: <code className="rounded bg-muted px-1 py-0.5 text-xs">motion</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">lucide-react</code>
          </li>
        </ul>
        <CodeBlock code={`npm i motion lucide-react`} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install everything</h2>
        <p className="text-sm text-muted-foreground">
          Run this at your project root. It pulls every component into{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">components/ui/</code> and helpers into{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/</code>.
        </p>
        <CodeBlock code={installAll} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install specific components</h2>
        <p className="text-sm text-muted-foreground">
          Pass component slugs as args. Helpers (<code className="rounded bg-muted px-1 py-0.5 text-xs">cn</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">hooks</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">anchor</code>) are always included.
        </p>
        <CodeBlock code={installOne} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Manual install</h2>
        <p className="text-sm text-muted-foreground">
          Don't want to run a script? Open any component page and copy the source. You also need{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/cn.ts</code>:
        </p>
        <CodeBlock code={manualLib} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Theme tokens</h2>
        <p className="text-sm text-muted-foreground">
          Components read CSS variables (<code className="rounded bg-muted px-1 py-0.5 text-xs">--background</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--primary</code>, …). Define them in your global stylesheet — see{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">app/globals.css</code> in this repo for reference.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">You own the code</h2>
        <p className="text-sm text-muted-foreground">
          Everything lands in your repo. No package upgrades, no breaking changes, no wrapper API. Edit freely.
        </p>
      </section>
    </div>
  );
}
