"use client"

import * as React from "react"
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react"
import { TableBody as KitTableBody } from "@dashral/ui/components/table"
import { cn } from "@dashral/ui/lib/utils"

import { useReducedMotion } from "../lib/reduced"

// The parts that don't move are the kit's, re-exported, so a table imports every part from here.
export { Table, TableCaption, TableCell, TableFooter, TableHead, TableHeader } from "@dashral/ui/components/table"

/** The smooth curve every move uses: no spring, no overshoot. */
const smooth = [0.4, 0, 0.2, 1] as const

type BodyContextValue = {
  /** Rows move (they're in a TableBody of this edition). */
  animated: boolean
  /** Tint rows that arrive after the body first drew. */
  highlight: boolean
  /** Whether the body has drawn once: rows there from the start never animate in. */
  ready: React.RefObject<boolean>
}

const BodyContext = React.createContext<BodyContextValue | null>(null)

type TableBodyProps = React.ComponentProps<typeof KitTableBody> & {
  /** Rows that arrive after the table first drew are tinted in the primary color for a moment, so the eye finds them. On by default. */
  highlightNew?: boolean
}

/**
 * The body whose rows move: give each TableRow a stable key (the record's id) and rows that change place glide to it,
 * rows that go fade out while the rest close up, and new ones fade in, tinted for a moment. The first draw stays still.
 */
function TableBody({ highlightNew = true, children, ...props }: TableBodyProps) {
  const ready = React.useRef(false)
  React.useEffect(() => {
    ready.current = true
  }, [])
  const value = React.useMemo(() => ({ animated: true, highlight: highlightNew, ready }), [highlightNew])
  return (
    <KitTableBody {...props}>
      <BodyContext value={value}>
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </BodyContext>
    </KitTableBody>
  )
}

type TableRowProps = Omit<HTMLMotionProps<"tr">, "ref"> & { ref?: React.Ref<HTMLTableRowElement> }

const rowClass = "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"

// The tint of a row that just arrived: a layer of the primary color over the row's own background (hover and
// selected still show under it), fading from 12% to nothing.
const tint = "color-mix(in oklab, var(--color-primary) var(--row-tint), transparent)"

/**
 * A row. In this edition's TableBody it moves: to a new place on a smooth glide (a sort), out with a quick fade (the
 * rest close up after it), in from a few pixels above. In a header or footer it's the kit's still row.
 */
function TableRow({ className, style, ...props }: TableRowProps) {
  const body = React.useContext(BodyContext)
  const reduced = useReducedMotion()
  // Decided once, as the row first draws: was the body already there (so this row is new)?
  const [fresh] = React.useState(() => Boolean(body?.ready.current))
  if (!body?.animated) return <motion.tr data-slot="table-row" className={cn(rowClass, className)} style={style} {...props} />

  const tinted = fresh && body.highlight && !reduced
  return (
    <motion.tr
      data-slot="table-row"
      layout={reduced ? false : "position"}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6, ...(tinted && { "--row-tint": "12%" }) }}
      animate={{ opacity: 1, y: 0, ...(tinted && { "--row-tint": "0%" }) }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: smooth } }}
      transition={{
        layout: { duration: 0.35, ease: smooth },
        opacity: { duration: 0.28, ease: smooth },
        y: { duration: 0.32, ease: smooth },
        "--row-tint": { duration: 1.4, ease: smooth, delay: 0.25 },
      }}
      style={tinted ? { backgroundImage: `linear-gradient(${tint}, ${tint})`, ...style } : style}
      className={cn(rowClass, className)}
      {...props}
    />
  )
}

export { TableBody, TableRow, type TableBodyProps, type TableRowProps }
