import React from 'react'
import { FiClock } from 'react-icons/fi'

export default function PermitHistorySection({ history = [], loading = false }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-bold text-primary">
          سجل التصاريح السابقة
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-surface-dim/70 bg-white/30">
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">
                التاريخ
              </th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">
                نوع المهمة
              </th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">
                المدة
              </th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">
                وقت الوصول
              </th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">
                الحالة
              </th>
              <th className="pb-4 pt-2 text-xs font-bold text-secondary tracking-widest uppercase text-center">
                خصم الدرجات عند التأخير
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-dim/30">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  جاري تحميل السجل...
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-secondary">
                  لا يوجد سجل وصول حتى الآن
                </td>
              </tr>
            ) : (
              history.map((row) => (
                <tr
                  className="hover:bg-surface-container-low/35 transition-colors"
                  key={row._id}
                >
                  <td className="py-5 text-sm font-semibold text-on-surface">
                    {row.date}
                  </td>

                  <td className="py-5 text-sm font-medium text-secondary">
                    {row.task}
                  </td>

                  <td className="py-5 text-sm font-medium text-secondary">
                    {row.duration}
                  </td>

                  <td className="py-5 text-sm font-medium text-secondary">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-primary" />
                      {row.time}
                    </div>
                  </td>

                  <td
                    className={`py-5 text-sm font-medium ${
                      row.status === 'متأخر' ? 'text-rose-700' : 'text-green-600'
                    }`}
                  >
                    {row.status}
                  </td>

                  <td className="py-5 text-sm font-bold text-center">
                    {row.deduction > 0 ? (
                      <span className="text-rose-700">-{row.deduction}</span>
                    ) : (
                      <span className="text-emerald-700">0</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
