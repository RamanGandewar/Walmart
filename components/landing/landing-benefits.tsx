"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, TrendingUp, Clock, CheckCircle, BarChart3 } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "AI-Powered Processing",
    description:
      "Advanced OCR and machine learning algorithms automatically extract and validate invoice data with 95% accuracy.",
    badge: "60% Cost Reduction",
    color: "text-blue-600",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance with SOX, PCI DSS, and GDPR standards ensure your data is protected.",
    badge: "SOX Compliant",
    color: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards and reporting provide insights into vendor performance and cost savings.",
    badge: "$2.1B Saved",
    color: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Process invoices in under 3 minutes with automated matching and exception handling.",
    badge: "2.3min Average",
    color: "text-orange-600",
  },
  {
    icon: CheckCircle,
    title: "Automated Matching",
    description: "Intelligent PO matching and three-way reconciliation eliminates manual data entry and errors.",
    badge: "99.7% Accuracy",
    color: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Vendor Management",
    description: "Centralized vendor communication hub with sentiment analysis and performance tracking.",
    badge: "5000+ Vendors",
    color: "text-indigo-600",
  },
]

export function LandingBenefits() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="animate-fade-in">
            Key Benefits
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold animate-slide-up">Why Choose Walmart Invoice Hub?</h2>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            Enterprise-grade features designed for scale, security, and efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="animate-slide-up hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-muted ${benefit.color}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{benefit.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
