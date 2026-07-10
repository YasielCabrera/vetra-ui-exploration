"use client"

import { BlocksIcon, LightbulbIcon, ShieldIcon } from "lucide-react"

import { FEATURE_COLUMNS } from "@/modules/studio/lib/constants"

const ICONS = {
  lightbulb: LightbulbIcon,
  blocks: BlocksIcon,
  shield: ShieldIcon,
} as const

export function FeatureColumns() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {FEATURE_COLUMNS.map((column) => {
        const Icon = ICONS[column.icon]
        return (
          <div key={column.title} className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Icon className="size-4 text-primary" />
              {column.title}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {column.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
