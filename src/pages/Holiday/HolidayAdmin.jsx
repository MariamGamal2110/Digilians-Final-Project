import React, { useEffect, useState } from 'react'
import AdminHolidayStats from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayStats'
import AdminHolidayFilters from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayFilters'
import AdminHolidayTable from '../../components/HoildayComponents/HolidayAdmin/AdminHolidayTable'
import { getHolidayAppeals } from '../../api/localRequests'

export default function HolidayAdmin() {
  const [selectedStat, setSelectedStat] = useState('pending')
  // البيانات الوهمية
  const [requests, setRequests] = useState([
    {
      id: 1,
      fullName: 'الاسم الكامل الجميد',
      militaryId: '2032236691',
      governorate: 'القاهرة',
      reason: 'اسباب عدم التنزيل',
      penalty: null,
      date: '2023/10/16',
      status: 'معتمد'
    },
    {
      id: 2,
      fullName: 'الاسم الكامل الواحد',
      militaryId: '2032292892',
      governorate: 'القاهرة',
      
      penalty: 'تأخر شهر',
      date: '2023/10/16',
      status: 'قيد الانتظار'
    },
    {
      id: 3,
      fullName: 'الاسم الكامل الباحي',
      militaryId: '2032563703',
      governorate: 'المعاهد',
      
      penalty: 'خصم نقاط',
      date: '2023/10/16',
      status: 'مرفوض'
    },
    {
      id: 4,
      fullName: 'الاسم الكامل الولاية',
      militaryId: '2030524895',
      governorate: 'المعاهد',
      
      penalty: null,
      date: '2023/10/16',
      status: 'مرفوض'
    },
    {
      id: 5,
      fullName: 'الاسم الكامل لمس',
      militaryId: '2032363900',
      governorate: 'المعاهد',
      penalty: 'تحذير',
      date: '2023/10/16',
      status: 'مرفوض'
    },
    {
      id: 6,
      fullName: 'الاسم مجاهد الجيدي',
      militaryId: '2032842340',
      governorate: 'المعاهد',
      penalty: null,
      date: '2023/10/16',
      status: 'معتمد'
    },
    {
      id: 7,
      fullName: 'الاسم الكامل الجديد',
      militaryId: '2032440376',
      governorate: 'المعاهد',
      
      penalty: null,
      date: '2023/10/16',
      status: 'معتمد'
    },
    {
      id: 8,
      fullName: 'الاسم الكامل الطني',
      militaryId: '2032485338',
      governorate: 'المعاهد',
           penalty: 'تأخر أسبوع',
      date: '2023/10/16',
      status: 'مرفوض'
    },
    {
      id: 9,
      fullName: 'الاسم دعلي الوجي',
      militaryId: '2032442306',
      governorate: 'المعاهد',
      penalty: null,
      date: '2023/10/16',
      status: 'معتمد'
    }
  ])

  const [filters, setFilters] = useState({
    searchName: '',
    searchMilitaryId: '',
    status: ''
  })

  useEffect(() => {
    const mergeAppeals = () => {
      const appeals = getHolidayAppeals()
      setRequests((prev) => {
        const existingIds = new Set(prev.map((request) => request.id))
        const newAppeals = appeals.filter((appeal) => !existingIds.has(appeal.id))
        return newAppeals.length ? [...newAppeals, ...prev] : prev
      })
    }

    mergeAppeals()
    window.addEventListener('storage', mergeAppeals)
    return () => window.removeEventListener('storage', mergeAppeals)
  }, [])

  const stats = {
    total: requests.length,
    approved: requests.filter(r => r.status === 'معتمد').length,
    pending: requests.filter(r => r.status === 'قيد الانتظار').length,
    rejected: requests.filter(r => r.status === 'مرفوض').length
  }

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'clear') {
      setFilters({
        searchName: '',
        searchMilitaryId: '',
        status: ''
      })
    } else {
      setFilters({
        ...filters,
        [filterName]: value
      })
    }
  }

  const handleApprove = (requestId) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, status: 'معتمد' } : req
    )
    setRequests(updatedRequests)
    
    // التحقق من وجود طلبات قيد الانتظار المتبقية
    const pendingCount = updatedRequests.filter(r => r.status === 'قيد الانتظار').length
    if (pendingCount === 0 && selectedStat === 'pending') {
      setSelectedStat(null)
    }
  }

  const handleReject = (requestId) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, status: 'مرفوض' } : req
    )
    setRequests(updatedRequests)
    
    // التحقق من وجود طلبات قيد الانتظار المتبقية
    const pendingCount = updatedRequests.filter(r => r.status === 'قيد الانتظار').length
    if (pendingCount === 0 && selectedStat === 'pending') {
      setSelectedStat(null)
    }
  }

  return (
    <section dir="rtl" className="min-h-screen bg-background py-8">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">الإجازات الأسبوعية المقدمة</h1>
          <p className="text-gray-600">إدارة طلبات الإجازات الأسبوعية وتحديد الحالة</p>
        </div>

        {/* Stats */}
      <AdminHolidayStats 
        stats={stats} 
        selectedStat={selectedStat}
        onCardClick={setSelectedStat}
      />
        {/* Filters */}
        {!selectedStat && <AdminHolidayFilters filters={filters} onFilterChange={handleFilterChange} />}

        {/* Table */}
        {selectedStat && (
          <AdminHolidayTable
            requests={requests}
            onApprove={handleApprove}
            onReject={handleReject}
            filters={filters}
            selectedStat={selectedStat}
            onClose={() => setSelectedStat(null)}
          />
        )}
      </div>
    </section>
  )
}
