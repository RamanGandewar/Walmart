"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Clock, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Active Vendors",
    value: "5,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Performance Score",
    value: "94.2%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Avg Response Time",
    value: "4.2 hrs",
    change: "-15%",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Issues Pending",
    value: "23",
    change: "-8%",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

export function VendorStats() {
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
