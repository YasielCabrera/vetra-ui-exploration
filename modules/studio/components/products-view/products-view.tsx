"use client"

import { useDeferredValue, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/modules/shared/components/ui/input"
import { ProductCard } from "@/modules/studio/components/product-card"
import { useStudio } from "@/modules/studio/providers"

export function ProductsView() {
  const { products } = useStudio()
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const filtered = products.filter((product) => {
    if (!normalizedQuery) return true
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.packageName.toLowerCase().includes(normalizedQuery)
    )
  })

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Browse generated products and packages from your Ideate sessions.
            Open a product to inspect its project details.
          </p>
        </header>

        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="h-9 pl-8"
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-medium tracking-tight">Projects</h2>
            <p className="text-sm text-muted-foreground">
              Each product is a generated project you can open, edit, and
              publish.
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="py-10 text-sm text-muted-foreground">
              No products match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
