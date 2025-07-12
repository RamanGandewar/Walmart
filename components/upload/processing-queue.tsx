"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, MoreHorizontal, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const queueItems = [
  {
    id: "INV-001234",
    filename: "invoice_pg_jan2024.pdf",
    vendor: "Procter & Gamble",
    amount: "$45,230.50",
    status: "processing",
    progress: 75,
    uploadTime: "2 min ago",
  },
  {
    id: "INV-001235",
    filename: "unilever_invoice_456.pdf",
    vendor: "Unilever",
    amount: "$12,450.00",
    status: "completed",
    progress: 100,
    uploadTime: "5 min ago",
  },
  {
    id: "INV-001236",
    filename: "coca_cola_inv_789.pdf",
    vendor: "Coca-Cola",
    amount: "$8,920.25",
    status: "validation",
    progress: 90,
    uploadTime: "8 min ago",
  },
  {
    id: "INV-001237",
    filename: "pepsi_invoice_012.pdf",
    vendor: "PepsiCo",
    amount: "$15,670.80",
    status: "error",
    progress: 45,
    uploadTime: "12 min ago",
  },
  {
    id: "INV-001238",
    filename: "nestle_inv_345.pdf",
    vendor: "Nestlé",
    amount: "$22,340.15",
    status: "queued",
    progress: 0,
    uploadTime: "15 min ago",
  },
]

export function ProcessingQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Queue</CardTitle>
        <CardDescription>Monitor the status of uploaded invoices in the processing pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.id}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px]">{item.filename}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.vendor}</TableCell>
                <TableCell className="font-medium">{item.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "completed"
                        ? "default"
                        : item.status === "processing" || item.status === "validation"
                          ? "secondary"
                          : item.status === "error"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Progress value={item.progress} className="h-2 w-[80px]" />
                    <p className="text-xs text-muted-foreground">{item.progress}%</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.uploadTime}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Retry Processing</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
