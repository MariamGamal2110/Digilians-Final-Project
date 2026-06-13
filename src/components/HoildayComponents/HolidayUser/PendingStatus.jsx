import React from 'react'
import { MdHourglassEmpty, MdCheckCircle, MdCancel, MdRefresh } from 'react-icons/md'

export default function PendingStatus({ onReset, request, onNewRequest }) {
  // Get status info if request is provided
  const statusInfo = request ? getRequestStatus(request.status) : null
  
  // Check if request is processed (approved or rejected)
  const isProcessed = request?.status === 'approved' || request?.status === 'rejected'

  return (
    <section dir="rtl" className="min-h-screen bg-background px-6 py-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          {/* Icon based on status */}
          <div className="flex justify-center mb-8">
            {request?.status === 'approved' ? (
              <div className="bg-green-100 rounded-full p-8">
                <MdCheckCircle className="w-20 h-20 text-green-600" />
              </div>
            ) : request?.status === 'rejected' ? (
              <div className="bg-red-100 rounded-full p-8">
                <MdCancel className="w-20 h-20 text-red-600" />
              </div>
            ) : (
              <div className="bg-yellow-100 rounded-full p-8 animate-pulse">
                <MdHourglassEmpty className="w-20 h-20 text-yellow-600" />
              </div>
            )}
          </div>

          {/* Title */}
          {request?.status === 'approved' ? (
            <h2 className="text-3xl font-bold text-green-600 mb-4">تم قبول طلبك</h2>
          ) : request?.status === 'rejected' ? (
            <h2 className="text-3xl font-bold text-red-600 mb-4">تم رفض طلبك</h2>
          ) : (
            <h2 className="text-3xl font-bold text-primary mb-4">طلبك قيد الانتظار</h2>
          )}

          {/* Message */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {request?.status === 'approved' ? (
              <>تم الموافقة على طلبك من قبل الإدارة</>
            ) : request?.status === 'rejected' ? (
              <>تم رفض طلبك. يمكنك تقديم طلب جديد مرة أخرى</>
            ) : (
              <>
                شكراً لتقديمك طلب الإجازة الأسبوعية<br />
                تم استقبال طلبك بنجاح وهو حالياً قيد المراجعة من قبل الإدارة<br />
                سيتم إخطارك برد الإدارة خلال الفترة القادمة
              </>
            )}
          </p>

          {/* Status Indicator */}
          <div 
            className="border-2 rounded-xl p-6 mb-8"
            style={{
              backgroundColor: statusInfo?.bg || '#fff9c4',
              borderColor: statusInfo?.border || '#fde047'
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: statusInfo?.color || '#eab308' }}
              ></div>
              <p 
                className="font-bold text-lg"
                style={{ color: statusInfo?.text || '#854d0e' }}
              >
                {statusInfo?.label || 'قيد الانتظار - يرجى الانتظار'}
              </p>
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: statusInfo?.color || '#eab308' }}
              ></div>
            </div>
          </div>

          {/* Request Details */}
          {request && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-right">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-bold text-primary">الحالة:</span> {statusInfo?.label || 'قيد المراجعة'}
              </p>
              {request.reason && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-bold text-primary">السبب:</span> {request.reason}
                </p>
              )}
              {request.adminResponse && (
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-bold text-primary">رد الإدارة:</span> {request.adminResponse}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-bold text-primary">التاريخ:</span> {request.createdAt || new Date().toLocaleDateString('ar-EG')}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            {/* After approve/reject, show "تقديم طلب جديد" button */}
            {isProcessed && onNewRequest && (
              <button
                onClick={onNewRequest}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2"
              >
                <MdRefresh className="w-5 h-5" />
                تقديم طلب جديد
              </button>
            )}
            
            {/* Always show "العودة للرئيسية" button */}
            <button
              onClick={onReset}
              className="bg-accent text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-200"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Helper function for status info
function getRequestStatus(status) {
  switch (status) {
    case 'approved':
    case 'معتمد':
      return { bg: '#dcfce7', border: '#86efac', text: '#16a34a', label: '✓ تم الموافقة' }
    case 'rejected':
    case 'مرفوض':
      return { bg: '#fee2e2', border: '#fca5a5', text: '#dc2626', label: '✕ مرفوض' }
    case 'pending':
    case 'قيد الانتظار':
      return { bg: '#fff9c4', border: '#fde047', text: '#854d0e', label: '⏳ قيد الانتظار' }
    default:
      return { bg: '#f3f4f6', border: '#d1d5db', text: '#4b5563', label: 'غير معروف' }
  }
}
