#!/usr/bin/env node
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { resolveConfig } from './lib/config.mjs';
import { rewriteImports } from './lib/rewrite.mjs';
import { selectOption } from './lib/select.mjs';
import { pickFile } from './lib/picker.mjs';

const BASE = 'https://zahinafsar.github.io/hippo-ui/registry';
const COMPONENTS = ['accordion','alert','avatar','badge','breadcrumb','button','calendar','card','checkbox','combobox','command-palette','confirm-modal','data-table','date-picker','date-time-picker','dialog','dropdown-menu','empty-state','file-input','input','label','pagination','popover','portal','progress','radio','select','separator','sheet','sidebar','skeleton','spinner','switch','table','tabs','textarea','toast','tooltip'];
const LIB = ['cn.ts','hooks.ts','anchor.ts'];
const THEMES = ['midnight','graphite','claude','sunset','ocean','forest','nord','dracula','mocha','sakura','solarized','monokai'];
const SKILLS = ['hippo-ui'];

function usage() {
  console.log(`Usage:
  npx myhippo clone                  install all components
  npx myhippo add <name...>          install listed components
  npx myhippo update <name...>       redownload listed components
  npx myhippo remove <name...>       delete listed components
  npx myhippo theme <name>           install a theme preset (${THEMES.join('|')})
  npx myhippo skill [name]           install agent skill (default: hippo-ui)`);
}

async function fetchFile(url, dest, cfg) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  let body = await res.text();
  if (cfg && /\.(tsx?|jsx?)$/.test(dest)) {
    body = rewriteImports(body, dest, cfg);
  }
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, body);
  console.log(`  + ${dest}`);
}

async function removeFile(dest) {
  await rm(dest, { force: true });
  console.log(`  - ${dest}`);
}

function resolveTargets(args) {
  const unknown = args.filter((n) => !COMPONENTS.includes(n));
  if (unknown.length) {
    console.error(`Unknown component(s): ${unknown.join(', ')}`);
    process.exit(1);
  }
  return args;
}

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));

const [cmd, ...rest] = process.argv.slice(2);

try {
  await main(cmd, rest);
} catch {
  process.exit(1);
}

async function main(cmd, rest) {
if (!cmd || cmd === '-h' || cmd === '--help') {
  usage();
  return;
}

if (cmd === 'theme') {
  const name = rest[0] || 'zinc';
  if (!THEMES.includes(name)) {
    console.error(`Unknown theme: ${name}. Available: ${THEMES.join(', ')}`);
    process.exit(1);
  }
  console.log(`Installing hippo-ui theme: ${name}`);
  const target = await pickFile(process.cwd(), 'global CSS file', ['.css']);
  const res = await fetch(`${BASE}/themes/${name}.css`);
  if (!res.ok) throw new Error(`${res.status} ${name}`);
  const themeBody = (await res.text()).trim();
  const themeInline = `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`;
  const full = `@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

${themeBody}

${themeInline}
`;
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, full);
  console.log(`  ~ ${target}`);
  console.log(`Done.`);
  return;
}

if (cmd === 'skill') {
  const name = rest[0] || 'hippo-ui';
  if (!SKILLS.includes(name)) {
    console.error(`Unknown skill: ${name}. Available: ${SKILLS.join(', ')}`);
    process.exit(1);
  }
  const target = await selectOption('Install skill for which tool?', [
    { value: 'claude', label: 'Claude Code', hint: '.claude/skills' },
    { value: 'codex', label: 'Codex', hint: '.codex' },
    { value: 'opencode', label: 'OpenCode', hint: '.opencode' },
    { value: 'cursor', label: 'Cursor', hint: '.cursor/rules' },
  ]);
  const destMap = {
    claude: join('.claude', 'skills', name, 'SKILL.md'),
    codex: join('.codex', `${name}.md`),
    opencode: join('.opencode', `${name}.md`),
    cursor: join('.cursor', 'rules', `${name}.mdc`),
  };
  const dest = destMap[target];
  console.log(`Installing hippo-ui agent skill: ${name} (${target})`);
  await fetchFile(`${BASE}/skills/${name}.md`, dest);
  console.log(`Done.`);
  return;
}

if (cmd === 'clone') {
  const cfg = await resolveConfig(['lib', 'components']);
  console.log('Cloning all hippo-ui components...');
  for (const f of LIB) {
    await fetchFile(`${BASE}/lib/${f}`, join(cfg.lib, f), cfg);
  }
  for (const name of COMPONENTS) {
    await fetchFile(`${BASE}/ui/${name}.tsx`, join(cfg.components, `${name}.tsx`), cfg);
  }
  console.log('Done.');
  return;
}

if (cmd === 'add' || cmd === 'update') {
  const targets = resolveTargets(rest);
  if (!targets.length) {
    console.error(`No components specified.`);
    usage();
    process.exit(1);
  }
  const cfg = await resolveConfig(['lib', 'components']);
  console.log(`${cmd === 'add' ? 'Installing' : 'Updating'} hippo-ui components...`);
  for (const f of LIB) {
    await fetchFile(`${BASE}/lib/${f}`, join(cfg.lib, f), cfg);
  }
  for (const name of targets) {
    await fetchFile(`${BASE}/ui/${name}.tsx`, join(cfg.components, `${name}.tsx`), cfg);
  }
  console.log('Done.');
  return;
}

if (cmd === 'remove') {
  const targets = resolveTargets(rest);
  if (!targets.length) {
    console.error(`No components specified.`);
    process.exit(1);
  }
  const cfg = await resolveConfig(['components']);
  console.log('Removing hippo-ui components...');
  for (const name of targets) {
    await removeFile(join(cfg.components, `${name}.tsx`));
  }
  console.log('Done.');
  return;
}

console.error(`Unknown command: ${cmd}`);
usage();
process.exit(1);
}
