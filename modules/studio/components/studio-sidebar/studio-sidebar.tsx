"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  LightbulbIcon,
  ListFilterIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PlusIcon,
  PlugIcon,
  SettingsIcon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react"

import { ThemeToggle } from "@/modules/shared/components/theme-toggle"
import { VetraLogo } from "@/modules/shared/components/vetra-logo"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/modules/shared/components/ui/alert-dialog"
import { Button } from "@/modules/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/modules/shared/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/modules/shared/components/ui/sidebar"
import { cn } from "@/modules/shared/lib/utils"
import {
  ConnectSmallIcon,
  HddIcon,
  PlusSquareIcon,
} from "@/modules/studio/components/connect-rail-icons"
import { RenownLogin } from "@/modules/studio/components/renown-login"
import { NAV_ITEMS } from "@/modules/studio/lib/constants"
import {
  loadRecentChatsView,
  persistRecentChatsView,
  type RecentChatsView,
} from "@/modules/studio/lib/recent-chats-prefs"
import { useStudio } from "@/modules/studio/providers"
import type { ChatSession, Product } from "@/modules/studio/types"

const NAV_ICONS = {
  lightbulb: LightbulbIcon,
  folder: FolderIcon,
  plug: PlugIcon,
} as const

export function StudioSidebar() {
  const pathname = usePathname()
  const { sessions, products } = useStudio()
  const { open, isMobile, openMobile, setOpenMobile, toggleSidebar } =
    useSidebar()

  const panelOpen = isMobile ? openMobile : open

  const panel = (
    <SidebarPanel pathname={pathname} sessions={sessions} products={products} />
  )

  return (
    <div className="flex h-full shrink-0 overflow-hidden">
      <nav
        aria-label="Workspace rail"
        className="flex h-full w-[58px] shrink-0 flex-col bg-sidebar text-sidebar-foreground"
      >
        <div className="scrollbar-none flex-1 overflow-auto">
          <div className="flex flex-col">
            <RailItem
              label={panelOpen ? "Hide sidebar" : "Show sidebar"}
              active={panelOpen}
              onClick={toggleSidebar}
            >
              <HddIcon size={32} />
            </RailItem>
            <RailItem label="New chat" href="/">
              <PlusSquareIcon size={32} />
            </RailItem>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-3 border-t border-sidebar-border px-2 py-4 dark:border-none">
          <Link href="/" aria-label="Home" className="cursor-pointer">
            <ConnectSmallIcon size={24} className="text-muted-foreground" />
          </Link>
          <div className="mt-3">
            <button type="button" aria-label="Open Account" className="cursor-pointer">
              <RenownLogin />
            </button>
          </div>
          <button
            type="button"
            aria-label="Settings"
            className="cursor-pointer"
          >
            <SettingsIcon className="size-6 text-foreground" strokeWidth={2} />
          </button>
        </div>
      </nav>

      {isMobile ? (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side="left"
            className="w-[16rem] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>
                Studio navigation and recent chats.
              </SheetDescription>
            </SheetHeader>
            {panel}
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            "h-full overflow-hidden transition-[width] duration-200 ease-linear",
            open ? "w-[16rem]" : "w-0",
          )}
        >
          <div className="h-full w-[16rem]">{panel}</div>
        </div>
      )}
    </div>
  )
}

