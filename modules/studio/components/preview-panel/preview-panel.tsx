"use client"

import * as React from "react"
import { SettingsIcon } from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/modules/shared/components/ui/tabs"
import { cn } from "@/modules/shared/lib/utils"
import { CodeEditor } from "@/modules/studio/components/code-editor"
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/modules/studio/components/preview-toolbar"

const DEVICE_MAX_WIDTH: Record<PreviewDevice, string | undefined> = {
  desktop: undefined,
  tablet: "768px",
  mobile: "390px",
}

type PreviewPanelProps = {
  title: string
  ready?: boolean
}

export function PreviewPanel({ title, ready = false }: PreviewPanelProps) {
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [device, setDevice] = React.useState<PreviewDevice>("desktop")
  const [frameKey, setFrameKey] = React.useState(0)

  const handleRefresh = () => {
    setFrameKey((key) => key + 1)
  }

  const handleExpand = () => {
    const node = frameRef.current
    if (!node) return
    if (document.fullscreenElement === node) {
      void document.exitFullscreen()
      return
    }
    void node.requestFullscreen()
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-background">
      <Tabs defaultValue="preview" className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
        <div className="flex h-12 shrink-0 items-center justify-between gap-2 overflow-hidden border-b border-border px-3">
          <TabsList className="shrink-0">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex min-w-0 shrink items-center gap-1 overflow-hidden">
            <Button variant="ghost" size="icon" aria-label="Open repository">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Preview settings">
              <SettingsIcon />
            </Button>
            <Button size="sm" className="ml-1 shrink-0">
              Publish
            </Button>
          </div>
        </div>

        <TabsContent
          value="preview"
          className="mt-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
        >
          <PreviewToolbar
            device={device}
            onDeviceChange={setDevice}
            onRefresh={handleRefresh}
            onExpand={handleExpand}
          />

          <div
            ref={frameRef}
            className="relative flex min-h-0 min-w-0 flex-1 items-stretch justify-center overflow-hidden bg-muted/30"
          >
            {ready ? (
              <div
                className={cn(
                  "flex h-full min-h-0 w-full min-w-0 justify-center transition-[max-width] duration-200",
                  device !== "desktop" && "border-x border-border bg-background",
                )}
                style={{ maxWidth: DEVICE_MAX_WIDTH[device] }}
              >
                <iframe
                  key={frameKey}
                  title={`${title} preview`}
                  src="https://vetra.io"
                  className="size-full min-h-0 min-w-0 flex-1 border-0 bg-background"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            ) : (
              <div className="relative z-10 flex max-w-sm flex-col gap-2 px-6 text-center">
                <p className="truncate text-sm font-medium text-foreground">
                  Generating preview…
                </p>
                <p className="text-sm text-muted-foreground">
                  The agent is still streaming tools and skills for this session.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="code"
          className="mt-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden data-[state=inactive]:hidden"
        >
          <CodeEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
