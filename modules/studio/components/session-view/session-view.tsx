"use client"

import * as React from "react"
import { useEffectEvent } from "react"
import { useRouter } from "next/navigation"
import type { Layout } from "react-resizable-panels"

import { ScrollArea } from "@/modules/shared/components/ui/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/modules/shared/components/ui/resizable"
import { SidebarTrigger } from "@/modules/shared/components/ui/sidebar"
import { useIsMobile } from "@/modules/shared/hooks/use-mobile"
import { ChatComposer } from "@/modules/studio/components/chat-composer"
import { PreviewPanel } from "@/modules/studio/components/preview-panel"
import { SessionStatusBar } from "@/modules/studio/components/session-status-bar"
import { StreamEventItem } from "@/modules/studio/components/stream-event-item"
import { loadAutoFollowAgent } from "@/modules/studio/lib/auto-follow-agent"
import {
  DEFAULT_AUTO_FOLLOW_AGENT,
  DEFAULT_SESSION_PANEL_LAYOUT,
  SESSION_PANEL_LAYOUT_KEY,
} from "@/modules/studio/lib/constants"
import { useStudio } from "@/modules/studio/providers"
import type { ChatSession, Product } from "@/modules/studio/types"

function loadPanelLayout(): Layout {
  try {
    const raw = window.localStorage.getItem(SESSION_PANEL_LAYOUT_KEY)
    if (!raw) return { ...DEFAULT_SESSION_PANEL_LAYOUT }
    const parsed = JSON.parse(raw) as Layout
    if (
      typeof parsed.chat === "number" &&
      typeof parsed.preview === "number" &&
      parsed.chat > 0 &&
      parsed.preview > 0
    ) {
      return parsed
    }
  } catch {
    // Ignore quota / private mode / bad JSON
  }
  return { ...DEFAULT_SESSION_PANEL_LAYOUT }
}

function persistPanelLayout(layout: Layout) {
  try {
    window.localStorage.setItem(SESSION_PANEL_LAYOUT_KEY, JSON.stringify(layout))
  } catch {
    // Ignore quota / private mode
  }
}

type SessionViewProps = {
  sessionId: string
}

function SessionChatPane({
  session,
  products,
  visibleEvents,
  bottomRef,
  onSubmit,
  onAutoFollowAgentChange,
}: {
  session: ChatSession
  products: Product[]
  visibleEvents: ChatSession["events"]
  bottomRef: React.RefObject<HTMLDivElement | null>
  onSubmit: (prompt: string, productId: string) => void
  onAutoFollowAgentChange: (enabled: boolean) => void
}) {
  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SidebarTrigger />
        <h2 className="truncate text-sm font-medium">{session.title}</h2>
      </header>

      <ScrollArea className="min-h-0 flex-1 overflow-hidden">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 px-4 py-6">
          {visibleEvents.map((event) => (
            <StreamEventItem key={event.id} event={event} />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="shrink-0 px-4 pb-3">
        <ChatComposer
          placeholder={
            session.status === "streaming"
              ? "Agent is working…"
              : session.status === "error"
                ? "Session is not active."
                : "Ask for a change…"
          }
          disabled={session.status === "streaming"}
          products={products}
          productId={session.productId}
          productLocked
          toolbarStart={<SessionStatusBar session={session} />}
          onSubmit={onSubmit}
          onAutoFollowAgentChange={onAutoFollowAgentChange}
        />
      </div>
    </section>
  )
}

export function SessionView({ sessionId }: SessionViewProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { getSession, revealNextEvent, createSession, products } = useStudio()
  const session = getSession(sessionId)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const [panelLayout, setPanelLayout] = React.useState<Layout | null>(null)
  const [autoFollowAgent, setAutoFollowAgent] = React.useState(
    DEFAULT_AUTO_FOLLOW_AGENT,
  )

  const onReveal = useEffectEvent(() => {
    revealNextEvent(sessionId)
  })

  React.useEffect(() => {
    setPanelLayout(loadPanelLayout())
    setAutoFollowAgent(loadAutoFollowAgent())
  }, [])

  React.useEffect(() => {
    if (!session) return
    if (session.status !== "streaming") return
    if (session.events.length === 0) return
    if (session.revealedCount >= session.events.length) return

    const next = session.events[session.revealedCount]
    const delay = next?.delayMs ?? 400
    const timer = window.setTimeout(() => {
      onReveal()
    }, delay)

    return () => window.clearTimeout(timer)
  }, [session, sessionId])

  React.useEffect(() => {
    if (!autoFollowAgent) return
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [autoFollowAgent, session?.revealedCount])

  if (!session) {
    return (
      <div className="flex h-full flex-1 items-center justify-center overflow-hidden p-8 text-sm text-muted-foreground">
        Session not found.
      </div>
    )
  }

  const visibleEvents = session.events.slice(
    0,
    Math.max(session.revealedCount, 1),
  )
  const previewReady =
    session.status === "complete" ||
    session.status === "error" ||
    session.revealedCount >= Math.max(session.events.length - 2, 1)

  const handleSubmit = (prompt: string, productId: string) => {
    const id = createSession(prompt, productId)
    router.push(`/session/${id}`)
  }

  const chatPane = (
    <SessionChatPane
      session={session}
      products={products}
      visibleEvents={visibleEvents}
      bottomRef={bottomRef}
      onSubmit={handleSubmit}
      onAutoFollowAgentChange={setAutoFollowAgent}
    />
  )

  if (isMobile) {
    return (
      <div className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
        {chatPane}
      </div>
    )
  }

  if (!panelLayout) {
    return (
      <div
        className="h-full min-h-0 min-w-0 flex-1 overflow-hidden"
        aria-hidden
      />
    )
  }

  return (
    <ResizablePanelGroup
      id="session-panels"
      orientation="horizontal"
      className="h-full min-h-0 min-w-0 flex-1 overflow-hidden"
      defaultLayout={panelLayout}
      onLayoutChanged={(layout, meta) => {
        if (!meta.isUserInteraction) return
        persistPanelLayout(layout)
      }}
    >
      <ResizablePanel id="chat" minSize="20%">
        {chatPane}
      </ResizablePanel>
      <ResizableHandle className="w-px cursor-col-resize bg-border transition-colors after:w-1.5 hover:bg-foreground/25" />
      <ResizablePanel id="preview" minSize="28%">
        <PreviewPanel title={session.title} ready={previewReady} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
