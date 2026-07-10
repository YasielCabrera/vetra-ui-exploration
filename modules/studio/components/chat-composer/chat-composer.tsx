"use client"

import * as React from "react"
import { ArrowUpIcon, FootprintsIcon, PaperclipIcon, PlusIcon } from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/modules/shared/components/ui/select"
import { Textarea } from "@/modules/shared/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/shared/components/ui/tooltip"
import { cn } from "@/modules/shared/lib/utils"
import {
  loadAutoFollowAgent,
  persistAutoFollowAgent,
} from "@/modules/studio/lib/auto-follow-agent"
import {
  DEFAULT_AUTO_FOLLOW_AGENT,
  NEW_PRODUCT_VALUE,
} from "@/modules/studio/lib/constants"
import type { Product } from "@/modules/studio/types"

function NewProductLabel({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-muted/60 text-foreground",
          compact ? "size-4" : "size-7",
        )}
      >
        <PlusIcon className={compact ? "size-2.5" : "size-3.5"} />
      </span>
      {compact ? (
        <span>New Product</span>
      ) : (
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="font-medium leading-none">New Product</span>
          <span className="text-xs leading-none text-muted-foreground">
            Start a blank product
          </span>
        </span>
      )}
    </span>
  )
}

type ChatComposerProps = {
  placeholder?: string
  disabled?: boolean
  products: Product[]
  productId: string
  productLocked?: boolean
  onProductChange?: (productId: string) => void
  onSubmit: (value: string, productId: string) => void
  className?: string
  autoFocus?: boolean
  toolbarStart?: React.ReactNode
  onAutoFollowAgentChange?: (enabled: boolean) => void
}

export function ChatComposer({
  placeholder = "Describe the product you want to build...",
  disabled = false,
  products,
  productId,
  productLocked = false,
  onProductChange,
  onSubmit,
  className,
  autoFocus = false,
  toolbarStart,
  onAutoFollowAgentChange,
}: ChatComposerProps) {
  const [value, setValue] = React.useState("")
  const [autoFollowAgent, setAutoFollowAgent] = React.useState(
    DEFAULT_AUTO_FOLLOW_AGENT,
  )

  React.useEffect(() => {
    setAutoFollowAgent(loadAutoFollowAgent())
  }, [])

  const selectedProduct = products.find((product) => product.id === productId)
  const selectDisabled = disabled || productLocked

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed, productId)
    setValue("")
  }

  function handleAutoFollowToggle() {
    setAutoFollowAgent((current) => {
      const next = !current
      persistAutoFollowAgent(next)
      onAutoFollowAgentChange?.(next)
      return next
    })
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className="min-h-28 resize-none border-0 bg-transparent px-4 pt-4 pb-3 shadow-none focus-visible:ring-0"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
          }
        }}
      />
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            aria-label="Add files"
          >
            <PaperclipIcon />
          </Button>
          {toolbarStart}
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={productId}
            onValueChange={onProductChange}
            disabled={selectDisabled}
          >
            <SelectTrigger
              size="sm"
              className="max-w-56"
              aria-label="Product"
            >
              <SelectValue
                placeholder="New Product"
                aria-label={
                  productId === NEW_PRODUCT_VALUE
                    ? "New Product"
                    : selectedProduct?.name
                }
              >
                {productId === NEW_PRODUCT_VALUE ? (
                  <NewProductLabel compact />
                ) : (
                  (selectedProduct?.name ?? "Product")
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              position="popper"
              align="end"
              className="min-w-[16rem]"
            >
              <SelectItem
                value={NEW_PRODUCT_VALUE}
                className="items-start py-2 pr-8"
              >
                <NewProductLabel />
              </SelectItem>
              {products.length > 0 ? (
                <>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Existing products</SelectLabel>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </>
              ) : null}
            </SelectContent>
          </Select>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Auto follow agent"
                aria-pressed={autoFollowAgent}
                onClick={handleAutoFollowToggle}
                className={cn(
                  autoFollowAgent
                    ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                    : "text-muted-foreground",
                )}
              >
                <FootprintsIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Auto follow agent</TooltipContent>
          </Tooltip>
          <Button
            type="button"
            size="icon"
            disabled={disabled || !value.trim()}
            onClick={handleSubmit}
            aria-label="Send message"
            className="rounded-full"
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
