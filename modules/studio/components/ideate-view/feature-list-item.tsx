import { Badge } from "@/modules/shared/components/ui/badge"
import type { ProductFeature } from "@/modules/studio/types"

type FeatureListItemProps = {
  feature: ProductFeature
}

export function FeatureListItem({ feature }: FeatureListItemProps) {
  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="font-semibold text-foreground">{feature.title}</span>
        <Badge variant="secondary" className="rounded-md uppercase">
          {feature.status}
        </Badge>
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          {feature.scope}
        </span>
      </div>
      <span className="shrink-0 text-sm text-muted-foreground">
        {feature.wbs ?? "no WBS"}
      </span>
    </li>
  )
}
