"use client"

export interface AIResponseProps {
  text: string
  status?: "thinking"
}

export function AIResponse({ text, status }: AIResponseProps) {
  const isThinking = status === "thinking"

  return (
    <div className="flex gap-3 w-full">
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <img
          src="/images/differentLogo.svg"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
        />
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
