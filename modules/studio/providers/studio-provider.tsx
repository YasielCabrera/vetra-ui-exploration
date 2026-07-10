"use client"

import * as React from "react"

import {
  buildStreamEvents,
  titleFromPrompt,
} from "@/modules/studio/lib/build-stream-events"
import {
  NEW_PRODUCT_VALUE,
  PRODUCTS_STORAGE_KEY,
  STUDIO_STORAGE_KEY,
} from "@/modules/studio/lib/constants"
import { SEED_PRODUCTS } from "@/modules/studio/mocks/seed-products"
import { SEED_SESSIONS } from "@/modules/studio/mocks/seed-sessions"
import type { ChatSession, Product } from "@/modules/studio/types"

type StudioContextValue = {
  sessions: ChatSession[]
  products: Product[]
  hydrated: boolean
  createSession: (prompt: string, productId?: string) => string
  createProductSession: (productId: string) => string
  startSession: (id: string, prompt: string) => void
  deleteSession: (id: string) => void
  getSession: (id: string) => ChatSession | undefined
  getProduct: (id: string) => Product | undefined
  revealNextEvent: (id: string) => void
}

const StudioContext = React.createContext<StudioContextValue | null>(null)

function withHydratedEvents(session: ChatSession): ChatSession {
  if (session.events.length > 0) return session
  const events = buildStreamEvents(session.prompt)
  const complete =
    session.status === "complete" ||
    session.status === "error" ||
    session.revealedCount >= events.length
  return {
    ...session,
    events,
    revealedCount: complete ? events.length : Math.max(1, session.revealedCount),
  }
}

function packageNameFromTitle(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "new-product"
  )
}

function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") {
    return SEED_SESSIONS.map(withHydratedEvents)
  }
  try {
    const raw = window.localStorage.getItem(STUDIO_STORAGE_KEY)
    if (!raw) return SEED_SESSIONS.map(withHydratedEvents)
    const parsed = JSON.parse(raw) as ChatSession[]
    if (!Array.isArray(parsed)) {
      return SEED_SESSIONS.map(withHydratedEvents)
    }
    return parsed
      .filter((session) => typeof session.productId === "string")
      .map(withHydratedEvents)
  } catch {
    return SEED_SESSIONS.map(withHydratedEvents)
  }
}

function loadProducts(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS
  try {
    const raw = window.localStorage.getItem(PRODUCTS_STORAGE_KEY)
    if (!raw) return SEED_PRODUCTS
    const parsed = JSON.parse(raw) as Product[]
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_PRODUCTS
    return parsed
  } catch {
    return SEED_PRODUCTS
  }
}

function persistSessions(sessions: ChatSession[]) {
  window.localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(sessions))
}

function persistProducts(products: Product[]) {
  window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
}

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = React.useState<ChatSession[]>(() =>
    SEED_SESSIONS.map(withHydratedEvents),
  )
  const [products, setProducts] = React.useState<Product[]>(SEED_PRODUCTS)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setSessions(loadSessions())
    setProducts(loadProducts())
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    persistSessions(sessions)
  }, [sessions, hydrated])

  React.useEffect(() => {
    if (!hydrated) return
    persistProducts(products)
  }, [products, hydrated])

  const createSession = React.useCallback(
    (prompt: string, productId: string = NEW_PRODUCT_VALUE) => {
      const id = `session-${Date.now()}`
      const now = new Date()
      const title = titleFromPrompt(prompt)
      const events = buildStreamEvents(prompt)

      let resolvedProductId = productId

      if (productId === NEW_PRODUCT_VALUE) {
        resolvedProductId = `product-${Date.now()}`
        const product: Product = {
          id: resolvedProductId,
          name: title,
          description: prompt.trim(),
          status: "building",
          updatedAt: now.toISOString(),
          packageName: packageNameFromTitle(title),
        }
        setProducts((prev) => [product, ...prev])
      }

      const session: ChatSession = {
        id,
        title,
        prompt,
        productId: resolvedProductId,
        createdAt: now.toISOString(),
        status: "streaming",
        messageCount: 1,
        tokenCount: 0,
        startedAt: now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }),
        events,
        revealedCount: 1,
      }

      setSessions((prev) => [session, ...prev])
      return id
    },
    [],
  )

  const createProductSession = React.useCallback((productId: string) => {
    const id = `session-${Date.now()}`
    const now = new Date()
    const session: ChatSession = {
      id,
      title: "New session",
      prompt: "",
      productId,
      createdAt: now.toISOString(),
      status: "idle",
      messageCount: 0,
      tokenCount: 0,
      events: [],
      revealedCount: 0,
    }

    setSessions((prev) => [session, ...prev])
    return id
  }, [])

  const startSession = React.useCallback((id: string, prompt: string) => {
    const title = titleFromPrompt(prompt)
    const events = buildStreamEvents(prompt)
    const now = new Date()

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== id) return session
        return {
          ...session,
          title,
          prompt,
          status: "streaming",
          messageCount: 1,
          tokenCount: 0,
          startedAt: now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
          }),
          endedAt: undefined,
          events,
          revealedCount: 1,
        }
      }),
    )
  }, [])

  const deleteSession = React.useCallback((id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id))
  }, [])

  const getSession = React.useCallback(
    (id: string) => sessions.find((session) => session.id === id),
    [sessions],
  )

  const getProduct = React.useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products],
  )

  const revealNextEvent = React.useCallback((id: string) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== id) return session
        if (session.revealedCount >= session.events.length) {
          return session.status === "complete"
            ? session
            : { ...session, status: "complete" }
        }
        const nextCount = session.revealedCount + 1
        const done = nextCount >= session.events.length
        return {
          ...session,
          revealedCount: nextCount,
          messageCount: Math.max(session.messageCount, nextCount),
          status: done ? "complete" : "streaming",
          endedAt: done
            ? new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })
            : session.endedAt,
          tokenCount: done
            ? 1280 + Math.floor(Math.random() * 400)
            : session.tokenCount,
        }
      }),
    )
  }, [])

  const value = React.useMemo(
    () => ({
      sessions,
      products,
      hydrated,
      createSession,
      createProductSession,
      startSession,
      deleteSession,
      getSession,
      getProduct,
      revealNextEvent,
    }),
    [
      sessions,
      products,
      hydrated,
      createSession,
      createProductSession,
      startSession,
      deleteSession,
      getSession,
      getProduct,
      revealNextEvent,
    ],
  )

  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  )
}

export function useStudio() {
  const context = React.useContext(StudioContext)
  if (!context) {
    throw new Error("useStudio must be used within StudioProvider")
  }
  return context
}
