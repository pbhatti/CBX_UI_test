"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout"
import { InitiativesView } from "@/components/layout"
import { CreateInitiativeForm } from "@/components/create-initiative-form"
import { BackgroundGradient } from "@/components/background-gradient"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isBackgroundGradientOpen, setIsBackgroundGradientOpen] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)

  return (
    <>
      <AppLayout
        showLeftNav={!isNavHidden}
        isLeftNavCollapsed={isSidebarCollapsed}
        onLeftNavToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onBackgroundGradientClick={() => setIsBackgroundGradientOpen(true)}
        currentPage="initiatives"
      >
        <InitiativesView
          onCreateInitiative={() => setIsFormOpen(true)}
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </AppLayout>

      <AnimatePresence>
        {isFormOpen && (
          <CreateInitiativeForm onClose={() => setIsFormOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBackgroundGradientOpen && (
          <BackgroundGradient
            onClose={() => {
              setIsBackgroundGradientOpen(false)
              setIsNavHidden(false)
            }}
            onHideNav={() => setIsNavHidden(true)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
