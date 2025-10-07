"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#EDF5FF]/95 via-white/95 to-[#F8F9FF]/95 backdrop-blur-md border-b border-[#E1E5F7]/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between relative">
        <a
          href="/"
          aria-label="Talrn Home"
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] leading-none font-bold tracking-tight bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
        >
          Talrn
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-10 absolute left-1/2 -translate-x-1/2">
          <a href="#why" className="text-[#374151] hover:text-transparent hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#3B82F6] hover:bg-clip-text transition-all duration-300 text-sm lg:text-[15px] font-medium">
            Why
          </a>
          <button
            type="button"
            onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
            className="flex items-center gap-1 text-[#374151] hover:text-transparent hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#3B82F6] hover:bg-clip-text transition-all duration-300 text-sm lg:text-[15px] font-medium"
            aria-expanded={isIndustriesOpen}
          >
            Industries
            <ChevronDown className="w-4 h-4 text-[#5B6EF5]" />
          </button>
          <a
            href="#find-ios-dev"
            className="text-[#374151] hover:text-transparent hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#3B82F6] hover:bg-clip-text transition-all duration-300 text-sm lg:text-[15px] font-medium"
          >
            Find iOS Dev
          </a>
          <a
            href="/join"
            className="text-[#374151] hover:text-transparent hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#3B82F6] hover:bg-clip-text transition-all duration-300 text-sm lg:text-[15px] font-medium"
          >
            Apply as Vendor
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <Button className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] hover:from-[#4338CA] hover:via-[#5B21B6] hover:to-[#2563EB] text-white rounded-full h-10 sm:h-12 px-4 sm:px-6 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="hidden sm:inline">Hire iOS Dev</span>
            <span className="sm:hidden">Hire</span>
          </Button>
          <a href="#login" className="text-[#374151] hover:text-transparent hover:bg-gradient-to-r hover:from-[#4F46E5] hover:to-[#3B82F6] hover:bg-clip-text transition-all duration-300 text-sm lg:text-[15px] font-medium">
            Login
          </a>
        </div>
      </div>
    </header>
  )
}
