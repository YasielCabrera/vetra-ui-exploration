"use client"

import { useDeferredValue, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/modules/shared/components/ui/input"
import { IntegrationCard } from "@/modules/studio/components/integration-card"
import { INTEGRATIONS } from "@/modules/studio/lib/constants"

export function IntegrationsView() {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const filtered = INTEGRATIONS.filter((integration) => {
    if (!normalizedQuery) return true
    return (
      integration.name.toLowerCase().includes(normalizedQuery) ||
      integration.description.toLowerCase().includes(normalizedQuery)
    )
  })

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Discover pre-built integrations that let you connect to APIs,
            services, and tools to extend your app&apos;s capabilities.
          </p>
        </header>

        <div className="relative max-w-xl">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search integrations..."
            aria-label="Search integrations"
            className="h-9 pl-8"
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-medium tracking-tight">Connectors</h2>
            <p className="text-sm text-muted-foreground">
              Quick OAuth connections to popular services, supported by Vetra.
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="py-10 text-sm text-muted-foreground">
              No integrations match &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
