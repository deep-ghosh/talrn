"use client"

import { memo } from "react"

const clients = [
  { name: "UCFS", logo: "/ucfs-logo.jpg", active: false },
  { name: "Keller Offers", logo: "/keller-offers-logo.jpg", active: true },
  { name: "Simple night", logo: "/simple-night-logo.jpg", active: false },
  { name: "EVA", logo: "/eva-logo.jpg", active: false },
  { name: "Kopfspringer", logo: "/kopfspringer-logo.jpg", active: false },
  { name: "Loan Shout", logo: "/loan-shout-logo.jpg", active: false },
  { name: "Assuricare", logo: "/assuricare-logo.jpg", active: true },
  { name: "Arkstone", logo: "/arkstone-logo.jpg", active: false },
  { name: "Videobomb", logo: "/videobomb-logo.jpg", active: false },
  { name: "Farechild", logo: "/farechild-logo.jpg", active: false },
]

const ClientCard = memo(({ client }: { client: (typeof clients)[0] }) => (
  <div className="relative bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] w-[300px] flex-none">
    {client.active && (
      <span className="absolute -top-3 left-10 -rotate-12">
        <span className="bg-[#22C55E] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Active</span>
      </span>
    )}
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-3">
        <h3 className="text-[22px] font-semibold text-[#111827]">{client.name}</h3>
        <p className="text-[#6B7280] text-[15px]">12 month engagement</p>
      </div>
      <div className="h-10 w-16 shrink-0 flex items-center justify-center">
        <img src={client.logo || "/placeholder.svg"} alt={client.name} className="max-h-10 max-w-16 object-contain" />
      </div>
    </div>
  </div>
))
ClientCard.displayName = "ClientCard"

function ScrollingRow({
  items,
  direction = "rtl",
  duration = "38s",
}: {
  items: (typeof clients)[]
  direction?: "rtl" | "ltr"
  duration?: string
}) {
  const dup = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex flex-nowrap whitespace-nowrap min-w-max gap-6 will-change-transform ${
          direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr"
        }`}
        style={{ ["--duration" as any]: duration }}
      >
        {dup.map((c, i) => (
          <span key={`${c.name}-${i}`} className="inline-flex">
            <ClientCard client={c} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ClientLogos() {
  const mid = Math.ceil(clients.length / 2)
  const row1 = clients.slice(0, mid)
  const row2 = clients.slice(mid)

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1F2937] text-pretty">
            We&apos;ve helped <span className="text-[#5B6EF5]">250+</span> clients outsource their software development
          </h2>
          <p className="text-lg text-[#6B7280]">And just to name a few...</p>
        </div>

        {/* Row 1: right-to-left (moves to the left visually) */}
        <div className="mb-6">
          <ScrollingRow items={row1} direction="rtl" duration="38s" />
        </div>

        {/* Row 2: left-to-right */}
        <ScrollingRow items={row2} direction="ltr" duration="42s" />
      </div>
    </section>
  )
}
