import { relative, dirname } from 'node:path';

function toPosix(p) {
  return p.replace(/\\/g, '/');
}

function prefix(p) {
  if (!p || p === '.') return '.';
  if (p.startsWith('.')) return p;
  return './' + p;
}

export function rewriteImports(text, destPath, cfg) {
  const fileDir = dirname(destPath);
  const libRel = prefix(toPosix(relative(fileDir, cfg.lib)));
  const compRel = prefix(toPosix(relative(fileDir, cfg.components)));
  return text
    .replace(/@\/lib\/([A-Za-z0-9_\-./]+)/g, (_, rest) => `${libRel}/${rest}`)
    .replace(/@\/components\/ui\/([A-Za-z0-9_\-./]+)/g, (_, rest) => `${compRel}/${rest}`);
}
