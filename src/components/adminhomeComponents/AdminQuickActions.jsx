import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiSettings } from 'react-icons/fi'

export default function AdminQuickActions() {
  const navigate = useNavigate()

  function goToSettings() {
    navigate('/profile-admin')
  }

  function logout() {
    localStorage.clear()
    sessionStorage.clear()

    navigate('/')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <button
        type="button"
        onClick={goToSettings}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 mb-3 bg-[#555d30] text-white font-bold hover:bg-[#454c27] active:scale-[0.98] transition-all duration-200"
      >
        <span>الملف الشخصي</span>
        <FiSettings size={18} />
      </button>

      <button
        type="button"
        onClick={logout}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-[#1f220f] font-bold bg-[#f3f1e8] hover:bg-[#e8e5dc] active:scale-[0.98] transition-all duration-200"
      >
        <span>تسجيل خروج</span>
        <FiLogOut size={18} />
      </button>
    </div>
  )
}