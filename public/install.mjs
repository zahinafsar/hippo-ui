import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://zahinafsar.github.io/hippo-ui/registry';
const COMPONENTS = ['accordion','alert','avatar','badge','breadcrumb','button','calendar','card','checkbox','combobox','command-palette','confirm-modal','data-table','date-picker','dialog','dropdown-menu','empty-state','input','label','pagination','popover','portal','progress','radio','select','separator','sheet','sidebar','skeleton','spinner','switch','table','tabs','textarea','toast','tooltip'];
const LIB = ['cn.ts','hooks.ts','anchor.ts'];

async function fetchFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const body = await res.text();
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, body);
  console.log(`  + ${dest}`);
}

const args = process.argv.slice(2).filter(a => a !== '-');
const targets = args.length ? args : COMPONENTS;

console.log('Installing hippo-ui components...');
for (const f of LIB) {
  await fetchFile(`${BASE}/lib/${f}`, join('lib', f));
}
for (const name of targets) {
  await fetchFile(`${BASE}/ui/${name}.tsx`, join('components', 'ui', `${name}.tsx`));
}
console.log('Done.');
