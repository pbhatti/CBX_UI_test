"use client"

import { MoreVertical, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Initiative {
  id: string
  heading: string
  status: "Draft" | "Scheduled" | "Active"
  product: string
  startDate: string
  endDate: string
  budget: string
  createdBy: string
  lastModified: string
}

const mockData: Initiative[] = [
  {
    id: "1",
    heading: "Lead Generation Sprint",
    status: "Draft",
    product: "Brand Awareness",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "-",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "2",
    heading: "Data Analytics Evolution",
    status: "Draft",
    product: "Account-based...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "3",
    heading: "Eliminating Tableau: A Strategic /",
    status: "Draft",
    product: "BOFU (Opportuni...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "4",
    heading: "Customer Success Expansion",
    status: "Draft",
    product: "MOFU (Qualified I...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "$1,000,000.... $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "5",
    heading: "Product Launch Campaign",
    status: "Scheduled",
    product: "Brand Awareness",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "-",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "6",
    heading: "Market Research Initiative",
    status: "Scheduled",
    product: "Account-based...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "7",
    heading: "Content Marketing Drive",
    status: "Scheduled",
    product: "BOFU (Opportuni...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "8",
    heading: "Sales Enablement Program",
    status: "Scheduled",
    product: "MOFU (Qualified I...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "$1,000,000.... $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "9",
    heading: "Customer Retention Strategy",
    status: "Active",
    product: "Brand Awareness",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "-",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "10",
    heading: "Digital Transformation",
    status: "Active",
    product: "Account-based...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "11",
    heading: "Brand Awareness Campaign",
    status: "Active",
    product: "BOFU (Opportuni...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "12",
    heading: "Growth Marketing Initiative",
    status: "Active",
    product: "MOFU (Qualified I...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "$1,000,000.... $40,000 spent",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "13",
    heading: "Partnership Development",
    status: "Active",
    product: "Brand Awareness",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "-",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
  {
    id: "14",
    heading: "Innovation Lab Project",
    status: "Active",
    product: "Account-based...",
    startDate: "Jul 1, 2025",
    endDate: "Sep 12, 2025",
    budget: "Content",
    createdBy: "M Jane Doe",
    lastModified: "Sep 1, 2025, 4:30...",
  },
]

function StatusBadge({ status }: { status: Initiative["status"] }) {
  const styles = {
    Draft: "bg-[#fcf2d6] text-[#3c2c04]",
    Scheduled: "bg-[#d8f0dd] text-[#07290e]",
    Active: "bg-[#d8f0dd] text-[#07290e]",
  }

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
      <span className="text-xs font-semibold text-purple-900">{initials}</span>
    </div>
  )
}

function BudgetCell({ budget }: { budget: string }) {
  // Check if budget contains "$X spent" pattern at the end
  // Matches patterns like "Content $40,000 spent" or "$1,000,000.... $40,000 spent"
  const spentPattern = /\s+(\$\d+[,\d]*\.*\.*\.*\s+spent)$/;
  const spentMatch = budget.match(spentPattern);
  
  if (spentMatch) {
    const spentText = spentMatch[1];
    const mainText = budget.replace(spentPattern, '').trim();
    return (
      <div>
        <div>{mainText}</div>
        <div className="text-[#5E5E5E]" style={{ fontSize: '12px', lineHeight: '1.5' }}>
          {spentText}
        </div>
      </div>
    );
  }
  
  // Single line budget (for "-", "Content", etc.)
  return <div>{budget}</div>;
}

export function InitiativesTable() {
  return (
    <div className="bg-white rounded-lg overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-[260px_108px_220px_120px_120px_260px_220px_220px_56px] border-b border-[#F6F6F6] bg-white min-w-[1584px]">
        <TableHeaderCell>Heading</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Product</TableHeaderCell>
        <TableHeaderCell>Start Date</TableHeaderCell>
        <TableHeaderCell>End Date</TableHeaderCell>
        <TableHeaderCell>Budget</TableHeaderCell>
        <TableHeaderCell>Created By</TableHeaderCell>
        <TableHeaderCell>Last Modified</TableHeaderCell>
        <TableHeaderCell showSort={false} className="sticky right-0 bg-white z-20 border-l border-[#F6F6F6]">{""}</TableHeaderCell>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#F6F6F6]">
        {mockData.map((row) => (
          <div
            key={row.id}
            className="group grid grid-cols-[260px_108px_220px_120px_120px_260px_220px_220px_56px] hover:bg-[#f6f6f6] transition-colors min-w-[1584px]"
          >
            <TableCell className="font-medium text-[#121212]">
              {row.heading}
            </TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell className="text-[#303030]">{row.product}</TableCell>
            <TableCell className="text-[#303030]">{row.startDate}</TableCell>
            <TableCell className="text-[#303030]">{row.endDate}</TableCell>
            <TableCell className="text-[#303030]">
              <BudgetCell budget={row.budget} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar initials={row.createdBy.split(" ")[0][0]} />
                <span className="text-[#303030]">{row.createdBy}</span>
              </div>
            </TableCell>
            <TableCell className="text-[#303030]">{row.lastModified}</TableCell>
            <TableCell className="sticky right-0 bg-white z-10 border-l border-[#F6F6F6] group-hover:bg-[#f6f6f6] transition-colors">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </div>
        ))}
      </div>
    </div>
  )
}

function TableHeaderCell({
  children,
  className,
  showSort = true,
}: {
  children: React.ReactNode
  className?: string
  showSort?: boolean
}) {
  return (
    <div
      className={cn(
        "px-3 py-2 flex items-center gap-1 text-xs font-medium text-[#303030]",
        className
      )}
    >
      {children}
      {showSort && (
        <div className="flex flex-col ml-auto">
          <ChevronUp className="h-3 w-3 text-[#767676]" />
          <ChevronDown className="h-3 w-3 text-[#767676] -mt-1" />
        </div>
      )}
    </div>
  )
}

function TableCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("px-3 py-4 text-sm", className)}>{children}</div>
  )
}

