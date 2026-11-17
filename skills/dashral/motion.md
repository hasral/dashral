# Motion

## Tokens

| Token | Value | For |
| --- | --- | --- |
| `--duration-fast` | 160ms | hovers, presses, color changes, leaving |
| `--duration-standard` | 240ms | toggles, dialogs, arriving (menus, popovers and tooltips: a quick 150ms of their own) |
| `--duration-considered` | 480ms | sliding highlights, panels, charts drawing in, counting numbers |
| `--ease-standard` | cubic-bezier(0.2, 0, 0, 1) | things already on screen moving or changing |
| `--ease-enter` | cubic-bezier(0, 0, 0, 1) | arriving: fast, then settling |
| `--ease-exit` | cubic-bezier(0.3, 0, 1, 1) | leaving: gathering speed |
| `--ease-spring` | a small overshoot | something that should feel alive, such as an icon popping in |

In Tailwind: `duration-(--duration-standard) ease-standard`.

## Motion editions

31 components have a Motion edition on motion/react, with the same props: swap the import to `@/components/dashral/motion/<slug>` (registry: `@dashral/motion-<slug>`). They do what CSS can't: springs, heights that glide, numbers on odometer wheels, drags and holds.

For your own animated pieces, use the kit's motion components instead of motion.div: **Reveal** (content that appears and disappears with its height, RevealList for rows), **Swap** (content that changes in place), **Glide** (things that move to a new place or size).

## Rules

- Motion explains a change; it never decorates. If nothing changed, nothing moves.
- Leaving is faster than arriving.
- Never animate a whole value by remounting it (a blink); animate what changed, the old leaving as the new arrives.
- Reduced motion: movement drops to a fade or nothing. Every kit component does this already; your own animations must too (`motion-reduce:` in Tailwind).
