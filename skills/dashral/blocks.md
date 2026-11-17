# Blocks and screens

Built from the components, each taking your own data as props: blocks are sections of a page (a header, pricing, sign-in), screens are whole pages inside an app (an AI assistant, a kanban board, billing). Both install the same way: free ones with the shadcn CLI, Pro ones with Dashral Pro.

## AI (screens)

### AI assistant (`@dashral/ai-assistant`)
A whole assistant screen: starter cards, reasoning, tool calls, an approval before it emails anyone, and a streamed answer, with past conversations beside it.
Use: A whole assistant screen inside your product: past conversations, starter prompts, reasoning, tool calls and a streamed answer. Copilots and support assistants that act on the user's data and ask before they do anything that can't be undone.
Not for: A quick question beside other work: Prompt Composer and Conversation in a side panel are lighter than a whole screen. Answers that only look things up: a search or the Help center finds them faster than a chat.
Docs: http://localhost:3001/screens/ai-assistant.md

### Prompt playground (Dashral Pro)
One question answered side by side by two or three set-ups (a model and a temperature each), streaming at once with their latency, tokens and cost turning as they go; rate them and pick the winner. Variables in the prompt get fields of their own. On motion.
Use: Comparing set-ups for one prompt: models, temperatures, wording, on the same question, before you ship one. AI products where a team tunes prompts and needs to see quality, speed and cost side by side.
Not for: A conversation with the assistant: AI assistant or Agent workspace. Evaluating hundreds of cases at once: a Data Table of runs fits better.
Docs: http://localhost:3001/screens/prompt-playground.md

### Knowledge sources (Dashral Pro)
What your AI assistant reads before it answers: files, websites and connected apps, each indexing live with its chunks counting up, a source opened with its chunks, and a retrieval test that shows what a question would find. Drop files on it to add them. On motion.
Use: The screen where a team manages what its AI assistant knows: files, websites and connected apps, and how far each is indexed. Products with retrieval (RAG), where people add sources, fix one that failed and check what a question would find.
Not for: Plain file storage with nothing indexed: a file list or Data Table fits better. One upload in a form: File Dropzone on its own.
Docs: http://localhost:3001/screens/knowledge-sources.md

### AI usage & limits (Dashral Pro)
What your product's AI costs this month: the spend against its budget and where it's heading, every day by model, and each API key against its limit. Edit the budget and its line glides to show what it means; a key at its limit pauses, an alert rises as the spend passes its mark. Live, on motion.
Use: The page where a team sees what its AI costs this month: the spend against a budget, where it's heading, by model and by API key. AI products that bill by usage and need limits people can set: a monthly budget that alerts or pauses, and a limit per key.
Not for: One run's cost: Agent run viewer shows the tokens and cost of each step. A customer's plan, card and invoices: Billing settings.
Docs: http://localhost:3001/screens/ai-usage.md

### Agent workspace (Dashral Pro)
A chat with an AI agent beside what it's making, a document, a table or code, in versions: ask for a change and the new version writes itself line by line, see what changed, or bring an older one back. On motion.
Use: An agent that makes something people keep working on: a brief, a report, a table of numbers, a piece of code. Products where people ask for changes in words and want to compare versions or go back to one.
Not for: Questions with a quick answer and nothing to keep: AI assistant. Editing the document by hand: pair the panel with your own editor instead of this view.
Docs: http://localhost:3001/screens/agent-workspace.md

### Agent run viewer (Dashral Pro)
One run of an AI agent, step by step: every model call, tool call and approval on a timeline, with what went in and what came out, the time, tokens and cost. It waits for you where it should, with the files it would change to review, and retries from the step that failed. Live, on motion.
Use: Seeing what an AI agent did on one task: each model call, tool call and approval, what went in and came out, the time and the cost. Agent products where people need to trust a result, find why a run failed, and run it again from the step that broke.
Not for: The answer itself in a conversation: Tool Activity and Reasoning show the steps inline, under the message. Many runs side by side: a Data Table of runs, each opening this.
Docs: http://localhost:3001/screens/agent-run-viewer.md

### Approval inbox (Dashral Pro)
Everything your AI agents are waiting on you for, each with its risk: the one in focus open with exactly what it will do, approve or deny it from the keyboard (J/K, A, D) or several at once, and always allow a tool for an agent, for its details or for an hour. Decided rows fold away and the next opens, on motion.
Use: One place for everything your AI agents are waiting on a person for, across agents and tools. Products where agents act on real things (emails, refunds, records) and someone answers for what they do.
Not for: One request inside a conversation: Approval Card asks right where the assistant is working. Requests from people rather than agents (access, invites): Notifications center.
Docs: http://localhost:3001/screens/approval-inbox.md

## Headers

