"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const industries = ["Healthcare", "Automotive", "Banking", "Capital Markets", "Travel", "Digital Commerce"]

const developers = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  image: `/professional-developer-portrait-${i % 8 + 1}.jpg`,
}))

const mosaicImage = "/images/industry-mosaic.png"
const tiles = Array.from({ length: 16 }, (_, i) => i)
const getBgPos = (i: number) => {
  const col = i % 4
  const row = Math.floor(i / 4)
  // 4x4 sprite: scale to 400% so each tile shows its quadrant
  return `${col * 33.3333}% ${row * 33.3333}%`
}

export default function IndustrySection() {
  const [activeIndustry, setActiveIndustry] = useState("Healthcare")

  return (
    <section className="bg-[#F5F5F7] py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight">
                Scale your team with Talrn&apos;s immediately available resources
              </h2>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                Find pre-vetted iOS developers that have previously worked in the same industry instantly.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-[#1F2937]">What is your industry?</p>
              <div className="flex flex-wrap gap-3">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={activeIndustry === industry ? "default" : "outline"}
                    className={`rounded-full px-6 ${
                      activeIndustry === industry
                        ? "bg-[#5B6EF5] hover:bg-[#4A5DE4] text-white"
                        : "border-[#5B6EF5] text-[#5B6EF5] hover:bg-[#5B6EF5]/10"
                    }`}
                    onClick={() => setActiveIndustry(industry)}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="w-full">
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {tiles.map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg shadow-sm ring-1 ring-black/5 overflow-hidden"
                  role="img"
                  aria-label="iOS developer headshot"
                  style={{
                    backgroundImage: `url(${mosaicImage})`,
                    backgroundSize: "400% 400%",
                    backgroundPosition: getBgPos(i),
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
