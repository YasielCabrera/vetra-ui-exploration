"use client"

import {
  CircleAlertIcon,
  CircleIcon,
  LoaderCircleIcon,
} from "lucide-react"

import { Badge } from "@/modules/shared/components/ui/badge"
import { Button } from "@/modules/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/modules/shared/components/ui/popover"
import { Separator } from "@/modules/shared/components/ui/separator"
import type { ChatSession } from "@/modules/studio/types"

type SessionStatusBarProps = {
  session: ChatSession
}

function statusLabel(status: ChatSession["status"]) {
  switch (status) {
    case "streaming":
      return "Streaming"
    case "error":
      return "Error"
    case "complete":
      return "Complete"
    default:
      return "Idle"
  }
}

function StatusIcon({ status }: { status: ChatSession["status"] }) {
  if (status === "streaming") {
    return <LoaderCircleIcon className="animate-spin" />
  }
  if (status === "error") {
    return <CircleAlertIcon className="text-destructive" />
  }
  return <CircleIcon />
}

export function SessionStatusBar({ session }: SessionStatusBarProps) {
  const timeRange =
    session.startedAt && session.endedAt
      ? `${session.startedAt} – ${session.endedAt}`
      : session.startedAt
        ? `${session.startedAt} – …`
        : null

  const label = statusLabel(session.status)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Session status: ${label}`}
          className="text-muted-foreground"
        >
          <StatusIcon status={session.status} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" className="w-64 gap-0 p-0">
        <PopoverHeader className="gap-1.5 p-3">
          <div className="flex items-center gap-2">
            <PopoverTitle>Session</PopoverTitle>
            {session.status === "error" ? (
              <Badge variant="destructive">{label}</Badge>
            ) : null}
            {session.status === "streaming" ? (
              <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                {label}
              </Badge>
            ) : null}
            {session.status === "complete" ? (
              <Badge variant="secondary">{label}</Badge>
            ) : null}
          </div>
          {timeRange ? (
            <PopoverDescription>{timeRange}</PopoverDescription>
          ) : null}
        </PopoverHeader>
        <Separator />
        <div className="flex flex-col gap-2 p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <span>Messages</span>
            <span className="font-medium text-foreground">
              {session.messageCount}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Tokens</span>
            <span className="font-medium text-foreground">
              {session.tokenCount}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
