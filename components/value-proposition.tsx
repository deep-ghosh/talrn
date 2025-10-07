"use client"

export default function ValueProposition() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl bg-[#0A0E27] overflow-hidden px-8 md:px-10 lg:px-12 py-14">
          {/* background phone */}
          <img
            src="/iphone-pro-dark-mockup.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 bottom-0 w-[720px] max-w-none opacity-60 hidden md:block"
          />

          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight text-pretty">
              Talrn is the world&apos;s largest network of top iOS talent.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Save 70% on staff costs, while driving innovation & growth. Guaranteed.
            </p>
          </div>

          {/* CTA cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Featured works on Talrn",
                desc: "Explore the best works delivered by developers",
              },
              {
                title: "See all profiles on Talrn",
                desc: "Discover top developer profiles available on Talrn",
              },
              {
                title: "Apply as a developer",
                desc: "Start your journey as a developer with Talrn",
              },
            ].map((card, i) => (
              <div key={i} className="bg-[#5B6EF5] hover:bg-[#4A5DE4] transition-colors rounded-2xl p-6 shadow-sm">
                <h3 className="text-white text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
