import React from 'react'

export default function AdminHolidayTable({ requests, onApprove, onReject, filters, selectedStat, onClose }) {
  // تصفية الطلبات بناءً على selectedStat
  let filteredRequests = requests

  // تطبيق تصفية selectedStat أولاً
  if (selectedStat) {
    if (selectedStat === 'total') {
      // جميع الطلبات
    } else if (selectedStat === 'approved') {
      filteredRequests = filteredRequests.filter(req => req.status === 'معتمد')
    } else if (selectedStat === 'pending') {
      filteredRequests = filteredRequests.filter(req => req.status === 'قيد الانتظار')
    } else if (selectedStat === 'rejected') {
      filteredRequests = filteredRequests.filter(req => req.status === 'مرفوض')
    }
  }

  if (filters.searchName) {
    filteredRequests = filteredRequests.filter(req =>
      req.fullName.includes(filters.searchName)
    )
  }

  if (filters.searchMilitaryId) {
    filteredRequests = filteredRequests.filter(req =>
      req.militaryId.includes(filters.searchMilitaryId)
    )
  }

  if (filters.status) {
    filteredRequests = filteredRequests.filter(req => req.status === filters.status)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'معتمد':
        return { bg: '#e8f5e9', text: '#4caf50', label: '✓ معتمد' }
      case 'قيد الانتظار':
        return { bg: '#fff3e0', text: '#ff9800', label: '⏳ قيد الانتظار' }
      case 'مرفوض':
        return { bg: '#ffebee', text: '#f44336', label: '✕ مرفوض' }
      default:
        return { bg: '#f5f5f5', text: '#757575', label: status }
    }
  }

  const getStatLabel = () => {
    switch (selectedStat) {
      case 'total': return 'جميع الطلبات'
      case 'approved': return 'الطلبات المعتمدة'
      case 'pending': return 'طلبات قيد الانتظار'
      case 'rejected': return 'الطلبات المرفوضة'
      default: return ''
    }
  }

  return (
    <div dir="rtl" className="mt-6">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">{getStatLabel()}</h3>
        <button
          onClick={onClose}
          className="px-4 py-2 border-2 border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition-colors"
        >
          ✕ إغلاق
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#5f6f41' }}>
                <th className="px-6 py-4 text-right text-white font-bold">الاسم الكامل</th>
                <th className="px-6 py-4 text-right text-white font-bold">الرقم العسكري</th>
                <th className="px-6 py-4 text-right text-white font-bold">المحافظة</th>
                <th className="px-6 py-4 text-right text-white font-bold">عقوبة</th>
                <th className="px-6 py-4 text-right text-white font-bold">التاريخ</th>
                <th className="px-6 py-4 text-right text-white font-bold">الحالة</th>
              <th className="px-6 py-4 text-center text-white font-bold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  لا توجد طلبات مطابقة للبحث
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => {
                const statusColor = getStatusColor(request.status)
                return (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-800 font-semibold">{request.fullName}</td>
                    <td className="px-6 py-4 text-gray-700">{request.militaryId}</td>
                    <td className="px-6 py-4 text-gray-700">{request.governorate}</td>
                    
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          request.penalty ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {request.penalty ? '⚠️ ' + request.penalty : '✓ بدون عقوبة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{request.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.text
                        }}
                      >
                        {statusColor.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => onApprove(request.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                        >
                          قبول
                        </button>
                        <button
                          onClick={() => onReject(request.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                        >
                          رفض
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
