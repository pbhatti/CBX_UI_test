"use client"

export interface VersionHeaderProps {
  versionNumber: number
}

export function VersionHeader({ versionNumber }: VersionHeaderProps) {
  return (
    <p className="text-[11px] font-medium text-[#888888] uppercase tracking-wide pt-1">
      Started Version {versionNumber}
    </p>
  )
}
