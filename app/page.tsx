import { HeroSection } from "@/components/hero-section"
import { LocationSection } from "@/components/location-section"
import { DataSection } from "@/components/data-section"
import { QuestionSection } from "@/components/question-section"
import { HypothesisSection } from "@/components/hypothesis-section"
import { StatisticalAnalysis } from "@/components/statistical-analysis"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LocationSection />
      <DataSection />
      <QuestionSection />
      <HypothesisSection />
      <StatisticalAnalysis />
      <Footer />
    </main>
  )
}
