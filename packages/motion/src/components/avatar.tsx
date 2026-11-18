"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import type { AvatarGroupProps as KitAvatarGroupProps, AvatarProps as KitAvatarProps, AvatarSize, AvatarStatus } from "@dashral/ui/components/avatar"
import { cn } from "@dashral/ui/lib/utils"

import { useReducedMotion } from "../lib/reduced"
import { Tooltip } from "./tooltip"

export type { AvatarSize, AvatarStatus } from "@dashral/ui/components/avatar"

/** The smooth curve every move uses: no spring, no overshoot. */
const smooth = [0.4, 0, 0.2, 1] as const

// The kit's sizes and status colors: the same look.
const sizes: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-7 text-xs",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-16 text-lg",
}

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-muted-foreground",
}

/** "Olivia Martin" → "OM"; one name gives one letter. */
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

export type AvatarProps = Omit<KitAvatarProps, "asChild"> & {
  /** The status dot ripples gently all the time, e.g. someone live on a call. A change of status always ripples once. */
  pulse?: boolean
}

/** The picture whose loading has finished, so a new one can cross over the old instead of the old vanishing first. */
function useLoaded(src: string | undefined) {
  const [loaded, setLoaded] = React.useState<string | undefined>(undefined)
  React.useEffect(() => {
    if (!src) {
      setLoaded(undefined)
      return
    }
    let live = true
    const image = new Image()
    image.onload = () => live && setLoaded(src)
    // A picture that fails leaves the last one (or the initials) in place.
    image.onerror = () => live && setLoaded((current) => (current === src ? undefined : current))
    image.src = src
    return () => {
      live = false
    }
  }, [src])
  return loaded
}

/**
 * The kit's Avatar with motion: the same picture, initials, sizes, shapes and status. A picture fades in once it has
 * loaded, and a new one crosses over the old (it loads first, so nothing goes blank in between). A change of status
 * pops the dot in its new color and sends one ripple out from it; pulse keeps a gentle ripple going. With reduced
 * motion pictures only fade and nothing ripples.
 */
export function Avatar({ src, name, alt = name, fallback, size = "md", shape = "circle", status, pulse = false, className, classNames, ...props }: AvatarProps) {
  const reduced = useReducedMotion()
  const loaded = useLoaded(src)
  const radius = shape === "circle" ? "rounded-full" : "rounded-md"
  // A change of status after the first draw ripples once; the first status just shows. Counted while rendering (not in
  // an effect), so the new dot already knows it's a change and pops in.
  const [lastStatus, setLastStatus] = React.useState(status)
  const [ripples, setRipples] = React.useState(0)
  if (lastStatus !== status) {
    setLastStatus(status)
    if (status && !reduced) setRipples(ripples + 1)
  }

  return (
    <span data-slot="avatar" aria-hidden={alt === "" || undefined} className={cn("relative inline-flex shrink-0", radius, sizes[size], className)} {...props}>
      <span className={cn("relative flex size-full overflow-hidden", radius)}>
        {/* The initials sit under the picture: shown until it loads, and when there's none. */}
        <span className={cn("flex size-full items-center justify-center bg-muted font-medium text-muted-foreground", radius, classNames?.fallback)}>
          {fallback ?? (name ? initials(name) : null)}
          {!loaded && alt && <span className="sr-only">{alt}</span>}
        </span>
        <AnimatePresence initial={false}>
          {loaded && (
            <motion.img
              key={loaded}
              src={loaded}
              alt={alt ?? ""}
              className={cn("absolute inset-0 aspect-square size-full object-cover", classNames?.image)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // The old picture stays under the new one until it has come in.
              exit={{ opacity: 0, transition: { duration: 0.2, delay: reduced ? 0 : 0.24 } }}
              transition={{ duration: reduced ? 0.15 : 0.32, ease: smooth }}
            />
          )}
        </AnimatePresence>
      </span>
      {status && (
        <span className={cn("absolute end-0 bottom-0 size-[28%] min-w-2", classNames?.status)}>
          {/* One ripple per change of status, and a slow, endless one with pulse. */}
          {!reduced &&
            (pulse ? (
              <motion.span
                aria-hidden
                className={cn("absolute inset-0 rounded-full", statusColors[status])}
                animate={{ scale: [1, 2.4], opacity: [0.45, 0] }}
                transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.6 }}
              />
            ) : (
              ripples > 0 && (
                <motion.span
                  key={ripples}
                  aria-hidden
                  className={cn("absolute inset-0 rounded-full", statusColors[status])}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 0.9, ease: smooth }}
                />
              )
            ))}
          <motion.span
            key={status}
            className={cn("absolute inset-0 rounded-full ring-2 ring-card", statusColors[status])}
            initial={reduced || ripples === 0 ? false : { scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: smooth }}
          >
            <span className="sr-only">{status}</span>
          </motion.span>
        </span>
      )}
    </span>
  )
}

