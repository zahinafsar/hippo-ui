#!/usr/bin/env node
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://zahinafsar.github.io/hippo-ui/registry';
const COMPONENTS = ['accordion','alert','avatar','badge','breadcrumb','button','calendar','card','checkbox','combobox','command-palette','confirm-modal','data-table','date-picker','dialog','dropdown-menu','empty-state','input','label','pagination','popover','portal','progress','radio','select','separator','sheet','sidebar','skeleton','spinner','switch','table','tabs','textarea','toast','tooltip'];
const LIB = ['cn.ts','hooks.ts','anchor.ts'];

function usage() {
  console.log(`Usage:
  npx myhippo clone                  install all components
  npx myhippo add <name...>          install listed components
  npx myhippo update <name...>       redownload listed components
  npx myhippo remove <name...>       delete listed components`);
}

async function fetchFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const body = await res.text();
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, body);
  console.log(`  + ${dest}`);
}

async function removeFile(dest) {
  await rm(dest, { force: true });
  console.log(`  - ${dest}`);
}

function resolveTargets(args) {
  const unknown = args.filter(n => !COMPONENTS.includes(n));
  if (unknown.length) {
    console.error(`Unknown component(s): ${unknown.join(', ')}`);
    process.exit(1);
  }
  return args;
}

const [cmd, ...rest] = process.argv.slice(2);

if (!cmd || cmd === '-h' || cmd === '--help') {
  usage();
  process.exit(0);
}

const targets = resolveTargets(rest);

if (cmd === 'clone') {
  console.log('Cloning all hippo-ui components...');
  for (const f of LIB) {
    await fetchFile(`${BASE}/lib/${f}`, join('lib', f));
  }
  for (const name of COMPONENTS) {
    await fetchFile(`${BASE}/ui/${name}.tsx`, join('components', 'ui', `${name}.tsx`));
  }
  console.log('Done.');
} else if (cmd === 'add' || cmd === 'update') {
  if (!targets.length) {
    console.error(`No components specified.`);
    usage();
    process.exit(1);
  }
  console.log(`${cmd === 'add' ? 'Installing' : 'Updating'} hippo-ui components...`);
  for (const f of LIB) {
    await fetchFile(`${BASE}/lib/${f}`, join('lib', f));
  }
  for (const name of targets) {
    await fetchFile(`${BASE}/ui/${name}.tsx`, join('components', 'ui', `${name}.tsx`));
  }
  console.log('Done.');
} else if (cmd === 'remove') {
  if (!targets.length) {
    console.error(`No components specified.`);
    process.exit(1);
  }
  console.log('Removing hippo-ui components...');
  for (const name of targets) {
    await removeFile(join('components', 'ui', `${name}.tsx`));
  }
  console.log('Done.');
} else {
  console.error(`Unknown command: ${cmd}`);
  usage();
  process.exit(1);
}
