"use client"

import { useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/modules/shared/components/ui/input"
import { ScrollArea } from "@/modules/shared/components/ui/scroll-area"
import { cn } from "@/modules/shared/lib/utils"
import { FileTreeItem } from "@/modules/studio/components/code-editor/file-tree-item"
import {
  collectFolderPaths,
  filterProjectTree,
} from "@/modules/studio/lib/project-file-tree"
import type { ProjectFileNode } from "@/modules/studio/types"

type FileExplorerProps = {
  root: ProjectFileNode
  activePath: string | null
  expandedPaths: Set<string>
  onToggleFolder: (path: string) => void
  onSelectFile: (path: string) => void
  className?: string
}

export function FileExplorer({
  root,
  activePath,
  expandedPaths,
  onToggleFolder,
  onSelectFile,
  className,
}: FileExplorerProps) {
  const [query, setQuery] = useState("")

  const filteredRoot = useMemo(
    () => filterProjectTree(root, query),
    [root, query],
  )

  const children = filteredRoot?.children ?? []
  const treeExpandedPaths = query.trim()
    ? new Set(collectFolderPaths(filteredRoot ?? root))
    : expandedPaths

  return (
    <div className={cn("flex h-full min-h-0 flex-col bg-background", className)}>
      <div className="flex h-10 shrink-0 items-center border-b border-border px-2">
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search code"
            className="h-8 pl-8"
            aria-label="Search code"
          />
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-0.5 p-1.5">
          {children.length > 0 ? (
            children.map((child) => (
              <FileTreeItem
                key={child.id}
                node={child}
                depth={0}
                activePath={activePath}
                expandedPaths={treeExpandedPaths}
                onToggleFolder={onToggleFolder}
                onSelectFile={onSelectFile}
              />
            ))
          ) : (
            <p className="px-2 py-3 text-xs text-muted-foreground">
              No files match “{query}”.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
