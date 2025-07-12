import { supabase } from './supabase'

export interface MatchingResult {
  matched: boolean
  discrepancies: Discrepancy[]
  confidence: number
  matchedPO?: any
}

export interface Discrepancy {
  field: string
  expected: any
  actual: any
  difference: number | string
  severity: 'low' | 'medium' | 'high'
  sku?: string
}

export async function performThreeWayMatching(invoiceId: string) {
  try {
    // Get invoice data
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single()

    if (invoiceError || !invoice) {
      throw new Error('Invoice not found')
    }

    // Find matching PO
    const { data: purchaseOrder, error: poError } = await supabase
      .from('purchase_orders')
      .select('*')
      .eq('po_number', invoice.po_number)
      .single()

    if (poError || !purchaseOrder) {
      // No PO found - flag for manual review
      await updateInvoiceStatus(invoiceId, 'discrepancy', [{
        field: 'po_number',
        expected: 'Valid PO',
        actual: invoice.po_number || 'Missing',
        difference: 'PO not found',
        severity: 'high'
      }])
      return { matched: false, discrepancies: [], confidence: 0 }
    }

    // Perform matching analysis
    const discrepancies = await analyzeDiscrepancies(invoice, purchaseOrder)
    const confidence = calculateMatchingConfidence(discrepancies, invoice.confidence_score || 0)
    
    // Determine final status
    const matched = discrepancies.filter(d => d.severity === 'high').length === 0
    const status = matched ? 'matched' : 'discrepancy'

    // Update invoice status
    await updateInvoiceStatus(invoiceId, status, discrepancies)

    return {
      matched,
      discrepancies,
      confidence,
      matchedPO: purchaseOrder
    }

  } catch (error) {
    console.error('Matching error:', error)
    throw error
  }
}

async function analyzeDiscrepancies(invoice: any, po: any): Promise<Discrepancy[]> {
  const discrepancies: Discrepancy[] = []

  // Check vendor name (fuzzy matching)
  const vendorSimilarity = calculateStringSimilarity(
    invoice.vendor_name?.toLowerCase() || '',
    po.vendor_name?.toLowerCase() || ''
  )
  
  if (vendorSimilarity < 0.8) {
    discrepancies.push({
      field: 'vendor_name',
      expected: po.vendor_name,
      actual: invoice.vendor_name,
      difference: `${Math.round((1 - vendorSimilarity) * 100)}% different`,
      severity: vendorSimilarity < 0.5 ? 'high' : 'medium'
    })
  }

  // Check total amount
  const amountDifference = Math.abs((invoice.total_amount || 0) - (po.total_amount || 0))
  const amountPercentDiff = po.total_amount ? (amountDifference / po.total_amount) * 100 : 100

  if (amountPercentDiff > 0.1) { // More than 0.1% difference
    discrepancies.push({
      field: 'total_amount',
      expected: po.total_amount,
      actual: invoice.total_amount,
      difference: amountDifference,
      severity: amountPercentDiff > 5 ? 'high' : amountPercentDiff > 1 ? 'medium' : 'low'
    })
  }

  // Check line items
  if (invoice.extracted_data?.line_items && po.line_items) {
    const invoiceItems = invoice.extracted_data.line_items
    const poItems = po.line_items

    for (const invoiceItem of invoiceItems) {
      const matchingPOItem = poItems.find((item: any) => 
        item.sku === invoiceItem.sku || 
        calculateStringSimilarity(item.description, invoiceItem.description) > 0.8
      )

      if (matchingPOItem) {
        // Check quantity
        if (invoiceItem.quantity !== matchingPOItem.quantity) {
          discrepancies.push({
            field: 'quantity',
            sku: invoiceItem.sku || invoiceItem.description,
            expected: matchingPOItem.quantity,
            actual: invoiceItem.quantity,
            difference: Math.abs(invoiceItem.quantity - matchingPOItem.quantity),
            severity: Math.abs(invoiceItem.quantity - matchingPOItem.quantity) > matchingPOItem.quantity * 0.1 ? 'high' : 'medium'
          })
        }

        // Check unit price
        const priceDiff = Math.abs((invoiceItem.unit_price || 0) - (matchingPOItem.unit_price || 0))
        const pricePercentDiff = matchingPOItem.unit_price ? (priceDiff / matchingPOItem.unit_price) * 100 : 100

        if (pricePercentDiff > 0.1) {
          discrepancies.push({
            field: 'unit_price',
            sku: invoiceItem.sku || invoiceItem.description,
            expected: matchingPOItem.unit_price,
            actual: invoiceItem.unit_price,
            difference: priceDiff,
            severity: pricePercentDiff > 5 ? 'high' : 'medium'
          })
        }
      } else {
        // Item not found in PO
        discrepancies.push({
          field: 'line_item',
          sku: invoiceItem.sku || invoiceItem.description,
          expected: 'Item should exist in PO',
          actual: 'Item not found',
          difference: 'Missing from PO',
          severity: 'high'
        })
      }
    }
  }

  return discrepancies
}

function calculateStringSimilarity(str1: string, str2: string): number {
  // Simple Levenshtein distance implementation
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + substitutionCost // substitution
      )
    }
  }
  
  const maxLength = Math.max(str1.length, str2.length)
  return maxLength === 0 ? 1 : (maxLength - matrix[str2.length][str1.length]) / maxLength
}

function calculateMatchingConfidence(discrepancies: Discrepancy[], ocrConfidence: number): number {
  const highSeverityPenalty = discrepancies.filter(d => d.severity === 'high').length * 20
  const mediumSeverityPenalty = discrepancies.filter(d => d.severity === 'medium').length * 10
  const lowSeverityPenalty = discrepancies.filter(d => d.severity === 'low').length * 5
  
  const matchingConfidence = Math.max(0, 100 - highSeverityPenalty - mediumSeverityPenalty - lowSeverityPenalty)
  
  // Combine with OCR confidence (weighted average)
  return Math.round((matchingConfidence * 0.7) + (ocrConfidence * 0.3))
}

async function updateInvoiceStatus(invoiceId: string, status: string, discrepancies: Discrepancy[]) {
  const { error } = await supabase
    .from('invoices')
    .update({
      status,
      discrepancies,
      processed_at: new Date().toISOString()
    })
    .eq('id', invoiceId)

  if (error) {
    console.error('Error updating invoice status:', error)
  }
}

// Auto-trigger matching for new invoices
export async function autoProcessInvoice(invoiceId: string) {
  try {
    // Wait a moment for OCR to complete
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = await performThreeWayMatching(invoiceId)
    
    // If matched and high confidence, auto-approve
    if (result.matched && result.confidence > 95) {
      await supabase
        .from('invoices')
        .update({ status: 'approved' })
        .eq('id', invoiceId)
    }
    
    return result
  } catch (error) {
    console.error('Auto-processing failed:', error)
    return null
  }
}