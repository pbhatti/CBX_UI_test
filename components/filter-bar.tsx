"use client"

import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function FilterBar() {
  return (
    <div className="bg-white border-b border-[#eaeaea] px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FilterPill label="Name" />
        <FilterPill label="Status" />
        <FilterPill label="Product" />
        <FilterPill label="Created by" />
      </div>
      <Button
        variant="outline"
        className="h-7 px-2 text-xs font-medium border-[#eaeaea] bg-white hover:bg-[#eaeaea] rounded-lg"
      >
        <span>Add filter</span>
        <Plus className="h-3 w-3 ml-1" />
      </Button>
    </div>
  )
}

function FilterPill({ label }: { label: string }) {
  return (
    <div className="bg-white border border-[#eaeaea] rounded-lg px-2 py-1 flex items-center gap-1 max-w-[200px]">
      <span className="text-xs font-medium text-[#121212]">{label}</span>
      <ChevronDown className="h-4 w-4 text-[#303030] shrink-0" />
    </div>
  )
}

