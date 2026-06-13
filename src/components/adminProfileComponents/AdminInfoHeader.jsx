import { FiMail, FiUserCheck } from 'react-icons/fi'

export default function AdminInfoHeader({
  admin = {},
  contacts = {},
  isRefreshingProfile = false,
  onContactStudent,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
      <div className="flex items-center gap-5 text-right">
        <div>
          <div className="mb-3 flex justify-end">
            <span className="bg-[#555d30] text-white text-xs font-bold px-4 py-1 rounded-md">
              مشرف
            </span>
          </div>

          <h1 className="text-[#1f220f] text-3xl font-bold mb-4">
            {admin.name}
          </h1>

          <p className="text-[#1f220f] text-sm font-bold mb-2 flex items-center justify-end gap-2">
            {admin.role} - الرقم العسكري : {admin.militaryId}
            <FiUserCheck className="text-[#555d30]" />
          </p>

          <p className="text-[#555d30] text-sm">
            {admin.department}
          </p>

          {isRefreshingProfile && (
            <p className="text-[#7b815f] text-xs font-bold mt-3">
              جارٍ تحديث بيانات الملف الإداري...
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onContactStudent}
          className="bg-[#555d30] text-white rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#3f4723] hover:scale-105 transition"
        >
          التواصل بالطالب
          <FiMail />
        </button>
      </div>
    </div>
  )
}
