'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import { LandingHero } from '@/components/landing/landing-hero'
import { LandingBenefits } from '@/components/landing/landing-benefits'
import { LandingDemo } from '@/components/landing/landing-demo'
import { LandingTestimonials } from '@/components/landing/landing-testimonials'
import { LandingCTA } from '@/components/landing/landing-cta'
import { LandingNavbar } from '@/components/landing/landing-navbar'
import { LandingFooter } from '@/components/landing/landing-footer'

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }

    checkUser()

    // Listen for auth state changes (when user logs in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          router.push('/dashboard')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

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