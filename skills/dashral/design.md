# Design

## Look

A calm, neutral frame: ink on soft grey, with one accent used sparingly. The default primary is ink; a theme can make it a brand color. Data (charts, statuses) keeps its own colors.

- Surfaces: `bg-background` for the page, `bg-card` for raised boxes, `bg-muted` for quiet fills, `border` for edges.
- Text: `text-foreground` for what matters, `text-muted-foreground` for the rest. Links and soft buttons use `text-primary-text`.
- Status: `success`, `warning`, `info`, `destructive`, `highlight`, each with `-foreground` (on its fill) and `-text` (as text on the page).
- Radius comes from `--radius`; inner corners are smaller than outer ones.

## Component API

- **variant** is emphasis: solid, soft, outline, ghost, link. **color** is meaning: primary, neutral, info, success, warning, destructive, highlight.
- **Fields** take `label`, `description`, `error` and `required`, so the label, hint and error are wired to the control. Don't wrap them in your own label.
- **Lists of things** go in as data: `options`, `items`, `columns`, `series`. Components render them.
- Components accept `className` for layout (width, margin, grid placement) and `classNames` for their parts.
- Links inside components (Breadcrumb, Pagination, Sidebar, menus) render `<a>`; pass `linkAs={Link}` for your router.

## Layout

- App pages: a sidebar (Sidebar) beside a header and a `main` that scrolls on its own (`flex h-svh`, `main flex-1 overflow-y-auto`).
- Page tops: PageHeader (breadcrumb, title, description, actions).
- Group related content in Card; many records in DataTable; label-value facts in DescriptionList; empty lists get EmptyState.

## States

- Nothing is red before the user acts; errors appear after a submit or a blur.
- Nothing loads blank: Skeleton for content with a known shape, Spinner for short waits, Button's `loading` for a pending action.
- Destructive actions ask first (AlertDialog) or offer Undo (Toast).

## Copy

- Sentence case for titles and buttons. Buttons say what they do ("Save changes", "Delete project").
- Say what happened and what to do next in errors. No exclamation marks in UI text.
