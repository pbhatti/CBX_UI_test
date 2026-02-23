"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

/** Delay between each word during streaming (~30–50ms, tuneable). */
const STREAMING_WORD_DELAY_MS = 40


export type EditableBlockId = "headline" | "body" | "cta"

export interface EditableTextBlockProps {
  blockId: EditableBlockId
  children: string
  className?: string
  isSelected: boolean
  /** Phase 1: purple shimmer over old text, no streaming. */
  isThinking: boolean
  /** Phase 2: old text cleared, new text streams in word-by-word with overlay. */
  isStreaming: boolean
  /** Phase 3: overlay fades out. */
  isFading: boolean
  /** Full new text to stream word-by-word when isStreaming. */
  streamingText?: string
  /** Called once when streaming has shown the last word. */
  onStreamingComplete?: () => void
  onSelect: () => void
}

export function EditableTextBlock({
  blockId,
  children,
  className,
  isSelected,
  isThinking,
  isStreaming,
  isFading,
  streamingText,
  onStreamingComplete,
  onSelect,
}: EditableTextBlockProps) {
  const showOverlay = isThinking || isStreaming || isFading
  const [visibleWordCount, setVisibleWordCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)

  const words = streamingText != null ? streamingText.split(/\s+/).filter(Boolean) : []
  const streamingVisible =
    words.length > 0 && visibleWordCount > 0
      ? words.slice(0, visibleWordCount).join(" ")
      : ""

  useEffect(() => {
    if (!isStreaming || !streamingText || words.length === 0) {
      setVisibleWordCount(0)
      completedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    const totalWords = words.length
    setVisibleWordCount(0)
    completedRef.current = false

    let count = 0
    intervalRef.current = setInterval(() => {
      count += 1
      setVisibleWordCount((prev) => {
        const next = Math.min(prev + 1, totalWords)
        if (next >= totalWords && !completedRef.current) {
          completedRef.current = true
          onStreamingComplete?.()
        }
        return next
      })
      if (count >= totalWords && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, STREAMING_WORD_DELAY_MS)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isStreaming, streamingText, onStreamingComplete])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "relative outline-none cursor-pointer transition-[box-shadow,background-color]",
        showOverlay && "aiThinking",
        isFading && "aiThinkingFade",
        "aiBlockBorder",
        showOverlay && "aiBlockBorderOverlay",
        !showOverlay && !isSelected && "aiBlockBorderHover",
        !showOverlay && !isSelected && "hover:bg-[#E5F5FF]/30",
        className
      )}
      aria-label={`Select ${blockId} block for editing`}
    >
      {/* Phase 1 (thinking): old text only. Phase 2 (streaming): hide old text. Phase 3 (fade): new text (children). */}
      {/* aiThinking::before + ::after alternate fade overlay when showOverlay */}
      {!isStreaming && (
        <span className={cn("relative z-10", isThinking && "opacity-50")}>
          {children}
        </span>
      )}
      {/* Phase 2: word-by-word streaming text */}
      {isStreaming && streamingText != null && (
        <span className="relative z-10">
          {streamingVisible}
        </span>
      )}
    </div>
  )
}
