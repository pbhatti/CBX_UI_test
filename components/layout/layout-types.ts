/**
 * Shared layout types. See docs/architecture.md for structure.
 */

export type LeftNavWidth = 240 | 64

export interface AppLayoutProps {
  /** Left nav expanded width in px. */
  leftNavExpandedWidth?: number
  /** Left nav collapsed width in px. */
  leftNavCollapsedWidth?: number
  /** Whether left nav is collapsed. */
  isLeftNavCollapsed?: boolean
  /** Callback when left nav toggle is used. */
  onLeftNavToggle?: () => void
  /** Hide entire left nav (e.g. in full-screen flows). */
  hideLeftNav?: boolean
  /** Main column content: site header + main area. */
  children: React.ReactNode
}

export interface MainColumnProps {
  /** Offset from left (nav width). */
  marginLeft?: number
  children: React.ReactNode
  className?: string
}
