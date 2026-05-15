import React, { useMemo, useState } from 'react'

const students = [
    {
        id: 1,
        name: 'أحمد محمد علي',
        nationalId: '29901011234567',
        militaryId: '25698',
        date: '2023/10/22',
        time: '7:10 ص',
        permitType: 'اعتيادي',
        status: 'present',
        note: '',
    },
    {
        id: 2,
        name: 'ياسين فهد القحطاني',
        nationalId: '30009011234567',
        militaryId: '32657',
        date: '2023/10/22',
        time: '8:40 ص',
        permitType: 'عسكري',
        status: 'late',
        note: 'late',
    },
    {
        id: 3,
        name: 'سعود عبد الله',
        nationalId: '30103021234567',
        militaryId: '25874',
        date: '2023/10/22',
        time: '7:20 ص',
        permitType: 'اعتيادي',
        status: 'present',
        note: 'appeal',
    },
    {
        id: 4,
        name: 'محمود جابر العشري',
        nationalId: '30005061234567',
        militaryId: '36987',
        date: '2023/10/22',
        time: '8:05 ص',
        permitType: 'اعتيادي',
        status: 'late',
        note: 'late',
    },
]

export default function AttendanceTrackerSection({ filters }) {
    const [attendanceFilter, setAttendanceFilter] = useState('all')
    const [openNoteForId, setOpenNoteForId] = useState(null)
    const [notesByStudent, setNotesByStudent] = useState({})

    const visibleStudents = useMemo(() => {
        const searchValue = filters.searchValue || ''

        return students.filter((student) => {
            const matchesSearch = searchValue
                ? student.nationalId.includes(searchValue) || student.militaryId.includes(searchValue)
                : true

            const matchesStatus =
                attendanceFilter === 'all' ||
                (attendanceFilter === 'present' && student.status === 'present') ||
                (attendanceFilter === 'late' && student.status === 'late') ||
                (attendanceFilter === 'permit' && student.permitType === 'اعتيادي')

            return matchesSearch && matchesStatus
        })
    }, [attendanceFilter, filters.searchValue])

    const toggleNoteEditor = (studentId) => {
        setOpenNoteForId((prev) => (prev === studentId ? null : studentId))
    }

    const saveNote = () => {
        setOpenNoteForId(null)
    }

    return (
        <section className="mb-8">
            <div className="glass-card border border-outline-variant/20 rounded-2xl overflow-hidden">

                {/* Filters */}
                <div className="border-b border-outline-variant/30 px-4 py-4 md:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2 shadow-lg rounded-sm">
                            {['all', 'present', 'late', 'permit'].map((filter) => (
                                <button
                                    key={filter}
                                    className={`px-4 py-2 rounded-lg transition-all text-black ${attendanceFilter === filter
                                        ? 'bg-[#434a26] text-white'
                                        : 'opacity-80'
                                        }`}
                                    onClick={() => setAttendanceFilter(filter)}
                                >
                                    {filter === 'all' && 'الكل'}
                                    {filter === 'present' && 'حاضر'}
                                    {filter === 'late' && 'متأخر'}
                                    {filter === 'permit' && 'إجازة'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] text-right">
                        <thead>
                            <tr className="border-b bg-white/30">
                                <th className="py-4 px-4 text-xs font-bold">الرقم العسكري</th>
                                <th className="py-4 px-4 text-xs font-bold">اسم الطالب</th>
                                <th className="py-4 px-4 text-xs font-bold">الرقم القومي</th>
                                <th className="py-4 px-4 text-xs font-bold">تاريخ الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">وقت الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">حالة الطلب</th>
                                <th className="py-4 px-4 text-xs font-bold">حالة الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">الإجراءات</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleStudents.map((student) => (
                                <React.Fragment key={student.id}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="py-4 px-4 font-bold">{student.militaryId}</td>
                                        <td className="py-4 px-4">{student.name}</td>
                                        <td className="py-4 px-4">{student.nationalId}</td>
                                        <td className="py-4 px-4">{student.date}</td>
                                        <td className="py-4 px-4">{student.time}</td>

                                        <td className="py-4 px-4">
                                            <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                                                {student.permitType}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 font-bold">
                                            {student.status === 'present' ? (
                                                <span className="text-green-600">في الموعد</span>
                                            ) : (
                                                <span className="text-red-600">متأخر</span>
                                            )}
                                        </td>

                                        {/* زر فتح التعليق */}
                                        <td className="py-4 px-4">
                                            <button
                                                className="p-2 rounded-full hover:bg-gray-200 flex items-center justify-center"
                                                onClick={() => toggleNoteEditor(student.id)}
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    edit
                                                </span>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* التعليق */}
                                    {openNoteForId === student.id && (
                                        <tr>
                                            <td colSpan={8} className="p-4 bg-gray-50">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <p className="text-sm mb-2 font-bold">ملاحظات</p>

                                                    <textarea
                                                        className="w-full border rounded p-2 text-sm"
                                                        rows="3"
                                                        placeholder="اكتب ملاحظتك..."
                                                        value={notesByStudent[student.id] || ''}
                                                        onChange={(e) =>
                                                            setNotesByStudent((prev) => ({
                                                                ...prev,
                                                                [student.id]: e.target.value,
                                                            }))
                                                        }
                                                    />

                                                    <div className="flex justify-end gap-2 mt-3">
                                                        <button
                                                            className="px-3 py-1 bg-gray-200 rounded"
                                                            onClick={() => setOpenNoteForId(null)}
                                                        >
                                                            إلغاء
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 bg-black text-white rounded"
                                                            onClick={() => saveNote(student.id)}
                                                        >
                                                            حفظ
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {visibleStudents.length === 0 && (
                        <p className="text-center py-6">لا توجد بيانات</p>
                    )}
                </div>
            </div>
        </section>
    )
}