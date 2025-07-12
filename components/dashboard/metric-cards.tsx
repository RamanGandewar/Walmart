"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, FileText, Clock, CheckCircle } from "lucide-react"

const metrics = [
  {
    title: "Daily Invoices Processed",
    value: "68,247",
    change: "+2.1%",
    trend: "up",
    icon: FileText,
    description: "vs yesterday",
  },
  {
    title: "Total Savings (YTD)",
    value: "$2.1B",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "vs last year",
  },
  {
    title: "Processing Time",
    value: "2.3 min",
    change: "-12%",
    trend: "up",
    icon: Clock,
    description: "average per invoice",
  },
  {
    title: "Accuracy Rate",
    value: "99.7%",
    change: "+0.2%",
    trend: "up",
    icon: CheckCircle,
    description: "automated matching",
  },
]

export function MetricCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={metric.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="flex items-center gap-1">
                {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {metric.change}
              </Badge>
              <span>{metric.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
