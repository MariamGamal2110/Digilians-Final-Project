import React, { useState, useEffect, useCallback } from 'react'
import HolidayPageHeader from '../../components/HoildayComponents/HolidayUser/HolidayPageHeader'
import HolidayChoiceSection from '../../components/HoildayComponents/HolidayUser/HolidayChoiceSection'
import HolidayForm from '../../components/HoildayComponents/HolidayUser/HolidayForm'
import HolidayFormSimple from '../../components/HoildayComponents/HolidayUser/HolidayFormSimple'
import HolidaySuccessAlert from '../../components/HoildayComponents/HolidayUser/HolidaySuccessAlert'
import PendingStatus from '../../components/HoildayComponents/HolidayUser/PendingStatus'
import { getSavedUser, getToken } from '../../api/client'
import { submitHolidayRequest, fetchMyRequests } from '../../api/holiday'

const DEFAULT_GOVERNORATE = 'اختر المحافظة'

// ✅ مفتاح localStorage لتتبع الطلبات اللي اتشافت
const SEEN_KEY = 'holiday_seen_request_ids'

function getSeenIds() {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')
  } catch {
    return []
  }
}

function markAsSeen(id) {
  const seen = getSeenIds()
  if (!seen.includes(id)) {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id]))
  }
}

function isSeen(id) {
  return getSeenIds().includes(String(id))
}

export default function HolidayUser() {
  const savedUser = getSavedUser()
  const [selectedChoice, setSelectedChoice] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPending, setShowPending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [myRequest, setMyRequest] = useState(null)
  const [myHistory, setMyHistory] = useState([])
  const [formData, setFormData] = useState({
    fullName: savedUser?.name || '',
    militaryId: savedUser?.militaryId || '',
    governorate: DEFAULT_GOVERNORATE,
    reason: '',
    hasAppeal: false,
  })

  const checkExistingRequest = useCallback(async () => {
    if (!getToken()) return

    try {
      const requests = await fetchMyRequests()
      setMyHistory(requests)

      // لو فيه pending دايماً بيظهر
      const pending = requests.find(r => r.status === 'pending')
      if (pending) {
        setMyRequest(pending)
        setShowPending(true)
        return
      }

      // ✅ approved/rejected بيظهر بس لو مش اتشاف قبل كده
      const recent = requests.find(r =>
        (r.status === 'approved' || r.status === 'rejected') &&
        !isSeen(r._id || r.id)
      )

      if (recent) {
        setMyRequest(recent)
        setShowPending(true)
      }
    } catch (err) {
      console.warn('Could not check existing requests:', err)
    }
  }, [])

  useEffect(() => {
    checkExistingRequest()
  }, [checkExistingRequest])

  const resetForm = () => {
    setFormData({
      fullName: savedUser?.name || '',
      militaryId: savedUser?.militaryId || '',
      governorate: DEFAULT_GOVERNORATE,
      reason: '',
      hasAppeal: false,
    })
  }

  const handleChoiceChange = (choice) => setSelectedChoice(choice)

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!getToken()) {
      alert('يرجى تسجيل الدخول أولاً')
      return
    }

    if (selectedChoice === 'yes') {
      if (!formData.fullName || !formData.militaryId) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    } else if (selectedChoice === 'no') {
      if (!formData.fullName || !formData.militaryId || formData.governorate === DEFAULT_GOVERNORATE || !formData.reason) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    }

    setLoading(true)
    try {
      const request = await submitHolidayRequest({
        reason: formData.reason || 'رغبه في النزول',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      })

      setMyRequest(request)
      setShowPending(true)
      setShowSuccess(true)
      checkExistingRequest()
    } catch (err) {
      alert(err.message || 'حدث خطأ أثناء تقديم الطلب')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setSelectedChoice('')
    resetForm()
  }

  const handleResetPending = () => {
    resetForm()
    setSelectedChoice('')
    setShowPending(false)
    setMyRequest(null)
    checkExistingRequest()
  }

  // ✅ لما يضغط "تقديم طلب جديد" نحفظ الطلب الحالي كـ "اتشاف"
  const handleNewRequest = () => {
    if (myRequest) {
      markAsSeen(myRequest._id || myRequest.id)
    }
    setShowPending(false)
    setMyRequest(null)
    setSelectedChoice('')
    resetForm()
  }

  return (
    <>
      {showPending ? (
        <PendingStatus
          onReset={handleResetPending}
          request={myRequest}
          onNewRequest={handleNewRequest}
        />
      ) : (
        <section dir="rtl" className="min-h-screen bg-background px-6 py-8">
          <div className="max-w-[1300px] mx-auto px-6">
            <HolidayPageHeader />

            <HolidayChoiceSection
              selectedChoice={selectedChoice}
              onChoiceChange={handleChoiceChange}
            />

            {selectedChoice === 'yes' && (
              <HolidayFormSimple
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
                loading={loading}
              />
            )}

            {selectedChoice === 'no' && (
              <HolidayForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
                loading={loading}
              />
            )}

            {showSuccess && (
              <HolidaySuccessAlert
                message="تم استقبال طلبك بنجاح\nسيتم مراجعة الطلب من قبل الإدارة بأقرب وقت ممكن"
                onClose={() => setShowSuccess(false)}
              />
            )}

            {myHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-primary mb-3">سجل طلباتك السابقة</h3>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#5f6f41' }}>
                        <th className="px-4 py-3 text-right text-white font-bold text-sm">الحالة</th>
                        <th className="px-4 py-3 text-right text-white font-bold text-sm">السبب</th>
                        <th className="px-4 py-3 text-right text-white font-bold text-sm">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myHistory.slice(0, 5).map((req) => (
                        <tr key={req._id} className="border-b border-gray-100">
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              req.status === 'approved' ? 'bg-green-100 text-green-700' :
                              req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {req.status === 'approved' ? '✓ مقبول' : req.status === 'rejected' ? '✕ مرفوض' : '⏳ قيد الانتظار'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 text-sm">{req.reason}</td>
                          <td className="px-4 py-3 text-gray-500 text-sm">{req.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}