# Accessibility

- Every control has a name: `label` on fields, `aria-label` on icon-only buttons, `title` on dialogs and sheets.
- Use the real element: a button for actions, a link for navigation. Don't put onClick on a div.
- Keyboard: everything reachable with Tab, menus and lists with the arrow keys, Escape closes overlays. Kit components do this; keep it when you compose them.
- Focus stays visible (the kit's focus rings) and moves sensibly: into a dialog when it opens, back to its trigger when it closes.
- Announce what changes without moving focus: toasts, a status line (`role="status"`), an error with `role="alert"`.
- Color is never the only signal: pair it with text or an icon.
- Text contrast: use `-text` tokens for colored text on the page, `-foreground` on a colored fill.
- Images: meaningful ones get alt text, decorative ones `alt=""`.
