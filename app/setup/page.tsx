'use client'

import { useState } from 'react'
import { insertMockData } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSetup = async () => {
    setLoading(true)
    try {
      await insertMockData()
      setSuccess(true)
    } catch (error) {
      console.error('Setup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Initialize Demo Data</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-green-600">✅ Demo data loaded successfully!</p>
          ) : (
            <Button onClick={handleSetup} disabled={loading} className="w-full">
              {loading ? 'Loading...' : 'Load Demo Data'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}