"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { ChatComposer } from "@/modules/studio/components/chat-composer"
import { FeatureColumns } from "@/modules/studio/components/feature-columns"
import { NEW_PRODUCT_VALUE } from "@/modules/studio/lib/constants"
import { useStudio } from "@/modules/studio/providers"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

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
      <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-6 pt-12 pb-4">
        <div className="flex flex-1 flex-col justify-center gap-10">
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What{" "}
                <span className="home-prompt-accent">product</span> do you want
                to build?
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
        <footer className="mt-auto pt-10 text-center text-xs text-muted-foreground">
          <p>
            Vetra Studio is{" "}
            <a
              href="https://github.com/powerhouse-inc/vetra-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              <GitHubIcon className="mr-1 inline size-3 align-[-0.125em]" />
              100% open source
            </a>{" "}
            made with love by{" "}
            <a
              href="https://www.powerhouse.inc/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Powerhouse
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  )
}
