"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

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
];

export default function DeveloperMarquee() {
  const controls = useAnimation();

  // start looping horizontal motion
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#F8F9FF] via-white to-[#FAFBFF] py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5B6EF5]/5 via-transparent to-transparent"></div>

      <motion.div animate={controls} className="flex gap-6">
        {[...developers, ...developers].map((card, idx) => (
          <motion.div
            key={idx}
            className="w-52 sm:w-56 bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E1E5F7]/40 flex-shrink-0 hover:shadow-2xl"
            // vertical + fade when exiting (left edge)
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: idx < developers.length ? 0 : -30, // subtle up shift for old cards
              opacity: idx < developers.length ? 1 : 0.7,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: idx * 2, // stagger for natural flow
            }}
          >
            <div className="relative">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] rounded-full shadow-md"></div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{card.name}</h3>
              <p className="text-sm font-semibold text-transparent bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#3B82F6] bg-clip-text uppercase">
                {card.title}
              </p>
              <div className="mt-2 text-xs text-gray-600">
                Worked at{" "}
                <span className="font-semibold text-gray-800">
                  {card.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gradient edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F8F9FF] via-white/70 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F8F9FF] via-white/70 to-transparent pointer-events-none"></div>
    </div>
  );
}
