"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DeveloperMarquee from "@/components/developer-marquee"

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1F2937] leading-tight">
              Find & Hire iOS Developers with Ease
            </h1>
            <p className="text-xl text-[#6B7280] leading-relaxed">
              Bring the right talent to your team effortlessly with Talrn
            </p>
          </div>
          <p className="text-[#6B7280] leading-relaxed">
            Hire pre-vetted remote iOS developers with strong technical & communication skills within 48 hours.
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Your work email"
              className="flex-1 h-12 rounded-full bg-white border-gray-300"
            />
            <Button className="bg-[#5B6EF5] hover:bg-[#4A5DE4] text-white rounded-full px-8 h-12 whitespace-nowrap">
              Hire iOS Dev
            </Button>
          </div>
          <p className="text-sm text-[#6B7280]">
            Looking for remote iOS dev jobs{" "}
            <a href="/join" className="text-[#5B6EF5] underline hover:text-[#4A5DE4]">
              Apply here
            </a>
          </p>

          <div className="pt-4">
            <p className="text-center text-[#6B7280] leading-relaxed">
              Explore <span className="font-semibold text-[#374151]">411+ iOS developers</span> from{" "}
              <span className="font-semibold text-[#374151]">71+ countries</span>, delivering{" "}
              <span className="font-semibold text-[#374151]">2520+ projects</span>.
            </p>
            <p className="mt-2 text-center text-[#6B7280] leading-relaxed">
              Discover <span className="font-semibold text-[#374151]">102+ industry expert</span> in Ecommerce, Health
              and Fitness &amp; more with,{" "}
              <span className="font-semibold text-[#374151]">326+ technology specialists</span> in Swift, ObjectiveC
              &amp; more
            </p>
          </div>
          {/* end stats */}
        </div>

        <div className="lg:block">
          <DeveloperMarquee />
        </div>
      </div>
    </section>
  )
}
