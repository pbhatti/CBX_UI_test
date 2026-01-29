"use client"

import { Button } from "@/components/ui/button"

// Image URLs from Figma - these are localhost URLs that may need to be replaced with actual assets
const imgImage6 = "http://localhost:3845/assets/e413489b4184b2e007d89dd17a1a7a45c4181355.png"
const imgImage7 = "http://localhost:3845/assets/8a0bc5b1ed641f6bccfb79bc6fd730863674b870.png"

export function LandingPagePreview() {
  return (
    <div className="bg-white border-2 border-[#EAEAEA] rounded-[16px] flex flex-col items-center p-6 w-full max-w-[720px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2 items-start px-0 py-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4 items-center">
            <div className="bg-[#D9D9D9] w-8 h-8 shrink-0" />
            <div className="flex flex-col items-start">
              <p className="font-bold leading-[1.4] text-sm text-black">
                ThoughtSpot
              </p>
            </div>
          </div>
          <Button 
            className="bg-black text-white hover:bg-black/90 h-6 px-2 text-xs font-medium rounded-lg"
            size="sm"
          >
            Request a demo
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 items-center w-full mt-6">
          <h1 className="font-bold leading-[1.4] text-[32px] text-[#121212] text-center max-w-[324px]">
            Meet us at Breakthrough 2025
          </h1>
          
          <div className="text-sm leading-[1.4] text-[#303030] text-center w-full">
            <p className="mb-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheet.
            </p>
            <p className="mt-0">#Tag 1,  #Tag 2, #Tag 3</p>
          </div>

          <Button 
            className="bg-black text-white hover:bg-black/90 h-6 px-2 text-xs font-medium rounded-lg"
            size="sm"
          >
            Book an appointment
          </Button>
        </div>
      </div>

      {/* Main Image */}
      <div className="h-[420px] relative rounded-[16px] w-full max-w-[720px] overflow-hidden">
        <div className="absolute inset-0 rounded-[16px] overflow-hidden">
          <img 
            alt="Person coding with data visualizations" 
            className="absolute max-w-none object-cover rounded-[16px] w-full h-full" 
            src="/images/image1.png"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-start justify-between w-full px-0 py-10">
        <div className="flex gap-2 items-center">
          <div className="bg-[#D9D9D9] w-6 h-6 shrink-0" />
          <div className="flex flex-col items-start">
            <p className="font-bold leading-[1.4] text-sm text-black whitespace-nowrap">
              ThoughtSpot
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-start max-w-[400px]">
          <div className="flex gap-2 items-start">
            <div className="flex flex-col justify-center">
              <p className="leading-[1.4] text-xs font-medium text-[#121212] whitespace-nowrap">
                Address
              </p>
            </div>
          </div>
          <p className="leading-[1.4] text-xs text-[#303030] whitespace-nowrap overflow-hidden text-ellipsis">
            199 4D Bascom Avenue, CA 9857, United States
          </p>
        </div>
        
        <Button 
          className="bg-black text-white hover:bg-black/90 h-6 px-2 text-xs font-medium rounded-lg"
          size="sm"
        >
          Request a demo
        </Button>
      </div>
    </div>
  )
}
