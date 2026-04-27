import { FiClipboard, FiEdit3, FiUserCheck, FiUsers } from 'react-icons/fi'

const statsCards = [
  {
    title: 'العدد الإجمالي',
    value: '1,250',
    description: 'طالب بالأكاديمية',
    icon: <FiUsers size={24} />,
  },
  {
    title: 'الحاضرون',
    value: '1,240',
    description: '94% نسبة الحضور',
    icon: <FiUserCheck size={24} />,
  },
  {
    title: 'الالتماسات',
    value: '7',
    description: ' الالتماسات لخارج الأكاديميه العسكريه   ',
    icon: <FiEdit3 size={24} />,
  },
  {
    title: ' المفصولون',
    value: '3',
    description: '  تم الفصل تحت المراجعة الإدارية',
    icon: <FiClipboard size={24} />,
  },
]

export default function AdminStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
      {statsCards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 min-h-[155px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-full h-1 bg-[#555d30]"></div>

          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] text-[#555d30] flex items-center justify-center">
              {card.icon}
            </div>

            <span className="bg-[#f3f1e8] text-[#555d30] px-3 py-1 rounded-full text-xs font-bold">
              {card.title}
            </span>
          </div>

          <div className="text-right">
            <p className="text-[#1f220f] text-4xl font-extrabold mb-2">
              {card.value}
            </p>

            <p className="text-[#6b6f5a] text-xs font-medium leading-6">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}