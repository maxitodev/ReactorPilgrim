import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Reactor Pilgrim I",
  description:
    "Aplicación de análisis estadístico usando distribución de Poisson para el caso del reactor nuclear Pilgrim I",
  generator: "Next.js",
  icons: {
    icon: "/image 2.jpg",
    apple: "/image 2.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased ${spaceGrotesk.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
