import { readdir, mkdir, copyFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const srcUi = path.join(root, "components", "ui");
const srcLib = path.join(root, "lib");
const srcThemes = path.join(root, "themes");
const srcSkills = path.join(root, "skills");
const outBase = path.join(root, "public", "registry");
const outUi = path.join(outBase, "ui");
const outLib = path.join(outBase, "lib");
const outThemes = path.join(outBase, "themes");
const outSkills = path.join(outBase, "skills");

const LIB_FILES = ["cn.ts", "hooks.ts", "anchor.ts"];

if (existsSync(outBase)) await rm(outBase, { recursive: true });
await mkdir(outUi, { recursive: true });
await mkdir(outLib, { recursive: true });
await mkdir(outThemes, { recursive: true });
await mkdir(outSkills, { recursive: true });

const uiFiles = (await readdir(srcUi)).filter((f) => f.endsWith(".tsx"));
for (const f of uiFiles) {
  await copyFile(path.join(srcUi, f), path.join(outUi, f));
}
for (const f of LIB_FILES) {
  await copyFile(path.join(srcLib, f), path.join(outLib, f));
}

const themeFiles = existsSync(srcThemes)
  ? (await readdir(srcThemes)).filter((f) => f.endsWith(".css"))
  : [];
for (const f of themeFiles) {
  await copyFile(path.join(srcThemes, f), path.join(outThemes, f));
}

const skillFiles = existsSync(srcSkills)
  ? (await readdir(srcSkills)).filter((f) => f.endsWith(".md"))
  : [];
for (const f of skillFiles) {
  await copyFile(path.join(srcSkills, f), path.join(outSkills, f));
}

const components = uiFiles.map((f) => f.replace(/\.tsx$/, "")).sort();

const script = `#!/usr/bin/env bash
set -e

BASE="https://zahinafsar.github.io/hippo-ui/registry"
COMPONENTS=(${components.map((c) => `"${c}"`).join(" ")})
LIB=(${LIB_FILES.map((f) => `"${f}"`).join(" ")})

fetch_file() {
  local url="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  curl -fsSL "$url" -o "$dest"
  echo "  + $dest"
}

targets=("$@")
if [ \${#targets[@]} -eq 0 ]; then
  targets=("\${COMPONENTS[@]}")
fi

echo "Installing hippo-ui components..."
for f in "\${LIB[@]}"; do
  fetch_file "$BASE/lib/$f" "lib/$f"
done
for name in "\${targets[@]}"; do
  fetch_file "$BASE/ui/$name.tsx" "components/ui/$name.tsx"
done
echo "Done."
`;

await writeFile(path.join(root, "public", "install.sh"), script, { mode: 0o755 });

console.log(
  `synced ${uiFiles.length} components + ${LIB_FILES.length} lib files + ${themeFiles.length} themes + ${skillFiles.length} skills`
);
