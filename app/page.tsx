import Header from "@/components/header"
import Hero from "@/components/hero"
import ValueProposition from "@/components/value-proposition"
import ClientLogos from "@/components/client-logos"
import IndustrySection from "@/components/industry-section"
import NewsSection from "@/components/news-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import ManagedServices from "@/components/managed-services"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F9FF] via-[#FAFBFF] to-white">
      <Header />
      <Hero />
      <CTASection />
      <IndustrySection />
      <ValueProposition />
      <ClientLogos />
      <ManagedServices />
      <NewsSection />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
