export function getMonacoLanguage(path: string, language?: string) {
  if (language) return language

  const extension = path.includes(".")
    ? path.slice(path.lastIndexOf(".") + 1).toLowerCase()
    : ""

  switch (extension) {
    case "ts":
    case "tsx":
      return "typescript"
    case "js":
    case "jsx":
    case "mjs":
    case "cjs":
      return "javascript"
    case "css":
      return "css"
    case "json":
      return "json"
    case "svg":
    case "xml":
      return "xml"
    case "html":
    case "htm":
      return "html"
    case "md":
    case "mdx":
      return "markdown"
    default:
      return "plaintext"
  }
}
