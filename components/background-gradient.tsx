"use client"

import { X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface BackgroundGradientProps {
  onClose: () => void
}

export function BackgroundGradient({ onClose }: BackgroundGradientProps) {
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
            onClick={onClose}
            className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
          >
            <X className="h-4 w-4 text-[#303030]" />
          </button>
          
          <div className="flex items-center gap-2">
            {/* LinkedIn Icon Placeholder */}
            <div className="h-8 w-8 bg-[#0077b5] rounded flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold">in</span>
            </div>
            
            {/* Title */}
            <span className="text-lg font-semibold text-black">Linkedin ad 4</span>
            
            {/* Status Tag */}
            <div className="bg-[#fcf2d6] px-2 py-0.5 rounded-lg">
              <span className="text-sm text-[#3c2c04]">Draft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Background with centered white card */}
      <div className="h-full w-full pt-16 relative overflow-hidden">
        {/* Gradient Background - using peach, pink, and purple colors with animation */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top left, ${color1} ${percent1}%, ${color2} ${percent2}%, ${color3} ${percent3}%)`,
            backgroundSize: "200% 200%",
            animation: "gradient-shift 20s infinite alternate"
          }}
        />
        
        {/* Centered Text */}
        <motion.div 
          className="absolute left-1/2 top-1/2"
          initial={{ x: "-50%", y: "-50%", scale: 1 }}
          animate={{ x: "-50%", y: "-50%", scale: [1, 1.05, 1] }}
          transition={{
            duration: 8,
            repeat: .5,
            ease: "easeInOut"
          }}
        >
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
        </motion.div>

        {/* Gradient Configurator */}
        <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-20 border border-[#eaeaea]">
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
        </div>
      </div>
    </motion.div>
  )
}

