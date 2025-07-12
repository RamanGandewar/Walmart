import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { AnalyticsKPIs } from "@/components/analytics/analytics-kpis"
import { AnalyticsCharts } from "@/components/analytics/analytics-charts"
import { AnalyticsReports } from "@/components/analytics/analytics-reports"

export default function AnalyticsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Analytics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Detailed insights and customizable reports for invoice processing</p>
            </div>

            <AnalyticsKPIs />
            <AnalyticsCharts />
            <AnalyticsReports />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
