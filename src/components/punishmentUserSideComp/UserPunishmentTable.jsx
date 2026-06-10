import React from 'react'
import { FiClock, FiShield, FiSun } from 'react-icons/fi'

function PunishmentIcon({ type }) {
  let icon = <FiClock size={18} />

  if (type === 'uniform') {
    icon = <FiShield size={18} />
  }

  if (type === 'sleep') {
    icon = <FiSun size={18} />
  }

  return (
    <div className="w-9 h-9 rounded-lg bg-[#f3f1e8] border border-[#e5dfd0] flex items-center justify-center text-[#1f220f]">
      {icon}
    </div>
  )
}

export default function UserPunishmentTable({ punishments = [] }) {
  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="text-right">
          <h2 className="text-[#1f220f] text-lg font-bold">
            جدول المخالفات
          </h2>

          <p className="text-[#6b6f5a] text-sm mt-1">
            عرض المخالفات المسجلة والعقوبات الخاصة بها
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#555d30] text-white flex items-center justify-center font-bold">
          {punishments.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-[#f3f1e8] text-[#1f220f]">
              <th className="px-5 py-3 font-bold w-[70px]">#</th>
              <th className="px-5 py-3 font-bold">المخالفة</th>
              <th className="px-5 py-3 font-bold">العقوبة</th>
              <th className="px-5 py-3 font-bold text-center">
                العقوبة بالدرجات
              </th>
            </tr>
          </thead>

          <tbody>
            {punishments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  لا توجد مخالفات مسجلة
                </td>
              </tr>
            ) : (
              punishments.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-[#faf9f4] transition"
                >
                  <td className="px-5 py-4 text-[#555d30] font-bold">
                    {i + 1}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <PunishmentIcon type={row.type} />

                      <div>
                        <p className="text-[#1f220f] font-bold">
                          {row.violation}
                        </p>

                        <p className="text-[#7a7a68] text-xs mt-1">
                          مخالفة مسجلة على الطالب
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#1f220f] font-bold">
                    {row.punishment}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <span className="w-9 h-9 rounded-full bg-[#555d30] text-white flex items-center justify-center font-bold">
                        {row.degree ?? 0}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
