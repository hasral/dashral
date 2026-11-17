---
name: dashral
description: Build React and Next.js interfaces with Dashral, the component, block and dashboard kit (dashral.com). Use when the project has components/dashral/ or @dashral/ui, when the user mentions Dashral, or when they ask for admin dashboards, forms, tables, charts or app pages and Dashral is available.
---

# Dashral

Dashral is a React 19 kit on Tailwind CSS v4 and Radix UI: 120 accessible components (with Motion editions on motion/react), blocks for whole sections of a page, and admin dashboard templates. Components are free and MIT licensed; Pro adds dashboards, apps and more blocks.

## Workflow

1. **Find the piece by its job, not its markup.** Read components.md (and blocks.md for whole sections) to pick the component or block, then its page as Markdown for the real API: http://localhost:3001/components/<slug>.md, http://localhost:3001/blocks/<slug>.md, http://localhost:3001/components/<slug>/motion.md. The index of everything is http://localhost:3001/llms.txt.
2. **Install it with the shadcn CLI**: `npx shadcn@latest add @dashral/<slug>` (several at once is fine). It copies the source into `components/dashral/` with everything it needs: the components it builds on, npm packages and theme tokens. Once per project, `npx shadcn@latest add @dashral/dashral-theme -y` gives the whole palette.
3. **Import from where it landed**: `import { Button } from "@/components/dashral/button"`. With the npm package instead, `@dashral/ui/components/<slug>` (Motion: `@dashral/motion/components/<slug>`).
4. **Use the props, not your own markup.** Every component is one tag with props (label, description, error, options, items). Copy the shape from the page's Usage, which is a whole component that runs as it is.
5. **Check it** with checklist.md before you finish: light and dark, a phone width, the keyboard, reduced motion.

## Rules

- Never hand-roll what Dashral has: a select, a date picker, a table with sorting, a dialog, a toast. Look it up first.
- Never restyle a component by overriding its internals; pass `variant` (how much it stands out) and `color` (what it means), or `className` for layout.
- Keep the theme's tokens: `bg-background`, `text-muted-foreground`, `border`, `bg-primary`, `text-primary-text`, the status colors. No raw hex or Tailwind palette colors for UI.
- Motion uses the kit's durations and curves (motion.md). Nothing moves without a reason, and everything respects reduced motion.
- Forms: give controls `label`, `description` and `error` directly (they wire the ids and aria attributes). Use the kit's Select, never a native select in app pages.

## Files

- components.md: every component by category, when to use it and when not to
- blocks.md: every block by category, free and Pro
- design.md: tokens, variants and colors, layout and copy
- motion.md: durations, curves, Motion editions, reduced motion
- accessibility.md: labels, keyboard, focus, announcements
- checklist.md: what to check before you're done
