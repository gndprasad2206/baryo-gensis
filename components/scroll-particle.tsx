"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion"

export function ScrollParticle() {
  const { scrollYProgress } = useScroll()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [pathPoints, setPathPoints] = useState<Array<{ x: number; y: number; opacity: number; id: number }>>([])
  const [pointId, setPointId] = useState(0)
  const [sectionPositions, setSectionPositions] = useState<{ top: number; side: "left" | "right" }[]>([])

  const x = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 })
  const y = useSpring(0, { stiffness: 120, damping: 35, mass: 0.4 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    const calculateSections = () => {
      const sections = document.querySelectorAll("section, .section")
      const positions: { top: number; side: "left" | "right" }[] = []

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const top = rect.top + window.scrollY
        positions.push({
          top,
          side: index % 2 === 0 ? "left" : "right",
        })
      })

      setSectionPositions(positions)
    }

    calculateSections()
    window.addEventListener("resize", calculateSections)

    setTimeout(calculateSections, 1000)

    return () => window.removeEventListener("resize", calculateSections)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true)
      }

      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [hasScrolled])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (sectionPositions.length === 0) return

      const currentScrollY = window.scrollY
      const viewportCenter = currentScrollY + dimensions.height / 2

      let currentSection = sectionPositions[0]
      let nextSection = sectionPositions[1]
      let sectionIndex = 0

      for (let i = 0; i < sectionPositions.length - 1; i++) {
        if (currentScrollY >= sectionPositions[i].top && currentScrollY < sectionPositions[i + 1].top) {
          currentSection = sectionPositions[i]
          nextSection = sectionPositions[i + 1]
          sectionIndex = i
          break
        } else if (i === sectionPositions.length - 2) {
          currentSection = sectionPositions[i + 1]
          nextSection = sectionPositions[i + 1]
          sectionIndex = i + 1
        }
      }

      const sectionStart = currentSection.top
      const sectionEnd = nextSection ? nextSection.top : document.documentElement.scrollHeight
      const sectionHeight = sectionEnd - sectionStart
      const positionInSection = currentScrollY - sectionStart
      const sectionProgress = Math.min(Math.max(positionInSection / sectionHeight, 0), 1)

      const leftX = dimensions.width * 0.15
      const rightX = dimensions.width * 0.85
      const centerX = dimensions.width / 2

      let targetX = currentSection.side === "left" ? leftX : rightX

      if (nextSection && sectionProgress > 0.8) {
        const transitionProgress = (sectionProgress - 0.8) / 0.2
        const nextX = nextSection.side === "left" ? leftX : rightX
        const easedProgress =
          transitionProgress < 0.5
            ? 4 * transitionProgress * transitionProgress * transitionProgress
            : 1 - Math.pow(-2 * transitionProgress + 2, 3) / 2
        targetX = targetX + (nextX - targetX) * easedProgress
      }

      const targetY = viewportCenter

      x.set(targetX)
      y.set(targetY)
    })

    return () => unsubscribe()
  }, [scrollYProgress, dimensions, x, y, sectionPositions])

  useEffect(() => {
    if (!hasScrolled || !isScrolling) return

    const interval = setInterval(() => {
      const xVal = x.get()
      const yVal = y.get()

      setPathPoints((prev) => {
        const newPoint = {
          id: pointId,
          x: xVal,
          y: yVal,
          opacity: 1,
        }
        setPointId((id) => id + 1)
        return [...prev, newPoint].slice(-60)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [hasScrolled, isScrolling, x, y, pointId])

  useEffect(() => {
    if (pathPoints.length === 0) return

    const fadeInterval = setInterval(() => {
      setPathPoints((prev) => {
        return prev
          .map((point, index) => {
            const ageFactor = index / prev.length
            const newOpacity = point.opacity - (isScrolling ? 0.008 : 0.025)
            return { ...point, opacity: Math.max(0, newOpacity * (0.5 + ageFactor * 0.5)) }
          })
          .filter((point) => point.opacity > 0.01)
      })
    }, 30)

    return () => clearInterval(fadeInterval)
  }, [pathPoints.length, isScrolling])

  const getColor = (progress: number) => {
    const r = Math.round(57 + (255 - 57) * progress)
    const g = Math.round(255 + (159 - 255) * progress)
    const b = Math.round(20 + (28 - 20) * progress)
    return `rgb(${r}, ${g}, ${b})`
  }

  const currentProgress = scrollYProgress.get()
  const currentColor = getColor(currentProgress)

  return (
    <>
      {pathPoints.length > 1 && (
        <svg className="fixed inset-0 pointer-events-none z-40" style={{ width: "100vw", height: "100vh" }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={getColor(0)} stopOpacity="0.6" />
              <stop offset="100%" stopColor={getColor(1)} stopOpacity="0.6" />
            </linearGradient>
          </defs>

        </svg>
      )}

      {isScrolling &&
        pathPoints.slice(-20).map((point) => (
          <motion.div
            key={`electron-${point.id}`}
            className="fixed pointer-events-none z-40"
            initial={{ scale: 1, x: point.x, y: point.y - window.scrollY }}
            animate={{
              scale: 0,
              x: point.x + (Math.random() - 0.5) * 40,
              y: point.y - window.scrollY + (Math.random() - 0.5) * 40,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: 4,
              height: 4,
              opacity: point.opacity * 0.8,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: getColor(currentProgress),
                boxShadow: `0 0 8px ${getColor(currentProgress)}`,
                filter: "blur(0.5px)",
              }}
            />
          </motion.div>
        ))}

      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x,
          y: useSpring(useMotionValue(y.get() - (typeof window !== "undefined" ? window.scrollY : 0)), {
            stiffness: 120,
            damping: 35,
          }),
          width: 20,
          height: 20,
        }}
        animate={
          !isScrolling && hasScrolled
            ? {
                y: [-3, 3, -3],
                scale: [1, 1.1, 1],
              }
            : !hasScrolled
              ? {
                  y: [0, -20, 0],
                  x: [0, 10, -10, 0],
                  rotate: [0, 360],
                }
              : {}
        }
        transition={
          !isScrolling && hasScrolled
            ? {
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : !hasScrolled
              ? {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
              : {}
        }
      >
        <motion.div
          className="w-5 h-5 rounded-full relative"
          style={{
            backgroundColor: currentColor,
            boxShadow: `0 0 20px ${currentColor}, 0 0 40px ${currentColor}, 0 0 60px rgba(0,229,255,0.3)`,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: currentColor,
              filter: "blur(8px)",
              opacity: 0.6,
            }}
            animate={{ scale: [1.5, 2.2, 1.5], opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
