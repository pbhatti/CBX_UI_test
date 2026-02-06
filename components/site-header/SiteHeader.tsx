"use client"

import { Button } from "@/components/ui/button"

export interface SiteHeaderProps {
  /** Page title. */
  title?: string
  /** Primary action (e.g. "Create initiative"). */
  primaryAction?: { label: string; onClick: () => void }
  /** Extra node to the right of title. */
  children?: React.ReactNode
}

export function SiteHeader({ title = "Initiatives", primaryAction, children }: SiteHeaderProps) {
  return (
    <div className="px-6 py-4 shrink-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#121212]">{title}</h1>
        <div className="flex items-center gap-2">
          {children}
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-black text-white hover:bg-black/90 h-8 px-3 text-sm font-medium rounded-lg"
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
