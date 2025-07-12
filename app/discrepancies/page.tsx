import DiscrepancyDashboard from '@/components/DiscrepancyDashboard'

export default function DiscrepanciesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Invoice Discrepancies</h1>
        <p className="text-gray-600">AI-powered three-way matching results</p>
      </div>
      <DiscrepancyDashboard />
    </div>
  )
}