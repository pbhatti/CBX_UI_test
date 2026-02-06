"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LEFT_NAV_COLLAPSED, LEFT_NAV_EXPANDED } from "@/components/left-nav"

export interface MainColumnProps {
  marginLeft?: number
  isLeftNavCollapsed?: boolean
  children: React.ReactNode
  className?: string
}

export function MainColumn({
  marginLeft,
  isLeftNavCollapsed,
  children,
  className,
}: MainColumnProps) {
  const left = marginLeft ?? (isLeftNavCollapsed ? LEFT_NAV_COLLAPSED : LEFT_NAV_EXPANDED)

  return (
    <motion.div
      initial={false}
      animate={{ marginLeft: left }}
      transition={{ duration: 0.3 }}
      className={cn("flex-1 flex flex-col overflow-hidden", className)}
    >
      {children}
    </motion.div>
  )
}
