import { useEffect, useState } from 'react'
import { FiMail, FiUserCheck } from 'react-icons/fi'

function getAdminInitials(name = '') {
  const normalizedName = name.trim()

  if (!normalizedName) {
    return 'A'
  }

  return normalizedName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function AdminInfoHeader({
  admin = {},
  contacts = {},
  avatarSrc = '',
  isRefreshingProfile = false,
  onContactStudent,
}) {
  const adminInitials = getAdminInitials(admin.name)
  const [hasImageError, setHasImageError] = useState(false)

  useEffect(() => {
    setHasImageError(false)
  }, [avatarSrc])

  const shouldShowImage = Boolean(avatarSrc) && !hasImageError

  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-8 lg:flex-row">
      <div className="flex flex-col items-center gap-5 text-right sm:flex-row">
        <div className="shrink-0">
          {shouldShowImage ? (
            <div className="h-24 w-24 overflow-hidden rounded-2xl border border-[#c8cdb8] bg-[#dfe3d2] shadow-sm sm:h-28 sm:w-28">
              <img
                src={avatarSrc}
                alt={admin.name ? `صورة ${admin.name}` : 'صورة المسؤول'}
                className="h-full w-full object-cover"
                onError={() => setHasImageError(true)}
              />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[#c8cdb8] bg-gradient-to-br from-[#dfe3d2] to-[#cfd7bf] text-2xl font-extrabold text-[#3f4723] shadow-sm sm:h-28 sm:w-28 sm:text-3xl">
              {adminInitials}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex justify-end">
            <span className="rounded-md bg-[#555d30] px-4 py-1 text-xs font-bold text-white">
              مشرف
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-[#1f220f]">
            {admin.name}
          </h1>

          <p className="mb-2 flex items-center justify-end gap-2 text-sm font-bold text-[#1f220f]">
            {admin.role} - الرقم العسكري : {admin.militaryId}
            <FiUserCheck className="text-[#555d30]" />
          </p>

          <p className="text-sm text-[#555d30]">
            {admin.department}
          </p>

          {isRefreshingProfile && (
            <p className="mt-3 text-xs font-bold text-[#7b815f]">
              جارٍ تحديث بيانات الملف الإداري...
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onContactStudent}
          className="flex items-center gap-3 rounded-md bg-[#555d30] px-8 py-4 text-sm font-bold text-white transition hover:scale-105 hover:bg-[#3f4723]"
        >
          التواصل بالطالب
          <FiMail />
        </button>
      </div>
    </div>
  )
}
