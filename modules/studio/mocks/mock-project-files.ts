import type { ProjectFileNode } from "@/modules/studio/types"

export const MOCK_PROJECT_ROOT: ProjectFileNode = {
  id: "root",
  name: "qr-code-manager",
  path: "",
  kind: "folder",
  children: [
    {
      id: "public",
      name: "public",
      path: "public",
      kind: "folder",
      children: [
        {
          id: "public-robots",
          name: "robots.txt",
          path: "public/robots.txt",
          kind: "file",
          language: "plaintext",
          content: `User-agent: *
Allow: /
`,
        },
        {
          id: "public-placeholder",
          name: "placeholder.svg",
          path: "public/placeholder.svg",
          kind: "file",
          language: "xml",
          content: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" rx="16" fill="#1a1a1a"/>
  <path d="M28 28h28v28H28V28zm36 0h28v28H64V28zM28 64h28v28H28V64z" fill="#22c55e"/>
  <rect x="68" y="68" width="8" height="8" fill="#22c55e"/>
  <rect x="84" y="68" width="8" height="8" fill="#22c55e"/>
  <rect x="68" y="84" width="8" height="8" fill="#22c55e"/>
  <rect x="84" y="84" width="8" height="8" fill="#22c55e"/>
</svg>
`,
        },
      ],
    },
    {
      id: "src",
      name: "src",
      path: "src",
      kind: "folder",
      children: [
        {
          id: "src-components",
          name: "components",
          path: "src/components",
          kind: "folder",
          children: [
            {
              id: "src-components-qr-preview",
              name: "QrPreview.tsx",
              path: "src/components/QrPreview.tsx",
              kind: "file",
              language: "typescript",
              content: `import * as React from "react"

type QrPreviewProps = {
  value: string
  size?: number
}

export function QrPreview({ value, size = 180 }: QrPreviewProps) {
  return (
    <div
      className="flex items-center justify-center rounded-xl border border-border bg-background p-4"
      style={{ width: size, height: size }}
    >
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    </div>
  )
}
`,
            },
            {
              id: "src-components-ui-toaster",
              name: "toaster.tsx",
              path: "src/components/ui/toaster.tsx",
              kind: "file",
              language: "typescript",
              content: `export function Toaster() {
  return null
}
`,
            },
          ],
        },
        {
          id: "src-document-models",
          name: "document-models",
          path: "src/document-models",
          kind: "folder",
          children: [
            {
              id: "src-dm-qr",
              name: "qr-code",
              path: "src/document-models/qr-code",
              kind: "folder",
              children: [
                {
                  id: "src-dm-qr-v1",
                  name: "v1",
                  path: "src/document-models/qr-code/v1",
                  kind: "folder",
                  children: [
                    {
                      id: "src-dm-qr-v1-index",
                      name: "index.ts",
                      path: "src/document-models/qr-code/v1/index.ts",
                      kind: "file",
                      language: "typescript",
                      content: `// QR Code Manager
// Generated package scaffold

export const documentModel = {
  id: "qr-code/v1",
  name: "QR Code",
  operations: ["CREATE", "UPDATE", "DOWNLOAD"],
}

export type QrCodeState = {
  label: string
  payload: string
  createdAt: string
}
`,
                    },
                    {
                      id: "src-dm-qr-v1-reducers",
                      name: "reducers.ts",
                      path: "src/document-models/qr-code/v1/reducers.ts",
                      kind: "file",
                      language: "typescript",
                      content: `import type { QrCodeState } from "./index"

export function createQrCode(
  state: QrCodeState,
  payload: { label: string; payload: string },
): QrCodeState {
  return {
    ...state,
    label: payload.label,
    payload: payload.payload,
    createdAt: new Date().toISOString(),
  }
}

export function updateQrCode(
  state: QrCodeState,
  payload: Partial<Pick<QrCodeState, "label" | "payload">>,
): QrCodeState {
  return { ...state, ...payload }
}
`,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "src-editors",
          name: "editors",
          path: "src/editors",
          kind: "folder",
          children: [
            {
              id: "src-editors-qr",
              name: "qr-code",
              path: "src/editors/qr-code",
              kind: "folder",
              children: [
                {
                  id: "src-editors-qr-editor",
                  name: "editor.tsx",
                  path: "src/editors/qr-code/editor.tsx",
                  kind: "file",
                  language: "typescript",
                  content: `import { QrPreview } from "@/components/QrPreview"
import { documentModel } from "@/document-models/qr-code/v1"

export function QrCodeEditor() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <header>
        <h1 className="text-lg font-semibold">{documentModel.name}</h1>
        <p className="text-sm text-muted-foreground">
          Create, update, and download QR documents.
        </p>
      </header>
      <QrPreview value="https://vetra.io/qr/demo" />
    </div>
  )
}
`,
                },
                {
                  id: "src-editors-qr-css",
                  name: "styles.css",
                  path: "src/editors/qr-code/styles.css",
                  kind: "file",
                  language: "css",
                  content: `.qr-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}

.qr-editor__title {
  font-size: 1.125rem;
  font-weight: 600;
}
`,
                },
              ],
            },
          ],
        },
        {
          id: "src-hooks",
          name: "hooks",
          path: "src/hooks",
          kind: "folder",
          children: [
            {
              id: "src-hooks-use-qr",
              name: "use-qr-document.ts",
              path: "src/hooks/use-qr-document.ts",
              kind: "file",
              language: "typescript",
              content: `import * as React from "react"

import type { QrCodeState } from "@/document-models/qr-code/v1"

const INITIAL: QrCodeState = {
  label: "Untitled",
  payload: "",
  createdAt: new Date().toISOString(),
}

export function useQrDocument() {
  const [document, setDocument] = React.useState<QrCodeState>(INITIAL)
  return { document, setDocument }
}
`,
            },
          ],
        },
        {
          id: "src-lib",
          name: "lib",
          path: "src/lib",
          kind: "folder",
          children: [
            {
              id: "src-lib-utils",
              name: "utils.ts",
              path: "src/lib/utils.ts",
              kind: "file",
              language: "typescript",
              content: `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}
`,
            },
          ],
        },
        {
          id: "src-pages",
          name: "pages",
          path: "src/pages",
          kind: "folder",
          children: [
            {
              id: "src-pages-index",
              name: "Index.tsx",
              path: "src/pages/Index.tsx",
              kind: "file",
              language: "typescript",
              content: `import { QrCodeEditor } from "@/editors/qr-code/editor"

export default function IndexPage() {
  return <QrCodeEditor />
}
`,
            },
          ],
        },
        {
          id: "src-app",
          name: "App.tsx",
          path: "src/App.tsx",
          kind: "file",
          language: "typescript",
          content: `import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Index from "./pages/Index"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
`,
        },
        {
          id: "src-index-css",
          name: "index.css",
          path: "src/index.css",
          kind: "file",
          language: "css",
          content: `:root {
  color-scheme: light dark;
  font-family: Inter, system-ui, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background: canvas;
  color: canvastext;
}
`,
        },
        {
          id: "src-main",
          name: "main.tsx",
          path: "src/main.tsx",
          kind: "file",
          language: "typescript",
          content: `import { createRoot } from "react-dom/client"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(<App />)
`,
        },
      ],
    },
    {
      id: "package-json",
      name: "package.json",
      path: "package.json",
      kind: "file",
      language: "json",
      content: `{
  "name": "qr-code-manager",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  }
}
`,
    },
    {
      id: "tsconfig",
      name: "tsconfig.json",
      path: "tsconfig.json",
      kind: "file",
      language: "json",
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`,
    },
    {
      id: "vite-config",
      name: "vite.config.ts",
      path: "vite.config.ts",
      kind: "file",
      language: "typescript",
      content: `import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`,
    },
    {
      id: "readme",
      name: "README.md",
      path: "README.md",
      kind: "file",
      language: "markdown",
      content: `# QR Code Manager

Generated Vetra package for creating, organizing, and downloading QR code documents.
`,
    },
  ],
}

export const DEFAULT_OPEN_FILE_PATHS = [
  "src/pages/Index.tsx",
  "public/robots.txt",
  "public/placeholder.svg",
  "src/App.tsx",
] as const

export const DEFAULT_ACTIVE_FILE_PATH = "src/App.tsx"
