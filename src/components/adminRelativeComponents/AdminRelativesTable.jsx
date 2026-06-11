import { FiEye, FiPrinter } from 'react-icons/fi'

export default function AdminRelativesTable({
  selectedStudent,
  relatives,
  onSelectRelative = () => {},
  isLoading,
  error,
}) {
  function printRecord() {
    alert('سيتم طباعة السجل لاحقًا')
  }

  if (!selectedStudent) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[250px] flex items-center justify-center text-center text-[#555d30]">
        ابدأ بالبحث عن طالب لعرض بيانات الأقارب
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="text-right">
          <h2 className="text-[#1f220f] text-xl font-bold">
            الأفراد المسجلين
          </h2>

          <p className="text-[#555d30] text-sm mt-1">
            يوجد {relatives.length} من سجلات الأقارب للطالب {selectedStudent.name}
          </p>
        </div>

        <button
          onClick={printRecord}
          className="bg-[#e8e5dc] text-[#1f220f] px-4 py-2 rounded-md font-bold text-sm hover:bg-[#d8d4c7] transition flex items-center gap-2"
        >
          طباعة السجل
          <FiPrinter />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-[#f3f1e8] text-[#1f220f]">
              <th className="py-3 px-3 font-bold">الاسم</th>
              <th className="py-3 px-3 font-bold">القرابة</th>
              <th className="py-3 px-3 font-bold">الرقم القومي</th>
              <th className="py-3 px-3 font-bold">تاريخ الميلاد</th>
              <th className="py-3 px-3 font-bold">الوظيفة</th>
              <th className="py-3 px-3 font-bold">الحالة</th>
              <th className="py-3 px-3 font-bold">إجراءات</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-[#555d30] font-bold"
                >
                  جاري تحميل بيانات الأقارب...
                </td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-red-600 font-bold"
                >
                  {error}
                </td>
              </tr>
            )}

            {!isLoading && !error && relatives.map((relative) => (
              <tr
                key={relative.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <td className="py-4 px-3 text-[#1f220f]">
                  {relative.relativeName}
                </td>

                <td className="py-4 px-3 text-[#1f220f]">
                  {relative.relation}
                </td>

                <td className="py-4 px-3 text-[#1f220f]">
                  {relative.nationalId || '—'}
                </td>

                <td className="py-4 px-3 text-[#1f220f]">
                  {relative.birthDate || '—'}
                </td>

                <td className="py-4 px-3 text-[#1f220f]">
                  {relative.job || '—'}
                </td>

                <td className="py-4 px-3">
                  <span className="bg-[#e8e5dc] text-[#1f220f] rounded-md px-4 py-2 text-xs font-bold">
                    {relative.socialStatus || '—'}
                  </span>
                </td>

                <td className="py-4 px-3">
                  <button
                    onClick={() => onSelectRelative(relative)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition mx-auto"
                    title="عرض التفاصيل"
                  >
                    <FiEye size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {!isLoading && !error && relatives.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-[#555d30] font-bold"
                >
                  لا توجد بيانات أقارب لهذا الطالب
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
