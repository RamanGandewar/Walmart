import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { InvoiceTable } from "@/components/invoices/invoice-table"
import { InvoiceFilters } from "@/components/invoices/invoice-filters"
import { InvoiceStats } from "@/components/invoices/invoice-stats"

export default function InvoicesPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Invoice Management</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
              <p className="text-muted-foreground">
                Manage and reconcile invoices with automated matching and exception handling
              </p>
            </div>

            <InvoiceStats />
            <InvoiceFilters />
            <InvoiceTable />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
