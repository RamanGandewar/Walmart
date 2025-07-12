"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Upload, Search, CheckCircle, AlertTriangle } from "lucide-react"

const pipelineSteps = [
  {
    id: 1,
    title: "Invoice Upload",
    description: "OCR & Data Extraction",
    icon: Upload,
    status: "completed",
    count: 68247,
    progress: 100,
  },
  {
    id: 2,
    title: "Validation",
    description: "Data Quality Check",
    icon: Search,
    status: "processing",
    count: 1247,
    progress: 85,
  },
  {
    id: 3,
    title: "Matching",
    description: "PO & Receipt Matching",
    icon: CheckCircle,
    status: "pending",
    count: 423,
    progress: 45,
  },
  {
    id: 4,
    title: "Exception Handling",
    description: "Manual Review Required",
    icon: AlertTriangle,
    status: "attention",
    count: 89,
    progress: 20,
  },
]

export function ProcessingPipeline() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
      <CardHeader>
        <CardTitle>Processing Pipeline</CardTitle>
        <CardDescription>Real-time view of invoice processing workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {pipelineSteps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="flex flex-col items-center space-y-3 p-4 rounded-lg border bg-card">
                <div
                  className={`p-3 rounded-full ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : step.status === "processing"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                        : step.status === "attention"
                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>

                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "processing"
                        ? "secondary"
                        : step.status === "attention"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {step.count.toLocaleString()}
                </Badge>

                <div className="w-full space-y-1">
                  <Progress value={step.progress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">{step.progress}%</p>
                </div>
              </div>

              {index < pipelineSteps.length - 1 && (
                <ArrowRight className="absolute top-1/2 -right-3 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
