import type { ProductFeature } from "@/modules/studio/types"

import { FeatureListItem } from "./feature-list-item"

type FeaturesListProps = {
  features: ProductFeature[]
}

export function FeaturesList({ features }: FeaturesListProps) {
  if (features.length === 0) {
    return (
      <div className="rounded-xl bg-card px-4 py-8 text-sm text-muted-foreground ring-1 ring-foreground/10">
        No features proposed yet.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-4 bg-muted/50 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">
          Feature title, status, scope
        </span>
        <span className="text-xs text-muted-foreground">WBS</span>
      </div>
      <ul className="divide-y divide-border">
        {features.map((feature) => (
          <FeatureListItem key={feature.id} feature={feature} />
        ))}
      </ul>
    </div>
  )
}
