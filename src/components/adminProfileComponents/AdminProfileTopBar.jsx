import { useMemo, useState } from 'react'
import { FiBell, FiSearch, FiSettings, FiUser } from 'react-icons/fi'

export default function AdminProfileTopBar({ students = [], onSelectStudent }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = useMemo(() => {
    const value = searchTerm.trim().toLowerCase()

    if (!value) {
      return []
    }

    return students.filter((student) => {
      return (
        student.name.toLowerCase().includes(value) ||
        student.militaryId.includes(value) ||
        student.email.toLowerCase().includes(value)
      )
    })
  }, [searchTerm, students])

  function handleSelectStudent(student) {
    onSelectStudent(student)
    setSearchTerm('')
  }

  return (
    <div
      dir="ltr"
      className="flex items-center justify-between border-b border-gray-200 px-7 py-4"
    >
      <div className="flex items-center gap-3">
        <img
          src="/images/admin-avatar.png"
          alt="صورة الأدمن"
          className="w-10 h-10 rounded-lg object-cover border border-[#c8cdb8]"
        />

        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition">
          <FiSettings size={19} />
        </button>

        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition">
          <FiBell size={19} />
        </button>
      </div>

      <div className="relative w-72">
        <input
          dir="rtl"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="بحث عن طالب..."
          className="w-full bg-[#f7f5f0] border border-gray-200 rounded-lg py-3 pr-4 pl-10 text-sm outline-none focus:border-[#555d30]"
        />

        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555d30]" />

        {filteredStudents.length > 0 && (
          <div
            dir="rtl"
            className="absolute top-[52px] right-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => handleSelectStudent(student)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#faf9f4] transition text-right border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-10 h-10 rounded-lg object-cover border border-[#e8e5dc]"
                />

                <div className="flex-1">
                  <p className="text-[#1f220f] font-bold text-sm">
                    {student.name}
                  </p>

                  <p className="text-[#555d30] text-xs mt-1">
                    رقم عسكري: {student.militaryId}
                  </p>
                </div>

                <FiUser className="text-[#555d30]" />
              </button>
            ))}
          </div>
        )}

        {searchTerm.trim() && filteredStudents.length === 0 && (
          <div
            dir="rtl"
            className="absolute top-[52px] right-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 px-4 py-4 text-center"
          >
            <p className="text-[#7b815f] text-sm font-bold">
              لا يوجد طالب بهذا الاسم
            </p>
          </div>
        )}
      </div>
    </div>
  )
}