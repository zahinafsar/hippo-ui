# myhippo

Copy-paste React UI components. Tailwind + motion. You own the code.

## Usage

Run in your project root. No install needed — just `npx`.

```sh
npx myhippo clone                  # install every component + lib helpers
npx myhippo add <name...>          # install specific components
npx myhippo update <name...>       # redownload (overwrite) components
npx myhippo remove <name...>       # delete component files
npx myhippo theme <name>           # install a theme preset
npx myhippo skill [name]           # install an agent skill (default: hippo-ui)
```

Files land in `components/ui/` and helpers in `lib/`. No runtime package — edit freely.

## Components

`accordion`, `alert`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `checkbox`, `combobox`, `command-palette`, `confirm-modal`, `data-table`, `date-picker`, `dialog`, `dropdown-menu`, `empty-state`, `input`, `label`, `pagination`, `popover`, `portal`, `progress`, `radio`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `spinner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `tooltip`.

## Themes

12 curated presets inspired by real products and editor classics.

```sh
npx myhippo theme midnight
```

Available: `midnight`, `graphite`, `claude`, `sunset`, `ocean`, `forest`, `nord`, `dracula`, `mocha`, `sakura`, `solarized`, `monokai`.

Writes to `styles/hippo-theme.css`. Import from your global stylesheet:

```css
@import "tailwindcss";
@import "./styles/hippo-theme.css";
```

## Agent skills

Drop a skill file so Claude Code (or any Claude Agent SDK project) knows how to use hippo-ui without retyping rules.

```sh
npx myhippo skill
```

Writes to `.claude/skills/hippo-ui/SKILL.md`.

## Peer deps

```sh
npm i motion lucide-react
```

Requires React 18+ and Tailwind CSS v4.

## Docs

https://zahinafsar.github.io/hippo-ui
