"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText } from "lucide-react"

const reports = [
  {
    name: "Monthly Processing Report",
    description: "Comprehensive monthly invoice processing summary",
    lastGenerated: "2024-01-15",
    status: "ready",
    size: "2.4 MB",
  },
  {
    name: "Vendor Performance Analysis",
    description: "Detailed vendor performance metrics and trends",
    lastGenerated: "2024-01-14",
    status: "ready",
    size: "1.8 MB",
  },
  {
    name: "Cost Savings Report",
    description: "ROI analysis and cost reduction metrics",
    lastGenerated: "2024-01-13",
    status: "generating",
    size: "3.2 MB",
  },
  {
    name: "Exception Analysis",
    description: "Analysis of processing exceptions and resolutions",
    lastGenerated: "2024-01-12",
    status: "ready",
    size: "1.1 MB",
  },
]

export function AnalyticsReports() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Custom Reports</CardTitle>
            <CardDescription>Generate and download detailed analytics reports</CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Last Generated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.name}>
                <TableCell>
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.description}</div>
                  </div>
                </TableCell>
                <TableCell>{report.lastGenerated}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "ready" ? "default" : report.status === "generating" ? "secondary" : "outline"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={report.status !== "ready"}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
