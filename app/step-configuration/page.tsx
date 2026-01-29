"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { LandingPagePreview } from "@/components/landing-page-preview"
import { BackgroundGradient } from "@/components/background-gradient"

export default function StepConfigurationPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"ad" | "landing">("ad")
  const [generateGeneric, setGenerateGeneric] = useState("yes")
  const adButtonRef = useRef<HTMLButtonElement>(null)
  const landingButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [pillStyle, setPillStyle] = useState({ translateX: 0, width: 0, initialLeft: 0 })
  const [isBackgroundGradientOpen, setIsBackgroundGradientOpen] = useState(false)

  useEffect(() => {
    const updatePillPosition = () => {
      const adButton = adButtonRef.current
      const landingButton = landingButtonRef.current
      const container = containerRef.current
      
      if (adButton && landingButton && container) {
        const containerRect = container.getBoundingClientRect()
        const adButtonRect = adButton.getBoundingClientRect()
        const landingButtonRect = landingButton.getBoundingClientRect()
        
        // Calculate initial left position (first button position relative to container)
        const initialLeft = adButtonRect.left - containerRect.left
        
        // Get active button
        const activeButton = activeTab === "ad" ? adButton : landingButton
        const activeButtonRect = activeButton.getBoundingClientRect()
        
        // Calculate translateX offset (difference from initial position)
        const translateX = (activeButtonRect.left - containerRect.left) - initialLeft
        
        setPillStyle({
          translateX,
          width: activeButtonRect.width,
          initialLeft,
        })
      }
    }

    updatePillPosition()
    window.addEventListener('resize', updatePillPosition)
    return () => window.removeEventListener('resize', updatePillPosition)
  }, [activeTab])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex h-screen overflow-hidden bg-[#F6F6F6] flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white flex items-center justify-between px-6 py-3 shrink-0"
      >
        <div className="flex items-center gap-2">
          {/* Close Button */}
          <button
            onClick={() => router.push('/campaigns')}
            className="bg-[#F6F6F6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#EAEAEA] transition-colors"
          >
            <X className="h-4 w-4 text-[#303030]" />
          </button>
          
          {/* LinkedIn Icon and Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/images/LinkedIn.svg"
                alt="LinkedIn"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="text-lg font-semibold text-[#121212] leading-[1.3]">
              Linkedin ad 4
            </span>
            <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-sm font-normal rounded-lg leading-[1.4]">
              Draft
            </span>
          </div>
        </div>

        {/* Generate Content Button */}
        <motion.div
          className="relative inline-block rounded-[8px] group"
          style={{
            padding: '4px',
            background: 'linear-gradient(90deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
          }}
          whileHover={{
            background: [
              'linear-gradient(0deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
              'linear-gradient(90deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
              'linear-gradient(180deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
              'linear-gradient(270deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
              'linear-gradient(360deg, rgba(255, 233, 210, 1), rgba(237, 198, 213, 1), rgba(152, 147, 229, 1))',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          <Button 
            onClick={() => setIsBackgroundGradientOpen(true)}
            className="relative bg-[#121212] text-white hover:bg-[#121212]/90 h-10 px-4 text-sm font-medium rounded-[12px] focus-visible:rounded-[12px] w-full"
            style={{
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            Generate Content
          </Button>
        </motion.div>
      </motion.div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative overflow-auto">
          <div className="w-full h-full flex p-4 gap-4" style={{ backgroundColor: 'var(--tw-ring-offset-color)' }}>
            {/* Left Panel - Step Configuration */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="w-[600px] bg-white overflow-auto"
            >
              <div className="p-6 space-y-6">

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
                      defaultValue="eve-test-event-offer-17563838737"
                      className="flex-1 bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                    />
                    <Button variant="outline" className="px-4">
                      Change
                    </Button>
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
                    <Button variant="outline" className="px-4">
                      Change
                    </Button>
                  </div>
                </div>

                {/* Generate only generic content */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-[#121212]">
                    Generate only generic content
                  </label>
                  <RadioGroup value={generateGeneric} onValueChange={setGenerateGeneric} className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" className="border-[#121212]" />
                      <label
                        htmlFor="yes"
                        className="text-sm text-[#121212] cursor-pointer font-normal"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" className="border-[#121212]" />
                      <label
                        htmlFor="no"
                        className="text-sm text-[#121212] cursor-pointer font-normal"
                      >
                        No
                      </label>
                    </div>
                  </RadioGroup>
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
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="destination"
                        defaultChecked
                        className="mt-1 h-4 w-4 text-[#121212] border-[#DEDEDE] focus:ring-[#121212]"
                      />
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
                      <Button variant="outline" className="px-4">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Preview */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 bg-[#F6F6F6] rounded-[16px] overflow-hidden"
            >
              <div className="h-full overflow-auto">
                <div className="flex flex-col gap-6 items-center pl-6 pt-6 pb-4 text-left">
                {/* Tab Switcher */}
                <div ref={containerRef} className="bg-[#EAEAEA] h-8 flex items-center p-[2px] rounded-[10px] relative">
                  {/* Sliding Active Pill */}
                  <motion.div
                    className="absolute bg-white rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                    style={{ 
                      height: '28px',
                      left: pillStyle.initialLeft,
                      width: pillStyle.width,
                    }}
                    initial={false}
                    animate={{
                      x: pillStyle.translateX,
                    }}
                    transition={{
                      type: "tween",
                      ease: [0.2, 0, 0, 1], // cubic-bezier(0.2, 0, 0, 1)
                      duration: 0.2, // 200ms
                    }}
                  />
                  <button
                    ref={adButtonRef}
                    onClick={() => setActiveTab("ad")}
                    className="relative px-3 py-[9px] text-xs font-medium transition-colors rounded-[8px] my-0 align-middle bg-transparent z-10"
                    style={{ height: '32px', color: activeTab === "ad" ? '#121212' : '#303030' }}
                  >
                    LinkedIn Ad
                  </button>
                  <button
                    ref={landingButtonRef}
                    onClick={() => setActiveTab("landing")}
                    className="relative px-3 py-[9px] text-xs font-medium transition-colors rounded-[8px] my-0 align-middle bg-transparent z-10"
                    style={{ height: '32px', color: activeTab === "landing" ? '#121212' : '#303030' }}
                  >
                    Landing Page
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === "ad" ? (
                  <div className="text-left">
                    {/* LinkedIn Ad Preview */}
                    <div className="w-[600px] max-w-[600px] bg-white border-2 border-[#EAEAEA] rounded-[16px] overflow-hidden">
                      {/* Profile Header */}
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 items-start">
                            <div className="w-[51px] h-[51px] bg-[#D9D9D9] shrink-0" />
                            <div className="flex flex-col text-xs leading-[1.4]">
                              <p className="font-bold text-black">ThoughtSpot</p>
                              <p className="font-normal text-[#4d4945]">131,229 followers</p>
                              <p className="font-normal text-[#4d4945]">Promoted</p>
                            </div>
                          </div>
                          <button className="w-5 h-5 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="1.5" fill="#303030"/>
                              <circle cx="5" cy="10" r="1.5" fill="#303030"/>
                              <circle cx="15" cy="10" r="1.5" fill="#303030"/>
                            </svg>
                          </button>
                        </div>
                        
                        {/* Ad Description */}
                        <div className="text-[14px] leading-[1.48] text-[#4d4945] font-normal">
                          <p className="mb-[14px]">Ad description</p>
                          <p className="mb-[14px]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheet.
                          </p>
                          <p>#Tag 1,  #Tag 2, #Tag 3</p>
                        </div>
                      </div>

                      {/* Ad Image */}
                      <div className="h-[360px] bg-[#EAEAEA] flex items-center justify-center overflow-hidden">
                        <img 
                          src="/images/image1.png" 
                          alt="Ad Image Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Ad Footer */}
                      <div className="bg-[#EDF4FE] flex items-center justify-between px-4 py-2 rounded-bl-[16px] rounded-br-[16px]">
                        <div className="flex flex-col gap-1">
                          <p className="text-lg font-medium text-black leading-[1.44]">Ad headline</p>
                          <p className="text-sm text-[#4d4945] leading-[1.48]">thoughtspot.com</p>
                        </div>
                        <button className="bg-white border border-[#215cdf] px-3 py-1 rounded-2xl">
                          <p className="text-sm font-medium text-[#215cdf] leading-[1.48]">Download</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-center">
                    <LandingPagePreview />
                  </div>
                )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Gradient Modal */}
      <AnimatePresence>
        {isBackgroundGradientOpen && (
          <BackgroundGradient 
            onClose={() => setIsBackgroundGradientOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
