# Before you finish

- [ ] Every piece came from Dashral where Dashral has one (components.md); nothing hand-rolled that a component already does.
- [ ] Imports point at `@/components/dashral/...` (or @dashral/ui), and every component used is installed.
- [ ] Theme tokens only: no hex colors, no Tailwind palette colors for UI.
- [ ] Light and dark both read well.
- [ ] At 390px wide nothing overflows sideways; toolbars and rows restack instead of truncating.
- [ ] Every control has a label; icon buttons have aria-label; the page works with the keyboard alone.
- [ ] Forms show errors only after the user acts, next to the field.
- [ ] Loading and empty states exist and look intentional.
- [ ] Motion uses the kit's tokens and stops for reduced motion.
- [ ] Components that use state or event handlers are in a file with "use client" (Next.js).
