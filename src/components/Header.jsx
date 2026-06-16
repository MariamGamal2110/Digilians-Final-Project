import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import client from '../api/client'

const studentMainLinks = [
  { label: 'الرئيسية', to: '/home' },
  { label: 'التصريح', to: '/statment' },
  { label: 'المصروفات', to: '/payment' },
  { label: 'حجز الأتوبيس', to: '/bus' },
  { label: 'الإجازات الرسمية', to: '/holiday' },
  { label: 'الالتماسات', to: '/execuse' },
  { label: 'المخالفات', to: '/punishment' },
]

const studentMoreLinks = [
  { label: 'الملف الشخصي', to: '/profile' },
  { label: 'سجلات الأقارب', to: '/relatives' },
  { label: 'السجل الطبي', to: '/medical' },
]

const adminMainLinks = [
  { label: 'الرئيسية', to: '/admin/home' },
  { label: 'التصريح', to: '/admin/statment' },
  { label: 'المصروفات', to: '/admin/payment' },
  { label: 'حجز الأتوبيس', to: '/admin/bus' },
  { label: 'الإجازات الرسمية', to: '/admin/holiday' },
  { label: 'الالتماسات', to: '/admin/execuse' },
  { label: 'المخالفات', to: '/admin/punishment' },
]

const adminMoreLinks = [
  { label: 'الملف الشخصي', to: '/admin/profile' },
  { label: 'سجلات الأقارب', to: '/admin/relatives' },
  { label: 'السجل الطبي', to: '/admin/medical' },
]

function getDefaultUser(isAdminMode) {
  if (isAdminMode) {
    return {
      name: 'Admin',
      role: 'لوحة التحكم',
      image: 'https://ui-avatars.com/api/?name=Admin&background=6b7440&color=fff',
    }
  }

  return {
    name: 'Student',
    role: 'طالب',
    image: 'https://ui-avatars.com/api/?name=Student&background=6b7440&color=fff',
  }
}

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const isAdminMode = location.pathname.startsWith('/admin')

  const mainLinks = isAdminMode ? adminMainLinks : studentMainLinks
  const moreLinks = isAdminMode ? adminMoreLinks : studentMoreLinks

  const [userToShow, setUserToShow] = useState({
    name: isAdminMode ? 'Admin' : 'طالب',
    role: isAdminMode ? 'لوحة التحكم' : 'طالب',
    image: `https://ui-avatars.com/api/?name=${isAdminMode ? 'Admin' : 'Student'}&background=6b7440&color=fff`,
  })

  useEffect(() => {
    try {
      const savedUser = client.getSavedUser(isAdminMode ? 'admin' : 'user')
      if (savedUser) {
        const displayName = savedUser.studentName || savedUser.name || savedUser.email || (isAdminMode ? 'Admin' : 'طالب')
        setUserToShow({
          name: displayName,
          role: isAdminMode ? 'لوحة التحكم' : 'طالب',
          image: savedUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=6b7440&color=fff`,
        })
      } else {
        setUserToShow(getDefaultUser(isAdminMode))
      }
    } catch (e) {
      console.error(e)
    }
  }, [isAdminMode, location.pathname])

  useEffect(() => {
    setMobileOpen(false)
    setUserDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownOpen && !event.target.closest('.user-dropdown-menu')) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userDropdownOpen])

  const handleLogout = () => {
    client.clearAuthData(isAdminMode ? 'admin' : 'user')
    window.location.href = '/signin'
  }

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
          
          {/* User Profile Dropdown Menu */}
          <div className="relative user-dropdown-menu">
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-[#f3f4ef] transition focus:outline-none"
            >
              <img
                src={userToShow.image}
                alt={userToShow.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#6b7440] cursor-pointer hover:opacity-90 transition"
              />

              <div className="text-right">
                <p className="text-[#1f220f] font-bold text-base leading-tight flex items-center gap-1">
                  {userToShow.name}
                  <span className="text-xs text-[#676b59]">▾</span>
                </p>

                <p className="text-[#676b59] text-sm">
                  {userToShow.role}
                </p>
              </div>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-56 overflow-hidden">
                {moreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive
                        ? 'block px-5 py-3 text-sm text-[#1f220f] font-bold bg-[#eef0e4]'
                        : 'block px-5 py-3 text-sm text-[#676b59] hover:bg-[#f3f4ef] hover:text-[#1f220f] transition'
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="border-t border-gray-100 my-1" />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-right block px-5 py-3 text-sm text-red-600 hover:bg-rose-50 hover:text-red-700 transition font-bold"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {mainLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={getLinkClass}>
                {link.label}
              </NavLink>
            ))}
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
                className={({ isActive }) =>
                  isActive
                    ? 'bg-[#eef0e4] text-[#1f220f] font-bold px-4 py-3 rounded-xl text-sm'
                    : 'text-[#676b59] hover:bg-[#f3f4ef] px-4 py-3 rounded-xl text-sm transition'
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-gray-100 my-1" />
            <button
              type="button"
              onClick={handleLogout}
              className="text-right text-red-600 hover:bg-rose-50 hover:text-red-700 px-4 py-3 rounded-xl text-sm transition font-bold"
            >
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </header>
  )
}