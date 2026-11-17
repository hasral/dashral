# Components

Every Dashral component by category: what it is, when to use it and when another fits better. Install with `npx shadcn@latest add @dashral/<slug>`.

## AI

### Approval Card (`@dashral/approval-card`)
An AI assistant asking before it acts: what it wants to do, exactly what that means, and Approve or Deny.
Use: An assistant asking before it acts: send emails, refund an order, change a setting.
Not for: Confirming a person's own action: Alert Dialog.
Docs: http://localhost:3001/components/approval-card.md

### Conversation (`@dashral/conversation`)
The scrolling part of a chat with an AI assistant: it follows the newest message while it streams, inside a panel that keeps its height.
Use: The scrolling thread of a chat with an assistant or a person, kept at the newest message as it grows.
Not for: Comments under a record: List or Timeline.
Docs: http://localhost:3001/components/conversation.md

### Message (`@dashral/message`)
One message in a conversation with an AI assistant, with a cursor while it streams and Copy, Regenerate and feedback under it.
Use: One message in a chat: the user's on one side, the assistant's with copy, regenerate and feedback.
Not for: Notifications or comments: List.
Docs: http://localhost:3001/components/message.md

### Prompt Composer (`@dashral/prompt-composer`)
Where a message to an AI assistant is written: it grows as you type, takes files, and turns send into stop while the reply streams.
Use: The box people write to an assistant in: Enter sends, Shift+Enter adds a line, files attach.
Not for: A form field: Textarea.
Docs: http://localhost:3001/components/prompt-composer.md

### Prompt Suggestions (`@dashral/prompt-suggestions`)
Things to ask in an empty AI conversation: chips, one scrolling row, or cards with an icon and a line.
Use: Starting points for an empty chat: questions people can send in one click.
Not for: Actions on the page: buttons.
Docs: http://localhost:3001/components/prompt-suggestions.md

### Reasoning (`@dashral/reasoning`)
What an AI model thought before it answered, folded under one line: "Thinking…" while it works, then how long it took.
Use: The assistant's thinking, folded under its answer: open while it thinks, closed with the time it took.
Not for: Steps that call tools: Tool Activity.
Docs: http://localhost:3001/components/reasoning.md

### Tool Activity (`@dashral/tool-activity`)
The tools an AI assistant used to get its answer, step by step: their status, how long they took, and their input and output.
Use: What an assistant did to answer: the tools it ran, each with its status, time and output.
Not for: Its thinking in words: Reasoning. Events over days: Timeline.
Docs: http://localhost:3001/components/tool-activity.md

## Actions

### Action Bar (`@dashral/action-bar`)
The bar that rises while rows are selected: the count, actions for them, and a way to clear.
Use: Actions on the rows people selected, in a bar that rises from the bottom: archive, export, delete.
Not for: Actions on one item: Dropdown Menu. Actions that are always there: buttons in the page header.
Docs: http://localhost:3001/components/action-bar.md

### Button (`@dashral/button`)
Triggers an action. Sixteen variants — solid, soft, outline, ghost and link — four sizes, each with a square one for an icon alone, a loading state, and can render as a link.
Use: Any action: save, send, delete, open; variant shows how much it stands out, color what it means.
Not for: Going to another page: a link (Button asChild with your link keeps the look). On or off: Toggle or Switch.
Docs: http://localhost:3001/components/button.md

### Button Group (`@dashral/button-group`)
Buttons that belong together, joined into one control.
Use: Buttons that belong together, joined into one: Day/Week/Month, Previous/Next, a split button.
Not for: Picking one view with a sliding highlight: Segmented Control. Buttons that stay pressed: Toggle Group.
Docs: http://localhost:3001/components/button-group.md

### Command (`@dashral/command`)
A fast, filterable command menu — inline or as a ⌘K palette.
Use: A searchable list of actions or places: type to narrow it, arrows and Enter to pick. Inside a panel or page; for the ⌘K palette over everything, CommandDialog from the same file.
Not for: Picking a value for a form field: Combobox or Select. A handful of actions under a button: Dropdown Menu.
Docs: http://localhost:3001/components/command.md

### Context Menu (`@dashral/context-menu`)
A menu that opens on right-click or long-press, with shortcuts, checkboxes, radio items and submenus.
Use: Actions on right-click (or a long press) where people expect it: files, cards on a board, a canvas.
Not for: The only way to reach an action: give it a button too (Dropdown Menu), since right-click is hidden.
Docs: http://localhost:3001/components/context-menu.md

### Copy Button (`@dashral/copy-button`)
Copies a value in one tag: an icon button with a tooltip, or a button with a label, that turns into a check and says "Copied".
Use: Copying a value in one click: an API key, an invite link, a command.
Not for: Copying a whole block of code: Code Block has its own.
Docs: http://localhost:3001/components/copy-button.md

### Dropdown Menu (`@dashral/dropdown-menu`)
A menu of actions or options, opened by a button.
Use: Actions on one thing, under a button: edit, duplicate, delete. A row's actions in a table or list, behind a ⋯ button.
Not for: Picking a value for a form: Select or Combobox. Links to the pages of a site: Navigation Menu. More than a list, such as a form: Popover.
Docs: http://localhost:3001/components/dropdown-menu.md

