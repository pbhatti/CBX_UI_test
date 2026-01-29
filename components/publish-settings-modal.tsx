"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PublishSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishSettingsModal({ isOpen, onClose }: PublishSettingsModalProps) {
  const [useRandomSender, setUseRandomSender] = useState("no")
  const [isTransactional, setIsTransactional] = useState("no")

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(18,18,18,0.12)] w-[600px] max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-[#eaeaea] px-6 pt-6 pb-4 flex items-center shrink-0 z-10 rounded-t-[16px]">
                <h2 className="text-lg font-semibold text-[#121212]">Publish settings</h2>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-6">
                  {/* Audience overview */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-[#303030]">Audience overview</p>
                    <div className="space-y-4">
                      {/* Segments */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#303030]">Segments</label>
                        <div className="text-sm text-[#303030]">
                          Diff-target-account-list - upload 2
                        </div>
                        <p className="text-xs italic text-[#5e5e5e]">
                          Note: This can either be the entire segment or a subset of the segment.
                        </p>
                      </div>
                      
                      {/* Exclusion list id */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#303030]">Exclusion list id</label>
                        <div className="text-sm text-[#303030]">5 contacts</div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#eaeaea]" />

                  {/* Sender details */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-[#303030]">Sender details</p>
                    <div className="space-y-4">
                      {/* Use random sender */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#303030]">
                          Use random sender from domain configuration?*
                        </label>
                        <RadioGroup
                          value={useRandomSender}
                          onValueChange={setUseRandomSender}
                          className="flex gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem 
                              value="yes" 
                              id="random-yes" 
                              className={useRandomSender !== "yes" ? "border-[#d3d3d3]" : ""}
                            />
                            <label htmlFor="random-yes" className="text-sm text-[#121212] cursor-pointer">
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem 
                              value="no" 
                              id="random-no" 
                              className={useRandomSender !== "no" ? "border-[#d3d3d3]" : ""}
                            />
                            <label htmlFor="random-no" className="text-sm text-[#121212] cursor-pointer">
                              No
                            </label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Transactional email */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#303030]">
                          Is this a transactional email?*
                        </label>
                        <RadioGroup
                          value={isTransactional}
                          onValueChange={setIsTransactional}
                          className="flex gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem 
                              value="yes" 
                              id="transactional-yes" 
                              className={isTransactional !== "yes" ? "border-[#d3d3d3]" : ""}
                            />
                            <label htmlFor="transactional-yes" className="text-sm text-[#121212] cursor-pointer">
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem 
                              value="no" 
                              id="transactional-no" 
                              className={isTransactional !== "no" ? "border-[#d3d3d3]" : ""}
                            />
                            <label htmlFor="transactional-no" className="text-sm text-[#121212] cursor-pointer">
                              No
                            </label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Sender name and email */}
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-semibold text-[#303030]">Sender name*</label>
                          <Input
                            defaultValue="Different AI"
                            className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-semibold text-[#303030]">Sender email address*</label>
                          <Input
                            defaultValue="we@differentai-mail.com"
                            className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                          />
                        </div>
                      </div>

                      {/* Reply-to address */}
                      <div className="space-y-2 w-[268px]">
                        <label className="text-sm font-semibold text-[#303030]">Reply-to address</label>
                        <Input
                          defaultValue="hello@different.ai"
                          className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#eaeaea]" />

                  {/* Landing page URL tracking */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-[#303030]">Landing page URL tracking</p>
                    <div className="space-y-4">
                      {/* URL path */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#303030]">URL path</label>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#5e5e5e] whitespace-nowrap">
                            https://go.differentai-mail.com/
                          </span>
                          <Input
                            defaultValue="meet-differentai-your-ai-copilot-for-campaign-creation-linkedin-ad-1"
                            className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6] flex-1"
                          />
                        </div>
                      </div>

                      {/* UTM source and medium */}
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-semibold text-[#303030]">UTM source</label>
                          <Input
                            defaultValue="LinkedIn"
                            className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-sm font-semibold text-[#303030]">UTM medium</label>
                          <Input
                            defaultValue="PaidSocial"
                            className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                          />
                        </div>
                      </div>

                      {/* UTM campaign */}
                      <div className="space-y-2 w-[268px]">
                        <label className="text-sm font-semibold text-[#303030]">UTM campaign</label>
                        <Input
                          defaultValue="Meet Different.ai – Your AI Copilot for Campaign Creation"
                          className="bg-[#F6F6F6] hover:border-[#D3D3D3] border-[#F6F6F6]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white border-t border-[#eaeaea] px-6 py-4 flex items-center justify-end gap-2 shrink-0 rounded-b-[16px]">
                <button
                  onClick={onClose}
                  className="bg-[#f6f6f6] h-10 px-4 rounded-lg hover:bg-[#eaeaea] transition-colors font-medium text-sm text-[#121212]"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="bg-black text-white h-10 px-4 rounded-lg hover:bg-black/90 transition-colors font-medium text-sm"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
