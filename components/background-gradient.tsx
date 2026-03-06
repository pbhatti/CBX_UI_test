"use client"

import { X, ChevronDown, Settings, MoreVertical, MessageSquare, PanelLeftClose, ChevronRight, Search as SearchIcon, Sparkles, AlertTriangle, Lock, PenLine, Expand, Clock3, Copy, Tag, type LucideIcon } from "lucide-react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PublishSettingsModal } from "@/components/publish-settings-modal"
import { AIPanel, type AIPanelHandle } from "@/components/ai-panel"
import { EditableTextBlock, type EditableBlockId } from "@/components/editable-text-block"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface BackgroundGradientProps {
  onClose: () => void
  onHideNav?: () => void
}

type GoogleAdsSection = "headlines" | "long-headline" | "descriptions" | "cta"
type GoogleAdsPlacement = "Display" | "Gmail" | "Youtube"

const GOOGLE_AD_PLACEMENT_OPTIONS: Array<{
  label: GoogleAdsPlacement
  iconSrc: string
  iconAlt: string
}> = [
  {
    label: "Display",
    iconSrc: "http://localhost:3845/assets/1c4c35e9ab2bd96817294f4f4d3978805a0dfd40.svg",
    iconAlt: "Display ads icon",
  },
  {
    label: "Gmail",
    iconSrc: "http://localhost:3845/assets/16ea2add265315cc6ae56db48cf51224c0faf1df.png",
    iconAlt: "Gmail icon",
  },
  {
    label: "Youtube",
    iconSrc: "http://localhost:3845/assets/cf8cd2977e6c04b58e65ddb229c13a296e59ae83.png",
    iconAlt: "YouTube icon",
  },
]

