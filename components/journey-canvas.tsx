"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus, Maximize2, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface JourneyCanvasProps {
  isLinkedInAd4Configured?: boolean
}

export function JourneyCanvas({ isLinkedInAd4Configured = false }: JourneyCanvasProps) {
  const router = useRouter()
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isSpacePressed, setIsSpacePressed] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [addedNodes, setAddedNodes] = useState<Array<{ id: string; type: string; name: string }>>([])
  const [touchState, setTouchState] = useState<{
    touches: React.Touch[]
    initialDistance: number
    initialZoom: number
    initialPan: { x: number; y: number }
    initialCenter: { x: number; y: number }
  } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const MIN_ZOOM = 0.25
  const MAX_ZOOM = 3
  const ZOOM_STEP = 0.1

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent browser zoom and page scroll - do this first
    e.preventDefault()
    e.stopPropagation()
    
    // Cmd/Ctrl + scroll → Zoom
    // On Mac trackpad, pinch gestures come through as wheel events with ctrlKey (Cmd)
    // On Windows/Linux, Ctrl+scroll is used for zoom
    const isZoomGesture = e.ctrlKey || e.metaKey
    
    if (isZoomGesture) {
      // Zoom towards mouse/cursor position
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        // Calculate the point under the cursor in canvas coordinates
        // Account for the centered content
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const canvasX = (mouseX - pan.x - centerX) / zoom
        const canvasY = (mouseY - pan.y - centerY) / zoom
        
        // Calculate zoom factor - use deltaY for smooth zooming
        // Negative deltaY = scroll up = zoom in, positive = zoom out
        const zoomFactor = 1 - (e.deltaY * 0.01)
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * zoomFactor))
        
        // Adjust pan to keep the point under cursor fixed
        setPan({
          x: mouseX - canvasX * newZoom - centerX,
          y: mouseY - canvasY * newZoom - centerY,
        })
        
        setZoom(newZoom)
      }
    } else {
      // Regular scroll - pan the canvas (two-finger scroll on trackpad)
      setPan(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      }))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if clicking on interactive elements (buttons, links, etc.)
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      return
    }

    // Space + drag → Pan canvas
    // Also support middle mouse button, Option (Alt), or Cmd key for panning
    if (isSpacePressed || e.button === 1 || e.altKey || e.metaKey) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Handle spacebar key for panning (Space + drag → Pan canvas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        const target = e.target as HTMLElement
        // Don't activate if typing in an input
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && target.tagName !== 'SELECT') {
          setIsSpacePressed(true)
          // Update cursor to indicate pan mode
          if (containerRef.current) {
            containerRef.current.style.cursor = 'grab'
          }
          e.preventDefault()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false)
        // Only stop dragging if we're not actively dragging
        if (!isDragging) {
          if (containerRef.current) {
            containerRef.current.style.cursor = 'default'
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isDragging])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Update cursor based on spacebar state
    if (containerRef.current) {
      containerRef.current.style.cursor = isSpacePressed ? 'grab' : 'default'
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(MAX_ZOOM, prev + ZOOM_STEP))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(MIN_ZOOM, prev - ZOOM_STEP))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Handle global mouse up to stop dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Prevent browser zoom on the canvas container using capture phase
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheelCapture = (e: WheelEvent) => {
      // Check if the event is happening within our canvas container
      const target = e.target as HTMLElement
      if (container.contains(target)) {
        // Prevent browser zoom when using pinch gestures (Ctrl+wheel or trackpad pinch)
        if (e.ctrlKey) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    // Use capture phase to intercept before browser handles it
    container.addEventListener('wheel', handleWheelCapture, { passive: false, capture: true })
    
    return () => {
      container.removeEventListener('wheel', handleWheelCapture, { capture: true })
    }
  }, [])

  // Calculate distance between two touch points
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch2.clientX - touch1.clientX
    const dy = touch2.clientY - touch1.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Calculate center point between two touches
  const getTouchCenter = (touch1: React.Touch, touch2: React.Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't handle if clicking on interactive elements
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      return
    }

    if (e.touches.length === 2) {
      // Two-finger gesture - prepare for pinch/pan
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = getTouchDistance(touch1, touch2)
      const center = getTouchCenter(touch1, touch2)
      
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const centerX = center.x - rect.left
        const centerY = center.y - rect.top
        
        setTouchState({
          touches: Array.from(e.touches),
          initialDistance: distance,
          initialZoom: zoom,
          initialPan: { ...pan },
          initialCenter: { x: centerX, y: centerY },
        })
      }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchState) {
      // Two-finger gesture - handle pinch zoom and pan
      e.preventDefault()
      
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = getTouchDistance(touch1, touch2)
      const currentCenter = getTouchCenter(touch1, touch2)
      
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const centerX = currentCenter.x - rect.left
      const centerY = currentCenter.y - rect.top
      
      // Calculate distance change to determine if it's a pinch or scroll
      const distanceChange = Math.abs(currentDistance - touchState.initialDistance)
      const distanceChangePercent = distanceChange / touchState.initialDistance
      
      // If distance changed significantly (>5%), it's a pinch zoom
      if (distanceChangePercent > 0.05) {
        // Pinch to zoom
        const scale = currentDistance / touchState.initialDistance
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, touchState.initialZoom * scale))
        
        // Calculate the point under the center in canvas coordinates
        const canvasX = (touchState.initialCenter.x - touchState.initialPan.x - rect.width / 2) / touchState.initialZoom
        const canvasY = (touchState.initialCenter.y - touchState.initialPan.y - rect.height / 2) / touchState.initialZoom
        
        // Adjust pan to keep the point under center fixed
        const newPan = {
          x: centerX - canvasX * newZoom - rect.width / 2,
          y: centerY - canvasY * newZoom - rect.height / 2,
        }
        
        setPan(newPan)
        setZoom(newZoom)
        
        // Update touch state to track current pan for smooth continuation
        setTouchState({
          ...touchState,
          initialPan: newPan,
          initialZoom: newZoom,
          initialCenter: { x: centerX, y: centerY },
          initialDistance: currentDistance,
        })
      } else {
        // Two-finger scroll/pan - move the canvas
        const panDeltaX = currentCenter.x - touchState.initialCenter.x
        const panDeltaY = currentCenter.y - touchState.initialCenter.y
        
        const newPan = {
          x: touchState.initialPan.x + panDeltaX,
          y: touchState.initialPan.y + panDeltaY,
        }
        
        setPan(newPan)
        
        // Update touch state to track current pan and center for smooth continuation
        setTouchState({
          ...touchState,
          initialPan: newPan,
          initialCenter: { x: centerX, y: centerY },
        })
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      // Reset touch state when we have less than 2 fingers
      setTouchState(null)
    }
  }

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isPopoverOpen && !target.closest('[data-popover]') && !target.closest('[data-add-button]')) {
        setIsPopoverOpen(false)
      }
    }

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPopoverOpen])

  const handleAddButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPopoverOpen(!isPopoverOpen)
  }

  const handleChannelSelect = (channel: string) => {
    setIsPopoverOpen(false)
    
    if (channel === 'linkedin') {
      // Count existing LinkedIn ads to generate the next number
      const linkedinCount = addedNodes.filter(n => n.type === 'linkedin').length + 2 // +2 for existing LinkedIn ad 2 and 3
      const newNode = {
        id: `linkedin-${Date.now()}`,
        type: 'linkedin',
        name: `LinkedIn ad ${linkedinCount + 1}`
      }
      setAddedNodes(prev => [...prev, newNode])
    } else if (channel === 'google') {
      // Count existing Google ads to generate the next number
      const googleCount = addedNodes.filter(n => n.type === 'google').length + 1 // +1 for existing Google retargeting ad 1
      const newNode = {
        id: `google-${Date.now()}`,
        type: 'google',
        name: `Google retargeting ad ${googleCount + 1}`
      }
      setAddedNodes(prev => [...prev, newNode])
    }
    // TODO: Handle other channel types (marketing-email, sdr-email)
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-0 flex-1 w-full h-full relative overflow-auto bg-[#F6F6F6] min-h-[400px]"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        cursor: isDragging ? 'grabbing' : (isSpacePressed ? 'grab' : 'default'),
        userSelect: 'none',
        touchAction: 'none', // Prevent default touch behaviors to handle them ourselves
      }}
    >
      {/* Campaign Preview Button */}
      <button className="absolute top-4 right-4 z-10 bg-[#FFFFFF] hover:bg-[#eaeaea] transition-colors px-3 py-2 rounded-lg text-sm font-medium text-[#121212]">
        Campaign preview
      </button>

      {/* Canvas with Dotted Grid */}
      <div 
        className="w-full h-full min-h-full min-h-0 relative overflow-auto"
        style={{
          backgroundImage: `radial-gradient(circle, #DEDEDE 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        {/* Workflow Nodes */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <div className="relative">
            {/* Start Node */}
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm px-4 py-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#121212] flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white ml-0.5" />
                </div>
                <span className="text-sm font-medium text-[#121212]">Start</span>
              </div>
              {/* Arrow down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-[#DEDEDE]">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#DEDEDE]" />
              </div>
            </div>

            {/* LinkedIn ad 2 Node */}
            <div className="relative">
              <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm w-[278px]">
                <div className="p-4 border-b border-[#F6F6F6]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                        <Image
                          src="/assets/global/LinkedIn.svg"
                          alt="LinkedIn"
                          width={24}
                          height={24}
                          className="w-6 h-6 shrink-0"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">LinkedIn ad 2</span>
                        <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-[14px] font-normal rounded-lg inline-block w-fit">
                          In review
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                      <span className="text-[#303030] text-lg leading-none">⋯</span>
                    </button>
                  </div>
                  <div className="text-xs text-[#767676] mb-3">
                    Ads: 542 Landing pages: 542
                  </div>
                  <div className="bg-[#00365C] rounded-lg p-3 mb-3 relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white text-xs">» rocketlane</span>
                      <span className="text-white text-xs font-medium">#1 in PSA</span>
                    </div>
                    <p className="text-white text-sm leading-tight">
                      This didn&apos;t happen by accident
                    </p>
                    <div className="absolute bottom-2 left-2">
                      <div className="w-3 h-3 bg-[#DB4437] rounded flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold">G</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-[#121212] text-white hover:bg-[#121212]/90 h-8 text-sm">
                    Review
                  </Button>
                </div>
              </div>

              {/* Arrows from LinkedIn ad 2 */}
              {/* Arrow to right (Google retargeting) */}
              <div className="absolute top-1/2 left-full transform translate-x-4 -translate-y-1/2">
                <div className="w-24 h-0.5 bg-[#DEDEDE] relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#DEDEDE]" />
                </div>
              </div>

              {/* Arrow down (LinkedIn ad 3) */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-4">
                <div className="w-0.5 h-24 bg-[#DEDEDE] relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#DEDEDE]" />
                </div>
              </div>
            </div>

            {/* Google retargeting ad 1 Node */}
            <div className="absolute top-1/2 left-full transform translate-x-32 -translate-y-1/2">
              <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm w-[278px]">
                <div className="p-4 border-b border-[#F6F6F6]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                        <Image
                          src="/assets/global/GoogleAds.svg"
                          alt="Google Ads"
                          width={24}
                          height={24}
                          className="w-6 h-6 shrink-0"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">Google retargeting ad 1</span>
                        <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-[14px] font-normal rounded-lg inline-block w-fit">
                          In review
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                      <span className="text-[#303030] text-lg leading-none">⋯</span>
                    </button>
                  </div>
                  <Button className="w-full bg-[#121212] text-white hover:bg-[#121212]/90 h-8 text-sm">
                    Review
                  </Button>
                </div>
              </div>

              {/* Default LinkedIn ad 4 below Google ad */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2" style={{ marginTop: '64px' }}>
                {/* Arrow from Google ad */}
                <div className="absolute -top-[64px] left-1/2 transform -translate-x-1/2 w-0.5 h-[64px] bg-[#DEDEDE]">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#DEDEDE]" />
                </div>
                
                {/* LinkedIn ad 4 Card */}
                <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm w-[278px]">
                  {isLinkedInAd4Configured ? (
                    // In review state - matches Figma design
                    <div className="p-4 border-b border-[#F6F6F6]">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                            <Image
                              src="/assets/global/LinkedIn.svg"
                              alt="LinkedIn"
                              width={24}
                              height={24}
                              className="w-6 h-6 shrink-0"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">LinkedIn ad 4</span>
                            <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-[14px] font-normal rounded-lg inline-block w-fit">
                              In review
                            </span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                          <span className="text-[#303030] text-lg leading-none">⋯</span>
                        </button>
                      </div>
                      <div className="text-xs text-[#767676] mb-3">
                        Ads: 542 Landing pages: 542
                      </div>
                      <div className="bg-[#00365C] rounded-lg p-3 mb-3 relative">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-white text-xs">» rocketlane</span>
                          <span className="text-white text-xs font-medium">#1 in PSA</span>
                        </div>
                        <p className="text-white text-sm leading-tight">
                          This didn&apos;t happen by accident
                        </p>
                        <div className="absolute bottom-2 left-2">
                          <div className="w-3 h-3 bg-[#DB4437] rounded flex items-center justify-center">
                            <span className="text-white text-[6px] font-bold">G</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-[#121212] text-white hover:bg-[#121212]/90 h-8 text-sm">
                        Review
                      </Button>
                    </div>
                  ) : (
                    // Draft state - initial setup
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                          <Image
                            src="/assets/global/LinkedIn.svg"
                            alt="LinkedIn"
                            width={24}
                            height={24}
                            className="w-6 h-6 shrink-0"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">Linkedin ad 4</span>
                          <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-[14px] font-normal rounded-lg inline-block w-fit">
                            Draft
                          </span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                        <span className="text-[#303030] text-lg leading-none">⋯</span>
                      </button>
                    </div>
                    <Button 
                      onClick={() => router.push('/step-configuration')}
                      className="w-full bg-[#121212] text-white hover:bg-[#121212]/90 h-8 text-sm"
                    >
                      Set up
                    </Button>
                  </div>
                  )}
                </div>
              </div>

              {/* Dynamically added nodes below LinkedIn ad 4 */}
              {addedNodes.map((node, index) => {
                // Calculate spacing: 64px gap between cards
                const gapBetweenCards = 64
                const cardHeight = 200
                // LinkedIn ad 4 is 64px below Google ad, so first dynamic node is 64px below LinkedIn ad 4
                // LinkedIn ad 4 position: 64px (gap) + 200px (card height) = 264px from Google ad
                const linkedinAd4Bottom = 64 + 200 // Position of LinkedIn ad 4 bottom relative to Google ad
                const topOffset = linkedinAd4Bottom + gapBetweenCards + index * (cardHeight + gapBetweenCards)
                return (
                  <div key={node.id} className="absolute top-full left-1/2 transform -translate-x-1/2" style={{ marginTop: `${topOffset}px` }}>
                    {/* Arrow from previous node - spans the 64px gap */}
                    <div className="absolute -top-[64px] left-1/2 transform -translate-x-1/2 w-0.5 h-[64px] bg-[#DEDEDE]">
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-[#DEDEDE]" />
                    </div>
                    
                    {/* Node Card */}
                    <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm w-[278px]">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                              {node.type === 'linkedin' ? (
                                <Image
                                  src="/assets/global/LinkedIn.svg"
                                  alt="LinkedIn"
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 shrink-0"
                                />
                              ) : node.type === 'google' ? (
                                <Image
                                  src="/assets/global/GoogleAds.svg"
                                  alt="Google Ads"
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 shrink-0"
                                />
                              ) : null}
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">{node.name}</span>
                              <span className="px-2 py-0.5 bg-[#FCF2D6] text-[#3C2C04] text-[14px] font-normal rounded-lg inline-block w-fit">
                                Draft
                              </span>
                            </div>
                          </div>
                          <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                            <span className="text-[#303030] text-lg leading-none">⋯</span>
                          </button>
                        </div>
                        <Button 
                          onClick={() => router.push('/step-configuration')}
                          className="w-full bg-[#121212] text-white hover:bg-[#121212]/90 h-8 text-sm"
                        >
                          Set up
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Plus icon below last node or LinkedIn ad 4 */}
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2" 
                style={{ 
                  marginTop: addedNodes.length > 0 
                    ? `${64 + 200 + 64 + (addedNodes.length - 1) * (200 + 64) + 200 + 8}px` 
                    : `${64 + 200 + 8}px` // 64px gap + 200px LinkedIn ad 4 height + 8px spacing
                }}
              >
                <button 
                  ref={addButtonRef}
                  data-add-button
                  onClick={handleAddButtonClick}
                  className="bg-white p-1 rounded-lg flex items-center justify-center hover:bg-[#EAEAEA] transition-colors"
                >
                  <Plus className="h-4 w-4 text-[#303030]" />
                </button>
                
                {/* Select Channel Popover */}
                {isPopoverOpen && (
                  <div 
                    data-popover
                    className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 z-50 bg-white rounded-[16px] shadow-md border border-[#DEDEDE] p-4 w-[278px]"
                  >
                    <p className="text-[14px] font-semibold text-[#121212] leading-[1.4] mb-4">
                      Select Channel
                    </p>
                    <div className="flex flex-col gap-2">
                      {/* LinkedIn ad */}
                      <button
                        onClick={() => handleChannelSelect('linkedin')}
                        className="bg-[#F6F6F6] h-12 px-3 py-3 rounded-lg flex items-center gap-4 hover:bg-[#EAEAEA] transition-colors"
                      >
                        <div className="w-6 h-6 shrink-0">
                          <Image
                            src="/assets/global/LinkedIn.svg"
                            alt="LinkedIn"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-[14px] text-[#121212]">LinkedIn ad</span>
                      </button>

                      {/* Google Retargeting Ad */}
                      <button
                        onClick={() => handleChannelSelect('google')}
                        className="bg-[#F6F6F6] h-12 px-3 py-3 rounded-lg flex items-center gap-4 hover:bg-[#EAEAEA] transition-colors"
                      >
                        <div className="w-6 h-6 shrink-0">
                          <Image
                            src="/assets/global/GoogleAds.svg"
                            alt="Google Ads"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-[14px] text-[#121212]">Google Retargeting Ad</span>
                      </button>

                      {/* Marketing Email */}
                      <button
                        onClick={() => handleChannelSelect('marketing-email')}
                        className="bg-[#F6F6F6] h-12 px-3 py-3 rounded-lg flex items-center gap-4 hover:bg-[#EAEAEA] transition-colors"
                      >
                        <Mail className="w-6 h-6 shrink-0 text-[#303030]" />
                        <span className="text-[14px] text-[#121212]">Marketing Email</span>
                      </button>

                      {/* SDR Email */}
                      <button
                        onClick={() => handleChannelSelect('sdr-email')}
                        className="bg-[#F6F6F6] h-12 px-3 py-3 rounded-lg flex items-center gap-4 hover:bg-[#EAEAEA] transition-colors"
                      >
                        <Send className="w-6 h-6 shrink-0 text-[#303030]" />
                        <span className="text-[14px] text-[#121212]">SDR Email</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LinkedIn ad 3 Node */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-32">
              <div className="bg-white rounded-[16px] border border-[#DEDEDE] shadow-sm w-[278px]">
                <div className="p-4 border-b border-[#F6F6F6]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="border border-[#EAEAEA] rounded-lg p-3 flex items-center justify-center shrink-0">
                        <Image
                          src="/assets/global/LinkedIn.svg"
                          alt="LinkedIn"
                          width={24}
                          height={24}
                          className="w-6 h-6 shrink-0"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-semibold text-[#121212] leading-[1.4]">LinkedIn ad 3</span>
                        <span className="px-2 py-1 bg-[#D8F0DD] text-[#07290E] text-[14px] font-normal rounded-lg inline-block w-fit">
                          Ready to publish
                        </span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#EAEAEA] rounded shrink-0">
                      <span className="text-[#303030] text-lg leading-none">⋯</span>
                    </button>
                  </div>
                  <div className="text-xs text-[#767676] mb-3">
                    Ads: 542 Landing pages: 542
                  </div>
                  <div className="bg-[#00365C] rounded-lg p-3 mb-3 relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white text-xs">» rocketlane</span>
                      <span className="text-white text-xs font-medium">#1 in PSA</span>
                    </div>
                    <p className="text-white text-sm leading-tight">
                      This didn&apos;t happen by accident
                    </p>
                    <div className="absolute bottom-2 left-2">
                      <div className="w-3 h-3 bg-[#DB4437] rounded flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold">G</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 bg-white rounded-lg shadow-sm border border-[#DEDEDE] p-1">
        <button 
          onClick={handleZoomIn}
          disabled={zoom >= MAX_ZOOM}
          className="p-2 hover:bg-[#EAEAEA] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom In"
        >
          <Plus className="h-4 w-4 text-[#303030]" />
        </button>
        <button 
          onClick={handleZoomOut}
          disabled={zoom <= MIN_ZOOM}
          className="p-2 hover:bg-[#EAEAEA] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Zoom Out"
        >
          <Minus className="h-4 w-4 text-[#303030]" />
        </button>
        <button 
          onClick={handleResetZoom}
          className="p-2 hover:bg-[#EAEAEA] rounded transition-colors"
          title="Reset Zoom"
        >
          <Maximize2 className="h-4 w-4 text-[#303030]" />
        </button>
      </div>
      
      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-sm border border-[#DEDEDE] px-3 py-2">
        <span className="text-xs text-[#767676]">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  )
}

