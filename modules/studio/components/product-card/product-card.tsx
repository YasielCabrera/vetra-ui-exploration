import Link from "next/link"
import { FolderIcon } from "lucide-react"

import { Badge } from "@/modules/shared/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card"
import type { Product, ProductStatus } from "@/modules/studio/types"

type ProductCardProps = {
  product: Product
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  draft: "Draft",
  building: "Building",
  published: "Published",
}

const STATUS_VARIANT: Record<
  ProductStatus,
  "outline" | "secondary" | "default"
> = {
  draft: "outline",
  building: "secondary",
  published: "default",
}

export function ProductCard({ product }: ProductCardProps) {
  const updatedLabel = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(product.updatedAt))

  return (
    <Link
      href={`/products/${product.id}`}
      className="block rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Card className="h-full transition-colors ring-foreground/10 hover:bg-muted/40">
        <CardHeader className="gap-3">
          <div className="flex items-start justify-between gap-3">
            <div
              aria-hidden
              className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-foreground/10"
            >
              <FolderIcon className="size-5" />
            </div>
            <Badge variant={STATUS_VARIANT[product.status]}>
              {STATUS_LABEL[product.status]}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {product.description}
            </CardDescription>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
            <span className="truncate font-mono">{product.packageName}</span>
            <span className="shrink-0">Updated {updatedLabel}</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
