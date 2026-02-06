"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { CampaignsView } from "@/components/layout"
import { BackgroundGradient } from "@/components/background-gradient"
import { AnimatePresence } from "framer-motion"

export default function CampaignsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isBackgroundGradientOpen, setIsBackgroundGradientOpen] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [isLinkedInAd4Configured, setIsLinkedInAd4Configured] = useState(false)

  return (
    <>
      <AppLayout
        showLeftNav={!isNavHidden}
        isLeftNavCollapsed={isSidebarCollapsed}
        onLeftNavToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onBackgroundGradientClick={() => setIsBackgroundGradientOpen(true)}
        currentPage="campaigns"
      >
        <CampaignsView isLinkedInAd4Configured={isLinkedInAd4Configured} />
      </AppLayout>

      <AnimatePresence>
        {isBackgroundGradientOpen && (
          <BackgroundGradient
            onClose={() => {
              setIsBackgroundGradientOpen(false)
              setIsNavHidden(false)
              setIsLinkedInAd4Configured(true)
            }}
            onHideNav={() => setIsNavHidden(true)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
