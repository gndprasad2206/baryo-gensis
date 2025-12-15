"use client"

import { motion, useInView, useScroll } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const milestones = [
  {
    year: "2024",
    title: "Global Expansion",
    company: "50+ Enterprise Clients",
    description: "Expanded operations across three continents, serving Fortune 500 companies.",
  },
  {
    year: "2023",
    title: "AI Innovation Award",
    company: "Industry Recognition",
    description: "Recognized for breakthrough AI solutions in healthcare and finance sectors.",
  },
  {
    year: "2022",
    title: "Series A Funding",
    company: "$10M Investment",
    description: "Secured funding to scale operations and expand our development team.",
  },
  {
    year: "2021",
    title: "Company Founded",
    company: "Baryogenesis Inc.",
    description: "Launched with a vision to transform digital innovation landscape.",
  },
]

export function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [particlePosition, setParticlePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      const progress = scrollYProgress.get()
      const amplitude = Math.min(window.innerWidth * 0.3, 300)
      const frequency = 4
      const x = Math.sin(progress * Math.PI * frequency) * amplitude + window.innerWidth / 2
      setParticlePosition({ x, y: window.scrollY + window.innerHeight / 2 })
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const isParticleOnRight = particlePosition.x > window.innerWidth / 2

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <div className={`max-w-6xl mx-auto w-full flex justify-end`}>
        <div className="w-full max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-20 text-[#00E5FF]"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#39FF14] via-[#00E5FF] to-[#FF9F1C]" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <TimelineNode key={milestone.year} experience={milestone} index={index} isInView={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineNode({
  experience,
  index,
  isInView,
}: {
  experience: (typeof milestones)[0]
  index: number
  isInView: boolean
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isActivated, setIsActivated] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      if (!nodeRef.current) return

      const rect = nodeRef.current.getBoundingClientRect()
      const particleY = window.innerHeight / 2

      const nodeY = rect.top + rect.height / 2
      const distance = Math.abs(particleY - nodeY)

      setIsActivated(distance < 100)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex items-center gap-8 pl-8"
    >
      <div className="flex-1">
        <div className="inline-block text-sm font-mono text-[#39FF14] mb-2">{experience.year}</div>
        <h3 className="text-2xl font-bold text-[#EAEAEA] mb-1">{experience.title}</h3>
        <div className="text-lg text-[#00E5FF] mb-3">{experience.company}</div>
        <p className="text-[#EAEAEA]/70 leading-relaxed">{experience.description}</p>
      </div>

      <div className="absolute left-0 -translate-x-1/2 flex items-center justify-center">
        <div
          className="w-4 h-4 rounded-full bg-[#00E5FF] border-4 border-[#0B132B] transition-all duration-500"
          style={{
            boxShadow: isActivated
              ? "0 0 30px rgba(0,229,255,1), 0 0 60px rgba(0,229,255,0.6)"
              : "0 0 10px rgba(0,229,255,0.5)",
            transform: isActivated ? "scale(1.5)" : "scale(1)",
          }}
        />
      </div>
    </motion.div>
  )
}
