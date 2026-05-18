import { useState } from 'react'

const initialBookings = [
  { id: 1, name: 'خالد منصور السعدي', militaryId: '36971', destination: 'يرسمي', status: 'تم الحجز' },
  { id: 2, name: 'ياسين فهد القحطاني', militaryId: '23891', destination: 'المرج', status: 'تم الحجز' },
  { id: 3, name: 'إبراهيم سعيد العمودي', militaryId: '45678', destination: 'عبود', status: 'تم الحجز' },
  { id: 4, name: 'عمر حسن الجابري', militaryId: '23589', destination: 'السلام', status: 'تم الحجز' },
]

export default function BookAdmin() {
  const [bookingList, setBookingList] = useState(initialBookings)

  // حساب الإحصائيات ديناميكياً
  const stats = [
    { label: 'يرسمي', count: bookingList.filter(b => b.destination === 'يرسمي').length },
    { label: 'المرج', count: bookingList.filter(b => b.destination === 'المرج').length },
    { label: 'عبود', count: bookingList.filter(b => b.destination === 'عبود').length },
    { label: 'السلام', count: bookingList.filter(b => b.destination === 'السلام').length },
    { label: 'الغياب', count: 0 }, // يمكن ربطها بحالة معينة لاحقاً
  ]

  const handleConfirm = (id) => {
    setBookingList(bookingList.map(b =>
      b.id === id ? { ...b, status: 'مؤكد' } : b
    ))
  }

  const handleCancel = (id) => {
    setBookingList(bookingList.map(b =>
      b.id === id ? { ...b, status: 'اعتذار' } : b
    ))
  }

  return (
    <div dir="rtl" className="p-6">
      <div className="mb-6">
        <h2 className="text-primary font-bold text-lg mb-4 font-headline">إحصائيات وجهات الطلاب</h2>
        <div className="flex gap-3 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-[120px]">
              <p className="text-secondary text-xs mb-1">{s.label}</p>
              <p className="text-primary font-bold text-2xl">{s.count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-primary font-bold text-lg font-headline">طلبات الحجز الواردة</h2>
          <span className="text-secondary text-sm">إجمالي الطلاب: {bookingList.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-background/50">
                <th className="text-right text-secondary font-medium px-6 py-3">اسم الطالب</th>
                <th className="text-right text-secondary font-medium px-6 py-3">الرقم العسكري</th>
                <th className="text-right text-secondary font-medium px-6 py-3">الوجهة</th>
                <th className="text-right text-secondary font-medium px-6 py-3">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-background transition-colors">
                  <td className="px-6 py-4 text-primary font-bold">{b.name}</td>
                  <td className="px-6 py-4 text-secondary">{b.militaryId}</td>
                  <td className="px-6 py-4 text-secondary">{b.destination}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {b.status === 'مؤكد' ? (
                        <span className="text-accent text-xs font-bold">✅ مؤكد</span>
                      ) : b.status === 'اعتذار' ? (
                        <span className="text-red-500 text-xs font-bold">❌ اعتذار</span>
                      ) : (
                        <>
                          <button onClick={() => handleConfirm(b.id)} className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                            تأكيد الحجز
                          </button>
                          <button onClick={() => handleCancel(b.id)} className="border border-gray-200 text-secondary text-xs px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            اعتذار
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}