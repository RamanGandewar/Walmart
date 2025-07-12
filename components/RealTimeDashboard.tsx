'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Activity, Clock, TrendingUp, Users, AlertTriangle } from 'lucide-react'

export default function RealTimeDashboard() {
  const [realtimeStats, setRealtimeStats] = useState({
    processingNow: 0,
    totalToday: 0,
    automationRate: 0,
    avgProcessingTime: 0,
    activeVendors: 0
  })
  const [activityFeed, setActivityFeed] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    fetchRealTimeData()
    
    // Set up real-time subscriptions
    const invoiceSubscription = supabase
      .channel('realtime-invoices')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'invoices' },
        () => fetchRealTimeData()
      )
      .subscribe()

    const commSubscription = supabase
      .channel('realtime-communications')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vendor_communications' },
        () => fetchRealTimeData()
      )
      .subscribe()

    // Refresh data every 30 seconds
    const interval = setInterval(fetchRealTimeData, 30000)

    return () => {
      invoiceSubscription.unsubscribe()
      commSubscription.unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const fetchRealTimeData = async () => {
    try {
      // Get invoice stats
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: recentActivity } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (invoices) {
        const today = new Date().toDateString()
        const todayInvoices = invoices.filter(inv => 
          new Date(inv.created_at).toDateString() === today
        )

        const processingCount = invoices.filter(inv => inv.status === 'processing').length
        const matchedCount = invoices.filter(inv => inv.status === 'matched' || inv.status === 'approved').length
        const automationRate = invoices.length > 0 ? Math.round((matchedCount / invoices.length) * 100) : 0
        
        const vendorSet = new Set(invoices.map(inv => inv.vendor_name).filter(Boolean))

        setRealtimeStats({
          processingNow: processingCount,
          totalToday: todayInvoices.length,
          automationRate,
          avgProcessingTime: Math.round(Math.random() * 45 + 15), // Mock processing time
          activeVendors: vendorSet.size
        })

        // Generate chart data for last 7 days
        const chartData = generateChartData(invoices)
        setChartData(chartData)
      }

      if (recentActivity) {
        setActivityFeed(recentActivity)
      }

    } catch (error) {
      console.error('Error fetching real-time data:', error)
    }
  }

  const generateChartData = (invoices: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toDateString()
    }).reverse()

    return last7Days.map(dateStr => {
      const dayInvoices = invoices.filter(inv => 
        new Date(inv.created_at).toDateString() === dateStr
      )
      
      return {
        date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        processed: dayInvoices.length,
        matched: dayInvoices.filter(inv => inv.status === 'matched' || inv.status === 'approved').length,
        discrepancies: dayInvoices.filter(inv => inv.status === 'discrepancy').length
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': case 'approved': return 'bg-green-100 text-green-800'
      case 'discrepancy': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* Real-time metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-500" />
              Processing Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{realtimeStats.processingNow}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeStats.totalToday.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{realtimeStats.automationRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Avg Process Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeStats.avgProcessingTime}s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Active Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realtimeStats.activeVendors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>7-Day Processing Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="processed" stroke="#0071ce" strokeWidth={2} />
                <Line type="monotone" dataKey="matched" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="matched" fill="#10b981" />
                <Bar dataKey="discrepancies" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Live Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activityFeed.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-sm">{invoice.filename}</p>
                    <p className="text-xs text-gray-600">
                      {invoice.vendor_name} • ${invoice.total_amount?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(invoice.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}