"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

const vendorData = [
  { vendor: "Procter & Gamble", value: 28, fill: "hsl(var(--chart-1))" },
  { vendor: "Unilever", value: 22, fill: "hsl(var(--chart-2))" },
  { vendor: "Coca-Cola", value: 18, fill: "hsl(var(--chart-3))" },
  { vendor: "PepsiCo", value: 15, fill: "hsl(var(--chart-4))" },
  { vendor: "Others", value: 17, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  value: {
    label: "Volume %",
  },
} satisfies ChartConfig

export function VendorPerformance() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <CardTitle>Top Vendors by Volume</CardTitle>
        <CardDescription>Invoice volume distribution by vendor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <ChartContainer config={chartConfig} className="h-[200px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => [`${value}%`, "Volume"]}
                />
                <Pie data={vendorData} dataKey="value" nameKey="vendor" innerRadius={60} strokeWidth={5}>
                  {vendorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="space-y-2">
            {vendorData.map((vendor, index) => (
              <div key={vendor.vendor} className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.fill }} />
                <span className="text-muted-foreground">{vendor.vendor}</span>
                <span className="font-medium">{vendor.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
