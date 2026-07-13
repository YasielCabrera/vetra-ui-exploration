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
    <div className="@container">
      <div className="grid grid-cols-1 gap-3 @[42rem]:grid-cols-3">
        {FEATURE_COLUMNS.map((column, index) => {
          const Icon = ICONS[column.icon]
          return (
            <div
              key={column.title}
              className="group/feature relative overflow-hidden rounded-2xl bg-background/55 p-5 shadow-[0_1px_0_0_color-mix(in_oklab,white_65%,transparent),0_14px_32px_-24px_rgba(27,30,36,0.4)] ring-1 ring-foreground/10 backdrop-blur-xl transition-[background-color,box-shadow] duration-200 ease-out animate-stream-in hover:bg-background/75 hover:shadow-[0_1px_0_0_color-mix(in_oklab,white_75%,transparent),0_28px_48px_-18px_rgba(27,30,36,0.5)] dark:bg-card/45 dark:shadow-[0_1px_0_0_color-mix(in_oklab,white_10%,transparent),0_18px_36px_-24px_rgba(0,0,0,0.7)] dark:ring-foreground/12 dark:hover:bg-card/60 dark:hover:shadow-[0_1px_0_0_color-mix(in_oklab,white_14%,transparent),0_28px_48px_-16px_rgba(0,0,0,0.85)]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-80"
              />
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-b from-primary/20 to-primary/8 text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklab,white_45%,transparent),0_10px_22px_-14px_color-mix(in_oklab,var(--primary)_75%,transparent)] ring-1 ring-primary/20 transition-[box-shadow] duration-200 ease-out group-hover/feature:shadow-[inset_0_1px_0_0_color-mix(in_oklab,white_50%,transparent),0_16px_30px_-12px_color-mix(in_oklab,var(--primary)_85%,transparent)] dark:from-primary/25 dark:to-primary/10"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-mono text-[10px] leading-none tracking-[0.16em] text-muted-foreground/80 uppercase">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1.5 text-sm font-medium tracking-tight text-foreground">
                      {column.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {column.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
