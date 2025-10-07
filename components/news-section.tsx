"use client"

import { CheckCircle2 } from "lucide-react"

export default function NewsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center space-y-6 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937]">
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent">Talrn</span> in the news
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto">
            We are recognized as one of the leading platforms for on-demand talent.
          </p>
        </div>

        {/* Press logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 items-center justify-items-center">
          <div className="h-24 flex items-center">
            <img src="/nbc-logo.png" alt="NBC" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="h-24 flex items-center">
            <img src="/fox-news-logo.jpg" alt="FOX NEWS" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="h-24 flex items-center">
            <img src="/generic-eye-logo.png" alt="CBS" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="h-24 flex items-center">
            <img src="/usa-today-logo.jpg" alt="USA TODAY" className="max-h-full max-w-full object-contain" />
          </div>
        </div>

        {/* CTA: Start your outsourcing journey today */}
        <div className="mt-16">
          <div className="rounded-2xl bg-[#5B6EF5] text-white px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-3xl">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                  Start your outsourcing <span className="block md:inline">journey today</span>
                </h3>

                {/* Bullets */}
                <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 text-sm md:text-base text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <span>Independent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <span>Secure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    <span>Transparent</span>
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="md:shrink-0">
                <a
                  href="#profiles"
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#1F2937] hover:bg-white/90 transition-colors px-8 md:px-12 h-12 md:h-14 text-sm md:text-base font-semibold whitespace-nowrap"
                  aria-label="View Profiles"
                >
                  View Profiles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
