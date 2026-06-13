function getValue(value) {
  if (value === null || value === undefined) {
    return 'غير متوفر'
  }

  if (typeof value === 'string' && value.trim() === '') {
    return 'غير متوفر'
  }

  return value
}

function getStatusLabel(type) {
  if (type === 'warning-one') {
    return 'إنذار أول'
  }

  if (type === 'warning-two') {
    return 'إنذار ثانٍ'
  }

  return 'مفصول من الدورة'
}

export default function WarningSummaryModal({ isOpen, category, onClose }) {
  if (!isOpen || !category) {
    return null
  }

  const students = Array.isArray(category.students) ? category.students : []
  const statusLabel = getStatusLabel(category.type)

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/40 px-3 py-4 sm:px-5 sm:py-6"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          dir="rtl"
          className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-[#e8e5dc] bg-[#f8f6f0] px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="text-right">
                <h2 className="text-xl font-bold text-[#1f220f]">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-[#555d30]">
                  جدول مختصر للطلاب المطابقين لهذه الحالة
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-[#ddd6c6] px-3 py-2 text-sm font-bold text-[#3b3120] transition hover:bg-[#f3f1e8]"
              >
                إغلاق
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            {students.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#ddd6c6] bg-[#fcfaf7] px-4 py-10 text-center">
                <p className="text-sm font-bold text-[#3b3120]">
                  لا توجد بيانات
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-[#e8e5dc]">
                <table className="w-full min-w-[640px] text-sm text-center border-collapse">
                  <thead>
                    <tr className="bg-[#f3f1e8] text-[#1f220f]">
                      <th className="px-4 py-3 font-bold">اسم الطالب</th>
                      <th className="px-4 py-3 font-bold">الرقم العسكري</th>
                      <th className="px-4 py-3 font-bold">نوع الحالة / نوع الإنذار</th>
                      <th className="px-4 py-3 font-bold">الدرجات المخصومة</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={`${student.militaryId || student.studentName || index}-${index}`}
                        className="border-b border-[#ece7da] last:border-b-0"
                      >
                        <td className="px-4 py-4 text-[#1f220f]">
                          {getValue(student.studentName)}
                        </td>
                        <td className="px-4 py-4 text-[#1f220f]">
                          {getValue(student.militaryId)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-[#f3f1e8] px-3 py-2 text-xs font-bold text-[#555d30]">
                            {statusLabel}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[#1f220f]">
                          {getValue(student.totalDeductedDegrees)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
