import { useState } from 'react'

const divisions = ['ماجستير العلوم 24 شهراً',' الماجستير المهني  12 شهراً', ' الدبلوم المتخصص 9 أشهر', ' الدبلوم المكثف 4 أشهر']
const stations = ['محطة الصعود', 'محطة الإسكندرية', 'محطة الكاندرد', 'محطة الهبوط']

const returnTimes = ['09:00 مساءً الخميس', '10:00 مساءً الخميس', '09:00 مساءً الجمعة']

const previousBookings = [
  { date: '18 يناير 2023', destination: 'الكاندرد', returnStatus: 'هلة وذم' },
  { date: '05 ونزن 2023', destination: 'الاسكندرية', returnStatus: 'هلة وذم' },
]

export default function BookUser() {
  const [form, setForm] = useState({
    division: '',
    studentId: '',
    boardingStation: '',
    alightingStation: '',
    departureTime: '',
    returnTime: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.division || !form.studentId || !form.boardingStation || !form.alightingStation) {
      alert('يرجى تعبئة جميع الحقول المطلوبة')
      return
    }
    setSubmitted(true)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background">

      {/* هيدر الصفحة */}
      <div className="relative bg-secondary overflow-hidden">
        <div className="px-8 py-12">
          <h1 className="text-background font-bold text-4xl leading-relaxed mb-3">
            احجز مكائك في
            <br />
            حافلة الإجازة الأسبوعية
          </h1>
          <p className="text-accent text-sm leading-relaxed max-w-sm">
            نظام الكاديمية الإلكتروني لحجز الحلالب العسكرية
            <br />
            لاحدهمان مريحة واتحة من واي جدانه.
          </p>
        </div>
      </div>

      <div className="p-6 flex gap-6">

        {/* يمين - بيانات الحجز */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-primary font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
            بيانات الحجز
          </h2>

          {/* القسم الأكبر */}
          <div className="mb-4">
            <label className="text-secondary text-xs mb-1 block">القسم الأكبر</label>
            <select
              value={form.division}
              onChange={(e) => handleChange('division', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
            >
              <option value="">اختر القسم</option>
              {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* رقم الطالب */}
          <div className="mb-4">
            <label className="text-secondary text-xs mb-1 block">رقم الطالب</label>
            <input
              type="text"
              value={form.studentId}
              onChange={(e) => handleChange('studentId', e.target.value)}
              placeholder="أدخل رقمك العسكري"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
            />
          </div>

          {/* محطة الصعود والهبوط */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-secondary text-xs mb-1 block">محطة الصعود</label>
              <select
                value={form.boardingStation}
                onChange={(e) => handleChange('boardingStation', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
              >
                <option value="">اختر</option>
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-secondary text-xs mb-1 block">محطة الهبوط</label>
              <select
                value={form.alightingStation}
                onChange={(e) => handleChange('alightingStation', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
              >
                <option value="">اختر</option>
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* زر التأكيد */}
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:bg-secondary transition-colors"
          >
            تأكيد عملية الحجز
          </button>

          {submitted && (
            <p className="text-accent text-sm text-center mt-3 font-medium">✅ تم الحجز بنجاح!</p>
          )}
        </div>

        {/* يسار - تفاصيل + سجل */}
        <div className="w-72 flex flex-col gap-4">

          {/* تفاصيل الحجز */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-sm">🚌</span>
              <span className="text-primary font-bold text-sm">تفاصيل الحجز</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-secondary">الذر رثمر</span>
                <span className="text-primary font-medium">AC-4427</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary">الرخطة</span>
                <span className="w-2 h-2 bg-accent rounded-full"></span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">واو التمريس</span>
                <span className="text-primary font-medium">{form.departureTime || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">وقت العودة</span>
                <span className="text-primary font-medium">{form.returnTime || '—'}</span>
              </div>
              <hr className="border-gray-100 my-2" />
              <div className="flex justify-between">
                <span className="text-secondary">ارجملك الوجملة</span>
                <span className="text-primary font-bold text-base">50 م.م</span>
              </div>
            </div>
            <div className="mt-3 bg-background rounded-xl p-3 text-xs text-secondary text-center">
              حجزك الحشتري تصوريت الخسكرية الحجو الحتية 0.0
            </div>
          </div>

          {/* إلح الحجوزات */}
          <div className="bg-primary rounded-2xl p-5">
            <p className="text-background font-bold text-sm mb-1">إلح الحجوزات</p>
            <p className="text-accent text-xs">إركس الرجالقة</p>
          </div>

          {/* سجل الحجوزات السابقة */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-primary font-bold text-sm mb-3">سجل الحجوزات السابقة</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right text-secondary font-medium pb-2">الخارج</th>
                  <th className="text-right text-secondary font-medium pb-2">الدريبة</th>
                  <th className="text-right text-secondary font-medium pb-2">الخارج</th>
                </tr>
              </thead>
              <tbody>
                {previousBookings.map((b, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 text-secondary">{b.returnStatus}</td>
                    <td className="py-2 text-primary font-medium">{b.destination}</td>
                    <td className="py-2 text-secondary">{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}