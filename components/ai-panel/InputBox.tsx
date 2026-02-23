"use client"

import { useState, useCallback, forwardRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export interface InputBoxProps {
  onSubmit: (text: string) => void
  disabled?: boolean
  placeholder?: string
}

export const InputBox = forwardRef<HTMLTextAreaElement, InputBoxProps>(function InputBox(
  {
    onSubmit,
    disabled = false,
    placeholder = "What change do you want to make?",
  },
  ref
) {
  const [value, setValue] = useState("")
  const isEmpty = !value.trim()

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
      <div className="flex flex-col gap-2">
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[80px] max-h-[120px] resize-none text-[13px] border-[#e5e5e5] bg-white rounded-xl px-3 py-2.5"
          rows={3}
          disabled={disabled}
        />
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isEmpty || disabled}
            className="bg-black text-white hover:bg-black/90 h-9 px-4 text-sm font-medium rounded-lg"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  )
})
