"use client"

export interface UserCommandProps {
  text: string
}

export function UserCommand({ text }: UserCommandProps) {
  return (
    <div className="flex justify-end w-full">
      <div
        className="max-w-[296px] rounded-xl bg-[#eaeaea] px-4 py-2.5 text-[13px] text-[#303030]"
        style={{ padding: "10px 16px" }}
      >
        {text}
      </div>
    </div>
  )
}
