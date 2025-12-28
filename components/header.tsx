"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  onCreateInitiative: () => void
}

export function Header({ onCreateInitiative }: HeaderProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#121212]">Initiatives</h1>
        <Button 
          onClick={onCreateInitiative}
          className="bg-black text-white hover:bg-black/90 h-8 px-3 text-sm font-medium rounded-lg"
        >
          Create initiative
        </Button>
      </div>
    </div>
  )
}

