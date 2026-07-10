"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { ChatComposer } from "@/modules/studio/components/chat-composer"
import { FeatureColumns } from "@/modules/studio/components/feature-columns"
import { NEW_PRODUCT_VALUE } from "@/modules/studio/lib/constants"
import { useStudio } from "@/modules/studio/providers"

export function HomePrompt() {
  const router = useRouter()
  const { createSession, products } = useStudio()
  const [productId, setProductId] = React.useState(NEW_PRODUCT_VALUE)

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center gap-10 px-6 py-12 min-h-full">
        <div className="space-y-6">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What product do you want to build?
          </h1>
          <ChatComposer
            autoFocus
            products={products}
            productId={productId}
            onProductChange={setProductId}
            onSubmit={(prompt, selectedProductId) => {
              const id = createSession(prompt, selectedProductId)
              router.push(`/session/${id}`)
            }}
            placeholder="Describe the product you want to build..."
          />
        </div>
        <FeatureColumns />
      </div>
    </div>
  )
}
