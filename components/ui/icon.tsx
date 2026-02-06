"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

/** Fixed icon sizes per docs and .cursor/skills/icons – use these so layout never shifts. */
export const ICON_SIZES = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
} as const

export type IconSize = keyof typeof ICON_SIZES

interface AppIconProps {
  /** Size key; container and icon will match. */
  size?: IconSize
  /** Image src (e.g. /assets/global/icon.svg). Use when not using Lucide. */
  src?: string
  alt?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Fixed-size icon container. Use for all icon assets so layout stays consistent.
 * Either pass `src` for an image, or `children` (e.g. Lucide icon).
 */
export function AppIcon({
  size = "sm",
  src,
  alt = "",
  className,
  children,
}: AppIconProps) {
  const sizeClass = ICON_SIZES[size]
  const pixel = size === "xs" ? 12 : size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 32 : 40

  return (
    <span
      className={cn(
        "flex items-center justify-center shrink-0",
        sizeClass,
        className
      )}
      role={src ? "img" : undefined}
      aria-hidden={!alt}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={pixel}
          height={pixel}
          className={cn(sizeClass, "object-contain")}
        />
      ) : (
        children
      )}
    </span>
  )
}
