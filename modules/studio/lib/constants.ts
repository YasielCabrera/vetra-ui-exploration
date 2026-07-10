import type { Integration } from "@/modules/studio/types"

export const STUDIO_STORAGE_KEY = "vetra-studio-sessions-v3"
export const PRODUCTS_STORAGE_KEY = "vetra-studio-products-v2"
export const SESSION_PANEL_LAYOUT_KEY = "vetra-studio-session-panel-layout-v1"
export const CODE_EDITOR_PANEL_LAYOUT_KEY = "vetra-studio-code-editor-layout-v1"
export const AUTO_FOLLOW_AGENT_KEY = "vetra-studio-auto-follow-agent-v1"
export const DEFAULT_AUTO_FOLLOW_AGENT = true

/** Sentinel value for the product select — creates a new product on submit. */
export const NEW_PRODUCT_VALUE = "new"

export const DEFAULT_CODE_EDITOR_PANEL_LAYOUT = {
  explorer: 26,
  editor: 74,
} as const

/** Chat / preview split — chat stays narrower so the preview leads. */
export const DEFAULT_SESSION_PANEL_LAYOUT = {
  chat: 32,
  preview: 68,
} as const

export const NAV_ITEMS = [
  {
    title: "Ideate",
    href: "/ideate",
    icon: "lightbulb",
  },
  {
    title: "Products",
    href: "/products",
    icon: "folder",
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: "plug",
  },
  {
    title: "Vetra Cloud",
    href: "/cloud",
    icon: "cloud",
  },
] as const

export const INTEGRATIONS = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Sell products or subscriptions and get paid online.",
    accent: "#635BFF",
    initial: "S",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Automate and sync CRM records.",
    accent: "#00A1E0",
    initial: "Sf",
  },
  {
    id: "slack-user",
    name: "Slack User",
    description: "Send messages and manage Slack as a user.",
    accent: "#4A154B",
    initial: "Sl",
  },
  {
    id: "slack-bot",
    name: "Slack Bot",
    description: "Post as a branded bot in your Slack workspace.",
    accent: "#611F69",
    initial: "Sb",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Organize and sync knowledge or project data.",
    accent: "#FFFFFF",
    initial: "N",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Manage your schedule and calendar events.",
    accent: "#4285F4",
    initial: "Gc",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Export and back up app-generated files.",
    accent: "#0F9D58",
    initial: "Gd",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Automate email sending and inbox management.",
    accent: "#EA4335",
    initial: "Gm",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Sync and manage spreadsheet data.",
    accent: "#0F9D58",
    initial: "Gs",
  },
  {
    id: "google-slides",
    name: "Google Slides",
    description: "Generate and manage presentations.",
    accent: "#F4B400",
    initial: "Gp",
  },
  {
    id: "google-forms",
    name: "Google Forms",
    description: "Create forms and collect responses from your app.",
    accent: "#673AB7",
    initial: "Gf",
  },
  {
    id: "google-docs",
    name: "Google Docs",
    description: "Manage and automate document creation.",
    accent: "#4285F4",
    initial: "Do",
  },
] as const satisfies readonly Integration[]

export const FEATURE_COLUMNS = [
  {
    title: "Ideate",
    icon: "lightbulb",
    description:
      "Describe the product you need in plain language. Vetra understands your intent and sets up the workflow — document models, editors, and drive apps.",
  },
  {
    title: "Build",
    icon: "blocks",
    description:
      "Specification-driven AI generates TypeScript packages on an open data layer with GraphQL APIs, real-time sync, and Git-like version history.",
  },
  {
    title: "Own",
    icon: "shield",
    description:
      "100% open source and portable. Deploy to Vetra Cloud, your own servers, or hybrid — no lock-in, ever. Your data stays yours.",
  },
] as const

export const STREAM_TICK_MS = 40
