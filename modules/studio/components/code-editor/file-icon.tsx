import { cn } from "@/modules/shared/lib/utils"
import type { FileIconType } from "@/modules/studio/types"

type FileIconProps = {
  type: FileIconType
  className?: string
}

export function FileIcon({ type, className }: FileIconProps) {
  const classes = cn("size-4 shrink-0", className)

  switch (type) {
    case "folder":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <path
            fill="#dcb67a"
            d="M1.5 3.5A1.5 1.5 0 0 1 3 2h3.17a1.5 1.5 0 0 1 1.06.44L8.56 3.5H13A1.5 1.5 0 0 1 14.5 5v7A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12z"
          />
        </svg>
      )
    case "folder-open":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <path
            fill="#dcb67a"
            d="M1.5 4A1.5 1.5 0 0 1 3 2.5h3.17a1.5 1.5 0 0 1 1.06.44l.56.56H13A1.5 1.5 0 0 1 14.5 5v.5H4.12a1.5 1.5 0 0 0-1.42 1.02L1.5 11.5z"
          />
          <path
            fill="#c9a66b"
            d="M2.7 7.5h11.8a.75.75 0 0 1 .72.96l-1.2 4A1.5 1.5 0 0 1 12.6 13.5H3.4a1.5 1.5 0 0 1-1.42-1.04l-1.2-4a.75.75 0 0 1 .72-.96z"
          />
        </svg>
      )
    case "tsx":
    case "jsx":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#149eca" />
          <path
            fill="#fff"
            d="M8 3.2c-2.4 0-3.8 1.3-3.8 1.3l.4.6S5.7 4.2 8 4.2s3.4.9 3.4.9l.4-.6S10.4 3.2 8 3.2zm0 1.8c-.9 0-1.7.2-2.3.5-.2.8-.3 1.7-.3 2.5 0 .8.1 1.7.3 2.5.6.3 1.4.5 2.3.5s1.7-.2 2.3-.5c.2-.8.3-1.7.3-2.5 0-.8-.1-1.7-.3-2.5-.6-.3-1.4-.5-2.3-.5zm-3.2.9S3.2 7 3.2 8s1.6 2.1 1.6 2.1l.6-.4S4.4 8.8 4.4 8s1 1.7 1 1.7l-.6-.4zm6.4 0-.6.4s1 1.7 1 1.7-.9.9-.9.9l.6.4S12.8 9 12.8 8s-1.6-2.1-1.6-2.1zM8 10.8s-1.4.9-3.4.9l.4.6S5.7 13 8 13s3.4-.7 3.4-.7l.4-.6s-1.4-.9-3.4-.9z"
          />
        </svg>
      )
    case "ts":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#3178c6" />
          <text
            x="8"
            y="11.5"
            textAnchor="middle"
            fill="#fff"
            fontSize="7"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
          >
            TS
          </text>
        </svg>
      )
    case "js":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#f7df1e" />
          <text
            x="8"
            y="11.5"
            textAnchor="middle"
            fill="#000"
            fontSize="7"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
          >
            JS
          </text>
        </svg>
      )
    case "css":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#563d7c" />
          <text
            x="8"
            y="11"
            textAnchor="middle"
            fill="#fff"
            fontSize="5.5"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
          >
            CSS
          </text>
        </svg>
      )
    case "json":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#cbcb41" />
          <text
            x="8"
            y="11.5"
            textAnchor="middle"
            fill="#1e1e1e"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            {"{}"}
          </text>
        </svg>
      )
    case "svg":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#ffb13b" />
          <path
            fill="#1e1e1e"
            d="M3.5 11.5 6 5.5h1.2l2.5 6H8.4l-.5-1.3H5.3l-.5 1.3zm2.2-2.4h1.8L7 6.7zm4.1-3.6h1.1v6H9.8z"
          />
        </svg>
      )
    case "md":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#519aba" />
          <path
            fill="#fff"
            d="M3 4.5h1.4l1.4 3.2L7.2 4.5H8.6v7H7.3V7.4L5.8 11H4.8L3.3 7.4v4.1H2V4.5zm8.2 0H14v1.2h-1.5v5.8h-1.3V5.7H9.7z"
          />
        </svg>
      )
    case "html":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#e44d26" />
          <text
            x="8"
            y="11.5"
            textAnchor="middle"
            fill="#fff"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            #
          </text>
        </svg>
      )
    case "txt":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#6d8086" />
          <path
            fill="#fff"
            d="M4 4.5h8v1.2H4zm0 3h8v1.2H4zm0 3h5v1.2H4z"
          />
        </svg>
      )
    case "config":
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <rect width="16" height="16" rx="2" fill="#6d8086" />
          <path
            fill="#fff"
            d="M8 5.2a.8.8 0 0 1 .8.8v.2l.7.3.2-.2a.8.8 0 0 1 1.1 0l.6.6a.8.8 0 0 1 0 1.1l-.2.2.3.7h.2a.8.8 0 0 1 .8.8v.8a.8.8 0 0 1-.8.8h-.2l-.3.7.2.2a.8.8 0 0 1 0 1.1l-.6.6a.8.8 0 0 1-1.1 0l-.2-.2-.7.3v.2a.8.8 0 0 1-.8.8H7.2a.8.8 0 0 1-.8-.8v-.2l-.7-.3-.2.2a.8.8 0 0 1-1.1 0l-.6-.6a.8.8 0 0 1 0-1.1l.2-.2-.3-.7h-.2a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1 .8-.8h.2l.3-.7-.2-.2a.8.8 0 0 1 0-1.1l.6-.6a.8.8 0 0 1 1.1 0l.2.2.7-.3V6a.8.8 0 0 1 .8-.8zm0 2.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"
          />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 16 16" className={classes} aria-hidden>
          <path
            fill="#6d8086"
            d="M4 1.5h5.2L12.5 5v9.5A1.5 1.5 0 0 1 11 16H4a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 4 1.5z"
          />
          <path fill="#8fa0a5" d="M9 1.5 12.5 5H10A1 1 0 0 1 9 4z" />
        </svg>
      )
  }
}
