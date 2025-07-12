"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare } from "lucide-react"

const vendors = [
  {
    name: "Procter & Gamble",
    invoices: 1247,
    amount: "$2.4M",
    performance: 98,
    status: "excellent",
  },
  {
    name: "Unilever",
    invoices: 892,
    amount: "$1.8M",
    performance: 94,
    status: "good",
  },
  {
    name: "Coca-Cola",
    invoices: 654,
    amount: "$1.2M",
    performance: 91,
    status: "good",
  },
  {
    name: "PepsiCo",
    invoices: 543,
    amount: "$980K",
    performance: 87,
    status: "average",
  },
  {
    name: "Nestlé",
    invoices: 432,
    amount: "$750K",
    performance: 89,
    status: "good",
  },
]

export function VendorTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Invoices</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.name}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.invoices}</TableCell>
                <TableCell>{vendor.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{vendor.performance}%</span>
                    <Badge
                      variant={
                        vendor.status === "excellent" ? "default" : vendor.status === "good" ? "secondary" : "outline"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4" />
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
