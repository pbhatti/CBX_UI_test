"use client"

export interface AIHeaderProps {
  title?: string
  onCompactToggle?: () => void
  isCompact?: boolean
}

export function AIHeader({
  title = "AI Assistant",
  isCompact = false,
}: AIHeaderProps) {
  return (
    <header className="shrink-0 px-4 py-3 border-b border-[#e5e5e5] bg-[#F8F8F8]">
      <h2 className="text-sm font-semibold text-[#303030]">{title}</h2>
    </header>
  )
}
