"use client"

import { LeftNav, LEFT_NAV_COLLAPSED, LEFT_NAV_EXPANDED } from "@/components/left-nav"
import { MainColumn } from "./MainColumn"
import { cn } from "@/lib/utils"

export interface AppLayoutProps {
  /** When false, left nav is hidden (e.g. full-screen flow). */
  showLeftNav?: boolean
  /** When true, nav is collapsed (64px). */
  isLeftNavCollapsed?: boolean
  onLeftNavToggle?: () => void
  onBackgroundGradientClick?: () => void
  currentPage?: "initiatives" | "campaigns"
  /** Main column: site header + scrollable content. */
  children: React.ReactNode
  className?: string
}

/**
 * Root layout: optional LeftNav + main column (header + content).
 * See docs/architecture.md for width/height splits.
 */
export function AppLayout({
  showLeftNav = true,
  isLeftNavCollapsed = false,
  onLeftNavToggle,
  onBackgroundGradientClick,
  currentPage,
  children,
  className,
}: AppLayoutProps) {
  return (
    <div className={cn("flex h-screen overflow-hidden bg-white", className)}>
      {showLeftNav && (
        <>
          <LeftNav
            isCollapsed={isLeftNavCollapsed}
            onToggle={onLeftNavToggle ?? (() => {})}
            onBackgroundGradientClick={onBackgroundGradientClick}
            currentPage={currentPage}
          />
          <MainColumn isLeftNavCollapsed={isLeftNavCollapsed}>{children}</MainColumn>
        </>
      )}
      {!showLeftNav && (
        <div className="flex-1 flex flex-col overflow-hidden w-full">{children}</div>
      )}
    </div>
  )
}

export { LEFT_NAV_EXPANDED, LEFT_NAV_COLLAPSED }
