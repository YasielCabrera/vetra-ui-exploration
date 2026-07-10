"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import { useStudio } from "@/modules/studio/providers"

type ProductDetailViewProps = {
  productId: string
}

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const { getProduct } = useStudio()
  const product = getProduct(productId)

  if (!product) {
    return (
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-2xl flex-col justify-center gap-4 px-6 py-12 min-h-full">
          <h1 className="text-2xl font-semibold tracking-tight">
            Product not found
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            No product matches this id. It may have been removed from the mock
            catalog.
          </p>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/products">
              <ArrowLeftIcon className="size-4" />
              Back to products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-2xl flex-col justify-center gap-4 px-6 py-12 min-h-full">
        <Button asChild variant="ghost" className="w-fit -ml-2">
          <Link href="/products">
            <ArrowLeftIcon className="size-4" />
            Products
          </Link>
        </Button>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Product details for{" "}
            <span className="font-mono text-foreground">
              {product.packageName}
            </span>{" "}
            will land here next — editors, packages, and publish targets.
          </p>
        </div>
      </div>
    </div>
  )
}
