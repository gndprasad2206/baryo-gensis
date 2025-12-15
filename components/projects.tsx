"use client"

import { motion, useInView, useScroll } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "FinTech AI Platform",
    description: "Real-time fraud detection system processing millions of transactions with 99.9% accuracy.",
    tech: ["Python", "FastAPI", "TensorFlow", "Redis"],
    link: "#",
  },
  {
    title: "E-Commerce Ecosystem",
    description: "Scalable marketplace platform serving 500K+ users with personalized recommendations.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    link: "#",
  },
  {
    title: "Healthcare Dashboard",
    description: "HIPAA-compliant patient management system with telemedicine capabilities.",
    tech: ["React", "Django", "MongoDB", "WebRTC"],
    link: "#",
  },
  {
    title: "Logistics Automation",
    description: "Supply chain optimization platform reducing delivery times by 40%.",
    tech: ["Vue.js", "FastAPI", "MySQL", "Docker"],
    link: "#",
  },
]

export function Projects() {
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
      <div className={`max-w-6xl mx-auto w-full flex justify-start`}>
        <div className="w-full max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-16 text-[#00E5FF]"
          >
            Featured Projects
          </motion.h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isNearParticle, setIsNearParticle] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
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

      setIsNearParticle(distance < 250)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className="bg-[#1C2541] border border-[#00E5FF]/20 rounded-lg p-8 transition-all duration-500"
        style={{
          boxShadow: isNearParticle
            ? "0 0 40px rgba(0,229,255,0.6), inset 0 0 30px rgba(0,229,255,0.15)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          borderColor: isNearParticle ? "rgba(0,229,255,1)" : "rgba(0,229,255,0.2)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <h3 className="text-2xl font-bold mb-3 text-[#EAEAEA] group-hover:text-[#00E5FF] transition-colors">
          {project.title}
        </h3>
        <p className="text-[#EAEAEA]/80 mb-6 leading-relaxed">{project.description}</p>

        <div
          className="flex flex-wrap gap-2 mb-4 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            maxHeight: isHovered ? "100px" : "0",
            overflow: "hidden",
          }}
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] rounded-full border border-[#00E5FF]/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {isHovered && (
          <Button variant="ghost" size="sm" className="text-[#00E5FF] hover:text-[#EAEAEA] hover:bg-[#00E5FF]/20">
            View Case Study →
          </Button>
        )}
      </div>
    </motion.div>
  )
}
