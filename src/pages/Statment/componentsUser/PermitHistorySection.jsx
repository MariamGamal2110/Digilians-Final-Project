import React from 'react'

export default function PermitHistorySection() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-bold text-primary">سجل التصاريح السابقة</h3>
        <button className="text-secondary hover:text-primary text-sm font-bold transition-colors">عرض الكل</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b-2 border-surface-dim">
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">التاريخ</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">نوع المهمة</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">المدة</th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-dim/30">
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-5 text-sm font-semibold text-on-surface">٠١ سبتمبر ٢٠٢٣</td>
              <td className="py-5 text-sm font-medium text-secondary">إجازة اعتيادية</td>
              <td className="py-5 text-sm font-medium text-secondary">3 أيام</td>
              <td className="py-5 text-sm font-medium text-green-600">منتهية</td>
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-5 text-sm font-semibold text-on-surface">١٥ أغسطس ٢٠٢٣</td>
              <td className="py-5 text-sm font-medium text-secondary">إجازة اعتيادية</td>
              <td className="py-5 text-sm font-medium text-secondary">يومان</td>
              <td className="py-5 text-sm font-medium text-green-600">منتهية</td>
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-5 text-sm font-semibold text-on-surface">١٠ يوليو ٢٠٢٣</td>
              <td className="py-5 text-sm font-medium text-secondary">إجازة اعتيادية</td>
              <td className="py-5 text-sm font-medium text-secondary">يوم واحد</td>
              <td className="py-5 text-sm font-medium text-green-600">منتهية</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
