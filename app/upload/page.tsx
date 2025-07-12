import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

import { UploadZone } from "@/components/upload/upload-zone"
import { UploadProgress } from "@/components/upload/upload-progress"
import { ProcessingQueue } from "@/components/upload/processing-queue"
import InvoiceUpload from "@/components/InvoiceUpload"

export default function UploadPage() {
  return (
    <SidebarInset>
      {/* Top Navbar */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Upload Invoices</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Page Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Upload Invoices</h1>
              <p className="text-muted-foreground">
                AI-powered extraction with Gemini 2.5 Pro
              </p>
            </div>

            {/* Upload Section */}
            <div className="grid gap-6 lg:grid-cols-2">
              <UploadZone />
              <UploadProgress />
            </div>

            {/* Processing Queue */}
            <ProcessingQueue />

            {/* Additional Upload (InvoiceUpload component) */}
            <div>
              <h2 className="text-xl font-semibold">Alternate Upload Option</h2>
              <InvoiceUpload />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
