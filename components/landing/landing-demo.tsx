"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Monitor, Smartphone, Tablet } from "lucide-react"
import Link from "next/link"

export function LandingDemo() {
  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="animate-fade-in">
            Product Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold animate-slide-up">See It In Action</h2>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Watch how our AI-powered platform transforms invoice processing
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="animate-slide-up overflow-hidden" style={{ animationDelay: "400ms" }}>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Link href="/auth/login">
                    <Button size="lg" className="walmart-gradient rounded-full h-20 w-20">
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="text-center space-y-4 z-10">
                  <h3 className="text-2xl font-bold text-primary">Interactive Dashboard Demo</h3>
                  <p className="text-muted-foreground">See real-time invoice processing in action</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center p-6 animate-slide-up" style={{ animationDelay: "600ms" }}>
              <Monitor className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">Desktop Dashboard</h4>
              <p className="text-sm text-muted-foreground">Full-featured admin interface</p>
            </Card>
            <Card className="text-center p-6 animate-slide-up" style={{ animationDelay: "700ms" }}>
              <Tablet className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">Tablet Optimized</h4>
              <p className="text-sm text-muted-foreground">Perfect for on-the-go management</p>
            </Card>
            <Card className="text-center p-6 animate-slide-up" style={{ animationDelay: "800ms" }}>
              <Smartphone className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">Mobile Ready</h4>
              <p className="text-sm text-muted-foreground">Access anywhere, anytime</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="animate-slide-up bg-transparent"
                style={{ animationDelay: "900ms" }}
              >
                Try Live Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
