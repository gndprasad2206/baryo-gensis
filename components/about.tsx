"use client"

import { motion, useInView, useScroll } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function About() {
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
        <motion.div
          initial={{ opacity: 0, x: isParticleOnRight ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-[#00E5FF]">Our Vision</h2>

          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-[#EAEAEA]/80">
            <p className="text-balance">
              At <span className="text-[#00E5FF] font-semibold">Baryogenesis</span>, we believe in the power of digital
              transformation. Just as the universe created matter from energy, we create tangible solutions from
              innovative ideas.
            </p>

            <p className="text-balance">
              Our team specializes in building cutting-edge{" "}
              <span className="text-[#39FF14] font-semibold">AI-powered systems</span>, scalable{" "}
              <span className="text-[#39FF14] font-semibold">web applications</span>, and robust{" "}
              <span className="text-[#39FF14] font-semibold">backend architectures</span> that drive businesses forward.
            </p>

            <p className="text-balance">
              We work at the intersection of creativity and technology, delivering solutions that are not just
              functional, but <span className="text-[#FF9F1C] font-semibold">transformative</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
