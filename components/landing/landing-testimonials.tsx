"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CFO, Walmart Stores Inc.",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The AI-powered invoice processing has transformed our operations. We've reduced processing time by 75% and achieved unprecedented accuracy rates.",
    rating: 5,
    company: "Walmart",
  },
  {
    name: "Michael Chen",
    role: "VP of Finance, Sam's Club",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Real-time analytics and automated matching have saved us millions. The ROI was evident within the first quarter of implementation.",
    rating: 5,
    company: "Sam's Club",
  },
  {
    name: "Emily Rodriguez",
    role: "Director of Procurement",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The vendor management hub with sentiment analysis helps us maintain better relationships while ensuring compliance and efficiency.",
    rating: 5,
    company: "Walmart International",
  },
]

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="animate-fade-in">
            Customer Success
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold animate-slide-up">Trusted by Industry Leaders</h2>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            See what our customers say about their transformation journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="animate-slide-up hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {testimonial.company}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