export type AvatarGroupProps = KitAvatarGroupProps

// How far each avatar overlaps the one before: the kit's -space-x-2, and spread apart a little on hover or focus.
const overlap = { rest: -8, spread: 2 }

/**
 * The kit's AvatarGroup with motion: the same items, max, size and names. Point at it (or tab into it) and the stack
 * spreads apart so every face shows, the one under the pointer rising a little; avatars that join fade in and the
 * rest make room, ones that leave fade out and the rest close up, and "+N" changes in place. With reduced motion it
 * doesn't spread, and avatars only fade.
 */
export function AvatarGroup({ items, max, size = "md", showNames = false, className, ...props }: AvatarGroupProps) {
  const reduced = useReducedMotion()
  const shown = max === undefined ? items : items.slice(0, max)
  const rest = items.slice(shown.length)
  const restNames = rest.map((item) => item.name).filter(Boolean)
  const [spread, setSpread] = React.useState(false)
  const lift = "relative rounded-full outline-none hover:z-10 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring"
  const move = { duration: 0.3, ease: smooth }

  const slot = (key: React.Key, index: number, child: React.ReactNode) => (
    <motion.span
      key={key}
      layout={reduced ? false : "position"}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, marginInlineStart: index === 0 ? 0 : overlap[spread && !reduced ? "spread" : "rest"] }}
      exit={{ opacity: 0, scale: reduced ? 1 : 0.6, transition: { duration: 0.2, ease: smooth } }}
      transition={{ ...move, layout: move }}
      whileHover={reduced ? undefined : { y: -2, transition: { duration: 0.16, ease: smooth } }}
      className="flex"
    >
      {child}
    </motion.span>
  )

  return (
    <div
      data-slot="avatar-group"
      role="group"
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
      onFocus={() => setSpread(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSpread(false)
      }}
      className={cn("flex items-center", className)}
      {...props}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map(({ id, ...item }, i) =>
          slot(
            id ?? item.name ?? i,
            i,
            showNames && item.name ? (
              <Tooltip content={item.name}>
                <span tabIndex={0} className={cn("flex", lift)}>
                  <Avatar {...item} size={size} className="ring-2 ring-card" />
                </span>
              </Tooltip>
            ) : (
              <Avatar {...item} size={size} className={cn("ring-2 ring-card", lift)} />
            )
          )
        )}
        {rest.length > 0 &&
          slot(
            "more",
            shown.length,
            (() => {
              const more = (
                <span
                  tabIndex={showNames ? 0 : undefined}
                  className={cn("relative grid shrink-0 place-items-center overflow-hidden bg-muted font-medium text-muted-foreground tabular-nums ring-2 ring-card", lift, sizes[size])}
                >
                  {/* A new count rises in over the old. */}
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={rest.length}
                      className="col-start-1 row-start-1"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.24, ease: smooth }}
                    >
                      +{rest.length}
                    </motion.span>
                  </AnimatePresence>
                </span>
              )
              return showNames && restNames.length > 0 ? <Tooltip content={<span className="block max-w-56">{restNames.join(", ")}</span>}>{more}</Tooltip> : more
            })()
          )}
      </AnimatePresence>
    </div>
  )
}
