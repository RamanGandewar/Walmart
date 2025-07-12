"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Invoices",
    value: "68,247",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Matched",
    value: "65,890",
    percentage: "96.5%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Exceptions",
    value: "1,247",
    percentage: "1.8%",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Pending",
    value: "1,110",
    percentage: "1.6%",
    icon: Clock,
    color: "text-yellow-600",
  },
]

export function InvoiceStats() {
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
            {stat.percentage && (
              <Badge variant="secondary" className="mt-1">
                {stat.percentage}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
