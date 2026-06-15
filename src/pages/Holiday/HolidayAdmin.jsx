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
  <section dir="rtl" className="min-h-screen bg-background py-8 ">
    <div className="max-w-[1300px] mx-auto px-6">

      {/* البطاقة البيضاء اللي بتلف كل حاجة */}
      <div className="bg-white rounded-[28px] shadow-[0_18px_50px_rgba(66,58,40,0.10)] px-6 py-6 overflow-hidden ">

        {/* الهيدر الأخضر */}
        <div className="relative flex flex-row-reverse items-center gap-6 bg-[#555d30] rounded-2xl p-8 mb-10 overflow-hidden pb-16">
          {/* دوايرة زخرفية */}
          <div className="absolute left-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute left-16 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 pointer-events-none" />

          {/* أيقونة */}
          <div className="relative z-10 bg-white/15 rounded-2xl w-[72px] h-[72px] flex items-center justify-center shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>

          {/* النص */}
          <div className="relative z-10 flex-1 text-right ">
            
            <h1 className="text-white text-[32px] font-black tracking-tight leading-tight mb-2">
              الإجازات الأسبوعية المقدمة
            </h1>
            <p className="text-white/70 text-sm">
              إدارة طلبات الإجازات الأسبوعية وتحديد الحالة
            </p>
          </div>
        </div>

        {/* باقي المحتوى */}
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

      </div>{/* نهاية البطاقة البيضاء */}
    </div>
  </section>
)}