function RailItem({
  label,
  active = false,
  href,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  href?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  const className = cn(
    "group/sidebar-item relative flex flex-col items-center justify-center text-center text-sm text-foreground",
    active && "bg-sidebar-accent text-sidebar-accent-foreground",
    (href || onClick) && "cursor-pointer",
  )

  const content = (
    <>
      {active ? (
        <div className="absolute top-1/2 left-0 h-10 w-1 -translate-y-1/2 rounded-r-sm bg-info" />
      ) : (
        <div className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-sm bg-secondary opacity-0 transition-opacity group-hover/sidebar-item:opacity-100" />
      )}
      <div className="mx-auto py-4">{children}</div>
    </>
  )

  if (href) {
    return (
      <Link href={href} aria-label={label} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  )
}

function SidebarPanel({
  pathname,
  sessions,
  products,
}: {
  pathname: string
  sessions: ChatSession[]
  products: Product[]
}) {
  const [chatsView, setChatsView] = React.useState<RecentChatsView>("recent")
  const [expandedProductIds, setExpandedProductIds] = React.useState(() => {
    const active = sessions.find(
      (session) => pathname === `/session/${session.id}`,
    )
    return active ? new Set([active.productId]) : new Set<string>()
  })
  const [prefsHydrated, setPrefsHydrated] = React.useState(false)

  const activeSession = sessions.find(
    (session) => pathname === `/session/${session.id}`,
  )
  const activeProductId = activeSession?.productId

  React.useEffect(() => {
    setChatsView(loadRecentChatsView())
    setPrefsHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!activeProductId) return
    setExpandedProductIds((current) => {
      if (current.has(activeProductId)) return current
      const next = new Set(current)
      next.add(activeProductId)
      return next
    })
  }, [activeProductId])

  React.useEffect(() => {
    if (!prefsHydrated) return
    persistRecentChatsView(chatsView)
  }, [chatsView, prefsHydrated])

  const toggleProjectExpanded = (productId: string) => {
    setExpandedProductIds((current) => {
      const next = new Set(current)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  return (
    <Sidebar
      collapsible="none"
      className="h-full w-full border-r border-sidebar-border"
    >
      <SidebarHeader className="gap-3 px-3 py-3">
        <Link href="/" className="px-1">
          <VetraLogo />
        </Link>
        <Button asChild className="w-full justify-start gap-2" size="default">
          <Link href="/">
            <SquarePenIcon className="size-4" />
            New chat
          </Link>
        </Button>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup className="shrink-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const Icon = NAV_ICONS[item.icon]
                const active = pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="min-h-0 flex-1 pr-0">
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction
                aria-label="Filter recent chats"
                title="Filter recent chats"
                className="right-1"
              >
                <ListFilterIcon />
              </SidebarGroupAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              <DropdownMenuRadioGroup
                value={chatsView}
                onValueChange={(value) =>
                  setChatsView(value as RecentChatsView)
                }
              >
                <DropdownMenuRadioItem value="recent">
                  Recent
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="by-project">
                  By project
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarGroupContent className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
            {chatsView === "by-project" ? (
              <RecentChatsByProject
                pathname={pathname}
                sessions={sessions}
                products={products}
                expandedProductIds={expandedProductIds}
                onToggleProject={toggleProjectExpanded}
              />
            ) : (
              <SidebarMenu>
                {sessions.map((session) => (
                  <RecentChatItem
                    key={session.id}
                    session={session}
                    active={pathname === `/session/${session.id}`}
                  />
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-row items-center justify-between gap-2 px-3 pb-3">
        <p className="px-2 text-xs text-muted-foreground">
          Mock studio — no live AI
        </p>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

function useDeleteSession() {
  const router = useRouter()
  const pathname = usePathname()
  const { deleteSession } = useStudio()

  return (sessionId: string) => {
    const wasActive = pathname === `/session/${sessionId}`
    deleteSession(sessionId)
    if (wasActive) router.push("/")
  }
}

function ChatSessionActions({
  session,
  trigger,
}: {
  session: ChatSession
  trigger: React.ReactElement
}) {
  const handleDelete = useDeleteSession()
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault()
              setConfirmOpen(true)
            }}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{session.title}&rdquo;. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => handleDelete(session.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function RecentChatItem({
  session,
  active,
}: {
  session: ChatSession
  active: boolean
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <Link href={`/session/${session.id}`}>
          <MessageSquareIcon />
          <span className="truncate">{session.title}</span>
        </Link>
      </SidebarMenuButton>
      <ChatSessionActions
        session={session}
        trigger={
          <SidebarMenuAction
            showOnHover
            aria-label={`Actions for ${session.title}`}
          >
            <MoreHorizontalIcon />
          </SidebarMenuAction>
        }
      />
    </SidebarMenuItem>
  )
}

function RecentChatsByProject({
  pathname,
  sessions,
  products,
  expandedProductIds,
  onToggleProject,
}: {
  pathname: string
  sessions: ChatSession[]
  products: Product[]
  expandedProductIds: Set<string>
  onToggleProject: (productId: string) => void
}) {
  const router = useRouter()
  const { createProductSession } = useStudio()
  const productNameById = new Map(
    products.map((product) => [product.id, product.name]),
  )
  const byProduct = new Map<string, ChatSession[]>()

  for (const session of sessions) {
    const existing = byProduct.get(session.productId)
    if (existing) {
      existing.push(session)
    } else {
      byProduct.set(session.productId, [session])
    }
  }

  const groups = [...byProduct.entries()]
    .map(([productId, productSessions]) => ({
      productId,
      name: productNameById.get(productId) ?? "Unknown project",
      sessions: productSessions,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const handleNewSession = (productId: string) => {
    const id = createProductSession(productId)
    router.push(`/session/${id}`)
  }

  return (
    <SidebarMenu>
      {groups.map((group) => {
        const isExpanded = expandedProductIds.has(group.productId)

        return (
          <SidebarMenuItem key={group.productId}>
            <SidebarMenuButton
              type="button"
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${group.name}`}
              onClick={() => onToggleProject(group.productId)}
            >
              {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
              <FolderIcon />
              <span className="truncate">{group.name}</span>
            </SidebarMenuButton>
            <SidebarMenuAction
              showOnHover
              aria-label={`New chat for ${group.name}`}
              title={`New chat for ${group.name}`}
              onClick={() => handleNewSession(group.productId)}
            >
              <PlusIcon />
            </SidebarMenuAction>
            {isExpanded ? (
              <SidebarMenuSub className="mr-0 pr-0">
                {group.sessions.map((session) => {
                  const active = pathname === `/session/${session.id}`

                  return (
                    <SidebarMenuSubItem key={session.id}>
                      <SidebarMenuSubButton asChild isActive={active}>
                        <Link href={`/session/${session.id}`}>
                          <MessageSquareIcon />
                          <span className="truncate pr-6">{session.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                      <ChatSessionActions
                        session={session}
                        trigger={
                          <button
                            type="button"
                            aria-label={`Actions for ${session.title}`}
                            className="absolute top-1 right-1 flex size-5 -translate-x-px cursor-pointer items-center justify-center rounded-md text-sidebar-foreground opacity-0 ring-sidebar-ring outline-hidden transition-opacity group-hover/menu-sub-item:opacity-100 group-focus-within/menu-sub-item:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:opacity-100 focus-visible:ring-2 aria-expanded:opacity-100 [&>svg]:size-4 [&>svg]:shrink-0"
                          >
                            <MoreHorizontalIcon />
                          </button>
                        }
                      />
                    </SidebarMenuSubItem>
                  )
                })}
              </SidebarMenuSub>
            ) : null}
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
