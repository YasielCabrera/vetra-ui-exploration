import { Button } from "@/modules/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card"
import { isLightAccent } from "@/modules/studio/lib/is-light-accent"
import type { Integration } from "@/modules/studio/types"

type IntegrationCardProps = {
  integration: Integration
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <Card className="h-full ring-foreground/10">
      <CardHeader className="gap-3">
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-lg text-sm font-semibold text-white ring-1 ring-foreground/10"
          style={{
            backgroundColor: integration.accent,
            color: isLightAccent(integration.accent) ? "#1B1E24" : "#FFFFFF",
          }}
        >
          {integration.initial}
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle>{integration.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {integration.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button variant="outline" className="w-full">
          Connect
        </Button>
      </CardContent>
    </Card>
  )
}