### Dashboard header (`@dashral/dashboard-header`)
A sidebar toggle and breadcrumb, ⌘K search, notifications and the account menu.
Use: The top bar of a dashboard: where you are, ⌘K search, notifications and the account menu. Apps with a sidebar it can toggle; pair it with Dashboard sidebar.
Not for: Marketing sites: Website header or Pill header. Apps where people switch workspaces all day: Workspace header puts the switch and the section's tabs up front.
Docs: http://localhost:3001/blocks/dashboard-header.md

### Workspace header (`@dashral/workspace-header`)
A workspace switcher, the section's tabs underneath, and help, notifications and the account menu.
Use: A header for apps with several workspaces or projects, with the section's tabs underneath. Project tools and agencies' client workspaces, where switching context is part of the day.
Not for: Apps with a single workspace: Dashboard header is simpler. Public sites: Website header.
Docs: http://localhost:3001/blocks/workspace-header.md

### Report header (`@dashral/report-header`)
A report's title with its live status, a period switcher, a date range, compare and export.
Use: The heading of a report: its title and live status, a period and date range, compare, filters, share and export. Analytics and finance pages where everything below follows the range and filters picked here.
Not for: Pages that aren't a report, like settings or one record's details: a plain page heading is enough. One chart with its own range: give the chart its own period switch, as Revenue chart does.
Docs: http://localhost:3001/blocks/report-header.md

### Website header (`@dashral/website-header`)
A marketing navbar: a product menu with descriptions, sign in and sign up, and a menu sheet on phones.
Use: A marketing site's navbar: menus with descriptions, sign in and sign up, and a sheet on phones. Product sites with several areas (product, solutions, resources) to point people to.
Not for: Inside an app: Dashboard header or Workspace header. Sites with only a few pages: Pill header is lighter.
Docs: http://localhost:3001/blocks/website-header.md

### Pill header (`@dashral/pill-header`)
The links in a pill in the middle with a sliding highlight, a GitHub star count, the theme, sign in and the main action.
Use: A compact site header: the links in a pill with a sliding highlight, a GitHub star count and the theme. Developer tools, open-source projects and docs sites with a handful of top-level pages.
Not for: Sites whose menus hold several pages each: Website header has menus with descriptions. Inside an app: Dashboard header.
Docs: http://localhost:3001/blocks/pill-header.md

### Command palette header (Dashral Pro)
A header whose search is a command palette: fuzzy matches lit up, a preview of the row you're on, scopes, recent searches, and actions with menus of their own.
Use: A header whose search is a command palette: fuzzy matches, a preview of the row you're on, scopes and recent items. Apps with many records (customers, invoices, docs) where people jump by name more than they browse.
Not for: Apps with a few pages people browse: Dashboard header's ⌘K search is enough. Public sites: Website header.
Docs: http://localhost:3001/blocks/command-header.md

## Sidebars

### Dashboard sidebar (`@dashral/dashboard-sidebar`)
Grouped pages with counts, a section that opens, a plan card and the account menu; collapses to a rail of icons.
Use: An app's main navigation: grouped pages with counts, sections that open, a plan card and the account menu. Dashboards and admin panels with up to a few dozen pages; it folds to a rail of icons.
Not for: Apps organised by workspace and project: Workspace sidebar. Apps with only a handful of pages: tabs in the header leave the width to the content.
Docs: http://localhost:3001/blocks/dashboard-sidebar.md

### Workspace sidebar (`@dashral/workspace-sidebar`)
A workspace switcher, search, inbox, and Favorites and Projects that fold away; each project opens to its views.
Use: A project tool's sidebar: a workspace switcher, search, inbox, favorites, and projects that open to their views. Issue trackers, docs and planning tools organised by workspace and project.
Not for: Single-team dashboards without projects: Dashboard sidebar. Settings pages: Settings sidebar.
Docs: http://localhost:3001/blocks/workspace-sidebar.md

### Settings sidebar (`@dashral/settings-sidebar`)
Grouped settings with a sliding highlight and the picked section beside them; a select on phones.
Use: A settings page: grouped sections with a sliding highlight, and the section you pick beside them. Account and workspace settings with several sections; a select takes over on phones.
Not for: An app's main navigation: Dashboard sidebar. Settings with two or three sections: tabs are enough.
Docs: http://localhost:3001/blocks/settings-sidebar.md

### App shell (Dashral Pro)
A whole app layout: drag the sidebar's edge to resize it or snap it to a rail, ⌘K to jump anywhere, favorites you drag to reorder, recent pages and a sliding highlight.
Use: A whole app layout: a resizable sidebar that snaps to a rail, ⌘K to jump anywhere, favorites and recent pages. Data-heavy apps people keep open all day, where layout and quick navigation matter.
Not for: Simple dashboards: Dashboard sidebar with Dashboard header is less to wire. Marketing pages and public sites.
Docs: http://localhost:3001/blocks/app-shell.md

