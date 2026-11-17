"use client"

import * as React from "react"
import { Command as CommandPrimitive, useCommandState } from "cmdk"
import { LayoutGroup, motion } from "motion/react"
import type { CommandDialogProps, CommandProps } from "@dashral/ui/components/command"
import { CommandRoot, CommandShortcut, CommandSeparator, CommandGroup } from "@dashral/ui/components/command"
import { useLocale } from "@dashral/ui/lib/locale"
import { cn } from "@dashral/ui/lib/utils"
import { SearchIcon } from "lucide-react"

import { useReducedMotion } from "../lib/reduced"
import { Dialog } from "./dialog"

export type { CommandAction, CommandDialogProps, CommandProps, CommandSection } from "@dashral/ui/components/command"
export { CommandRoot, CommandShortcut, CommandSeparator, CommandGroup } from "@dashral/ui/components/command"

/** The smooth curve every move uses: no spring, no overshoot. */
const smooth = [0.4, 0, 0.2, 1] as const

// Whether the list has just opened: its items rise in one after another then, and only then. An item that comes back
// as the search changes only fades in, so typing never sets the whole list moving.
const OpeningContext = React.createContext<React.RefObject<boolean> | null>(null)

/** The search field, as the kit's. */
function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" cmdk-input-wrapper="" className="flex h-10 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" aria-hidden />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

/** The list: its height glides to fit what matches as you type (cmdk measures it into --cmdk-list-height). */
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        // isolate: one layer for the whole list, where the highlight sits under every item's text. A layer per item
        // would put the pill, in the item it's going to, over the text of the one it's leaving: going down, that text
        // would blink out as the pill passed over it.
        "isolate h-[min(var(--cmdk-list-height),20rem)] max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain transition-[height] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

/** Shown when nothing matches; it fades in. */
function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("animate-in py-6 text-center text-sm text-muted-foreground duration-(--duration-standard) ease-enter fade-in-0", className)}
      {...props}
    />
  )
}

/**
 * An item. The highlight is one pill for the whole list, gliding to the item the arrow keys or the pointer are on;
 * the item itself only changes its text color.
 */
function CommandItem({ className, children, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  const reduced = useReducedMotion()
  const opening = React.useContext(OpeningContext)
  const ref = React.useRef<HTMLDivElement>(null)
  // cmdk writes the item's value (given, or its text) on it as data-value; the list's current one is in its state.
  const [own, setOwn] = React.useState<string | null>(null)
  React.useLayoutEffect(() => setOwn(ref.current?.getAttribute("data-value") ?? null), [props.value, children])
  const selected = useCommandState((state) => state.value)
  const [rise] = React.useState(() => !reduced && Boolean(opening?.current))
  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {own !== null && selected === own && (
        <motion.span
          layoutId="command-highlight"
          // No crossfade between the pill it leaves and the one it becomes: the new one would start from nothing and
          // blink as the pointer passes from item to item. It moves, it never fades.
          layoutCrossfade={false}
          aria-hidden
          className="absolute inset-0 -z-10 rounded-sm bg-accent"
          style={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 0.22, ease: smooth }}
        />
      )}
      <motion.span
        className="flex min-w-0 flex-1 items-center gap-2"
        initial={reduced ? false : rise ? { opacity: 0, y: 4 } : { opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: rise ? 0.26 : 0.16, ease: smooth }}
      >
        {children}
      </motion.span>
    </CommandPrimitive.Item>
  )
}

function CommandBody({ groups, placeholder, emptyText }: Pick<CommandProps, "groups" | "placeholder" | "emptyText">) {
  // The first moment after the list opens: items there rise in; later ones (the search loosening) only fade.
  const opening = React.useRef(true)
  React.useEffect(() => {
    const timer = setTimeout(() => (opening.current = false), 400)
    return () => clearTimeout(timer)
  }, [])
  const group = React.useId()
  return (
    <OpeningContext value={opening}>
      <LayoutGroup id={group}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          {groups.map((section, g) => (
            <React.Fragment key={g}>
              {g > 0 && !section.heading && <CommandSeparator />}
              {/* Not clipped, so the highlight crossing from one group to the next isn't cut at the edge. */}
              <CommandGroup heading={section.heading} className="overflow-visible">
                {section.items.map((item, i) => (
                  <CommandItem
                    key={i}
                    value={item.value ?? (typeof item.label === "string" ? item.label : undefined)}
                    keywords={item.keywords}
                    disabled={item.disabled}
                    onSelect={item.onSelect}
                  >
                    {item.icon}
                    {item.label}
                    {item.badge ? <span className="ms-auto">{item.badge}</span> : item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </LayoutGroup>
    </OpeningContext>
  )
}

/**
 * The kit's Command with motion: the same groups, items, shortcuts and props. The highlight is one pill gliding from
 * item to item after the arrow keys or the pointer; the list's height glides to fit what matches as you type; when it
 * first shows, the items rise in one after another. With reduced motion nothing moves.
 */
export function Command({ groups, placeholder: placeholderProp, emptyText: emptyTextProp, className, ...props }: CommandProps) {
  const { t } = useLocale()
  return (
    <CommandRoot className={cn("rounded-lg border shadow-md", className)} {...props}>
      <CommandBody groups={groups} placeholder={placeholderProp ?? t("search")} emptyText={emptyTextProp ?? t("noResults")} />
    </CommandRoot>
  )
}

/**
 * The command palette with motion: the Motion edition's Dialog (it grows out of what opened it and swipes down to close
 * on a phone) holding the same list, its pill gliding and its height following the search.
 */
export function CommandDialog({
  groups,
  placeholder: placeholderProp,
  emptyText: emptyTextProp,
  title: titleProp,
  description: descriptionProp,
  className,
  ...props
}: CommandDialogProps) {
  const { t } = useLocale()
  return (
    <Dialog
      title={titleProp ?? t("commandTitle")}
      description={descriptionProp ?? t("commandDescription")}
      showCloseButton={false}
      className={cn("top-[20%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-lg", className)}
      classNames={{ header: "sr-only" }}
      {...props}
    >
      <CommandRoot className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5">
        <CommandBody groups={groups} placeholder={placeholderProp ?? t("commandPlaceholder")} emptyText={emptyTextProp ?? t("noResults")} />
      </CommandRoot>
    </Dialog>
  )
}

export { CommandInput, CommandList, CommandEmpty, CommandItem }