### Toggle (`@dashral/toggle`)
A button that stays pressed: Bold, Pin, Mute.
Use: One on-or-off button in a toolbar: pin, bold, mute.
Not for: A setting with a label: Switch. Several related buttons: Toggle Group.
Docs: http://localhost:3001/components/toggle.md

### Toggle Group (`@dashral/toggle-group`)
A set of toggles: one at a time, like text alignment, or any of them, like Bold, Italic, Underline.
Use: A set of toolbar buttons: text formatting (several on), alignment (one on).
Not for: Switching views: Segmented Control. Choices in a form: Checkbox Group or Radio Group.
Docs: http://localhost:3001/components/toggle-group.md

## Charts

### Area Chart (`@dashral/area-chart`)
Values over time as filled areas: one series, several, or stacked into a total, with a dashed one for a comparison. Plain SVG.
Use: Amounts over time where the volume matters: revenue and costs by month, traffic by day; stacked to show parts of a total.
Not for: Exact values to compare across categories: Bar Chart. A trend in a small space: Sparkline.
Docs: http://localhost:3001/components/area-chart.md

### Bar Chart (`@dashral/bar-chart`)
Values compared across categories or periods as bars: one series, several side by side, or stacked. Plain SVG.
Use: Comparing amounts across categories or periods: orders by month, sales by region.
Not for: A ranking of many items with their names: Bar List. A smooth trend over many points: Line Chart or Area Chart.
Docs: http://localhost:3001/components/bar-chart.md

### Bar List (`@dashral/bar-list`)
Values side by side as labelled bars: top products, traffic sources, storage by type.
Use: A ranked list with a bar behind each name: top pages, top customers, sources of traffic.
Not for: Values over time: Bar Chart. Parts of a whole, few of them: Donut Chart.
Docs: http://localhost:3001/components/bar-list.md

### Candlestick Chart (`@dashral/candlestick-chart`)
Prices over time as candles, like a trading chart: open, high, low and close per period, with volume. Plain SVG.
Use: Prices that open, close, rise and fall in each period: stocks, crypto, exchange rates; with volume under them.
Not for: One value per period: Line Chart.
Docs: http://localhost:3001/components/candlestick-chart.md

### Combo Chart (`@dashral/combo-chart`)
Bars and lines on one chart, such as revenue as bars and margin as a line, with a second axis on the right for values of another kind. Plain SVG.
Use: Two related measures over the same periods, one as bars and one as a line: revenue and margin, orders and a target.
Not for: One kind of value only: Bar Chart or Line Chart. Parts of a whole: Donut Chart.
Docs: http://localhost:3001/components/combo-chart.md

### Donut Chart (`@dashral/donut-chart`)
Parts of a whole as a ring, with a legend of every value and share. Plain SVG, no chart library.
Use: Parts of one whole, two to five of them: visits by source, plans by share.
Not for: Many parts, or ones close in size: Bar List. Parts that nest: Treemap.
Docs: http://localhost:3001/components/donut-chart.md

### Funnel Chart (`@dashral/funnel-chart`)
Conversion step by step: each step's value and share, the flow narrowing between them and what dropped. Plain HTML and SVG, no chart library.
Use: Steps people go through in order, and how many make it to each: visits to payments, sign-ups to active teams.
Not for: Parts of one whole: Donut Chart. Values that don't follow one another: Bar Chart or Bar List.
Docs: http://localhost:3001/components/funnel-chart.md

### Gauge (`@dashral/gauge`)
One value within a range as a half ring — a score, a quota or a target. A meter for assistive technology.
Use: One value against its limit, as a dial: storage used, a quota, a score.
Not for: A task's progress: Progress. A small ring in a card: Progress Circle.
Docs: http://localhost:3001/components/gauge.md

### Heatmap (`@dashral/heatmap`)
Activity per day as a calendar grid of weeks, like a contribution graph. Plain SVG.
Use: How busy each day was, over months: orders, commits, sign-ins.
Not for: Exact daily numbers to compare: Bar Chart.
Docs: http://localhost:3001/components/heatmap.md

### Line Chart (`@dashral/line-chart`)
Values over time as lines, with dashed ones for a target or last year; the axis fits the values so changes show. Plain SVG.
Use: A trend over many points in time: visitors by day, response time, a price.
Not for: Amounts that add up, where the area matters: Area Chart. A few categories: Bar Chart.
Docs: http://localhost:3001/components/line-chart.md

### Sparkline (`@dashral/sparkline`)
A tiny line, area or bar chart without axes, for a trend next to a number or in a table cell.
Use: A tiny trend beside a number or in a table row: sign-ups this week, a price today.
Not for: A trend people read closely, with axes: Line Chart or Area Chart.
Docs: http://localhost:3001/components/sparkline.md

### Tracker (`@dashral/tracker`)
A row of status squares for uptime, job runs or habits; hover a square (or use the arrow keys) to read its day and note. Where it's narrow, the oldest make room.
Use: How something went, one square per day or run: uptime, a job's runs, a habit.
Not for: Amounts per day over months: Heatmap. A trend in numbers: Sparkline or Line Chart.
Docs: http://localhost:3001/components/tracker.md

### Treemap (`@dashral/treemap`)
Parts of a whole as rectangles sized by value, with groups you can zoom into.
Use: Parts of a total that nest: spend by team and by item, disk use by folder.
Not for: A few parts that don't nest: Donut Chart or Bar List.
Docs: http://localhost:3001/components/treemap.md

