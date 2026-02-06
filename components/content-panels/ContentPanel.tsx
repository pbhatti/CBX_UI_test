"use client"

import { cn } from "@/lib/utils"

export interface ContentPanelProps {
  children: React.ReactNode
  className?: string
  /** Optional padding; default is none (caller controls). */
  padded?: boolean
}

/**
 * Wrapper for a content block in the main area or a side panel.
 * Use for consistent borders and background when needed.
 */
export function ContentPanel({ children, className, padded }: ContentPanelProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-[#DEDEDE] overflow-hidden",
        padded && "p-4",
        className
      )}
    >
      {children}
    </div>
  )
}
