import { LandingHero } from "@/components/landing/landing-hero"
import { LandingBenefits } from "@/components/landing/landing-benefits"
import { LandingDemo } from "@/components/landing/landing-demo"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingCTA } from "@/components/landing/landing-cta"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <LandingHero />
      <LandingBenefits />
      <LandingDemo />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </div>
  )
}
