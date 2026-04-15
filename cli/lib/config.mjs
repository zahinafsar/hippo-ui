import { readFile, writeFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { selectOption } from './select.mjs';
import { pickDirectory } from './picker.mjs';

const CONFIG_FILE = 'hippo.json';

export const DEFAULTS = {
  components: 'components/ui',
  lib: 'lib',
  skills: '.claude/skills',
  styles: 'styles',
};

async function loadRaw() {
  try {
    return JSON.parse(await readFile(CONFIG_FILE, 'utf8'));
  } catch {
    return null;
  }
}

export async function loadConfig() {
  const raw = await loadRaw();
  return raw ? { ...DEFAULTS, ...raw } : null;
}

async function saveConfig(cfg) {
  await writeFile(CONFIG_FILE, JSON.stringify(cfg, null, 2) + '\n');
  console.log(`  + ${CONFIG_FILE}`);
}

function relFromCwd(cwd, picked) {
  const r = relative(cwd, picked).replace(/\\/g, '/');
  return r || '.';
}

export async function resolveConfig(neededKeys) {
  const raw = await loadRaw();
  const missing = neededKeys.filter((k) => !raw || raw[k] === undefined);

  if (!missing.length) return { ...DEFAULTS, ...raw };

  if (!process.stdin.isTTY) {
    console.error('Non-TTY detected: using default paths.');
    return { ...DEFAULTS, ...(raw || {}) };
  }

  const mode = await selectOption('Where should hippo-ui files go?', [
    { value: 'default', label: 'default', hint: `components/ui \u00b7 lib` },
    { value: 'custom', label: 'custom', hint: 'pick folders' },
  ]);

  const merged = { ...(raw || {}) };
  if (mode === 'custom') {
    const cwd = process.cwd();
    for (const key of missing) {
      const picked = await pickDirectory(cwd, key);
      merged[key] = relFromCwd(cwd, picked);
    }
  } else {
    for (const key of missing) merged[key] = DEFAULTS[key];
  }
  await saveConfig(merged);

  return { ...DEFAULTS, ...merged };
}
