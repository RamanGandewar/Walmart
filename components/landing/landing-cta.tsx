"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const features = ["30-day free trial", "No setup fees", "24/7 support", "Enterprise security"]

export function LandingCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Card className="walmart-gradient text-white animate-slide-up overflow-hidden">
          <CardContent className="p-12 text-center">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              Ready to Transform?
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Start Processing Invoices Smarter Today</h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of businesses already saving millions with AI-powered invoice reconciliation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center space-x-2 text-white/90">
                  <CheckCircle className="h-4 w-4 text-white" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
