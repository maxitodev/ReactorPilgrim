"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Sparkles, Github } from "lucide-react"

export function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.03)_0%,_transparent_70%)]" />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30"
          style={{
            left: `${15 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div ref={ref} className="container relative z-10 mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center space-y-8">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Proyecto de Probabilidad y Estadística
              </h3>
              <p className="text-sm md:text-base text-zinc-500 font-light max-w-md mx-auto">
                Análisis estadístico del reactor nuclear Pilgrim I utilizando distribución de Poisson
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-zinc-700" />
            </motion.div>

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <motion.a
                href="https://github.com/maxitodev/ReactorPilgrim"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-sm font-mono text-zinc-500 group-hover:text-white transition-colors">
                  Ver en GitHub
                </span>
              </motion.a>
            </motion.div>

            {/* Credits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6"
            >
              <p className="text-xs md:text-sm font-mono text-zinc-600 flex flex-wrap items-center justify-center gap-2">
                <span>© {currentYear}</span>
                <span className="text-zinc-800">·</span>
                <span>Desarrollado por</span>
                <motion.span
                  className="relative text-zinc-400 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10 group-hover:text-purple-400 transition-colors duration-300">MAXITODEV</span>
                  <motion.span
                    className="absolute inset-0 bg-purple-500/10 rounded-md -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ padding: '2px 6px', margin: '-2px -6px' }}
                  />
                </motion.span>
                <span className="text-zinc-700">&</span>
                <motion.span
                  className="relative text-zinc-400 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">BITHEOS</span>
                  <motion.span
                    className="absolute inset-0 bg-cyan-500/10 rounded-md -z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ padding: '2px 6px', margin: '-2px -6px' }}
                  />
                </motion.span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3), transparent)"
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </footer>
  )
}
