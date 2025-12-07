"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Calendar, Users, ChevronDown } from "lucide-react"
import { useState } from "react"
import FuzzyText from "./FuzzyText"
import Image from "next/image"

const locationCards = [
  {
    id: "location",
    icon: MapPin,
    title: "Ubicación",
    subtitle: "Plymouth, Massachusetts",
    image: "/ubicacion.webp",
    fullDescription: "Una franja costera de 20 millas al norte del reactor nuclear Pilgrim I en Plymouth, Massachusetts. Esta área se convirtió en el centro de un estudio epidemiológico crítico debido a la concentración inusual de casos de cáncer hemopoyético.",
    color: "from-red-600/20 to-orange-600/20",
    borderColor: "border-red-500/30",
    glowColor: "rgba(239, 68, 68, 0.3)",
    accentColor: "red-500"
  },
  {
    id: "period",
    icon: Calendar,
    title: "Período de Estudio",
    subtitle: "1987",
    image: "/image 4.jpg",
    fullDescription: "El estudio fue publicado el 21 de mayo de 1987 en la edición del New York Times, después de una investigación exhaustiva del Departamento de Salud Pública de Massachusetts que analizó los patrones de incidencia de cáncer en la región.",
    color: "from-amber-600/20 to-yellow-600/20",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.3)",
    accentColor: "amber-500"
  },
  {
    id: "study",
    icon: Users,
    title: "Investigación",
    subtitle: "Análisis Epidemiológico",
    image: "/image 3.jpg",
    fullDescription: "Departamento de Salud Pública de Massachusetts llevó a cabo un análisis epidemiológico detallado utilizando métodos estadísticos avanzados para determinar si la tasa de cáncer observada era estadísticamente significativa comparada con las tasas normales.",
    color: "from-cyan-600/20 to-blue-600/20",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6, 182, 212, 0.3)",
    accentColor: "cyan-500"
  }
]

export function LocationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Obtener la imagen actual basada en el hover, por defecto es la de ubicación
  const getCurrentBackgroundImage = () => {
    if (hoveredCard) {
      const card = locationCards.find(c => c.id === hoveredCard)
      return card?.image || "/ubicacion.webp"
    }
    return "/ubicacion.webp" // Por defecto, siempre la de ubicación
  }

  const currentImage = getCurrentBackgroundImage()

  return (
    <section id="ubicacion" className="relative min-h-screen bg-black py-32 overflow-hidden">
      {/* Dynamic Background Images with Crossfade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {locationCards.map((card) => {
            const isActive = currentImage === card.image
            return (
              <motion.div
                key={card.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1.05 : 1
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  priority={card.id === "location"}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Mysterious dark overlay with vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hoveredCard
            ? "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.92) 60%, rgba(0,0,0,0.98) 100%)"
            : "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 60%, rgba(0,0,0,0.99) 100%)"
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Eerie color tint overlay based on hovered card */}
      <AnimatePresence>
        {hoveredCard && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: locationCards.find(c => c.id === hoveredCard)?.glowColor?.replace('0.3', '0.4') || 'transparent'
            }}
          />
        )}
      </AnimatePresence>

      {/* Scanline overlay for mysterious effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)'
        }}
        animate={{
          y: [0, 8, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/20 rounded-full blur-sm"
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
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
          className="max-w-7xl mx-auto space-y-20"
        >
          {/* Header with FuzzyText */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-mono tracking-widest text-red-500/80 border border-red-900/50 rounded-md">
                01 · CONTEXTO
              </span>

              <div className="flex justify-center mb-6">
                <FuzzyText
                  fontSize="clamp(2.5rem, 10vw, 5rem)"
                  fontWeight={900}
                  color="#fff"
                  enableHover={true}
                  baseIntensity={0.15}
                  hoverIntensity={0.4}
                >
                  EL ESCENARIO
                </FuzzyText>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed font-light"
            >
              Una franja costera de 20 millas al norte del reactor nuclear Pilgrim I en Plymouth, Massachusetts, donde
              se desarrollaron casos preocupantes de cáncer hemopoyético
            </motion.p>
          </div>

          {/* Mysterious Photo Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {locationCards.map((card, index) => {
              const Icon = card.icon
              const isSelected = selectedCard === card.id
              const isHovered = hoveredCard === card.id

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 80
                  }}
                  className="group relative"
                >
                  <motion.div
                    className="relative cursor-pointer"
                    onClick={() => setSelectedCard(isSelected ? null : card.id)}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glowing border effect */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(45deg, ${card.glowColor}, transparent, ${card.glowColor})`
                      }}
                      animate={isHovered ? {
                        background: [
                          `linear-gradient(0deg, ${card.glowColor}, transparent, ${card.glowColor})`,
                          `linear-gradient(360deg, ${card.glowColor}, transparent, ${card.glowColor})`
                        ]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Card container */}
                    <div className={`relative overflow-hidden rounded-2xl border ${card.borderColor} bg-black`}>
                      {/* Image with mysterious overlay */}
                      <div className="relative h-80 overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          animate={isHovered ? {
                            scale: 1.1
                          } : { scale: 1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>

                        {/* Dark overlay with gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${card.color} group-hover:opacity-70 transition-opacity duration-500`} />

                        {/* Scanline effect */}
                        <motion.div
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                          }}
                          animate={isHovered ? {
                            y: [0, 20, 0]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Icon badge */}
                        <motion.div
                          className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border ${card.borderColor} flex items-center justify-center`}
                          animate={isHovered ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                          <motion.h3
                            className="text-2xl font-bold text-white font-mono mb-1"
                            animate={isHovered ? {
                              x: [0, 2, -2, 0]
                            } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            {card.title}
                          </motion.h3>
                          <p className="text-sm text-zinc-400 font-light">{card.subtitle}</p>
                        </div>

                        {/* Expand button indicator */}
                        <motion.div
                          className={`absolute bottom-4 right-4 px-4 py-2 rounded-full border ${card.borderColor} bg-black/90 backdrop-blur-md flex items-center gap-2`}
                          animate={isSelected ? {
                            y: 4
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-white text-xs font-mono">{isSelected ? 'OCULTAR' : 'VER MÁS'}</span>
                          <motion.div
                            animate={{ rotate: isSelected ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className={`p-6 border-t ${card.borderColor} bg-gradient-to-br ${card.color}`}>
                              <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-zinc-300 leading-relaxed text-sm"
                              >
                                {card.fullDescription}
                              </motion.p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
