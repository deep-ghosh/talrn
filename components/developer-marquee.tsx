"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Developer profiles data
const developers = [
  {
    id: 1,
    name: "Pradhan R",
    title: "Lead iOS Developer",
    company: "Standard Chartered",
    image: "/professional-developer-portrait-man.jpg",
  },
  {
    id: 2,
    name: "Kumar J",
    title: "Senior iOS Developer",
    company: "McDonald's",
    image: "/professional-developer-portrait-man-formal.jpg",
  },
  {
    id: 3,
    name: "Thummar B",
    title: "iOS Development Lead",
    company: "Capgemini",
    image: "/professional-developer-portrait-man-beard.jpg",
  },
  {
    id: 4,
    name: "Garg R",
    title: "Senior iOS Developer",
    company: "Paytm",
    image: "/professional-developer-portrait-man-glasses.jpg",
  },
  {
    id: 5,
    name: "Sarah M",
    title: "iOS Tech Lead",
    company: "Spotify",
    image: "/smiling-woman-closeup.jpg",
  },
  {
    id: 6,
    name: "Alex C",
    title: "Mobile Developer",
    company: "Uber",
    image: "/portrait-developer-beard.jpg",
  },
  {
    id: 7,
    name: "David L",
    title: "Senior iOS Engineer",
    company: "Netflix",
    image: "/portrait-glasses-office.jpg",
  },
  {
    id: 8,
    name: "Maya P",
    title: "iOS Developer",
    company: "Airbnb",
    image: "/woman-in-office.png",
  },
]

interface ProfileCardProps {
  developer: (typeof developers)[0]
  position: number
  cardSpacing: number
}

const ProfileCard = ({ developer, position, cardSpacing }: ProfileCardProps) => {
  return (
    <motion.div
      key={`${developer.id}-${position}`}
      initial={{ 
        x: 400,
        opacity: 0, 
        scale: 0.9 
      }}
      animate={{ 
        x: position * cardSpacing,
        opacity: position === -1 ? 0 : 1,
        scale: position === -1 ? 0.8 : 1,
        y: position === -1 ? -50 : 0,
      }}
      exit={{ 
        x: -100,
        y: -60,
        opacity: 0,
        scale: 0.7
      }}
      transition={{
        duration: 0.9,
        ease: [0.4, 0.0, 0.2, 1],
        y: { duration: 0.7, ease: "easeOut" },
        opacity: { duration: 0.6 },
        scale: { duration: 0.7 }
      }}
      className="absolute w-64 sm:w-72 lg:w-80 bg-gradient-to-br from-white via-[#FAFBFF] to-[#F8F9FF] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-[#E1E5F7]/30 backdrop-blur-sm transition-all duration-500"
    >
      <div className="relative overflow-hidden">
        <img 
          src={developer.image || "/placeholder.svg"} 
          alt={developer.name} 
          className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5B6EF5]/20 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-full shadow-lg"></div>
      </div>
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 bg-gradient-to-b from-transparent to-white/50">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] tracking-tight mb-1">{developer.name}</h3>
            <p className="text-sm font-semibold text-transparent bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text uppercase tracking-wide">{developer.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-[#E1E5F7]/40">
          <div className="w-2 h-2 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-full"></div>
          <p className="text-sm text-[#6B7280] flex items-center">
            Worked at <span className="font-semibold text-[#1F2937] ml-1">{developer.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function DeveloperMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardSpacing, setCardSpacing] = useState(280)
  
  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth
      if (width < 640) setCardSpacing(240)       // Mobile
      else if (width < 1024) setCardSpacing(280) // Tablet  
      else if (width < 1280) setCardSpacing(320) // Desktop
      else setCardSpacing(360)                   // Large desktop
    }
    
    updateSpacing()
    window.addEventListener('resize', updateSpacing)
    return () => window.removeEventListener('resize', updateSpacing)
  }, [])
  
  const getVisibleCards = (startIndex: number) => {
    const cards = []
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % developers.length
      cards.push({
        ...developers[index],
        key: `card-${index}-${startIndex}`,
        position: i - 1,
      })
    }
    return cards
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const visibleCards = getVisibleCards(currentIndex)

  return (
    <div className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-[#F8F9FF] via-white to-[#FAFBFF]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5B6EF5]/5 via-transparent to-transparent"></div>
      
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-[280px] sm:max-w-[600px] lg:max-w-[900px] xl:max-w-[1100px] h-[400px] sm:h-[450px] lg:h-[500px]">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card) => (
              <ProfileCard
                key={card.key}
                developer={card}
                position={card.position}
                cardSpacing={cardSpacing}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-r from-[#F8F9FF] via-[#F8F9FF]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-16 lg:w-20 bg-gradient-to-l from-[#F8F9FF] via-[#F8F9FF]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-white/30">
          {developers.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-500 ${
                index === (currentIndex % developers.length) 
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] w-6 sm:w-8 h-2 shadow-lg' 
                  : 'bg-white/60 w-2 h-2 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
