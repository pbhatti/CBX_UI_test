"use client"

import { useState } from "react"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { Header } from "@/components/header"
import { FilterBar } from "@/components/filter-bar"
import { InitiativesTable } from "@/components/initiatives-table"
import { Pagination } from "@/components/pagination"
import { CreateInitiativeForm } from "@/components/create-initiative-form"
import { BackgroundGradient } from "@/components/background-gradient"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isBackgroundGradientOpen, setIsBackgroundGradientOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <NavigationSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onBackgroundGradientClick={() => setIsBackgroundGradientOpen(true)}
      />
      <motion.div
        initial={false}
        animate={{
          marginLeft: isSidebarCollapsed ? 64 : 240,
        }}
        className="flex-1 flex flex-col overflow-hidden transition-all duration-300"
      >
        <Header onCreateInitiative={() => setIsFormOpen(true)} />
        <div className="flex-1 overflow-auto">
          <div className="px-6 pb-6 pt-0">
            <div className="bg-white rounded-2xl border border-[#DEDEDE] overflow-hidden">
              <FilterBar />
              <div className="overflow-x-auto w-full">
                <InitiativesTable />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isFormOpen && (
          <CreateInitiativeForm onClose={() => setIsFormOpen(false)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isBackgroundGradientOpen && (
          <BackgroundGradient onClose={() => setIsBackgroundGradientOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

