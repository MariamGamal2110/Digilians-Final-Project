import React from 'react'

const getStatusInfo = (status) => {
  switch (status) {
    case 'approved':
    case 'معتمد':
      return { bg: '#e8f5e9', text: '#4caf50', label: '✓ معتمد' }
    case 'pending':
    case 'قيد الانتظار':
      return { bg: '#fff3e0', text: '#ff9800', label: '⏳ قيد الانتظار' }
    case 'rejected':
    case 'مرفوض':
      return { bg: '#ffebee', text: '#f44336', label: '✕ مرفوض' }
    default:
      return { bg: '#f5f5f5', text: '#757575', label: status || 'غير معروف' }
  }
}

const normalizeRequest = (request) => {
  const id = request._id || request.id
  const name = request.studentName || request.fullName || request.name || '—'
  return {
    _id: id,
    fullName: name,
    militaryId: request.militaryId || '—',
    reason: request.reason || '—',
    status: request.status || 'pending',
    createdAt: request.createdAt || request.date || new Date().toLocaleDateString('ar-EG'),
  }
}

const getStatLabel = (selectedStat) => {
  switch (selectedStat) {
    case 'total':    return 'جميع الطلبات'
    case 'approved': return 'الطلبات المعتمدة'
    case 'pending':  return 'طلبات قيد الانتظار'
    case 'rejected': return 'الطلبات المرفوضة'
    default:         return ''
  }
}

export default function AdminHolidayTable({ requests = [], onApprove, onReject, onSetPending, selectedStat, loading, onClear }) {
  const normalizedRequests = requests.map(normalizeRequest)

  return (
    <div dir="rtl" className="mt-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-primary">{getStatLabel(selectedStat)}</h3>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">جاري تحميل الطلبات...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#5f6f41' }}>
                    <th className="px-6 py-4 text-right text-white font-bold">الاسم</th>
                    <th className="px-6 py-4 text-right text-white font-bold">الرقم العسكري</th>
                    <th className="px-6 py-4 text-right text-white font-bold">السبب</th>
                    <th className="px-6 py-4 text-right text-white font-bold">التاريخ</th>
                    <th className="px-6 py-4 text-right text-white font-bold">الحالة</th>
                    <th className="px-6 py-4 text-center text-white font-bold">الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {normalizedRequests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        لا توجد طلبات
                      </td>
                    </tr>
                  ) : (
                    normalizedRequests.map((request) => {
                      const statusInfo = getStatusInfo(request.status)
                      return (
                        <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-800 font-semibold">{request.fullName}</td>
                          <td className="px-6 py-4 text-gray-700">{request.militaryId}</td>
                          <td className="px-6 py-4 text-gray-700 max-w-[200px] truncate" title={request.reason}>
                            {request.reason}
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{request.createdAt}</td>
                          <td className="px-6 py-4">
                            <span
                              className="px-3 py-1 rounded-full text-sm font-semibold"
                              style={{ backgroundColor: statusInfo.bg, color: statusInfo.text }}
                            >
                              {statusInfo.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex gap-2 justify-center">
                              {request.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => onApprove(request._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                                  >
                                    قبول
                                  </button>
                                  <button
                                    onClick={() => onReject(request._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                                  >
                                    رفض
                                  </button>
                                </>
                              ) : request.status === 'approved' ? (
                                <>
                                  <button
                                    onClick={() => onReject(request._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
                                  >
                                    رفض
                                  </button>
                                  <button
                                    onClick={() => onSetPending(request._id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-yellow-600 transition-colors"
                                  >
                                    قيد الانتظار
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => onApprove(request._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                                  >
                                    قبول
                                  </button>
                                  <button
                                    onClick={() => onSetPending(request._id)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-yellow-600 transition-colors"
                                  >
                                    قيد الانتظار
                                  </button>
                                </>
                              )}
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

          {requests.length > 0 && selectedStat === 'total' && (
            <div className="mt-10 flex justify-end ">
              <button
                onClick={onClear}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
              >
                ✕ مسح الكل
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}