## Dashboard

### Stats cards (`@dashral/stats-cards`)
Four numbers with their change and trend that count up, and a period switch that moves all of them.
Use: Four headline numbers with their change and trend, and a period switch that moves all of them. The top row of a dashboard's overview.
Not for: One number that matters more than the rest: give it the room on its own, in a Metric Card. More than four to six numbers: Analytics panels groups them instead of a long row.
Docs: http://localhost:3001/blocks/stats-cards.md

### Revenue chart (`@dashral/revenue-chart`)
Bars for this period and a dashed line for the last, a tooltip on hover or the arrow keys, in plain SVG.
Use: Revenue over time: bars for this period, a dashed line for the last, and a tooltip on hover or the arrow keys. Finance and sales dashboards comparing a period with the one before.
Not for: Many metrics to switch between: Analytics overview picks the one the chart shows. Totals without a time axis: a Bar List or a Donut Chart.
Docs: http://localhost:3001/blocks/revenue-chart.md

### Orders table (`@dashral/orders-table`)
Search, payment and fulfillment filters, export and pages; ship selected orders and the rows update in place.
Use: A store's orders: search, payment and fulfillment filters, sorting, export, pages and bulk actions. Shops and marketplaces; any table of records that move through statuses.
Not for: Records without statuses or bulk actions: a Data Table on its own is enough. Work people move between stages by hand: Kanban board.
Docs: http://localhost:3001/blocks/orders-table.md

### Getting started (`@dashral/onboarding-checklist`)
Steps to a working setup with progress and time left; the next step unfolds, and finishing celebrates.
Use: Steps to a working setup, with progress and time left; the next step unfolds and finishing celebrates. A new account's first days in a product, on its home page.
Not for: Setup that has to be done before the product works at all: Onboarding walks through it first. Accounts past their first days: hide it once every step is done.
Docs: http://localhost:3001/blocks/onboarding-checklist.md

## Work (screens)

### Kanban board (Dashral Pro)
Drag cards between columns with a line where they land, work-in-progress limits, a filter by person and quick add.
Use: Cards in columns you drag between, with work-in-progress limits, a filter by person and quick add. Task boards, sales pipelines, hiring and content calendars.
Not for: Long lists people sort and filter more than they move: Orders table or a Data Table. Work with more than six or so stages: the columns stop fitting; a table with a status filter.
Docs: http://localhost:3001/screens/kanban-board.md

### Inbox (Dashral Pro)
Conversations beside the open one: search, unread and archived, pin or mute; write with an emoji or a file and see when it's read.
Use: Conversations beside the open one: search, unread and archived, pin, mute, reactions and files. Support inboxes, marketplaces' buyer–seller messages and in-app chat.
Not for: Notifications that ask for an action rather than a reply: Notifications. Support conversations with assignment, SLAs and macros: a help desk tool does more than a chat.
Docs: http://localhost:3001/screens/inbox.md

### Notifications (Dashral Pro)
Notifications by day, filtered by unread or type, each with its action right there: approve, accept, retry or reply; undo a dismissal and pick what's emailed.
Use: Notifications by day, filtered by unread or type, each with its action right there. Apps where notifications ask for something: approve, accept, retry.
Not for: Messages people reply to: Inbox. A brief confirmation of what just happened: a Toast.
Docs: http://localhost:3001/screens/notifications-center.md

### Data grid (Dashral Pro)
Orders as a grid: saved views with their counts, filters as chips, columns to sort by and to show or hide, rows grouped by status with their subtotals, cells edited in place, density, and an action bar that rises for the rows picked. On motion.
Use: The main list of an admin or back office: orders, customers or tickets people sort, filter and change all day. Lists where people act on many rows at once: change their status, export them or delete them.
Not for: A short list on a dashboard: a plain table or the free Orders table is lighter. Thousands of rows at once: page or virtualise them on your server and pass in what's shown.
Docs: http://localhost:3001/screens/data-grid.md

### Team members (Dashral Pro)
The team and the invitations still out: invite several people with a role, change roles in place, suspend or remove someone, and resend or revoke an invite.
Use: The team and its invitations: invite several people with a role, change roles, suspend or remove. Any product with seats: workspace settings, admin consoles.
Not for: Single-user products. Managing customers rather than teammates: Orders table or a Data Table.
Docs: http://localhost:3001/screens/team-members.md

## Analytics (screens)

### Analytics overview (Dashral Pro)
A whole analytics page: who's online, numbers that pick what the chart shows, the period before, and pages, sources and countries.
Use: A whole analytics page: who's online, numbers that pick what the chart shows, the period before, and top lists. Product and marketing analytics with a few headline metrics and a 7, 30 or 90 day range.
Not for: Ops and infrastructure metrics across many small panels: Analytics panels. One or two numbers on a home page: Stats cards.
Docs: http://localhost:3001/screens/analytics-overview.md

