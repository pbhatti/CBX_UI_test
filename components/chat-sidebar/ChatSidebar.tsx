"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { AppIcon } from "@/components/ui/icon"

const CHAT_SIDEBAR_WIDTH = 340

export interface ChatSidebarProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  /** Optional inline style for stacking (e.g. when Edit setup is open). */
  style?: React.CSSProperties
}

export function ChatSidebar({
  open,
  onClose,
  title = "Comments",
  children,
  style,
}: ChatSidebarProps) {
  if (!open) return null

  return (
    <motion.div
      initial={{ x: CHAT_SIDEBAR_WIDTH, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: CHAT_SIDEBAR_WIDTH, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-16 right-0 h-[calc(100%-4rem)] w-[340px] bg-white z-20 flex flex-col border-l border-[#eaeaea]"
      style={style}
    >
      <div className="sticky top-0 bg-white border-b border-[#eaeaea] z-10 px-4 py-3 flex items-center justify-between shrink-0">
        <h2 className="text-lg font-semibold text-[#121212]">{title}</h2>
        <button
          onClick={onClose}
          className="bg-[#f6f6f6] h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#eaeaea] transition-colors"
        >
          <AppIcon size="sm">
            <X className="h-4 w-4 text-[#303030]" />
          </AppIcon>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </motion.div>
  )
}

export { CHAT_SIDEBAR_WIDTH }
