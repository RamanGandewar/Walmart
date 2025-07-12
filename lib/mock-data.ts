import { supabase } from './supabase'

export async function insertMockData() {
  // Insert sample purchase orders
  const { error: poError } = await supabase
    .from('purchase_orders')
    .insert([
      {
        po_number: 'PO-2024-001',
        vendor_name: 'Procter & Gamble',
        total_amount: 45000.00,
        order_date: '2024-01-15',
        line_items: [
          { sku: 'PG-TIDE-001', description: 'Tide Laundry Detergent', quantity: 500, unit_price: 12.99 },
          { sku: 'PG-DAWN-002', description: 'Dawn Dish Soap', quantity: 300, unit_price: 3.49 }
        ],
        status: 'open'
      },
      {
        po_number: 'PO-2024-002',
        vendor_name: 'Coca-Cola Company',
        total_amount: 75000.00,
        order_date: '2024-01-16',
        line_items: [
          { sku: 'CC-COKE-001', description: 'Coca-Cola 12pk', quantity: 1000, unit_price: 5.99 },
          { sku: 'CC-SPRITE-001', description: 'Sprite 12pk', quantity: 500, unit_price: 5.99 }
        ],
        status: 'open'
      }
    ])

  // Insert sample invoices
  const { error: invoiceError } = await supabase
    .from('invoices')
    .insert([
      {
        filename: 'invoice_pg_001.pdf',
        vendor_name: 'Procter & Gamble',
        invoice_number: 'INV-PG-2024-001',
        total_amount: 45000.00,
        invoice_date: '2024-01-20',
        po_number: 'PO-2024-001',
        status: 'matched',
        confidence_score: 98.5,
        extracted_data: {
          vendor_address: '1 Procter & Gamble Plaza, Cincinnati, OH',
          line_items: [
            { sku: 'PG-TIDE-001', quantity: 500, unit_price: 12.99 },
            { sku: 'PG-DAWN-002', quantity: 300, unit_price: 3.49 }
          ]
        }
      },
      {
        filename: 'invoice_cc_002.pdf',
        vendor_name: 'Coca-Cola Company',
        invoice_number: 'INV-CC-2024-002',
        total_amount: 77500.00,
        invoice_date: '2024-01-21',
        po_number: 'PO-2024-002',
        status: 'discrepancy',
        confidence_score: 95.2,
        extracted_data: {
          vendor_address: 'One Coca-Cola Plaza, Atlanta, GA',
          line_items: [
            { sku: 'CC-COKE-001', quantity: 1000, unit_price: 6.49 },
            { sku: 'CC-SPRITE-001', quantity: 500, unit_price: 5.99 }
          ]
        },
        discrepancies: [
          { field: 'total_amount', expected: 75000.00, actual: 77500.00, difference: 2500.00 },
          { field: 'unit_price', sku: 'CC-COKE-001', expected: 5.99, actual: 6.49, difference: 0.50 }
        ]
      }
    ])

  if (poError) console.error('Error inserting POs:', poError)
  if (invoiceError) console.error('Error inserting invoices:', invoiceError)
  
  return { poError, invoiceError }
}