## Data display

### Avatar (`@dashral/avatar`)
An image element with a fallback for representing a user, and a group that stacks several.
Use: A person or a team, by picture or initials, with a status dot; a few people at once with AvatarGroup.
Not for: A logo or a file type: an img, or an icon in a tinted square.
Docs: http://localhost:3001/components/avatar.md

### Badge (`@dashral/badge`)
A small label for statuses, counts and categories.
Use: A short status or label beside something: Paid, Draft, New, a count.
Not for: Something to click: Button. Tags people add and remove: Tag Input. A count on an icon: Indicator.
Docs: http://localhost:3001/components/badge.md

### Carousel (`@dashral/carousel`)
Slides in a row to swipe or step through, with arrows, dots, looping and autoplay.
Use: A row of items people swipe or step through: product pictures, testimonials, featured posts.
Not for: Content everyone must see: show it in the page, not on slide four. Pictures to open full screen: Lightbox.
Docs: http://localhost:3001/components/carousel.md

### Code Block (`@dashral/code-block`)
Code to read and copy, colored for its language, with a file name or tabs, line numbers and marked lines.
Use: Code to read and copy, highlighted: docs, an API key setup, a snippet in a help page.
Not for: A short value to copy: Copy Button. Data to explore: JSON Viewer.
Docs: http://localhost:3001/components/code-block.md

### Countdown (`@dashral/countdown`)
Time left until a moment, ticking each second, with unit names in the reader's language.
Use: Time left to a moment: a launch, a sale ending, a maintenance window.
Not for: Time since something happened: Relative Time.
Docs: http://localhost:3001/components/countdown.md

### Data Table (`@dashral/data-table`)
A full-featured table built on TanStack Table v9: search, faceted filters, sorting, column visibility, row selection, pagination and CSV or Excel export.
Use: Records people search, sort, filter, select and export: customers, orders, invoices. Lists longer than a page, with paging, column choice and row actions built in. Thousands of rows, a log or an audit trail, with virtual: one scrolling table, loading more as you go with onLoadMore.
Not for: A few rows to read, nothing to do with them: Table. Records shown as cards or a feed: a list of Cards.
Docs: http://localhost:3001/components/data-table.md

### Description List (`@dashral/description-list`)
Terms and their values: a record's details, a summary, an invoice's totals.
Use: Facts about one record as label and value: a customer, an order, an invoice.
Not for: Many records: Table or Data Table. Values people edit: a form.
Docs: http://localhost:3001/components/description-list.md

### Image (`@dashral/image`)
A picture that never pops in: its box breathes while it loads, it fades in, and a new picture crossfades over the old one with a spinner meanwhile.
Use: A picture that loads from the network: a product photo, a cover, an article's lead, a thumbnail in a list. A picture that changes while it's on screen: a product's views, a variant, a chosen file.
Not for: A person or a team: Avatar, which falls back to initials. Pictures to open large and step through: Lightbox. A small icon that ships with the page: an img, or an SVG.
Docs: http://localhost:3001/components/image.md

### Indicator (`@dashral/indicator`)
A dot or a count on the corner of a button, an avatar or a tab.
Use: A count or dot on an icon button: unread notifications, items in a cart.
Not for: A status beside text: Badge.
Docs: http://localhost:3001/components/indicator.md

### JSON Viewer (`@dashral/json-viewer`)
JSON to read and explore: folding objects and arrays, colored values, copy.
Use: Data people open level by level: a webhook's payload, an API response, logs.
Not for: Code to read: Code Block. A few fields: Description List.
Docs: http://localhost:3001/components/json-viewer.md

### Kbd (`@dashral/kbd`)
A key or a shortcut as on a keyboard: ⌘ K on a Mac, Ctrl K elsewhere, read out as words.
Use: A keyboard shortcut shown in text, a menu or a tooltip: ⌘K, Ctrl+S.
Not for: Code or a value to copy: Code Block or Copy Button.
Docs: http://localhost:3001/components/kbd.md

### Lightbox (`@dashral/lightbox`)
A grid of pictures that opens each one large, with arrows, swipes and captions.
Use: Photos people open full screen and step through: a gallery, a product's pictures, attachments.
Not for: One picture that never opens: an img. Slides of mixed content: Carousel.
Docs: http://localhost:3001/components/lightbox.md

### List (`@dashral/list`)
Rows of people, files or things: a picture, a title, details and actions.
Use: Rows of the same kind, each a link: team members, recent files, notifications. A feed of any length, with virtual and onLoadMore: only the rows in view are drawn.
Not for: Columns to compare or sort: Table or Data Table. Label and value about one thing: Description List.
Docs: http://localhost:3001/components/list.md

### Metric Card (`@dashral/metric-card`)
One number that matters, with its change against a past period and room for a sparkline.
Use: One number that matters, with its change: revenue, active users, churn, at the top of a dashboard.
Not for: A trend people read over time: a chart. Several facts about one record: Description List.
Docs: http://localhost:3001/components/metric-card.md

### Relative Time (`@dashral/relative-time`)
A moment as people say it, "3 minutes ago", in the reader's language and kept current.
Use: When something happened, as people say it: 5 minutes ago, yesterday; the exact time on hover.
Not for: Time left until something: Countdown. Dates people compare in a table: the date itself.
Docs: http://localhost:3001/components/relative-time.md

