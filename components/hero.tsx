"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className=" min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center z-10 backdrop-blur-[2px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-[#00E5FF] via-[#00E5FF] to-[#39FF14] bg-clip-text text-transparent"
          style={{
            textShadow: "0 0 40px rgba(0,229,255,0.5), 0 0 80px rgba(0,229,255,0.3)",
          }}
        >
          Baryogenesis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl mb-4 text-[#EAEAEA]/90 font-light"
        >
          Transforming Ideas Into Digital Reality
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-12 text-[#EAEAEA]/70"
        >
          AI Solutions • Web Development • System Architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0B132B] font-semibold text-lg px-8 transition-all duration-300"
            style={{
              boxShadow: "0 0 20px rgba(0,229,255,0.5)",
            }}
          >
            Explore Our Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 font-semibold text-lg px-8 bg-transparent"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
