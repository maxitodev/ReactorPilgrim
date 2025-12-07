# 🔬 Reactor Pilgrim I - Análisis Estadístico

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

**Proyecto de Probabilidad y Estadística**

[Ver Demo](https://reactor-pilgrim.vercel.app) · [Reportar Bug](https://github.com/maxitodev/ReactorPilgrim/issues)

</div>

---

## 📋 Descripción

Aplicación web interactiva que analiza estadísticamente los casos de cáncer hemopoyético registrados en las cercanías del reactor nuclear **Pilgrim I** en Plymouth, Massachusetts (1987).

El proyecto utiliza la **distribución de Poisson** y el **puntaje Z** para determinar si el número elevado de casos de cáncer es estadísticamente significativo o simplemente coincidencia.

## ✨ Características

- 🎨 **Diseño oscuro y misterioso** con animaciones fluidas
- 📊 **Calculadora interactiva** con sliders en tiempo real
- 📈 **Visualización de gráficas** (Poisson y Z-Score)
- 🤖 **Análisis con IA** (GPT-4) de los resultados estadísticos
- 📱 **Diseño responsive** para todos los dispositivos
- ⚡ **Animaciones con Framer Motion**

## 🛠️ Tecnologías

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TailwindCSS, Framer Motion
- **Gráficas:** Recharts
- **IA:** OpenAI GPT-4o-mini
- **Iconos:** Lucide React

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/maxitodev/ReactorPilgrim.git

# Entrar al directorio
cd ReactorPilgrim

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Agregar tu OPENAI_API_KEY en .env.local

# Ejecutar en desarrollo
pnpm dev
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/analyze/      # API Route para IA
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── hero-section.tsx
│   ├── location-section.tsx
│   ├── data-section.tsx
│   ├── question-section.tsx
│   ├── hypothesis-section.tsx
│   ├── statistical-analysis.tsx
│   ├── poisson-chart.tsx
│   ├── z-score-visualization.tsx
│   └── footer.tsx
└── public/
    └── [imágenes]
```

## 📐 Fórmulas Utilizadas

### Distribución de Poisson
```
P(X = k) = (λ^k × e^-λ) / k!
```

### Puntaje Z
```
z = (x - μ) / σ
```

Donde:
- **μ** = Media poblacional esperada
- **σ** = Desviación estándar (√μ para Poisson)
- **x** = Casos observados
- **z** = Puntaje Z (si |z| > 2, es estadísticamente significativo)

## 👥 Autores

- **MaxitoDev** - [GitHub](https://github.com/maxitodev)
- **Bitheos**

## 📄 Licencia

Este proyecto es parte de un trabajo académico de Probabilidad y Estadística.

---

<div align="center">
  <sub>Desarrollado con ❤️ para el análisis del caso Pilgrim I</sub>
</div>
