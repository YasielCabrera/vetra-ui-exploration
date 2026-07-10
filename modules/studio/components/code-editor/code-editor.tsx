"use client"

import * as React from "react"
import type { Layout } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/modules/shared/components/ui/resizable"
import { EditorTabs } from "@/modules/studio/components/code-editor/editor-tabs"
import { FileExplorer } from "@/modules/studio/components/code-editor/file-explorer"
import { MonacoPane } from "@/modules/studio/components/code-editor/monaco-pane"
import {
  CODE_EDITOR_PANEL_LAYOUT_KEY,
  DEFAULT_CODE_EDITOR_PANEL_LAYOUT,
} from "@/modules/studio/lib/constants"
import {
  collectProjectFiles,
  findProjectFile,
  getDefaultExpandedPaths,
} from "@/modules/studio/lib/project-file-tree"
import {
  DEFAULT_ACTIVE_FILE_PATH,
  DEFAULT_OPEN_FILE_PATHS,
  MOCK_PROJECT_ROOT,
} from "@/modules/studio/mocks/mock-project-files"
import type { ProjectFileNode } from "@/modules/studio/types"

function loadEditorLayout(): Layout {
  try {
    const raw = window.localStorage.getItem(CODE_EDITOR_PANEL_LAYOUT_KEY)
    if (!raw) return { ...DEFAULT_CODE_EDITOR_PANEL_LAYOUT }
    const parsed = JSON.parse(raw) as Layout
    if (
      typeof parsed.explorer === "number" &&
      typeof parsed.editor === "number" &&
      parsed.explorer > 0 &&
      parsed.editor > 0
    ) {
      return parsed
    }
  } catch {
    // Ignore quota / private mode / bad JSON
  }
  return { ...DEFAULT_CODE_EDITOR_PANEL_LAYOUT }
}

function persistEditorLayout(layout: Layout) {
  try {
    window.localStorage.setItem(
      CODE_EDITOR_PANEL_LAYOUT_KEY,
      JSON.stringify(layout),
    )
  } catch {
    // Ignore quota / private mode
  }
}

function buildContentsMap(root: ProjectFileNode) {
  const map: Record<string, string> = {}
  for (const file of collectProjectFiles(root)) {
    map[file.path] = file.content ?? ""
  }
  return map
}

export function CodeEditor() {
  const root = MOCK_PROJECT_ROOT
  const [panelLayout, setPanelLayout] = React.useState<Layout | null>(null)
  const [expandedPaths, setExpandedPaths] = React.useState(
    () => new Set(getDefaultExpandedPaths(root)),
  )
  const [openPaths, setOpenPaths] = React.useState<string[]>(() => [
    ...DEFAULT_OPEN_FILE_PATHS,
  ])
  const [activePath, setActivePath] = React.useState<string | null>(
    DEFAULT_ACTIVE_FILE_PATH,
  )
  const [contents, setContents] = React.useState(() => buildContentsMap(root))

  React.useEffect(() => {
    setPanelLayout(loadEditorLayout())
  }, [])

  const openTabs = openPaths
    .map((path) => {
      const file = findProjectFile(root, path)
      if (!file) return null
      return { path: file.path, name: file.name }
    })
    .filter((tab): tab is { path: string; name: string } => tab !== null)

  const activeFile = activePath ? findProjectFile(root, activePath) : undefined

  const handleToggleFolder = (path: string) => {
    setExpandedPaths((current) => {
      const next = new Set(current)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  const handleSelectFile = (path: string) => {
    setOpenPaths((current) =>
      current.includes(path) ? current : [...current, path],
    )
    setActivePath(path)
  }

  const handleCloseTab = (path: string) => {
    setOpenPaths((current) => {
      const next = current.filter((item) => item !== path)
      if (activePath === path) {
        const closedIndex = current.indexOf(path)
        const fallback = next[Math.max(0, closedIndex - 1)] ?? next[0] ?? null
        setActivePath(fallback)
      }
      return next
    })
  }

  const handleChange = (value: string) => {
    if (!activePath) return
    setContents((current) => ({ ...current, [activePath]: value }))
  }

  const handleDownload = () => {
    if (!activePath || contents[activePath] === undefined) return
    const blob = new Blob([contents[activePath]], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = activePath.split("/").pop() ?? "file.txt"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (!panelLayout) {
    return (
      <div className="h-full min-h-0 min-w-0 flex-1 overflow-hidden" aria-hidden />
    )
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden">
      <ResizablePanelGroup
        id="code-editor-panels"
        orientation="horizontal"
        className="min-h-0 flex-1 overflow-hidden"
        defaultLayout={panelLayout}
        onLayoutChanged={(layout, meta) => {
          if (!meta.isUserInteraction) return
          persistEditorLayout(layout)
        }}
      >
        <ResizablePanel id="explorer" minSize="16%" className="min-h-0 min-w-0">
          <FileExplorer
            root={root}
            activePath={activePath}
            expandedPaths={expandedPaths}
            onToggleFolder={handleToggleFolder}
            onSelectFile={handleSelectFile}
          />
        </ResizablePanel>

        <ResizableHandle className="w-px cursor-col-resize bg-border transition-colors after:w-1.5 hover:bg-foreground/25" />

        <ResizablePanel
          id="editor"
          minSize="40%"
          className="flex min-h-0 min-w-0 flex-col"
        >
          <EditorTabs
            tabs={openTabs}
            activePath={activePath}
            onSelect={setActivePath}
            onClose={handleCloseTab}
            onDownload={handleDownload}
          />

          {activeFile && activePath ? (
            <MonacoPane
              path={activePath}
              value={contents[activePath] ?? ""}
              language={activeFile.language}
              onChange={handleChange}
            />
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center bg-muted/20 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Select a file from the explorer to start editing.
              </p>
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
