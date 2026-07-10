import { Suspense } from "react"

import { HomePrompt } from "@/modules/studio/components/home-prompt"

export default function HomePage() {
  return (
    <Suspense>
      <HomePrompt />
    </Suspense>
  )
}
