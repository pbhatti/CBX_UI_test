"use client"

import { X, ChevronDown, Settings, MoreVertical, PanelLeftClose, ChevronRight, Search as SearchIcon, Sparkles, AlertTriangle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PublishSettingsModal } from "@/components/publish-settings-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BackgroundGradientProps {
  onClose: () => void
  onHideNav?: () => void
}

export function BackgroundGradient({ onClose, onHideNav }: BackgroundGradientProps) {
  const router = useRouter()
  const words = ["Quality", "takes", "a", "moment.", "You'll", "see", "why", "..."]
  const fadeInDuration = 0.5 // 500ms
  const wordDelay = 0.14 // 140ms
  const initialDelay = 1 // 1 second

  // Gradient color states
  const [color1, setColor1] = useState("#FFE9D2")
  const [color2, setColor2] = useState("#FFD2D2")
  const [color3, setColor3] = useState("#C1BDFF")
  const [percent1, setPercent1] = useState(10)
  const [percent2, setPercent2] = useState(46)
  const [percent3, setPercent3] = useState(100)
  const [textColor, setTextColor] = useState("#60174B")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showReviewMode, setShowReviewMode] = useState(false)
  const [isContentViewPanelCollapsed, setIsContentViewPanelCollapsed] = useState(false)
  const [isEditSetupPanelOpen, setIsEditSetupPanelOpen] = useState(false)
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false)
  const [isPublishSettingsModalOpen, setIsPublishSettingsModalOpen] = useState(false)
  const [isEditModeOpen, setIsEditModeOpen] = useState(false)
  const [showReferences, setShowReferences] = useState(false)
  const [progress, setProgress] = useState(0)
  const [landingPagesCount, setLandingPagesCount] = useState(230)
  const [adsCount, setAdsCount] = useState(230)
  const [generateGeneric, setGenerateGeneric] = useState("yes")
  const [destination, setDestination] = useState("ai-generated")

  useEffect(() => {
    // Hide navigation after 8 seconds
    const navTimer = setTimeout(() => {
      onHideNav?.()
    }, 8000) // 8 seconds

    // Show review mode after 8 seconds
    const reviewTimer = setTimeout(() => {
      setShowReviewMode(true)
    }, 8000) // 8 seconds

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 80) // Update every 80ms to reach 100% in ~8 seconds

    return () => {
      clearTimeout(navTimer)
      clearTimeout(reviewTimer)
      clearInterval(progressInterval)
    }
  }, [onHideNav])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Topbar - 64px height */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-[#eaeaea] flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-2">
          {/* Close Button */}
          <button
            onClick={() => {
              router.push('/campaigns')
              onClose()
            }}
            className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
          >
            <X className="h-4 w-4 text-[#303030]" />
          </button>
          
          <div className="flex items-center gap-2">
            {/* LinkedIn Icon */}
            <div className="h-8 w-8 flex items-center justify-center shrink-0">
              <Image
                src="/images/LinkedIn.svg"
                alt="LinkedIn"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            
            {/* Title */}
            <span className="text-lg font-semibold text-black">Linkedin ad 4</span>
            
            {/* Status Tag */}
            {showReviewMode ? (
              <div className="bg-[#fcf2d6] px-2 py-0 rounded-lg">
                <span className="text-sm text-[#3c2c04]" style={{ verticalAlign: 'middle', textAlign: 'center', height: '18px', marginBottom: '4px' }}>In review</span>
              </div>
            ) : (
              <div className="bg-[#fcf2d6] px-2 py-0.5 rounded-lg">
                <span className="text-sm text-[#3c2c04]">Draft</span>
              </div>
            )}
          </div>
        </div>

        {/* Right aligned action buttons - only show after 10 seconds */}
        {showReviewMode && (
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#d4eefe] flex items-center justify-center border-2 border-white shrink-0">
              <span className="text-sm text-[#00273f] font-medium">M</span>
            </div>

            {/* Message Square Icon Button with notification badge */}
            <button 
              onClick={() => setIsCommentsPanelOpen(!isCommentsPanelOpen)}
              className="bg-[#f6f6f6] h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors relative"
            >
              <Image
                src="/images/message-square.svg"
                alt="Messages"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="absolute -top-1.5 -right-1.5 bg-[#e51313] text-white text-xs font-medium min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center">
                11
              </span>
            </button>

            {/* Settings-2 Icon Button */}
            <button 
              onClick={() => setIsPublishSettingsModalOpen(true)}
              className="bg-[#f6f6f6] h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
            >
              <Image
                src="/images/settings-2.svg"
                alt="Settings"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </button>

            {/* Edit Setup Button */}
            <button 
              onClick={() => setIsEditSetupPanelOpen(!isEditSetupPanelOpen)}
              className="bg-[#f6f6f6] h-10 px-3 rounded-lg hover:bg-[#eaeaea] transition-colors font-medium text-sm text-[#303030]"
            >
              Edit setup
            </button>

            {/* Approve Content Primary Button */}
            <button className="bg-black text-white h-10 px-3 rounded-lg hover:bg-black/90 transition-colors font-medium text-sm">
              Approve content
            </button>
          </div>
        )}
      </div>

      {/* Gradient Background with centered white card */}
      <div className="h-full w-full pt-16 relative overflow-hidden">
        {/* Gradient Background - using peach, pink, and purple colors with animation */}
        <AnimatePresence>
          {!showReviewMode && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at top left, ${color1} ${percent1}%, ${color2} ${percent2}%, ${color3} ${percent3}%)`,
                backgroundSize: "200% 200%",
                animation: "gradient-shift 20s infinite alternate"
              }}
            />
          )}
        </AnimatePresence>

        {/* Content View Panel - appears after 10 seconds */}
        <AnimatePresence>
          {showReviewMode && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: 1,
                width: isContentViewPanelCollapsed ? 160 : 320,
                height: isContentViewPanelCollapsed ? 40 : "calc(100% - 64px)",
                top: isContentViewPanelCollapsed ? 80 : 64,
                left: isContentViewPanelCollapsed ? 16 : 0,
              }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute z-10 bg-white border-r border-[#eaeaea] overflow-hidden ${
                isContentViewPanelCollapsed 
                  ? "rounded-lg shadow-lg border" 
                  : "overflow-y-auto"
              }`}
            >
              {isContentViewPanelCollapsed ? (
                <button
                  onClick={() => setIsContentViewPanelCollapsed(false)}
                  className="h-full px-3 flex items-center gap-2 hover:bg-[#f6f6f6] transition-colors w-full"
                >
                  <ChevronRight className="h-4 w-4 text-[#303030]" />
                  <span className="text-sm font-medium text-[#303030] whitespace-nowrap">Content view</span>
                </button>
              ) : (
                <div className="flex flex-col gap-3 p-4 w-full">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[#1a141f]">Content view</h2>
                    <button
                      onClick={() => setIsContentViewPanelCollapsed(true)}
                      className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
                    >
                      <PanelLeftClose className="h-4 w-4 text-[#303030]" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#f6f6f6]" />

                  <div className="flex flex-col gap-3">
                    {/* Switcher Tabs */}
                    <div className="bg-[#eaeaea] h-8 flex items-center p-1 rounded-[10px]">
                      <div className="flex-1 bg-white rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18)] h-full flex items-center justify-center">
                        <span className="text-xs font-medium text-[#121212]">LinkedIn Ads (233)</span>
                      </div>
                      <div className="flex-1 h-full flex items-center justify-center rounded-lg">
                        <span className="text-xs font-medium text-[#303030]">Landing pages (256)</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#f6f6f6]" />

                    {/* Personalisation level */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-semibold text-[#303030]">Personalisation level</p>
                      <div className="bg-[#f6f6f6] border border-[#f6f6f6] rounded-lg px-3 py-2.5 flex items-center justify-between">
                        <span className="text-sm text-[#303030]">Account and persona (130)</span>
                        <ChevronDown className="h-4 w-4 text-[#303030]" />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#f6f6f6]" />

                    {/* Select persona */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-semibold text-[#1a141f]">Select persona</p>
                      <div className="flex flex-col gap-2">
                        {["Data leader", "Digital transformation leader", "Product leader", "Finance leader"].map((persona, index) => (
                          <div key={index} className={`flex items-center gap-2 mt-1 mb-1 ${index === 1 ? "pt-1" : ""}`}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${index === 0 ? "bg-black border-black" : "border-[#d3d3d3]"}`}>
                              {index === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="text-sm text-[#303030]">{persona}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#f6f6f6]" />

                    {/* Select account */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-semibold text-[#1a141f]">Select account</p>
                      {/* Search field */}
                      <div className="bg-[#f6f6f6] border border-[#f6f6f6] rounded-lg px-2 py-1.5 flex items-center gap-2">
                        <SearchIcon className="h-4 w-4 text-[#303030]" />
                        <span className="text-sm text-[#989898] flex-1">Search accounts</span>
                      </div>
                      {/* Checkboxes */}
                      <div className="flex flex-col gap-1 max-h-[280px] overflow-y-auto">
                        {["Apple", "Tesla", "Reliance", "Fiserve", "Hundai", "Groww", "Unacademy", "Flipkart"].map((account, index) => (
                          <div key={index} className="flex items-center gap-2 pt-1 pb-1" style={{ marginTop: "0px", marginBottom: "0px" }}>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${index < 3 ? "bg-black border-black" : "bg-white border-[#d3d3d3]"}`}>
                              {index < 3 && (
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className="text-sm text-[#303030]">{account}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comments Panel - slides in from right */}
        <AnimatePresence>
          {showReviewMode && isCommentsPanelOpen && (
            <motion.div
              initial={{ x: 340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 340, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-16 right-0 h-[calc(100%-4rem)] w-[340px] bg-white z-20 flex flex-col"
              style={{ right: isEditSetupPanelOpen ? '340px' : '0' }}
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-[#eaeaea] z-10 px-4 py-3 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-semibold text-[#121212]">Comments</h2>
                <button
                  onClick={() => setIsCommentsPanelOpen(false)}
                  className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
                >
                  <X className="h-4 w-4 text-[#303030]" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-2 py-4 space-y-2">
                  {/* Comment List Items */}
                  {[
                    { name: "Jane Doe", time: "3:42 PM, Today", commentNum: "#124", level: "Account and persona", text: "Do we have enough new contacts to target in this month?", unread: true, active: true },
                    { name: "Jane Doe", time: "3:42 PM, Today", commentNum: "#124", level: "Account and persona", text: "Do we have enough new contacts to target in this month?", unread: true, active: false },
                    { name: "Jane Doe", time: "3:42 PM, Today", commentNum: "#124", level: "Account and persona", text: "Do we have enough new contacts to target in this month?", unread: true, active: false },
                    { name: "Jane Doe", time: "3:42 PM, Today", commentNum: "#124", level: "Account and persona", text: "Do we have enough new contacts to target in this month?", unread: false, active: false },
                    { name: "Jane Doe", time: "3:42 PM, Today", commentNum: "#124", level: "Account and persona", text: "Do we have enough new contacts to target in this month?", unread: false, active: false },
                  ].map((comment, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-white"
                    >
                      <div className="flex flex-col gap-[11px]">
                        <div className="flex gap-2 h-9 items-center">
                          {/* Avatar */}
                          <div className="w-8 h-8 rounded-full bg-[#d4eefe] flex items-center justify-center shrink-0">
                            <span className="text-sm text-[#00273f] font-medium">JD</span>
                          </div>
                          {/* Name and Timestamp */}
                          <div className="flex-1 flex flex-col min-w-0">
                            <p className="text-sm text-[#121212] leading-[1.4]">{comment.name}</p>
                            <p className="text-xs text-[#5e5e5e] leading-[1.4]">{comment.time}</p>
                          </div>
                          {/* Unread Badge */}
                          {comment.unread && (
                            <div className="w-2 h-2 bg-[#e51313] rounded-full shrink-0" />
                          )}
                        </div>
                        {/* Comment Details */}
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-[#5e5e5e] leading-[1.4]">
                            {comment.commentNum} • {comment.level}
                          </p>
                          <p className="text-sm text-[#121212] leading-[1.4] overflow-hidden text-ellipsis line-clamp-2">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Setup Panel - slides in from right */}
        <AnimatePresence>
          {showReviewMode && isEditSetupPanelOpen && (
            <motion.div
              initial={{ x: 340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 340, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-16 right-0 h-[calc(100%-4rem)] w-[340px] bg-white z-20 flex flex-col"
              style={{ right: isCommentsPanelOpen ? '340px' : '0' }}
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-[#eaeaea] z-10 px-4 py-3 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-semibold text-[#121212]">Edit setup</h2>
                <button
                  onClick={() => setIsEditSetupPanelOpen(false)}
                  className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
                >
                  <X className="h-4 w-4 text-[#303030]" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6 border-l border-[#eaeaea]" style={{ borderLeftWidth: '1px' }}>

                {/* Step context */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">Step context</label>
                  <Textarea
                    className="min-h-[100px] resize-none bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                    defaultValue="Launch and promote the AI-powered analytics assistant. Educate customers on how AI can uncover hidden patterns. Drive upsell interest from existing accounts and improve trial-to-paid conversion."
                  />
                </div>

                {/* Target Audience */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">
                    Where is your target audience?
                  </label>
                  <Select defaultValue="north-america">
                    <SelectTrigger className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="south-america">South America</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">Duration</label>
                  <div className="flex gap-3">
                    <Input type="text" defaultValue="Dec 15, 2025" className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]" />
                    <Input type="text" defaultValue="Dec 25, 2025" className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]" />
                  </div>
                </div>

                {/* Ad budget */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">Ad budget</label>
                  <Input type="text" defaultValue="$1500" className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]" />
                </div>

                {/* Offer */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">Offer</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      defaultValue="eve-test-event-offer-175638368737"
                      className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                    />
                    <button className="px-4 h-10 rounded-md border border-[#D3D3D3] bg-white hover:bg-[#F6F6F6] text-sm font-medium text-[#121212] transition-colors">
                      Change
                    </button>
                  </div>
                </div>

                {/* Marketing email template */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#121212]">
                    Marketing email template
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      defaultValue="Different_Base_Template_V2"
                      className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                    />
                    <button className="px-4 h-10 rounded-md border border-[#D3D3D3] bg-white hover:bg-[#F6F6F6] text-sm font-medium text-[#121212] transition-colors">
                      Change
                    </button>
                  </div>
                </div>

                {/* Generate only generic content */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#121212]">
                    Generate only generic content
                  </label>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2" onClick={() => setGenerateGeneric("yes")}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${generateGeneric === "yes" ? "bg-black border-black" : "border-[#d3d3d3]"}`}>
                        {generateGeneric === "yes" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <label className="text-sm text-[#121212] cursor-pointer font-normal">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center gap-2" onClick={() => setGenerateGeneric("no")}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${generateGeneric === "no" ? "bg-black border-black" : "border-[#d3d3d3]"}`}>
                        {generateGeneric === "no" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <label className="text-sm text-[#121212] cursor-pointer font-normal">
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Ad click destination */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-[#121212]">
                    Ad click destination
                  </label>
                  <p className="text-sm text-[#767676]">
                    Where should user go after clicking your ad?
                  </p>
                  
                  <div className="border border-[#DEDEDE] rounded-lg p-4">
                    <div className="flex items-start gap-3" onClick={() => setDestination("ai-generated")}>
                      <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${destination === "ai-generated" ? "bg-black border-black" : "border-[#d3d3d3]"}`}>
                        {destination === "ai-generated" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-medium text-[#121212] block mb-1 cursor-pointer">
                          AI-generated landing page
                        </label>
                        <p className="text-xs text-[#767676]">
                          Send users to a personalised landing page to maximize conversion
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#121212]">
                      Landing page template
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        defaultValue="Different_Base_Template_V2"
                        className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                      />
                      <button className="px-4 h-10 rounded-md border border-[#D3D3D3] bg-white hover:bg-[#F6F6F6] text-sm font-medium text-[#121212] transition-colors">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white border-t border-[#f6f6f6] shrink-0 p-4 rounded-bl-[16px] rounded-br-[16px]">
                <button className="w-full h-10 bg-black text-white rounded-lg hover:bg-black/90 transition-colors font-medium text-sm border-4 border-[#ffe9d2]">
                  Update
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Centered Text */}
        <AnimatePresence>
          {!showReviewMode && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 1.05, 1], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 8,
                repeat: .5,
                ease: "easeInOut",
                opacity: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            >
              {/* Main Text */}
              <p className="text-[18px] font-medium flex flex-wrap justify-center gap-x-1" style={{ color: textColor }}>
                {words.map((word, index) => {
                  const wordStartDelay = initialDelay + (index * wordDelay)
                  return (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{
                        opacity: {
                          duration: fadeInDuration,
                          delay: wordStartDelay,
                          ease: "easeOut"
                        }
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </p>

              {/* Progress Section */}
              <div className="flex flex-col gap-3 w-full max-w-[400px]">
                {/* Progress Bar Container */}
                <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  {/* Progress Bar with Gradient */}
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(to right, #673BCC, #201340, #672E07)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>

                {/* Status and Counts */}
                <div className="flex items-center justify-between w-full">
                  {/* Generating Text with Icon */}
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: textColor }} />
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        background: "linear-gradient(to right, #673BCC, #201340, #672E07)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      Generating...
                    </span>
                  </div>

                  {/* Counts */}
                  <span className="text-sm font-medium" style={{ color: textColor }}>
                    {landingPagesCount} Landing pages · {adsCount} Ads
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Message */}
        <AnimatePresence>
          {!showReviewMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
              <p className="text-sm text-[#60174B] text-center opacity-60">
                Taking too long? Close this and we’ll notify you when the content is ready.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grey Canvas with LinkedIn Ad Previews - appears after 10 seconds */}
        <AnimatePresence>
          {showReviewMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bg-[#F6F6F6]"
              style={{
                left: isContentViewPanelCollapsed ? 0 : 320,
                top: 64,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            >
              <div className="h-full overflow-x-auto overflow-y-auto p-6" style={{ verticalAlign: 'bottom' }}>
                <div className="mx-auto w-full max-w-[1200px]">
                  <div className="flex gap-6" style={{ verticalAlign: 'middle' }}>
                  {/* Apple Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">Apple</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Tesla Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">Tesla</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Reliance Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">Reliance</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Flipkart Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">Flipkart</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Unacademy Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">Unacademy</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* OpenAI Column */}
                  <motion.div 
                    className="flex-shrink-0 w-[400px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 1.0 }}
                  >
                    <h3 className="text-sm font-medium text-[#303030] mb-4">Content for: <span className="font-bold">OpenAI</span></h3>
                    <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Ad Preview Content */}
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">131,229 followers</span>
                            <span className="text-xs text-[#666666]">·</span>
                            <span className="text-xs text-[#666666]">Promoted</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                <MoreVertical className="h-4 w-4 text-[#666666]" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <p className="text-sm text-[#121212] font-medium">
                            Spending more time reacting than driving results? You&apos;re not alone.
                          </p>
                          <p className="text-sm text-[#121212]">
                            You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                          </p>
                          <p className="text-sm text-[#0077b5] font-medium">
                            See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                          </p>
                        </div>
                        
                        {/* Ad Creative */}
                        <div className="space-y-2">
                          <div className="relative bg-black rounded-lg overflow-hidden">
                            <div className="p-6">
                              <div className="text-white space-y-2 mb-4">
                                <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                <p className="text-lg">GenAI is the last nail in the coffin</p>
                              </div>
                              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                Ebook
                              </div>
                            </div>
                            <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                  <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                    <span className="text-4xl">📊</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                              <span className="text-white text-[10px] font-semibold">T.</span>
                            </div>
                            <span className="text-xs text-[#666666]">ThoughtSpot</span>
                          </div>
                          <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                            <span>🔒</span>
                            <span>Unlock Full Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Zoom Control */}
              <div className="absolute bottom-6 right-6 bg-white rounded-lg border border-[#eaeaea] px-3 py-2 flex items-center gap-3 shadow-sm">
                <button className="text-sm text-[#303030] hover:text-[#121212]">+</button>
                <span className="text-sm text-[#303030]">100%</span>
                <button className="text-sm text-[#303030] hover:text-[#121212]">-</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient Configurator */}
        <AnimatePresence>
          {!showReviewMode && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-20 border border-[#eaeaea]"
            >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#303030]">Gradient Configurator</h3>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-[#f6f6f6] rounded transition-colors"
              aria-label={isCollapsed ? "Expand" : "Collapse"}
            >
              <ChevronDown
                className={`h-4 w-4 text-[#303030] transition-transform duration-200 ${
                  isCollapsed ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-4">
            {/* Color 1 */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#666666] flex items-center justify-between">
                Color 1
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={percent1}
                  onChange={(e) => setPercent1(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer border border-[#eaeaea]"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </div>
            </div>

            {/* Color 2 */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#666666] flex items-center justify-between">
                Color 2
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={percent2}
                  onChange={(e) => setPercent2(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer border border-[#eaeaea]"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </div>
            </div>

            {/* Color 3 */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#666666] flex items-center justify-between">
                Color 3
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={percent3}
                  onChange={(e) => setPercent3(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color3}
                  onChange={(e) => setColor3(e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer border border-[#eaeaea]"
                />
                <input
                  type="text"
                  value={color3}
                  onChange={(e) => setColor3(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-2 pt-2 border-t border-[#eaeaea]">
              <label className="text-xs font-medium text-[#666666]">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-8 rounded cursor-pointer border border-[#eaeaea]"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-[#eaeaea] rounded focus:outline-none focus:ring-1 focus:ring-[#303030]"
                />
              </div>
            </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Publish Settings Modal */}
        <PublishSettingsModal
          isOpen={isPublishSettingsModalOpen}
          onClose={() => setIsPublishSettingsModalOpen(false)}
        />

        {/* Edit Mode */}
        <AnimatePresence>
          {isEditModeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-[60] flex flex-col bg-white"
            >
              {/* Black Topbar */}
              <div className="h-16 bg-black flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsEditModeOpen(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                  <span className="text-white text-lg font-semibold">Edit Content</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Warning Text */}
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#FF9500]" />
                    <span className="text-xs text-white font-light">2 other user is editing this content</span>
                  </div>
                  
                  {/* Stacked Avatars */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#d4eefe] flex items-center justify-center border-2 border-black shrink-0">
                      <span className="text-xs text-[#00273f] font-medium">M</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FFE9D2] flex items-center justify-center border-2 border-black shrink-0">
                      <span className="text-xs text-[#60174B] font-medium">J</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C1BDFF] flex items-center justify-center border-2 border-black shrink-0">
                      <span className="text-xs text-[#121212] font-medium">S</span>
                    </div>
                  </div>
                  
                  {/* Apply Changes Button */}
                  <Button 
                    onClick={() => {
                      // Handle apply changes
                      setIsEditModeOpen(false)
                    }}
                    className="bg-white text-black hover:bg-white/90 h-9 px-4 text-sm font-medium"
                  >
                    Apply changes
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left Chat Panel */}
                <div className="w-80 bg-white border-r border-[#eaeaea] flex flex-col shrink-0">
                  <div className="p-4 border-b border-[#eaeaea]">
                    <h3 className="text-sm font-semibold text-[#121212]">Chat</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Chat messages can go here */}
                    <div className="text-sm text-[#666666]">Start a conversation...</div>
                  </div>
                  <div className="p-4 border-t border-[#eaeaea]">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        className="flex-1 bg-[#F6F6F6] border-[#E5E5E5] focus:bg-white"
                      />
                      <Button className="bg-black text-white hover:bg-black/90">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Grey Canvas with Dot Pattern */}
                <div
                  className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F6F6F6]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                >
                  <div className="px-6 py-6 h-full min-w-0" style={{ borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', borderImage: 'none' }}>
                    <div
                      className={`max-w-8xl mx-auto flex flex-row gap-10 h-full items-stretch transition-[justify-content] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${showReferences ? "justify-start" : "justify-center"} min-w-0`}
                      style={{ width: "100%" }}
                    >
                      {/* Apple Content Card - center by default, slides left when references shown */}
                      <motion.div
                        layout
                        transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="flex-shrink-0 w-[400px] h-full"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-[#303030]">Content for: <span className="font-bold">Apple</span></h3>
                          <Button 
                            variant="outline"
                            onClick={() => setShowReferences(!showReferences)}
                            className="bg-[#F6F6F6] text-black hover:bg-[#EAEAEA] border-[#EAEAEA] shadow-sm h-8 px-3 text-xs font-medium rounded-md"
                          >
                            {showReferences ? "Hide references" : "View references"}
                          </Button>
                        </div>
                        <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow h-[675px] flex flex-col min-h-0">
                        {/* Ad Preview Content */}
                        <div className="space-y-3 flex-1 min-h-0 overflow-auto">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">T.</span>
                              </div>
                              <span className="text-xs text-[#666666]">131,229 followers</span>
                              <span className="text-xs text-[#666666]">·</span>
                              <span className="text-xs text-[#666666]">Promoted</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                  <MoreVertical className="h-4 w-4 text-[#666666]" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          {/* Ad Copy */}
                          <div className="space-y-2">
                            <p className="text-sm text-[#121212] font-medium">
                              Spending more time reacting than driving results? You&apos;re not alone.
                            </p>
                            <p className="text-sm text-[#121212]">
                              You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                            </p>
                            <p className="text-sm text-[#0077b5] font-medium">
                              See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                            </p>
                          </div>
                          
                          {/* Ad Creative */}
                          <div className="space-y-2">
                            <div className="relative bg-black rounded-lg overflow-hidden">
                              <div className="p-6">
                                <div className="text-white space-y-2 mb-4">
                                  <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                  <p className="text-lg">GenAI is the last nail in the coffin</p>
                                </div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                  Ebook
                                </div>
                              </div>
                              <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                                <div className="text-white text-center">
                                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                      <span className="text-4xl">📊</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          {/* Footer */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea] flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                                <span className="text-white text-[10px] font-semibold">T.</span>
                              </div>
                              <span className="text-xs text-[#666666]">ThoughtSpot</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                              <span>🔒</span>
                              <span>Unlock Full Document</span>
                            </button>
                          </div>
                      </div>
                      </motion.div>
                      
                      {/* Horizontal Scrollable Container with References - slides in smoothly when toggled */}
                      <motion.div
                        layout
                        initial={false}
                        animate={{
                          width: showReferences ? "100%" : 0,
                          marginLeft: showReferences ? 0 : -40,
                          opacity: showReferences ? 1 : 0,
                        }}
                        transition={{ type: "tween", duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className={`flex-shrink-0 overflow-hidden ${!showReferences ? "pointer-events-none" : ""}`}
                        style={{ height: "100%", maxWidth: "100%" }}
                      >
                        <div className="overflow-x-auto -mx-6 px-6 w-full min-w-[1200px]">
                        <div className="flex flex-row flex-nowrap gap-6 pb-4" style={{ width: 'max-content' }}>
                          {/* Reference Cards */}
                          {["Tesla", "Reliance", "Flipkart", "Open AI", "Unacademy"].map((companyName, index) => (
                              <div key={index} className="flex-shrink-0 w-[400px]">
                                {/* Title with separator line */}
                                <div className="mb-4">
                                  <h3 className="text-sm font-medium text-[#303030] text-left mb-2">Content for: <span className="font-bold">{companyName}</span></h3>
                                  <div className="border-t border-[#eaeaea]"></div>
                                </div>
                                <div className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow">
                                  {/* Ad Preview Content */}
                                  <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center">
                                          <span className="text-white text-xs font-semibold">T.</span>
                                        </div>
                                        <span className="text-xs text-[#666666]">131,229 followers</span>
                                        <span className="text-xs text-[#666666]">·</span>
                                        <span className="text-xs text-[#666666]">Promoted</span>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options">
                                            <MoreVertical className="h-4 w-4 text-[#666666]" />
                                          </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    
                                    {/* Ad Copy */}
                                    <div className="space-y-2">
                                      <p className="text-sm text-[#121212] font-medium">
                                        Spending more time reacting than driving results? You&apos;re not alone.
                                      </p>
                                      <p className="text-sm text-[#121212]">
                                        You&apos;re not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.
                                      </p>
                                      <p className="text-sm text-[#0077b5] font-medium">
                                        See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.
                                      </p>
                                    </div>
                                    
                                    {/* Ad Creative */}
                                    <div className="space-y-2">
                                      <div className="relative bg-black rounded-lg overflow-hidden">
                                        <div className="p-6">
                                          <div className="text-white space-y-2 mb-4">
                                            <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                            <p className="text-lg">GenAI is the last nail in the coffin</p>
                                          </div>
                                          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                                            Ebook
                                          </div>
                                        </div>
                                        <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                                          <div className="text-white text-center">
                                            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                              <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center">
                                                <span className="text-4xl">📊</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea]">
                                      <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center">
                                          <span className="text-white text-[10px] font-semibold">T.</span>
                                        </div>
                                        <span className="text-xs text-[#666666]">ThoughtSpot</span>
                                      </div>
                                      <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline">
                                        <span>🔒</span>
                                        <span>Unlock Full Document</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