### Analytics panels (Dashral Pro)
An analytics overview on inset cards: traffic you switch by metric with a line that follows the pointer, cache, countries, status codes, threats and top paths, all moving with the range.
Use: An analytics overview on inset cards: traffic by metric, cache, countries, statuses, threats and top paths. Infrastructure and edge dashboards; ops views with many small panels.
Not for: Product or marketing analytics led by one chart: Analytics overview. Pages for readers who aren't technical: many small panels read as noise.
Docs: http://localhost:3001/screens/analytics-panels.md

## Billing (screens)

### Billing overview (Dashral Pro)
A workspace's billing at a glance: the plan and its price monthly or yearly, the card on file as a card you can tilt, usage near its limits, and invoices as lines of what they were for. A failed payment raises a banner with Pay now. On motion.
Use: A workspace's billing page at a glance: the plan and its price, the card on file, usage near its limits and the invoices, with a way to pay one that failed. Subscription products with a few plans and add-ons, where people mostly check what they pay, upgrade and settle a failed payment.
Not for: Usage-based pricing that needs the spend, where it's heading and alerts: Billing settings. One invoice in full, to send or record a payment: Invoice detail.
Docs: http://localhost:3001/screens/billing-overview.md

### Billing settings (Dashral Pro)
The plan with dialogs to change or cancel it, what this period costs so far and where it's heading against the budget and alerts, usage with what going past each limit costs, spend alerts by email or Slack, the card on file and invoices. On motion.
Use: The billing page of a subscription product: the plan with dialogs to change or cancel it, what this period costs so far and where it's heading, usage against the plan's limits, spend alerts, the card on file and invoices. Usage-based pricing, where people need to see a bill coming before it arrives and decide whether to upgrade.
Not for: One-time purchases without a subscription: an order history fits better. Picking a plan for the first time: Pricing tiers. What an AI feature costs by model and API key: AI usage & limits.
Docs: http://localhost:3001/screens/billing-settings.md

### Invoice (Dashral Pro)
The invoice beside its history: send it, record a payment in full or in part, mark it paid or void it, and print it.
Use: An invoice beside its history: send it, record a payment in full or in part, void it, print it. Invoicing, accounting and agency tools that bill clients.
Not for: Subscriptions billed automatically: Billing settings lists their invoices. Receipts for one-time purchases: an order's detail is enough.
Docs: http://localhost:3001/screens/invoice-detail.md

## Settings (screens)

### Profile settings (`@dashral/profile-settings`)
A profile form with a photo cropped as it's picked, beside a card that shows how the profile looks to others as you type.
Use: The profile page of an account: a photo cropped as it's picked, name, username, bio, website and place, beside a card that shows how it looks to others. Any product where people have a public page or show up to their team: a community, a marketplace, a SaaS workspace.
Not for: The workspace's own logo and colour, not a person's: Workspace branding. Only a photo to change, inside a form you already have: Avatar Upload on its own.
Docs: http://localhost:3001/screens/profile-settings.md

### Developer settings (Dashral Pro)
API keys for live and test, a new key's secret shown once as its characters settle, revoking behind a hold, and webhooks: each endpoint with its recent deliveries, events and signing secret, a test event that lands in the log, deliveries opened with their payload and retried in place. On motion.
Use: The developer page of a product with an API: keys for live and test, and webhooks with their deliveries. Products where customers build on you and need to make keys, test their endpoints and see why a delivery failed.
Not for: Personal access tokens in a profile: a short list in Profile settings is enough. Watching API traffic over time: a dashboard with charts fits better.
Docs: http://localhost:3001/screens/developer-settings.md

### Workspace branding (Dashral Pro)
The workspace's name, logo, cover and colour, previewed live in the sidebar, the sign-in page, emails and invoices.
Use: A workspace's brand in one place: its name, a square logo and a wide cover (each cropped as it's picked) and its colour, previewed in the sidebar, the sign-in page, emails and invoices as you edit. White-label and multi-tenant products, where each customer's team sees its own brand.
Not for: A person's profile: Profile settings. The whole theme (fonts, radius, every colour): the theme customizer is made for that.
Docs: http://localhost:3001/screens/workspace-branding.md

## Heroes

### Centered hero (`@dashral/hero-centered`)
An announcement, a big promise and two actions, centered on a glow with a faint grid, and the customers below.
Use: The top of a landing page: an announcement, the promise, two actions and the customers below. Launches and home pages where one clear message matters more than showing the product.
Not for: When the product sells itself on sight: Split hero or Product hero show it. Sign-ups that are just an email: Sign-up hero.
Docs: http://localhost:3001/blocks/hero-centered.md

