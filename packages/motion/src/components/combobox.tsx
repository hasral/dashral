"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@dashral/ui/components/button"
import type { ComboboxOption } from "@dashral/ui/components/combobox"
import { CommandRoot } from "@dashral/ui/components/command"
import { FieldWrapper, splitFieldProps, useFieldControl, type FieldClassNames, type FieldControlProps, type FieldOwnProps } from "@dashral/ui/components/field"
import { PopoverContent, PopoverRoot, PopoverTrigger } from "@dashral/ui/components/popover"
import { useLocale } from "@dashral/ui/lib/locale"
import { cn } from "@dashral/ui/lib/utils"

import { motionMessages } from "../lib/field"
import { useReducedMotion } from "../lib/reduced"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"

export type { ComboboxOption } from "@dashral/ui/components/combobox"

/** The smooth curve every move uses: no spring, no overshoot. */
const smooth = [0.4, 0, 0.2, 1] as const

export type ComboboxProps = FieldOwnProps & {
  options: ComboboxOption[]
  /** Controlled value. Omit it (and use defaultValue) for an uncontrolled combobox. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  id?: string
  disabled?: boolean
  required?: boolean
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  /** The trigger's classes. */
  className?: string
  "aria-label"?: string
  classNames?: FieldClassNames & { trigger?: string; content?: string; item?: string }
}

/**
 * The kit's Combobox with motion: the same options, icons, descriptions and props. Its list is the Motion edition's
 * Command: one highlight glides from option to option, the list's height follows what matches as you type, and the
 * options rise in as it opens. The picked option's tick draws itself, and a new value rises into the field as the old
 * one leaves upward. Its hint and error come and go like the other motion fields. With reduced motion it only fades.
 */
export function Combobox(props: ComboboxProps) {
  const [field, { required: _required, ...control }] = splitFieldProps(props)
  return (
    <FieldWrapper {...field} renderMessages={motionMessages}>
      <ComboboxControl {...control} />
    </FieldWrapper>
  )
}

function ComboboxControl({
  options,
  value,
  defaultValue = "",
  onValueChange,
  placeholder: placeholderProp,
  searchPlaceholder: searchPlaceholderProp,
  emptyText: emptyTextProp,
  className,
  classNames,
  "aria-label": ariaLabel,
  ...rest
}: Omit<ComboboxProps, keyof FieldOwnProps | "required">) {
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const emptyText = emptyTextProp ?? t("noResults")
  const searchPlaceholder = searchPlaceholderProp ?? t("search")
  const placeholder = placeholderProp ?? t("selectOption")
  const { id, disabled, ...aria } = useFieldControl<FieldControlProps>({ id: rest.id, disabled: rest.disabled, "aria-invalid": rest["aria-invalid"] })
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const selected = options.find((option) => option.value === current)

  function select(next: string) {
    const newValue = next === current ? "" : next
    if (value === undefined) setInternal(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          aria-describedby={aria["aria-describedby"]}
          aria-invalid={aria["aria-invalid"]}
          disabled={disabled}
          className={cn(
            "w-full min-w-0 justify-between font-normal aria-invalid:border-destructive",
            // Looks like the other fields (Input, Select), not like a button.
            "border-input bg-transparent hover:bg-transparent focus-visible:border-ring focus-visible:ring-ring/15 motion-safe:enabled:not-aria-busy:active:scale-100",
            selected ? "hover:text-foreground" : "text-muted-foreground hover:text-muted-foreground",
            className,
            classNames?.trigger
          )}
        >
          {/* The value as shown: a new one rises in over the old, which leaves upward, in the same place. */}
          <span className="relative grid min-w-0 flex-1 justify-items-start overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current || "placeholder"}
                className="col-start-1 row-start-1 flex min-w-0 items-center gap-2"
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.16, ease: smooth } }}
                transition={{ duration: 0.26, ease: smooth }}
              >
                {selected?.icon}
                <span className="truncate">{selected?.label ?? placeholder}</span>
              </motion.span>
            </AnimatePresence>
          </span>
          <ChevronsUpDownIcon className="opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-(--radix-popover-trigger-width) min-w-48 p-0", classNames?.content)} align="start">
        <CommandRoot>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className="overflow-visible">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={option.description ? [option.description] : undefined}
                  disabled={option.disabled}
                  onSelect={() => select(option.value)}
                  className={classNames?.item}
                >
                  {/* The tick draws itself on the picked option. */}
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
                    <motion.path
                      d="M4 12l5 5L20 6"
                      initial={reduced ? false : { pathLength: 0 }}
                      animate={{ pathLength: option.value === current ? 1 : 0, opacity: option.value === current ? 1 : 0 }}
                      transition={{ pathLength: { duration: 0.24, ease: smooth, delay: 0.08 }, opacity: { duration: 0.01 } }}
                    />
                  </svg>
                  {option.icon}
                  {option.description ? (
                    <span className="grid min-w-0">
                      <span className="truncate">{option.label}</span>
                      <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                    </span>
                  ) : (
                    option.label
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandRoot>
      </PopoverContent>
    </PopoverRoot>
  )
}
