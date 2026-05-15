import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const mainLinks = [
  { label: 'الرئيسية', to: '/app' },
  { label: 'التصريح', to: '/app/statment' },
  { label: 'المصروفات', to: '/app/payment' },
  { label: 'حجز الأتوبيس', to: '/app/bus' },
  { label: 'الإجازات الرسمية', to: '/app/holyday' },
  { label: 'الالتماسات', to: '/app/execuse' },
  { label: 'المخالفات', to: '/app/punishment' },
  { label: 'الرئيسية', to: '/' },
  { label: 'التصريح', to: '/StatmentUser' },
  { label: 'المصروفات', to: '/payment' },
  { label: 'حجز الأتوبيس', to: '/bus' },
  { label: 'الإجازات الرسمية', to: '/HolidayUser' },
  { label: 'الالتماسات', to: '/execuse' },
  { label: 'المخالفات', to: '/punishment' },
]

const moreLinks = [
  { label: 'الملف الشخصي', to: '/app/profile' },
  { label: 'سجلات الأقارب', to: '/app/relatives' },
  { label: 'السجل الطبي', to: '/app/medical' },
]

export default function Header() {
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAdminPage = location.pathname.includes('admin')

  const currentUser = isAdminPage
    ? {
        name: 'أحمد المنصور',
        role: 'مسؤول عام',
        image: '/images/admin-avatar.png',
      }
    : {
        name: 'أحمد محمد',
        role: 'طالب عسكري',
        image: '/images/student-avatar.png',
      }

const profileLink = isAdminPage ? '/app/profile-admin' : '/app/profile'

  useEffect(() => {
    function handleClickOutside(event) {
      if (moreOpen && !event.target.closest('.more-menu')) {
        setMoreOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [moreOpen])

  function getLinkClass({ isActive }) {
    if (isActive) {
      return 'bg-[#eef0e4] text-[#1f220f] font-bold px-4 py-2 rounded-full text-base'
    }

    return 'text-[#676b59] hover:bg-[#f3f4ef] hover:text-[#1f220f] px-4 py-2 rounded-full text-base transition'
  }

  return (
    <header dir="rtl" className="bg-[#f3f4ef]">
      <div className="w-full bg-white border-b border-gray-200 shadow-sm px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          <NavLink
            to={profileLink}
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-[#f3f4ef] transition"
          >
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#6b7440] cursor-pointer hover:opacity-90 transition"
            />

            <div className="text-right">
              <p className="text-[#1f220f] font-bold text-base leading-tight">
                {currentUser.name}
              </p>

              <p className="text-[#676b59] text-sm">
                {currentUser.role}
              </p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-2">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/app'}
                className={getLinkClass}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="relative more-menu">
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className="text-[#676b59] hover:bg-[#f3f4ef] hover:text-[#1f220f] px-4 py-2 rounded-full text-base transition flex items-center gap-1"
              >
                الإلتزامات
                <span className="text-xs">▾</span>
              </button>

              {moreOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-48 overflow-hidden">
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? 'block px-5 py-3 text-sm text-[#1f220f] font-bold bg-[#eef0e4]'
                          : 'block px-5 py-3 text-sm text-[#676b59] hover:bg-[#f3f4ef] hover:text-[#1f220f] transition'
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#1f220f] text-2xl"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 mt-3 pt-3 flex flex-col gap-2">
            {[...mainLinks, ...moreLinks].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-[#eef0e4] text-[#1f220f] font-bold px-4 py-3 rounded-xl text-sm'
                    : 'text-[#676b59] hover:bg-[#f3f4ef] px-4 py-3 rounded-xl text-sm transition'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}