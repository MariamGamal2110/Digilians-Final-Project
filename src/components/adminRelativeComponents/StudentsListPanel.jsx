export default function StudentsListPanel({
  students,
  selectedStudent,
  onSelectStudent,
  isLoading = false,
  error = '',
  hasLoaded = false,
}) {
  return (
    <div className="flex min-h-[430px] max-h-[55vh] flex-col rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 shrink-0 text-center font-bold text-[#1f220f]">
        قائمة الطلاب
      </h2>

      <div dir="ltr" className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div dir="rtl" className="space-y-3">
          {isLoading && !hasLoaded && (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-[#f7f5f0] border border-gray-200 p-4"
                >
                  <div className="h-4 w-3/4 bg-[#e4dfd1] rounded mb-3" />
                  <div className="h-3 w-1/2 bg-[#ece7da] rounded mb-2" />
                  <div className="h-3 w-1/3 bg-[#ece7da] rounded" />
                </div>
              ))}
            </div>
          )}

          {isLoading && hasLoaded && (
            <div className="rounded-lg bg-[#f7f5f0] px-4 py-3 text-center text-sm text-[#555d30]">
              جاري تحديث نتائج البحث...
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-lg bg-red-50 px-4 py-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {!isLoading && !error && hasLoaded && students.length === 0 && (
            <div className="rounded-lg bg-[#f7f5f0] px-4 py-8 text-center text-sm text-[#555d30]">
              لا توجد نتائج للبحث الحالي
            </div>
          )}

          {!error && students.map((student) => {
            const isSelected = selectedStudent?.id === student.id

            return (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student)}
                className={
                  isSelected
                    ? 'w-full text-right bg-[#555d30] text-white rounded-lg p-4 transition'
                    : 'w-full text-right bg-[#e8e5dc] text-[#1f220f] rounded-lg p-4 hover:bg-[#d8d4c7] transition'
                }
              >
                <p className="font-bold text-sm mb-1">
                  {student.name}
                </p>

                <p className={isSelected ? 'text-white/80 text-xs' : 'text-[#555d30] text-xs'}>
                  الرقم العسكري: {student.militaryId}
                </p>

                <p className={isSelected ? 'text-white/80 text-xs mt-1' : 'text-[#555d30] text-xs mt-1'}>
                  عدد الأقارب: {student.relativesCount ?? 0}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
