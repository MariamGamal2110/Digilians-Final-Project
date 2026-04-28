export default function StudentsListPanel({ students, selectedStudent, onSelectStudent }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[430px]">
      <h2 className="text-[#1f220f] font-bold mb-4 text-center">
        قائمة الأفراد
      </h2>

      <div className="space-y-3">
        {students.map((student) => {
          const isSelected = selectedStudent.id === student.id

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
            </button>
          )
        })}
      </div>
    </div>
  )
}