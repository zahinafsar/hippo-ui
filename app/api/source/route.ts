import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";

const ALLOWED = /^[a-z0-9-]+$/;

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name || !ALLOWED.test(name)) {
    return new Response("invalid name", { status: 400 });
  }
  try {
    const file = path.join(process.cwd(), "components", "ui", `${name}.tsx`);
    const content = await readFile(file, "utf8");
    return new Response(content, { headers: { "content-type": "text/plain" } });
  } catch {
    return new Response("not found", { status: 404 });
  }
}
