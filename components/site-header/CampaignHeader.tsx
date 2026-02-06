"use client"

import { ArrowLeft, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AppIcon } from "@/components/ui/icon"

export function CampaignHeader() {
  return (
    <div className="border-b border-[#DEDEDE] bg-white shrink-0">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <AppIcon size="md">
              <ArrowLeft className="h-5 w-5 text-[#303030] cursor-pointer hover:text-[#121212]" />
            </AppIcon>
          </Link>
          <h1 className="text-xl font-medium text-[#121212]">The Future of Campaign Automation</h1>
          <span className="px-2.5 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-xs font-medium rounded-full">
            Draft
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="bg-[#EAEAEA] text-[#B0B0B0] hover:bg-[#E0E0E0] h-9 px-4 text-sm font-medium"
          >
            Publish
          </Button>
          <button className="p-1.5 hover:bg-[#EAEAEA] rounded-lg transition-colors">
            <AppIcon size="md">
              <MoreVertical className="h-5 w-5 text-[#303030]" />
            </AppIcon>
          </button>
        </div>
      </div>
      <div className="px-6 flex items-center gap-6 border-t border-[#F6F6F6]">
        <button className="py-3 px-1 text-sm text-[#767676] hover:text-[#121212] transition-colors">
          Overview
        </button>
        <button className="py-3 px-1 text-sm text-[#767676] hover:text-[#121212] transition-colors">
          Target audience
        </button>
        <button className="py-3 px-1 text-sm text-[#121212] font-medium border-b-2 border-[#121212]">
          Journey
        </button>
      </div>
    </div>
  )
}
