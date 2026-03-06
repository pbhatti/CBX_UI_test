"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Lock, MessageSquare, Copy, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

/** Delay between each word during streaming (~30–50ms, tuneable). */
const STREAMING_WORD_DELAY_MS = 40


export type EditableBlockId = "headline" | "body" | "cta"

export interface EditableTextBlockProps {
  blockId: EditableBlockId
  children: string
  className?: string
  isSelectable?: boolean
  showBlockToolbar?: boolean
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
  isSelectable = true,
  showBlockToolbar = false,
  isSelected,
  isThinking,
  isStreaming,
  isFading,
  streamingText,
  onStreamingComplete,
  onSelect,
}: EditableTextBlockProps) {
  const showOverlay = isThinking || isStreaming || isFading
  const isToolbarVisible = isSelectable && showBlockToolbar && isSelected && !showOverlay
  const [visibleWordCount, setVisibleWordCount] = useState(0)
  const [toolbarPosition, setToolbarPosition] = useState<{ left: number; top: number } | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)
  const blockRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const shouldShowToolbar = isToolbarVisible
    if (!shouldShowToolbar) {
      setToolbarPosition(null)
      return
    }

    const updateToolbarPosition = () => {
      const rect = blockRef.current?.getBoundingClientRect()
      if (!rect) return
      setToolbarPosition({
        left: rect.right + 16,
        top: rect.top,
      })
    }

    const rafId = window.requestAnimationFrame(updateToolbarPosition)
    window.addEventListener("resize", updateToolbarPosition)
    window.addEventListener("scroll", updateToolbarPosition, true)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("resize", updateToolbarPosition)
      window.removeEventListener("scroll", updateToolbarPosition, true)
    }
  }, [isToolbarVisible])

  return (
    <div className="relative overflow-visible">
      <div
        ref={blockRef}
        role={isSelectable ? "button" : undefined}
        tabIndex={isSelectable ? 0 : undefined}
        onClick={isSelectable ? onSelect : undefined}
        onKeyDown={(e) => {
          if (!isSelectable) return
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect()
          }
        }}
        className={cn(
          "relative transition-[box-shadow,background-color] p-1",
          isSelectable ? "outline-none cursor-pointer" : "cursor-default",
          showOverlay && "aiThinking",
          isFading && "aiThinkingFade",
          isSelectable && "aiBlockBorder",
          showOverlay && "aiBlockBorderOverlay",
          isSelectable && !showOverlay && !isSelected && "aiBlockBorderHover",
          isSelectable && !showOverlay && !isSelected && "hover:bg-[#E5F5FF]/30",
          className
        )}
        aria-label={isSelectable ? `Select ${blockId} block for editing` : undefined}
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

      {isMounted && isToolbarVisible && toolbarPosition &&
        createPortal(
          <div
            className="fixed z-[80] rounded-lg border border-[#F6F6F6] bg-white p-1 shadow-[0px_4px_8px_0px_rgba(18,18,18,0.12)]"
            style={{ left: toolbarPosition.left, top: toolbarPosition.top }}
          >
            <div className="flex flex-col gap-1">
              {[
                { icon: MessageSquare, label: "Comment on block" },
                { icon: Tag, label: "Tag block" },
                { icon: Copy, label: "Duplicate block" },
                { icon: Lock, label: "Lock block" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={`${blockId}-${label}`}
                  type="button"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-[4px] hover:bg-[#F6F6F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <span className="flex h-4 w-4 items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-[#303030]" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