function GoogleAdsPlacementSwitcher({
  value,
  onChange,
  className = "",
}: {
  value: GoogleAdsPlacement
  onChange: (placement: GoogleAdsPlacement) => void
  className?: string
}) {
  return (
    <div className={`inline-flex items-center rounded-[10px] bg-[#EAEAEA] p-[2px] ${className}`}>
      {GOOGLE_AD_PLACEMENT_OPTIONS.map(({ label, iconSrc, iconAlt }) => {
        const isActive = value === label

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            aria-pressed={isActive}
            className={`relative flex items-center justify-center gap-2 rounded-[8px] px-3 py-[9px] text-xs font-medium leading-[1.4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1 ${
              isActive
                ? "text-[#121212]"
                : "bg-transparent text-[#303030] hover:bg-white/60"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="google-ads-placement-pill"
                className="absolute inset-0 rounded-[8px] bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-[1] flex h-4 w-4 shrink-0 items-center justify-center">
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="max-h-4 w-auto max-w-4 object-contain"
              />
            </span>
            <span className="relative z-[1]">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function FloatingFrameToolbar({
  actions,
  className = "",
}: {
  actions: Array<{
    icon: LucideIcon
    label: string
    onClick?: () => void
  }>
  className?: string
}) {
  return (
    <div className={`absolute top-0 right-[-60px] flex flex-col gap-1 rounded-lg border border-[#f6f6f6] bg-white p-[3px] shadow-[0px_4px_8px_0px_rgba(18,18,18,0.12)] ${className}`}>
      {actions.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={onClick}
          className="flex h-10 w-10 items-center justify-center rounded-[4px] transition-colors hover:bg-[#f6f6f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <Icon className="h-4 w-4 text-[#303030]" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  )
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
  const [editModeCompanyName, setEditModeCompanyName] = useState("Apple")
  const [showReferences, setShowReferences] = useState(false)
  const [contentViewType, setContentViewType] = useState<"linkedin-ads" | "landing-pages" | "google-ads">("linkedin-ads")
  const [selectedGoogleAdsSection, setSelectedGoogleAdsSection] = useState<GoogleAdsSection>("headlines")
  const [selectedGoogleAdsTextBlockId, setSelectedGoogleAdsTextBlockId] = useState("headline-0")
  const [selectedGoogleAdsPlacement, setSelectedGoogleAdsPlacement] = useState<GoogleAdsPlacement>("Display")
  const [progress, setProgress] = useState(0)
  const [landingPagesCount, setLandingPagesCount] = useState(230)
  const [adsCount, setAdsCount] = useState(230)
  const [generateGeneric, setGenerateGeneric] = useState("yes")
  const [destination, setDestination] = useState("ai-generated")
  const [editTopbarOption, setEditTopbarOption] = useState<"Edge-aligned Divider" | "Surface-based Separation" | "Framed Side Pane">("Surface-based Separation")
  const [isFramedPaneAnimating, setIsFramedPaneAnimating] = useState(false)
  const framedPaneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [referenceTitlesLoaded, setReferenceTitlesLoaded] = useState(false)
  const referenceTitlesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Select references popover (Figma: Personalisation by)
  const [selectedPersona, setSelectedPersona] = useState("data-leader")
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(["Tesla", "Reliance"])
  const [accountSearch, setAccountSearch] = useState("")
  const ALL_ACCOUNTS = ["Open AI", "Glean", "Block", "Tesla", "Niantic", "Anthropic", "Reliance", "Flipkart", "Unacademy"]
  const LANDING_PAGE_PREVIEW_ACCOUNTS = ["Apple", "Tesla", "Reliance"]
  const GOOGLE_AD_HEADLINES = [
    "Accelerate sales growth",
    "Unprecedented sales growth",
    "Record-breaking sales expansion",
    "Unlock Data Power",
    "Faster pipeline velocity",
  ]
  const GOOGLE_AD_DESCRIPTIONS = [
    "Unlock rapid growth with analytics product! Our customers have seen a 30% increase in efficiency.",
    "Sales performance has surged, highlighting the success of our recent strategies.",
    "We see a rise in sales, reflecting our efforts and positive product reception.",
    "Track your sales effortlessly with our intuitive product, designed to provide real-time insights.",
    "Our sales CRM product has seen a significant boost in sales.",
  ]
  const FIGMA_LANDING_LOGO = "/images/Adobe.png"
  const FIGMA_LANDING_HERO = "/images/Flower.png"
  // Ad frames display in the same order as the checkbox list (first in list = first Ad frame)
  const orderedSelectedAccounts = [...selectedAccounts].sort(
    (a, b) => ALL_ACCOUNTS.indexOf(a) - ALL_ACCOUNTS.indexOf(b)
  )
  // Skeleton loader: each frame shows skeleton for 3 sec before content (Figma node 2514:59960)
  const [loadedReferenceFrames, setLoadedReferenceFrames] = useState<Set<string>>(new Set())
  const frameLoadTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  useEffect(() => {
    orderedSelectedAccounts.forEach((companyName) => {
      if (loadedReferenceFrames.has(companyName)) return
      const id = setTimeout(() => {
        setLoadedReferenceFrames((prev) => new Set(prev).add(companyName))
        frameLoadTimeoutsRef.current.delete(companyName)
      }, 3000)
      frameLoadTimeoutsRef.current.set(companyName, id)
    })
    return () => {
      frameLoadTimeoutsRef.current.forEach((id) => clearTimeout(id))
      frameLoadTimeoutsRef.current.clear()
    }
  }, [orderedSelectedAccounts])
  // Reset loaded state when accounts are removed so re-adding shows skeleton again
  useEffect(() => {
    setLoadedReferenceFrames((prev) => {
      const next = new Set(prev)
      next.forEach((company) => {
        if (!orderedSelectedAccounts.includes(company)) next.delete(company)
      })
      return next
    })
  }, [orderedSelectedAccounts.join(",")])

  // Block-level AI edit (Framed Side Pane content frame)
  const [selectedBlockId, setSelectedBlockId] = useState<EditableBlockId | null>(null)
  const [editBlockContent, setEditBlockContent] = useState({
    headline: "Spending more time reacting than driving results? You're not alone.",
    body: "You're not alone. Data teams report spending less than half of their work week actually analyzing data. At CVS, ThoughtSpot helped reduce time-to-insight by 60%. With GenAI, you can finally focus on the strategic work that moves the needle.",
    cta: "See how to reclaim control of your career. Download the Dashboards are Dead, Gen AI edition.",
  })
  const [blockThinkingId, setBlockThinkingId] = useState<EditableBlockId | null>(null)
  const [blockStreamingId, setBlockStreamingId] = useState<EditableBlockId | null>(null)
  const [blockFadeId, setBlockFadeId] = useState<EditableBlockId | null>(null)
  /** When set, the block is streaming this text in word-by-word (after thinking). */
  const [streamingTarget, setStreamingTarget] = useState<{ blockId: EditableBlockId; text: string } | null>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const aiPanelRef = useRef<AIPanelHandle>(null)
  const thinkingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const THINKING_MS = 6000
  const FADE_MS = 300
  const MOCK_AI_BLOCK_UPDATES = useRef<Record<EditableBlockId, string>>({
    headline: "Drive results, not reactions. You're not alone.",
    body: "Data teams spend less than half their week on real analysis. ThoughtSpot helped CVS cut time-to-insight by 60%. With GenAI, focus on the work that moves the needle.",
    cta: "Reclaim your career. Get the Dashboards are Dead, Gen AI edition.",
  }).current

  const clearBlockTimers = useCallback(() => {
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current)
      thinkingTimeoutRef.current = null
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
      fadeTimeoutRef.current = null
    }
  }, [])

  const handleBlockSelect = useCallback((blockId: EditableBlockId) => {
    if (blockStreamingId != null) return
    setSelectedBlockId((prev) => {
      if (prev === blockId) return prev
      clearBlockTimers()
      setBlockThinkingId(null)
      setBlockStreamingId(null)
      setBlockFadeId(null)
      setStreamingTarget(null)
      return blockId
    })
  }, [clearBlockTimers, blockStreamingId])

  const handleStreamingComplete = useCallback(
    (blockId: EditableBlockId) => {
      setEditBlockContent((prev) => ({
        ...prev,
        [blockId]: MOCK_AI_BLOCK_UPDATES[blockId],
      }))
      setStreamingTarget(null)
      setBlockStreamingId(null)
      setBlockFadeId(blockId)
      fadeTimeoutRef.current = setTimeout(() => {
        fadeTimeoutRef.current = null
        setBlockFadeId(null)
        const message =
          blockId === "headline"
            ? "Updated headline for clarity and impact."
            : blockId === "body"
              ? "Updated body text to three lines, improving clarity and highlighting platform value."
              : "Updated CTA to be more direct and actionable."
        aiPanelRef.current?.appendAIMessage(message)
      }, FADE_MS)
    },
    [MOCK_AI_BLOCK_UPDATES]
  )

  const handleApplyToBlock = useCallback(
    (prompt: string) => {
      const blockId = selectedBlockId
      if (!blockId || blockThinkingId || blockStreamingId) return
      clearBlockTimers()
      setBlockThinkingId(blockId)
      thinkingTimeoutRef.current = setTimeout(() => {
        thinkingTimeoutRef.current = null
        setBlockThinkingId(null)
        setStreamingTarget({ blockId, text: MOCK_AI_BLOCK_UPDATES[blockId] })
        setBlockStreamingId(blockId)
      }, THINKING_MS)
    },
    [selectedBlockId, blockThinkingId, blockStreamingId, clearBlockTimers, MOCK_AI_BLOCK_UPDATES]
  )

  const handleGoogleAdsTextBlockSelect = useCallback((section: GoogleAdsSection, blockId: string) => {
    setSelectedGoogleAdsSection(section)
    setSelectedGoogleAdsTextBlockId(blockId)
  }, [])

  const handleLinkedInAdEditOpen = useCallback((companyName: string) => {
    setEditModeCompanyName(companyName)
    setContentViewType("linkedin-ads")
    setIsEditModeOpen(true)
  }, [])

  useEffect(() => {
    if (selectedBlockId && isEditModeOpen) {
      chatInputRef.current?.focus()
    }
  }, [selectedBlockId, isEditModeOpen])

  useEffect(() => {
    if (!isEditModeOpen) {
      setSelectedBlockId(null)
      clearBlockTimers()
      setBlockThinkingId(null)
      setBlockStreamingId(null)
      setBlockFadeId(null)
      setStreamingTarget(null)
    }
  }, [isEditModeOpen, clearBlockTimers])

  const isGoogleAdsEditMode = isEditModeOpen && contentViewType === "google-ads"

  /** Framed Side Pane: reference pane open width (px). Only this region's width changes. */
  const FRAMED_REFERENCE_PANE_WIDTH_PX = 524

  const handleFramedPaneToggle = () => {
    if (editTopbarOption !== "Framed Side Pane") return
    if (framedPaneTimeoutRef.current) clearTimeout(framedPaneTimeoutRef.current)
    setIsFramedPaneAnimating(true)
    setShowReferences((prev) => !prev)
    framedPaneTimeoutRef.current = setTimeout(() => {
      setIsFramedPaneAnimating(false)
      framedPaneTimeoutRef.current = null
    }, 800)
  }

  const handleFramedPaneClose = () => {
    if (editTopbarOption !== "Framed Side Pane" || !showReferences) return
    if (framedPaneTimeoutRef.current) clearTimeout(framedPaneTimeoutRef.current)
    setIsFramedPaneAnimating(true)
    setShowReferences(false)
    framedPaneTimeoutRef.current = setTimeout(() => {
      setIsFramedPaneAnimating(false)
      framedPaneTimeoutRef.current = null
    }, 800)
  }

  useEffect(() => {
    if (isGoogleAdsEditMode && showReferences) {
      setShowReferences(false)
    }
  }, [isGoogleAdsEditMode, showReferences])

  /** When references are open, chat collapses to give more space; floating button restores it. */
  const isChatCollapsed = !isGoogleAdsEditMode && showReferences

  useEffect(() => {
    if (showReferences) {
      setReferenceTitlesLoaded(false)
      referenceTitlesTimerRef.current = setTimeout(() => {
        referenceTitlesTimerRef.current = null
        setReferenceTitlesLoaded(true)
      }, 6000)
    } else {
      if (referenceTitlesTimerRef.current) {
        clearTimeout(referenceTitlesTimerRef.current)
        referenceTitlesTimerRef.current = null
      }
      setReferenceTitlesLoaded(false)
    }
    return () => {
      if (referenceTitlesTimerRef.current) {
        clearTimeout(referenceTitlesTimerRef.current)
      }
    }
  }, [showReferences])

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
    <LayoutGroup>
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
                src="/assets/global/LinkedIn.svg"
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
                src="/assets/global/message-square.svg"
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
                src="/assets/global/settings-2.svg"
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
                      <button
                        type="button"
                        onClick={() => setContentViewType("linkedin-ads")}
                        aria-pressed={contentViewType === "linkedin-ads"}
                        className={`relative flex-1 h-full flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                          contentViewType === "linkedin-ads"
                            ? "text-[#121212]"
                            : "text-[#303030] hover:bg-white/60"
                        }`}
                      >
                        {contentViewType === "linkedin-ads" && (
                          <motion.span
                            layoutId="content-view-toggle-pill"
                            className="absolute inset-0 rounded-lg bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18)]"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative z-[1]">LinkedIn Ads (233)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentViewType("landing-pages")}
                        aria-pressed={contentViewType === "landing-pages"}
                        className={`relative flex-1 h-full flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                          contentViewType === "landing-pages"
                            ? "text-[#121212]"
                            : "text-[#303030] hover:bg-white/60"
                        }`}
                      >
                        {contentViewType === "landing-pages" && (
                          <motion.span
                            layoutId="content-view-toggle-pill"
                            className="absolute inset-0 rounded-lg bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18)]"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative z-[1]">Landing pages (256)</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContentViewType("google-ads")}
                      aria-pressed={contentViewType === "google-ads"}
                      className={`h-8 w-full rounded-[10px] px-3 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1 ${
                        contentViewType === "google-ads"
                          ? "bg-white text-[#121212] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.18)]"
                          : "bg-[#f6f6f6] text-[#303030] hover:bg-[#eaeaea]"
                      }`}
                    >
                      Google Ads
                    </button>

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
              <div
                className={`h-full overflow-x-auto overflow-y-auto flex justify-center ${
                  contentViewType === "google-ads" ? "items-stretch pl-6 pr-0 pt-0 pb-0" : "items-center p-6"
                }`}
              >
                <div className={`mx-auto w-full max-w-[1200px] ${contentViewType === "google-ads" ? "h-full" : ""}`}>
                  <div className={`flex gap-6 ${contentViewType === "google-ads" ? "h-full items-stretch" : ""}`} style={{ verticalAlign: 'middle' }}>
                  {contentViewType === "google-ads" ? (
                    <motion.div
                      key="google-ads-preview"
                      className="mx-auto h-full w-full max-w-[1120px]"
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 24 }}
                    >
                      <div className="flex h-full items-stretch gap-10">
                        <div className="flex w-[60%] min-w-0 items-start gap-2 pt-8">
                          <div className="flex-1 space-y-3">
                            <div className="rounded-xl border border-[#eaeaea] bg-white p-4">
                              <div className="mb-3">
                                <h3 className="text-sm font-semibold text-[#303030]">Headlines</h3>
                              </div>
                              <div className="space-y-4">
                                {GOOGLE_AD_HEADLINES.map((headline, index) => (
                                  <div key={headline} className="flex items-center justify-between gap-4">
                                    <p className="min-w-0 flex-1 text-sm text-[#303030]">{headline}</p>
                                    <button
                                      key={`google-headline-comment-${index}`}
                                      type="button"
                                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f6f6f6] text-[#303030] hover:bg-[#eaeaea]"
                                      aria-label={`Comment on headline ${index + 1}`}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#eaeaea] bg-white p-4">
                              <div className="mb-3">
                                <h3 className="text-sm font-semibold text-[#303030]">Long headline</h3>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <p className="min-w-0 flex-1 text-sm text-[#303030]">Supercharge your sales growth with innovative strategies</p>
                                <button type="button" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f6f6f6] text-[#303030] hover:bg-[#eaeaea]" aria-label="Comment on long headline">
                                  <MessageSquare className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#eaeaea] bg-white p-4">
                              <div className="mb-3">
                                <h3 className="text-sm font-semibold text-[#303030]">Descriptions</h3>
                              </div>
                              <div className="space-y-4">
                                {GOOGLE_AD_DESCRIPTIONS.map((description, index) => (
                                  <div key={description} className="flex items-start justify-between gap-4">
                                    <p className="min-w-0 flex-1 text-sm leading-[1.45] text-[#303030]">{description}</p>
                                    <button
                                      key={`google-description-comment-${index}`}
                                      type="button"
                                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f6f6f6] text-[#303030] hover:bg-[#eaeaea]"
                                      aria-label={`Comment on description ${index + 1}`}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-xl border border-[#eaeaea] bg-white p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-[#303030]">CTA</h3>
                                <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f6f6f6] text-[#303030] hover:bg-[#eaeaea]" aria-label="Comment on CTA">
                                  <MessageSquare className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-sm text-[#303030]">Learn more</p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 rounded-lg border border-[#F6F6F6] bg-white p-[3px] shadow-[0px_4px_8px_0px_rgba(18,18,18,0.12)]">
                            {[
                              { icon: PenLine, label: "Edit Google Ads frame" },
                              { icon: Sparkles, label: "Regenerate Google Ads frame" },
                              { icon: Clock3, label: "View Google Ads history" },
                              { icon: MoreVertical, label: "More Google Ads actions" },
                            ].map(({ icon: Icon, label }) => (
                              <button
                                key={label}
                                type="button"
                                aria-label={label}
                                onClick={
                                  label === "Edit Google Ads frame"
                                    ? () => {
                                        setSelectedGoogleAdsSection("headlines")
                                        setShowReferences(false)
                                        setIsEditModeOpen(true)
                                      }
                                    : undefined
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-[4px] text-[#303030] transition-colors hover:bg-[#F6F6F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1"
                              >
                                <span className="flex h-4 w-4 items-center justify-center shrink-0">
                                  <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div
                          className="flex flex-1 min-w-[360px] flex-col items-center justify-start gap-6 border border-[#eaeaea] bg-white px-8 py-6"
                          style={{
                            marginRight: isContentViewPanelCollapsed
                              ? "min(calc((1120px - 100vw) / 2), 0px)"
                              : "min(calc((1440px - 100vw) / 2), 0px)"
                          }}
                        >
                          <GoogleAdsPlacementSwitcher
                            value={selectedGoogleAdsPlacement}
                            onChange={setSelectedGoogleAdsPlacement}
                            className="mb-6"
                          />

                          <div className="relative mx-auto w-[280px] rounded-[32px] border border-[#e5e5e5] bg-white p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="h-1.5 w-3 rounded-full bg-[#8E8E8E]" />
                                <div className="h-1 w-16 rounded-full bg-[#D9D9D9]" />
                              </div>
                              <SearchIcon className="h-4 w-4 text-[#8E8E8E]" />
                            </div>
                            <div className="space-y-2 mb-4">
                              {Array.from({ length: 6 }).map((_, index) => (
                                <div key={`google-ads-line-${index}`} className="h-1.5 rounded-full bg-[#E5E5E5]" />
                              ))}
                            </div>
                            <div className="rounded-2xl border border-[#E5E5E5] p-3">
                              <div className="mb-3 h-[92px] rounded-xl bg-gradient-to-r from-[#EAF2FF] to-[#DCEBFF] p-3 flex items-end">
                                <div className="max-w-[150px]">
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1574D2]">Get the all-in-one CRM free for 30 days, then save 40%.</p>
                                  <div className="mt-2 inline-flex rounded-md bg-[#1574D2] px-2 py-1 text-[9px] font-medium text-white">Try Starter free</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="mt-1 h-5 w-5 rounded-full bg-[#1A73E8]" />
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-[#121212]">Accelerate sales growth</p>
                                  <p className="mt-1 text-[11px] leading-[1.35] text-[#5E5E5E]">
                                    Unlock rapid growth with analytics product! Our customers have seen a 30% increase in efficiency.
                                  </p>
                                  <button type="button" className="mt-3 rounded-md border border-[#AECBFA] px-3 py-1 text-[11px] font-medium text-[#1A73E8]">
                                    Learn more
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2">
                              {Array.from({ length: 4 }).map((_, index) => (
                                <div key={`google-ads-bottom-line-${index}`} className="h-1.5 rounded-full bg-[#EAEAEA]" />
                              ))}
                            </div>
                          </div>

                          <div className="mt-8 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#121212]" />
                            <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                            <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                            <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                          </div>
                          <p className="mt-8 max-w-[340px] text-center text-sm leading-[1.45] text-[#5E5E5E]">
                            Google dynamically combines headlines and descriptions based on performance and placement.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : contentViewType === "landing-pages" ? (
                    LANDING_PAGE_PREVIEW_ACCOUNTS.map((companyName, index) => (
                      <motion.div
                        key={`landing-page-${companyName}`}
                        className="flex-shrink-0 pr-[60px]"
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150, damping: 24, delay: index * 0.08 }}
                      >
                        <div className="w-[640px]">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-[#303030]">{companyName}</h3>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                <MessageSquare className="w-4 h-4 text-[#303030]" />
                              </div>
                              <span className="text-sm font-medium text-[#303030]">3</span>
                            </div>
                          </div>
                          <div className="relative w-[640px]">
                            <div className="bg-white rounded-lg border border-[#eaeaea] p-6 shadow-sm hover:shadow-md transition-shadow w-[640px]">
                              <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                  <img src={FIGMA_LANDING_LOGO} alt="Adobe logo" className="w-8 h-8 object-cover" />
                                  <p className="text-sm font-semibold text-black">Adobe</p>
                                </div>
                                <button className="h-6 px-3 bg-black text-white text-xs font-medium rounded-lg">
                                  Request a demo
                                </button>
                              </div>

                              <div className="flex gap-4 items-start mb-12">
                                <div className="w-[288px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                                  <img src={FIGMA_LANDING_HERO} alt="Creative Cloud hero" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[28px] leading-[1.2] font-semibold text-[#121212] mb-4">
                                    Save over 40% on Creative Cloud Pro.
                                  </h4>
                                  <p className="text-xs leading-[1.4] text-[#303030] mb-3">
                                    Get Photoshop, Illustrator, Premiere, Acrobat Pro, and more, plus Adobe Firefly
                                    creative AI for images, video, and audio. New subscribers only. First year only.
                                    <a href="https://www.adobe.com/in/offer-terms/cc_full_special_offer.html" className="underline ml-1">
                                      See terms
                                    </a>.
                                  </p>
                                  <p className="text-xs leading-[1.4] text-[#303030]">
                                    Work smarter and faster with the industry-standard tools pros depend on.
                                  </p>
                                </div>
                              </div>

                              <div>
                                <div className="text-center mb-8">
                                  <h5 className="text-[28px] leading-[1.2] font-semibold text-[#121212]">Why choose Creative Cloud.</h5>
                                  <p className="mt-4 text-sm text-[#303030]">
                                    Membership perks include tutorials, fonts, templates and more.
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                                  {[
                                    { icon: "🏅", title: "A complete creative ecosystem", body: "Find every app you need for photo, design, video and more." },
                                    { icon: "🎁", title: "30,000+ professional fonts", body: "Find the perfect type for any project with Adobe Fonts." },
                                    { icon: "💎", title: "A complete creative ecosystem", body: "Meet any deadline with Adobe Stock and free creative assets." },
                                    { icon: "🎬", title: "30,000+ professional fonts", body: "Create standout video with templates and premium assets." },
                                    { icon: "🚀", title: "A complete creative ecosystem", body: "Move from concept to production without switching tools." },
                                    { icon: "🎮", title: "A complete creative ecosystem", body: "Build polished projects faster with production-ready content." },
                                  ].map((item) => (
                                    <div key={`${companyName}-${item.title}-${item.icon}`} className="text-center">
                                      <div className="text-4xl mb-2">{item.icon}</div>
                                      <p className="text-sm leading-[1.4] font-semibold text-[#303030] mb-2">{item.title}</p>
                                      <p className="text-xs leading-[1.4] text-[#303030]">{item.body}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-0 right-[-60px] bg-white border border-[#f6f6f6] rounded-lg shadow-[0px_4px_8px_0px_rgba(18,18,18,0.12)] p-[3px] flex flex-col gap-1">
                              {[
                                { icon: PenLine, label: "Edit landing page" },
                                { icon: Expand, label: "Expand landing page" },
                                { icon: Sparkles, label: "Regenerate landing page" },
                                { icon: Clock3, label: "View version history" },
                                { icon: MoreVertical, label: "More actions" },
                              ].map(({ icon: Icon, label }) => (
                                <button
                                  key={`${companyName}-${label}`}
                                  type="button"
                                  aria-label={label}
                                  onClick={
                                    label === "Edit landing page"
                                      ? () => {
                                          setEditModeCompanyName(companyName)
                                          setIsEditModeOpen(true)
                                        }
                                      : undefined
                                  }
                                  className="w-10 h-10 rounded-[4px] flex items-center justify-center hover:bg-[#f6f6f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1 transition-colors"
                                >
                                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-[#303030]" aria-hidden="true" />
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <>
                  {/* Apple Column */}
                  {!isEditModeOpen && (
                    <motion.div 
                      layout
                      layoutId="apple-frame"
                      className="flex-shrink-0 pr-[60px]"
                      initial={{ x: 200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 150, damping: 24 }}
                      style={{ transformOrigin: "center center" }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-[#303030]">Apple</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-4 h-4 text-[#303030]" />
                          </div>
                          <span className="text-sm font-medium text-[#303030]">3</span>
                        </div>
                      </div>
                      <div className="relative w-[400px]">
                      <div
                        className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
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
                              <DropdownMenuItem onClick={() => handleLinkedInAdEditOpen("Apple")}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <EditableTextBlock
                            blockId="headline"
                            isSelected={selectedBlockId === "headline"}
                            isThinking={blockThinkingId === "headline"}
                            isStreaming={blockStreamingId === "headline"}
                            isFading={blockFadeId === "headline"}
                            streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("headline")}
                            onSelect={() => handleBlockSelect("headline")}
                            className="text-sm text-[#121212] font-medium"
                          >
                            {editBlockContent.headline}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="body"
                            isSelected={selectedBlockId === "body"}
                            isThinking={blockThinkingId === "body"}
                            isStreaming={blockStreamingId === "body"}
                            isFading={blockFadeId === "body"}
                            streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("body")}
                            onSelect={() => handleBlockSelect("body")}
                            className="text-sm text-[#121212] line-clamp-2"
                          >
                            {editBlockContent.body}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="cta"
                            isSelected={selectedBlockId === "cta"}
                            isThinking={blockThinkingId === "cta"}
                            isStreaming={blockStreamingId === "cta"}
                            isFading={blockFadeId === "cta"}
                            streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("cta")}
                            onSelect={() => handleBlockSelect("cta")}
                            className="text-sm text-[#0077b5] font-medium"
                          >
                            {editBlockContent.cta}
                          </EditableTextBlock>
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
                      <FloatingFrameToolbar
                        actions={[
                          { icon: PenLine, label: "Edit LinkedIn ad", onClick: () => handleLinkedInAdEditOpen("Apple") },
                          { icon: Expand, label: "Expand LinkedIn ad" },
                          { icon: Sparkles, label: "Regenerate LinkedIn ad" },
                          { icon: Clock3, label: "View version history" },
                          { icon: MoreVertical, label: "More actions" },
                        ]}
                      />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Tesla Column */}
                  <motion.div 
                    className="flex-shrink-0 pr-[60px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#303030]">Tesla</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#303030]" />
                        </div>
                        <span className="text-sm font-medium text-[#303030]">3</span>
                      </div>
                    </div>
                    <div className="relative w-[400px]">
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
                              <DropdownMenuItem onClick={() => handleLinkedInAdEditOpen("Tesla")}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <EditableTextBlock
                            blockId="headline"
                            isSelected={selectedBlockId === "headline"}
                            isThinking={blockThinkingId === "headline"}
                            isStreaming={blockStreamingId === "headline"}
                            isFading={blockFadeId === "headline"}
                            streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("headline")}
                            onSelect={() => handleBlockSelect("headline")}
                            className="text-sm text-[#121212] font-medium"
                          >
                            {editBlockContent.headline}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="body"
                            isSelected={selectedBlockId === "body"}
                            isThinking={blockThinkingId === "body"}
                            isStreaming={blockStreamingId === "body"}
                            isFading={blockFadeId === "body"}
                            streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("body")}
                            onSelect={() => handleBlockSelect("body")}
                            className="text-sm text-[#121212] line-clamp-2"
                          >
                            {editBlockContent.body}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="cta"
                            isSelected={selectedBlockId === "cta"}
                            isThinking={blockThinkingId === "cta"}
                            isStreaming={blockStreamingId === "cta"}
                            isFading={blockFadeId === "cta"}
                            streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("cta")}
                            onSelect={() => handleBlockSelect("cta")}
                            className="text-sm text-[#0077b5] font-medium"
                          >
                            {editBlockContent.cta}
                          </EditableTextBlock>
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
                    <FloatingFrameToolbar
                      actions={[
                        { icon: PenLine, label: "Edit LinkedIn ad", onClick: () => handleLinkedInAdEditOpen("Tesla") },
                        { icon: Expand, label: "Expand LinkedIn ad" },
                        { icon: Sparkles, label: "Regenerate LinkedIn ad" },
                        { icon: Clock3, label: "View version history" },
                        { icon: MoreVertical, label: "More actions" },
                      ]}
                    />
                    </div>
                  </motion.div>
                  
                  {/* Reliance Column */}
                  <motion.div 
                    className="flex-shrink-0 pr-[60px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#303030]">Reliance</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#303030]" />
                        </div>
                        <span className="text-sm font-medium text-[#303030]">3</span>
                      </div>
                    </div>
                    <div className="relative w-[400px]">
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
                              <DropdownMenuItem onClick={() => handleLinkedInAdEditOpen("Reliance")}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <EditableTextBlock
                            blockId="headline"
                            isSelected={selectedBlockId === "headline"}
                            isThinking={blockThinkingId === "headline"}
                            isStreaming={blockStreamingId === "headline"}
                            isFading={blockFadeId === "headline"}
                            streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("headline")}
                            onSelect={() => handleBlockSelect("headline")}
                            className="text-sm text-[#121212] font-medium"
                          >
                            {editBlockContent.headline}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="body"
                            isSelected={selectedBlockId === "body"}
                            isThinking={blockThinkingId === "body"}
                            isStreaming={blockStreamingId === "body"}
                            isFading={blockFadeId === "body"}
                            streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("body")}
                            onSelect={() => handleBlockSelect("body")}
                            className="text-sm text-[#121212] line-clamp-2"
                          >
                            {editBlockContent.body}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="cta"
                            isSelected={selectedBlockId === "cta"}
                            isThinking={blockThinkingId === "cta"}
                            isStreaming={blockStreamingId === "cta"}
                            isFading={blockFadeId === "cta"}
                            streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("cta")}
                            onSelect={() => handleBlockSelect("cta")}
                            className="text-sm text-[#0077b5] font-medium"
                          >
                            {editBlockContent.cta}
                          </EditableTextBlock>
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
                    <FloatingFrameToolbar
                      actions={[
                        { icon: PenLine, label: "Edit LinkedIn ad", onClick: () => handleLinkedInAdEditOpen("Reliance") },
                        { icon: Expand, label: "Expand LinkedIn ad" },
                        { icon: Sparkles, label: "Regenerate LinkedIn ad" },
                        { icon: Clock3, label: "View version history" },
                        { icon: MoreVertical, label: "More actions" },
                      ]}
                    />
                    </div>
                  </motion.div>
                  
                  {/* Myntra Column */}
                  <motion.div 
                    className="flex-shrink-0 pr-[60px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#303030]">Myntra</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#303030]" />
                        </div>
                        <span className="text-sm font-medium text-[#303030]">3</span>
                      </div>
                    </div>
                    <div className="relative w-[400px]">
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
                              <DropdownMenuItem onClick={() => handleLinkedInAdEditOpen("Myntra")}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <EditableTextBlock
                            blockId="headline"
                            isSelected={selectedBlockId === "headline"}
                            isThinking={blockThinkingId === "headline"}
                            isStreaming={blockStreamingId === "headline"}
                            isFading={blockFadeId === "headline"}
                            streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("headline")}
                            onSelect={() => handleBlockSelect("headline")}
                            className="text-sm text-[#121212] font-medium"
                          >
                            {editBlockContent.headline}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="body"
                            isSelected={selectedBlockId === "body"}
                            isThinking={blockThinkingId === "body"}
                            isStreaming={blockStreamingId === "body"}
                            isFading={blockFadeId === "body"}
                            streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("body")}
                            onSelect={() => handleBlockSelect("body")}
                            className="text-sm text-[#121212] line-clamp-2"
                          >
                            {editBlockContent.body}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="cta"
                            isSelected={selectedBlockId === "cta"}
                            isThinking={blockThinkingId === "cta"}
                            isStreaming={blockStreamingId === "cta"}
                            isFading={blockFadeId === "cta"}
                            streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("cta")}
                            onSelect={() => handleBlockSelect("cta")}
                            className="text-sm text-[#0077b5] font-medium"
                          >
                            {editBlockContent.cta}
                          </EditableTextBlock>
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
                    <FloatingFrameToolbar
                      actions={[
                        { icon: PenLine, label: "Edit LinkedIn ad", onClick: () => handleLinkedInAdEditOpen("Myntra") },
                        { icon: Expand, label: "Expand LinkedIn ad" },
                        { icon: Sparkles, label: "Regenerate LinkedIn ad" },
                        { icon: Clock3, label: "View version history" },
                        { icon: MoreVertical, label: "More actions" },
                      ]}
                    />
                    </div>
                  </motion.div>
                  
                  {/* Open AI Column */}
                  <motion.div 
                    className="flex-shrink-0 pr-[60px]"
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 1.0 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#303030]">Open AI</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#303030]" />
                        </div>
                        <span className="text-sm font-medium text-[#303030]">3</span>
                      </div>
                    </div>
                    <div className="relative w-[400px]">
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
                              <DropdownMenuItem onClick={() => handleLinkedInAdEditOpen("Open AI")}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        {/* Ad Copy */}
                        <div className="space-y-2">
                          <EditableTextBlock
                            blockId="headline"
                            isSelected={selectedBlockId === "headline"}
                            isThinking={blockThinkingId === "headline"}
                            isStreaming={blockStreamingId === "headline"}
                            isFading={blockFadeId === "headline"}
                            streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("headline")}
                            onSelect={() => handleBlockSelect("headline")}
                            className="text-sm text-[#121212] font-medium"
                          >
                            {editBlockContent.headline}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="body"
                            isSelected={selectedBlockId === "body"}
                            isThinking={blockThinkingId === "body"}
                            isStreaming={blockStreamingId === "body"}
                            isFading={blockFadeId === "body"}
                            streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("body")}
                            onSelect={() => handleBlockSelect("body")}
                            className="text-sm text-[#121212] line-clamp-2"
                          >
                            {editBlockContent.body}
                          </EditableTextBlock>
                          <EditableTextBlock
                            blockId="cta"
                            isSelected={selectedBlockId === "cta"}
                            isThinking={blockThinkingId === "cta"}
                            isStreaming={blockStreamingId === "cta"}
                            isFading={blockFadeId === "cta"}
                            streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                            onStreamingComplete={() => handleStreamingComplete("cta")}
                            onSelect={() => handleBlockSelect("cta")}
                            className="text-sm text-[#0077b5] font-medium"
                          >
                            {editBlockContent.cta}
                          </EditableTextBlock>
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
                    <FloatingFrameToolbar
                      actions={[
                        { icon: PenLine, label: "Edit LinkedIn ad", onClick: () => handleLinkedInAdEditOpen("Open AI") },
                        { icon: Expand, label: "Expand LinkedIn ad" },
                        { icon: Sparkles, label: "Regenerate LinkedIn ad" },
                        { icon: Clock3, label: "View version history" },
                        { icon: MoreVertical, label: "More actions" },
                      ]}
                    />
                    </div>
                  </motion.div>
                    </>
                  )}
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
              <motion.div
                className="h-16 bg-black flex items-center justify-between px-6 shrink-0 relative z-[70]"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditModeOpen(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-[6px] bg-white">
                      {contentViewType === "landing-pages" ? (
                        <Image
                          src="/images/Adobe.png"
                          alt="Adobe"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      ) : contentViewType === "google-ads" ? (
                        <Image
                          src="/images/GoogleAds.svg"
                          alt="Google Ads"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <Image
                          src="/images/LinkedIn.svg"
                          alt="LinkedIn"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                    </div>
                    <span className="text-white text-lg font-semibold">
                      {contentViewType === "landing-pages"
                        ? `Editing Landing page for ${editModeCompanyName}`
                        : contentViewType === "google-ads"
                          ? "Editing Google ad"
                          : `Editing Linkedin ad for ${editModeCompanyName}`}
                    </span>
                  </div>
                  {contentViewType !== "google-ads" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1 rounded-md bg-white text-black hover:bg-white/90 h-7 px-4 text-sm font-medium border-0"
                        >
                          {editTopbarOption}
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[8rem]">
                        <DropdownMenuItem onClick={() => setEditTopbarOption("Edge-aligned Divider")}>
                          Edge-aligned Divider
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditTopbarOption("Surface-based Separation")}>
                          Surface-based Separation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditTopbarOption("Framed Side Pane")}>
                          Framed Side Pane
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Warning Tooltip */}
                  <div className="relative flex items-center group">
                    <AlertTriangle className="h-4 w-4 text-[#FF9500]" />
                    <div className="pointer-events-none absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:mt-3 transition-all duration-150">
                      <div className="relative flex flex-col items-center">
                        <div className="rounded-[8px] bg-black text-white text-xs font-light px-4 py-3 shadow-lg whitespace-nowrap">
                          2 other user is editing this content
                        </div>
                        <div className="absolute -top-2 left-8 w-3 h-3 bg-black rotate-45" />
                      </div>
                    </div>
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
              </motion.div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden relative">
                {/* Left: AI Assistant Chat Panel (collapses when references open; Chat button / Hide refs restores it) */}
                <motion.div
                  className="h-full overflow-hidden flex flex-col flex-shrink-0"
                  initial={false}
                  animate={{
                    width: isChatCollapsed ? 0 : 360,
                    minWidth: isChatCollapsed ? 0 : 360,
                    flex: isChatCollapsed ? "0 0 0" : "0 0 360px",
                    opacity: isChatCollapsed ? 0 : 1,
                  }}
                  transition={{
                    width: { type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                    minWidth: { type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                    flex: { type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
                    opacity: { type: "tween", duration: 0.2 },
                  }}
                >
                  <AIPanel
                    ref={aiPanelRef}
                    mode="default"
                    className="h-full"
                    selectedBlockId={isEditModeOpen && contentViewType !== "google-ads" ? selectedBlockId : null}
                    isBlockThinking={contentViewType !== "google-ads" && (!!blockThinkingId || !!blockStreamingId || !!blockFadeId)}
                    onApplyToBlock={isEditModeOpen && contentViewType !== "google-ads" ? handleApplyToBlock : undefined}
                    inputRef={chatInputRef}
                  />
                </motion.div>

                {contentViewType === "google-ads" ? (
                  <div
                    className="flex-1 overflow-y-auto bg-[#EAEAEA]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  >
                    <div className="mx-auto flex h-full w-full max-w-[1120px] items-start gap-10 pl-6 pr-0 py-0">
                      <div className="min-w-0 flex-1 space-y-3 pt-8">
                        <div className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-[#303030]">Headlines</h3>
                          </div>
                          <div className="space-y-3">
                            {GOOGLE_AD_HEADLINES.map((headline, index) => (
                              <div
                                key={`google-edit-headline-${headline}`}
                                className="flex w-full items-start justify-between gap-0 rounded-lg border border-transparent text-left"
                              >
                                <div className="min-w-0 flex-1">
                                  <EditableTextBlock
                                    blockId="headline"
                                    isSelectable={isEditModeOpen}
                                    showBlockToolbar={isEditModeOpen}
                                    isSelected={selectedGoogleAdsTextBlockId === `headline-${index}`}
                                    isThinking={false}
                                    isStreaming={false}
                                    isFading={false}
                                    onSelect={() => handleGoogleAdsTextBlockSelect("headlines", `headline-${index}`)}
                                    className="min-w-0 text-sm text-[#303030]"
                                  >
                                    {headline}
                                  </EditableTextBlock>
                                </div>
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F6] text-[#303030]">
                                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-[#303030]">Long headline</h3>
                          </div>
                          <div className="flex w-full items-start justify-between gap-0 rounded-lg border border-transparent text-left">
                            <div className="min-w-0 flex-1">
                              <EditableTextBlock
                                blockId="headline"
                                isSelectable={isEditModeOpen}
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedGoogleAdsTextBlockId === "long-headline"}
                                isThinking={false}
                                isStreaming={false}
                                isFading={false}
                                onSelect={() => handleGoogleAdsTextBlockSelect("long-headline", "long-headline")}
                                className="text-sm leading-[1.45] text-[#303030]"
                              >
                                Supercharge your sales growth with innovative strategies
                              </EditableTextBlock>
                            </div>
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F6] text-[#303030]">
                              <MessageSquare className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold text-[#303030]">Descriptions</h3>
                          </div>
                          <div className="space-y-3">
                            {GOOGLE_AD_DESCRIPTIONS.map((description, index) => (
                              <div
                                key={`google-edit-description-${index}`}
                                className="flex w-full items-start justify-between gap-0 rounded-lg border border-transparent text-left"
                              >
                                <div className="min-w-0 flex-1">
                                  <EditableTextBlock
                                    blockId="body"
                                    isSelectable={isEditModeOpen}
                                    showBlockToolbar={isEditModeOpen}
                                    isSelected={selectedGoogleAdsTextBlockId === `description-${index}`}
                                    isThinking={false}
                                    isStreaming={false}
                                    isFading={false}
                                    onSelect={() => handleGoogleAdsTextBlockSelect("descriptions", `description-${index}`)}
                                    className="min-w-0 text-sm leading-[1.45] text-[#303030]"
                                  >
                                    {description}
                                  </EditableTextBlock>
                                </div>
                                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F6] text-[#303030]">
                                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-[#303030]">CTA</h3>
                            <div className="rounded-lg border border-transparent bg-[#F6F6F6] px-3 py-1.5 text-sm text-[#303030]">
                              <EditableTextBlock
                                blockId="cta"
                                isSelectable={isEditModeOpen}
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedGoogleAdsTextBlockId === "cta"}
                                isThinking={false}
                                isStreaming={false}
                                isFading={false}
                                onSelect={() => handleGoogleAdsTextBlockSelect("cta", "cta")}
                                className="inline-block text-sm text-[#303030]"
                              >
                                Learn more
                              </EditableTextBlock>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sticky top-6 flex h-full w-[360px] shrink-0 self-start flex-col justify-center rounded-none bg-[var(--tw-ring-offset-color)] px-8 py-6 text-left">
                        <GoogleAdsPlacementSwitcher
                          value={selectedGoogleAdsPlacement}
                          onChange={setSelectedGoogleAdsPlacement}
                          className="mb-6"
                        />

                        <div className="relative mx-auto w-[280px] rounded-[32px] border border-[#E5E5E5] bg-white p-4 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="h-1.5 w-3 rounded-full bg-[#8E8E8E]" />
                              <div className="h-1 w-16 rounded-full bg-[#D9D9D9]" />
                            </div>
                            <SearchIcon className="h-4 w-4 text-[#8E8E8E]" aria-hidden="true" />
                          </div>
                          <div className="mb-4 space-y-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <div key={`google-edit-top-line-${index}`} className="h-1.5 rounded-full bg-[#E5E5E5]" />
                            ))}
                          </div>
                          <div className="rounded-2xl border border-[#E5E5E5] p-3">
                            <div className="mb-3 h-[92px] rounded-xl bg-gradient-to-r from-[#EAF2FF] to-[#DCEBFF] p-3 flex items-end">
                              <div className="max-w-[150px]">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1574D2]">
                                  Get the all-in-one CRM free for 30 days, then save 40%.
                                </p>
                                <div className="mt-2 inline-flex rounded-md bg-[#1574D2] px-2 py-1 text-[9px] font-medium text-white">
                                  Try Starter free
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="mt-1 h-5 w-5 rounded-full bg-[#1A73E8]" />
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-[#121212]">{GOOGLE_AD_HEADLINES[0]}</p>
                                <p className="mt-1 text-[11px] leading-[1.35] text-[#5E5E5E]">
                                  {GOOGLE_AD_DESCRIPTIONS[0]}
                                </p>
                                <button
                                  type="button"
                                  className="mt-3 rounded-md border border-[#AECBFA] px-3 py-1 text-[11px] font-medium text-[#1A73E8]"
                                >
                                  Learn more
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                              <div key={`google-edit-bottom-line-${index}`} className="h-1.5 rounded-full bg-[#EAEAEA]" />
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#121212]" />
                          <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                          <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                          <span className="h-2 w-2 rounded-full bg-[#D9D9D9]" />
                        </div>
                        <p className="mx-auto mt-8 max-w-[270px] text-center text-sm leading-[1.45] text-[#6A6A6A]">
                          Google dynamically combines headlines and descriptions based on performance and placement.
                        </p>

                      </div>
                    </div>
                  </div>
                ) : (
                /* EditorLayout: LeftChat | CanvasWrapper | ReferencePane (Framed Side Pane) OR single grey canvas (other modes) */
                editTopbarOption === "Framed Side Pane" ? (
                  <div className="flex-1 flex min-w-0 overflow-visible">
                  {/* CanvasWrapper: owns canvas space; Apple frame centers in available width */}
                  <div
                    className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-visible bg-[#EAEAEA] min-h-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  >
                    <div className="flex-1 flex items-center justify-center min-h-0 px-6">
                      {/* AppleFrame: centered in canvas; reflows when ReferencePane opens */}
                      {contentViewType === "landing-pages" ? (
                      <motion.div
                        layout
                        layoutId="apple-frame"
                        className="flex-shrink-0 w-[640px] py-6"
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        style={{ transformOrigin: "center center" }}
                      >
                        <div className="flex items-center justify-between mb-2 w-full gap-3">
                          <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{editModeCompanyName}</span>
                          <div className="flex items-center gap-1.5 shrink-0 text-[#5E5E5E]">
                            <span className="w-4 h-4 flex items-center justify-center shrink-0">
                              <Image src="/images/message-square.svg" alt="" width={16} height={16} className="w-4 h-4 object-contain" />
                            </span>
                            <span className="text-xs font-medium">3</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-[#eaeaea] p-6 shadow-sm hover:shadow-md transition-shadow w-[640px]">
                          <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                              <img src={FIGMA_LANDING_LOGO} alt="Adobe logo" className="w-8 h-8 object-cover" />
                              <p className="text-sm font-semibold text-black">Adobe</p>
                            </div>
                            <button className="h-6 px-3 bg-black text-white text-xs font-medium rounded-lg">
                              Request a demo
                            </button>
                          </div>
                          <div className="flex gap-4 items-start mb-12">
                            <div className="w-[288px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                              <img src={FIGMA_LANDING_HERO} alt="Creative Cloud hero" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-3">
                              <EditableTextBlock
                                blockId="headline"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "headline"}
                                isThinking={blockThinkingId === "headline"}
                                isStreaming={blockStreamingId === "headline"}
                                isFading={blockFadeId === "headline"}
                                streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("headline")}
                                onSelect={() => handleBlockSelect("headline")}
                                className="text-[28px] leading-[1.2] font-semibold text-[#121212]"
                              >
                                Save over 40% on Creative Cloud Pro.
                              </EditableTextBlock>
                              <EditableTextBlock
                                blockId="body"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "body"}
                                isThinking={blockThinkingId === "body"}
                                isStreaming={blockStreamingId === "body"}
                                isFading={blockFadeId === "body"}
                                streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("body")}
                                onSelect={() => handleBlockSelect("body")}
                                className="text-xs leading-[1.4] text-[#303030]"
                              >
                                Get Photoshop, Illustrator, Premiere, Acrobat Pro, and more, plus Adobe Firefly creative AI for images, video, and audio. New subscribers only. First year only. See terms.
                              </EditableTextBlock>
                              <p className="text-xs leading-[1.4] text-[#303030]">
                                Work smarter and faster with the industry-standard tools pros depend on.
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="text-center mb-8">
                              <EditableTextBlock
                                blockId="cta"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "cta"}
                                isThinking={blockThinkingId === "cta"}
                                isStreaming={blockStreamingId === "cta"}
                                isFading={blockFadeId === "cta"}
                                streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("cta")}
                                onSelect={() => handleBlockSelect("cta")}
                                className="text-[28px] leading-[1.2] font-semibold text-[#121212] inline-block"
                              >
                                Why choose Creative Cloud.
                              </EditableTextBlock>
                              <p className="mt-4 text-sm text-[#303030]">
                                Membership perks include tutorials, fonts, templates and more.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                              {[
                                { icon: "🏅", title: "A complete creative ecosystem", body: "Find every app you need for photo, design, video and more." },
                                { icon: "🎁", title: "30,000+ professional fonts", body: "Find the perfect type for any project with Adobe Fonts." },
                                { icon: "💎", title: "A complete creative ecosystem", body: "Meet any deadline with Adobe Stock and free creative assets." },
                                { icon: "🎬", title: "30,000+ professional fonts", body: "Create standout video with templates and premium assets." },
                                { icon: "🚀", title: "A complete creative ecosystem", body: "Move from concept to production without switching tools." },
                                { icon: "🎮", title: "A complete creative ecosystem", body: "Build polished projects faster with production-ready content." },
                              ].map((item) => (
                                <div key={`${editModeCompanyName}-${item.title}-${item.icon}`} className="text-center">
                                  <div className="text-4xl mb-2">{item.icon}</div>
                                  <p className="text-sm leading-[1.4] font-semibold text-[#303030] mb-2">{item.title}</p>
                                  <p className="text-xs leading-[1.4] text-[#303030]">{item.body}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      ) : (
                      <motion.div
                        layout
                        layoutId="apple-frame"
                        className="flex-shrink-0 w-[400px] h-full flex flex-col items-center justify-center max-h-full"
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        style={{ transformOrigin: "center center" }}
                      >
                        <div className="flex items-center justify-between mb-2 w-full gap-3">
                          <span className="text-xs font-medium text-[#5E5E5E] shrink-0">Apple</span>
                          <div className="flex items-center gap-1.5 shrink-0 text-[#5E5E5E]">
                            <span className="w-4 h-4 flex items-center justify-center shrink-0">
                              <Image src="/images/message-square.svg" alt="" width={16} height={16} className="w-4 h-4 object-contain" />
                            </span>
                            <span className="text-xs font-medium">3</span>
                          </div>
                        </div>
                        <div
                          className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow h-[675px] flex flex-col min-h-0 w-full"
                        >
                          <div className="space-y-3 flex-1 min-h-0 overflow-y-auto overflow-x-visible">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-[#0077b5] rounded flex items-center justify-center"><span className="text-white text-xs font-semibold">T.</span></div>
                                <span className="text-xs text-[#666666]">131,229 followers</span>
                                <span className="text-xs text-[#666666]">·</span>
                                <span className="text-xs text-[#666666]">Promoted</span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 hover:bg-[#f6f6f6] rounded" aria-label="Open options"><MoreVertical className="h-4 w-4 text-[#666666]" /></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setIsEditModeOpen(true)}>Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="space-y-2">
                              <EditableTextBlock
                                blockId="headline"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "headline"}
                                isThinking={blockThinkingId === "headline"}
                                isStreaming={blockStreamingId === "headline"}
                                isFading={blockFadeId === "headline"}
                                streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("headline")}
                                onSelect={() => handleBlockSelect("headline")}
                                className="text-sm text-[#121212] font-medium"
                              >
                                {editBlockContent.headline}
                              </EditableTextBlock>
                              <EditableTextBlock
                                blockId="body"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "body"}
                                isThinking={blockThinkingId === "body"}
                                isStreaming={blockStreamingId === "body"}
                                isFading={blockFadeId === "body"}
                                streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("body")}
                                onSelect={() => handleBlockSelect("body")}
                                className="text-sm text-[#121212]"
                              >
                                {editBlockContent.body}
                              </EditableTextBlock>
                              <EditableTextBlock
                                blockId="cta"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "cta"}
                                isThinking={blockThinkingId === "cta"}
                                isStreaming={blockStreamingId === "cta"}
                                isFading={blockFadeId === "cta"}
                                streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("cta")}
                                onSelect={() => handleBlockSelect("cta")}
                                className="text-sm text-[#0077b5] font-medium"
                              >
                                {editBlockContent.cta}
                              </EditableTextBlock>
                            </div>
                            <div className="space-y-2">
                              <div className="relative bg-black rounded-lg overflow-hidden">
                                <div className="p-6">
                                  <div className="text-white space-y-2 mb-4">
                                    <h4 className="text-2xl font-bold">Dashboards are dead</h4>
                                    <p className="text-lg">GenAI is the last nail in the coffin</p>
                                  </div>
                                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">Ebook</div>
                                </div>
                                <div className="bg-[#4A90E2] p-8 relative flex items-center justify-center">
                                  <div className="text-white text-center">
                                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                      <div className="w-32 h-32 mx-auto bg-white/30 rounded-lg flex items-center justify-center"><span className="text-4xl">📊</span></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-[#eaeaea] flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center"><span className="text-white text-[10px] font-semibold">T.</span></div>
                              <span className="text-xs text-[#666666]">ThoughtSpot</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs text-[#0077b5] font-medium hover:underline"><span>🔒</span><span>Unlock Full Document</span></button>
                          </div>
                        </div>
                      </motion.div>
                      )}
                    </div>
                  </div>
                  {/* ReferencePane: part of flex layout; width 40px (strip) → 60%; toggle reflows canvas */}
                  <motion.div
                    initial={false}
                    animate={{ width: showReferences ? "65%" : 40 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="flex-shrink-0 overflow-hidden flex flex-col bg-white border-l border-[#D3D3D3] min-h-0"
                    style={{ minWidth: 0 }}
                  >
                    {showReferences ? (
                      <>
                        <button type="button" onClick={() => setShowReferences(false)} className="flex-shrink-0 flex items-center gap-2 h-12 px-4 bg-white border-b border-[#D3D3D3] text-[#303030] text-sm font-medium hover:bg-white transition-colors w-full" aria-label="Hide references">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border-0 border-transparent border-none">
                            <Image src="/images/Icon%20Right.svg" alt="" width={16} height={16} className="h-4 w-4" />
                          </span>
                          <span>References</span>
                        </button>
                        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto p-4 flex items-center">
                          <div className="flex flex-row flex-nowrap gap-6 pb-4 pt-2">
                            {orderedSelectedAccounts.map((companyName) => (
                              contentViewType === "landing-pages" ? (
                              <div key={companyName} className="flex-shrink-0 w-[640px] pt-6">
                                <div className="flex items-center justify-between mb-2 w-full gap-3">
                                  <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{companyName}</span>
                                </div>
                                <div className="bg-white rounded-lg border border-[#eaeaea] shadow-sm h-[834px] w-full overflow-y-auto overflow-x-hidden p-6">
                                  {!loadedReferenceFrames.has(companyName) ? (
                                    <div className="flex flex-col gap-12 h-full" aria-hidden>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="skeleton-shimmer w-8 h-8 rounded" />
                                          <div className="skeleton-shimmer h-4 rounded w-16" />
                                        </div>
                                        <div className="skeleton-shimmer h-6 rounded-lg w-28" />
                                      </div>
                                      <div className="flex gap-4 items-start">
                                        <div className="skeleton-shimmer w-[288px] h-[260px] rounded-2xl shrink-0" />
                                        <div className="flex-1 flex flex-col gap-3 pt-1">
                                          <div className="skeleton-shimmer h-8 rounded w-full" />
                                          <div className="skeleton-shimmer h-8 rounded w-[84%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[92%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[74%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[86%] mt-2" />
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-8">
                                        <div className="flex flex-col items-center gap-4">
                                          <div className="skeleton-shimmer h-8 rounded w-56" />
                                          <div className="skeleton-shimmer h-8 rounded w-44" />
                                          <div className="skeleton-shimmer h-4 rounded w-80" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                                          {Array.from({ length: 6 }).map((_, itemIndex) => (
                                            <div key={`${companyName}-landing-ref-skeleton-framed-${itemIndex}`} className="flex flex-col items-center gap-3">
                                              <div className="skeleton-shimmer w-12 h-12 rounded-full" />
                                              <div className="skeleton-shimmer h-4 rounded w-32" />
                                              <div className="skeleton-shimmer h-4 rounded w-28" />
                                              <div className="skeleton-shimmer h-3 rounded w-full" />
                                              <div className="skeleton-shimmer h-3 rounded w-[88%]" />
                                              <div className="skeleton-shimmer h-3 rounded w-[70%]" />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-between mb-12">
                                        <div className="flex items-center gap-4">
                                          <img src={FIGMA_LANDING_LOGO} alt="Adobe logo" className="w-8 h-8 object-cover" />
                                          <p className="text-sm font-semibold text-black">Adobe</p>
                                        </div>
                                        <button className="h-6 px-3 bg-black text-white text-xs font-medium rounded-lg">
                                          Request a demo
                                        </button>
                                      </div>
                                      <div className="flex gap-4 items-start mb-12">
                                        <div className="w-[288px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                                          <img src={FIGMA_LANDING_HERO} alt="Creative Cloud hero" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-[28px] leading-[1.2] font-semibold text-[#121212] mb-4">
                                            Save over 40% on Creative Cloud Pro.
                                          </h4>
                                          <p className="text-xs leading-[1.4] text-[#303030] mb-3">
                                            Get Photoshop, Illustrator, Premiere, Acrobat Pro, and more, plus Adobe Firefly
                                            creative AI for images, video, and audio. New subscribers only. First year only.
                                            <a href="https://www.adobe.com/in/offer-terms/cc_full_special_offer.html" className="underline ml-1">
                                              See terms
                                            </a>.
                                          </p>
                                          <p className="text-xs leading-[1.4] text-[#303030]">
                                            Work smarter and faster with the industry-standard tools pros depend on.
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-center mb-8">
                                          <h5 className="text-[28px] leading-[1.2] font-semibold text-[#121212]">Why choose Creative Cloud.</h5>
                                          <p className="mt-4 text-sm text-[#303030]">
                                            Membership perks include tutorials, fonts, templates and more.
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                                          {[
                                            { icon: "🏅", title: "A complete creative ecosystem", body: "Find every app you need for photo, design, video and more." },
                                            { icon: "🎁", title: "30,000+ professional fonts", body: "Find the perfect type for any project with Adobe Fonts." },
                                            { icon: "💎", title: "A complete creative ecosystem", body: "Meet any deadline with Adobe Stock and free creative assets." },
                                            { icon: "🎬", title: "30,000+ professional fonts", body: "Create standout video with templates and premium assets." },
                                            { icon: "🚀", title: "A complete creative ecosystem", body: "Move from concept to production without switching tools." },
                                            { icon: "🎮", title: "A complete creative ecosystem", body: "Build polished projects faster with production-ready content." },
                                          ].map((item) => (
                                            <div key={`${companyName}-framed-ref-${item.title}-${item.icon}`} className="text-center">
                                              <div className="text-4xl mb-2">{item.icon}</div>
                                              <p className="text-sm leading-[1.4] font-semibold text-[#303030] mb-2">{item.title}</p>
                                              <p className="text-xs leading-[1.4] text-[#303030]">{item.body}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              ) : (
                              <div key={companyName} className="flex-shrink-0 w-[400px]">
                                <div className="flex items-center justify-between mb-2 w-full gap-3">
                                  <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{companyName}</span>
                                </div>
                                <div className="bg-white rounded-lg border border-[#eaeaea] shadow-sm h-[675px] flex flex-col min-h-0 w-full overflow-hidden">
                                  {!loadedReferenceFrames.has(companyName) ? (
                                    /* Skeleton loader - Figma 2514:59960, #F6F6F6 */
                                    <div className="flex flex-col h-full">
                                      <div className="p-4 flex flex-col gap-4 flex-shrink-0">
                                        <div className="flex gap-6 items-start">
                                          <div className="skeleton-shimmer shrink-0 size-12 rounded" aria-hidden />
                                          <div className="flex flex-1 flex-col gap-1">
                                            <div className="skeleton-shimmer h-3.5 rounded w-20" aria-hidden />
                                            <div className="skeleton-shimmer h-3.5 rounded w-[104px]" aria-hidden />
                                            <div className="skeleton-shimmer h-3.5 rounded w-16" aria-hidden />
                                          </div>
                                          <MoreVertical className="h-5 w-5 text-[#E5E5E5] shrink-0" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                      </div>
                                      <div className="skeleton-shimmer flex-1 min-h-[120px]" aria-hidden />
                                      <div className="bg-[#EDF4FE] flex items-center justify-center gap-1 p-4 rounded-b-lg flex-shrink-0">
                                        <Lock className="h-5 w-5 text-[#215CDF]" aria-hidden />
                                        <span className="text-sm font-semibold text-[#215CDF]">Unlock Full Document</span>
                                      </div>
                                    </div>
                                  ) : (
                                  <>
                                  {/* Apple frame design - 400×675 */}
                                  <div className="flex flex-col flex-1 min-h-0 space-y-3 overflow-y-auto p-4">
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
                                      <EditableTextBlock
                                        blockId="headline"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "headline"}
                                        isStreaming={blockStreamingId === "headline"}
                                        isFading={blockFadeId === "headline"}
                                        streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("headline")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#121212] font-medium"
                                      >
                                        {editBlockContent.headline}
                                      </EditableTextBlock>
                                      <EditableTextBlock
                                        blockId="body"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "body"}
                                        isStreaming={blockStreamingId === "body"}
                                        isFading={blockFadeId === "body"}
                                        streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("body")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#121212]"
                                      >
                                        {editBlockContent.body}
                                      </EditableTextBlock>
                                      <EditableTextBlock
                                        blockId="cta"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "cta"}
                                        isStreaming={blockStreamingId === "cta"}
                                        isFading={blockFadeId === "cta"}
                                        streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("cta")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#0077b5] font-medium"
                                      >
                                        {editBlockContent.cta}
                                      </EditableTextBlock>
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
                                  </>
                                  )}
                                </div>
                              </div>
                              )
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowReferences(true)}
                        className="w-10 h-full flex flex-col items-center justify-start pt-2 gap-[50px] bg-white hover:bg-gray-100 border-0 transition-colors shrink-0"
                        aria-label="View references"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#D3D3D3] bg-[#F6F6F6]">
                          <Image src="/images/Icon%20Right.svg" alt="" width={16} height={16} className="h-4 w-4" />
                        </span>
                        <span className="text-[#303030] text-xs font-medium whitespace-nowrap [writing-mode:vertical] [text-orientation:mixed] -rotate-[270deg] select-none">View references</span>
                      </button>
                    )}
                  </motion.div>
                </div>
                ) : (
                /* Other modes: single grey canvas with overlay button and inline reference pane */
                <div
                  className={`relative flex-1 flex flex-col overflow-y-auto bg-[#EAEAEA] min-h-0 ${showReferences ? "overflow-x-auto" : "overflow-x-visible"}`}
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                >
                  {!showReferences && (
                    <button
                      type="button"
                      onClick={() => setShowReferences(true)}
                      className="absolute top-4 right-4 z-10 inline-flex items-center justify-center gap-2 rounded-lg bg-[#F6F6F6] text-[#303030] hover:bg-[#EAEAEA] border-0 shadow-none h-8 w-[160px] pl-3 py-2 text-xs font-medium transition-colors"
                      style={{ background: 'unset' }}
                    >
                      <span className="text-[#303030] w-[100px]">View references</span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F6F6F6]">
                        <Image src="/images/Icon%20Left.svg" alt="" width={16} height={16} className="h-4 w-4" />
                      </span>
                    </button>
                  )}
                  <div className="pl-6 py-0 flex-1 flex flex-col min-h-0 min-w-0" style={{ borderWidth: 0, borderColor: 'transparent', borderStyle: 'none', borderImage: 'none' }}>
                    <div className="max-w-8xl mx-auto flex flex-row gap-10 flex-1 items-center min-w-0 min-h-0 w-full">
                      <motion.div
                        initial={false}
                        animate={{ flex: showReferences ? "0 0 400px" : 1 }}
                        transition={{ type: "spring", stiffness: 70, damping: 18 }}
                        className="flex-shrink-0 flex flex-col items-center justify-center h-full"
                        style={{ overflow: "visible", minWidth: showReferences ? 400 : undefined }}
                      >
                      {contentViewType === "landing-pages" ? (
                      <motion.div
                        layout
                        layoutId="apple-frame"
                        className="flex-shrink-0 w-[640px] py-6"
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        style={{ transformOrigin: "center center" }}
                      >
                        <div className="flex items-center justify-between mb-2 w-full gap-3">
                          <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{editModeCompanyName}</span>
                          <div className="flex items-center gap-1.5 shrink-0 text-[#5E5E5E]">
                            <span className="w-4 h-4 flex items-center justify-center shrink-0">
                              <Image src="/images/message-square.svg" alt="" width={16} height={16} className="w-4 h-4 object-contain" />
                            </span>
                            <span className="text-xs font-medium">3</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-[#eaeaea] p-6 shadow-sm hover:shadow-md transition-shadow w-[640px]">
                          <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                              <img src={FIGMA_LANDING_LOGO} alt="Adobe logo" className="w-8 h-8 object-cover" />
                              <p className="text-sm font-semibold text-black">Adobe</p>
                            </div>
                            <button className="h-6 px-3 bg-black text-white text-xs font-medium rounded-lg">
                              Request a demo
                            </button>
                          </div>
                          <div className="flex gap-4 items-start mb-12">
                            <div className="w-[288px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                              <img src={FIGMA_LANDING_HERO} alt="Creative Cloud hero" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-3">
                              <EditableTextBlock
                                blockId="headline"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "headline"}
                                isThinking={blockThinkingId === "headline"}
                                isStreaming={blockStreamingId === "headline"}
                                isFading={blockFadeId === "headline"}
                                streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("headline")}
                                onSelect={() => handleBlockSelect("headline")}
                                className="text-[28px] leading-[1.2] font-semibold text-[#121212]"
                              >
                                Save over 40% on Creative Cloud Pro.
                              </EditableTextBlock>
                              <EditableTextBlock
                                blockId="body"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "body"}
                                isThinking={blockThinkingId === "body"}
                                isStreaming={blockStreamingId === "body"}
                                isFading={blockFadeId === "body"}
                                streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("body")}
                                onSelect={() => handleBlockSelect("body")}
                                className="text-xs leading-[1.4] text-[#303030]"
                              >
                                Get Photoshop, Illustrator, Premiere, Acrobat Pro, and more, plus Adobe Firefly creative AI for images, video, and audio. New subscribers only. First year only. See terms.
                              </EditableTextBlock>
                              <p className="text-xs leading-[1.4] text-[#303030]">
                                Work smarter and faster with the industry-standard tools pros depend on.
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="text-center mb-8">
                              <EditableTextBlock
                                blockId="cta"
                                showBlockToolbar={isEditModeOpen}
                                isSelected={selectedBlockId === "cta"}
                                isThinking={blockThinkingId === "cta"}
                                isStreaming={blockStreamingId === "cta"}
                                isFading={blockFadeId === "cta"}
                                streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                                onStreamingComplete={() => handleStreamingComplete("cta")}
                                onSelect={() => handleBlockSelect("cta")}
                                className="text-[28px] leading-[1.2] font-semibold text-[#121212] inline-block"
                              >
                                Why choose Creative Cloud.
                              </EditableTextBlock>
                              <p className="mt-4 text-sm text-[#303030]">
                                Membership perks include tutorials, fonts, templates and more.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                              {[
                                { icon: "🏅", title: "A complete creative ecosystem", body: "Find every app you need for photo, design, video and more." },
                                { icon: "🎁", title: "30,000+ professional fonts", body: "Find the perfect type for any project with Adobe Fonts." },
                                { icon: "💎", title: "A complete creative ecosystem", body: "Meet any deadline with Adobe Stock and free creative assets." },
                                { icon: "🎬", title: "30,000+ professional fonts", body: "Create standout video with templates and premium assets." },
                                { icon: "🚀", title: "A complete creative ecosystem", body: "Move from concept to production without switching tools." },
                                { icon: "🎮", title: "A complete creative ecosystem", body: "Build polished projects faster with production-ready content." },
                              ].map((item) => (
                                <div key={`${editModeCompanyName}-inline-${item.title}-${item.icon}`} className="text-center">
                                  <div className="text-4xl mb-2">{item.icon}</div>
                                  <p className="text-sm leading-[1.4] font-semibold text-[#303030] mb-2">{item.title}</p>
                                  <p className="text-xs leading-[1.4] text-[#303030]">{item.body}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      ) : (
                      <motion.div
                        layout
                        layoutId="apple-frame"
                        className="flex-shrink-0 w-[400px] h-full flex flex-col items-center justify-center"
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        style={{ transformOrigin: "center center" }}
                      >
                        <div className="flex items-center justify-between mb-2 w-full gap-3">
                          <span className="text-xs font-medium text-[#5E5E5E] shrink-0">Apple</span>
                          <div className="flex items-center gap-1.5 shrink-0 text-[#5E5E5E]">
                            <span className="w-4 h-4 flex items-center justify-center shrink-0">
                              <Image
                                src="/images/message-square.svg"
                                alt=""
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                              />
                            </span>
                            <span className="text-xs font-medium">3</span>
                          </div>
                        </div>
                        <div
                          className="bg-white rounded-lg border border-[#eaeaea] p-4 shadow-sm hover:shadow-md transition-shadow h-[675px] flex flex-col min-h-0 w-full"
                        >
                        {/* Ad Preview Content */}
                        <div className="space-y-3 flex-1 min-h-0 overflow-y-auto overflow-x-visible">
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
                            <EditableTextBlock
                              blockId="headline"
                              showBlockToolbar={isEditModeOpen}
                              isSelected={selectedBlockId === "headline"}
                              isThinking={blockThinkingId === "headline"}
                              isStreaming={blockStreamingId === "headline"}
                              isFading={blockFadeId === "headline"}
                              streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                              onStreamingComplete={() => handleStreamingComplete("headline")}
                              onSelect={() => handleBlockSelect("headline")}
                              className="text-sm text-[#121212] font-medium"
                            >
                              {editBlockContent.headline}
                            </EditableTextBlock>
                            <EditableTextBlock
                              blockId="body"
                              showBlockToolbar={isEditModeOpen}
                              isSelected={selectedBlockId === "body"}
                              isThinking={blockThinkingId === "body"}
                              isStreaming={blockStreamingId === "body"}
                              isFading={blockFadeId === "body"}
                              streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                              onStreamingComplete={() => handleStreamingComplete("body")}
                              onSelect={() => handleBlockSelect("body")}
                              className="text-sm text-[#121212]"
                            >
                              {editBlockContent.body}
                            </EditableTextBlock>
                            <EditableTextBlock
                              blockId="cta"
                              showBlockToolbar={isEditModeOpen}
                              isSelected={selectedBlockId === "cta"}
                              isThinking={blockThinkingId === "cta"}
                              isStreaming={blockStreamingId === "cta"}
                              isFading={blockFadeId === "cta"}
                              streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                              onStreamingComplete={() => handleStreamingComplete("cta")}
                              onSelect={() => handleBlockSelect("cta")}
                              className="text-sm text-[#0077b5] font-medium"
                            >
                              {editBlockContent.cta}
                            </EditableTextBlock>
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
                      )}
                      </motion.div>
                      <motion.div
                        initial={false}
                        animate={{
                          flex: showReferences ? 1 : 0,
                          width: showReferences ? "auto" : 0,
                          minWidth: showReferences ? 0 : 0,
                        }}
                        transition={{ type: "tween", duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-shrink-0 overflow-hidden min-w-0"
                        style={{
                          height: "100%",
                          ...(editTopbarOption === "Surface-based Separation" && showReferences ? { maxWidth: "60%" } : {}),
                        }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: showReferences ? 0 : "100%" }}
                          transition={{ type: "tween", duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                          className={`flex flex-col justify-stretch h-full w-full min-w-full ${!showReferences ? "pointer-events-none" : ""} ${showReferences ? "border-l border-[#D3D3D3]" : ""} ${editTopbarOption === "Surface-based Separation" ? "bg-[#F6F6F6]" : ""}`}
                          style={{ minWidth: "100%" }}
                        >
                        {/* Pane header: 48px height, label and button aligned left */}
                        {showReferences && (
                          <div className="flex-shrink-0 flex items-center justify-between gap-0 h-12 px-4 border-b border-[#D3D3D3] bg-white">
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => setShowReferences(false)}
                                aria-label="Collapse reference pane"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-[#EAEAEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-2 transition-colors"
                              >
                                <Image src="/images/Icon%20Right.svg" alt="" width={16} height={16} className="h-4 w-4 rotate-180" aria-hidden />
                              </button>
                              <span className="text-sm font-medium text-[#303030]">References of other accounts</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  type="button"
                                  className="inline-flex items-center justify-center gap-0 rounded-lg bg-[#F6F6F6] text-[#303030] hover:bg-[#EAEAEA] border-0 shadow-none h-8 w-[168px] pl-0 pr-0 py-2 text-xs font-medium transition-colors"
                                >
                                  <span className="text-[#303030] w-[120px]">Select references</span>
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F6F6F6]">
                                    <ChevronDown className="h-4 w-4 text-[#303030]" />
                                  </span>
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start" className="w-[350px] p-0 overflow-hidden rounded-lg border border-[#E5E5E5] bg-white shadow-lg">
                                <div className="p-4 space-y-4">
                                  {/* Personalisation by header */}
                                  <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-[#303030]">Personalisation by</h3>
                                    <div className="flex items-center justify-between gap-2 rounded-md border border-[#E5E5E5] bg-[#F6F6F6] h-[30px] px-3">
                                      <span className="text-xs text-[#303030]">Account and persona</span>
                                      <div className="flex items-center gap-1 shrink-0">
                                        <span className="text-xs text-[#5E5E5E]">(130)</span>
                                        <ChevronDown className="h-4 w-4 text-[#303030]" aria-hidden />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="h-px bg-[#E5E5E5]" />
                                  {/* Personas */}
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-[#303030]">Personas</h4>
                                    <RadioGroup value={selectedPersona} onValueChange={setSelectedPersona} className="flex flex-col gap-2">
                                      <label className="flex items-center gap-2 cursor-pointer py-1.5 rounded hover:bg-[#F6F6F6] focus-within:bg-[#F6F6F6]">
                                        <RadioGroupItem value="data-leader" id="persona-data" className="border-[#303030]" />
                                        <span className="text-sm text-[#303030]">Data leader</span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer py-1.5 rounded hover:bg-[#F6F6F6] focus-within:bg-[#F6F6F6]">
                                        <RadioGroupItem value="digital-transformation" id="persona-digital" className="border-[#303030]" />
                                        <span className="text-sm text-[#303030]">Digital transformation leader</span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer py-1.5 rounded hover:bg-[#F6F6F6] focus-within:bg-[#F6F6F6]">
                                        <RadioGroupItem value="product-leader" id="persona-product" className="border-[#303030]" />
                                        <span className="text-sm text-[#303030]">Product leader</span>
                                      </label>
                                      <label className="flex items-center gap-2 cursor-pointer py-1.5 rounded hover:bg-[#F6F6F6] focus-within:bg-[#F6F6F6]">
                                        <RadioGroupItem value="finance-leader" id="persona-finance" className="border-[#303030]" />
                                        <span className="text-sm text-[#303030]">Finance leader</span>
                                      </label>
                                    </RadioGroup>
                                  </div>
                                  <div className="h-px bg-[#E5E5E5]" />
                                  {/* Accounts */}
                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="text-sm font-semibold text-[#303030]">Accounts</h4>
                                      <p className="text-xs text-[#5E5E5E] mt-1">You can select up to 2 accounts at a time</p>
                                    </div>
                                    {/* Selected tags */}
                                    {selectedAccounts.length > 0 && (
                                      <div className="flex flex-wrap gap-2">
                                        {selectedAccounts.map((account) => (
                                          <span
                                            key={account}
                                            className="inline-flex items-center gap-1.5 rounded-md bg-[#F6F6F6] px-2 py-1 text-xs text-[#303030]"
                                          >
                                            {account}
                                            <button
                                              type="button"
                                              onClick={() => setSelectedAccounts((prev) => prev.filter((a) => a !== account))}
                                              className="hover:bg-[#EAEAEA] rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#303030] focus-visible:ring-offset-1"
                                              aria-label={`Remove ${account}`}
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    {/* Search */}
                                    <div className="relative">
                                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8E8E8E]" aria-hidden />
                                      <Input
                                        placeholder="Search accounts"
                                        value={accountSearch}
                                        onChange={(e) => setAccountSearch(e.target.value)}
                                        className="pl-9 h-8 text-xs bg-[#F6F6F6] border-[#E5E5E5]"
                                        aria-label="Search accounts"
                                      />
                                    </div>
                                    {/* Account list */}
                                    <div className="max-h-[200px] overflow-y-auto space-y-1 pr-1">
                                      {ALL_ACCOUNTS.filter((a) =>
                                        a.toLowerCase().includes(accountSearch.toLowerCase())
                                      ).map((account) => (
                                        <label
                                          key={account}
                                          className="flex items-center gap-2 cursor-pointer py-1.5 px-2 rounded hover:bg-[#F6F6F6] focus-within:bg-[#F6F6F6]"
                                        >
                                          <Checkbox
                                            checked={selectedAccounts.includes(account)}
                                            onCheckedChange={(checked) => {
                                              setSelectedAccounts((prev) => {
                                                if (checked) {
                                                  if (prev.length >= 2) return prev
                                                  return [...prev, account]
                                                }
                                                return prev.filter((a) => a !== account)
                                              })
                                            }}
                                            disabled={!selectedAccounts.includes(account) && selectedAccounts.length >= 2}
                                            className="border-[#303030] data-[state=checked]:bg-[#303030]"
                                          />
                                          <span className="text-sm text-[#303030]">{account}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                        <div className="overflow-x-auto -mx-6 pl-12 pr-6 w-full min-w-[1200px] pt-0 flex-1 min-h-0 flex items-center">
                        <div className="flex flex-row flex-nowrap gap-6 pb-4 justify-center items-start" style={{ width: 'max-content' }}>
                          {/* Reference Cards */}
                          {orderedSelectedAccounts.map((companyName) => (
                              contentViewType === "landing-pages" ? (
                              <div key={companyName} className="flex-shrink-0 w-[640px] pt-12">
                                <div className="flex items-center justify-between mb-2 w-full gap-3">
                                  <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{companyName}</span>
                                </div>
                                <div className="bg-white rounded-lg border border-[#eaeaea] shadow-sm h-[834px] w-full overflow-y-auto overflow-x-hidden p-6">
                                  {!loadedReferenceFrames.has(companyName) ? (
                                    <div className="flex flex-col gap-12 h-full" aria-hidden>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                          <div className="skeleton-shimmer w-8 h-8 rounded" />
                                          <div className="skeleton-shimmer h-4 rounded w-16" />
                                        </div>
                                        <div className="skeleton-shimmer h-6 rounded-lg w-28" />
                                      </div>
                                      <div className="flex gap-4 items-start">
                                        <div className="skeleton-shimmer w-[288px] h-[260px] rounded-2xl shrink-0" />
                                        <div className="flex-1 flex flex-col gap-3 pt-1">
                                          <div className="skeleton-shimmer h-8 rounded w-full" />
                                          <div className="skeleton-shimmer h-8 rounded w-[84%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[92%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[74%]" />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[86%] mt-2" />
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-8">
                                        <div className="flex flex-col items-center gap-4">
                                          <div className="skeleton-shimmer h-8 rounded w-56" />
                                          <div className="skeleton-shimmer h-8 rounded w-44" />
                                          <div className="skeleton-shimmer h-4 rounded w-80" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                                          {Array.from({ length: 6 }).map((_, itemIndex) => (
                                            <div key={`${companyName}-landing-ref-skeleton-inline-${itemIndex}`} className="flex flex-col items-center gap-3">
                                              <div className="skeleton-shimmer w-12 h-12 rounded-full" />
                                              <div className="skeleton-shimmer h-4 rounded w-32" />
                                              <div className="skeleton-shimmer h-4 rounded w-28" />
                                              <div className="skeleton-shimmer h-3 rounded w-full" />
                                              <div className="skeleton-shimmer h-3 rounded w-[88%]" />
                                              <div className="skeleton-shimmer h-3 rounded w-[70%]" />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-between mb-12">
                                        <div className="flex items-center gap-4">
                                          <img src={FIGMA_LANDING_LOGO} alt="Adobe logo" className="w-8 h-8 object-cover" />
                                          <p className="text-sm font-semibold text-black">Adobe</p>
                                        </div>
                                        <button className="h-6 px-3 bg-black text-white text-xs font-medium rounded-lg">
                                          Request a demo
                                        </button>
                                      </div>
                                      <div className="flex gap-4 items-start mb-12">
                                        <div className="w-[288px] h-[260px] rounded-2xl overflow-hidden flex-shrink-0">
                                          <img src={FIGMA_LANDING_HERO} alt="Creative Cloud hero" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-[28px] leading-[1.2] font-semibold text-[#121212] mb-4">
                                            Save over 40% on Creative Cloud Pro.
                                          </h4>
                                          <p className="text-xs leading-[1.4] text-[#303030] mb-3">
                                            Get Photoshop, Illustrator, Premiere, Acrobat Pro, and more, plus Adobe Firefly
                                            creative AI for images, video, and audio. New subscribers only. First year only.
                                            <a href="https://www.adobe.com/in/offer-terms/cc_full_special_offer.html" className="underline ml-1">
                                              See terms
                                            </a>.
                                          </p>
                                          <p className="text-xs leading-[1.4] text-[#303030]">
                                            Work smarter and faster with the industry-standard tools pros depend on.
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-center mb-8">
                                          <h5 className="text-[28px] leading-[1.2] font-semibold text-[#121212]">Why choose Creative Cloud.</h5>
                                          <p className="mt-4 text-sm text-[#303030]">
                                            Membership perks include tutorials, fonts, templates and more.
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                                          {[
                                            { icon: "🏅", title: "A complete creative ecosystem", body: "Find every app you need for photo, design, video and more." },
                                            { icon: "🎁", title: "30,000+ professional fonts", body: "Find the perfect type for any project with Adobe Fonts." },
                                            { icon: "💎", title: "A complete creative ecosystem", body: "Meet any deadline with Adobe Stock and free creative assets." },
                                            { icon: "🎬", title: "30,000+ professional fonts", body: "Create standout video with templates and premium assets." },
                                            { icon: "🚀", title: "A complete creative ecosystem", body: "Move from concept to production without switching tools." },
                                            { icon: "🎮", title: "A complete creative ecosystem", body: "Build polished projects faster with production-ready content." },
                                          ].map((item) => (
                                            <div key={`${companyName}-inline-ref-${item.title}-${item.icon}`} className="text-center">
                                              <div className="text-4xl mb-2">{item.icon}</div>
                                              <p className="text-sm leading-[1.4] font-semibold text-[#303030] mb-2">{item.title}</p>
                                              <p className="text-xs leading-[1.4] text-[#303030]">{item.body}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              ) : (
                              <div key={companyName} className="flex-shrink-0 w-[400px]">
                                <div className="flex items-center justify-between mb-2 w-full gap-3">
                                  <span className="text-xs font-medium text-[#5E5E5E] shrink-0">{companyName}</span>
                                </div>
                                <div className="bg-white rounded-lg border border-[#eaeaea] shadow-sm h-[675px] flex flex-col min-h-0 w-full overflow-hidden">
                                  {!loadedReferenceFrames.has(companyName) ? (
                                    /* Skeleton loader - Figma 2514:59960, #F6F6F6 */
                                    <div className="flex flex-col h-full">
                                      <div className="p-4 flex flex-col gap-4 flex-shrink-0">
                                        <div className="flex gap-6 items-start">
                                          <div className="skeleton-shimmer shrink-0 size-12 rounded" aria-hidden />
                                          <div className="flex flex-1 flex-col gap-1">
                                            <div className="skeleton-shimmer h-3.5 rounded w-20" aria-hidden />
                                            <div className="skeleton-shimmer h-3.5 rounded w-[104px]" aria-hidden />
                                            <div className="skeleton-shimmer h-3.5 rounded w-16" aria-hidden />
                                          </div>
                                          <MoreVertical className="h-5 w-5 text-[#E5E5E5] shrink-0" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="skeleton-shimmer h-3.5 rounded w-full" aria-hidden />
                                          <div className="skeleton-shimmer h-3.5 rounded w-[204px]" aria-hidden />
                                        </div>
                                      </div>
                                      <div className="skeleton-shimmer flex-1 min-h-[120px]" aria-hidden />
                                      <div className="bg-[#EDF4FE] flex items-center justify-center gap-1 p-4 rounded-b-lg flex-shrink-0">
                                        <Lock className="h-5 w-5 text-[#215CDF]" aria-hidden />
                                        <span className="text-sm font-semibold text-[#215CDF]">Unlock Full Document</span>
                                      </div>
                                    </div>
                                  ) : (
                                  <>
                                  {/* Ad Preview Content */}
                                  <div className="flex flex-col flex-1 min-h-0 space-y-3 overflow-y-auto p-4">
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
                                      <EditableTextBlock
                                        blockId="headline"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "headline"}
                                        isStreaming={blockStreamingId === "headline"}
                                        isFading={blockFadeId === "headline"}
                                        streamingText={streamingTarget?.blockId === "headline" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("headline")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#121212] font-medium"
                                      >
                                        {editBlockContent.headline}
                                      </EditableTextBlock>
                                      <EditableTextBlock
                                        blockId="body"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "body"}
                                        isStreaming={blockStreamingId === "body"}
                                        isFading={blockFadeId === "body"}
                                        streamingText={streamingTarget?.blockId === "body" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("body")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#121212]"
                                      >
                                        {editBlockContent.body}
                                      </EditableTextBlock>
                                      <EditableTextBlock
                                        blockId="cta"
                                        isSelectable={false}
                                        showBlockToolbar={isEditModeOpen}
                                        isSelected={false}
                                        isThinking={blockThinkingId === "cta"}
                                        isStreaming={blockStreamingId === "cta"}
                                        isFading={blockFadeId === "cta"}
                                        streamingText={streamingTarget?.blockId === "cta" ? streamingTarget.text : undefined}
                                        onStreamingComplete={() => handleStreamingComplete("cta")}
                                        onSelect={() => {}}
                                        className="text-sm text-[#0077b5] font-medium"
                                      >
                                        {editBlockContent.cta}
                                      </EditableTextBlock>
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
                                  </>
                                  )}
                                </div>
                              </div>
                              )
                            ))}
                        </div>
                        </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                ))}

                {/* Floating Chat button: rendered last with high z-index so it stays on top; click opens chat and closes reference pane */}
                {isChatCollapsed && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (editTopbarOption === "Framed Side Pane") {
                        handleFramedPaneClose()
                      } else {
                        setShowReferences(false)
                      }
                    }}
                    className="absolute left-2 top-2 z-[9999] flex items-center justify-between gap-0 rounded-lg bg-white border border-[#eaeaea] shadow-lg hover:bg-[#f6f6f6] h-11 w-[120px] cursor-pointer px-4"
                    style={{ isolation: "isolate" }}
                    aria-label="Open chat panel and close references"
                  >
                    <span className="text-sm font-medium text-[#303030]">Chat</span>
                    <span className="w-5 h-5 flex items-center justify-center shrink-0">
                      <Image src="/images/panel-left.svg" alt="" width={20} height={20} className="w-5 h-5" />
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </LayoutGroup>
  )
}

