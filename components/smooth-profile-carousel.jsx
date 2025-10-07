/* 
  SmoothProfileCarousel.jsx
  Single-file React + Framer Motion carousel that:
  - Shows 4 profile cards in a row
  - Every 3s: leftmost card animates up and fades out, others slide left, a new card enters from the right
  - Endless loop, pause on hover
*/

"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const PROFILES = [
  {
    id: "p1",
    name: "Fawaz A",
    role: "Senior Software Engineer",
    company: "Share",
    img: "/portrait-software-engineer.jpg",
  },
  {
    id: "p2",
    name: "Kumar J",
    role: "Senior iOS Developer",
    company: "McDonald's",
    img: "/portrait-ios-developer.jpg",
  },
  {
    id: "p3",
    name: "Thummar B",
    role: "iOS Development",
    company: "Capgemini",
    img: "/portrait-developer-beard.jpg",
  },
  {
    id: "p4",
    name: "Garg R",
    role: "Senior iOS Developer",
    company: "Paytm",
    img: "/smiling-developer-laptop.jpg",
  },
  {
    id: "p5",
    name: "Pradhan R",
    role: "Lead iOS Developer",
    company: "Standard Chartered",
    img: "/portrait-man-outdoor.jpg",
  },
  {
    id: "p6",
    name: "Diouf O",
    role: "Senior iOS Developer",
    company: "Apple",
    img: "/portrait-studio-lighting.jpg",
  },
  {
    id: "p7",
    name: "Fawaz A",
    role: "Senior Software Engineer",
    company: "Share",
    img: "/portrait-glasses-office.jpg",
  },
  {
    id: "p8",
    name: "Kumar J",
    role: "Senior iOS Developer",
    company: "McDonald's",
    img: "/portrait-suit-corporate.jpg",
  },
]

// Individual card
function ProfileCard({ profile }) {
  return (
    <div className="w-[280px] shrink-0 rounded-2xl bg-card text-foreground shadow-sm ring-1 ring-border overflow-hidden">
      <img
        src={profile.img || "/placeholder.svg"}
        alt={`${profile.name} portrait`}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{profile.name}</h3>
        <p className="mt-1 text-sm text-primary">{profile.role}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {"Worked at "}
          <span className="font-medium text-foreground">{profile.company}</span>
        </p>
      </div>
    </div>
  )
}

// Main carousel component
export default function SmoothProfileCarousel({ intervalMs = 3000, visibleCount = 4, profiles = PROFILES }) {
  // Window of visible items, each with a unique sequence for stable keys
  const [windowItems, setWindowItems] = useState(() =>
    Array.from({ length: visibleCount }, (_, i) => ({
      seq: i,
      profile: profiles[i % profiles.length],
    })),
  )
  const nextIndexRef = useRef(visibleCount)
  const seqRef = useRef(visibleCount)
  const [paused, setPaused] = useState(false)

  // Step function: remove leftmost, push a new one on the right
  const step = React.useCallback(() => {
    setWindowItems((prev) => {
      const [, ...rest] = prev
      const nextProfile = profiles[nextIndexRef.current % profiles.length]
      const nextSeq = seqRef.current + 1
      nextIndexRef.current += 1
      seqRef.current = nextSeq
      return [...rest, { seq: nextSeq, profile: nextProfile }]
    })
  }, [profiles])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(step, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, paused, step])

  // Variants for enter/exit; layout handles the left slide of remaining cards
  const variants = {
    enter: { x: 40, opacity: 0, scale: 0.98 },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 32 },
    },
    exit: { y: -24, opacity: 0, scale: 0.98, transition: { duration: 0.35, ease: "easeOut" } },
  }

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Scrolling profiles"
    >
      {/* Edge masks for cleaner entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />

      <div className="relative overflow-hidden">
        <div className="flex items-stretch gap-6">
          <AnimatePresence initial={false}>
            {windowItems.map((item) => (
              <motion.div key={item.seq} layout variants={variants} initial="enter" animate="center" exit="exit">
                <ProfileCard profile={item.profile} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
