"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Filter, X } from "lucide-react"
import { useState } from "react"

export function InvoiceFilters() {
  const [date, setDate] = useState<Date>()
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-9" />
          </div>

          <Select onValueChange={(value) => addFilter(`Status: ${value}`)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="matched">Matched</SelectItem>
              <SelectItem value="exception">Exception</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => addFilter(`Vendor: ${value}`)}>
            <SelectTrigger>
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pg">Procter & Gamble</SelectItem>
              <SelectItem value="unilever">Unilever</SelectItem>
              <SelectItem value="coca-cola">Coca-Cola</SelectItem>
              <SelectItem value="pepsico">PepsiCo</SelectItem>
              <SelectItem value="nestle">Nestlé</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? formatDate(date) : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Button variant="outline">Export Results</Button>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])} className="h-6 px-2 text-xs">
              Clear all
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
