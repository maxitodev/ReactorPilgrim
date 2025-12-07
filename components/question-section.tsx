"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import SplitText from "./SplitText"

export function QuestionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null)

  const questions = [
    {
      number: "1",
      text: "Si los 52 casos representan un porcentaje 50% más alto que el porcentaje a nivel estatal, ¿cuál es una estimación razonable de μ, el número promedio de esos casos a nivel de todo el estado?",
      key: "mu",
      symbol: "μ",
      image: "/casos.jpg",
      color: "from-red-600/40 to-red-900/40",
      borderColor: "border-red-500/50",
      glowColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      number: "2",
      text: "Con base en la estimación respecto a μ, ¿cuál es la desviación estándar estimada del número de casos de cáncer a nivel de todo el estado?",
      key: "sigma",
      symbol: "σ",
      image: "/cancer2.jpg",
      color: "from-orange-600/40 to-red-800/40",
      borderColor: "border-orange-500/50",
      glowColor: "rgba(249, 115, 22, 0.5)",
    },
    {
      number: "3",
      text: "¿Cuál es el puntaje z para los x = 52 casos observados de cáncer? ¿Cómo interpreta este puntaje z en vista de la preocupación por el elevado porcentaje de cáncer hemopoyético en esta zona?",
      key: "z-score",
      symbol: "Z",
      image: "/cancer3.jpg",
      color: "from-amber-600/40 to-orange-800/40",
      borderColor: "border-amber-500/50",
      glowColor: "rgba(245, 158, 11, 0.5)",
    },
  ]

  return (
    <section id="preguntas" className="relative bg-black py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Image with mysterious overlay */}
      <div className="absolute inset-0">
        <Image
          src="/cancer.webp"
          alt="Cancer cells background"
          fill
          className="object-cover brightness-110"
          priority
        />
        {/* Dark mysterious overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90" />
      </div>

      {/* Animated red glow pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.06) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.02) 2px, rgba(255,0,0,0.02) 4px)'
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.95)_100%)]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto space-y-10 md:space-y-14"
        >
          {/* Header Section - Responsive */}
          <div className="space-y-4 md:space-y-6 text-center px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Badge */}
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 mb-4 md:mb-6 text-[10px] sm:text-xs font-mono tracking-widest text-red-400/80 border border-red-900/50 rounded-md backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(239, 68, 68, 0)",
                    "0 0 15px rgba(239, 68, 68, 0.3)",
                    "0 0 0px rgba(239, 68, 68, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-3 h-3" />
                03 · ANÁLISIS CRÍTICO
              </motion.span>

              {/* Split Text Title - Responsive */}
              <div className="mb-3 md:mb-4">
                <SplitText
                  text="LAS INCÓGNITAS"
                  tag="h2"
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white font-mono [text-shadow:0_0_40px_rgba(239,68,68,0.6),0_0_80px_rgba(239,68,68,0.3),0_2px_10px_rgba(0,0,0,0.9)]"
                  delay={60}
                  duration={0.7}
                  ease="power4.out"
                  splitType="chars"
                  from={{
                    opacity: 0,
                    y: 80,
                    rotateX: -90,
                    scale: 0.6,
                    filter: "blur(8px)"
                  }}
                  to={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  threshold={0.2}
                  rootMargin="-30px"
                />
              </div>

              {/* Subtitle - Responsive */}
              <div className="mt-2 md:mt-3">
                <SplitText
                  text="Planteamiento del Problema"
                  tag="p"
                  className="text-sm sm:text-base md:text-xl lg:text-2xl text-red-400/70 font-light tracking-wide md:tracking-wider"
                  delay={30}
                  duration={0.5}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 20, scale: 0.9 }}
                  to={{ opacity: 1, y: 0, scale: 1 }}
                  threshold={0.2}
                  rootMargin="-30px"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Tres preguntas clave que debemos responder usando análisis estadístico y distribución de Poisson
            </motion.p>
          </div>

          {/* Questions Grid - Responsive Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {questions.map((question, index) => {
              const isHovered = hoveredQuestion === question.key

              return (
                <motion.div
                  key={question.key}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.15,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className="group relative"
                  onMouseEnter={() => setHoveredQuestion(question.key)}
                  onMouseLeave={() => setHoveredQuestion(null)}
                >
                  {/* Outer glow effect */}
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(ellipse at center, ${question.glowColor}, transparent 70%)`,
                    }}
                  />

                  {/* Card Container */}
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl border ${question.borderColor} bg-black/90 backdrop-blur-xl h-full`}
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Card Image */}
                    <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={question.image}
                          alt={`Question ${question.number}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>

                      {/* Image overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${question.color} opacity-60`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Scanline on image */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                        }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />

                      {/* Number Badge */}
                      <motion.div
                        className={`absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/60 backdrop-blur-md border ${question.borderColor} flex items-center justify-center`}
                        animate={isHovered ? { rotate: [0, -5, 5, 0], scale: 1.1 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {question.symbol}
                        </span>
                      </motion.div>

                      {/* Question number */}
                      <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                        <span className="text-xs font-mono text-white/60">
                          PREGUNTA 0{question.number}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="relative p-4 sm:p-5 md:p-6">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${question.color} opacity-30`} />

                      {/* Animated border glow when hovered */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              boxShadow: [
                                `inset 0 0 15px ${question.glowColor.replace('0.5', '0.2')}`,
                                `inset 0 0 30px ${question.glowColor.replace('0.5', '0.3')}`,
                                `inset 0 0 15px ${question.glowColor.replace('0.5', '0.2')}`,
                              ]
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Question Text */}
                      <motion.p
                        className="relative text-sm sm:text-base md:text-lg leading-relaxed text-zinc-300 font-light"
                        animate={isHovered ? {
                          color: "#ffffff",
                        } : {
                          color: "#d4d4d8",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {question.text}
                      </motion.p>

                      {/* Animated underline */}
                      <motion.div
                        className={`mt-4 md:mt-5 h-0.5 rounded-full bg-gradient-to-r ${question.color.replace('/40', '')}`}
                        initial={{ width: "0%", opacity: 0 }}
                        animate={isHovered ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Card scanline effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-5"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px)'
                      }}
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
