"use client"

import * as React from "react"
import { Toolbar as ToolbarPrimitive } from "radix-ui"
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react"
import type { AnyExtension, JSONContent } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import { CharacterCount, Placeholder } from "@tiptap/extensions"
import {
  BoldIcon,
  ChevronDownIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  TypeIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"

import { useLocale, type MessageKey } from "../lib/locale"
import { cn } from "../lib/utils"
import { Button } from "./button"
import { DropdownMenu } from "./dropdown-menu"
import { FieldWrapper, splitFieldProps, useFieldControl, type FieldClassNames, type FieldOwnProps } from "./field"
import { Input } from "./input"
import { describeKey, useAppleKeyboard } from "./kbd"
import { PopoverContent, PopoverRoot, PopoverTrigger } from "./popover"
import { proseClasses } from "./prose"
import { ScrollShadow } from "./scroll-shadow"
import { toggleVariants } from "./toggle"
import { Tooltip } from "./tooltip"

/** A tool in the toolbar, in the order given; "|" draws a divider between groups. */
type RichTextTool =
  | "heading"
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "bulletList"
  | "orderedList"
  | "blockquote"
  | "link"
  | "undo"
  | "redo"
  | "|"

type HeadingLevel = 1 | 2 | 3 | 4

const defaultTools: RichTextTool[] = [
  "heading",
  "|",
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "|",
  "bulletList",
  "orderedList",
  "blockquote",
  "|",
  "link",
  "undo",
  "redo",
]

type RichTextEditorClassNames = FieldClassNames & {
  /** The box around the toolbar and the text. */
  editor?: string
  toolbar?: string
  /** The area you write in, e.g. a min-h-* or max-h-* (it scrolls past a max height). */
  content?: string
}

type RichTextEditorProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> &
  FieldOwnProps & {
    /** The content as HTML. With onValueChange, it controls the editor; "" is empty. */
    value?: string
    /** The starting content, as HTML or Tiptap JSON, when value isn't used. */
    defaultValue?: string | JSONContent
    /** Called as the content changes, with the HTML ("" when empty); the editor gives JSON (editor.getJSON()) or text. */
    onValueChange?: (html: string, editor: Editor) => void
    /** Sends the HTML with a form, in a hidden input of this name. */
    name?: string
    placeholder?: string
    /** Stops typing and pasting past this many characters; the count shows near the end. */
    maxLength?: number
    /** Always shows the character count under the text ("120/500" with maxLength). */
    showCount?: boolean
    /** The tools, in order; false hides the toolbar (the markdown shortcuts still work). */
    toolbar?: RichTextTool[] | false
    /** The heading levels in the heading menu. */
    headings?: HeadingLevel[]
    /** Controls added at the end of the toolbar, e.g. an "Insert template" button. */
    actions?: React.ReactNode
    disabled?: boolean
    /** Shows the content without letting it be changed; the toolbar hides. */
    readOnly?: boolean
    required?: boolean
    autoFocus?: boolean
    /** More Tiptap extensions, after the built-in ones (open-source Tiptap extensions work). */
    extensions?: AnyExtension[]
    /** The Tiptap editor, once it exists: for commands of your own (editor.chain().focus()…). */
    editorRef?: React.Ref<Editor | null>
    classNames?: RichTextEditorClassNames
  }

/**
 * A rich text field in one tag: headings, bold, italic, lists, quotes and links from a toolbar, the keyboard (⌘B) or
 * markdown as you type (## , - , > , **bold**). Its value is HTML, so it works in forms and with a label, hint and
 * error like any field. Built on Tiptap.
 */
function RichTextEditor(props: RichTextEditorProps) {
  const [field, control] = splitFieldProps(props)
  return (
    // As a group, the label names the editor through aria-labelledby: a <label for> can't name an editable div.
    <FieldWrapper {...field} group classNames={{ ...field.classNames, root: cn("gap-2", field.classNames?.root) }}>
      <RichTextEditorControl {...control} />
    </FieldWrapper>
  )
}

/** "", or the editor's HTML: an empty editor is "<p></p>" to Tiptap, but empty to a form. */
const htmlOf = (editor: Editor) => (editor.isEmpty ? "" : editor.getHTML())

/** A link as typed, made whole ("example.com" → "https://example.com"), or null when it isn't safe to follow. */
function normalizeHref(input: string) {
  const href = input.trim()
  if (!href) return null
  if (/^(#|\/|\.\/|\.\.\/)/.test(href)) return href
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(href)?.[1]?.toLowerCase()
  if (scheme) return ["http", "https", "mailto", "tel"].includes(scheme) ? href : null
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href)) return `mailto:${href}`
  if (/\s/.test(href) || !href.includes(".")) return null
  return `https://${href}`
}

const headingIcons = { 0: TypeIcon, 1: Heading1Icon, 2: Heading2Icon, 3: Heading3Icon, 4: Heading4Icon }

type MarkTool = Exclude<RichTextTool, "heading" | "link" | "|">

const marks: Record<MarkTool, { icon: React.ComponentType; label: MessageKey; keys: string[]; flip?: boolean }> = {
  bold: { icon: BoldIcon, label: "bold", keys: ["mod", "B"] },
  italic: { icon: ItalicIcon, label: "italic", keys: ["mod", "I"] },
  underline: { icon: UnderlineIcon, label: "underline", keys: ["mod", "U"] },
  strike: { icon: StrikethroughIcon, label: "strikethrough", keys: ["mod", "shift", "S"] },
  code: { icon: CodeIcon, label: "inlineCode", keys: ["mod", "E"] },
  bulletList: { icon: ListIcon, label: "bulletList", keys: ["mod", "shift", "8"] },
  orderedList: { icon: ListOrderedIcon, label: "numberedList", keys: ["mod", "shift", "7"] },
  blockquote: { icon: QuoteIcon, label: "quote", keys: ["mod", "shift", "B"] },
  undo: { icon: Undo2Icon, label: "undo", keys: ["mod", "Z"], flip: true },
  redo: { icon: Redo2Icon, label: "redo", keys: ["mod", "shift", "Z"], flip: true },
}

function run(editor: Editor, tool: MarkTool) {
  const chain = editor.chain().focus()
  const commands = {
    bold: () => chain.toggleBold(),
    italic: () => chain.toggleItalic(),
    underline: () => chain.toggleUnderline(),
    strike: () => chain.toggleStrike(),
    code: () => chain.toggleCode(),
    bulletList: () => chain.toggleBulletList(),
    orderedList: () => chain.toggleOrderedList(),
    blockquote: () => chain.toggleBlockquote(),
    undo: () => chain.undo(),
    redo: () => chain.redo(),
  }
  commands[tool]().run()
}

// The placeholder sits on the empty first paragraph, in the text's own place (start side, right to left included).
const placeholderClasses =
  "[&_.is-editor-empty:first-child]:before:pointer-events-none [&_.is-editor-empty:first-child]:before:float-start [&_.is-editor-empty:first-child]:before:h-0 [&_.is-editor-empty:first-child]:before:text-muted-foreground [&_.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]"

function RichTextEditorControl({
  value,
  defaultValue,
  onValueChange,
  name,
  placeholder,
  maxLength,
  showCount,
  toolbar = defaultTools,
  headings = [1, 2, 3],
  actions,
  disabled,
  readOnly,
  required,
  autoFocus,
  extensions: extraExtensions,
  editorRef,
  classNames,
  className,
  id,
  "aria-describedby": ariaDescribedBy,
  "aria-labelledby": ariaLabelledBy,
  "aria-invalid": ariaInvalid,
  "aria-label": ariaLabel,
  ...props
}: Omit<RichTextEditorProps, keyof FieldOwnProps>) {
  const { t } = useLocale()
  const field = useFieldControl({ id, disabled, required, "aria-describedby": ariaDescribedBy, "aria-labelledby": ariaLabelledBy, "aria-invalid": ariaInvalid })
  const editable = !field.disabled && !readOnly
  const [linkOpen, setLinkOpen] = React.useState(false)
  const toolbarRef = React.useRef<HTMLDivElement>(null)
  const tools = toolbar === false || readOnly ? [] : toolbar
  const hasLink = tools.includes("link")

  // The latest of what the editor calls back into, read when it calls: the editor itself is made once.
  const latest = React.useRef({ onValueChange, placeholder, hasLink })
  React.useLayoutEffect(() => {
    latest.current = { onValueChange, placeholder, hasLink }
  })
  const [html, setHtml] = React.useState(() => (typeof (value ?? defaultValue) === "string" ? ((value ?? defaultValue) as string) : ""))

  const headingsKey = headings.join()
  const extensions = React.useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: headingsKey.split(",").map(Number) as HeadingLevel[] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https", HTMLAttributes: { rel: "noopener noreferrer nofollow", target: null } },
        // The kit's look, not ProseMirror's blue drop line.
        dropcursor: { color: "var(--color-ring)", width: 2 },
        // No empty paragraph slipped in after a list or quote: it grew the box and made Undo live before any change.
        trailingNode: false,
      }),
      Placeholder.configure({ placeholder: () => latest.current.placeholder ?? "" }),
      CharacterCount.configure({ limit: maxLength ?? null }),
      ...(extraExtensions ?? []),
    ],
    [headingsKey, maxLength, extraExtensions]
  )

  const attributes = {
    ...(field.id && { id: field.id }),
    role: "textbox",
    "aria-multiline": "true",
    ...(ariaLabel && { "aria-label": ariaLabel }),
    ...(field["aria-labelledby"] && { "aria-labelledby": field["aria-labelledby"] }),
    ...(field["aria-describedby"] && { "aria-describedby": field["aria-describedby"] }),
    ...(field["aria-invalid"] && { "aria-invalid": "true" }),
    ...(field.required && { "aria-required": "true" }),
    ...(!editable && { "aria-readonly": "true" }),
    ...(field.disabled && { "aria-disabled": "true" }),
    class: proseClasses(
      "sm",
      cn(
        // 16px on phones, so iOS doesn't zoom in on focus.
        "min-h-32 px-3 py-2.5 outline-none max-md:text-base max-md:leading-7",
        placeholderClasses,
        (showCount || maxLength !== undefined) && "pb-7",
        classNames?.content
      )
    ),
  }

  const editor = useEditor(
    {
      extensions,
      content: value ?? defaultValue ?? "",
      editable,
      autofocus: autoFocus ? "end" : false,
      // Made in the browser after hydration: the server has no editor to draw.
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      editorProps: {
        attributes,
        handleKeyDown: (_view, event) => {
          // ⌘K / Ctrl+K: the link panel. Alt+F10: to the toolbar, as in other editors.
          if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k" && latest.current.hasLink) {
            event.preventDefault()
            setLinkOpen(true)
            return true
          }
          if (event.altKey && event.key === "F10") {
            const first = toolbarRef.current?.querySelector<HTMLElement>("button:not([disabled])")
            if (first) {
              event.preventDefault()
              first.focus()
              return true
            }
          }
          return false
        },
      },
      onUpdate: ({ editor }) => {
        const next = htmlOf(editor)
        setHtml(next)
        latest.current.onValueChange?.(next, editor)
      },
    },
    [extensions]
  )

  // The aria attributes follow the field (an error that appears after a submit), and the classes their props.
  const attributesKey = JSON.stringify(attributes)
  React.useEffect(() => {
    if (!editor || editor.isDestroyed) return
    editor.setOptions({ editorProps: { ...editor.options.editorProps, attributes: JSON.parse(attributesKey) } })
  }, [editor, attributesKey])

  React.useEffect(() => {
    if (editor && !editor.isDestroyed && editor.isEditable !== editable) editor.setEditable(editable, false)
  }, [editor, editable])

  // A controlled value that changed from outside (a reset, a loaded draft) replaces the content, without calling back.
  React.useEffect(() => {
    if (!editor || editor.isDestroyed || value === undefined || value === htmlOf(editor)) return
    editor.commands.setContent(value || "", { emitUpdate: false })
    setHtml(value)
  }, [editor, value])

  React.useImperativeHandle<Editor | null, Editor | null>(editorRef, () => editor, [editor])

  // A click on the label writes in the editor, as it would in a text field.
  const labelId = field["aria-labelledby"]
  React.useEffect(() => {
    const label = labelId ? document.getElementById(labelId) : null
    if (!label || !editor) return
    const focus = () => editor.commands.focus()
    label.addEventListener("click", focus)
    return () => label.removeEventListener("click", focus)
  }, [labelId, editor])

  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      return {
        heading: (headingsKey.split(",").map(Number).find((level) => editor.isActive("heading", { level })) ?? 0) as 0 | HeadingLevel,
        active: Object.fromEntries((["bold", "italic", "underline", "strike", "code", "bulletList", "orderedList", "blockquote", "link"] as const).map((name) => [name, editor.isActive(name)])) as Record<string, boolean>,
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
        characters: editor.storage.characterCount.characters() as number,
      }
    },
  })

  const characters = state?.characters ?? 0
  const left = maxLength === undefined ? Infinity : maxLength - characters
  // Quiet until the last tenth (at least 20 characters), like the prompt composer, unless asked to show always.
  const countShown = showCount || (maxLength !== undefined && left <= Math.max(20, Math.round(maxLength / 10)))
  const countText = maxLength === undefined ? String(characters) : showCount ? `${characters}/${maxLength}` : String(left)
  const countLabel = maxLength === undefined ? t("characterCount", { count: characters }) : t("charactersLeft", { count: left })

  // Undo and redo sit at the far end when they close the list.
  const trailing = (() => {
    let i = tools.length
    while (i > 0 && (tools[i - 1] === "undo" || tools[i - 1] === "redo")) i--
    return i
  })()

  const items = tools.map((tool, i) => {
    if (tool === "|") {
      if (tools[i + 1] === undefined || i + 1 === trailing) return null
      return <ToolbarPrimitive.Separator key={i} className="mx-1 h-5 w-px shrink-0 bg-border" />
    }
    const end = i === trailing && i > 0 ? "ms-auto" : undefined
    if (tool === "heading") {
      return (
        <HeadingMenu key={i} editor={editor} level={state?.heading ?? 0} levels={headings} disabled={!editable} />
      )
    }
    if (tool === "link") {
      return (
        <LinkTool key={i} editor={editor} open={linkOpen} onOpenChange={setLinkOpen} active={state?.active.link ?? false} disabled={!editable} />
      )
    }
    const mark = marks[tool]
    const pressable = tool !== "undo" && tool !== "redo"
    const can = tool === "undo" ? state?.canUndo : tool === "redo" ? state?.canRedo : true
    const on = pressable && Boolean(state?.active[tool])
    return (
      <ToolTip key={i} label={t(mark.label)} keys={mark.keys}>
        <ToolbarPrimitive.Button
          type="button"
          aria-label={t(mark.label)}
          aria-pressed={pressable ? on : undefined}
          data-state={pressable ? (on ? "on" : "off") : undefined}
          disabled={!editable || !can}
          onClick={() => editor && run(editor, tool)}
          className={cn(toolClass, mark.flip && "[&_svg]:rtl:-scale-x-100", end)}
        >
          <mark.icon />
        </ToolbarPrimitive.Button>
      </ToolTip>
    )
  })

  return (
    <div
      data-slot="rich-text-editor"
      data-disabled={field.disabled || undefined}
      data-invalid={field["aria-invalid"] ? true : undefined}
      data-readonly={readOnly || undefined}
      className={cn(
        "relative flex w-full min-w-0 flex-col rounded-lg border border-input bg-transparent shadow-xs transition-[color,box-shadow,border-color]",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15",
        "data-[invalid]:border-destructive data-[invalid]:ring-destructive/15",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[readonly]:bg-muted/50",
        className,
        classNames?.editor
      )}
      {...props}
    >
      {(tools.length > 0 || actions) && (
        <ScrollShadow orientation="horizontal" size={24} className="shrink-0 border-b">
          <ToolbarPrimitive.Root
            ref={toolbarRef}
            aria-label={t("formatting")}
            aria-controls={field.id}
            className={cn("flex w-max min-w-full items-center gap-0.5 p-1", classNames?.toolbar)}
          >
            {items}
            {actions && <div className={cn("flex shrink-0 items-center gap-0.5", trailing === tools.length && "ms-auto")}>{actions}</div>}
          </ToolbarPrimitive.Root>
        </ScrollShadow>
      )}
      <div className="relative min-w-0 flex-1 overflow-y-auto">
        {editor ? (
          <EditorContent editor={editor} />
        ) : (
          // Until the editor exists (one frame after hydration), the same box, so nothing moves when it arrives.
          <div aria-hidden className={attributes.class}>
            {placeholder && !html && <p className="text-muted-foreground">{placeholder}</p>}
          </div>
        )}
      </div>
      {(showCount || maxLength !== undefined) && (
        <span
          className={cn(
            "pointer-events-none absolute end-3 bottom-2 text-xs tabular-nums transition-opacity duration-(--duration-fast)",
            countShown ? "opacity-100" : "opacity-0",
            left <= 0 ? "text-destructive-text" : "text-muted-foreground"
          )}
        >
          <span aria-hidden>{countText}</span>
          <span className="sr-only" aria-live="polite">
            {countShown ? countLabel : ""}
          </span>
        </span>
      )}
      {name && <input type="hidden" name={name} value={html} disabled={field.disabled} />}
    </div>
  )
}

