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

  const hasResolvedMilitaryId = Boolean(
    admin?.militaryId && admin.militaryId !== 'غير متوفر'
  )
  const hasResolvedDepartment = Boolean(
    admin?.department && admin.department !== 'الإدارة'
  )
  const hasResolvedRole = Boolean(
    admin?.role && admin.role !== 'مشرف'
  )
  const shouldShowMeta = hasResolvedMilitaryId || hasResolvedDepartment || hasResolvedRole

  useEffect(() => {
    setHasImageError(false)
  }, [avatarSrc])

  const shouldShowImage = Boolean(avatarSrc) && !hasImageError
  const adminMeta = [
    hasResolvedRole ? admin.role : null,
    hasResolvedMilitaryId ? `الرقم العسكري : ${admin.militaryId}` : null,
  ]
    .filter(Boolean)
    .join(' - ')

  return (
    <div className="relative mb-8 flex min-h-[190px] flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#555d30] px-6 py-9 lg:flex-row">
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
      <div className="absolute left-24 bottom-[-70px] h-40 w-40 rounded-full bg-white/5" />

      <div className="relative flex flex-col items-center gap-5 text-right sm:flex-row">
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
          <div className="mb-4 flex justify-end">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
              مشرف
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-white">
            {admin.name}
          </h1>

          {shouldShowMeta && (
            <p className="mb-2 flex items-center justify-end gap-2 text-sm font-bold text-white">
              {adminMeta}
              <FiUserCheck className="text-white/85" />
            </p>
          )}

          {hasResolvedDepartment && (
            <p className="text-sm text-white/85">
              {admin.department}
            </p>
          )}

          {isRefreshingProfile && !shouldShowMeta && (
            <p className="mt-3 text-xs font-bold text-white/75">
              جارٍ تحديث بيانات الملف الإداري...
            </p>
          )}
        </div>
      </div>

      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={onContactStudent}
          className="flex items-center gap-3 rounded-md bg-white px-8 py-4 text-sm font-bold text-[#3f4723] transition hover:scale-105 hover:bg-[#eef0e4]"
        >
          التواصل بالطالب
          <FiMail />
        </button>
      </div>
    </div>
  )
}
