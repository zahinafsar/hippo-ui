import { readdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import {
  c,
  hint,
  shortPath,
  hideCursor,
  showCursor,
  GUTTER,
  SYM_OPEN,
  SYM_DONE,
  paintStream,
} from './ui.mjs';

const ROWS = 10;

function listItems(dir, opts) {
  try {
    const raw = readdirSync(dir, { withFileTypes: true }).filter(
      (e) => !e.name.startsWith('.') && e.name !== 'node_modules',
    );
    const items = [];
    for (const e of raw) {
      if (e.isDirectory()) items.push({ name: e.name, dir: true });
      else if (opts.selectFiles && e.isFile()) {
        if (opts.extensions && !opts.extensions.includes(extname(e.name))) continue;
        items.push({ name: e.name, dir: false });
      }
    }
    return items.sort((a, b) =>
      a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1,
    );
  } catch {
    return [];
  }
}

export function pickDirectory(startDir, label, opts = {}) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('picker requires a TTY'));
      return;
    }

    const { selectFiles = false } = opts;
    let cursor = startDir;
    let entries = listItems(cursor, opts);
    let idx = 0;
    let viewStart = 0;

    const { stdin, stdout } = process;
    const stream = paintStream();

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    hideCursor();
    const armedAt = Date.now();

    function ensureView() {
      if (idx < viewStart) viewStart = idx;
      if (idx >= viewStart + ROWS) viewStart = idx - ROWS + 1;
      if (viewStart < 0) viewStart = 0;
    }

    function build() {
      ensureView();
      const lines = [];
      lines.push(GUTTER);
      lines.push(`${SYM_OPEN}  ${c.title}pick ${label}${c.reset}`);
      lines.push(`${GUTTER}  ${c.path}${shortPath(cursor)}${c.reset}`);
      lines.push(GUTTER);

      if (!entries.length) {
        lines.push(`${GUTTER}  ${c.dim}empty \u2014 \u2190 for parent${c.reset}`);
        for (let i = 1; i < ROWS; i++) lines.push(GUTTER);
      } else {
        const end = Math.min(entries.length, viewStart + ROWS);
        for (let i = viewStart; i < end; i++) {
          const item = entries[i];
          const display = item.dir ? `${item.name}/` : item.name;
          if (i === idx) {
            const mark = `\x1b[1;38;5;213m\u25cf\x1b[0m`;
            lines.push(`${GUTTER}  ${mark} ${c.selected}\x1b[1m${display}\x1b[0m`);
          } else {
            const mark = item.dir
              ? `${c.dim}\u25cb${c.reset}`
              : `${c.dim}\u00b7${c.reset}`;
            lines.push(`${GUTTER}  ${mark} ${c.muted}${display}${c.reset}`);
          }
        }
        for (let i = end - viewStart; i < ROWS; i++) lines.push(GUTTER);
      }

      lines.push(GUTTER);
      const keys = selectFiles
        ? [
            ['\u2191\u2193', 'move'],
            ['\u21b5', 'drill / select'],
            ['\u2190', 'parent'],
            ['esc', 'cancel'],
          ]
        : [
            ['\u2191\u2193', 'move'],
            ['\u21b5', 'select'],
            ['\u2192', 'drill'],
            ['\u2190', 'parent'],
            ['esc', 'cancel'],
          ];
      lines.push(`${GUTTER}  ${hint(keys)}`);
      return lines;
    }

    function render() {
      stream.paint(build());
    }

    function finalize(picked) {
      stream.paint([
        GUTTER,
        `${SYM_DONE}  ${c.title}${label}${c.reset}  ${c.dim}\u00b7${c.reset}  ${c.path}${shortPath(picked)}${c.reset}`,
      ]);
      stream.close();
    }

    function cleanup() {
      showCursor();
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
    }

    function drillInto(name) {
      cursor = join(cursor, name);
      entries = listItems(cursor, opts);
      idx = 0;
      viewStart = 0;
    }

    function goParent() {
      const parent = dirname(cursor);
      if (parent !== cursor) {
        cursor = parent;
        entries = listItems(cursor, opts);
        idx = 0;
        viewStart = 0;
      }
    }

    function onData(data) {
      if (data === '\x03') {
        cleanup();
        reject(new Error('cancelled'));
        return;
      }
      if (data === '\r' || data === '\n') {
        if (Date.now() - armedAt < 150) return;
        if (!entries.length) return;
        const item = entries[idx];
        if (selectFiles && item.dir) {
          drillInto(item.name);
          render();
          return;
        }
        const picked = join(cursor, item.name);
        cleanup();
        finalize(picked);
        resolve(picked);
        return;
      }
      if (data === '\x1b[A') {
        if (entries.length) idx = (idx - 1 + entries.length) % entries.length;
      } else if (data === '\x1b[B') {
        if (entries.length) idx = (idx + 1) % entries.length;
      } else if (data === '\x1b[C') {
        if (entries.length && entries[idx].dir) drillInto(entries[idx].name);
      } else if (data === '\x1b[D') {
        goParent();
      } else if (data === '\x1b[5~') {
        idx = Math.max(0, idx - ROWS);
      } else if (data === '\x1b[6~') {
        idx = Math.min(entries.length - 1, idx + ROWS);
      } else if (data === '\x1b') {
        cleanup();
        reject(new Error('cancelled'));
        return;
      }
      render();
    }

    stdin.on('data', onData);
    render();
  });
}

export function pickFile(startDir, label, extensions) {
  return pickDirectory(startDir, label, { selectFiles: true, extensions });
}
