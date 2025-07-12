"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal, Eye, Edit, Link, AlertTriangle, CheckCircle } from "lucide-react"

const invoices = [
  {
    id: "INV-PG-2024-001234",
    vendor: "Procter & Gamble",
    amount: 45230.5,
    date: "2024-01-15",
    dueDate: "2024-02-14",
    poNumber: "PO-789456",
    status: "matched",
    confidence: 98,
    items: 3,
  },
  {
    id: "INV-UL-2024-005678",
    vendor: "Unilever",
    amount: 12450.0,
    date: "2024-01-16",
    dueDate: "2024-03-01",
    poNumber: "PO-789457",
    status: "exception",
    confidence: 85,
    items: 2,
  },
  {
    id: "INV-CC-2024-009012",
    vendor: "Coca-Cola",
    amount: 8920.25,
    date: "2024-01-17",
    dueDate: "2024-02-16",
    poNumber: "PO-789458",
    status: "pending",
    confidence: 92,
    items: 1,
  },
  {
    id: "INV-PC-2024-003456",
    vendor: "PepsiCo",
    amount: 15670.8,
    date: "2024-01-18",
    dueDate: "2024-02-17",
    poNumber: "PO-789459",
    status: "processed",
    confidence: 99,
    items: 4,
  },
  {
    id: "INV-NE-2024-007890",
    vendor: "Nestlé",
    amount: 22340.15,
    date: "2024-01-19",
    dueDate: "2024-03-19",
    poNumber: "PO-789460",
    status: "matched",
    confidence: 96,
    items: 5,
  },
]

export function InvoiceTable() {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const toggleInvoiceSelection = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId) ? prev.filter((id) => id !== invoiceId) : [...prev, invoiceId],
    )
  }

  const toggleAllSelection = () => {
    setSelectedInvoices(selectedInvoices.length === invoices.length ? [] : invoices.map((inv) => inv.id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Invoice List</CardTitle>
          <div className="flex items-center gap-2">
            {selectedInvoices.length > 0 && <Badge variant="secondary">{selectedInvoices.length} selected</Badge>}
            <Button variant="outline" size="sm">
              Bulk Actions
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox checked={selectedInvoices.length === invoices.length} onCheckedChange={toggleAllSelection} />
              </TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>PO Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={() => toggleInvoiceSelection(invoice.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.vendor}</TableCell>
                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {invoice.poNumber}
                    {invoice.status === "matched" && <Link className="h-4 w-4 text-green-600" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invoice.status === "matched"
                        ? "default"
                        : invoice.status === "processed"
                          ? "secondary"
                          : invoice.status === "exception"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{invoice.confidence}%</span>
                    {invoice.confidence >= 95 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : invoice.confidence < 90 ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault()
                              setSelectedInvoice(invoice)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Invoice Details</DialogTitle>
                            <DialogDescription>Detailed view of {selectedInvoice?.id}</DialogDescription>
                          </DialogHeader>
                          {selectedInvoice && (
                            <div className="grid gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Invoice Number</label>
                                  <Input value={selectedInvoice.id} readOnly />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Vendor</label>
                                  <Input value={selectedInvoice.vendor} readOnly />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Amount</label>
                                  <Input value={`$${selectedInvoice.amount.toLocaleString()}`} readOnly />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">PO Number</label>
                                  <Input value={selectedInvoice.poNumber} readOnly />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button>Approve Match</Button>
                                <Button variant="outline">Request Review</Button>
                                <Button variant="destructive">Reject</Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link className="h-4 w-4 mr-2" />
                        Match PO
                      </DropdownMenuItem>
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
