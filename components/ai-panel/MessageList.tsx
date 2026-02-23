"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { Message } from "./types"
import { UserCommand } from "./UserCommand"
import { AIResponse } from "./AIResponse"
import { VersionHandle } from "./VersionHandle"
import { VersionHeader } from "./VersionHeader"
import { LocalHandle } from "./LocalHandle"
import { Unit } from "./Unit"

export interface MessageListProps {
  messages: Message[]
  mode: "default" | "compact"
  onVersionClick?: (versionNumber: number, user: string, timestamp: string) => void
}

/**
 * In compact mode we only show VersionHandles and LocalHandles.
 * In default mode we show full list with Units (user + AI + local) and standalone version handles.
 */
export function MessageList({
  messages,
  mode,
  onVersionClick,
}: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages])

  if (mode === "compact") {
    const compactItems = messages.filter(
      (m) => m.type === "version" || m.type === "local"
    )
    if (compactItems.length === 0) {
      return (
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-[13px] text-[#666666]">No versions or local edits yet.</p>
        </div>
      )
    }
    return (
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {compactItems.map((m, i) => {
          if (m.type === "version") {
            return (
              <motion.div
                key={`v-${m.versionNumber}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <VersionHeader versionNumber={m.versionNumber} />
                <VersionHandle
                  versionNumber={m.versionNumber}
                  user={m.user}
                  timestamp={m.timestamp}
                  onClick={() =>
                    onVersionClick?.(m.versionNumber, m.user, m.timestamp)
                  }
                />
              </motion.div>
            )
          }
          if (m.type === "local") {
            return (
              <motion.div
                key={`l-${m.label}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LocalHandle label={m.label} />
              </motion.div>
            )
          }
          return null
        })}
      </div>
    )
  }

  // Default mode: group consecutive user + ai + local into Units, render version standalone
  const elements: React.ReactNode[] = []
  let i = 0
  let unitIndex = 0

  while (i < messages.length) {
    const m = messages[i]

    if (m.type === "unit") {
      elements.push(
        <Unit key={m.id} messages={m.messages} index={unitIndex++} />
      )
      i++
      continue
    }

    if (m.type === "version") {
      elements.push(
        <motion.div
          key={`version-${m.versionNumber}-${i}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-1"
        >
          <VersionHeader versionNumber={m.versionNumber} />
          <VersionHandle
            versionNumber={m.versionNumber}
            user={m.user}
            timestamp={m.timestamp}
            onClick={() =>
              onVersionClick?.(m.versionNumber, m.user, m.timestamp)
            }
          />
        </motion.div>
      )
      i++
      continue
    }

    // Group consecutive user -> ai -> local into one Unit
    if (m.type === "user") {
      const unitMessages: Message[] = [m]
      let j = i + 1
      while (j < messages.length) {
        const next = messages[j]
        if (next.type === "ai" || next.type === "local") {
          unitMessages.push(next)
          j++
        } else break
      }
      elements.push(
        <Unit key={`unit-${i}`} messages={unitMessages} index={unitIndex++} />
      )
      i = j
      continue
    }

    // Standalone ai/local (e.g. thinking not yet grouped)
    if (m.type === "ai") {
      elements.push(
        <AIResponse key={`a-${i}`} text={m.text} status={m.status} />
      )
      i++
      continue
    }
    if (m.type === "local") {
      elements.push(<LocalHandle key={`l-${i}`} label={m.label} />)
      i++
      continue
    }

    i++
  }

  if (elements.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4">
        <p className="text-[13px] text-[#666666]">
          Ask for a change and click Apply to see the simulation.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
    >
      {elements}
    </div>
  )
}
