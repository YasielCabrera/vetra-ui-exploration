import { SessionView } from "@/modules/studio/components/session-view"

type SessionPageProps = {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params
  return <SessionView sessionId={id} />
}
