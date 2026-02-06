"use client"

import { CampaignHeader } from "@/components/site-header"
import { JourneyCanvas } from "@/components/journey-canvas"

export interface CampaignsViewProps {
  isLinkedInAd4Configured?: boolean
}

/**
 * Composed Campaigns screen: campaign header + journey canvas.
 */
export function CampaignsView({ isLinkedInAd4Configured }: CampaignsViewProps) {
  return (
    <>
      <CampaignHeader />
      <div className="flex-1 min-h-0 flex flex-col overflow-auto h-full">
        <div className="flex-1 min-h-0 w-full">
          <JourneyCanvas isLinkedInAd4Configured={isLinkedInAd4Configured} />
        </div>
      </div>
    </>
  )
}
