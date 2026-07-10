"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CloudIcon,
  FolderIcon,
  LightbulbIcon,
  MessageSquareIcon,
  PlugIcon,
  SettingsIcon,
  SquarePenIcon,
} from "lucide-react"

import { ThemeToggle } from "@/modules/shared/components/theme-toggle"
import { VetraLogo } from "@/modules/shared/components/vetra-logo"
import { Button } from "@/modules/shared/components/ui/button"
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
import { useStudio } from "@/modules/studio/providers"
import type { ChatSession } from "@/modules/studio/types"

const NAV_ICONS = {
  lightbulb: LightbulbIcon,
  folder: FolderIcon,
  plug: PlugIcon,
  cloud: CloudIcon,
} as const

export function StudioSidebar() {
  const pathname = usePathname()
  const { sessions } = useStudio()
  const { open, isMobile, openMobile, setOpenMobile, toggleSidebar } =
    useSidebar()

  const panelOpen = isMobile ? openMobile : open

  const panel = <SidebarPanel pathname={pathname} sessions={sessions} />

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
}: {
  pathname: string
  sessions: ChatSession[]
}) {
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

      <SidebarContent>
        <SidebarGroup>
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

        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sessions.map((session) => {
                const active = pathname === `/session/${session.id}`
                return (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={`/session/${session.id}`}>
                        <MessageSquareIcon />
                        <span className="truncate">{session.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
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
