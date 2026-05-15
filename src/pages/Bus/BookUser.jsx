import { useState } from 'react'

const divisions = ['ماجستير العلوم 24 شهراً', 'الماجستير المهني 12 شهراً', 'الدبلوم المتخصص 9 أشهر', 'الدبلوم المكثف 4 أشهر']
const stations = ['محطة الإسكندرية', 'محطة الكاندرد', 'محطة المرج', 'محطة عبود']
const returnTimes = ['09:00 مساءً الخميس', '10:00 مساءً الخميس', '09:00 مساءً الجمعة']

const previousBookings = [
  { date: '18 يناير 2023', destination: 'الكاندرد', status: 'تم الحجز' },
  { date: '05 يونيو 2023', destination: 'الإسكندرية', status: 'تم الحجز' },
]

export default function BookUser() {
  const [form, setForm] = useState({
    division: '',
    studentId: '',
    boardingStation: '',
    alightingStation: '',
    departureTime: '02:00 ظهراً', // قيمة افتراضية
    returnTime: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.division || !form.studentId || !form.boardingStation || !form.alightingStation || !form.returnTime) {
      alert('يرجى تعبئة جميع الحقول المطلوبة واختيار وقت العودة')
      return
    }
    setSubmitted(true)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background font-headline">
      {/* هيدر الصفحة */}
      <div className="relative bg-secondary overflow-hidden">
        <div className="px-8 py-12">
          <h1 className="text-background font-bold text-4xl leading-relaxed mb-3">
            احجز مكانك في
            <br />
            حافلة الإجازة الأسبوعية
          </h1>
          <p className="text-accent text-sm leading-relaxed max-w-sm">
            نظام الأكاديمية الإلكتروني لحجز الحافلات العسكرية
            <br />
            لضمان رحلة مريحة وآمنة لجميع أبنائنا.
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* يمين - بيانات الحجز */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-primary font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
            بيانات الحجز
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="text-secondary text-xs mb-1 block">القسم الدراسي</label>
              <select value={form.division} onChange={(e) => handleChange('division', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-background focus:ring-1 focus:ring-accent outline-none">
                <option value="">اختر القسم</option>
                {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="mb-2">
              <label className="text-secondary text-xs mb-1 block">الرقم العسكري</label>
              <input type="text" value={form.studentId} onChange={(e) => handleChange('studentId', e.target.value)} placeholder="أدخل رقمك العسكري" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-background focus:ring-1 focus:ring-accent outline-none" />
            </div>

            <div className="mb-2">
              <label className="text-secondary text-xs mb-1 block">محطة الصعود</label>
              <select value={form.boardingStation} onChange={(e) => handleChange('boardingStation', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-background focus:ring-1 focus:ring-accent outline-none">
                <option value="">اختر المحطة</option>
                {stations.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="mb-2">
              <label className="text-secondary text-xs mb-1 block">وقت العودة المطلوب</label>
              <select value={form.returnTime} onChange={(e) => handleChange('returnTime', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-background focus:ring-1 focus:ring-accent outline-none">
                <option value="">اختر الموعد</option>
                {returnTimes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full mt-6 bg-primary text-background font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-md">
            تأكيد عملية الحجز
          </button>

          {submitted && <p className="text-accent text-center mt-4 font-bold">✅ تم إرسال طلب الحجز بنجاح!</p>}
        </div>

        {/* يسار - تفاصيل + سجل */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-sm">🚌</span>
              <span className="text-primary font-bold text-sm">ملخص الحجز</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-secondary">رقم الحافلة</span><span className="text-primary font-medium">AC-4427</span></div>
              <div className="flex justify-between"><span className="text-secondary">وقت التحرك</span><span className="text-primary font-medium">{form.departureTime}</span></div>
              <div className="flex justify-between"><span className="text-secondary">وقت العودة</span><span className="text-primary font-medium">{form.returnTime || '—'}</span></div>
              <hr className="border-gray-100" />
              <div className="flex justify-between items-center"><span className="text-secondary text-sm">إجمالي التكلفة</span><span className="text-primary font-bold text-lg">50 ج.م</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-primary font-bold text-sm mb-3">سجل الحجوزات السابقة</h3>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-gray-100 text-secondary">
                  <th className="text-right pb-2">التاريخ</th>
                  <th className="text-right pb-2">الوجهة</th>
                  <th className="text-right pb-2">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {previousBookings.map((b, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 text-secondary">{b.date}</td>
                    <td className="py-2 text-primary font-medium">{b.destination}</td>
                    <td className="py-2 text-accent">{b.status}</td>
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