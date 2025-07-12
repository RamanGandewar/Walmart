"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, FileText, Clock, Users } from "lucide-react"

const kpis = [
  {
    title: "Total Processed",
    value: "2.1M",
    change: "+15.3%",
    trend: "up",
    icon: FileText,
    period: "This Year",
  },
  {
    title: "Cost Savings",
    value: "$2.1B",
    change: "+22.1%",
    trend: "up",
    icon: DollarSign,
    period: "YTD",
  },
  {
    title: "Processing Time",
    value: "2.3 min",
    change: "-18%",
    trend: "up",
    icon: Clock,
    period: "Average",
  },
  {
    title: "Active Vendors",
    value: "5,247",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    period: "Total",
  },
]

export function AnalyticsKPIs() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <Card key={kpi.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center justify-between mt-2">
              <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="flex items-center gap-1">
                {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.change}
              </Badge>
              <span className="text-xs text-muted-foreground">{kpi.period}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
