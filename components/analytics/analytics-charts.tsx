"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Area, AreaChart } from "recharts"

const monthlyData = [
  { month: "Jan", processed: 186000, savings: 186000000 },
  { month: "Feb", processed: 205000, savings: 205000000 },
  { month: "Mar", processed: 198000, savings: 198000000 },
  { month: "Apr", processed: 173000, savings: 173000000 },
  { month: "May", processed: 209000, savings: 209000000 },
  { month: "Jun", processed: 214000, savings: 214000000 },
]

const chartConfig = {
  processed: {
    label: "Processed",
    color: "hsl(var(--chart-1))",
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle>Monthly Processing Volume</CardTitle>
          <CardDescription>Invoice processing trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={monthlyData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="processed" type="monotone" stroke="var(--color-processed)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle>Cost Savings Trend</CardTitle>
          <CardDescription>Monthly savings achieved through automation</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={monthlyData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                formatter={(value) => [`$${(Number(value) / 1000000).toFixed(1)}M`, "Savings"]}
              />
              <Area
                dataKey="savings"
                type="natural"
                fill="var(--color-savings)"
                fillOpacity={0.4}
                stroke="var(--color-savings)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