### Sortable (`@dashral/sortable`)
Items you put in order by dragging: a menu, priorities, a table's columns, a product's photos.
Use: Putting things in order by dragging: menu items, a playlist, priorities; keyboard works too.
Not for: Sorting by a column: Data Table. Moving cards between columns: a board.
Docs: http://localhost:3001/components/sortable.md

### Table (`@dashral/table`)
A responsive table for tabular data.
Use: A few rows to read and compare, styled: an invoice's lines, a plan comparison.
Not for: Rows people search, sort, select or page: Data Table.
Docs: http://localhost:3001/components/table.md

### Timeline (`@dashral/timeline`)
A vertical list of events in chronological order.
Use: Events in the order they happened: an order's tracking, an account's history, a changelog.
Not for: Steps still to do: Steps.
Docs: http://localhost:3001/components/timeline.md

### Tree View (`@dashral/tree-view`)
Nested items that open and close: files, categories or permissions.
Use: Nested things people open level by level: folders and files, categories, an org chart.
Not for: One level: List. Pages of an app: Sidebar.
Docs: http://localhost:3001/components/tree-view.md

## Dates

### Calendar (`@dashral/calendar`)
A date grid for picking a day or a range, built on DayPicker.
Use: A month always on the page: picking a day in a booking flow, a schedule at a glance.
Not for: A date in a form: Date Picker, which opens a calendar from a field. A start and an end: Date Range Picker.
Docs: http://localhost:3001/components/calendar.md

### Date Picker (`@dashral/date-picker`)
A button that opens a calendar in a popover.
Use: One date in a form: a due date, a birthday, a delivery day, with a time too if needed (withTime).
Not for: A start and an end: Date Range Picker. A calendar always on the page: Calendar. Only a time: Time Picker.
Docs: http://localhost:3001/components/date-picker.md

### Date Range Picker (`@dashral/date-range-picker`)
Pick a start and end day on a two-month calendar, or from shortcuts like “Last 7 days”.
Use: A start and an end date: a report's period, a booking, a leave request; with presets like Last 7 days.
Not for: One date: Date Picker. Fixed periods such as 7D or 30D: Segmented Control.
Docs: http://localhost:3001/components/date-range-picker.md

### Month Picker (`@dashral/month-picker`)
A month or a year picked in a field, for monthly and yearly reports, billing periods and card expiry.
Use: A month or a year rather than a day: a monthly or yearly report, a billing period, a card's expiry, a fiscal year (view="year").
Not for: A day: Date Picker. A start and an end: Date Range Picker. Fixed periods such as 7D, 30D or 12M: Segmented Control.
Docs: http://localhost:3001/components/month-picker.md

### Time Picker (`@dashral/time-picker`)
A time picked from a list of steps or typed exactly, shown the locale's way, stored as HH:MM.
Use: A time of day: a meeting's start, opening hours, a reminder.
Not for: A date with its time: Date Picker with withTime. A length of time: Number Input.
Docs: http://localhost:3001/components/time-picker.md

## Effects

### Glide (`@dashral/glide`)
An element that glides to its new place and size when the layout changes, in the Motion edition.
Use: Things that move when the layout changes: rows as a list is sorted, cards as a view turns from list to grid, a highlight moving between cards (layoutId).
Not for: Rows added or removed: RevealList grows and folds them. A sliding highlight inside one control: Tabs and Segmented Control have their own.
Docs: http://localhost:3001/components/glide.md

### Marquee (`@dashral/marquee`)
Items that scroll on their own and loop without a seam: logos, testimonials, integrations, a news or price ticker — sideways or up.
Use: A row that drifts sideways on a landing page: customer logos, short quotes.
Not for: Anything people need to read or click: it moves away. Show it still.
Docs: http://localhost:3001/components/marquee.md

### Swap (`@dashral/swap`)
Content that changes in place: the old one fades out as the new one arrives, as a fade, a rise or a pop.
Use: Content that changes in place after an action: an icon turning into a check, a label going from Copy to Copied, a form giving way to a thank-you.
Not for: Content that appears or disappears, pushing what's below: Reveal. A number that counts to its new value: MetricCard, or Badge in the Motion edition.
Docs: http://localhost:3001/components/swap.md

### Text Reveal (`@dashral/text-reveal`)
Text that arrives word by word as it scrolls into view: blurring in, rising from a line, fading or wiped in.
Use: A headline that appears word by word as it scrolls in: landing pages, a launch.
Not for: App screens and anything read often: text that moves gets in the way.
Docs: http://localhost:3001/components/text-reveal.md

## Feedback

### Alert (`@dashral/alert`)
A callout that draws attention to important information.
Use: A state people should see while it's true, in the page: payment received, a card about to expire, a sync failing.
Not for: A short message that goes away: Toast. A tip beside docs or steps: Note. News across the whole app: Banner.
Docs: http://localhost:3001/components/alert.md

### Banner (`@dashral/banner`)
A strip across the page for news that concerns everyone: a launch, a sale, planned downtime.
Use: News for everyone across the top of the app or site: a release, planned downtime, a trial ending.
Not for: Something about one page: Alert. A message after an action: Toast.
Docs: http://localhost:3001/components/banner.md

