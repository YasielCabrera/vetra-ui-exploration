"use client"

import { ChevronDownIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import { cn } from "@/modules/shared/lib/utils"
import { FileIcon } from "@/modules/studio/components/code-editor/file-icon"
import { getFileIconType } from "@/modules/studio/lib/get-file-icon-type"
import type { ProjectFileNode } from "@/modules/studio/types"

type FileTreeItemProps = {
  node: ProjectFileNode
  depth: number
  activePath: string | null
  expandedPaths: Set<string>
  onToggleFolder: (path: string) => void
  onSelectFile: (path: string) => void
}

export function FileTreeItem({
  node,
  depth,
  activePath,
  expandedPaths,
  onToggleFolder,
  onSelectFile,
}: FileTreeItemProps) {
  if (node.kind === "folder") {
    const isExpanded = expandedPaths.has(node.path)
    const iconType = getFileIconType(node.name, "folder", isExpanded)

    return (
      <div>
        <button
          type="button"
          className="flex w-full items-center gap-1 rounded-md px-1.5 py-1 text-left text-sm text-foreground hover:bg-muted"
          style={{ paddingLeft: `${depth * 12 + 6}px` }}
          onClick={() => onToggleFolder(node.path)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDownIcon className="size-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          <FileIcon type={iconType} />
          <span className="min-w-0 truncate">{node.name}</span>
        </button>
        {isExpanded
          ? (node.children ?? []).map((child) => (
              <FileTreeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                activePath={activePath}
                expandedPaths={expandedPaths}
                onToggleFolder={onToggleFolder}
                onSelectFile={onSelectFile}
              />
            ))
          : null}
      </div>
    )
  }

  const isActive = activePath === node.path
  const iconType = getFileIconType(node.name, "file")

  return (
    <div
      className={cn(
        "group relative flex items-center rounded-md",
        isActive && "bg-accent",
      )}
    >
      <button
        type="button"
        className={cn(
          "flex min-w-0 flex-1 items-center gap-1.5 py-1 pr-8 text-left text-sm hover:bg-muted",
          isActive && "hover:bg-accent",
        )}
        style={{ paddingLeft: `${depth * 12 + 22}px` }}
        onClick={() => onSelectFile(node.path)}
        aria-current={isActive ? "page" : undefined}
      >
        <FileIcon type={iconType} />
        <span className="min-w-0 truncate">{node.name}</span>
      </button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className={cn(
          "absolute right-1 opacity-0 group-hover:opacity-100",
          isActive && "opacity-100",
        )}
        aria-label={`Options for ${node.name}`}
      >
        <MoreHorizontalIcon />
      </Button>
    </div>
  )
}
