"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "invoice_processed",
    vendor: "Procter & Gamble",
    amount: "$45,230.50",
    status: "completed",
    time: "2 minutes ago",
    user: "System",
  },
  {
    id: 2,
    type: "exception_resolved",
    vendor: "Unilever",
    amount: "$12,450.00",
    status: "resolved",
    time: "5 minutes ago",
    user: "J. Smith",
  },
  {
    id: 3,
    type: "bulk_upload",
    vendor: "Multiple Vendors",
    amount: "247 invoices",
    status: "processing",
    time: "8 minutes ago",
    user: "M. Johnson",
  },
  {
    id: 4,
    type: "vendor_communication",
    vendor: "Coca-Cola",
    amount: "Payment inquiry",
    status: "pending",
    time: "12 minutes ago",
    user: "A. Davis",
  },
  {
    id: 5,
    type: "invoice_matched",
    vendor: "PepsiCo",
    amount: "$78,920.25",
    status: "completed",
    time: "15 minutes ago",
    user: "System",
  },
]

export function RecentActivity() {
  return (
    <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest invoice processing activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-card/50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {activity.user === "System"
                      ? "SY"
                      : activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.vendor}</p>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "resolved"
                            ? "secondary"
                            : activity.status === "processing"
                              ? "outline"
                              : "destructive"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{activity.amount}</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