### Empty State (`@dashral/empty-state`)
What a page, list or table shows when there's nothing in it yet — and the next step to take.
Use: A list or page with nothing in it yet: what goes here, and the button to add the first one.
Not for: A search that found nothing: say so in one line under the search. An error: Alert.
Docs: http://localhost:3001/components/empty-state.md

### Note (`@dashral/note`)
An aside in the flow of a page: a tip or a caveat on a calm card, with a breath of its color in the corner.
Use: A tip, a warning or an aside beside docs or a long form: good to know, careful, deprecated.
Not for: The state of something in an app: Alert.
Docs: http://localhost:3001/components/note.md

### Progress (`@dashral/progress`)
Shows how far a task has progressed.
Use: How far something has come: an upload, a setup, storage used.
Not for: Waiting with no known end: Spinner or Skeleton. Steps with names: Steps. A small round one: Progress Circle.
Docs: http://localhost:3001/components/progress.md

### Progress Circle (`@dashral/progress-circle`)
Progress as a ring, for a small space: a file in a list, a quota on a card.
Use: A percentage in a small ring: a profile complete, a quota, a score in a card.
Not for: Across the width: Progress. A value against a target, as a dial: Gauge.
Docs: http://localhost:3001/components/progress-circle.md

### Skeleton (`@dashral/skeleton`)
A placeholder shown while content is loading.
Use: The shape of content while it loads, so the page doesn't jump when it comes.
Not for: A short wait on a button: Button's loading. A wait with no known shape: Spinner.
Docs: http://localhost:3001/components/skeleton.md

### Spinner (`@dashral/spinner`)
An animated indicator for loading states.
Use: A short wait with nothing to show yet: loading a panel, a request in flight.
Not for: Content with a known shape: Skeleton. Progress you can measure: Progress.
Docs: http://localhost:3001/components/spinner.md

### Toast (`@dashral/toast`)
Brief, non-blocking notifications. Powered by Sonner.
Use: Telling people something worked, or didn't, without stopping them: saved, sent, copied. An Undo for something just done.
Not for: Something they must read or answer: Alert Dialog. A state that stays while it's true, such as a failed payment: Alert in the page.
Docs: http://localhost:3001/components/toast.md

## Inputs

### Autocomplete (`@dashral/autocomplete`)
A text field that suggests as you type, where any text is still a valid answer.
Use: Free text with suggestions as people type: a city, a search, a job title; any text is allowed.
Not for: Only values from the list: Combobox.
Docs: http://localhost:3001/components/autocomplete.md

### Avatar Upload (`@dashral/avatar-upload`)
A profile photo or logo with its upload: pick or drop a picture, crop it in a dialog, get a square file back.
Use: Someone's profile photo, or a workspace or company logo, in a settings form: pick or drop a picture, crop it, upload a small square file.
Not for: Several files, or files that aren't pictures: File Dropzone. A crop of another shape, such as a 3:1 cover: Image Cropper with cropImage.
Docs: http://localhost:3001/components/avatar-upload.md

### Checkbox (`@dashral/checkbox`)
A control that toggles between checked and unchecked.
Use: One yes-or-no that's saved with a form: accept the terms, email me about releases.
Not for: A setting that applies at once: Switch. Several related choices: Checkbox Group.
Docs: http://localhost:3001/components/checkbox.md

### Checkbox Group (`@dashral/checkbox-group`)
Several checkboxes under one label, to pick any number of options.
Use: Picking any number of a few related options: the channels to notify on, the days a shop opens.
Not for: One of them only: Radio Group. A long list: Multi Select.
Docs: http://localhost:3001/components/checkbox-group.md

### Color Picker (`@dashral/color-picker`)
A hex field with a swatch that opens saturation, brightness and hue, presets and a pick from the screen.
Use: A color people pick: a brand color, a label's color, a theme.
Not for: A few fixed colors: Radio Group or Toggle Group of swatches.
Docs: http://localhost:3001/components/color-picker.md

### Editable Text (`@dashral/editable-text`)
Text you click to change in place: a name, a title, a label.
Use: Renaming in place: a project's title, a board's name; click, type, Enter.
Not for: Several fields at once: a form with Save.
Docs: http://localhost:3001/components/editable-text.md

### Field (`@dashral/field`)
A label, a hint and an error around a form control, with the ids and aria attributes wired up.
Use: A label, a hint and an error around a control that has none of its own: a custom picker, a group of switches. Lining up your own controls with the kit's, which take label, description and error themselves.
Not for: Input, Select, Textarea and the other form controls: give them label, description and error directly.
Docs: http://localhost:3001/components/field.md

### File Dropzone (`@dashral/file-dropzone`)
Drop files or browse for them, with type, size and count checks and a list of what was picked.
Use: Files to drop or pick: attachments, a logo, a CSV import; type and size checked before upload.
Not for: A profile photo or logo, cropped to a square: Avatar Upload.
Docs: http://localhost:3001/components/file-dropzone.md

### Image Cropper (`@dashral/image-cropper`)
Move, zoom and turn a picture under a crop of any shape, then draw the crop into a file with cropImage.
Use: A picture to frame before it's saved: a cover or banner, a product photo, a crop of a set shape.
Not for: A profile photo or logo in a form: Avatar Upload, which brings the picker and the dialog. A picture only to look at, bigger: Lightbox.
Docs: http://localhost:3001/components/image-cropper.md

