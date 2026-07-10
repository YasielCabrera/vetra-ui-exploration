"use client"

import { getProductIdeation } from "@/modules/studio/mocks/seed-ideation"
import { useStudio } from "@/modules/studio/providers"

import { FeaturesList } from "./features-list"
import { IdentitySheetCard } from "./identity-sheet-card"

const DEFAULT_IDEATE_PRODUCT_ID = "product-invoice-approval"

export function IdeateView() {
  const { getProduct, products } = useStudio()
  const product =
    getProduct(DEFAULT_IDEATE_PRODUCT_ID) ?? products[0] ?? null

  if (!product) {
    return (
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10">
          <h1 className="text-2xl font-semibold tracking-tight">Ideate</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            No products yet. Start a new chat to generate product identity and
            features.
          </p>
        </div>
      </div>
    )
  }

  const ideation = getProductIdeation(product)

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold tracking-tight">
            Product Identity
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {ideation.sheets.map((sheet) => (
              <IdentitySheetCard key={sheet.kind} sheet={sheet} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold tracking-tight">Features</h2>
          <FeaturesList features={ideation.features} />
        </section>
      </div>
    </div>
  )
}
