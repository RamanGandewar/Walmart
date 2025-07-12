'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { supabase } from '@/lib/supabase'
import { extractInvoiceData } from '@/lib/gemini'
import { autoProcessInvoice } from '@/lib/matching'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'

export default function InvoiceUpload() {
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    onDrop: async (files) => {
      setProcessing(true)
      const newResults: any[] = []

      for (const file of files) {
        try {
          // Step 1: Extract data from invoice using Gemini
          const extraction = await extractInvoiceData(file)

          if (extraction.success) {
            // Step 2: Save to Supabase
            const { data, error } = await supabase
              .from('invoices')
              .insert({
                filename: file.name,
                vendor_name: extraction.data.vendor_name,
                invoice_number: extraction.data.invoice_number,
                total_amount: extraction.data.total_amount,
                invoice_date: extraction.data.invoice_date,
                po_number: extraction.data.po_number,
                status: 'processing',
                confidence_score: extraction.confidence,
                extracted_data: extraction.data,
              })
              .select()
              .single()

            // Step 3: Trigger automatic background matching
            if (data?.id) {
              autoProcessInvoice(data.id).catch(console.error)
            }

            // Step 4: Add result for UI display
            newResults.push({
              filename: file.name,
              success: !error,
              data: extraction.data,
              confidence: extraction.confidence,
              id: data?.id,
            })
          } else {
            newResults.push({
              filename: file.name,
              success: false,
              error: extraction.error,
            })
          }
        } catch (error) {
          newResults.push({
            filename: file.name,
            success: false,
            error: 'Processing failed',
          })
        }
      }

      setResults(newResults)
      setProcessing(false)
    },
  })

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop invoices here'}
            </p>
            <p className="text-gray-500 mb-4">
              or click to select files (PNG, JPG, PDF)
            </p>
            <Button disabled={processing}>
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Select Files'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Processing Results</h3>
          {results.map((result, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{result.filename}</p>
                      {result.success ? (
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Vendor: {result.data.vendor_name}</p>
                          <p>Amount: ${result.data.total_amount}</p>
                          <p>Confidence: {result.confidence}%</p>
                        </div>
                      ) : (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
