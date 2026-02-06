"use client"

import { SiteHeader } from "@/components/site-header"

/** @deprecated Prefer SiteHeader from @/components/site-header. */
export interface HeaderProps {
  onCreateInitiative: () => void
}

export function Header({ onCreateInitiative }: HeaderProps) {
  return (
    <SiteHeader
      title="Initiatives"
      primaryAction={{ label: "Create initiative", onClick: onCreateInitiative }}
    />
  )
}
