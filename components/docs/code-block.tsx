import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

export async function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-xs text-muted-foreground">{lang}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="shiki-block overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