### Split hero (`@dashral/hero-split`)
The promise and three reasons beside the product itself: a live dashboard in a browser frame.
Use: The promise and three reasons beside the product itself, a live dashboard in a browser frame. SaaS home pages where seeing the product sells it.
Not for: Products without a screen worth showing yet: Centered hero. Pitches made in results: Stats hero.
Docs: http://localhost:3001/blocks/hero-split.md

### Sign-up hero (`@dashral/hero-signup`)
An email field that checks, works and confirms, the people already in, and a customer's words.
Use: A hero that signs people up right there: an email field that checks, works and confirms. Waitlists, betas and newsletters, where the email is the whole conversion.
Not for: Products people want to see before they sign up: Split hero. Sign-ups that need more than an email, like a password or a plan: send them to Sign up, split.
Docs: http://localhost:3001/blocks/hero-signup.md

### Stats hero (`@dashral/hero-stats`)
The promise and actions, then three numbers that count up, each with its trend.
Use: The promise and actions, then three numbers that count up with their trend. Products whose results are the pitch: uptime, time saved, revenue recovered.
Not for: New products without numbers to stand behind yet: Centered hero. Numbers you can't back up further down the page: they cost more trust than they win.
Docs: http://localhost:3001/blocks/hero-stats.md

### Product hero (Dashral Pro)
A headline whose ending changes, above an app window that tours itself: numbers count up, live events stream in, a summary writes itself. Pauses under the pointer.
Use: A headline whose ending changes above an app window that tours itself: numbers, events and views. Flagship launches and home pages that want the product to demo itself.
Not for: Products without real screens yet: the tour would show made-up ones; Centered hero. Pages people come to read and act on quickly, like docs or pricing: a still hero keeps the eye on the words.
Docs: http://localhost:3001/blocks/hero-product.md

## Features

### Features grid (`@dashral/features-grid`)
Six features with an icon, a title and one sentence each, in three columns, then two, then one.
Use: Six features with an icon, a title and one sentence each. A product's what-it-does section, scanned in seconds.
Not for: Features that need to be seen to be understood: Features bento or Feature tour. More than nine features: group them, or link to a page of their own.
Docs: http://localhost:3001/blocks/features-grid.md

### Features bento (`@dashral/features-bento`)
Tiles of two sizes, each showing the feature in miniature: a live chart, the team, sources and an alert switch.
Use: Tiles of two sizes, each showing its feature in miniature. Product pages that want to show, not list.
Not for: Features without anything to show: Features grid. Features that take steps to explain: Feature tour.
Docs: http://localhost:3001/blocks/features-bento.md

### Feature tour (Dashral Pro)
Features that play: the open one fills a line, then the next; beside it a product screen shows it working — sources connecting, a dashboard arranging itself, alerts arriving, a team joining.
Use: Features that play in turn, with a product screen beside them showing each one working. Home and product pages walking through three to five core features.
Not for: More than five features: they play in turn, so the rest wait; Features grid. Features best compared side by side: Features bento.
Docs: http://localhost:3001/blocks/feature-tour.md

## Flows

### Data pipeline (Dashral Pro)
Records flowing live from three sources through one transform to every destination: raw dots go in, come out as solid squares and go to one, some or all outputs at their own pace, cards lighting up with live counts, the ring quickens as it works, and the count climbs; slows under the pointer, pauses, and stacks on phones.
Use: Records flowing live from sources through a transform to every destination, card by card. Data and integration products; a status card showing your own pipeline's events.
Not for: Products that don't move data between systems: the diagram would promise something they don't do. Operators who need each run's exact state: a table of runs; the cards only summarise.
Docs: http://localhost:3001/blocks/data-pipeline.md

### Agent pipeline (Dashral Pro)
An AI agent at work, live: a question is typed and sent, the agent calls its tools one at a time (each spins, then shows what it found), and the answer streams in token by token; slows under the pointer, pauses, and stacks on phones.
Use: An AI agent at work, live: a question, tool calls one at a time, and the answer. AI products showing what their agent does, or a live view of your agent's runs.
Not for: Assistants that answer without tools: AI assistant or Message show it more plainly. An audit of every step an agent took: Tool Activity lists them in full.
Docs: http://localhost:3001/blocks/agent-pipeline.md

### Integrations hub (Dashral Pro)
Your app in the middle of eight tools on an orbit, data moving both ways: syncs come in as dots, pushes go out as squares, and the count climbs; one tool connects as you watch, its link drawing in. Tooltips, a lit link on hover, pause, and icons only on phones.
Use: Your app in the middle of the tools it connects to, data moving both ways. Integration pages, and a live view of syncs in an integrations settings page.
Not for: Products with one or two integrations: a short list with their logos is clearer. Managing integrations (connecting, keys, scopes): a settings list does that work; the hub only shows it.
Docs: http://localhost:3001/blocks/integrations-hub.md

