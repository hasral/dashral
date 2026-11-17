"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { XIcon } from "lucide-react"
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react"
import type { SheetProps as KitSheetProps, SheetSide } from "@dashral/ui/components/sheet"
import { useLocale } from "@dashral/ui/lib/locale"
import { cn } from "@dashral/ui/lib/utils"
import { usePortalContainer } from "@dashral/ui/lib/portal"

import { useReducedMotion } from "../lib/reduced"
import { duration, ease } from "../lib/tokens"

export type { SheetSide } from "@dashral/ui/components/sheet"
export { SheetClose } from "@dashral/ui/components/sheet"

export type SheetProps = KitSheetProps & {
  /** On a touch screen, drag the panel back toward its edge to close it. On by default. */
  swipeToClose?: boolean
}

/** The smooth curve every move uses: no spring, no overshoot. */
const smooth = [0.4, 0, 0.2, 1] as const

/** A light buzz on phones that have one. */
const buzz = (pattern: number) => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern)
}

/** Where a drag shouldn't start: a field you type in, or something you drag on your own. */
const keepsTouch = "input, textarea, select, [contenteditable], [data-slot=slider], [role=slider]"

// The kit's sides, without its CSS slide (motion moves the panel here).
const sides: Record<SheetSide, string> = {
  right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
  start: "inset-y-0 start-0 h-full w-3/4 border-e sm:max-w-sm",
  end: "inset-y-0 end-0 h-full w-3/4 border-s sm:max-w-sm",
  top: "inset-x-0 top-0 h-auto max-h-[calc(100dvh-2rem)] border-b",
  bottom: "inset-x-0 bottom-0 h-auto max-h-[calc(100dvh-2rem)] border-t",
}

/** The edge a side sits on, with start and end turned into left or right for the reading direction. */
function edgeOf(side: SheetSide, dir: "ltr" | "rtl"): "top" | "right" | "bottom" | "left" {
  if (side === "start") return dir === "rtl" ? "right" : "left"
  if (side === "end") return dir === "rtl" ? "left" : "right"
  return side
}

/**
 * The kit's Sheet with motion: the same trigger, title, body, footer, form and props. It slides in from its edge on a
 * smooth curve while the page behind dims, and what's inside follows a moment later; it slides back out as it closes.
 * On a touch screen, drag it back toward its edge and it follows your finger 1:1, the backdrop clearing as it goes:
 * far or fast enough and it slides away closed (phones buzz), short of it it glides back. The other way it barely
 * gives. With reduced motion it only fades and doesn't drag.
 */
