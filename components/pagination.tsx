"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2 px-4 py-4 border-t border-[#eaeaea] bg-white">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 text-sm",
            currentPage === page
              ? "bg-[#eaeaea] text-[#121212] font-medium"
              : "text-[#303030] hover:bg-[#f6f6f6]"
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

