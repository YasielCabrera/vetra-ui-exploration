import type { ProjectFileNode } from "@/modules/studio/types"

export function collectProjectFiles(
  node: ProjectFileNode,
  files: ProjectFileNode[] = [],
): ProjectFileNode[] {
  if (node.kind === "file") {
    files.push(node)
    return files
  }

  for (const child of node.children ?? []) {
    collectProjectFiles(child, files)
  }

  return files
}

export function findProjectFile(
  node: ProjectFileNode,
  path: string,
): ProjectFileNode | undefined {
  if (node.path === path && node.kind === "file") return node

  for (const child of node.children ?? []) {
    const match = findProjectFile(child, path)
    if (match) return match
  }

  return undefined
}

export function filterProjectTree(
  node: ProjectFileNode,
  query: string,
): ProjectFileNode | null {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return node

  if (node.kind === "file") {
    return node.name.toLowerCase().includes(normalized) ||
      node.path.toLowerCase().includes(normalized)
      ? node
      : null
  }

  const children = (node.children ?? [])
    .map((child) => filterProjectTree(child, normalized))
    .filter((child): child is ProjectFileNode => child !== null)

  if (
    children.length > 0 ||
    node.name.toLowerCase().includes(normalized) ||
    node.path.toLowerCase().includes(normalized)
  ) {
    return { ...node, children }
  }

  return null
}

export function getDefaultExpandedPaths(root: ProjectFileNode): string[] {
  const paths: string[] = []

  function walk(node: ProjectFileNode, depth: number) {
    if (node.kind !== "folder") return
    if (node.path) paths.push(node.path)
    if (depth >= 2) return
    for (const child of node.children ?? []) {
      walk(child, depth + 1)
    }
  }

  walk(root, 0)
  return paths
}

export function collectFolderPaths(node: ProjectFileNode): string[] {
  const paths: string[] = []

  function walk(current: ProjectFileNode) {
    if (current.kind === "folder") {
      if (current.path) paths.push(current.path)
      for (const child of current.children ?? []) walk(child)
    }
  }

  walk(node)
  return paths
}
