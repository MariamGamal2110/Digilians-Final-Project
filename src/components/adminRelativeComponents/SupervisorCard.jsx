export default function SupervisorCard({ student }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[220px]">
      <h2 className="text-[#1f220f] font-bold text-xl mb-6">
        الطالب المختار
      </h2>

      <div className="flex items-center gap-4">
        <img
          src="/images/student-avatar.png"
          alt="صورة الطالب"
          className="w-16 h-16 rounded-lg object-cover border border-[#c8cdb8]"
        />

        <div>
          <p className="text-[#1f220f] font-bold text-lg">
            {student.name}
          </p>

          <p className="text-sm text-[#555d30] mt-1">
            {student.email || student.militaryId || 'بيانات غير متوفرة'}
          </p>
        </div>
      </div>
    </div>
  )
}
