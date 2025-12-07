"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calculator, AlertTriangle, Activity, BarChart3, CheckCircle2, XCircle, HelpCircle, Beaker, Sparkles, Bot, Loader2 } from "lucide-react"
import { PoissonDistributionChart } from "@/components/poisson-chart"
import { ZScoreVisualization } from "@/components/z-score-visualization"
import Image from "next/image"

export function StatisticalAnalysis() {
  const [observedCases, setObservedCases] = useState(52)
  const [percentageIncrease, setPercentageIncrease] = useState(50)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAiSection, setShowAiSection] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Cálculos
  const mu = observedCases / (1 + percentageIncrease / 100)
  const sigma = Math.sqrt(mu)
  const zScore = (observedCases - mu) / sigma

  // Interpretación del z-score
  const getZScoreInterpretation = (z: number) => {
    if (z > 3) return {
      level: "EXTREMADAMENTE INUSUAL",
      description: "Evidencia muy fuerte contra la hipótesis nula. La probabilidad de que esto ocurra por azar es menor al 0.3%.",
      conclusion: "Se rechaza la hipótesis nula con alta confianza.",
      color: "text-red-500",
      borderColor: "border-red-500/30",
      bg: "bg-red-500/10",
      barColor: "bg-red-500",
      icon: XCircle,
      isSignificant: true
    }
    if (z > 2) return {
      level: "MUY INUSUAL",
      description: "Evidencia fuerte contra la hipótesis nula. La probabilidad de que esto ocurra por azar es menor al 5%.",
      conclusion: "Se rechaza la hipótesis nula (α = 0.05).",
      color: "text-orange-500",
      borderColor: "border-orange-500/30",
      bg: "bg-orange-500/10",
      barColor: "bg-orange-500",
      icon: AlertTriangle,
      isSignificant: true
    }
    if (z > 1.5) return {
      level: "MODERADAMENTE INUSUAL",
      description: "Evidencia moderada. Requiere más investigación para confirmar la significancia estadística.",
      conclusion: "Resultados no concluyentes, se necesitan más datos.",
      color: "text-yellow-500",
      borderColor: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      barColor: "bg-yellow-500",
      icon: HelpCircle,
      isSignificant: false
    }
    return {
      level: "DENTRO DEL RANGO NORMAL",
      description: "No hay evidencia significativa contra la hipótesis nula. Los resultados están dentro de la variación esperada.",
      conclusion: "No se rechaza la hipótesis nula.",
      color: "text-emerald-500",
      borderColor: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      barColor: "bg-emerald-500",
      icon: CheckCircle2,
      isSignificant: false
    }
  }

  const interpretation = getZScoreInterpretation(zScore)
  const InterpretationIcon = interpretation.icon

  // Función para analizar con IA
  const handleAnalyzeWithAI = async () => {
    setIsAnalyzing(true)
    setShowAiSection(true)
    setAiAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mu,
          sigma,
          zScore,
          observedCases,
          percentageIncrease,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al analizar')
      }

      setAiAnalysis(data.analysis)
    } catch (error) {
      setAiAnalysis(`Error: ${error instanceof Error ? error.message : 'No se pudo completar el análisis'}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section id="analisis" className="relative min-h-screen bg-black py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/losnumeros.jpeg"
          alt="Background"
          fill
          loading="eager"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(147,51,234,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)",
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
            "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
          ],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating beakers */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${20 + i * 30}%`,
            top: `${25 + (i % 2) * 45}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          <Beaker className="w-8 h-8 text-purple-500/30" />
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto space-y-16 md:space-y-20"
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
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-mono tracking-widest text-purple-400/80 border border-purple-500/30 rounded-md backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(147, 51, 234, 0)",
                    "0 0 20px rgba(147, 51, 234, 0.2)",
                    "0 0 0px rgba(147, 51, 234, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Calculator className="w-3 h-3" />
                05 · ANÁLISIS ESTADÍSTICO
              </motion.span>

              <div className="flex flex-col items-center mb-4 gap-2">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight text-center [text-shadow:0_0_30px_rgba(147,51,234,0.4),0_0_60px_rgba(147,51,234,0.2)]"
                >
                  CALCULADORA
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-500 tracking-tight text-center"
                >
                  INTERACTIVA
                </motion.h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-xl text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed font-light"
            >
              Ajusta los parámetros y observa cómo cambian los resultados estadísticos en tiempo real
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Panel - Controls */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Input Controls Card */}
              <div className="group relative">
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(59, 130, 246, 0.3))" }}
                />

                <div className="relative bg-black/80 border border-purple-500/20 rounded-2xl overflow-hidden backdrop-blur-xl">
                  <div className="border-b border-purple-500/20 px-6 py-4 bg-purple-950/20">
                    <h3 className="flex items-center gap-3 text-white font-mono text-sm tracking-wider">
                      <Activity className="w-4 h-4 text-purple-400" />
                      PARÁMETROS DE ENTRADA
                    </h3>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Observed Cases Slider */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-zinc-400 font-mono uppercase tracking-wider">
                          Casos Observados (x)
                        </label>
                        <span className="text-2xl font-bold text-white font-mono">
                          {observedCases}
                        </span>
                      </div>

                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={observedCases}
                        onChange={(e) => setObservedCases(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5
                          [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-blue-500
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-blue-400
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.5)]
                          [&::-moz-range-thumb]:w-5
                          [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-blue-500
                          [&::-moz-range-thumb]:border-2
                          [&::-moz-range-thumb]:border-blue-400
                          [&::-moz-range-thumb]:cursor-pointer"
                      />

                      <div className="flex justify-between text-xs text-zinc-600 font-mono">
                        <span>10</span>
                        <span>100</span>
                      </div>
                    </div>

                    {/* Percentage Increase Slider */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-zinc-400 font-mono uppercase tracking-wider">
                          Aumento Porcentual
                        </label>
                        <span className="text-2xl font-bold text-white font-mono">
                          {percentageIncrease}%
                        </span>
                      </div>

                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={percentageIncrease}
                        onChange={(e) => setPercentageIncrease(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-5
                          [&::-webkit-slider-thumb]:h-5
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-purple-500
                          [&::-webkit-slider-thumb]:border-2
                          [&::-webkit-slider-thumb]:border-purple-400
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(147,51,234,0.5)]
                          [&::-moz-range-thumb]:w-5
                          [&::-moz-range-thumb]:h-5
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-purple-500
                          [&::-moz-range-thumb]:border-2
                          [&::-moz-range-thumb]:border-purple-400
                          [&::-moz-range-thumb]:cursor-pointer"
                      />

                      <div className="flex justify-between text-xs text-zinc-600 font-mono">
                        <span>10%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnosis Card - Enhanced */}
              <div className="group relative">
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${interpretation.isSignificant ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}, transparent)` }}
                />

                <div className={`relative overflow-hidden rounded-2xl border ${interpretation.borderColor} ${interpretation.bg} backdrop-blur-xl`}>
                  {/* Scanlines */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)'
                    }}
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="border-b border-white/10 px-6 py-3 bg-black/30">
                    <h3 className="text-sm font-bold text-white font-mono tracking-wider">DIAGNÓSTICO ESTADÍSTICO</h3>
                  </div>

                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-black/30 ${interpretation.color}`}
                        animate={{
                          boxShadow: interpretation.isSignificant ? [
                            "0 0 0px rgba(239, 68, 68, 0)",
                            "0 0 20px rgba(239, 68, 68, 0.3)",
                            "0 0 0px rgba(239, 68, 68, 0)",
                          ] : []
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <InterpretationIcon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <p className={`text-xl font-bold ${interpretation.color} font-mono`}>
                          {interpretation.level}
                        </p>
                        <p className="text-xs text-zinc-500 font-mono">
                          Z-Score: {zScore.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {interpretation.description}
                      </p>
                      <div className={`p-3 rounded-lg bg-black/30 border-l-2 ${interpretation.borderColor}`}>
                        <p className="text-sm font-semibold text-white">
                          {interpretation.conclusion}
                        </p>
                      </div>
                    </div>

                    {/* Significance indicator */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className={`w-2 h-2 rounded-full ${interpretation.isSignificant ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="text-xs text-zinc-400 font-mono">
                        {interpretation.isSignificant ? 'ESTADÍSTICAMENTE SIGNIFICATIVO' : 'NO SIGNIFICATIVO'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Results */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Answers to Questions Section */}
              <div className="group relative">
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(239, 68, 68, 0.3))" }}
                />

                <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-black/80 backdrop-blur-xl">
                  <div className="border-b border-amber-500/20 px-6 py-4 bg-amber-950/20">
                    <h3 className="flex items-center gap-2 text-white font-mono text-sm tracking-wider">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      RESPUESTAS A LAS PREGUNTAS DEL PROBLEMA
                    </h3>
                  </div>

                  <div className="divide-y divide-zinc-800/50">
                    {/* Answer 1: μ */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-xl font-bold text-red-400 font-mono">μ</span>
                        </motion.div>
                        <div className="flex-1 space-y-2">
                          <h4 className="text-white font-semibold font-mono">
                            Pregunta 1: Media Poblacional (μ)
                          </h4>
                          <p className="text-sm text-zinc-400">
                            Si los {observedCases} casos representan un {percentageIncrease}% más alto que el promedio estatal, ¿cuál es μ?
                          </p>
                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="bg-black/50 rounded-lg px-4 py-3 border border-red-500/30">
                              <span className="text-xs text-zinc-500 block font-mono">RESPUESTA:</span>
                              <span className="text-3xl font-bold text-red-400 font-mono">{mu.toFixed(2)}</span>
                              <span className="text-sm text-zinc-500 ml-1">casos</span>
                            </div>
                            <div className="text-xs text-zinc-500 font-mono bg-black/30 px-3 py-2 rounded">
                              μ = {observedCases} / (1 + {percentageIncrease}/100) = {mu.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Answer 2: σ */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-xl font-bold text-orange-400 font-mono">σ</span>
                        </motion.div>
                        <div className="flex-1 space-y-2">
                          <h4 className="text-white font-semibold font-mono">
                            Pregunta 2: Desviación Estándar (σ)
                          </h4>
                          <p className="text-sm text-zinc-400">
                            Con base en μ = {mu.toFixed(2)}, ¿cuál es la desviación estándar?
                          </p>
                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="bg-black/50 rounded-lg px-4 py-3 border border-orange-500/30">
                              <span className="text-xs text-zinc-500 block font-mono">RESPUESTA:</span>
                              <span className="text-3xl font-bold text-orange-400 font-mono">{sigma.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-zinc-500 font-mono bg-black/30 px-3 py-2 rounded">
                              σ = √μ = √{mu.toFixed(2)} = {sigma.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Answer 3: Z-Score */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-xl font-bold text-amber-400 font-mono">Z</span>
                        </motion.div>
                        <div className="flex-1 space-y-2">
                          <h4 className="text-white font-semibold font-mono">
                            Pregunta 3: Puntaje Z e Interpretación
                          </h4>
                          <p className="text-sm text-zinc-400">
                            ¿Cuál es el puntaje z para x = {observedCases} casos? ¿Cómo se interpreta?
                          </p>
                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className={`bg-black/50 rounded-lg px-4 py-3 border ${interpretation.borderColor}`}>
                              <span className="text-xs text-zinc-500 block font-mono">RESPUESTA:</span>
                              <span className={`text-3xl font-bold font-mono ${interpretation.color}`}>{zScore.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-zinc-500 font-mono bg-black/30 px-3 py-2 rounded">
                              z = ({observedCases} - {mu.toFixed(2)}) / {sigma.toFixed(2)} = {zScore.toFixed(2)}
                            </div>
                          </div>
                          <div className={`mt-3 p-4 rounded-lg ${interpretation.bg} border ${interpretation.borderColor}`}>
                            <p className="text-sm text-zinc-300 leading-relaxed">
                              <strong className={interpretation.color}>Interpretación:</strong> Un z-score de {zScore.toFixed(2)} indica que
                              los casos observados están a <span className="text-white font-semibold">{Math.abs(zScore).toFixed(2)} desviaciones estándar</span> por {zScore > 0 ? 'encima' : 'debajo'} del
                              promedio esperado. {interpretation.isSignificant
                                ? 'Esto es estadísticamente significativo, sugiriendo que el elevado número de casos probablemente NO es coincidencia y respalda la preocupación sobre la relación con el reactor.'
                                : 'Esto no es estadísticamente significativo, los resultados están dentro de la variación normal esperada.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts - Stacked vertically */}
              <div className="space-y-8">
                {/* Poisson Distribution Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-black/80 backdrop-blur-xl">
                    <div className="border-b border-blue-500/20 px-6 py-4 bg-blue-950/20">
                      <h4 className="flex items-center gap-2 text-base font-mono text-white">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        DISTRIBUCIÓN DE POISSON
                      </h4>
                    </div>

                    {/* Explanation */}
                    <div className="px-6 py-4 border-b border-zinc-800/50 bg-black/30">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        <span className="text-blue-400 font-semibold">¿Qué muestra esta gráfica?</span> La distribución de Poisson modela la probabilidad de
                        observar un número específico de eventos raros en un intervalo fijo. La barra resaltada indica los <span className="text-white font-semibold">{observedCases} casos observados</span>,
                        mientras que el centro de la distribución representa el promedio esperado (<span className="text-white font-mono">μ = {mu.toFixed(2)}</span>).
                        Entre más alejada esté la barra de los casos del centro, más inusual es el resultado.
                      </p>
                    </div>

                    <div className="p-6">
                      <PoissonDistributionChart mu={mu} observed={observedCases} />
                    </div>
                  </div>
                </motion.div>

                {/* Z-Score Visualization Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-black/80 backdrop-blur-xl">
                    <div className="border-b border-emerald-500/20 px-6 py-4 bg-emerald-950/20">
                      <h4 className="flex items-center gap-2 text-base font-mono text-white">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        VISUALIZACIÓN DEL PUNTAJE Z
                      </h4>
                    </div>

                    {/* Explanation */}
                    <div className="px-6 py-4 border-b border-zinc-800/50 bg-black/30">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        <span className="text-emerald-400 font-semibold">¿Qué muestra esta gráfica?</span> La curva normal estándar representa la distribución
                        de probabilidades. El marcador indica dónde se encuentra nuestro puntaje z (<span className="text-white font-mono">z = {zScore.toFixed(2)}</span>).
                        El área sombreada más allá de este punto representa la probabilidad de obtener un resultado tan extremo o más por azar.
                        {zScore > 2 && <span className="text-amber-400"> Un valor mayor a 2 indica que menos del 5% de los resultados serían tan extremos por casualidad.</span>}
                      </p>
                    </div>

                    <div className="p-6">
                      <ZScoreVisualization zScore={zScore} mu={mu} sigma={sigma} observed={observedCases} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* AI Analysis Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center pt-8"
          >
            <motion.button
              onClick={handleAnalyzeWithAI}
              disabled={isAnalyzing}
              className="group relative cursor-pointer disabled:cursor-not-allowed"
              whileHover={{ scale: isAnalyzing ? 1 : 1.05, y: isAnalyzing ? 0 : -3 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.97 }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-lg opacity-70"
                style={{
                  background: "linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.4))",
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Button */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-[2px]">
                <div className="relative bg-black rounded-[14px] px-8 py-4 flex items-center gap-4 group-hover:bg-zinc-950 transition-colors">
                  {isAnalyzing ? (
                    <>
                      <span className="text-lg font-bold text-white font-mono tracking-wide">
                        ANALIZANDO...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-bold text-white font-mono tracking-wide">
                        ANALIZAR RESULTADOS CON IA
                      </span>
                      <Bot className="w-5 h-5 text-blue-400 group-hover:animate-bounce" />
                    </>
                  )}
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* AI Analysis Section */}
          {showAiSection && (
            <motion.div
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <div className="group relative">
                <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-black/90 backdrop-blur-xl">
                  {/* Header */}
                  <div className="border-b border-purple-500/20 px-6 py-4 bg-purple-950/30">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"
                        animate={isAnalyzing ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0, ease: "linear" }}
                      >
                        <Bot className="w-5 h-5 text-purple-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-bold font-mono tracking-wide">ANÁLISIS CON INTELIGENCIA ARTIFICIAL</h3>
                        <p className="text-xs text-zinc-500 font-mono">Powered by GPT-4</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <motion.div
                          className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6 text-purple-400" />
                        </motion.div>
                        <p className="text-zinc-400 font-mono text-sm">Analizando resultados estadísticos...</p>
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-purple-500"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="prose prose-invert max-w-none">
                        <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap font-light">
                          {aiAnalysis.split('\n').map((line, index) => {
                            // Detectar títulos y secciones
                            if (line.startsWith('##') || line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <h4 key={index} className="text-lg font-bold text-purple-400 mt-6 mb-3 font-mono">
                                  {line.replace(/[#*]/g, '').trim()}
                                </h4>
                              )
                            }
                            if (line.startsWith('-') || line.startsWith('•')) {
                              return (
                                <p key={index} className="flex items-start gap-2 my-2">
                                  <span className="text-purple-500 mt-1">•</span>
                                  <span>{line.replace(/^[-•]\s*/, '')}</span>
                                </p>
                              )
                            }
                            if (line.trim() === '') {
                              return <br key={index} />
                            }
                            return <p key={index} className="my-2">{line}</p>
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Footer */}
                  {aiAnalysis && !isAnalyzing && (
                    <div className="border-t border-purple-500/20 px-6 py-4 bg-black/30">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-zinc-600 font-mono">
                          Análisis generado para μ={mu.toFixed(2)}, σ={sigma.toFixed(2)}, z={zScore.toFixed(2)}
                        </p>
                        <motion.button
                          onClick={handleAnalyzeWithAI}
                          className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-2 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Sparkles className="w-3 h-3" />
                          Regenerar análisis
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
