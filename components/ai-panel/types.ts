/**
 * Message types for AI Chat Panel (simulation only).
 */

export type Message =
  | { type: "user"; text: string }
  | { type: "ai"; text: string; status?: "thinking" }
  | { type: "version"; versionNumber: number; user: string; timestamp: string }
  | { type: "local"; label: "Default" | "Condensed" | "Restored" }
  | { type: "unit"; id: string; messages: Message[] }

export type LocalHandleLabel = "Default" | "Condensed" | "Restored"
