# Working on Dashral

Dashral is a React 19 kit on Tailwind CSS v4 and Radix UI: accessible components, their Motion editions, blocks, and
Next.js dashboards built from them. These rules are for anyone changing this repository, people and coding agents
alike. They come from mistakes already made here, so follow them even where another way looks simpler.

## Read first

- [CONTRIBUTING.md](CONTRIBUTING.md) (when present): setup, the project layout, `pnpm dashral init`, the changelog.
- `docs/ARCHITECTURE.md` (when present): the dashboards' database, auth, features and common tasks.
- `docs/ADDING.md` (maintainers' copy only): what each new component, Motion edition, block or template changes.
- The site's docs for any piece you touch: `https://dashral.com/components/<slug>.md`, `/blocks/<slug>.md`.

## Where things live

| Path | What | Notes |
| --- | --- | --- |
| `packages/ui` | `@dashral/ui`: the components, theme tokens (`src/styles`), shared `lib/` | Published to npm from `dist/`; imports inside it stay relative |
| `packages/motion` | `@dashral/motion`: Motion editions on motion/react | Same props and look as the kit component they build on |
| `packages/blocks` | Blocks: whole sections of a page, built from the components | |
| `packages/pro` | Pro components (in Dashral Pro only) | |
| `apps/demo` | The dashboard template (Classic in `app/(dashboard)`, Inset in `app/inset`) | Imports only `@dashral/ui`, `@dashral/motion` and its own files |
| `apps/saas` | The SaaS landing template (in Dashral Pro only) | |
| `scripts/dashral.mjs` | `pnpm dashral init` and `pnpm dashral update` | |
| `skills/dashral` | The agent skill people install with `npx skills add` | Generated; never edit it by hand |

## Components

- **One tag with props.** Fields take `label`, `description`, `error` and `required` through the shared Field (it wires
  ids and `aria-*`); lists go in as data (`options`, `items`, `columns`, `series`). Keep exporting the parts other
  components build on.
- **`variant` is emphasis** (solid, soft, outline, ghost, link) and **`color` is meaning** (primary, neutral, info,
  success, warning, destructive, highlight). Reuse these names; don't invent new ones.
- **Extend the kit, don't hand-roll.** When a page needs something a component can't do, add it to the component (with
  its docs and an example), not a one-off in the app. In app pages use the kit's `Select`, never a native select.
- **Read the closest siblings first** and reuse their pieces: a new chart uses `lib/chart`, a number that changes uses
  `CountTo`, a gliding highlight in a Motion edition uses `lib/hover`. Match their prop names (`data`, `series`, `locale`,
  `formatOptions`, `classNames`, `aria-label`) and behaviour (empty state, keyboard, right to left, reduced motion).
- **APIs only grow.** Dashral is public: add props, never rename or remove one. A renamed prop keeps the old name working
  until the next major version.
- **Changing a component changes everything that uses it.** Find its users (`from "./<slug>"` inside the kit,
  `@dashral/ui/components/<slug>` elsewhere), repeat for theirs, and look at each one. Button, Field, Input, Popover,
  Card, Badge and `lib/` sit under almost everything.
- `<p>` slots take phrasing content only, or React reports a hydration error.

## Theme

Every component, block and page must look right in every theme the customizer can set (`data-primary`, `data-radius`,
`data-card`, `data-font`, dark), not only the default.

- **Colors are tokens:** `bg-background`, `bg-card`, `bg-muted`, `text-foreground`, `text-muted-foreground`, `border`,
  `bg-primary`, `text-primary-text`, and the status colors with `-foreground` (on their fill) and `-text` (as text). No
  hex values or Tailwind palette colors for UI; data and artwork keep their own colors.
- **Actions are the kit's Button.** Never hand-roll `bg-foreground text-background` as a button; when Motion animates
  one, wrap a `motion.button` in Button with `asChild`.
- **Corners follow `--radius`.** Use the kit sizes (`rounded-sm` to `rounded-4xl` all scale). A pill on an `h-N`
  element is `rounded-[calc(var(--radius)*N/7)]`. Never plain `rounded` (a fixed 4px in Tailwind v4) and never
  `rounded-full` on controls, bars or chips (avatars, dots and count bubbles stay round). In Motion, never a number for
  `borderRadius`: read it from the theme, and start a morph from the trigger's computed radius.
- **Check three looks** before calling it done: the default, radius 0 with another primary, and xl radius in dark.

## Motion

- **Every component moves, even without motion/react.** The plain edition animates with CSS (tw-animate, transitions)
  or the Web Animations API on the motion tokens (`--duration-fast`, `--duration-standard`, `--duration-considered`,
  `--ease-standard`, `--ease-enter`, `--ease-exit`). `packages/ui` never imports motion/react; Motion
  editions, Pro components and the blocks that need it do.
- **Smooth tweens, no springy overshoot** on surfaces (`[0.4, 0, 0.2, 1]`, about 0.25 to 0.45 s). A small press scale is
  fine. Menus, popovers, selects and tooltips use the quick ~150ms fade and zoom.
- **Animate what changed.** Never key-remount a whole value or panel to animate it (it blinks); the old leaves while the
  new arrives, in the same place. One highlight glides between items instead of jumping.
- **Morph, don't pop:** a button widens into its own panel and shrinks back onto it. Keep the trigger hidden while the
  panel shrinks, then crossfade on its place.
- **Reduced motion is always honoured:** movement becomes a fade or nothing.
- Known traps: never compute "today" at module scope in a component or preview (server and browser disagree: hydration
  mismatch); flex children of a surface whose width animates need `shrink-0` or their text wraps mid-animation; a child
  of `AnimatePresence mode="popLayout"` must pass `ref` to its motion element, and refs shared across keyed children
  get nulled by the leaving one (keep them per key); a veil inside a scrolling area must not be `position: fixed`; a
  highlight that glides between items by `layoutId` sits in one layer for the whole list (`isolate` on the list, never on
  each item, or going down it covers the text it leaves and that text blinks), with `layoutCrossfade={false}`.

## Phones, loading and feel

- **No sideways scroll at 390px.** Every card or column inside a grid or flex row gets `min-w-0`; tables restack on
  phones (hide secondary columns with `max-sm:hidden`, fold what matters under another cell); toolbars stay one row
  (search fills, filters become icon buttons).
- **Nothing sits blank, then pops in.** Pictures pulse until loaded, then fade in; a click that waits shows feedback in
  the same frame; routes have `loading.tsx`. Try it on a slowed network.
- **States look intentional:** nothing is red before the user acts; errors appear after a submit or a blur.
- **Judge the feel, not only the build.** For anything that moves, watch it (or record frames) before you finish.
  Typecheck and lint passing says nothing about a blink.

## Dashboards

- UI text is translated: English, Indonesian and Arabic (right to left). New text goes into all three
  `messages/<code>/` files with the same keys; use logical sides (`ms-`, `pe-`, `start-`) and `rtl:-scale-x-100` on
  arrows. The app's name is `{brand}` in messages, never written out.
- Code that belongs to one template or feature inside a shared file sits between `// @dashral-if <feature>` and
  `// @dashral-end` (`{/* … */}` in JSX), so `pnpm dashral init` can remove it.
- Charts are the kit's own SVG charts (`lib/chart`); no chart library.

## Before you finish

```bash
pnpm typecheck
pnpm lint
pnpm build
```

- Light and dark, a 390px phone, right to left, the keyboard, reduced motion.
- A user-facing change has its line under `## [Unreleased]` in `CHANGELOG.md` (CONTRIBUTING.md has the format).
- There are no unit or end-to-end test suites here; don't add a test framework without asking.
- Don't upgrade dependencies as a side effect. When adding one, pick a version released at least two weeks ago.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
