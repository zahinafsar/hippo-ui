import { registry } from "@/lib/registry";
import { getSource } from "@/lib/get-source";
import { CodeBlock } from "@/components/docs/code-block";
import { DemoTabs } from "@/components/docs/demo-tabs";
import { examples } from "./[slug]/examples";
import { usage } from "./[slug]/usage";

export default async function DocsIndex() {
  const items = await Promise.all(
    registry.map(async (c) => ({ ...c, source: await getSource(c.slug) }))
  );

  return (
    <div className="flex flex-col gap-16">
      <div>
        <h1 className="text-4xl font-bold">Components</h1>
        <p className="mt-2 text-muted-foreground">
          {registry.length} copy-paste components. Preview, usage, source.
        </p>
      </div>

      {items.map((c) => (
        <section key={c.slug} id={c.slug} className="flex flex-col gap-4 scroll-mt-20">
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
            <h2 className="text-2xl font-semibold">{c.name}</h2>
            <code className="text-xs text-muted-foreground">components/ui/{c.slug}.tsx</code>
          </div>
          <p className="text-sm text-muted-foreground">{c.description}</p>
          <DemoTabs
            preview={examples[c.slug]}
            code={<CodeBlock code={usage[c.slug]} />}
            install={<CodeBlock code={c.source} />}
          />
        </section>
      ))}
    </div>
  );
}
