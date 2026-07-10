import {
  DEFAULT_RECENT_CHATS_VIEW,
  RECENT_CHATS_PREFS_KEY,
} from "@/modules/studio/lib/constants"

export type RecentChatsView = "recent" | "by-project"

function isRecentChatsView(value: unknown): value is RecentChatsView {
  return value === "recent" || value === "by-project"
}

export function loadRecentChatsView(): RecentChatsView {
  try {
    const raw = window.localStorage.getItem(RECENT_CHATS_PREFS_KEY)
    if (!raw) return DEFAULT_RECENT_CHATS_VIEW

    const parsed = JSON.parse(raw) as { view?: unknown }
    return isRecentChatsView(parsed.view)
      ? parsed.view
      : DEFAULT_RECENT_CHATS_VIEW
  } catch {
    return DEFAULT_RECENT_CHATS_VIEW
  }
}

export function persistRecentChatsView(view: RecentChatsView) {
  try {
    window.localStorage.setItem(
      RECENT_CHATS_PREFS_KEY,
      JSON.stringify({ view }),
    )
  } catch {
    // Ignore quota / private mode
  }
}
