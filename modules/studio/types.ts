export type SessionStatus = "streaming" | "complete" | "error" | "idle"

export type StreamEventKind =
  | "user"
  | "text"
  | "skill-use"
  | "skill-read"
  | "tool"
  | "file-list"

export type StreamEvent = {
  id: string
  kind: StreamEventKind
  content: string
  meta?: string
  status?: "pending" | "running" | "success" | "error"
  delayMs: number
}

export type ChatSession = {
  id: string
  title: string
  prompt: string
  productId: string
  createdAt: string
  status: SessionStatus
  messageCount: number
  tokenCount: number
  startedAt?: string
  endedAt?: string
  events: StreamEvent[]
  revealedCount: number
}

export type Integration = {
  id: string
  name: string
  description: string
  accent: string
  initial: string
}

export type ProductStatus = "draft" | "building" | "published"

export type Product = {
  id: string
  name: string
  description: string
  status: ProductStatus
  updatedAt: string
  packageName: string
}

export type IdentitySheetKind = "brand" | "problem" | "audience"

export type IdentitySheet = {
  kind: IdentitySheetKind
  title: string
  description: string
}

export type FeatureStatus = "PROPOSED" | "APPROVED" | "IN_PROGRESS" | "DONE"

export type FeatureScope = "MICRO_MVP" | "MVP" | "V1" | "V2"

export type ProductFeature = {
  id: string
  title: string
  status: FeatureStatus
  scope: FeatureScope
  wbs: string | null
}

export type ProductIdeation = {
  sheets: IdentitySheet[]
  features: ProductFeature[]
}

export type ProjectFileKind = "file" | "folder"

export type ProjectFileNode = {
  id: string
  name: string
  path: string
  kind: ProjectFileKind
  children?: ProjectFileNode[]
  language?: string
  content?: string
}

export type FileIconType =
  | "folder"
  | "folder-open"
  | "tsx"
  | "ts"
  | "js"
  | "jsx"
  | "css"
  | "json"
  | "svg"
  | "md"
  | "html"
  | "txt"
  | "config"
  | "default"
