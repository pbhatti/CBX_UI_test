"use client"

import { AppIcon } from "@/components/ui/icon"
import { Clock } from "lucide-react"

export interface VersionHandleProps {
  versionNumber: number
  user: string
  timestamp: string
  isViewing?: boolean
  onClick?: () => void
}

export function VersionHandle({
  versionNumber,
  user,
  timestamp,
  isViewing = false,
  onClick,
}: VersionHandleProps) {
  const handleClick = () => {
    if (onClick) onClick()
    else console.log("VersionHandle clicked", { versionNumber, user, timestamp })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left rounded-lg border border-[#e5e5e5] bg-white p-3 hover:bg-[#f5f5f5] transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-md bg-[#f0f0f0]">
          <AppIcon size="sm">
            <Clock className="w-4 h-4 text-[#505050]" />
          </AppIcon>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-medium text-[#303030]">
              Version {versionNumber}
            </span>
            {isViewing && (
              <span className="text-[11px] font-medium text-[#666] bg-[#eee] px-1.5 py-0.5 rounded">
                Viewing
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#666666] mt-0.5">{timestamp}</p>
          <div
            className="flex items-center gap-2 mt-1.5 cursor-default"
            title={`${user} • ${timestamp}`}
          >
            <div className="w-5 h-5 rounded-full bg-[#d4eefe] flex items-center justify-center shrink-0 border border-[#e5e5e5]">
              <span className="text-[10px] text-[#00273f] font-medium">
                {user.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[12px] text-[#666666] truncate">{user}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
