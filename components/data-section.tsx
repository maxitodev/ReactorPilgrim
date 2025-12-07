"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AlertTriangle, TrendingUp, RadioTower, Skull } from "lucide-react"
import CountUp from "./CountUp"

export function DataSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative bg-black py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: 'url(/losnumeros.jpeg)',
          filter: 'grayscale(20%) brightness(1.3)'
        }}
      />

      {/* Dark gradient overlays - lighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Floating warning particles */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-amber-500/30 rounded-full blur-sm"
        animate={{
          x: [40, -40, 40],
          y: [-20, 20, -20],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-mono tracking-widest text-amber-500/80 border border-amber-900/50 rounded-md">
                02 · DATOS ALARMANTES
              </span>

              <div className="flex justify-center mb-4">
                <motion.h1
                  className="text-[clamp(2.5rem,10vw,5rem)] font-black text-white font-mono select-none"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(245, 158, 11, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)',
                      '0 0 40px rgba(245, 158, 11, 0.8), 0 0 60px rgba(239, 68, 68, 0.6), 0 0 80px rgba(245, 158, 11, 0.4)',
                      '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(245, 158, 11, 0.6), 0 0 60px rgba(239, 68, 68, 0.4)'
                    ],
                    filter: [
                      'brightness(1) contrast(1)',
                      'brightness(1.2) contrast(1.1)',
                      'brightness(1) contrast(1)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  LOS NÚMEROS
                </motion.h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed font-light"
            >
              El estudio del Dr. Sidney Cobb reveló un número inesperadamente alto de casos de cáncer hemopoyético en la
              zona cercana al reactor
            </motion.p>
          </div>

          {/* Stats Cards with CountUp */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Casos Observados */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Glowing border */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, rgba(239, 68, 68, 0.4), rgba(234, 88, 12, 0.4))'
                }}
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(239, 68, 68, 0.4), rgba(234, 88, 12, 0.4))',
                    'linear-gradient(360deg, rgba(239, 68, 68, 0.4), rgba(234, 88, 12, 0.4))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative bg-gradient-to-br from-red-950/30 to-orange-950/30 border border-red-500/30 rounded-2xl p-10 space-y-6 backdrop-blur-sm overflow-hidden">
                {/* Scanlines */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                  }}
                />

                {/* Icon with pulse */}
                <motion.div
                  className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(239, 68, 68, 0.2)',
                      '0 0 40px rgba(239, 68, 68, 0.4)',
                      '0 0 20px rgba(239, 68, 68, 0.2)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </motion.div>

                <div>
                  <div className="text-7xl md:text-8xl font-black text-red-500 font-mono mb-4 tabular-nums">
                    {inView && <CountUp to={52} from={0} duration={2.5} delay={0.5} />}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono">CASOS OBSERVADOS</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Casos de cáncer hemopoyético registrados en la franja costera cerca del reactor Pilgrim I
                  </p>
                </div>

                {/* Warning stripe */}
                <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
              </div>
            </motion.div>

            {/* Card 2 - Aumento Porcentual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
              animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              {/* Glowing border */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.4), rgba(234, 179, 8, 0.4))'
                }}
                animate={{
                  background: [
                    'linear-gradient(0deg, rgba(245, 158, 11, 0.4), rgba(234, 179, 8, 0.4))',
                    'linear-gradient(360deg, rgba(245, 158, 11, 0.4), rgba(234, 179, 8, 0.4))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative bg-gradient-to-br from-amber-950/30 to-yellow-950/30 border border-amber-500/30 rounded-2xl p-10 space-y-6 backdrop-blur-sm overflow-hidden">
                {/* Scanlines */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                  }}
                />

                {/* Icon with pulse */}
                <motion.div
                  className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(245, 158, 11, 0.2)',
                      '0 0 40px rgba(245, 158, 11, 0.4)',
                      '0 0 20px rgba(245, 158, 11, 0.2)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <TrendingUp className="w-8 h-8 text-amber-500" />
                </motion.div>

                <div>
                  <div className="text-7xl md:text-8xl font-black text-amber-500 font-mono mb-4 tabular-nums flex items-baseline">
                    {inView && <CountUp to={50} from={0} duration={2.5} delay={0.7} />}
                    <span className="text-6xl ml-2">%</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono">AUMENTO PORCENTUAL</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Mayor que el ritmo promedio de casos a nivel de todo el estado de Massachusetts
                  </p>
                </div>

                {/* Warning stripe */}
                <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* Context Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative group"
          >
            {/* Animated border */}
            <motion.div
              className="absolute -inset-0.5 rounded-2xl opacity-30 blur-sm"
              style={{
                background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.3), rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.3))'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative bg-gradient-to-br from-zinc-900/90 to-black border border-zinc-800 rounded-2xl p-8 md:p-12 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center shrink-0"
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <RadioTower className="w-8 h-8 text-zinc-400" />
                </motion.div>

                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-mono">CONTEXTO DEL REACTOR</h3>

                  <p className="text-zinc-300 leading-relaxed text-lg">
                    El reactor Pilgrim I había sido cerrado durante{" "}
                    <span className="font-bold text-amber-500">13 meses</span> debido a problemas de administración.
                    Boston Edison, propietario del reactor, reconoció escapes de radiación a mediados del decenio de 1970
                    que estuvieron un poco arriba de niveles permisibles.
                  </p>

                  <div className="relative pl-6 border-l-2 border-red-500/30">
                    <motion.div
                      className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-red-500 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 1, delay: 1 }}
                      style={{ transformOrigin: 'top' }}
                    />
                    <p className="text-zinc-300 leading-relaxed text-lg flex items-start gap-3">
                      <Skull className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <span>
                        El misterio más desconcertante fue el hecho de que las mujeres en esa misma zona aparentemente{" "}
                        <span className="font-bold text-red-500">no fueron afectadas</span>.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
