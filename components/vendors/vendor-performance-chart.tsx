"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const chartData = [
  { vendor: "P&G", performance: 98, invoices: 1247 },
  { vendor: "Unilever", performance: 94, invoices: 892 },
  { vendor: "Coca-Cola", performance: 91, invoices: 654 },
  { vendor: "PepsiCo", performance: 87, invoices: 543 },
  { vendor: "Nestlé", performance: 89, invoices: 432 },
]

const chartConfig = {
  performance: {
    label: "Performance %",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function VendorPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Performance</CardTitle>
        <CardDescription>Performance scores by top vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="vendor" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="performance" fill="var(--color-performance)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
