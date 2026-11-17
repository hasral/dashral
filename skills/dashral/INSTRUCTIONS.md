# Dashral (always-on rules)

Paste this into AGENTS.md, CLAUDE.md or your editor's rules.

- This project uses Dashral (http://localhost:3001). Before writing a component by hand, check http://localhost:3001/llms.txt and the component's Markdown page (http://localhost:3001/components/<slug>.md).
- Install with `npx shadcn@latest add @dashral/<slug>`; import from `@/components/dashral/<slug>`.
- One tag with props: `<Input label description error />`, `<Select options />`, `<Dialog trigger title footer>`. Don't rebuild what a prop does.
- `variant` is how much it stands out (solid, soft, outline, ghost, link); `color` is what it means (primary, neutral, info, success, warning, destructive, highlight).
- Theme tokens only (bg-background, text-muted-foreground, border, bg-primary, text-primary-text). No raw colors.
- Motion: --duration-fast / --duration-standard / --duration-considered with --ease-standard, --ease-enter, --ease-exit; always honour reduced motion.
- Check light and dark, a 390px phone, the keyboard and reduced motion before finishing.
