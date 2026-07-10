"use client"

import { StudioSidebar } from "@/modules/studio/components/studio-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/modules/shared/components/ui/sidebar"

type StudioShellProps = {
  children: React.ReactNode
}

export function StudioShell({ children }: StudioShellProps) {
  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <StudioSidebar />
      <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
