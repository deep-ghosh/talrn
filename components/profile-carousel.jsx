/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const PROFILES = [
  {
    id: "1",
    name: "Fawaz A",
    title: "Senior Software Engineer",
    company: "Share",
    image: "/smiling-engineer-glasses.jpg",
  },
  {
    id: "2",
    name: "Kumar J",
    title: "Senior iOS Developer",
    company: "McDonald's",
    image: "/man-in-grey-suit.jpg",
  },
  {
    id: "3",
    name: "Thummar B",
    title: "iOS Development",
    company: "Capgemini",
    image: "/portrait-with-beard.jpg",
  },
  {
    id: "4",
    name: "Garg R",
    title: "Senior iOS Developer",
    company: "PayTM",
    image: "/smiling-developer-outdoors.jpg",
  },
  {
    id: "5",
    name: "Diouf O",
    title: "Senior iOS Developer",
    company: "Apple",
    image: "/portrait-studio-lighting.jpg",
  },
  {
    id: "6",
    name: "Pradhan R",
    title: "Lead iOS Developer",
    company: "Standard Chartered",
    image: "/portrait-outdoor-bokeh.jpg",
  },
  {
    id: "7",
    name: "Aparna S",
    title: "iOS Engineer",
    company: "Stripe",
    image: "/woman-in-office.png",
  },
  {
    id: "8",
    name: "Diego M",
    title: "iOS Engineer",
    company: "Spotify",
    image: "/man-wearing-headphones.jpg",
  },
  {
    id: "9",
    name: "Li X",
    title: "Senior iOS Engineer",
    company: "Uber",
    image: "/studio-portrait.png",
  },
  {
    id: "10",
    name: "Sara K",
    title: "iOS Developer",
    company: "Meta",
    image: "/smiling-woman-closeup.jpg",
  },
]

// Individual profile card
function ProfileCard({ p }) {
  return (
    <div className="w-64 flex-shrink-0 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
      <img
        src={p.image || "/placeholder.svg"}
        alt={`${p.name} profile photo`}
        className="h-64 w-full object-cover"
        crossOrigin="anonymous"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#1f2937]">{p.name}</h3>
        <p className="text-sm font-medium text-[#5b6ef5]">{p.title}</p>
        <p className="text-sm text-[#6b7280]">
          Worked at <span className="font-semibold text-[#1f2937]">{p.company}</span>
        </p>
      </div>
    </div>
  )
}

// The animated carousel
export default function ProfileCarousel() {
  const VISIBLE = 5
  const INTERVAL_MS = 3000

  // Window of visible profiles
  const [windowItems, setWindowItems] = useState(() => PROFILES.slice(0, VISIBLE))
  // Index of the next item to append
  const nextIdxRef = useRef(VISIBLE)
  const timerRef = useRef(null)

  useEffect(() => {
    // rotate once every INTERVAL_MS
    timerRef.current = setInterval(() => {
      setWindowItems((prev) => {
        const next = PROFILES[nextIdxRef.current % PROFILES.length]
        nextIdxRef.current = (nextIdxRef.current + 1) % PROFILES.length
        // remove first (leftmost), append next (rightmost)
        return [...prev.slice(1), next]
      })
    }, INTERVAL_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      {/* Track uses layout to smoothly shift left when first item is removed */}
      <motion.div
        layout
        className="flex items-stretch gap-6"
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        <AnimatePresence initial={false}>
          {windowItems.map((p) => (
            <motion.div
              key={p.id}
              layout
              className="flex-none"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            >
              <ProfileCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
