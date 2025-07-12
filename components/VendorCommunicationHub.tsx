'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { analyzeVendorCommunication } from '@/lib/gemini'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Mail, Phone, AlertTriangle, TrendingUp, TrendingDown, MessageSquare } from 'lucide-react'

export default function VendorCommunicationHub() {
  const [communications, setCommunications] = useState<any[]>([])
  const [newEmail, setNewEmail] = useState('')
  const [vendorName, setVendorName] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [stats, setStats] = useState({
    avgSentiment: 0,
    highRiskCount: 0,
    recentTrend: 0
  })

  useEffect(() => {
    fetchCommunications()
    calculateStats()
  }, [communications])

  const fetchCommunications = async () => {
    const { data, error } = await supabase
      .from('vendor_communications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error) {
      setCommunications(data || [])
    }
  }

  const calculateStats = () => {
    if (communications.length === 0) return

    const avgSentiment = communications.reduce((sum, comm) => sum + (comm.sentiment_score || 0), 0) / communications.length
    const highRiskCount = communications.filter(comm => comm.dispute_probability > 70).length
    
    // Calculate trend (compare last 5 vs previous 5)
    const recent = communications.slice(0, 5)
    const previous = communications.slice(5, 10)
    const recentAvg = recent.length > 0 ? recent.reduce((sum, comm) => sum + (comm.sentiment_score || 0), 0) / recent.length : 0
    const previousAvg = previous.length > 0 ? previous.reduce((sum, comm) => sum + (comm.sentiment_score || 0), 0) / previous.length : 0
    
    setStats({
      avgSentiment: Math.round(avgSentiment),
      highRiskCount,
      recentTrend: Math.round(recentAvg - previousAvg)
    })
  }

  const handleAnalyzeEmail = async () => {
    if (!newEmail.trim() || !vendorName.trim()) return

    setAnalyzing(true)
    try {
      const analysis = await analyzeVendorCommunication(newEmail)
      
      const { error } = await supabase
        .from('vendor_communications')
        .insert({
          vendor_name: vendorName,
          communication_type: 'email',
          content: newEmail,
          sentiment_score: analysis.sentiment_score,
          dispute_probability: analysis.dispute_probability
        })

      if (!error) {
        setNewEmail('')
        setVendorName('')
        await fetchCommunications()
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getSentimentColor = (score: number) => {
    if (score > 20) return 'text-green-600'
    if (score > -20) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSentimentIcon = (score: number) => {
    if (score > 20) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (score > -20) return <MessageSquare className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const getRiskBadge = (probability: number) => {
    if (probability > 70) return <Badge className="bg-red-100 text-red-800">High Risk</Badge>
    if (probability > 40) return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
    return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSentimentColor(stats.avgSentiment)}`}>
              {stats.avgSentiment > 0 ? '+' : ''}{stats.avgSentiment}
            </div>
            <p className="text-xs text-gray-600">-100 (negative) to +100 (positive)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRiskCount}</div>
            <p className="text-xs text-gray-600">Dispute probability {'>'} 70%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getSentimentColor(stats.recentTrend)}`}>
              {stats.recentTrend > 0 ? '+' : ''}{stats.recentTrend}
            </div>
            <p className="text-xs text-gray-600">vs previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Email Analysis Tool */}
      <Card>
        <CardHeader>
          <CardTitle>Analyze New Communication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
          <Textarea
            placeholder="Paste email content or communication text here..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            rows={4}
          />
          <Button 
            onClick={handleAnalyzeEmail}
            disabled={analyzing || !newEmail.trim() || !vendorName.trim()}
            className="w-full"
          >
            {analyzing ? 'Analyzing with Gemini AI...' : 'Analyze Communication'}
          </Button>
        </CardContent>
      </Card>

      {/* Communication Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communications.map((comm) => (
              <div key={comm.id} className="border-l-4 border-gray-200 pl-4 py-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{comm.vendor_name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comm.created_at).toLocaleDateString()}
                      </span>
                      {getSentimentIcon(comm.sentiment_score)}
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {comm.content}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`font-medium ${getSentimentColor(comm.sentiment_score)}`}>
                        Sentiment: {comm.sentiment_score}
                      </span>
                      <span className="text-gray-600">
                        Dispute Risk: {comm.dispute_probability}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {getRiskBadge(comm.dispute_probability)}
                  </div>
                </div>
              </div>
            ))}

            {communications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No communications analyzed yet</p>
                <p className="text-sm">Use the tool above to analyze vendor emails</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}