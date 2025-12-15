"use client"

import type React from "react"

import { motion, useInView, useScroll } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
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
    <footer ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-[#050A18]">
      <div className={`max-w-6xl mx-auto w-full flex ${isParticleOnRight ? "justify-start" : "justify-end"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-8 text-[#FF9F1C]"
            style={{
              textShadow: "0 0 40px rgba(255,159,28,0.6)",
            }}
          >
            Let's Build the Future Together
          </h2>

          <p className="text-lg text-[#EAEAEA]/80 mb-12 leading-relaxed">
            Ready to transform your ideas into reality? Our team is here to help you create cutting-edge solutions that
            drive real business impact.
          </p>

          <div className="flex gap-8 mb-16">
            <SocialLink href="https://github.com" icon={<Github className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="https://twitter.com" icon={<Twitter className="w-6 h-6" />} label="Twitter" />
            <SocialLink href="mailto:contact@baryogenesis.com" icon={<Mail className="w-6 h-6" />} label="Email" />
          </div>

          <div className="text-sm text-[#EAEAEA]/40">
            © {new Date().getFullYear()} Baryogenesis Inc. Transforming energy into matter.
          </div>
        </motion.div>
      </div>

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,159,28,0.15) 0%, transparent 70%)",
        }}
      />
    </footer>
  )
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="text-[#00E5FF] hover:text-[#FF9F1C] transition-colors duration-300"
      style={{
        filter: "drop-shadow(0 0 10px rgba(0,229,255,0.5))",
      }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  )
}
