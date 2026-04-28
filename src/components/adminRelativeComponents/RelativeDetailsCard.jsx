export default function RelativeDetailsCard({ student }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[240px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#1f220f] font-bold text-xl">
          معلومات الطالب المختار
        </h2>

 <img
  src="/images/student-avatar.png"
  alt="صورة الطالب"
  className="w-14 h-14 rounded-lg object-cover border border-[#c8cdb8]"
/>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-[#555d30] font-bold">الاسم</span>
          <span className="text-[#1f220f]">{student.name}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-[#555d30] font-bold">الرقم العسكري</span>
          <span className="text-[#1f220f]">{student.militaryId}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-[#555d30] font-bold flex items-center gap-2">
            البريد الإلكتروني
          </span>
          <span className="text-[#1f220f]">{student.email}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-[#555d30] font-bold flex items-center gap-2">
            التراك
          </span>
          <span className="text-[#1f220f]">{student.track}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-[#555d30] font-bold">التخصص</span>
          <span className="text-[#1f220f]">{student.specialization}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#555d30] font-bold flex items-center gap-2">
            تاريخ الالتحاق
           
          </span>
          <span className="text-[#1f220f]">
            {student.enrollmentDate || 'غير محدد'}
          </span>
        </div>
      </div>
    </div>
  )
}