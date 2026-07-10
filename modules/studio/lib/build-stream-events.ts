import type { StreamEvent } from "@/modules/studio/types"

function event(
  partial: Omit<StreamEvent, "id"> & { id?: string },
  index: number,
): StreamEvent {
  return {
    id: partial.id ?? `evt-${index}`,
    ...partial,
  }
}

export function buildStreamEvents(prompt: string): StreamEvent[] {
  const slug = slugify(prompt)
  const projectName = slug || "new-product"

  return [
    event(
      {
        kind: "user",
        content: prompt,
        delayMs: 0,
      },
      0,
    ),
    event(
      {
        kind: "skill-use",
        content: "document-modeling",
        status: "running",
        delayMs: 450,
      },
      1,
    ),
    event(
      {
        kind: "skill-use",
        content: "document-editor-creation",
        status: "running",
        delayMs: 320,
      },
      2,
    ),
    event(
      {
        kind: "skill-use",
        content: "drive-app-creation",
        status: "running",
        delayMs: 280,
      },
      3,
    ),
    event(
      {
        kind: "skill-use",
        content: "deploy",
        status: "running",
        delayMs: 260,
      },
      4,
    ),
    event(
      {
        kind: "skill-read",
        content: "document-modeling",
        delayMs: 500,
      },
      5,
    ),
    event(
      {
        kind: "tool",
        content: "reactor-project-ls",
        status: "success",
        delayMs: 420,
      },
      6,
    ),
    event(
      {
        kind: "text",
        content: `${projectName} already exists. Let me check its current state.`,
        delayMs: 600,
      },
      7,
    ),
    event(
      {
        kind: "tool",
        content: `spec-list ${projectName}`,
        status: "success",
        delayMs: 480,
      },
      8,
    ),
    event(
      {
        kind: "tool",
        content: "reactor-project-ps",
        status: "success",
        delayMs: 360,
      },
      9,
    ),
    event(
      {
        kind: "text",
        content:
          "The project is running. Let me check the current state of the specs and what's been generated.",
        delayMs: 700,
      },
      10,
    ),
    event(
      {
        kind: "file-list",
        content: `List ${projectName}`,
        meta: `/document-models/${projectName}/v1`,
        status: "success",
        delayMs: 520,
      },
      11,
    ),
    event(
      {
        kind: "skill-read",
        content: "document-editor-creation",
        delayMs: 400,
      },
      12,
    ),
    event(
      {
        kind: "file-list",
        content: `List ${projectName}/editors`,
        meta: `/editors/${projectName}-editor`,
        status: "success",
        delayMs: 480,
      },
      13,
    ),
    event(
      {
        kind: "text",
        content:
          "Document model and editor scaffolds look healthy. Next I'll wire the remaining requirements, then prepare a publish to your environment.",
        delayMs: 800,
      },
      14,
    ),
    event(
      {
        kind: "tool",
        content: `reactor-generate ${projectName}`,
        status: "success",
        delayMs: 650,
      },
      15,
    ),
    event(
      {
        kind: "skill-use",
        content: "deploy",
        status: "success",
        delayMs: 700,
      },
      16,
    ),
    event(
      {
        kind: "text",
        content:
          "Preview is ready on the right. Review the generated app, then hit Publish when you want it live on Vetra Cloud.",
        delayMs: 550,
      },
      17,
    ),
  ]
}

function slugify(value: string): string {
  const cleaned = value
    .toLowerCase()
    .replace(
      /^(continue the implementation of my project:|create a new|create|build|scaffold|design|make)\s+/i,
      "",
    )
    .replace(/^(a|an|the)\s+/i, "")
    .replace(/\s+(project|app|product)\b.*$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32)
  return cleaned || "new-product"
}

export function titleFromPrompt(prompt: string): string {
  const cleaned = prompt.trim().replace(/\s+/g, " ")
  if (cleaned.length <= 42) return cleaned || "New session"
  return `${cleaned.slice(0, 39)}...`
}
