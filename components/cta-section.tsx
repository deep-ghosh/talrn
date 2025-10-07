"use client"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-[#07143A] px-8 md:px-16 py-10 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-2xl text-balance">
            Augment your team with highly-skilled iOS Developers
          </h2>

          <Button className="bg-white hover:bg-white/90 text-[#07143A] rounded-full px-12 h-14 text-base md:text-lg font-semibold shadow-lg whitespace-nowrap flex-shrink-0">
            View Profiles
          </Button>
        </div>
      </div>
    </section>
  )
}
