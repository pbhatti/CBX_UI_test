"use client"

import { History, SlidersHorizontal } from "lucide-react"

export interface AIHeaderProps {
  title?: string
  onCompactToggle?: () => void
  isCompact?: boolean
  showActions?: boolean
}

export function AIHeader({
  title = "Chat",
  isCompact = false,
  showActions = false,
}: AIHeaderProps) {
  return (
    <header className="shrink-0 border-b border-[#e5e5e5] bg-[#F8F8F8] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#303030]">{title}</h2>
        {showActions && !isCompact ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Filter chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F0F0] text-[#303030] transition-colors hover:bg-[#EAEAEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="View chat history"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F0F0] text-[#303030] transition-colors hover:bg-[#EAEAEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1"
            >
              <History className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
