"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

const chartData = [
  { time: "00:00", processed: 2400, pending: 400 },
  { time: "04:00", processed: 1800, pending: 300 },
  { time: "08:00", processed: 4200, pending: 800 },
  { time: "12:00", processed: 6800, pending: 1200 },
  { time: "16:00", processed: 5900, pending: 900 },
  { time: "20:00", processed: 3200, pending: 500 },
]

const chartConfig = {
  processed: {
    label: "Processed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function InvoiceProcessingChart() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Invoice Processing Timeline</CardTitle>
        <CardDescription>Real-time processing status throughout the day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="pending"
              type="natural"
              fill="var(--color-pending)"
              fillOpacity={0.4}
              stroke="var(--color-pending)"
              stackId="a"
            />
            <Area
              dataKey="processed"
              type="natural"
              fill="var(--color-processed)"
              fillOpacity={0.4}
              stroke="var(--color-processed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
