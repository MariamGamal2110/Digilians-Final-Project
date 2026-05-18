import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getSavedUser } from '../api/client'

const adminRoles = ['commander', 'admin', 'super_admin']

const studentMainLinks = [
  { label: 'الرئيسية', to: '/home' },
  { label: 'التصريح', to: '/StatmentUser' },
  { label: 'المصروفات', to: '/paymentUser' },
  { label: 'حجز الأتوبيس', to: '/bus' },
  { label: 'الإجازات الرسمية', to: '/HolidayUser' },
  { label: 'الالتماسات', to: '/execuse' },
  { label: 'المخالفات', to: '/punishment' },
]

const moreLinks = [
<<<<<<< HEAD
  { label: 'الملف الشخصي', to: '/profile' },
  { label: 'سجلات الأقارب', to: '/relatives' },
  { label: 'السجل الطبي', to: '/MedicalUser' },
=========
  { label: 'الملف الشخصي', to: '/app/profile' },
  { label: 'سجلات الأقارب', to: '/app/relatives' },
  { label: 'السجل الطبي', to: '/app/medical' },
>>>>>>>>> Temporary merge branch 2
]

export default function Header() {
  const location = useLocation()

  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => getSavedUser())

  useEffect(() => {
    setCurrentUser(getSavedUser())
  }, [location.pathname])

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

  const isAdminMode =
    adminRoles.includes(currentUser?.role) ||
    (!currentUser?.role && isAdminRoute(location.pathname))

  const mainLinks = isAdminMode ? adminMainLinks : studentMainLinks
  const moreLinks = isAdminMode ? adminMoreLinks : studentMoreLinks
  const profileLink = isAdminMode ? '/profile-admin' : '/profile'

  const defaultUser = getDefaultUser(isAdminMode)

  const userImage = currentUser?.image?.includes('ui-avatars.com')
    ? defaultUser.image
    : currentUser?.image || defaultUser.image

  const userToShow = {
    name: currentUser?.name || defaultUser.name,
    role: getRoleLabel(currentUser?.role, isAdminMode),
    image: userImage,
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
          <NavLink
            to={profileLink}
            className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-[#f3f4ef] transition"
          >
            <img
              src={userToShow.image}
              alt={userToShow.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#6b7440] cursor-pointer hover:opacity-90 transition"
            />

            <div className="text-right">
              <p className="text-[#1f220f] font-bold text-base leading-tight">
                {userToShow.name}
              </p>

              <p className="text-[#676b59] text-sm">
                {userToShow.role}
              </p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-2">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
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