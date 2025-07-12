"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, Search, CheckCircle, AlertTriangle } from "lucide-react"

const ocrSteps = [
  {
    id: 1,
    title: "Document Scanning",
    description: "Analyzing document structure",
    icon: Eye,
    progress: 100,
    status: "completed",
  },
  {
    id: 2,
    title: "Text Extraction",
    description: "Extracting text content",
    icon: FileText,
    progress: 85,
    status: "processing",
  },
  {
    id: 3,
    title: "Data Validation",
    description: "Validating extracted data",
    icon: Search,
    progress: 45,
    status: "processing",
  },
  {
    id: 4,
    title: "Field Mapping",
    description: "Mapping to invoice fields",
    icon: CheckCircle,
    progress: 0,
    status: "pending",
  },
]

const extractedData = [
  { field: "Invoice Number", value: "INV-2024-001234", confidence: 98 },
  { field: "Vendor", value: "Procter & Gamble", confidence: 95 },
  { field: "Amount", value: "$45,230.50", confidence: 99 },
  { field: "Date", value: "2024-01-15", confidence: 92 },
  { field: "PO Number", value: "PO-789456", confidence: 88 },
]

export function UploadProgress() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>OCR Processing</CardTitle>
          <CardDescription>Real-time optical character recognition progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ocrSteps.map((step) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    step.status === "completed"
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : step.status === "processing"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    <Badge
                      variant={
                        step.status === "completed" ? "default" : step.status === "processing" ? "secondary" : "outline"
                      }
                    >
                      {step.status}
                    </Badge>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Extracted Data</CardTitle>
          <CardDescription>Automatically extracted invoice information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {extractedData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{item.field}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={item.confidence >= 95 ? "default" : item.confidence >= 85 ? "secondary" : "destructive"}
                  >
                    {item.confidence}%
                  </Badge>
                  {item.confidence < 90 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
