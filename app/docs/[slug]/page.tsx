import { notFound } from "next/navigation";
import { registry, type ComponentSlug } from "@/lib/registry";
import { getSource } from "@/lib/get-source";
import { CodeBlock } from "@/components/docs/code-block";
import { DemoTabs } from "@/components/docs/demo-tabs";
import { examples } from "./examples";
import { usage } from "./usage";

export function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = registry.find((c) => c.slug === slug);
  if (!meta) notFound();

  const source = await getSource(slug);
  const example = examples[slug as ComponentSlug];
  const usageCode = usage[slug as ComponentSlug];
  const installCmd = `curl -fsSL https://zahinafsar.github.io/hippo-ui/install.sh | bash -s ${slug}`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">{meta.name}</h1>
        <p className="mt-2 text-muted-foreground">{meta.description}</p>
      </div>
      <DemoTabs
        preview={example}
        code={<CodeBlock code={usageCode} />}
        install={
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              Run this in your project root to pull <code className="rounded bg-muted px-1 py-0.5 text-xs">{slug}</code> and its helpers:
            </p>
            <CodeBlock code={installCmd} />
            <p className="text-sm text-muted-foreground">Or copy the source directly:</p>
            <CodeBlock code={source} />
          </div>
        }
      />
    </div>
  );
}
