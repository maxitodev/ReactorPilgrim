"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts"

interface ZScoreVisualizationProps {
  zScore: number
  mu: number
  sigma: number
  observed: number
}

export function ZScoreVisualization({ zScore, mu, sigma, observed }: ZScoreVisualizationProps) {
  const data = []
  const start = mu - 4 * sigma
  const end = mu + 4 * sigma
  const step = (end - start) / 100

  for (let x = start; x <= end; x += step) {
    const z = (x - mu) / sigma
    const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z)
    data.push({
      x: x,
      y: y,
      isInRange: x <= observed,
    })
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Visualización del Z-Score</CardTitle>
        <p className="text-sm text-muted-foreground">Distribución normal estándar mostrando el valor observado</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="x"
              label={{ value: "Número de casos", position: "insideBottom", offset: -5 }}
              className="text-xs"
              tickFormatter={(value) => value.toFixed(0)}
            />
            <YAxis label={{ value: "Densidad", angle: -90, position: "insideLeft" }} className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number) => [value.toFixed(4), "Densidad"]}
              labelFormatter={(label) => `x = ${Number(label).toFixed(1)}`}
            />
            <ReferenceLine
              x={mu}
              stroke="hsl(var(--secondary))"
              strokeDasharray="3 3"
              label={{ value: "μ", position: "top", fill: "hsl(var(--secondary))" }}
            />
            <ReferenceLine
              x={observed}
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              label={{ value: `x=${observed}`, position: "top", fill: "hsl(var(--destructive))" }}
            />
            <Area type="monotone" dataKey="y" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorArea)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Media (μ = {mu.toFixed(2)})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Observado (x = {observed})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
