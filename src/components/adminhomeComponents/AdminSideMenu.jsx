import {
  FiCalendar,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiShield,
  FiUser,
} from 'react-icons/fi'

const menuItems = [
  {
    title: 'التصريح',
    icon: <FiCalendar size={18} />,
  },
  {
    title: 'المصروفات',
    icon: <FiCreditCard size={18} />,
  },
  {
    title: 'حجز الأوتوبيس',
    icon: <FiShield size={18} />,
    active: true,
  },
  {
    title: 'الإعلانات',
    icon: <FiFileText size={18} />,
  },
  {
    title: 'الملف الشخصي',
    icon: <FiUser size={18} />,
  },
]

export default function AdminSideMenu() {
  return (
    <aside className="w-64 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] flex items-center justify-center text-[#555d30]">
          <FiHome size={22} />
        </div>

        <div>
          <h2 className="text-[#1f220f] font-extrabold text-base">
            السجل السيادي
          </h2>

          <p className="text-[#6b6f5a] text-xs mt-1">
            نظام الإدارة بالأكاديمية
          </p>
        </div>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.title}
            type="button"
            className={
              item.active
                ? 'w-full flex items-center justify-between rounded-xl bg-[#f3f1e8] text-[#1f220f] px-4 py-3 font-bold'
                : 'w-full flex items-center justify-between rounded-xl text-[#555d30] px-4 py-3 font-bold hover:bg-[#f8f7f2] transition'
            }
          >
            <span>{item.title}</span>
            {item.icon}
          </button>
        ))}
      </nav>
    </aside>
  )
}