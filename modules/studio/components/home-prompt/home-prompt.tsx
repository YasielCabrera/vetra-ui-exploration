"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { ChatComposer } from "@/modules/studio/components/chat-composer"
import { FeatureColumns } from "@/modules/studio/components/feature-columns"
import { NEW_PRODUCT_VALUE } from "@/modules/studio/lib/constants"
import { useStudio } from "@/modules/studio/providers"

export function HomePrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { createSession, products } = useStudio()
  const productFromQuery = searchParams.get("product")
  const initialProductId =
    productFromQuery && products.some((product) => product.id === productFromQuery)
      ? productFromQuery
      : NEW_PRODUCT_VALUE
  const [productId, setProductId] = React.useState(initialProductId)

  React.useEffect(() => {
    if (
      productFromQuery &&
      products.some((product) => product.id === productFromQuery)
    ) {
      setProductId(productFromQuery)
    }
  }, [productFromQuery, products])

  return (
    <div className="home-prompt-mesh relative h-full min-h-0 overflow-y-auto">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-center gap-10 px-6 py-12 min-h-full">
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What product do you want to build?
            </h1>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              You&apos;ll build on the Powerhouse stack. Describe your product
              and Vetra sets up document models, editors, and drive apps.
            </p>
          </div>
          <ChatComposer
            autoFocus
            products={products}
            productId={productId}
            onProductChange={setProductId}
            onSubmit={(prompt, selectedProductId) => {
              const id = createSession(prompt, selectedProductId)
              router.push(`/session/${id}`)
            }}
            placeholder="Describe a Powerhouse product you want to build..."
          />
        </div>
        <FeatureColumns />
      </div>
    </div>
  )
}
