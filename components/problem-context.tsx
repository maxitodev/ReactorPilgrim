"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, FileText, TrendingUp } from "lucide-react"

export function ProblemContext() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contexto" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              <FileText className="w-4 h-4" />
              Caso Práctico
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">El Contexto del Problema</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un estudio epidemiológico reveló datos preocupantes sobre casos de cáncer hemopoyético
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold">La Situación</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    En una franja costera que se extiende 20 millas al norte del reactor nuclear Pilgrim I en Plymouth,
                    Massachusetts, se desarrollaron algunos casos de cáncer. La causa del cáncer estaba vinculada al
                    reactor, según un ritmo 50% mayor que el de todo el estado.
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">Datos Clave del Estudio</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">52</div>
                    <p className="text-sm text-muted-foreground">Casos de cáncer hemopoyético observados</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-secondary">50%</div>
                    <p className="text-sm text-muted-foreground">Mayor que el promedio estatal</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">13</div>
                    <p className="text-sm text-muted-foreground">Meses que el reactor estuvo cerrado</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary mt-1">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Preguntas a Resolver</h4>
                    <ol className="space-y-3 text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="font-semibold text-primary shrink-0">1.</span>
                        <span className="leading-relaxed">
                          Si los 52 casos representan un porcentaje 50% más alto que el porcentaje a nivel estatal,
                          ¿cuál es una estimación razonable de <span className="font-mono">μ</span>, el número promedio
                          de esos casos a nivel de todo el estado?
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-semibold text-primary shrink-0">2.</span>
                        <span className="leading-relaxed">
                          Con base en la estimación respecto a <span className="font-mono">μ</span>, ¿cuál es la
                          desviación estándar estimada del número de casos de cáncer a nivel de todo el estado?
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-semibold text-primary shrink-0">3.</span>
                        <span className="leading-relaxed">
                          ¿Cuál es el puntaje z para los <span className="font-mono">x = 52</span> casos observados de
                          cáncer? ¿Cómo interpreta este puntaje z en vista de la preocupación por el elevado porcentaje
                          de cáncer hemopoyético en esta zona?
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
