"use client"

import { useState, useEffect } from "react"
import { MessageCircle, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
      <Button
        className="w-14 h-14 rounded-full bg-[#5B6EF5] hover:bg-[#4A5DE4] text-white shadow-lg"
        onClick={() => {}}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      {showScroll && (
        <Button
          className="w-14 h-14 rounded-full bg-[#5B6EF5] hover:bg-[#4A5DE4] text-white shadow-lg"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
