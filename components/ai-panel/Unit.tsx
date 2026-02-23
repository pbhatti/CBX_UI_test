"use client"

import { motion } from "framer-motion"
import type { Message } from "./types"
import { UserCommand } from "./UserCommand"
import { AIResponse } from "./AIResponse"
import { LocalHandle } from "./LocalHandle"

export interface UnitProps {
  messages: Message[]
  /** Optional: index for stagger animation */
  index?: number
}

/**
 * Renders one logical block: UserCommand + AIResponse + optional LocalHandle.
 */
export function Unit({ messages, index = 0 }: UnitProps) {
  const userMsg = messages.find((m): m is Message & { type: "user" } => m.type === "user")
  const aiMsg = messages.find((m): m is Message & { type: "ai" } => m.type === "ai")
  const localMsg = messages.find((m): m is Message & { type: "local" } => m.type === "local")

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      {userMsg && userMsg.type === "user" && (
        <UserCommand text={userMsg.text} />
      )}
      {aiMsg && aiMsg.type === "ai" && (
        <AIResponse text={aiMsg.text} status={aiMsg.status} />
      )}
      {localMsg && localMsg.type === "local" && (
        <LocalHandle label={localMsg.label} />
      )}
    </motion.div>
  )
}