### Input (`@dashral/input`)
A text field for forms and search.
Use: Short text in a form: a name, an email, a URL, a number with a prefix or suffix.
Not for: Several lines: Textarea. A value from a list: Select or Combobox. Numbers people step up and down: Number Input.
Docs: http://localhost:3001/components/input.md

### Input OTP (`@dashral/input-otp`)
A one-time code in boxes, one character each: typed, pasted or filled from a text message.
Use: A one-time code from email or SMS, a box per digit; pasting the whole code fills them all.
Not for: A password or a PIN people choose: Input with type="password".
Docs: http://localhost:3001/components/input-otp.md

### Number Input (`@dashral/number-input`)
A number field with − / + steppers, arrow-key steps, limits and locale formatting — and MoneyInput for amounts.
Use: Numbers people type or step: seats, quantity, a price (MoneyInput, from the same file).
Not for: A rough value or a range: Slider. A number with no stepping, such as a ZIP code: Input.
Docs: http://localhost:3001/components/number-input.md

### Phone Input (`@dashral/phone-input`)
A phone number with its country, grouped as it's typed and given in international form.
Use: A phone number with its country, sent in one international format (+62…).
Not for: Numbers that aren't phones: Input or Number Input.
Docs: http://localhost:3001/components/phone-input.md

### Radio Group (`@dashral/radio-group`)
A set of options where only one can be selected.
Use: Picking one of two to five options people should see side by side: a plan, a shipping speed.
Not for: Many options: Select. A compact switch between views: Segmented Control. Several at once: Checkbox Group.
Docs: http://localhost:3001/components/radio-group.md

### Rating (`@dashral/rating`)
A star rating that works with the keyboard and in forms, and shows an average.
Use: A score in stars: a review, feedback after a support chat.
Not for: Showing an average, read only: Rating with readOnly, or the number with a star icon.
Docs: http://localhost:3001/components/rating.md

### Rich Text Editor (`@dashral/rich-text-editor`)
Formatted text with a toolbar, keyboard shortcuts and markdown as you type; its value is HTML for forms.
Use: Formatted text people write: a description, release notes, a reply with lists and links. In a form: its value is HTML, sent under name, with a label, hint and error like any field.
Not for: Plain text, even long: Textarea (lighter, no HTML to store). A chat message to an assistant: Prompt Composer. Showing HTML you already have: Prose.
Docs: http://localhost:3001/components/rich-text-editor.md

### Segmented Control (`@dashral/segmented-control`)
A row of options where one is picked, like a view switcher. The highlight slides to the choice.
Use: Switching how the same thing is shown: day, week or month; list or grid; a chart's period.
Not for: Different content per choice: Tabs. A choice saved with a form: Radio Group.
Docs: http://localhost:3001/components/segmented-control.md

### Slider (`@dashral/slider`)
Pick a value or a range by dragging a thumb.
Use: A value or a range where the feel matters more than the exact number: a price range, volume, a radius.
Not for: An exact number: Number Input. A few fixed steps: Segmented Control or Radio Group.
Docs: http://localhost:3001/components/slider.md

### Switch (`@dashral/switch`)
A toggle for on/off settings.
Use: A setting that takes effect the moment it's flipped: notifications, dark mode, a feature on or off.
Not for: A choice saved with a form's Save button: Checkbox.
Docs: http://localhost:3001/components/switch.md

### Tag Input (`@dashral/tag-input`)
Type free-text tags; Enter or a comma adds one, and pasting a list adds them all.
Use: Free words people add themselves: tags, keywords, emails to invite.
Not for: Picking from a known list: Multi Select.
Docs: http://localhost:3001/components/tag-input.md

### Textarea (`@dashral/textarea`)
A multi-line text field that grows with its content.
Use: Text longer than a line: notes, a description, a message.
Not for: One line: Input. A chat box that sends on Enter: Prompt Composer.
Docs: http://localhost:3001/components/textarea.md

## Layout

### Accordion (`@dashral/accordion`)
Vertically stacked sections that expand to reveal content.
Use: Questions and answers, or sections people open one at a time: an FAQ, settings in groups.
Not for: One section to show or hide: Collapsible. Views people switch between: Tabs.
Docs: http://localhost:3001/components/accordion.md

### App Shell (`@dashral/app-shell`)
A dashboard's frame in one tag: the sidebar, a bar that sticks, the page header and the page; on a phone the sidebar opens from a menu button.
Use: The frame of an admin app or dashboard: its navigation, a bar along the top and each page's header.
Not for: A marketing page: Container and Section. The navigation alone, in a layout of your own: Sidebar.
Docs: http://localhost:3001/components/app-shell.md

### Aspect Ratio (`@dashral/aspect-ratio`)
A box that keeps its shape as it resizes, for an image, a video or a map.
Use: Keeping a picture, video or map at its shape as the width changes: covers, thumbnails, embeds.
Not for: Images with a known size: give the img its width and height. A picture from the network: Image with ratio keeps the shape too, and shows it loading.
Docs: http://localhost:3001/components/aspect-ratio.md

### Card (`@dashral/card`)
A container that groups related content and actions — from simple panels to image-rich product, article and profile cards.
Use: A box for one subject on a page: a setting, a summary, a small form, with its title and its actions.
Not for: One number with its change: Metric Card. Rows of the same kind: List or Table.
Docs: http://localhost:3001/components/card.md