const toolClass = toggleVariants({ size: "sm", color: "neutral", className: "rounded-sm px-0" })

/** A tool's name and its keys, on hover and keyboard focus. */
function ToolTip({ label, keys, children, ...props }: { label: string; keys?: string[]; children: React.ReactElement }) {
  const apple = useAppleKeyboard()
  return (
    <Tooltip
      {...props}
      content={
        <span className="flex items-center gap-2">
          {label}
          {keys && (
            <span aria-hidden className="opacity-60">
              {keys.map((key) => describeKey(key, apple).label).join(apple ? "" : "+")}
            </span>
          )}
        </span>
      }
    >
      {children}
    </Tooltip>
  )
}

function HeadingMenu({ editor, level, levels, disabled }: { editor: Editor | null; level: 0 | HeadingLevel; levels: HeadingLevel[]; disabled: boolean }) {
  const { t } = useLocale()
  const picked = React.useRef(false)
  const Icon = headingIcons[level]
  const name = (l: 0 | HeadingLevel) => (l === 0 ? t("paragraph") : t("heading", { level: l }))
  return (
    <DropdownMenu
      align="start"
      // After a pick, back to writing; Escape goes back to the button.
      onCloseAutoFocus={(event) => {
        if (!picked.current) return
        picked.current = false
        event.preventDefault()
        editor?.commands.focus()
      }}
      items={[
        {
          type: "radio",
          value: String(level),
          onValueChange: (next) => {
            if (!editor) return
            picked.current = true
            const l = Number(next) as 0 | HeadingLevel
            if (l === 0) editor.chain().focus().setParagraph().run()
            else editor.chain().focus().setHeading({ level: l }).run()
          },
          options: ([0, ...levels] as (0 | HeadingLevel)[]).map((l) => {
            const ItemIcon = headingIcons[l]
            return { value: String(l), label: name(l), icon: <ItemIcon /> }
          }),
        },
      ]}
      trigger={
        <ToolbarPrimitive.Button
          type="button"
          aria-label={`${t("textStyle")}: ${name(level)}`}
          disabled={disabled}
          className={cn(toolClass, "gap-0.5 px-1.5 data-[state=open]:bg-accent data-[state=open]:text-foreground [&_svg:last-child]:size-3.5")}
        >
          <Icon />
          <ChevronDownIcon />
        </ToolbarPrimitive.Button>
      }
    />
  )
}

