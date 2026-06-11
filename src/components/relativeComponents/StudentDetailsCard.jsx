export default function StudentDetailsCard({ student, relativesCount = 0 }) {
  const studentDetails = [
    { label: 'الاسم', value: student?.name },
    { label: 'الرقم العسكري', value: student?.militaryId },
    { label: 'البريد الالكتروني', value: student?.email },
    { label: 'عدد الأقارب', value: String(relativesCount) },
    { label: 'الدور', value: student?.role === 'admin' ? 'إدارة' : 'طالب' },
    { label: 'الحالة', value: student ? 'نشط' : null },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[270px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#1f220f] font-bold text-right w-full">
          جدول الطالب
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {studentDetails.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-2 gap-4 py-3 text-sm items-center"
          >
            <p className="text-[#555d30] font-bold text-right">
              {item.label}
            </p>

            <p className="text-[#1f220f] text-left">
              {item.value || 'غير متوفر'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
