"use client"

import { useState } from "react"
import { X, Search, Calendar, Building2, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"

interface CreateInitiativeFormProps {
  onClose: () => void
}

const segments = [
  {
    id: "all-users",
    title: "All Users",
    description: "The complete population of people in your workspace. A baseline group that includes every user, regardless o...",
    accounts: "2,000 Accounts",
  },
  {
    id: "free-trial-users",
    title: "Free Trial Users",
    description: "Users who signed up for the product but haven't yet converted to a paid plan. A key audience for nurturing...",
    accounts: "2,000 Accounts",
  },
  {
    id: "high-intent-evaluators",
    title: "High-Intent Evaluators",
    description: "Prospects showing strong intent by creating 3+ dashboards or inviting teammates. Prime candidates for targeted conv...",
    accounts: "2,000 Accounts",
  },
]

export function CreateInitiativeForm({ onClose }: CreateInitiativeFormProps) {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSegment = (segmentId: string) => {
    setSelectedSegments((prev) =>
      prev.includes(segmentId)
        ? prev.filter((id) => id !== segmentId)
        : [...prev, segmentId]
    )
  }

  const filteredSegments = segments.filter((segment) =>
    segment.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 bg-[#F6F6F6] overflow-auto"
    >
      <div className="min-h-screen bg-[#F6F6F6]">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#F6F6F6] border-b border-[#DEDEDE] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-[#121212]" />
            </button>
            <h1 className="text-xl font-medium text-[#121212]">Create initiative</h1>
          </div>
          <Button className="bg-black text-white hover:bg-black/90 h-8 px-4 text-sm font-medium rounded-lg">
            Save
          </Button>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          <div className="max-w-[1400px] mx-auto grid grid-cols-[1fr_400px] gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Details Section */}
              <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-base font-semibold text-[#121212] mb-6">
                  What are the details of this Initiative?
                </h2>
                <div className="space-y-5">
                  {/* Initiative Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#121212] mb-2">
                      Initiative name*
                    </label>
                    <Input
                      placeholder="e.g., Q3 Pipeline Acceleration"
                      className="bg-[#FAFAFA] border-[#E5E5E5] focus:bg-white"
                    />
                  </div>

                  {/* Product */}
                  <div>
                    <label className="block text-sm font-medium text-[#121212] mb-2">
                      Product*
                    </label>
                    <Select>
                      <SelectTrigger className="bg-[#FAFAFA] border-[#E5E5E5] focus:bg-white">
                        <SelectValue placeholder="Select from product list" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product1">Product 1</SelectItem>
                        <SelectItem value="product2">Product 2</SelectItem>
                        <SelectItem value="product3">Product 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-[#121212] mb-2">
                      Duration*
                    </label>
                    <div className="relative">
                      <Input
                        value="Sep 18, 2025 - Nov 30, 2025"
                        className="bg-[#FAFAFA] border-[#E5E5E5] focus:bg-white pr-10"
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                    </div>
                  </div>

                  {/* Initiative Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-[#121212] mb-2">
                      Initiative purpose
                    </label>
                    <Textarea
                      placeholder="Describe the purpose. e.g., Drive awareness and engagement for target accounts."
                      className="bg-[#FAFAFA] border-[#E5E5E5] focus:bg-white min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Select Segments Section */}
              <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                <h2 className="text-base font-semibold text-[#121212] mb-4">
                  Select segments
                </h2>
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
                      <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-[#FAFAFA] border-[#E5E5E5] focus:bg-white pl-9"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="bg-white border-[#E5E5E5] w-[140px]">
                        <SelectValue placeholder="All segments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All segments</SelectItem>
                        <SelectItem value="recent">Recently created</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="bg-white border-[#E5E5E5] w-[160px]">
                        <SelectValue placeholder="Recently created" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recently created</SelectItem>
                        <SelectItem value="oldest">Oldest first</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Segments List */}
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredSegments.map((segment) => (
                      <div
                        key={segment.id}
                        className="flex items-start gap-4 p-4 hover:bg-[#FAFAFA] rounded-lg transition-colors cursor-pointer"
                        onClick={() => toggleSegment(segment.id)}
                      >
                        <Checkbox
                          checked={selectedSegments.includes(segment.id)}
                          onCheckedChange={() => toggleSegment(segment.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-[#121212] mb-1">
                            {segment.title}
                          </h3>
                          <p className="text-sm text-[#666666] mb-2 line-clamp-2">
                            {segment.description}
                          </p>
                          <a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View details
                          </a>
                        </div>
                        <div className="text-sm text-[#666666] whitespace-nowrap">
                          {segment.accounts}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 h-fit sticky top-[88px]">
              <h2 className="text-base font-semibold text-[#121212] mb-4">
                Preview
              </h2>
              <div className="space-y-4">
                {/* Summary Card */}
                <div className="bg-[#F5F3FF] border border-[#E9D5FF] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-[#9333EA]" />
                    <span className="text-sm font-medium text-[#121212]">Summary</span>
                  </div>
                  <p className="text-sm text-[#666666]">Generated by LLM in NL</p>
                </div>

                {/* Accounts Count */}
                <div className="flex items-center justify-between py-3 border-b border-[#E5E5E5]">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#666666]" />
                    <span className="text-sm text-[#121212]">Accounts</span>
                  </div>
                  <span className="text-sm font-medium text-[#121212]">0</span>
                </div>

                {/* Contacts Count */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#666666]" />
                    <span className="text-sm text-[#121212]">Contacts</span>
                  </div>
                  <span className="text-sm font-medium text-[#121212]">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
