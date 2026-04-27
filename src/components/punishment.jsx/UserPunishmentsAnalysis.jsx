import React from 'react'
import { FiAlertTriangle, FiMinusCircle, FiCheckCircle } from 'react-icons/fi'

export default function UserPunishmentsAnalysis({ studentName }) {
  const totalPunishments = 3
  const deductedPoints = 12
  const remainingPoints = 88

  const analysisCards = [
    {
      title: 'عدد المخالفات',
      value: totalPunishments,
      description: 'إجمالي المخالفات المسجلة',
      icon: <FiAlertTriangle size={22} />,
    },
    {
      title: 'الدرجات المخصومة',
      value: deductedPoints,
      description: 'إجمالي الخصم من الدرجات العسكريه',
      icon: <FiMinusCircle size={22} />,
    },
    {
      title: 'باقي الدرجات',
      value: remainingPoints,
      description: 'الدرجات العسكريه المتبقية للطالب',
      icon: <FiCheckCircle size={22} />,
    },
  ]

  return (
    <div className="mb-6">
      <div className="mb-6 text-right">
        <p className="text-[#6b6f5a] text-sm mb-2">
          ملخص المخالفات والسلوك
        </p>

        <h2 className="text-[#1f220f] text-3xl font-extrabold">
          بيان مخالفات الطالب {studentName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {analysisCards.map((card) => (
          <div
            key={card.title}
            className="group bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#c8cdb8]"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] border border-[#e5dfd0] flex items-center justify-center text-[#1f220f] transition-all duration-300 group-hover:bg-[#555d30] group-hover:text-white">
                {card.icon}
              </div>

              <div className="text-right">
                <p className="text-[#6b6f5a] text-sm mb-2">
                  {card.title}
                </p>

                <p className="text-[#1f220f] text-4xl font-extrabold">
                  {card.value}
                </p>
              </div>
            </div>

            <div className="bg-[#faf9f4] rounded-xl px-4 py-3 text-right">
              <p className="text-[#6b6f5a] text-sm">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}