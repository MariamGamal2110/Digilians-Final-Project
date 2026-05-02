import { FiMail, FiUserCheck } from 'react-icons/fi'

export default function AdminInfoHeader({ admin, contacts }) {
  function openEmail(email, personName) {
    const subject = encodeURIComponent(`رسالة بخصوص ${personName}`)
    const body = encodeURIComponent(`مرحبًا ${personName},\n\n`)

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
      <div className="flex items-center gap-5 text-right">
        <div className="relative">
          <img
            src={admin.avatar}
            alt="صورة الأدمن"
            className="w-32 h-32 rounded-xl object-cover border border-[#c8cdb8]"
          />

          <span className="absolute bottom-2 right-2 bg-[#555d30] text-white text-xs font-bold px-4 py-1 rounded-md">
            مشرف
          </span>
        </div>

        <div>
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
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => openEmail(contacts.studentEmail, 'الطالب')}
          className="bg-[#555d30] text-white rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#3f4723] hover:scale-105 transition"
        >
          التواصل بالطالب
          <FiMail />
        </button>

        <button
          onClick={() => openEmail(contacts.supervisorEmail, 'المشرف')}
          className="bg-[#e8e5dc] text-[#1f220f] rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#d8d4c7] hover:scale-105 transition"
        >
          التواصل بالمشرف
          <FiMail />
        </button>
      </div>
    </div>
  )
}