'use client'

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

import { VendorStats } from "@/components/vendors/vendor-stats"
import { VendorTable } from "@/components/vendors/vendor-table"
import { VendorPerformanceChart } from "@/components/vendors/vendor-performance-chart"
import VendorCommunicationHub from "@/components/VendorCommunicationHub"

export default function VendorsPage() {
  return (
    <SidebarInset>
      {/* Header with sidebar and breadcrumb */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Vendor Hub</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6 space-y-10">
            {/* Page Intro */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Vendor Hub</h1>
              <p className="text-muted-foreground">
                Manage vendor relationships and track performance metrics
              </p>
            </div>

            {/* Metrics and Charts */}
            <VendorStats />
            <div className="grid gap-6 lg:grid-cols-2">
              <VendorPerformanceChart />
              <VendorTable />
            </div>

            {/* Communication Hub */}
            <div className="pt-8 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Vendor Communications</h2>
              <p className="text-muted-foreground">
                AI-powered sentiment analysis and dispute prediction
              </p>
              <VendorCommunicationHub />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
