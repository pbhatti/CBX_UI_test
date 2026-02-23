"use client"

import { useState, useCallback, useRef, forwardRef, useImperativeHandle } from "react"
import { AIHeader } from "./AIHeader"
import { MessageList } from "./MessageList"
import { InputBox } from "./InputBox"
import type { Message } from "./types"

const AI_PANEL_WIDTH = 360
const THINKING_DELAY_MS = 1200
const MOCK_AI_RESPONSE =
  "Shortened the text and included the account name for clarity."
const MOCK_USER_NAME = "You"
const MOCK_TIMESTAMP = () =>
  new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

export type AIPanelMode = "default" | "compact"

export interface AIPanelHandle {
  appendAIMessage: (text: string) => void
}

export interface AIPanelProps {
  mode?: AIPanelMode
  className?: string
  /** When in edit mode with block selection: which block is selected (enables Apply-to-block flow). */
  selectedBlockId?: string | null
  /** Disable input/Apply while block is in thinking or updating. */
  isBlockThinking?: boolean
  /** When provided, submit applies to the selected block (block-edit flow). Parent runs thinking → replace → then calls appendAIMessage. */
  onApplyToBlock?: (prompt: string) => void
  /** Optional ref to focus chat input when a block is selected. */
  inputRef?: React.RefObject<HTMLTextAreaElement>
}

export const AIPanel = forwardRef<AIPanelHandle, AIPanelProps>(function AIPanel(
  {
    mode: modeProp = "default",
    className,
    selectedBlockId,
    isBlockThinking = false,
    onApplyToBlock,
    inputRef: inputRefProp,
  },
  ref
) {
  const [messages, setMessages] = useState<Message[]>([])
  const [mode] = useState<AIPanelMode>(modeProp)
  const applyCountRef = useRef(0)
  const internalInputRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = inputRefProp ?? internalInputRef

  useImperativeHandle(
    ref,
    () => ({
      appendAIMessage(text: string) {
        setMessages((prev) => [...prev, { type: "ai", text }])
      },
    }),
    []
  )

  const handleSubmit = useCallback(
    (text: string) => {
      const useBlockFlow = onApplyToBlock && selectedBlockId

      if (useBlockFlow) {
        setMessages((prev) => [...prev, { type: "user", text }])
        onApplyToBlock(text)
        return
      }

      applyCountRef.current += 1
      const isThird = applyCountRef.current % 3 === 0

      setMessages((prev) => [...prev, { type: "user", text }])
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "", status: "thinking" as const },
      ])

      setTimeout(() => {
        setMessages((prev) => {
          const next = [...prev]
          let thinkingIndex = -1
          for (let i = next.length - 1; i >= 0; i--) {
            const msg = next[i]
            if (msg.type === "ai") {
              if (msg.status === "thinking") {
                thinkingIndex = i
                break
              }
            }
          }
          if (thinkingIndex !== -1) {
            next[thinkingIndex] = {
              type: "ai",
              text: MOCK_AI_RESPONSE,
            }
          }
          next.push({ type: "local", label: "Default" })
          return next
        })
      }, THINKING_DELAY_MS)

      if (isThird) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: "version",
              versionNumber: Math.ceil(applyCountRef.current / 3),
              user: MOCK_USER_NAME,
              timestamp: MOCK_TIMESTAMP(),
            },
          ])
        }, THINKING_DELAY_MS + 100)
      }
    },
    [onApplyToBlock, selectedBlockId]
  )

  const handleVersionClick = useCallback(
    (versionNumber: number, user: string, timestamp: string) => {
      console.log("VersionHandle clicked", { versionNumber, user, timestamp })
    },
    []
  )

  const inputDisabled =
    isBlockThinking || (onApplyToBlock != null && !selectedBlockId)

  return (
    <div
      className={`ai-panel flex flex-col h-full bg-[#F8F8F8] border-l border-[#e5e5e5] ${className ?? ""}`}
      style={{ width: AI_PANEL_WIDTH, minWidth: AI_PANEL_WIDTH }}
    >
      <AIHeader title="AI Assistant" isCompact={mode === "compact"} />
      <MessageList
        messages={messages}
        mode={mode}
        onVersionClick={handleVersionClick}
      />
      {mode === "default" && (
        <InputBox
          ref={inputRef}
          onSubmit={handleSubmit}
          placeholder="What change do you want to make?"
          disabled={inputDisabled}
          applyEnabledWhenEmpty={!!(onApplyToBlock && selectedBlockId)}
        />
      )}
    </div>
  )
})

export { AI_PANEL_WIDTH }
