import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { mu, sigma, zScore, observedCases, percentageIncrease } = await request.json()

        const prompt = `Eres un experto estadístico analizando un caso real sobre el reactor nuclear Pilgrim I en Massachusetts. 

CONTEXTO DEL CASO:
- Se registraron ${observedCases} casos de cáncer hemopoyético en una zona cercana al reactor
- Esto representa un ${percentageIncrease}% más alto que el promedio estatal
- Media poblacional esperada (μ): ${mu.toFixed(2)} casos
- Desviación estándar (σ): ${sigma.toFixed(2)}
- Puntaje Z calculado: ${zScore.toFixed(2)}

ANÁLISIS REQUERIDO:
1. Interpreta estos resultados estadísticos de manera clara
2. Explica si el número de casos es estadísticamente significativo
3. Discute las implicaciones para la hipótesis de relación entre el reactor y los casos de cáncer
4. Proporciona una conclusión basada en evidencia estadística

Responde en español, de manera profesional pero accesible. Usa formato claro con secciones. Sé conciso pero completo (máximo 400 palabras).`

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: 'Eres un estadístico experto especializado en análisis epidemiológico y distribución de Poisson. Respondes en español con claridad y precisión.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 800,
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error?.message || 'Error al conectar con OpenAI')
        }

        const data = await response.json()
        const analysis = data.choices[0]?.message?.content || 'No se pudo generar el análisis'

        return NextResponse.json({ analysis })
    } catch (error) {
        console.error('Error en análisis IA:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
