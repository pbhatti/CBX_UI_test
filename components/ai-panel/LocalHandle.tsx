"use client"

import { AppIcon } from "@/components/ui/icon"
import { Pencil, Clock } from "lucide-react"
import type { LocalHandleLabel } from "./types"

export interface LocalHandleProps {
  label: LocalHandleLabel
  timestamp?: string
}

const LABEL_DISPLAY: Record<LocalHandleLabel, string> = {
  Default: "Default",
  Condensed: "Condensed",
  Restored: "Restored",
}

export function LocalHandle({
  label,
  timestamp = "Today, 10:45am",
}: LocalHandleProps) {
  const isRestored = label === "Restored"

  return (
    <div className="flex items-center gap-2 w-full rounded-lg bg-[#f0f0f0] px-3 py-2 border border-[#e5e5e5]">
      <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded bg-[#e5e5e5]">
        <AppIcon size="xs">
          {isRestored ? (
            <Clock className="w-3 h-3 text-[#505050]" />
          ) : (
            <Pencil className="w-3 h-3 text-[#505050]" />
          )}
        </AppIcon>
      </div>
      <span className="text-[12px] font-medium text-[#303030] flex-1">
        {LABEL_DISPLAY[label]}
      </span>
      <span className="text-[11px] text-[#666666]">{timestamp}</span>
      <span className="text-[#999]">›</span>
    </div>
  )
}
