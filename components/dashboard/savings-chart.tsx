"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jan", savings: 186000000 },
  { month: "Feb", savings: 205000000 },
  { month: "Mar", savings: 198000000 },
  { month: "Apr", savings: 173000000 },
  { month: "May", savings: 209000000 },
  { month: "Jun", savings: 214000000 },
]

const chartConfig = {
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SavingsChart() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
      <CardHeader>
        <CardTitle>Monthly Savings</CardTitle>
        <CardDescription>Cost savings achieved through automated reconciliation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              formatter={(value) => [`$${(Number(value) / 1000000).toFixed(1)}M`, "Savings"]}
            />
            <Bar dataKey="savings" fill="var(--color-savings)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
