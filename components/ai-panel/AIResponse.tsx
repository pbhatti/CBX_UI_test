"use client"

import { AppIcon } from "@/components/ui/icon"
import { Bot } from "lucide-react"

export interface AIResponseProps {
  text: string
  status?: "thinking"
}

export function AIResponse({ text, status }: AIResponseProps) {
  const isThinking = status === "thinking"

  return (
    <div className="flex gap-3 w-full">
      <div className="w-8 h-8 flex items-center justify-center shrink-0 rounded-full bg-[#eaeaea]">
        <AppIcon size="sm">
          <Bot className="w-4 h-4 text-[#505050]" />
        </AppIcon>
      </div>
      <div className="flex-1 min-w-0">
        {isThinking ? (
          <div className="flex items-center gap-2 text-[13px] text-[#666666]">
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-[pulse_1.2s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#888] animate-[pulse_1.2s_ease-in-out_infinite] [animation-delay:0.4s]" />
            </span>
            <span className="opacity-80">Thinking...</span>
          </div>
        ) : (
          <p className="text-[13px] text-[#303030] leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  )
}
