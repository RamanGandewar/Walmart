"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Reply } from "lucide-react"

const messages = [
  {
    id: 1,
    vendor: "Procter & Gamble",
    subject: "Payment Status Inquiry",
    message: "Could you please provide an update on invoice INV-PG-2024-001234?",
    sentiment: "neutral",
    time: "2 hours ago",
    status: "unread",
  },
  {
    id: 2,
    vendor: "Unilever",
    subject: "Invoice Discrepancy",
    message: "We noticed a discrepancy in the quantity billed for our recent order.",
    sentiment: "negative",
    time: "4 hours ago",
    status: "replied",
  },
  {
    id: 3,
    vendor: "Coca-Cola",
    subject: "Thank You",
    message: "Thank you for the prompt processing of our invoices this month.",
    sentiment: "positive",
    time: "6 hours ago",
    status: "read",
  },
  {
    id: 4,
    vendor: "PepsiCo",
    subject: "Urgent Payment Request",
    message: "This invoice is past due. Please expedite payment processing.",
    sentiment: "negative",
    time: "8 hours ago",
    status: "unread",
  },
]

export function MessageCenter() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Messages</CardTitle>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4 p-3 rounded-lg border bg-card/50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {message.vendor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{message.vendor}</p>
                      <Badge
                        variant={
                          message.sentiment === "positive"
                            ? "default"
                            : message.sentiment === "negative"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {message.sentiment}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium">{message.subject}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{message.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={message.status === "unread" ? "destructive" : "outline"} className="text-xs">
                      {message.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
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
