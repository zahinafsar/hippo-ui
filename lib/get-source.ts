import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getSource(name: string): Promise<string> {
  const file = path.join(process.cwd(), "components", "ui", `${name}.tsx`);
  return readFile(file, "utf8");
}

export async function getPreviewSource(slug: string): Promise<string> {
  const file = path.join(process.cwd(), "app", "docs", "[slug]", "previews", `${slug}.tsx`);
  return readFile(file, "utf8");
}
