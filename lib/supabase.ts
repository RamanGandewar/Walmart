import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Invoice {
  id: string
  filename: string
  vendor_name?: string
  invoice_number?: string
  total_amount?: number
  invoice_date?: string
  po_number?: string
  status: 'pending' | 'processing' | 'matched' | 'discrepancy' | 'approved'
  confidence_score?: number
  extracted_data?: any
  discrepancies?: any
  created_at: string
  processed_at?: string
}

export interface PurchaseOrder {
  id: string
  po_number: string
  vendor_name: string
  total_amount: number
  order_date: string
  line_items?: any
  status: string
  created_at: string
}