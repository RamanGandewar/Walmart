"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Zap } from "lucide-react"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="animate-fade-in">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Invoice Processing
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-up">
            Process{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              70,000+ invoices daily
            </span>{" "}
            with AI
          </h1>

          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Transform your invoice reconciliation with enterprise-grade automation. Reduce costs by 60%, achieve 95%
            accuracy, and process invoices in real-time.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "400ms" }}
          >
            <Link href="/auth/signup">
              <Button size="lg" className="walmart-gradient text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">60%</div>
              <div className="text-sm text-muted-foreground">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2.3min</div>
              <div className="text-sm text-muted-foreground">Processing Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
