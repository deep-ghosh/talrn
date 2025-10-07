"use client"

export default function ManagedServices() {
  return (
    <section aria-labelledby="managed-services" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Outer dark panel with background image */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-lg">
          {/* Background image */}
          <img
            alt=""
            src="/modern-office-team.png"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
          />
          {/* Content */}
          <div className="relative p-8 md:p-12 lg:p-14">
            <h2 id="managed-services" className="text-white text-3xl md:text-4xl font-semibold tracking-tight">
              Experience Talrn&apos;s managed services.
            </h2>
            <p className="text-white/80 mt-4 max-w-3xl text-base md:text-lg">
              Full-scale resource augmentation with a dedicated success manager to manage your team&apos;s performance.
              Book a free call with our team.
            </p>

            {/* Plans */}
            <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-3">
              {/* Premium */}
              <div className="rounded-2xl bg-[#5B6EF5] text-white p-6 md:p-8 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold">Premium Plan</h3>
                  <div className="text-3xl md:text-4xl font-bold">
                    $160 <span className="text-white/90 text-base align-top">/mo</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100 transition">
                    Know More
                  </button>
                </div>
              </div>

              {/* Standard */}
              <div className="rounded-2xl bg-[#5B6EF5] text-white p-6 md:p-8 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold">Standard Plan</h3>
                  <div className="text-3xl md:text-4xl font-bold">
                    $0 <span className="text-white/90 text-base align-top">/mo</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100 transition">
                    Know More
                  </button>
                </div>
              </div>

              {/* Customized */}
              <div className="rounded-2xl bg-[#5B6EF5] text-white p-6 md:p-8 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold">Customized Plan</h3>
                  <p className="text-white/90">Get in touch with our team</p>
                </div>
                <div className="mt-6">
                  <button className="inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100 transition">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
