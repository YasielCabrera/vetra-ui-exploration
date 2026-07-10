import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/shared/components/ui/card"
import type { IdentitySheet } from "@/modules/studio/types"

type IdentitySheetCardProps = {
  sheet: IdentitySheet
}

export function IdentitySheetCard({ sheet }: IdentitySheetCardProps) {
  return (
    <Card className="ring-foreground/10">
      <CardHeader className="gap-1">
        <CardTitle className="font-semibold">{sheet.title}</CardTitle>
        <CardDescription>{sheet.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
