import { CodeBlock } from "@/components/docs/code-block";

const installCmd = `npx myhippo skill`;

const skillSource = `---
name: hippo-ui
description: Use when building UI in a project that uses hippo-ui. Installs, updates, and composes copy-paste React components. Trigger on "add a button", "add a dialog", "theme the app", or "use hippo-ui".
---

# HippoUI skill

HippoUI components live under \`components/ui/\`. There is no runtime package — edit the source directly.

## CLI

\`\`\`bash
npx myhippo clone                  # install every component
npx myhippo add <name...>          # install specific components
npx myhippo update <name...>       # overwrite components
npx myhippo remove <name...>       # delete components
npx myhippo theme <name>           # install a theme preset
npx myhippo skill                  # install this skill
\`\`\`

## Rules

- Import from \`@/components/ui/<name>\`. Never from an npm package.
- If a component is missing, run \`npx myhippo add <name>\` — do not fabricate it.
- Use the \`cn\` helper from \`@/lib/cn\` for conditional classes.
- Respect CSS variables (\`bg-background\`, \`text-foreground\`, \`bg-primary\`, \`border-border\`). Never hardcode hex.
- Dark mode is class-based on \`<html>\`. Components already handle it.
- Animations use \`motion/react\`. Follow patterns in the component source.
`;

const layoutCmd = `.claude/
└── skills/
    └── hippo-ui/
        └── SKILL.md`;

export default function SkillPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold">Agent skill</h1>
        <p className="mt-2 text-muted-foreground">
          Drop a HippoUI skill into your repo so Claude Code (and any Claude Agent SDK project) knows how to install,
          compose, and theme HippoUI components without you retyping the rules every session.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">What is a skill?</h2>
        <p className="text-sm text-muted-foreground">
          A skill is a Markdown file with frontmatter that tells an AI agent when to activate and how to behave.
          Claude Code auto-loads anything under <code className="rounded bg-muted px-1 py-0.5 text-xs">.claude/skills/</code>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Install</h2>
        <p className="text-sm text-muted-foreground">
          One command. Drops <code className="rounded bg-muted px-1 py-0.5 text-xs">SKILL.md</code> in the right spot.
        </p>
        <CodeBlock code={installCmd} lang="bash" />
        <p className="text-sm text-muted-foreground">Result:</p>
        <CodeBlock code={layoutCmd} lang="bash" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">What the skill contains</h2>
        <p className="text-sm text-muted-foreground">
          Full source of the installed skill — CLI reference, import rules, theming conventions. Edit freely; you own
          the file.
        </p>
        <CodeBlock code={skillSource} lang="md" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Using it</h2>
        <ul className="list-disc pl-6 text-sm text-muted-foreground">
          <li>Open Claude Code in a repo with the skill installed.</li>
          <li>
            Ask something like <em>&quot;add a settings dialog using hippo-ui&quot;</em> — the skill activates, the agent runs{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">npx myhippo add dialog</code> if needed, imports from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">@/components/ui/dialog</code>, and wires it up.
          </li>
          <li>Works with the Claude Agent SDK too — point it at the same file.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Customize</h2>
        <p className="text-sm text-muted-foreground">
          Add project-specific rules (naming conventions, required wrappers, accessibility checklists) below the default
          block. The skill is just Markdown — agents read the whole file.
        </p>
      </section>
    </div>
  );
}
