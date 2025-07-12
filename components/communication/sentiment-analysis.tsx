"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

const sentimentData = [
  { sentiment: "Positive", value: 78, fill: "hsl(var(--chart-1))" },
  { sentiment: "Neutral", value: 15, fill: "hsl(var(--chart-2))" },
  { sentiment: "Negative", value: 7, fill: "hsl(var(--chart-3))" },
]

const chartConfig = {
  value: {
    label: "Percentage",
  },
} satisfies ChartConfig

export function SentimentAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>AI-powered analysis of vendor communications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <ChartContainer config={chartConfig} className="h-[200px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => [`${value}%`, "Messages"]}
                />
                <Pie data={sentimentData} dataKey="value" nameKey="sentiment" innerRadius={60} strokeWidth={5}>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="space-y-2">
            {sentimentData.map((item, index) => (
              <div key={item.sentiment} className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.sentiment}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
