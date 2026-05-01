import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const sideLinks = [
  { label: 'التصريح', to: '/app/admin-home', icon: '✅' },
  { label: 'المصروفات', to: '/app/admin-payment', icon: '💰' },
  { label: 'حجز الأرشيف', to: '/app/admin-bus', icon: '🚌' },
  { label: 'الإعلانات', to: '/app/admin-announcements', icon: '📢' },
  { label: 'الملف الشخصي', to: '/app/profile-admin', icon: '👤' },
]

export default function LayoutAdmin() {
  const [search, setSearch] = useState('')

  return (
    <div dir="rtl" className="min-h-screen bg-background flex">

      {/* Sidebar */}
      <aside className="w-52 bg-white border-l border-gray-200 flex flex-col fixed right-0 top-0 h-full z-40">
        
        {/* لوجو */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-bold">
              🏛
            </div>
            <div>
              <p className="text-primary font-bold text-xs leading-tight">لوحة التحكم</p>
              <p className="text-secondary text-xs">نظام الإدارة بالأكاديمية</p>
            </div>
          </div>
        </div>

        {/* روابط */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {sideLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-accent text-white font-bold text-sm'
                  : 'flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-background text-sm transition-colors'
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* فوتر السايدبار */}
        <div className="p-4 border-t border-gray-100 text-center">
          <p className="text-primary font-bold text-xs">الواجب • الشرف • الوطن</p>
          <p className="text-secondary text-xs mt-1">© 2026 نظام سجل السيادة</p>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 mr-52 flex flex-col">

        {/* هيدر */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <p className="text-primary font-bold text-sm">سجل السيادة</p>
          </div>

          {/* بحث */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-background border border-gray-200 rounded-xl px-4 py-2">
              <span className="text-secondary text-sm">🔍</span>
              <input
                type="text"
                placeholder="بحث ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-primary outline-none w-40"
              />
            </div>
            <button className="text-secondary hover:text-primary text-xl transition-colors">🔔</button>
          </div>

          {/* اسم المسؤول */}
          <NavLink to="/app/profile-admin" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="text-right">
              <p className="text-primary font-bold text-sm">أحمد المنصور</p>
              <p className="text-secondary text-xs">نظام الإدارة بالأكاديمية</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent font-bold">
              أ
            </div>
          </NavLink>
        </header>

        {/* الصفحات */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}