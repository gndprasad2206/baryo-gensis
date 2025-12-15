"use client"

import { motion, useInView, useScroll } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const services = [
  { name: "AI & Machine Learning", description: "Custom AI solutions and intelligent automation" },
  { name: "Web Development", description: "Modern, responsive web applications" },
  { name: "Backend Systems", description: "Scalable APIs and microservices architecture" },
  { name: "Cloud Infrastructure", description: "DevOps and cloud deployment solutions" },
  { name: "System Design", description: "Enterprise-grade distributed systems" },
  { name: "Database Solutions", description: "Optimized data storage and retrieval" },
]

export function Skills() {
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
            className="text-5xl md:text-6xl font-bold mb-16 text-[#00E5FF]"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <SkillCard key={service.name} skill={service} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  index,
  isInView,
}: {
  skill: (typeof services)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isNearParticle, setIsNearParticle] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", () => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const particleX = window.innerWidth / 2
      const particleY = window.scrollY + window.innerHeight / 2

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + window.scrollY + rect.height / 2

      const distance = Math.sqrt(Math.pow(particleX - centerX, 2) + Math.pow(particleY - centerY, 2))

      setIsNearParticle(distance < 200)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div
        className="bg-[#1C2541] border border-[#00E5FF]/20 rounded-lg p-6 transition-all duration-500 h-full"
        style={{
          boxShadow: isNearParticle
            ? "0 0 30px rgba(0,229,255,0.6), inset 0 0 20px rgba(0,229,255,0.2)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          borderColor: isNearParticle ? "rgba(0,229,255,0.8)" : "rgba(0,229,255,0.2)",
        }}
      >
        <h3 className="text-xl font-semibold mb-3 text-[#EAEAEA] group-hover:text-[#00E5FF] transition-colors">
          {skill.name}
        </h3>
        <p className="text-[#EAEAEA]/70 text-sm leading-relaxed">{skill.description}</p>
      </div>
    </motion.div>
  )
}
