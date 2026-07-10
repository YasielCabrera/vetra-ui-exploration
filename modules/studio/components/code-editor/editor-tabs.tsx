"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, XIcon } from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/shared/components/ui/tooltip"
import { cn } from "@/modules/shared/lib/utils"
import { FileIcon } from "@/modules/studio/components/code-editor/file-icon"
import { getFileIconType } from "@/modules/studio/lib/get-file-icon-type"

type EditorTab = {
  path: string
  name: string
}

type EditorTabsProps = {
  tabs: EditorTab[]
  activePath: string | null
  onSelect: (path: string) => void
  onClose: (path: string) => void
  onDownload?: () => void
}

const SCROLL_STEP = 160

export function EditorTabs({
  tabs,
  activePath,
  onSelect,
  onClose,
  onDownload,
}: EditorTabsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useEffectEvent(() => {
    const el = scrollerRef.current
    if (!el) return

    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(maxScroll - el.scrollLeft > 1)
  })

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    updateScrollState()

    const onScroll = () => updateScrollState()
    el.addEventListener("scroll", onScroll, { passive: true })

    const onWheel = (event: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return

      // Prefer horizontal delta; otherwise map vertical wheel to horizontal scroll.
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      if (delta === 0) return

      event.preventDefault()
      el.scrollLeft += delta
    }
    el.addEventListener("wheel", onWheel, { passive: false })

    const resizeObserver = new ResizeObserver(() => updateScrollState())
    resizeObserver.observe(el)

    return () => {
      el.removeEventListener("scroll", onScroll)
      el.removeEventListener("wheel", onWheel)
      resizeObserver.disconnect()
    }
  }, [tabs])

  useEffect(() => {
    if (!activePath) return
    const el = scrollerRef.current
    if (!el) return

    const activeTab = el.querySelector<HTMLElement>(
      `[data-tab-path="${CSS.escape(activePath)}"]`,
    )
    activeTab?.scrollIntoView({ inline: "nearest", block: "nearest" })
    updateScrollState()
  }, [activePath])

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border bg-muted/40 px-1">
      <div className="relative flex min-w-0 flex-1 items-stretch">
        {canScrollLeft ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Scroll tabs left"
            className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-muted/90 text-muted-foreground shadow-sm backdrop-blur-sm hover:bg-muted"
            onClick={() => scrollBy(-SCROLL_STEP)}
          >
            <ChevronLeftIcon />
          </Button>
        ) : null}

        <div
          ref={scrollerRef}
          className="flex min-w-0 flex-1 items-stretch gap-0.5 overflow-x-auto scrollbar-none"
        >
          {tabs.map((tab) => {
            const isActive = tab.path === activePath
            return (
              <div
                key={tab.path}
                data-tab-path={tab.path}
                className={cn(
                  "group flex max-w-56 shrink-0 items-center gap-1 rounded-md px-2 text-xs",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                )}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-left"
                  onClick={() => onSelect(tab.path)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <FileIcon type={getFileIconType(tab.name, "file")} />
                  <span className="min-w-0 truncate">{tab.path}</span>
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                    !isActive && "opacity-0 group-hover:opacity-100",
                  )}
                  aria-label={`Close ${tab.name}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    onClose(tab.path)
                  }}
                >
                  <XIcon className="size-3" />
                </button>
              </div>
            )
          })}
        </div>

        {canScrollRight ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Scroll tabs right"
            className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-muted/90 text-muted-foreground shadow-sm backdrop-blur-sm hover:bg-muted"
            onClick={() => scrollBy(SCROLL_STEP)}
          >
            <ChevronRightIcon />
          </Button>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center pr-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Download file"
              className="text-muted-foreground"
              onClick={onDownload}
            >
              <DownloadIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download file</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}
