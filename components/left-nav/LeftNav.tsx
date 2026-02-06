"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { AppIcon } from "@/components/ui/icon"

const LEFT_NAV_EXPANDED = 240
const LEFT_NAV_COLLAPSED = 64

export interface LeftNavProps {
  isCollapsed: boolean
  onToggle: () => void
  onBackgroundGradientClick?: () => void
  currentPage?: "initiatives" | "campaigns"
}

export function LeftNav({
  isCollapsed,
  onToggle,
  onBackgroundGradientClick,
  currentPage,
}: LeftNavProps) {
  const pathname = usePathname()
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? LEFT_NAV_COLLAPSED : LEFT_NAV_EXPANDED }}
      className="bg-white border-r border-[#eaeaea] h-screen flex flex-col fixed left-0 top-0 z-50"
    >
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-[#f6f6f6] flex items-center">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 cursor-pointer" onClick={onToggle}>
            <span className="flex shrink-0 w-[110px] h-8 flex items-center justify-center">
              <Image
                src="/assets/global/LogoDifferent.svg"
                alt="Different"
                width={110}
                height={32}
                className="object-contain w-full h-full"
              />
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-1 cursor-pointer" onClick={onToggle}>
            <AppIcon size="lg">
              <Image
                src="/assets/global/LogoCollapsed.svg"
                alt="Different"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            </AppIcon>
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
          <AppIcon size="sm">
            <Search className="h-4 w-4 text-[#303030]" />
          </AppIcon>
          {!isCollapsed && <span className="text-sm text-[#121212]">Search</span>}
        </div>
      </div>

      <div className="border-t border-[#f6f6f6]" />

      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem icon={Home} label="Home" isCollapsed={isCollapsed} />
        <NavItem icon={TrendingUp} label="Insights" isCollapsed={isCollapsed} />
        <NavItem icon={Bell} label="Notifications" isCollapsed={isCollapsed} badge={4} />
      </div>

      <div className="border-t border-[#f6f6f6]" />

      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem
          imageSrc="/assets/left-nav/initiatives.svg"
          label="Initiatives"
          isCollapsed={isCollapsed}
          href="/"
          active={pathname === "/" || currentPage === "initiatives"}
        />
        <NavItem
          imageSrc="/assets/left-nav/campaign.svg"
          label="Campaigns"
          isCollapsed={isCollapsed}
          href="/campaigns"
          active={pathname?.startsWith("/campaigns") || currentPage === "campaigns"}
        />
      </div>

      <div className="border-t border-[#f6f6f6]" />

      <div className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")}>
        <NavItem icon={Users} label="Audiences" isCollapsed={isCollapsed} hasChevron />
        <NavItem icon={Zap} label="Automations" isCollapsed={isCollapsed} hasChevron />
        <NavItem icon={BookOpen} label="Library" isCollapsed={isCollapsed} hasChevron />
        <NavItem icon={Briefcase} label="Company" isCollapsed={isCollapsed} hasChevron />
        <NavItem
          icon={Palette}
          label="Background Gradient"
          isCollapsed={isCollapsed}
          hasChevron
          onClick={onBackgroundGradientClick}
        />
      </div>

      <div className={cn("mt-auto flex flex-col gap-4 p-2 border-t-0", isCollapsed && "items-center")}>
        <NavItem icon={Settings} label="Settings" isCollapsed={isCollapsed} hasChevron />
        <div className={cn("flex items-center gap-3 px-2 py-1.5 rounded-lg", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-purple-900">LR</span>
          </div>
          {!isCollapsed && (
            <>
              <span className="text-sm font-semibold text-[#121212]">Lisa Reynolds</span>
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
  href?: string
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
  href,
}: NavItemProps) {
  const content = (
    <>
      {imageSrc ? (
        <AppIcon size="sm" src={imageSrc} alt={label} />
      ) : (
        Icon && (
          <AppIcon size="sm">
            <Icon className="h-4 w-4 text-[#303030]" />
          </AppIcon>
        )
      )}
      {!isCollapsed && (
        <>
          <span className="text-sm text-[#121212] flex-1">{label}</span>
          {badge != null && (
            <span className="bg-[#e51313] text-white text-xs font-medium px-2 py-0.5 rounded-2xl min-w-[24px] text-center">
              {badge}
            </span>
          )}
          {hasChevron && (
            <AppIcon size="sm">
              <ChevronRight className="h-4 w-4 text-[#767676]" />
            </AppIcon>
          )}
        </>
      )}
      {isCollapsed && badge != null && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#e51313] rounded-full" />
      )}
    </>
  )

  const className = cn(
    "flex items-center gap-3 px-2 py-2 rounded-lg transition-colors cursor-pointer relative",
    active ? "bg-[#eaeaea]" : "hover:bg-[#eaeaea]",
    isCollapsed && "justify-center p-2 gap-0 h-8 w-8"
  )

  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    )
  }
  return (
    <div onClick={onClick} className={className}>
      {content}
    </div>
  )
}

export { LEFT_NAV_EXPANDED, LEFT_NAV_COLLAPSED }
