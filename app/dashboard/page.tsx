'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useInvoiceStats } from '@/hooks/useInvoices'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  FileText,
  AlertTriangle,
  DollarSign,
  LogOut,
  ArrowLeft,
} from 'lucide-react'

import { LandingHero } from '@/components/landing/landing-hero'
import { LandingBenefits } from '@/components/landing/landing-benefits'
import { LandingDemo } from '@/components/landing/landing-demo'
import { LandingTestimonials } from '@/components/landing/landing-testimonials'
import { LandingCTA } from '@/components/landing/landing-cta'
import { LandingNavbar } from '@/components/landing/landing-navbar'
import { LandingFooter } from '@/components/landing/landing-footer'
import RealTimeDashboard from '@/components/RealTimeDashboard'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const router = useRouter()
  const stats = useInvoiceStats()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          console.log('No active session, enabling demo mode')
          setIsDemoMode(true)
          setUser({ email: 'demo@walmart.com', id: 'demo' })
        } else if (user) {
          setUser(user)
          setIsDemoMode(false)
        } else {
          // No user and no error - redirect to landing
          router.push('/')
          return
        }
      } catch (error) {
        console.log('Auth check failed, enabling demo mode')
        setIsDemoMode(true)
        setUser({ email: 'demo@walmart.com', id: 'demo' })
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          setIsDemoMode(false)
        } else if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    if (isDemoMode) {
      router.push('/')
    } else {
      try {
        await supabase.auth.signOut()
        router.push('/')
      } catch (error) {
        console.error('Sign out error:', error)
        router.push('/')
      }
    }
  }

  const handleBackToLanding = () => {
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToLanding}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Landing</span>
            </Button>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="text-lg font-semibold text-blue-600">
              Walmart Invoice Dashboard {isDemoMode && '(Demo Mode)'}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.email || 'Demo User'}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              {isDemoMode ? 'Exit Demo' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </div>

      {/* Top Navigation + Hero */}
      <LandingNavbar />
      <LandingHero />
      <LandingBenefits />
      <LandingDemo />
      <LandingTestimonials />
      <LandingCTA />

      {/* Dashboard Overview */}
      <section className="p-6 space-y-6 bg-muted/30">
        <div>
          <h2 className="text-2xl font-bold mb-1">Invoice Reconciliation Dashboard</h2>
          <p className="text-muted-foreground mb-4">
            Real-time AI-powered processing insights
            {isDemoMode && ' • Demo Mode - Showing Sample Data'}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invoices Processed Today</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProcessed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Real-time from database</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.automationRate}%</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Discrepancies</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDiscrepancies}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.costSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Real-Time Widget */}
        <div className="pt-8">
          <RealTimeDashboard />
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}