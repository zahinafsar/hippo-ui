import { homedir } from 'node:os';

const HOME = homedir();

export const c = {
  reset: '\x1b[0m',
  accent: '\x1b[38;5;213m',
  accentBold: '\x1b[1;38;5;213m',
  selected: '\x1b[1;38;5;156m',
  dim: '\x1b[38;5;240m',
  muted: '\x1b[38;5;244m',
  path: '\x1b[38;5;222m',
  check: '\x1b[38;5;120m',
  title: '\x1b[1;38;5;231m',
  hintKey: '\x1b[38;5;252m',
};

export function shortPath(p) {
  if (p === HOME) return '~';
  if (p.startsWith(HOME + '/')) return '~' + p.slice(HOME.length);
  return p;
}

export const GUTTER = `${c.dim}\u2502${c.reset}`;
export const SYM_OPEN = `\x1b[1;38;5;213m\u25c6\x1b[0m`;
export const SYM_DONE = `\x1b[38;5;120m\u25c7\x1b[0m`;

const PALETTE = [214, 120, 117, 141, 228, 203, 45, 213, 208, 156];
export function paletteColor(i) {
  return `\x1b[38;5;${PALETTE[i % PALETTE.length]}m`;
}

export function paintStream() {
  let prev = 0;
  return {
    paint(lines) {
      const { stdout } = process;
      if (prev) stdout.write(`\x1b[${prev}A\x1b[0J`);
      stdout.write(lines.join('\n') + '\n');
      prev = lines.length;
    },
    close() {
      prev = 0;
    },
  };
}

export function breadcrumb(segments) {
  return segments
    .filter(Boolean)
    .map((s) => `${c.path}${s}${c.reset}`)
    .join(` ${c.dim}\u203a${c.reset} `);
}

export function hint(parts) {
  return parts
    .map(([key, desc]) => `${c.hintKey}${key}${c.reset} ${c.dim}${desc}${c.reset}`)
    .join(` ${c.dim}\u00b7${c.reset} `);
}

export function hideCursor() {
  process.stdout.write('\x1b[?25l');
}

export function showCursor() {
  process.stdout.write('\x1b[?25h');
}

export function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[H');
}