### Request flow (Dashral Pro)
Requests passing browser, edge, auth, API and database, each stage lighting as one pauses there; auth turns some away in red, the rest come back as responses, and a log lists the latest with method, status and time. Pauses, and stacks on phones.
Use: Requests passing browser, edge, auth, API and database, the bad ones turned away at auth. API, security and edge products; a live view of real traffic.
Not for: Products without an API or an edge to talk about. Investigating a single request: a log with its timings says more.
Docs: http://localhost:3001/blocks/request-flow.md

### Payment flow (Dashral Pro)
Payments from checkout through the processor, a declined card going round a smart retry before it goes through, and each paid one landing on the invoice, receipt and ledger at its own pace; live counts on every card and the day's total climbing. Pauses, and stacks on phones.
Use: Payments from checkout through the processor, a declined card going round a retry, money landing. Payments and billing products; a live view of your own payments.
Not for: Shops that simply take payments: Orders table shows what matters to them. Reconciling money: an invoice or a ledger table.
Docs: http://localhost:3001/blocks/payment-flow.md

### Deploy pipeline (Dashral Pro)
Commits running down build, test, preview and production: each stage fills its bar and says how far it is, the build turns a commit into an artifact, failing tests stop about one deploy in six in red, production shows the version going up, and a strip of green and red bars keeps the history. Pauses, and stacks on phones.
Use: Commits running through build, test, preview and production, failures stopping where they broke. CI/CD and hosting products; a live deploy status from your own pipeline.
Not for: Products without builds or releases. Finding why a build failed: its log, not the diagram.
Docs: http://localhost:3001/blocks/deploy-pipeline.md

### Global network (Dashral Pro)
A dotted world map with edge regions and an origin: requests arc from everywhere on land to the nearest region, most answered from its cache, the rest fetched from the origin first; each region shows its latency live, and the requests a second, cache hits and median latency tick under the map. Pauses, and fits any width.
Use: A world map with traffic arcing between regions and attacks stopped at the edge. CDN, security and global infrastructure products; a live view of your own regions.
Not for: Products served from one region: the map would overstate them. Exact traffic by region: a table or a Bar List.
Docs: http://localhost:3001/blocks/global-network.md

### Network globe (Dashral Pro)
A dotted globe turning slowly, arcs rising between nine cities above its surface, each city pulsing as one lands and its label riding along with a live latency; drag it to look around, and it swings on, then carries on turning. Beside it the network's numbers. Pauses, and stacks on phones.
Use: A slowly turning globe with arcs rising between cities as traffic lands. Global products' hero or about sections; a live view of where your users are.
Not for: Where exactly traffic comes from, and how much: Global network's flat map or a list reads better. Pages where motion would pull the eye from what people came to read.
Docs: http://localhost:3001/blocks/network-globe.md

### Notification fan-out (Dashral Pro)
One event fanning out to email, push, SMS, team chat and webhooks by each person's preferences, every channel at its own pace; a text that fails is retried in amber before it lands, channels count what they deliver, and the latest notifications stack up as they arrive. Pauses, and stacks on phones.
Use: One event fanning out to email, push, SMS, chat and webhooks by each person's preferences. Messaging and notification products; a live view of your own deliveries.
Not for: Products that send one kind of message. People choosing their own notification settings: a settings form, not the diagram.
Docs: http://localhost:3001/blocks/notification-fanout.md

### Approval workflow (Dashral Pro)
A purchase request going round its approvers one at a time: a chip carries it from person to person, a ring fills round each avatar as they review and turns green as they approve; Finance sometimes sends it back in amber to be updated, Legal is only asked above $10k, and the purchase order goes out at the end. Pauses, and stacks on phones.
Use: A request going round its approvers one at a time, approved or sent back, with its order number. Procurement, expense and approval products; a live view of requests in review.
Not for: Requests one person approves: a button and a status are enough. Working through the queue itself: a table of requests with their stage.
Docs: http://localhost:3001/blocks/approval-workflow.md

## Pricing

### Pricing tiers (`@dashral/pricing-tiers`)
Three plans with a monthly/yearly switch and the saving, the popular plan raised, and what each includes.
Use: Three plans with a monthly/yearly switch and the saving, the popular one raised. The pricing page of a subscription product.
Not for: Prices that depend on seats or usage: Pricing calculator. A single plan: say the price in the hero or a CTA.
Docs: http://localhost:3001/blocks/pricing-tiers.md

