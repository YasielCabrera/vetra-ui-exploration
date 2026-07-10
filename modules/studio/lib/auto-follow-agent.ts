import {
  AUTO_FOLLOW_AGENT_KEY,
  DEFAULT_AUTO_FOLLOW_AGENT,
} from "@/modules/studio/lib/constants"

export function loadAutoFollowAgent(): boolean {
  try {
    const raw = window.localStorage.getItem(AUTO_FOLLOW_AGENT_KEY)
    if (raw === null) return DEFAULT_AUTO_FOLLOW_AGENT
    return raw === "true"
  } catch {
    return DEFAULT_AUTO_FOLLOW_AGENT
  }
}

export function persistAutoFollowAgent(enabled: boolean) {
  try {
    window.localStorage.setItem(AUTO_FOLLOW_AGENT_KEY, String(enabled))
  } catch {
    // Ignore quota / private mode
  }
}
