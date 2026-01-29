"use client"

import { useState } from "react"
import { X, Search, Calendar, Building2, User, Sparkles } from "lucide-react"
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
  {
    id: "enterprise-customers",
    title: "Enterprise Customers",
    description: "Large organizations with 500+ employees using the platform. Focus on retention and expansion opportunities...",
    accounts: "1,500 Accounts",
  },
  {
    id: "churned-users",
    title: "Churned Users",
    description: "Users who have canceled their subscription in the last 90 days. Re-engagement campaigns can help win them back...",
    accounts: "850 Accounts",
  },
  {
    id: "power-users",
    title: "Power Users",
    description: "Highly active users who log in daily and use advanced features. Ideal for beta testing and feature feedback...",
    accounts: "3,200 Accounts",
  },
  {
    id: "inactive-users",
    title: "Inactive Users",
    description: "Users who haven't logged in for 30+ days. Re-activation campaigns can help bring them back to the platform...",
    accounts: "1,100 Accounts",
  },
  {
    id: "new-signups",
    title: "New Signups",
    description: "Users who signed up in the last 7 days. Onboarding campaigns and welcome sequences are critical here...",
    accounts: "450 Accounts",
  },
  {
    id: "upgrade-candidates",
    title: "Upgrade Candidates",
    description: "Free or basic plan users showing engagement patterns that suggest readiness for premium features...",
    accounts: "2,800 Accounts",
  },
  {
    id: "feature-adopters",
    title: "Feature Adopters",
    description: "Users who have adopted new features within 30 days of release. Early adopters for product announcements...",
    accounts: "1,900 Accounts",
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
        <div className="sticky top-0 z-10 bg-white px-6 py-4 flex items-center justify-between">
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
        <div className="px-6 py-6 ml-6 mr-6 mb-4 rounded-2xl">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6 justify-start items-center">
            {/* Left Column */}
            <div className="flex flex-col gap-6 w-[960px] justify-start items-center">
              {/* Details Section */}
              <div className="bg-white rounded-2xl p-6 w-[926px]">
                <h2 className="text-base font-semibold text-[#121212] mb-6">
                  Enter details
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

                  {/* Product and Duration - Same Row */}
                  <div className="flex gap-4 items-start">
                    {/* Product */}
                    <div className="flex-1">
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
                    <div className="flex-1">
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

              {/* Select Segments and Preview Section - Side by Side */}
              <div className="bg-white rounded-2xl p-6 flex gap-6 justify-start items-start">
                {/* Left - Select Segments */}
                <div className="flex-1 flex flex-col gap-4" style={{ width: '554px' }}>
                  {/* Sticky Header */}
                  <div className="sticky top-0 bg-white border-b border-[#EAEAEA] pb-4 -mt-6 -mx-6 px-6 pt-6 z-10" style={{ width: '590px', paddingLeft: '0px', paddingRight: '0px', marginLeft: '0px', marginRight: '0px' }}>
                    <h2 className="text-lg font-semibold text-[#1a141f] mb-4">
                      Select segments
                    </h2>
                    {/* Search and Filters */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#767676]" />
                        <Input
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-[#F6F6F6] border-[#F6F6F6] focus:bg-white pl-10 h-8 text-sm w-[200px] pr-2"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="bg-[#F6F6F6] border-[#F6F6F6] h-8 text-sm w-[150px]">
                          <SelectValue placeholder="All segments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All segments</SelectItem>
                          <SelectItem value="recent">Recently created</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="bg-[#F6F6F6] border-[#F6F6F6] h-8 text-sm px-2 [&>span]:text-left">
                          <SelectValue placeholder="Recently created" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Recently created</SelectItem>
                          <SelectItem value="oldest">Oldest first</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Segments List */}
                  <div className="space-y-1 flex-1 overflow-y-auto">
                    {filteredSegments.map((segment) => (
                      <div
                        key={segment.id}
                        className="flex items-start gap-4 p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors cursor-pointer"
                        onClick={() => toggleSegment(segment.id)}
                      >
                        <Checkbox
                          checked={selectedSegments.includes(segment.id)}
                          onCheckedChange={() => toggleSegment(segment.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-[#121212] mb-1">
                            {segment.title}
                          </h3>
                          <p className="text-sm text-[#5e5e5e] mb-2 line-clamp-2">
                            {segment.description}
                          </p>
                          <a
                            href="#"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-[#005e97] hover:underline"
                          >
                            View details
                          </a>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm font-semibold text-[#121212]">
                            {segment.accounts.split(' ')[0]}
                          </span>
                          <span className="text-sm text-[#5e5e5e]">
                            {segment.accounts.split(' ')[1]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Preview */}
                <div className="w-[300px] flex flex-col gap-4 shrink-0">
                  {/* Preview Header */}
                  <div className="border-b border-[#EAEAEA] pb-4 -mt-6 pt-6" style={{ paddingLeft: '0px', paddingRight: '0px', marginLeft: '0px', marginRight: '0px', width: '300px' }}>
                    <h2 className="text-lg font-semibold text-[#1a141f]">
                      Preview
                    </h2>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-white border-2 border-[#FFE9D2] rounded-lg p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Sparkles className="h-4 w-4 text-[#303030]" />
                      <span className="text-sm font-semibold text-[#121212]">Summary</span>
                    </div>
                    <p className="text-sm text-[#989898]">Will be generated by LLM.</p>
                  </div>

                  {/* Accounts Count */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-[#303030]" />
                      <span className="text-sm font-semibold text-[#303030]">Accounts</span>
                    </div>
                    <span className="text-sm font-semibold text-[#989898]">0</span>
                  </div>

                  {/* Contacts Count */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-[#303030]" />
                      <span className="text-sm font-semibold text-[#303030]">Contacts</span>
                    </div>
                    <span className="text-sm font-semibold text-[#989898]">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