### Pricing comparison (`@dashral/pricing-comparison`)
Plans compared feature by feature in groups, with hints, the popular column tinted, and actions in the header.
Use: Plans compared feature by feature in groups, with hints and the popular column tinted. Under the tiers on a pricing page, for people who read every line.
Not for: Plans that differ in two or three ways: the tiers' own lists already say it. The top of a pricing page: lead with Pricing tiers, and put this under them.
Docs: http://localhost:3001/blocks/pricing-comparison.md

### Pricing calculator (Dashral Pro)
Slide to the team size and pick a plan, add-ons, billing and currency: the quote adds up line by line, with volume discounts, and the total counts to its new value.
Use: A quote that adds up line by line: seats, plan, add-ons, billing and currency. Per-seat and usage-based pricing, where the price depends on the buyer.
Not for: Flat prices: Pricing tiers. Enterprise deals priced in a conversation: a Talk to sales action.
Docs: http://localhost:3001/blocks/pricing-calculator.md

## Testimonials

### Testimonials grid (`@dashral/testimonials-grid`)
A masonry wall of quotes with stars and who said them, in three columns, then two, then one.
Use: A masonry wall of quotes with stars and who said them. Social proof on landing and pricing pages, with many short quotes.
Not for: A few long stories: Featured testimonial. Only two or three quotes: the wall would look empty; Featured testimonial.
Docs: http://localhost:3001/blocks/testimonials-grid.md

### Featured testimonial (`@dashral/testimonial-featured`)
One large story at a time with the number it changed, arrows and dots, and the customers' logos below.
Use: One large story at a time with the number it changed, and the customers' logos below. Case-study-led pages with a few strong customer stories.
Not for: Many short quotes: Testimonials grid or Marquee wall. Stories without a result they changed: the number is what carries it.
Docs: http://localhost:3001/blocks/testimonial-featured.md

### Marquee wall (Dashral Pro)
Two rows of stories scrolling in opposite directions — quotes, results in numbers and posts on inset cards — that stop under the pointer; each opens its case study.
Use: Two rows of stories scrolling in opposite directions: quotes, results and posts. Home pages with a lot of praise to show at once.
Not for: A handful of quotes: they'd repeat as it scrolls; Testimonials grid. Quotes people should read one by one: they move; Testimonials grid holds still.
Docs: http://localhost:3001/blocks/marquee-wall.md

## FAQ

### FAQ split (`@dashral/faq-split`)
The heading and a contact card beside an accordion of answers; stacks on phones.
Use: The heading and a contact card beside an accordion of answers. Pricing and product pages answering the questions people ask before they start.
Not for: Long help content in categories: Help center. Short answers worth reading all at once: FAQ grid.
Docs: http://localhost:3001/blocks/faq-split.md

### FAQ grid (`@dashral/faq-grid`)
Short answers in two columns to scan without clicking, and a line to the help center.
Use: Short answers in two columns to scan without clicking. Pages where the answers are short and all worth reading.
Not for: Answers longer than a few lines: FAQ split's accordion. More than ten questions: Help center.
Docs: http://localhost:3001/blocks/faq-grid.md

### Help center (Dashral Pro)
A search across every question and answer with your words lit up, categories with counts, answers that ask whether they helped, and support right there when nothing matches.
Use: A searchable help center: categories with counts, answers that ask whether they helped, and support. Self-serve support inside a product or on its site.
Not for: Five or ten questions: FAQ split. Support that's mostly conversation: point to chat, or Inbox.
Docs: http://localhost:3001/blocks/help-center.md

## Call to action

### CTA banner (`@dashral/cta-banner`)
The simplest ask: one banner with a gradient hairline around a soft tint, the promise on one side and two actions on the other.
Use: The simplest ask: one banner with the promise on one side and two actions on the other. The end of a page or between sections, where one more nudge helps.
Not for: The last section of a landing page, where one ask should stand out: CTA centered. Asks that begin with an email: CTA with sign-up.
Docs: http://localhost:3001/blocks/cta-banner.md

### CTA centered (`@dashral/cta-centered`)
The promise and two actions on a soft glow, with what's included and the people already using it.
Use: The promise and two actions on a soft glow, with what's included and the people already using it. The last section of a landing page.
Not for: Between sections, where a whole section would interrupt the page: CTA banner. Sign-ups that start with an email: CTA with sign-up.
Docs: http://localhost:3001/blocks/cta-centered.md

### CTA with sign-up (`@dashral/cta-signup`)
Start the sign-up right there: an email field that checks the address and turns into “check your inbox”, beside the product.
Use: Starts the sign-up right there: an email field that turns into “check your inbox”, beside what you get. Free plans and trials that begin with an email.
Not for: Sales-led products where people talk to you first: CTA banner with Talk to sales. Sign-ups that need a password or a plan up front: link to Sign up, split.
Docs: http://localhost:3001/blocks/cta-signup.md

