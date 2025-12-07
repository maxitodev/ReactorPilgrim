"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Dither from './dither';
import SplitText from "./SplitText";
import TextType from './TextType';

export function HeroSection() {
  return (
    <Dither
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      waveColor={[0.5, 0.5, 0.5]}
      disableAnimation={false}
      enableMouseInteraction={true}
      mouseRadius={0.3}
      colorNum={4}
      waveAmplitude={0.3}
      waveFrequency={3}
      waveSpeed={0.05}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105"
          style={{ backgroundImage: 'url("/image 2.jpg")' }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-black/80 to-black/50" />

      {/* Radial Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0 z-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="max-w-5xl">

          {/* Badge with glitch effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <motion.span
              className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-red-500/80 border border-red-900/50 rounded-md shadow-lg shadow-red-500/10"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(239, 68, 68, 0.1)",
                  "0 0 20px rgba(239, 68, 68, 0.2)",
                  "0 0 5px rgba(239, 68, 68, 0.1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              PROYECTO 1 · PROBABILIDAD Y ESTADÍSTICA
            </motion.span>
          </motion.div>

          {/* Main Heading with mysterious effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="space-y-6 mb-10"
          >
            <div className="font-mono">
              {/* "Un misterio:" with typing effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <TextType
                  text="Un misterio:"
                  className="text-xl sm:text-2xl md:text-3xl font-light text-amber-500/70 tracking-wider"
                  typingSpeed={80}
                  pauseDuration={3000}
                  showCursor={false}
                  loop={false}
                  as="div"
                />
              </motion.div>

              {/* Main title with SplitText animation */}
              <SplitText
                text="Cánceres cerca de un reactor nuclear"
                className="block text-white font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight"
                delay={40}
                duration={0.9}
                ease="power4.out"
                splitType="chars"
                from={{ opacity: 0, y: 50, rotationX: -90, filter: "blur(10px)" }}
                to={{ opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)" }}
                threshold={0.3}
                rootMargin="0px"
                tag="h1"
                textAlign="left"
              />
            </div>
          </motion.div>

          {/* Description with fade and blur effect */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-light mb-16 tracking-wide">
              Análisis estadístico del caso del reactor nuclear Pilgrim I usando distribución de Poisson para determinar
              si los casos de cáncer son estadísticamente significativos.
            </p>
          </motion.div>

          {/* CTA Button with dramatic entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 2,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.a
              href="#ubicacion"
              className="group relative inline-flex items-center gap-3 px-6 py-3 text-sm font-mono font-medium text-white border border-zinc-700 rounded-lg overflow-hidden transition-all duration-300"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(239, 68, 68, 0.5)",
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explorar el caso</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-950/20 to-orange-950/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Mysterious floating particles */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500/30 rounded-full blur-sm"
            animate={{
              x: [-100, 100, -100],
              y: [-50, 50, -50],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-500/40 rounded-full blur-sm"
            animate={{
              x: [50, -50, 50],
              y: [30, -30, 30],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

        </div>
      </div>
    </Dither>
  )
}
