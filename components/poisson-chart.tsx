"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface PoissonDistributionChartProps {
  mu: number
  observed: number
}

export function PoissonDistributionChart({ mu, observed }: PoissonDistributionChartProps) {
  const data = useMemo(() => {
    const factorial = (n: number): number => {
      if (n <= 1) return 1
      return n * factorial(n - 1)
    }

    const poissonProbability = (k: number, lambda: number): number => {
      return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k)
    }

    const chartData = []
    const start = Math.max(0, Math.floor(mu - 3 * Math.sqrt(mu)))
    const end = Math.ceil(mu + 3 * Math.sqrt(mu))

    for (let k = start; k <= end; k++) {
      chartData.push({
        casos: k,
        probabilidad: poissonProbability(k, mu) * 100,
        isObserved: k === observed,
      })
    }

    return chartData
  }, [mu, observed])

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Distribución de Poisson</CardTitle>
        <p className="text-sm text-muted-foreground">
          Probabilidad de observar cada número de casos con μ = {mu.toFixed(2)}
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="casos"
              label={{ value: "Número de casos", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis label={{ value: "Probabilidad (%)", angle: -90, position: "insideLeft" }} className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => [`${value.toFixed(3)}%`, "Probabilidad"]}
              labelFormatter={(label) => `Casos: ${label}`}
            />
            <ReferenceLine
              x={observed}
              stroke="hsl(var(--destructive))"
              strokeDasharray="3 3"
              label={{ value: "Observado", position: "top", fill: "hsl(var(--destructive))" }}
            />
            <Bar dataKey="probabilidad" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
