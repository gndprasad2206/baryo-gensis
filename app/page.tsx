"use client"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Timeline } from "@/components/timeline"
import { Footer } from "@/components/footer"
import { ScrollParticle } from "@/components/scroll-particle"
import PillNav from "@/components/reactbits/PillNav"
import Particles from "@/components/reactbits/Particles"

export default function BaryogenesisPortfolio() {
  return (
    <main className="relative min-h-screen bg-[#0B132B] text-[#EAEAEA] overflow-x-hidden">
      {/* Starfield background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                           radial-gradient(2px 2px at 60% 70%, white, transparent),
                           radial-gradient(1px 1px at 50% 50%, white, transparent),
                           radial-gradient(1px 1px at 80% 10%, white, transparent),
                           radial-gradient(2px 2px at 90% 60%, white, transparent),
                           radial-gradient(1px 1px at 33% 85%, white, transparent),
                           radial-gradient(1px 1px at 75% 25%, white, transparent)`,
            backgroundSize: "200px 200px, 300px 300px, 250px 250px, 400px 400px, 350px 350px, 280px 280px, 180px 180px",
            backgroundPosition: "0 0, 40px 60px, 130px 270px, 70px 100px, 200px 150px, 300px 50px, 100px 200px",
          }}
        />
      </div>

      {/* Scroll-driven energy particle */}
      {/* <ScrollParticle /> */}

      {/* Content sections */}
      <section className="relative h-screen overflow-hidden">
        {/* Galaxy layer */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="flex justify-center">
          <PillNav
            logo={"/image/logo_re_bg.png"}
            logoAlt="Company Logo"
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Contact', href: '/contact' }
            ]}
            activeHref="/"
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="#0B132B"
            pillColor="#ffffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
          />
        </div>
        <Hero />
      </section>
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Footer />
    </main>
  )
}
