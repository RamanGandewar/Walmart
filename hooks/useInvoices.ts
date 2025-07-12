'use client'
import { useState, useEffect } from 'react'
import { supabase, Invoice } from '@/lib/supabase'

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvoices(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()

    // Set up real-time subscription
    const subscription = supabase
      .channel('invoices')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'invoices' },
        () => fetchInvoices()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { invoices, loading, error, refetch: fetchInvoices }
}

export function useInvoiceStats() {
  const { invoices } = useInvoices()
  
  const stats = {
    totalProcessed: invoices.length,
    automationRate: invoices.length > 0 ? 
      Math.round((invoices.filter(i => i.status === 'matched').length / invoices.length) * 100) : 0,
    pendingDiscrepancies: invoices.filter(i => i.status === 'discrepancy').length,
    costSavings: invoices.length * 50, // $50 saved per automated invoice
    avgConfidence: invoices.length > 0 ? 
      Math.round(invoices.reduce((sum, inv) => sum + (inv.confidence_score || 0), 0) / invoices.length) : 0
  }

  return stats
}