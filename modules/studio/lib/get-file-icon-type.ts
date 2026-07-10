import type { FileIconType } from "@/modules/studio/types"

const CONFIG_NAMES = new Set([
  "vite.config.ts",
  "vite.config.js",
  "tailwind.config.ts",
  "tailwind.config.js",
  "postcss.config.js",
  "postcss.config.cjs",
  "next.config.ts",
  "next.config.js",
  "eslint.config.js",
  "eslint.config.mjs",
  "tsconfig.json",
  "components.json",
])

export function getFileIconType(
  name: string,
  kind: "file" | "folder",
  open = false,
): FileIconType {
  if (kind === "folder") return open ? "folder-open" : "folder"

  if (CONFIG_NAMES.has(name)) return "config"

  const extension = name.includes(".")
    ? name.slice(name.lastIndexOf(".") + 1).toLowerCase()
    : ""

  switch (extension) {
    case "tsx":
      return "tsx"
    case "ts":
      return "ts"
    case "jsx":
      return "jsx"
    case "js":
    case "mjs":
    case "cjs":
      return "js"
    case "css":
      return "css"
    case "json":
      return "json"
    case "svg":
      return "svg"
    case "md":
    case "mdx":
      return "md"
    case "html":
    case "htm":
      return "html"
    case "txt":
      return "txt"
    default:
      return "default"
  }
}
