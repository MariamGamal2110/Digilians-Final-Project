import { useState, useEffect } from 'react'
import { getToken } from  '../../api/client'

const divisions = ['ماجستير العلوم 24 شهراً', 'الماجستير المهني 12 شهراً', 'الدبلوم المتخصص 9 أشهر', 'الدبلوم المكثف 4 أشهر']
const stations = ['محطة الصعود', 'محطة الإسكندرية', 'محطة الكاندرد', 'محطة الهبوط']

export default function BookUser() {
  const [form, setForm] = useState({
    studentId: '',
    studentName: '',
    division: '',
    boardingStation: '',
    alightingStation: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previousBookings, setPreviousBookings] = useState([])

  // جلب الحجوزات السابقة
  useEffect(() => {
    if (form.studentId.length > 3) {
      fetchMyBookings(form.studentId)
    }
  }, [form.studentId])
useEffect(() => {
  const hasPending = previousBookings.some(b => b.status === 'pending')
  if (!hasPending || form.studentId.length <= 3) return

  const interval = setInterval(() => {
    fetchMyBookings(form.studentId)
  }, 10000)

  return () => clearInterval(interval)
}, [previousBookings, form.studentId])

  const fetchMyBookings = async (studentId) => {
  try {
    const token = getToken('user')
    const res = await fetch(`http://localhost:5000/api/booking/my/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (data.success && Array.isArray(data.data)) {
      setPreviousBookings(data.data)
    } else {
      setPreviousBookings([])
    }
  } catch (err) {
    console.error('خطأ في جلب الحجوزات:', err)
    setPreviousBookings([])
  }
}

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = async () => {
    if (!form.division || !form.studentId || !form.studentName || !form.boardingStation || !form.alightingStation) {
      setError('يرجى تعبئة جميع الحقول المطلوبة')
      return
    }

    setLoading(true)
    setError('')

    try {
      const token = getToken('user')
      const res = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        fetchMyBookings(form.studentId)
      } else {
        setError(data.message || 'حدث خطأ، حاول مرة أخرى')
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusLabel = (status) => {
    if (status === 'confirmed') return { text: 'تم الحجز ✅', color: 'text-accent' }
    if (status === 'rejected') return { text: 'مرفوض ❌', color: 'text-red-400' }
    return { text: 'قيد الانتظار ⏳', color: 'text-secondary' }
  }

  return (
    <div dir="rtl" className="bg-background">

      {/* هيدر الصفحة */}
      <div className="bg-secondary px-8 py-12 mb-6">
        <h1 className="text-background font-bold text-4xl leading-relaxed mb-3">
          احجز مكانك في
          <br />
          حافلة الإجازة الأسبوعية
        </h1>
        <p className="text-accent text-sm leading-relaxed max-w-sm">
          نظام الأكاديمية الإلكتروني لحجز الحافلات العسكرية
          <br />
          لضمان رحلة مريحة وآمنة لجميع أبنائها
        </p>
      </div>

      <div className="px-6 pb-6 flex gap-6">

        {/* يمين - بيانات الحجز */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-primary font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
            بيانات الحجز
          </h2>

          {/* القسم الدراسي */}
          <div className="mb-4">
            <label className="text-secondary text-xs mb-1 block">القسم الدراسي</label>
            <select
              value={form.division}
              onChange={(e) => handleChange('division', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
            >
              <option value="">اختر القسم</option>
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* اسم الطالب */}
          <div className="mb-4">
            <label className="text-secondary text-xs mb-1 block">اسم الطالب</label>
            <input
              type="text"
              value={form.studentName}
              onChange={(e) => handleChange('studentName', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
            />
          </div>

          {/* الرقم العسكري */}
          <div className="mb-4">
            <label className="text-secondary text-xs mb-1 block">الرقم العسكري</label>
            <input
              type="text"
              value={form.studentId}
              onChange={(e) => handleChange('studentId', e.target.value)}
              placeholder="أدخل رقمك العسكري"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
            />
          </div>

          {/* محطة الصعود والهبوط */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <label className="text-secondary text-xs mb-1 block">محطة الصعود</label>
              <select
                value={form.boardingStation}
                onChange={(e) => handleChange('boardingStation', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
              >
                <option value="">اختر المحطة</option>
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-secondary text-xs mb-1 block">وقت العودة المطلوب</label>
              <select
                value={form.alightingStation}
                onChange={(e) => handleChange('alightingStation', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
              >
                <option value="">اختر الموعد</option>
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs mb-3 text-center">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || submitted}
            className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {loading ? 'جاري الإرسال...' : submitted ? '✅ تم إرسال الطلب' : 'تأكيد عملية الحجز'}
          </button>
        </div>

        {/* يسار - ملخص + سجل */}
        <div className="w-72 flex flex-col gap-4">

          {/* ملخص الحجز */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🚌</span>
              <span className="text-primary font-bold text-sm">ملخص الحجز</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary">رقم الحافلة</span>
                <span className="text-primary font-medium">AC-4427</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">وقت التحرك</span>
                <span className="text-primary font-medium">02:00 ظهراً</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">وقت العودة</span>
                <span className="text-primary font-medium">{form.alightingStation || '—'}</span>
              </div>
              <hr className="border-gray-100 my-2" />
              <div className="flex justify-between">
                <span className="text-secondary">إجمالي التكلفة</span>
                <span className="text-primary font-bold text-base">50 ج.م</span>
              </div>
            </div>
          </div>

          {/* سجل الحجوزات السابقة */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-primary font-bold text-sm mb-3">سجل الحجوزات السابقة</h3>
            {previousBookings.length === 0 ? (
              <p className="text-secondary text-xs text-center py-2">لا توجد حجوزات سابقة</p>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-right text-secondary font-medium pb-2">التاريخ</th>
                    <th className="text-right text-secondary font-medium pb-2">الوجهة</th>
                    <th className="text-right text-secondary font-medium pb-2">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {previousBookings.map((b) => {
                    const statusInfo = getStatusLabel(b.status)
                    return (
                      <tr key={b._id} className="border-b border-gray-50">
                        <td className="py-2 text-secondary">
                          {new Date(b.createdAt).toLocaleDateString('ar-EG')}
                        </td>
                        <td className="py-2 text-primary font-medium">{b.boardingStation}</td>
                        <td className={`py-2 font-medium ${statusInfo.color}`}>{statusInfo.text}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}