"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, AlertTriangle, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Messages",
    value: "1,247",
    change: "+8%",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  {
    title: "Positive Sentiment",
    value: "78%",
    change: "+5%",
    icon: Heart,
    color: "text-green-600",
  },
  {
    title: "Issues Resolved",
    value: "94%",
    change: "+2%",
    icon: AlertTriangle,
    color: "text-orange-600",
  },
  {
    title: "Avg Response Time",
    value: "2.4 hrs",
    change: "-12%",
    icon: Clock,
    color: "text-purple-600",
  },
]

export function CommunicationStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <Badge variant="secondary" className="mt-1">
              {stat.change} vs last month
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
