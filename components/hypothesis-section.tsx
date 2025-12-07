"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Lightbulb, ArrowRight, FlaskConical, Microscope, Atom, Zap } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function HypothesisSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="hipotesis" className="relative min-h-screen bg-black py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/cancer.webp"
          alt="Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(100,100,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          ],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, transparent 70%)",
          ],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating molecules */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${15 + i * 25}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          <Atom className="w-8 h-8 text-blue-500/30" />
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-16 md:space-y-20"
        >
          {/* Header */}
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-mono tracking-widest text-blue-400/80 border border-blue-500/30 rounded-md backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Lightbulb className="w-3 h-3" />
                04 · HIPÓTESIS
              </motion.span>

              <div className="flex flex-col items-center mb-4 gap-2">
                <motion.h2
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight text-center [text-shadow:0_0_30px_rgba(59,130,246,0.4),0_0_60px_rgba(59,130,246,0.2)]"
                >
                  EL ENFOQUE
                </motion.h2>
                <motion.h2
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 tracking-tight text-center"
                >
                  ESTADÍSTICO
                </motion.h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-xl text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed font-light"
            >
              Usaremos la distribución de Poisson para determinar si el número de casos observados es estadísticamente significativo o simplemente coincidencia
            </motion.p>
          </div>

          {/* Hypothesis Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* H0 - Null Hypothesis */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 80 }}
              className="group relative"
              onMouseEnter={() => setHoveredCard("h0")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3))",
                }}
              />

              <motion.div
                className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-black/80 backdrop-blur-xl h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 to-cyan-950/20 opacity-60" />

                {/* Scanlines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.02) 3px, rgba(59,130,246,0.02) 6px)'
                  }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Large watermark icon */}
                <div className="absolute top-4 right-4 opacity-5">
                  <FlaskConical className="w-32 h-32 text-blue-400" />
                </div>

                <div className="relative p-6 md:p-8 space-y-6">
                  {/* Symbol badge */}
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
                    animate={hoveredCard === "h0" ? {
                      boxShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                        "0 0 40px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.3)",
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-3xl font-black text-blue-400 font-mono">H₀</span>
                  </motion.div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-mono">Hipótesis Nula</h3>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                      El número de casos de cáncer en la zona cercana al reactor es consistente con el promedio estatal. No hay relación con la radiación del reactor.
                    </p>
                  </div>

                  {/* Tag */}
                  <div className="flex items-center gap-2 text-blue-400/60 text-sm font-mono">
                    <Zap className="w-4 h-4" />
                    <span>SIN CORRELACIÓN</span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={hoveredCard === "h0" ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>

            {/* H1 - Alternative Hypothesis */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80 }}
              className="group relative"
              onMouseEnter={() => setHoveredCard("h1")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(249, 115, 22, 0.3))",
                }}
              />

              <motion.div
                className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-black/80 backdrop-blur-xl h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 to-orange-950/20 opacity-60" />

                {/* Scanlines */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(239,68,68,0.02) 3px, rgba(239,68,68,0.02) 6px)'
                  }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Large watermark icon */}
                <div className="absolute top-4 right-4 opacity-5">
                  <Microscope className="w-32 h-32 text-red-400" />
                </div>

                <div className="relative p-6 md:p-8 space-y-6">
                  {/* Symbol badge */}
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
                    animate={hoveredCard === "h1" ? {
                      boxShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.3)",
                        "0 0 40px rgba(239, 68, 68, 0.5)",
                        "0 0 20px rgba(239, 68, 68, 0.3)",
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-3xl font-black text-red-400 font-mono">H₁</span>
                  </motion.div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-mono">Hipótesis Alternativa</h3>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                      El número de casos es estadísticamente mayor que el promedio estatal, sugiriendo una posible relación con la radiación del reactor.
                    </p>
                  </div>

                  {/* Tag */}
                  <div className="flex items-center gap-2 text-red-400/60 text-sm font-mono">
                    <Zap className="w-4 h-4" />
                    <span>POSIBLE CORRELACIÓN</span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={hoveredCard === "h1" ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Method Section - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative"
          >
            {/* Section divider with glow */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center">
                <motion.span
                  className="bg-black px-6 py-2 text-sm font-mono text-zinc-500 tracking-widest uppercase border border-zinc-800 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(147, 51, 234, 0)",
                      "0 0 20px rgba(147, 51, 234, 0.2)",
                      "0 0 0px rgba(147, 51, 234, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  METODOLOGÍA
                </motion.span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Poisson Card */}
              <motion.div
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(79, 70, 229, 0.3))" }}
                />

                <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-black/80 backdrop-blur-xl h-full">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-violet-950/20 opacity-60" />

                  {/* Scanlines */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(147,51,234,0.03) 3px, rgba(147,51,234,0.03) 6px)'
                    }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative p-6 md:p-8 space-y-5">
                    {/* Header with step number */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(147, 51, 234, 0.2)",
                            "0 0 25px rgba(147, 51, 234, 0.4)",
                            "0 0 10px rgba(147, 51, 234, 0.2)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-2xl font-black text-purple-400 font-mono">P</span>
                      </motion.div>
                      <span className="text-xs font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded">PASO 01</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h5 className="text-xl md:text-2xl font-bold text-white font-mono">Distribución de Poisson</h5>
                      <p className="text-zinc-400 leading-relaxed">
                        Usada para modelar eventos raros en un intervalo fijo, como el número de casos de enfermedad en una región.
                      </p>
                    </div>

                    {/* Formula */}
                    <div className="pt-4 border-t border-purple-500/20">
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <span className="text-purple-400">P(X = k)</span>
                        <span className="text-zinc-500"> = </span>
                        <span className="text-white">(λ^k × e^-λ) / k!</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                </div>
              </motion.div>

              {/* Z-Score Card */}
              <motion.div
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))" }}
                />

                <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-black/80 backdrop-blur-xl h-full">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 to-teal-950/20 opacity-60" />

                  {/* Scanlines */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16,185,129,0.03) 3px, rgba(16,185,129,0.03) 6px)'
                    }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative p-6 md:p-8 space-y-5">
                    {/* Header with step number */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            "0 0 10px rgba(16, 185, 129, 0.2)",
                            "0 0 25px rgba(16, 185, 129, 0.4)",
                            "0 0 10px rgba(16, 185, 129, 0.2)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <span className="text-2xl font-black text-emerald-400 font-mono">Z</span>
                      </motion.div>
                      <span className="text-xs font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded">PASO 02</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h5 className="text-xl md:text-2xl font-bold text-white font-mono">Puntaje Z (Z-Score)</h5>
                      <p className="text-zinc-400 leading-relaxed">
                        Mide cuántas desviaciones estándar está el valor observado del promedio esperado. Si |z| {">"} 2, es estadísticamente significativo.
                      </p>
                    </div>

                    {/* Formula */}
                    <div className="pt-4 border-t border-emerald-500/20">
                      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                        <span className="text-emerald-400">z</span>
                        <span className="text-zinc-500"> = </span>
                        <span className="text-white">(x - μ) / σ</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center pt-8"
          >
            <motion.a
              href="#analisis"
              className="group relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-lg opacity-70"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(245, 158, 11, 0.4))",
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Button */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 p-[2px]">
                <div className="relative bg-black rounded-[14px] px-8 py-4 flex items-center gap-4 group-hover:bg-zinc-950 transition-colors">
                  {/* Animated particles inside button */}
                  <motion.div
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500/50 blur-sm"
                    animate={{
                      x: [0, 150, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <span className="relative z-10 text-lg font-bold text-white font-mono tracking-wide">
                    CALCULAR RESULTADOS
                  </span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 text-amber-400" />
                  </motion.div>
                </div>
              </div>

              {/* Scanline effect on button */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)'
                }}
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
