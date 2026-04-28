import React from 'react'

export default function PermitHistorySection() {
  const historyRows = [
    { date: '٠١ سبتمبر ٢٠٢٣', task: 'إجازة اعتيادية', duration: '3 أيام', status: 'منتهية', deduction: 5 },
    { date: '١٥ أغسطس ٢٠٢٣', task: 'إجازة اعتيادية', duration: 'يومان', status: 'منتهية', deduction: 0 },
    { date: '١٠ يوليو ٢٠٢٣', task: 'إجازة اعتيادية', duration: 'يوم واحد', status: 'منتهية', deduction: 0 },
  ]

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-bold text-primary">سجل التصاريح السابقة</h3>
        <button className="text-secondary hover:text-primary text-sm font-bold transition-colors">عرض الكل</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-surface-dim/70 bg-white/30">
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">التاريخ</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">نوع المهمة</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">المدة</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الحالة</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">خصم الدرجات عند التأخير</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-dim/30">
            {historyRows.map((row) => (
              <tr className="hover:bg-surface-container-low/35 transition-colors" key={`${row.date}-${row.duration}`}>
                <td className="py-5 text-sm font-semibold text-on-surface">{row.date}</td>
                <td className="py-5 text-sm font-medium text-secondary">{row.task}</td>
                <td className="py-5 text-sm font-medium text-secondary">{row.duration}</td>
                <td className="py-5 text-sm font-medium text-green-600">{row.status}</td>
                <td className="py-5 text-sm font-bold">
                  {row.deduction > 0 ? (
                    <span className="text-rose-700">-{row.deduction}</span>
                  ) : (
                    <span className="text-emerald-700">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
