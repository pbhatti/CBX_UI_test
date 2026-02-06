"use client"

import { SiteHeader } from "@/components/site-header"
import { ContentPanel } from "@/components/content-panels"
import { FilterBar } from "@/components/filter-bar"
import { InitiativesTable } from "@/components/initiatives-table"
import { Pagination } from "@/components/pagination"

export interface InitiativesViewProps {
  onCreateInitiative: () => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Composed Initiatives screen: header + filter + table + pagination inside a content panel.
 */
export function InitiativesView({
  onCreateInitiative,
  currentPage,
  totalPages,
  onPageChange,
}: InitiativesViewProps) {
  return (
    <>
      <SiteHeader
        title="Initiatives"
        primaryAction={{ label: "Create initiative", onClick: onCreateInitiative }}
      />
      <div className="flex-1 overflow-auto">
        <div className="px-6 pb-6 pt-0">
          <ContentPanel>
            <FilterBar />
            <div className="overflow-x-auto w-full">
              <InitiativesTable />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </ContentPanel>
        </div>
      </div>
    </>
  )
}
