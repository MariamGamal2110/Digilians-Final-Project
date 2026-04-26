export default function HomeUser() {
  const mockUser = {
    name: 'أحمد محمد',
    militaryId: '12489',
  }

  const schedule = [
    { time: '4:45 صباحًا', activity: 'تربية عسكرية' },
    { time: '5:30 صباحًا', activity: 'جري و اصطفاف الطلاب' },
    { time: '5:50 - 7:00 صباحًا', activity: 'تطوير لياقة' },
    { time: '7:30 صباحًا', activity: 'جري و اصطفاف الطلاب' },
    { time: '8:00 - 8:30 صباحًا', activity: 'وجبة الإفطار' },
  ]

  return (
    <div dir="rtl" className="p-6">

      {/* بانر الترحيب */}
      <div className="bg-secondary rounded-2xl p-8 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-background text-3xl font-bold mb-2">
            أهلا، {mockUser.name}
          </h1>
          <p className="text-primary text-sm leading-relaxed">
            مرحبًا بك في منصة الأكاديمية العسكرية للدورات المدنية
            <br />
            مسارك وتفوقك هدفنا اليوم.
          </p>
        </div>
        <div className="bg-background/10 border border-accent/30 rounded-xl px-6 py-4 text-center">
          <p className="text-primary text-sm leading-relaxed">الرقم العسكري</p>
          <p className="text-background font-bold text-2xl">{mockUser.militaryId}</p>
        </div>
      </div>

      {/* القسم الرئيسي - جدول + الحالة */}
      <div className="flex gap-6">

        {/* جدول توقيتات الأكاديمية - يمين */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
            جدول توقيتات الأكاديمية
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right text-secondary font-medium pb-3">الوقت</th>
                <th className="text-right text-secondary font-medium pb-3">النشاط التدريبي</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-secondary text-xs">{row.time}</td>
                  <td className="py-3 text-primary font-medium">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الحالة الأكاديمية - يسار */}
        <div className="w-72 flex flex-col gap-4">

          {/* كارد الحالة */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-primary font-bold text-lg mb-4 flex items-center gap-2">
              <span>🏆</span>
              الحالة الأكاديمية
            </h2>
            <p className="text-secondary text-xs mb-1">التقدم الكلي</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-primary font-bold text-2xl">94%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
              <div className="bg-accent h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <p className="text-secondary text-xs leading-relaxed">
              استمر على هذا الأداء الرائع. 
            </p>
          </div>

          {/* كارد الأكاديمية */}
          <div className="bg-secondary rounded-2xl p-5 text-center">
            <div className="text-background font-bold text-sm mb-1">الأكاديمية العسكرية</div>
            <div className="text-primary text-sm leading-relaxed">الساعة الكبرى</div>
          </div>

          {/* كارد تنبيهات */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span>📢</span>
              <span className="text-primary font-bold text-sm">تنبيهات هامة</span>
            </div>
            <p className="text-secondary text-xs leading-relaxed">
              على جميع الطلاب الالتزام  بجميع التوقيتات
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}