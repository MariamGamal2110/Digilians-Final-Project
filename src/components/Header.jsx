import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const mainLinks = [
  { label: 'الرئيسية', to: '/' },
  { label: 'التصريح', to: '/statment' },
  { label: 'المصروفات', to: '/payment' },
  { label: 'حجز الأتوبيس', to: '/bus' },
  { label: 'الإجازات الرسمية', to: '/holyday' },
  { label: 'الالتماسات', to: '/execuse' },
  { label: 'المخالفات', to: '/punishment' },
]

const moreLinks = [
  { label: 'الملف الشخصي للطالب', to: '/profile' },
  { label: 'سجلات الأقارب', to: '/relatives' },
  { label: 'السجل الطبي', to: '/medical' },
]

const mockUser = {
  name: 'أحمد محمد',
  role: 'طالب عسكري',
  initials: 'أ',
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  React.useEffect(() => {
    function handleClickOutside(e) {
      if (moreOpen && !e.target.closest('.more-menu')) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [moreOpen])

  return (
    <header dir="rtl" className="bg-background border-b border-gray-200 shadow-sm">
      <div className="px-6 py-0 flex items-center justify-between">

        {/* يمين - اسم المستخدم */}
        <div className="flex items-center gap-3 py-3">
          <div className="text-right">
            <p className="text-primary font-bold text-sm leading-tight">{mockUser.name}</p>
            <p className="text-secondary text-xs">{mockUser.role}</p>
          </div>
       <NavLink to="/profile">
            <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent font-bold text-base hover:bg-accent/10 transition-colors cursor-pointer">
              {mockUser.initials}
            </div>
          </NavLink>
        </div>

        {/* وسط - روابط ديسكتوب */}
        <nav className="hidden md:flex items-center">
          {mainLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-primary font-bold px-4 py-5 border-b-2 border-accent text-sm'
                  : 'text-secondary hover:text-primary px-4 py-5 text-sm transition-colors'
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* الإلتزامات dropdown */}
          <div className="relative more-menu">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="text-secondary hover:text-primary px-4 py-5 text-sm transition-colors flex items-center gap-1"
            >
              الإلتزامات
              <span className="text-xs">▾</span>
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-0 bg-background border border-gray-200 rounded-b-lg shadow-lg z-50 min-w-48 overflow-hidden">
                {moreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'block px-5 py-3 text-sm text-primary font-bold bg-accent/10 border-r-2 border-accent'
                        : 'block px-5 py-3 text-sm text-secondary hover:bg-accent/10 hover:text-primary transition-colors'
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* زر الموبايل */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary text-xl py-3"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* قائمة الموبايل */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-gray-200 px-6 pb-4 flex flex-col">
          {[...mainLinks, ...moreLinks].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-3 text-sm text-primary font-bold border-r-2 border-accent'
                  : 'block px-3 py-3 text-sm text-secondary hover:text-primary border-b border-gray-100 transition-colors'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

    </header>
  )
}