function LinkTool({
  editor,
  open,
  onOpenChange,
  active,
  disabled,
}: {
  editor: Editor | null
  open: boolean
  onOpenChange: (open: boolean) => void
  active: boolean
  disabled: boolean
}) {
  const { t } = useLocale()
  const [href, setHref] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)

  const openChange = (next: boolean) => {
    if (next && editor) {
      setHref((editor.getAttributes("link").href as string | undefined) ?? "")
      setInvalid(false)
    }
    onOpenChange(next)
  }
  // Opened from ⌘K: fill in the link under the cursor as the button would.
  const wasOpen = React.useRef(open)
  React.useEffect(() => {
    if (open && !wasOpen.current && editor) {
      setHref((editor.getAttributes("link").href as string | undefined) ?? "")
      setInvalid(false)
    }
    wasOpen.current = open
  }, [open, editor])

  const apply = (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (!editor) return
    const url = normalizeHref(href)
    if (!url) {
      setInvalid(true)
      return
    }
    const chain = editor.chain().focus()
    if (editor.state.selection.empty && !editor.isActive("link")) {
      // Nothing selected: the link goes in as its own text.
      chain.insertContent({ type: "text", text: href.trim(), marks: [{ type: "link", attrs: { href: url } }] }).run()
    } else {
      chain.extendMarkRange("link").setLink({ href: url }).run()
    }
    onOpenChange(false)
  }

  const remove = () => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run()
    onOpenChange(false)
  }

  const label = active ? t("editLink") : t("addLink")
  return (
    <PopoverRoot open={open} onOpenChange={openChange}>
      <ToolTip label={t("link")} keys={["mod", "K"]}>
        <PopoverTrigger asChild>
          <ToolbarPrimitive.Button type="button" aria-label={label} aria-pressed={active} data-state={active ? "on" : "off"} disabled={disabled} className={toolClass}>
            <LinkIcon />
          </ToolbarPrimitive.Button>
        </PopoverTrigger>
      </ToolTip>
      <PopoverContent
        align="start"
        className="w-80 max-w-[calc(100vw-1rem)] p-3"
        // Closing goes back to the text, where the link is.
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          editor?.commands.focus()
        }}
      >
        <form onSubmit={apply} className="grid gap-3">
          <Input
            label={label}
            value={href}
            onChange={(event) => {
              setHref(event.target.value)
              setInvalid(false)
            }}
            placeholder="https://"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            error={invalid ? t("invalidLink") : undefined}
          />
          <div className="flex justify-end gap-2">
            {active && (
              <Button type="button" variant="ghost" size="sm" color="destructive" onClick={remove}>
                {t("removeLink")}
              </Button>
            )}
            <Button type="submit" size="sm">
              {t("apply")}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </PopoverRoot>
  )
}

export { RichTextEditor, type RichTextEditorProps, type RichTextTool, type RichTextEditorClassNames, type Editor }
