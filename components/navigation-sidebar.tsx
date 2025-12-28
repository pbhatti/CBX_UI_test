"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Search,
  Home,
  TrendingUp,
  Bell,
  Users,
  Zap,
  BookOpen,
  Briefcase,
  Settings,
  ChevronRight,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  onBackgroundGradientClick?: () => void
}

export function NavigationSidebar({
  isCollapsed,
  onToggle,
  onBackgroundGradientClick,
}: NavigationSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 64 : 240,
      }}
      className="bg-white border-r border-[#eaeaea] h-screen flex flex-col fixed left-0 top-0 z-50"
    >
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-[#f6f6f6] flex items-center">
        {!isCollapsed && (
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={onToggle}
          >
            <Image
              src="/images/LogoDifferent.svg"
              alt="Different Logo"
              width={110}
              height={32}
              className="shrink-0"
            />
          </div>
        )}
        {isCollapsed && (
          <div 
            className="flex items-center justify-center flex-1 cursor-pointer"
            onClick={onToggle}
          >
            <Image
              src="/images/LogoCollapsed.svg"
              alt="Collapsed Logo"
              width={32}
              height={32}
              className="shrink-0"
            />
          </div>
        )}
      </div>

      {/* Search */}
      <div className={cn("p-2", isCollapsed && "flex justify-center")}>
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#eaeaea] transition-colors cursor-pointer",
            isCollapsed && "justify-center p-2 gap-0 h-8 w-8"
          )}
        >
          <Search className="h-4 w-4 text-[#303030] shrink-0" />
          {!isCollapsed && (
            <span className="text-sm text-[#121212]">Search</span>
          )}
        </div>
      </div>

      <div className="border-t border-[#f6f6f6]" />

      {/* Level One Navigation */}
      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem icon={Home} label="Home" isCollapsed={isCollapsed} />
        <NavItem icon={TrendingUp} label="Insights" isCollapsed={isCollapsed} />
        <NavItem
          icon={Bell}
          label="Notifications"
          isCollapsed={isCollapsed}
          badge={4}
        />
      </div>

      <div className="border-t border-[#f6f6f6]" />

      {/* Level Two Navigation */}
      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem
          imageSrc="/images/initiatives.svg"
          label="Initiatives"
          isCollapsed={isCollapsed}
          active
        />
        <NavItem imageSrc="/images/campaign.svg" label="Campaigns" isCollapsed={isCollapsed} />
      </div>

      <div className="border-t border-[#f6f6f6]" />

      {/* Level Three Navigation */}
      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem
          icon={Users}
          label="Audiences"
          isCollapsed={isCollapsed}
          hasChevron
        />
        <NavItem
          icon={Zap}
          label="Automations"
          isCollapsed={isCollapsed}
          hasChevron
        />
        <NavItem
          icon={BookOpen}
          label="Library"
          isCollapsed={isCollapsed}
          hasChevron
        />
        <NavItem
          icon={Briefcase}
          label="Company"
          isCollapsed={isCollapsed}
          hasChevron
        />
        <NavItem
          icon={Palette}
          label="Background Gradient"
          isCollapsed={isCollapsed}
          hasChevron
          onClick={onBackgroundGradientClick}
        />
      </div>

      {/* Bottom Section */}
      <div className={cn("mt-auto flex flex-col gap-4 p-2 border-t-0", isCollapsed && "items-center")}>
        <NavItem icon={Settings} label="Settings" isCollapsed={isCollapsed} hasChevron />
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-1.5 rounded-lg",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-purple-900">LR</span>
          </div>
          {!isCollapsed && (
            <>
              <span className="text-sm font-semibold text-[#121212]">
                Lisa Reynolds
              </span>
              <ChevronRight className="h-4 w-4 text-[#767676] ml-auto" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

interface NavItemProps {
  icon?: React.ComponentType<{ className?: string }>
  imageSrc?: string
  label: string
  isCollapsed: boolean
  active?: boolean
  badge?: number
  hasChevron?: boolean
  onClick?: () => void
}

function NavItem({
  icon: Icon,
  imageSrc,
  label,
  isCollapsed,
  active,
  badge,
  hasChevron,
  onClick,
}: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer relative",
        active ? "bg-[#eaeaea]" : "hover:bg-[#eaeaea]",
        isCollapsed && "justify-center p-2 gap-0 h-8 w-8"
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={label}
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
        />
      ) : (
        Icon && <Icon className="h-4 w-4 text-[#303030] shrink-0" />
      )}
      {!isCollapsed && (
        <>
          <span className="text-sm text-[#121212] flex-1">{label}</span>
          {badge && (
            <span className="bg-[#e51313] text-white text-xs font-medium px-2 py-0.5 rounded-2xl min-w-[24px] text-center">
              {badge}
            </span>
          )}
          {hasChevron && (
            <ChevronRight className="h-4 w-4 text-[#767676] shrink-0" />
          )}
        </>
      )}
      {isCollapsed && badge && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#e51313] rounded-full" />
      )}
    </div>
  )
}

