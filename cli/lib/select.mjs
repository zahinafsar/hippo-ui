import {
  c,
  hint,
  hideCursor,
  showCursor,
  GUTTER,
  SYM_OPEN,
  SYM_DONE,
  paletteColor,
  paintStream,
} from './ui.mjs';

export function selectOption(title, options) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('selectOption requires a TTY'));
      return;
    }
    const { stdin, stdout } = process;
    let idx = 0;
    const stream = paintStream();

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    hideCursor();
    const armedAt = Date.now();

    function build() {
      const lines = [];
      lines.push(GUTTER);
      lines.push(`${SYM_OPEN}  ${c.title}${title}${c.reset}`);
      options.forEach((opt, i) => {
        const col = paletteColor(i);
        const hintTxt = opt.hint ? `  ${c.dim}${opt.hint}${c.reset}` : '';
        if (i === idx) {
          lines.push(`${GUTTER}  \x1b[1;38;5;213m\u25cf\x1b[0m ${col}\x1b[1m${opt.label}\x1b[0m${hintTxt}`);
        } else {
          lines.push(`${GUTTER}  ${c.dim}\u25cb${c.reset} ${col}${opt.label}${c.reset}${hintTxt}`);
        }
      });
      lines.push(GUTTER);
      lines.push(
        `${GUTTER}  ` +
          hint([
            ['\u2191\u2193', 'move'],
            ['\u21b5', 'select'],
            ['esc', 'cancel'],
          ]),
      );
      return lines;
    }

    function render() {
      stream.paint(build());
    }

    function finalize(chosen) {
      stream.paint([
        GUTTER,
        `${SYM_DONE}  ${c.title}${title}${c.reset}  ${c.dim}\u00b7${c.reset}  ${c.check}${chosen.label}${c.reset}`,
      ]);
      stream.close();
    }

    function cleanup() {
      showCursor();
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
    }

    function onData(data) {
      if (data === '\x03') {
        cleanup();
        reject(new Error('cancelled'));
        return;
      }
      if (data === '\r' || data === '\n') {
        if (Date.now() - armedAt < 150) return;
        const chosen = options[idx];
        cleanup();
        finalize(chosen);
        resolve(chosen.value);
        return;
      }
      if (data === '\x1b[A') {
        idx = (idx - 1 + options.length) % options.length;
      } else if (data === '\x1b[B') {
        idx = (idx + 1) % options.length;
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
