import {
  ArrowLeftRightIcon,
  CheckIcon,
  Code2Icon,
  LoaderCircleIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react"

import { cn } from "@/modules/shared/lib/utils"
import type { StreamEvent } from "@/modules/studio/types"

type StreamEventItemProps = {
  event: StreamEvent
}

export function StreamEventItem({ event }: StreamEventItemProps) {
  if (event.kind === "user") {
    return (
      <div className="animate-stream-in flex justify-end">
        <div className="max-w-[90%] rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          {event.content}
        </div>
      </div>
    )
  }

  if (event.kind === "text") {
    return (
      <p className="animate-stream-in text-sm leading-relaxed text-muted-foreground">
        {event.content}
      </p>
    )
  }

  if (event.kind === "skill-use" || event.kind === "skill-read") {
    const label = event.kind === "skill-use" ? "Using skill" : "Reading skill"
    const Icon = event.kind === "skill-use" ? StarIcon : SparklesIcon
    return (
      <div className="animate-stream-in flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-3.5 text-primary" />
        <span>
          {label}: <span className="font-medium text-foreground">{event.content}</span>
        </span>
        {event.status === "success" ? (
          <CheckIcon className="size-3.5 text-primary" />
        ) : null}
      </div>
    )
  }

  if (event.kind === "tool") {
    return (
      <div className="animate-stream-in flex items-center gap-2 rounded-lg border border-border/70 bg-card px-3 py-2 font-mono text-xs text-foreground">
        <Code2Icon className="size-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">@</span>
        <span>{event.content}</span>
        <StatusIcon status={event.status} />
      </div>
    )
  }

  return (
    <div className="animate-stream-in space-y-1 rounded-lg border border-border/70 bg-card px-3 py-2">
      <div className="flex items-center gap-2 text-sm text-foreground">
        <ArrowLeftRightIcon className="size-3.5 text-muted-foreground" />
        <span>{event.content}</span>
        <StatusIcon status={event.status} />
      </div>
      {event.meta ? (
        <p className="pl-6 font-mono text-xs text-muted-foreground">{event.meta}</p>
      ) : null}
    </div>
  )
}

function StatusIcon({
  status,
}: {
  status?: StreamEvent["status"]
}) {
  if (status === "success") {
    return <CheckIcon className="ml-auto size-3.5 text-primary" />
  }
  if (status === "running" || status === "pending") {
    return (
      <LoaderCircleIcon
        className={cn("ml-auto size-3.5 animate-spin text-muted-foreground")}
      />
    )
  }
  return null
}
