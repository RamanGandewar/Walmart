'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { performThreeWayMatching } from '@/lib/matching'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react'

export default function DiscrepancyDashboard() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    fetchDiscrepancies()
  }, [])

  const fetchDiscrepancies = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .in('status', ['discrepancy', 'processing', 'pending'])
      .order('created_at', { ascending: false })

    if (!error) {
      setInvoices(data || [])
    }
    setLoading(false)
  }

  const handleReprocess = async (invoiceId: string) => {
    setProcessing(invoiceId)
    try {
      await performThreeWayMatching(invoiceId)
      await fetchDiscrepancies()
    } catch (error) {
      console.error('Reprocessing failed:', error)
    } finally {
      setProcessing(null)
    }
  }

  const handleApprove = async (invoiceId: string) => {
    await supabase
      .from('invoices')
      .update({ status: 'approved' })
      .eq('id', invoiceId)
    
    await fetchDiscrepancies()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'discrepancy': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-500" />
      default: return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  if (loading) return <div>Loading discrepancies...</div>

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {invoices.filter(inv => 
                inv.discrepancies?.some((d: any) => d.severity === 'high')
              ).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Medium Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {invoices.filter(inv => 
                inv.discrepancies?.some((d: any) => d.severity === 'medium') &&
                !inv.discrepancies?.some((d: any) => d.severity === 'high')
              ).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {invoices.filter(inv => inv.status === 'processing').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discrepancy List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Invoices Requiring Attention</h3>
        
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <h4 className="font-medium">{invoice.filename}</h4>
                      <p className="text-sm text-gray-600">
                        {invoice.vendor_name} • ${invoice.total_amount?.toLocaleString()} • 
                        Confidence: {invoice.confidence_score}%
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {invoice.status}
                    </Badge>
                  </div>

                  {/* Discrepancies */}
                  {invoice.discrepancies && invoice.discrepancies.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Discrepancies Found:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {invoice.discrepancies.map((discrepancy: any, index: number) => (
                          <div key={index} className="text-sm p-3 bg-gray-50 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{discrepancy.field}</span>
                              <Badge className={getSeverityColor(discrepancy.severity)}>
                                {discrepancy.severity}
                              </Badge>
                            </div>
                            {discrepancy.sku && (
                              <p className="text-gray-600 text-xs">SKU: {discrepancy.sku}</p>
                            )}
                            <p className="text-gray-600">
                              Expected: {discrepancy.expected} | 
                              Actual: {discrepancy.actual}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReprocess(invoice.id)}
                    disabled={processing === invoice.id}
                  >
                    {processing === invoice.id ? 'Processing...' : 'Reprocess'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(invoice.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {invoices.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">All Clear!</h3>
              <p className="text-gray-600">No discrepancies require attention at this time.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}