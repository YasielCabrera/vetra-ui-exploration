/** Relative luminance heuristic for choosing icon label contrast. */
export function isLightAccent(hex: string) {
  const normalized = hex.replace("#", "")
  if (normalized.length !== 6) return false

  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.7
}
