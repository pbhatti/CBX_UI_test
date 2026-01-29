"use client"

import { useState } from "react"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { CampaignHeader } from "@/components/campaign-header"
import { JourneyCanvas } from "@/components/journey-canvas"
import { BackgroundGradient } from "@/components/background-gradient"
import { motion, AnimatePresence } from "framer-motion"

export default function CampaignsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isBackgroundGradientOpen, setIsBackgroundGradientOpen] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [isLinkedInAd4Configured, setIsLinkedInAd4Configured] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      {!isNavHidden && (
        <>
          <NavigationSidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            onBackgroundGradientClick={() => setIsBackgroundGradientOpen(true)}
            currentPage="campaigns"
          />
          <motion.div
            initial={false}
            animate={{
              marginLeft: isSidebarCollapsed ? 64 : 240,
            }}
            className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
          >
            <CampaignHeader />
            <JourneyCanvas isLinkedInAd4Configured={isLinkedInAd4Configured} />
          </motion.div>
        </>
      )}
      
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
    </div>
  )
}