### Collapsible (`@dashral/collapsible`)
One section that opens and closes under its title.
Use: One section people can open when they need it: advanced settings, more details.
Not for: Several sections, one open at a time: Accordion.
Docs: http://localhost:3001/components/collapsible.md

### Container (`@dashral/container`)
The width of a page's content: centred, as wide as its size and no wider, with room at the sides on a phone.
Use: The width of a page's content: an article, a settings page, every part of a landing page.
Not for: A landing page's part with a heading: Section, which has a Container inside. A box with a border and a background: Card.
Docs: http://localhost:3001/components/container.md

### Form Section (`@dashral/form-section`)
One group of a settings page: a title and description beside its fields.
Use: A part of a settings page: its title and description beside the fields, its own Save.
Not for: A form in a dialog: Dialog with form. A whole short form, such as sign-in: the fields on their own.
Docs: http://localhost:3001/components/form-section.md

### Prose (`@dashral/prose`)
Good-looking text from the plain HTML that Markdown, MDX or a CMS produces.
Use: Long text you don't style yourself: a blog post, docs, a changelog, Markdown turned into HTML.
Not for: App screens: the kit's components and your own layout.
Docs: http://localhost:3001/components/prose.md

### Resizable (`@dashral/resizable`)
Panels whose sizes you change by dragging the handle between them, or with the keyboard.
Use: Panels people resize by dragging between them: a file list beside an editor, a preview beside code.
Not for: Fixed layouts: a grid or flex. An app's sidebar: Sidebar, which collapses instead.
Docs: http://localhost:3001/components/resizable.md

### Reveal (`@dashral/reveal`)
Content that appears and disappears in place, its height growing so nothing below jumps.
Use: Something that appears in place when it's needed: an error under a field or in a dialog, a field that depends on a choice, a hint.
Not for: A section people open themselves, with a title to click: Collapsible. A message that floats over the page and goes away: Toast.
Docs: http://localhost:3001/components/reveal.md

### Scroll Shadow (`@dashral/scroll-shadow`)
A scroll area whose edges fade while there's more to see, instead of a scrollbar.
Use: A box that scrolls inside the page, with a soft shadow where more is hidden: a list in a card, a menu.
Not for: The page itself: it scrolls on its own.
Docs: http://localhost:3001/components/scroll-shadow.md

### Section (`@dashral/section`)
One part of a landing page: the room around it, an eyebrow, title, description and buttons, and its content in a Container.
Use: Each part of a landing page: features, pricing, testimonials, a FAQ, the last call to action.
Not for: A part of a settings page: Form Section. A page's width alone, with no heading: Container.
Docs: http://localhost:3001/components/section.md

### Separator (`@dashral/separator`)
Visually separates content, horizontally or vertically.
Use: A thin line between groups: links in a row, sections of a menu or a card.
Not for: Space alone would do: a gap reads calmer than a line.
Docs: http://localhost:3001/components/separator.md

## Navigation

### Breadcrumb (`@dashral/breadcrumb`)
Shows where a page sits in the site's hierarchy, with links back up to each level.
Use: Where a page sits in the app, above its title: Customers › Olivia Martin. Pages two or more levels deep, so people can step back up a level.
Not for: Pages at the top level: the sidebar already shows where you are. Steps of a flow done in order: Steps.
Docs: http://localhost:3001/components/breadcrumb.md

### Menubar (`@dashral/menubar`)
The row of menus along the top of an app: File, Edit, View.
Use: A desktop-style row of menus along the top of an editor: File, Edit, View.
Not for: Websites and dashboards: Navigation Menu or Sidebar. One menu: Dropdown Menu.
Docs: http://localhost:3001/components/menubar.md

### Navigation Menu (`@dashral/navigation-menu`)
A site's main navigation, with menus that open a panel of links.
Use: The links along the top of a website: product pages under one menu, pricing and docs beside it. Menus that explain where each link goes, with a line under each name.
Not for: An app's own pages: Sidebar. Actions under a button: Dropdown Menu.
Docs: http://localhost:3001/components/navigation-menu.md

### Page Header (`@dashral/page-header`)
The top of an admin page: breadcrumb, title, description, actions and tabs.
Use: The top of an app page: where it is, its title, a line about it, and its main actions.
Not for: A section inside a page: a heading, or Card's title.
Docs: http://localhost:3001/components/page-header.md

### Pagination (`@dashral/pagination`)
Page navigation with previous/next links and ellipsis gaps.
Use: Moving through a long list a page at a time: orders, search results, invoices. Lists whose pages have their own URLs (give hrefPattern instead of onPageChange).
Not for: Tables: Data Table has paging built in. Feeds read top to bottom: load more as people scroll.
Docs: http://localhost:3001/components/pagination.md

### Sidebar (`@dashral/sidebar`)
An app's side navigation: groups of links, sections that open, a sliding current-page highlight, and a collapse to icons.
Use: The main navigation of an app: its pages down the side, in groups, with icons, counts and one level of sections. Apps people work in for a while (dashboards, admin, tools), where the pages stay one click away and the sidebar can narrow to its icons.
Not for: Public sites and landing pages: a header with links (Navigation Menu) leaves the page its width. Apps with three or four pages: Tabs or a header's links are enough. Choosing between views of one page: Tabs or Segmented Control.
Docs: http://localhost:3001/components/sidebar.md

