"use client"

import { useState, useCallback, forwardRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export interface InputBoxProps {
  onSubmit: (text: string) => void
  disabled?: boolean
  placeholder?: string
  /** When true, Apply button is enabled even when input is empty (e.g. when a block is selected). */
  applyEnabledWhenEmpty?: boolean
}

export const InputBox = forwardRef<HTMLTextAreaElement, InputBoxProps>(function InputBox(
  {
    onSubmit,
    disabled = false,
    placeholder = "What change do you want to make?",
    applyEnabledWhenEmpty = false,
  },
  ref
) {
  const [value, setValue] = useState("")
  const isEmpty = !value.trim()
  const isApplyDisabled = disabled || (!applyEnabledWhenEmpty && isEmpty)

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue("")
  }, [value, disabled, onSubmit])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="shrink-0 p-4 border-t border-[#e5e5e5] bg-[#F8F8F8]">
      <div
        className="w-full rounded-xl p-[2px]"
        style={{
          background: "linear-gradient(133deg, #FFE9D2 3.78%, #FFD2D2 32.19%, #9893E5 69.23%)",
        }}
      >
        <div className="relative w-full rounded-[10px] bg-white p-3">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[80px] max-h-[120px] resize-none text-[13px] border-0 bg-transparent p-0 pr-16 pb-10 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            rows={3}
            disabled={disabled}
          />
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isApplyDisabled}
            className="absolute bottom-3 right-3 h-6 px-4 text-xs font-medium rounded-lg bg-[#000000] text-white hover:bg-[#000000]/90 disabled:opacity-50"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
})
