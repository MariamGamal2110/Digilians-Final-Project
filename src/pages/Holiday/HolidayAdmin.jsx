import React, { useEffect, useState, useCallback } from 'react'
import AdminHolidayStats from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayStats'
import AdminHolidayFilters from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayFilters'
import AdminHolidayTable from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayTable'
import {
  fetchPendingRequests,
  fetchApprovedRequests,
  fetchRejectedRequests,
  fetchAllHolidayRequests,
  approveRequest,
  rejectRequest,
  setPendingRequest,
  fetchHolidayStats,
} from '../../api/holiday'

export default function HolidayAdmin() {
  const [selectedStat, setSelectedStat] = useState('pending')
  const [showSearch, setShowSearch] = useState(false)
  const [requests, setRequests] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isCleared, setIsCleared] = useState(false)
  
  const loadStats = useCallback(async () => {
    try {
      const statsData = await fetchHolidayStats()
      setStats({
        pending: statsData.pending || 0,
        approved: statsData.approved || 0,
        rejected: statsData.rejected || 0,
        total: statsData.total || 0,
      })
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }, [])

  const loadRequests = useCallback(async (stat) => {
    setLoading(true)
    try {
      let data = []
      if (stat === 'pending')       data = await fetchPendingRequests('')
      else if (stat === 'approved') data = await fetchApprovedRequests('')
      else if (stat === 'rejected') data = await fetchRejectedRequests('')
      else if (stat === 'total')    data = await fetchAllHolidayRequests('')
      setRequests(data)
    } catch (err) {
      console.error('Failed to load requests:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadStats() }, [loadStats])
  useEffect(() => {
    if (!isCleared) {
      loadRequests(selectedStat)
    }
  }, [selectedStat, loadRequests, isCleared])

  // Load all tabs data when refreshKey changes
  useEffect(() => {
    const loadAllTabs = async () => {
      try {
        const [pendingData, approvedData, rejectedData] = await Promise.all([
          fetchPendingRequests(''),
          fetchApprovedRequests(''),
          fetchRejectedRequests('')
        ])
        // Store all data globally if needed, or just refresh current tab
        setRequests(pendingData)
      } catch (err) {
        console.error('Failed to load all tabs:', err)
      }
    }
    if (refreshKey > 0) {
      loadAllTabs()
    }
  }, [refreshKey])

  const handleStatClick = (stat) => {
    setSelectedStat(stat)
    setShowSearch(false)
    setSearchQuery('')
    setStatusFilter('')
  }

  const handleSearch = (query, status = '') => {
    setSearchQuery(query)
    setStatusFilter(status)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setStatusFilter('')
    setShowSearch(false)
  }

  // Handle actions with async/await properly
  const handleApprove = async (requestId) => {
    try {
      await approveRequest(requestId, 'تمت الموافقة')
      await loadStats()
      await loadRequests(selectedStat)
    } catch (err) {
      alert(err.message || 'فشل في الموافقة على الطلب')
    }
  }

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId, 'مرفوض')
      await loadStats()
      await loadRequests(selectedStat)
    } catch (err) {
      alert(err.message || 'فشل في رفض الطلب')
    }
  }

  const handleSetPending = async (requestId) => {
    try {
      await setPendingRequest(requestId, '')
      await loadStats()
      await loadRequests(selectedStat)
    } catch (err) {
      alert(err.message || 'فشل في إعادة الطلب للقيد الانتظار')
    }
  }

  const handleClear = () => {
    if (selectedStat !== 'total') return
    setRequests([])
    setIsCleared(true)
  }

  const displayedRequests = (searchQuery || statusFilter)
    ? requests.filter((req) => {
        const q = searchQuery.toLowerCase()
        const matchesQuery = !searchQuery || (
          req.studentName?.toLowerCase().includes(q) ||
          req.fullName?.toLowerCase().includes(q) ||
          req.name?.toLowerCase().includes(q) ||
          req.militaryId?.includes(searchQuery)
        )
        const matchesStatus = !statusFilter || req.status === statusFilter
        return matchesQuery && matchesStatus
      })
    : requests

  const showTable = !showSearch || searchQuery || statusFilter

  return (
    <section dir="rtl" className="min-h-screen bg-background py-8">
      <div className="max-w-[1300px] mx-auto px-6">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">الإجازات الأسبوعية المقدمة</h1>
          <p className="text-gray-600">إدارة طلبات الإجازات الأسبوعية وتحديد الحالة</p>
        </div>

        <AdminHolidayStats
          stats={stats}
          selectedStat={selectedStat}
          onCardClick={handleStatClick}
          loading={loading}
        />

        <div className="mb-4 flex justify-end">
          <button
            onClick={() => { setShowSearch((p) => !p); setSearchQuery(''); setStatusFilter('') }}
            className="px-4 py-2 border-2 border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition-colors"
          >
            {showSearch ? '✕ إغلاق البحث' : '🔍 بحث'}
          </button>
        </div>

        {showSearch && <AdminHolidayFilters onSearch={handleSearch} />}

        {(searchQuery || statusFilter) && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-500">
              نتائج البحث ({displayedRequests.length} نتيجة)
            </span>
            <button
              onClick={handleClearSearch}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              مسح البحث
            </button>
          </div>
        )}

        {showTable && (
          <AdminHolidayTable
            requests={displayedRequests}
            onApprove={handleApprove}
            onReject={handleReject}
            onSetPending={handleSetPending}
            selectedStat={selectedStat}
            loading={loading}
            onClear={handleClear}
          />
        )}
      </div>
    </section>
  )
}