### Steps (`@dashral/steps`)
Shows progress through a multi-step flow.
Use: Where people are in a flow done in order: sign-up, checkout, onboarding.
Not for: Views people switch between freely: Tabs. Events that happened: Timeline.
Docs: http://localhost:3001/components/steps.md

### Tabs (`@dashral/tabs`)
Switch between related views without leaving the page.
Use: Views of one thing, one at a time: a project's overview, activity and settings. Grouping a long page into parts people switch between without leaving it.
Not for: Moving between pages of an app: Sidebar or Navigation Menu. Choosing an option, such as a period or a view mode: Segmented Control. Steps that come in order: Steps.
Docs: http://localhost:3001/components/tabs.md

## Overlays

### Alert Dialog (`@dashral/alert-dialog`)
A question that has to be answered before anything else: Cancel, or confirm what can't be undone.
Use: Asking before something that can't be undone: deleting, removing someone, cancelling a plan. Any question that must be answered before going on.
Not for: A form to fill in: Dialog. Something that can be undone: do it, then offer Undo in a Toast.
Docs: http://localhost:3001/components/alert-dialog.md

### Dialog (`@dashral/dialog`)
A modal window that focuses the user on a single task.
Use: A short task that needs the page to wait: edit a name, invite someone, confirm details. A form of a few fields, opened from a button and closed when it's saved.
Not for: Confirming something that can't be undone: Alert Dialog. Long forms or details beside the page: Sheet, or a page of its own. Information that needs no answer: Toast, Alert or Popover.
Docs: http://localhost:3001/components/dialog.md

### Hover Card (`@dashral/hover-card`)
A preview that opens when a pointer rests on a link — a person, a ticket, a page.
Use: A preview on hover of a link: a person behind @mention, a page behind a link.
Not for: Anything people must be able to reach on touch screens or with the keyboard alone: Popover. A word or two: Tooltip.
Docs: http://localhost:3001/components/hover-card.md

### Popover (`@dashral/popover`)
Rich content in a floating panel, anchored to a trigger.
Use: A little more under a button, without leaving the page: a few filters, a short form, details.
Not for: A list of actions: Dropdown Menu. A hint on hover: Tooltip or Hover Card. A task that needs the whole page's attention: Dialog or Sheet.
Docs: http://localhost:3001/components/popover.md

### Sheet (`@dashral/sheet`)
A panel that slides in from the edge of the screen.
Use: A side task over the page, without leaving it: filters, a record's details, a quick edit. On phones, the app's menu or a form too long for a dialog.
Not for: A question that needs an answer before going on: Dialog or Alert Dialog. A few choices under a button: Dropdown Menu or Popover. Something people keep open beside their work: a column of the page.
Docs: http://localhost:3001/components/sheet.md

### Tooltip (`@dashral/tooltip`)
A short hint shown on hover or keyboard focus.
Use: A word or two on hover or focus: what an icon button does, a shortcut.
Not for: Anything people must read to use the page: put it on the page. More than a line, or links: Hover Card or Popover.
Docs: http://localhost:3001/components/tooltip.md

## Selects

### Combobox (`@dashral/combobox`)
A searchable select — type to filter a long list of options.
Use: Picking one value from a long list by typing a few letters: a country, a customer, a time zone.
Not for: Up to about ten options: Select. Picking several: Multi Select. Searching actions or pages, not a value: Command.
Docs: http://localhost:3001/components/combobox.md

### Multi Select (`@dashral/multi-select`)
Pick several options from a searchable list; the picks show as removable chips.
Use: Picking several from a known list: labels, team members, categories.
Not for: Only one: Select or Combobox. Words people make up: Tag Input. Three or four options in view: Checkbox Group.
Docs: http://localhost:3001/components/multi-select.md

### Native Select (`@dashral/native-select`)
A styled native <select> — fully accessible and mobile-friendly.
Use: The browser's own select: the phone's native picker, and it works before JavaScript loads.
Not for: App pages that should look the same everywhere: Select. Long lists to search: Combobox.
Docs: http://localhost:3001/components/native-select.md

### Select (`@dashral/select`)
A custom dropdown for choosing one option from a list.
Use: Picking one of a few known options in a form: a status, a role, a plan.
Not for: Long lists people would rather type to find: Combobox. Two to five options seen at once: Radio Group or Segmented Control. Picking several: Multi Select.
Docs: http://localhost:3001/components/select.md

### Time Zone Select (`@dashral/time-zone-select`)
A time zone picker: offsets, cities and names in the reader's language, searchable.
Use: Picking a time zone, searchable by city or offset, with the browser's own as "local".
Not for: A country or a language: Combobox or Select.
Docs: http://localhost:3001/components/time-zone-select.md

### Tree Select (`@dashral/tree-select`)
A field that picks from nested options: province, city and district, or a product's category, shown as its whole path.
Use: Picking one item from a hierarchy in a form: province, city and district for an address, a product's category, a team inside a department. Several items across a hierarchy, with multiple: the areas a courier covers, the categories a discount applies to.
Not for: A flat list of options: Select, or Combobox to search it. A hierarchy people browse and work in, not pick from: Tree View on the page.
Docs: http://localhost:3001/components/tree-select.md