### CTA with ROI calculator (Dashral Pro)
Team size, report hours, an hour's cost and the tools you'd retire in; the yearly saving, the return and the payback out, adding up line by line.
Use: A calculator that works out the yearly saving and return from the visitor's own team and costs. B2B pricing and sales pages, where the case is made in money.
Not for: Self-serve products with a low price: the maths gets in the way of signing up; CTA banner. Savings you can't stand behind: it estimates from the visitor's own numbers, so its assumptions must be honest.
Docs: http://localhost:3001/blocks/cta-roi.md

## Footers

### Simple footer (`@dashral/simple-footer`)
The logo, the main links and social accounts, then the copyright, legal links and a live system status.
Use: One row: the logo, main links and social accounts, then the copyright, legal links and a live status. Apps, small sites and docs that don't need a sitemap in the footer.
Not for: Marketing sites with many pages: Columns footer. Landing pages that end on an ask: CTA footer.
Docs: http://localhost:3001/blocks/simple-footer.md

### Columns footer (`@dashral/columns-footer`)
Four columns of links, a newsletter sign-up that checks and confirms, and a language select and theme switch.
Use: A full footer: the brand and social accounts, columns of links, a newsletter, the language and the theme. Marketing sites with many pages to link from every page.
Not for: Apps and docs: Simple footer. Large sites with many products and news: Mega footer.
Docs: http://localhost:3001/blocks/columns-footer.md

### CTA footer (`@dashral/cta-footer`)
A last call to action on a soft glow with the reassurance under it, then the links and the copyright.
Use: A last call to action on a soft glow, then the links and the copyright. Landing pages that end on one more ask.
Not for: Pages that already end on a call-to-action section: two asks in a row read as pushy. Inside an app: Simple footer.
Docs: http://localhost:3001/blocks/cta-footer.md

### Mega footer (Dashral Pro)
A newsletter that confirms, what's new on an inset card, five columns that fold on phones, a live status with uptime, the language, a theme switch and a fading wordmark.
Use: A footer that's a page of its own: newsletter, what's new, five columns, a live status and the language. Larger product sites with many products, resources and a news cadence.
Not for: Small sites: its columns would be half empty; Columns footer. Apps: Simple footer.
Docs: http://localhost:3001/blocks/mega-footer.md

## Sign in & up

### Sign in (`@dashral/sign-in`)
Google and GitHub, or email and password with Forgot password, remember me, loading and a wrong-password error.
Use: Sign in with a provider or email and password, with forgot password, loading and errors. Any app's login page.
Not for: Making an account: Sign up, split. Apps that only sign in through a company's single sign-on: one button says it; the email form would mislead.
Docs: http://localhost:3001/blocks/sign-in.md

### Sign up, split (`@dashral/sign-up-split`)
The form with a password strength meter and terms beside a soft blue panel: what you get, the product in miniature, a customer's words.
Use: The sign-up form with a password meter and terms, beside a panel of what you get. Registration pages that sell while people type.
Not for: Sign-ups that are just an email: Sign-up hero or CTA with sign-up. Invitations to an existing team: the invite already knows the email; a shorter form.
Docs: http://localhost:3001/blocks/sign-up-split.md

### Onboarding (Dashral Pro)
Five steps beside a progress rail: an account with live password rules, a 6-digit code, a workspace whose address is checked as you type, invites, and a dashboard to start from.
Use: A five-step onboarding: an account, a code by email, a workspace and its address, a template, then in. New products' first-run flow, from sign-up to a working workspace.
Not for: Products people can use before setting anything up: let them in, and use Getting started on the home page. People joining a workspace someone invited them to: most of its steps don't apply; Sign up, split is enough.
Docs: http://localhost:3001/blocks/onboarding.md

## Error pages

### 404 page (`@dashral/not-found`)
Page not found, with a search across the pages people likely wanted, a way back and home, popular pages and a report link.
Use: A 404 that helps: a search across the pages people likely wanted, a way back, popular pages and a report link. Any site or app's not-found page.
Not for: Pages that exist but the person can't open: say they need access, not that the page is missing. Errors on your side: a 500 page says it's yours to fix, not theirs.
Docs: http://localhost:3001/blocks/not-found.md

### Status & maintenance (Dashral Pro)
The overall state, an incident with its updates, 90 days of uptime per service you can hover, maintenance counting down, subscribing by email, team chat or webhook, and a maintenance page with a countdown.
Use: A public status page: the overall state, incidents with updates, 90 days of uptime and maintenance. SaaS and APIs that tell customers what's working.
Not for: Your team's own monitoring: a dashboard such as Analytics panels shows more detail. Products without uptime to report: an empty status page reads as a promise.
Docs: http://localhost:3001/blocks/status-page.md
