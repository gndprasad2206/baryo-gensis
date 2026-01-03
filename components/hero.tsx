"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import GradientText from "./reactbits/GradientText"
import ShinyText from "./reactbits/ShinyText"

export function Hero() {
  return (
    <section className=" min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center z-10 backdrop-blur-[2px]">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="text-[120px] font-bold audiowide"
        >
          Baryogenesis
        </GradientText>

        <ShinyText
          text="Transforming Ideas Into Digital Reality"
          speed={2}
          delay={0}
          color="#b5b5b5"
          shineColor="#ffffff"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false} 
          className="text-2xl md:text-3xl mt-4 mb-6 audiowide"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl mb-12 text-[#EAEAEA]/70 audiowide"
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
            className="bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0B132B] font-semibold text-lg px-8 transition-all duration-300 audiowide"
            style={{
              boxShadow: "0 0 20px rgba(0,229,255,0.5)",
            }}
          >
            Explore Our Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF]/10 font-semibold text-lg px-8 bg-transparent audiowide"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