export function Sheet({
  trigger,
  title,
  description,
  children,
  footer,
  form,
  side = "end",
  padding = "default",
  showCloseButton = true,
  autoFocus = true,
  swipeToClose = true,
  className,
  classNames,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: SheetProps) {
  const portalContainer = usePortalContainer()
  const { t, dir } = useLocale()
  const reduced = useReducedMotion()
  const padded = padding === "default"
  // Kept here, so the panel can stay on screen while it slides out.
  const [own, setOwn] = React.useState(defaultOpen ?? false)
  const isOpen = open ?? own
  const change = (next: boolean) => {
    if (open === undefined) setOwn(next)
    onOpenChange?.(next)
  }

  const edge = edgeOf(side, dir)
  const vertical = edge === "top" || edge === "bottom"
  // +1 when closing moves toward larger x or y (right, bottom), -1 toward smaller (left, top).
  const outward = edge === "right" || edge === "bottom" ? 1 : -1
  // Off screen, as a share of the panel's own size: where it comes from and goes back to.
  const away = vertical ? { y: `${outward * 100}%` } : { x: `${outward * 100}%` }
  const home = vertical ? { y: "0%" } : { x: "0%" }

  // A drag: how far the panel has come toward its edge, in px. It's applied with CSS translate, apart from the
  // transform that slides it in and out, so the two add up: a panel let go halfway leaves from where it is.
  const offset = useMotionValue(0)
  const size = React.useRef(1)
  const translate = useTransform(offset, (value) => (vertical ? `0px ${value}px` : `${value}px 0px`))
  const backdrop = useTransform(offset, (value) => 1 - Math.min(1, Math.abs(value) / size.current) * 0.85)
  React.useEffect(() => {
    if (isOpen) offset.jump(0)
  }, [isOpen, offset])
  const canSwipe = swipeToClose && !reduced

  const drag = React.useRef<{ id: number; start: number; cross: number; at: number; last: number; time: number; v: number; locked: boolean | null } | null>(null)
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canSwipe || event.pointerType !== "touch") return
    const target = event.target as HTMLElement
    if (target.closest(keepsTouch)) return
    // A body that scrolls along the drag's own axis keeps the finger for scrolling (a tall bottom sheet).
    const body = target.closest<HTMLElement>("[data-slot=sheet-body]")
    if (vertical && body && body.scrollHeight > body.clientHeight + 1) return
    size.current = vertical ? event.currentTarget.offsetHeight : event.currentTarget.offsetWidth
    const along = vertical ? event.clientY : event.clientX
    drag.current = { id: event.pointerId, start: along, cross: vertical ? event.clientX : event.clientY, at: 0, last: along, time: event.timeStamp, v: 0, locked: null }
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== event.pointerId) return
    const along = vertical ? event.clientY : event.clientX
    const cross = vertical ? event.clientX : event.clientY
    // Decide once which way the finger means: along the drag (the panel moves) or across it (the body scrolls).
    if (d.locked === null) {
      const a = Math.abs(along - d.start)
      const c = Math.abs(cross - d.cross)
      if (a < 6 && c < 6) return
      d.locked = a > c
      if (!d.locked) {
        drag.current = null
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const moved = (along - d.start) * outward
    // Toward the edge it follows 1:1; the other way it barely gives.
    offset.set(outward * (moved > 0 ? moved : moved * 0.06))
    const dt = Math.max(1, event.timeStamp - d.time)
    d.v = ((along - d.last) * outward) / dt
    d.last = along
    d.time = event.timeStamp
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    drag.current = null
    if (!d || d.id !== event.pointerId || !d.locked) return
    const moved = offset.get() * outward
    // Far enough (a third of the panel) or fast enough (0.5 px/ms) closes it; otherwise it glides home.
    if (moved > size.current / 3 || (d.v > 0.5 && moved > 24)) {
      buzz(8)
      change(false)
    } else animate(offset, 0, { duration: 0.3, ease: smooth })
  }

  // What's inside arrives a moment after the panel, rising a little from its edge.
  const enter = (index: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, ...(vertical ? { y: outward * 8 } : { x: outward * 12 }) },
          animate: { opacity: 1, x: 0, y: 0 },
          transition: { duration: 0.32, ease: smooth, delay: 0.12 + index * 0.04 },
        }

  const inner = (
    <>
      <motion.div data-slot="sheet-header" {...enter(0)} className={cn("flex flex-col gap-1.5 p-4", !padded && "sr-only", classNames?.header)}>
        <SheetPrimitive.Title data-slot="sheet-title" className={cn("font-heading font-medium text-foreground", classNames?.title)}>
          {title}
        </SheetPrimitive.Title>
        {description ? (
          <SheetPrimitive.Description data-slot="sheet-description" className={cn("text-sm text-muted-foreground", classNames?.description)}>
            {description}
          </SheetPrimitive.Description>
        ) : null}
      </motion.div>
      <motion.div data-slot="sheet-body" {...enter(1)} className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", padded && "px-4", classNames?.body)}>
        {children}
      </motion.div>
      {footer && (
        <motion.div data-slot="sheet-footer" {...enter(2)} className={cn("mt-auto flex flex-col gap-2 p-4", classNames?.footer)}>
          {footer}
        </motion.div>
      )}
    </>
  )

  return (
    <SheetPrimitive.Root data-slot="sheet" open={isOpen} onOpenChange={change} {...props}>
      {trigger && <SheetPrimitive.Trigger asChild>{trigger}</SheetPrimitive.Trigger>}
      <AnimatePresence>
        {isOpen && (
          <SheetPrimitive.Portal forceMount container={portalContainer}>
            <SheetPrimitive.Overlay forceMount asChild>
              <motion.div
                data-slot="sheet-overlay"
                className="fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.28, ease: smooth } }}
                transition={{ duration: 0.4, ease: smooth }}
              >
                {/* The blur stays put and only the opacity moves (animating a full-screen blur costs frames); a drag clears it. */}
                <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" style={{ opacity: backdrop }} />
              </motion.div>
            </SheetPrimitive.Overlay>
            <SheetPrimitive.Content
              forceMount
              asChild
              {...(description ? {} : { "aria-describedby": undefined })}
              onOpenAutoFocus={
                autoFocus
                  ? undefined
                  : (event) => {
                      // The panel takes focus (it's focusable, tabIndex -1), so Tab still starts inside it.
                      event.preventDefault()
                      ;(event.currentTarget as HTMLElement).focus()
                    }
              }
            >
              <motion.div
                data-slot="sheet-content"
                style={{ translate, touchAction: canSwipe ? (vertical ? "none" : "pan-y") : undefined }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => {
                  drag.current = null
                  if (offset.get() !== 0) animate(offset, 0, { duration: 0.3, ease: smooth })
                }}
                initial={reduced ? { opacity: 0 } : away}
                animate={reduced ? { opacity: 1 } : home}
                exit={reduced ? { opacity: 0, transition: { duration: duration.fast } } : { ...away, transition: { duration: 0.3, ease: ease.exit } }}
                transition={reduced ? { duration: duration.fast } : { duration: 0.45, ease: smooth }}
                className={cn("fixed z-50 flex flex-col bg-background shadow-lg outline-none", sides[side], className)}
              >
                {canSwipe && vertical && (
                  // A handle on touch screens, saying the panel can be dragged toward its edge.
                  <span
                    aria-hidden
                    className={cn("absolute left-1/2 hidden h-1 w-9 -translate-x-1/2 rounded-full bg-muted-foreground/25 pointer-coarse:block", edge === "bottom" ? "top-2" : "bottom-2")}
                  />
                )}
                {form ? (
                  <form {...form} className={cn("flex min-h-0 flex-1 flex-col", form.className)}>
                    {inner}
                  </form>
                ) : (
                  inner
                )}
                {showCloseButton && (
                  <SheetPrimitive.Close className="absolute top-4 end-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                    <XIcon className="size-4" />
                    <span className="sr-only">{t("close")}</span>
                  </SheetPrimitive.Close>
                )}
              </motion.div>
            </SheetPrimitive.Content>
          </SheetPrimitive.Portal>
        )}
      </AnimatePresence>
    </SheetPrimitive.Root>
  )
}
