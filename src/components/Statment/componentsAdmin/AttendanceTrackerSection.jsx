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
            // البحث في الرقم القومي أو الرقم العسكري
            const matchesSearch = searchValue
                ? student.nationalId.includes(searchValue) || student.militaryId.includes(searchValue)
                : true

            const matchesStatus =
                attendanceFilter === 'all' ||
                (attendanceFilter === 'present' && student.status === 'present') ||
                (attendanceFilter === 'late' && student.status === 'late') ||
                (attendanceFilter === 'permit' && student.permitType === 'اعتيادي') ||
                (attendanceFilter === 'vacation' && student.permitType !== 'اعتيادي')

            return matchesSearch && matchesStatus
        })
    }, [attendanceFilter, filters.searchValue])

    const buttonStyle = (key) =>
        `px-5 py-2 rounded-md text-xs font-bold transition-colors ${attendanceFilter === key
            ? 'satin-gradient text-white shadow'
            : 'bg-white text-secondary border border-outline-variant/40 hover:bg-surface-container-high'
        }`

    const toggleNoteEditor = (studentId) => {
        setOpenNoteForId((prev) => (prev === studentId ? null : studentId))
    }

    const saveNote = (studentId) => {
        setOpenNoteForId(null)
    }

    return (
        <section className="mb-8">
            <div className="glass-card border border-outline-variant/20 rounded-2xl overflow-hidden">
                <div className="border-b border-outline-variant/30 px-4 py-4 md:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2 shadow-lg rounded-sm">
                            {['all', 'present', 'late', 'permit'].map((filter) => (
                                <button
                                    key={filter}
                                    className={`
                px-4 py-2 rounded-lg transition-all duration-200 text-black
                 
                ${attendanceFilter === filter
                                            ? 'bg-[#434a26] ring-2 ring-white/30'
                                            : 'opacity-90'}
            `}
                                    onClick={() => setAttendanceFilter(filter)}
                                    type="button"
                                >
                                    {filter === 'all' && 'الكل'}
                                    {filter === 'present' && 'حاضر'}
                                    {filter === 'late' && 'متأخر'}
                                    {filter === 'permit' && 'إجازة'}
                                </button>
                            ))}
                        </div>
                        <button className="h-9 w-9 rounded-md border border-outline-variant/40 text-secondary grid place-items-center" type="button">
                            <span className="material-symbols-outlined text-base">filter_alt</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[860px] text-right">
                        <thead>
                            <tr className="border-b border-surface-dim/70 bg-white/30">
                                <th className="py-4 px-4 text-xs font-bold text-secondary">الرقم العسكري</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">اسم الطالب</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">الرقم القومي</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">تاريخ الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">وقت الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">حالة الطلب</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">حالة الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold text-secondary">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim/30">
                            {visibleStudents.map((student) => (
                                <React.Fragment key={student.id}>
                                    <tr className="hover:bg-surface-container-low/35 transition-colors">
                                        <td className="py-5 px-4 text-sm font-black text-primary">{student.militaryId}</td>
                                        <td className="py-5 px-4 text-sm font-semibold text-on-surface">
                                            <div className="flex items-center justify-between gap-3">
                                                <span>{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 text-sm text-secondary dir-ltr">{student.nationalId}</td>
                                        <td className="py-5 px-4 text-sm text-secondary">{student.date}</td>
                                        <td className="py-5 px-4 text-sm text-secondary">{student.time}</td>
                                        <td className="py-5 px-4 text-sm">
                                            <span className="px-2 py-1 rounded-full text-xs bg-surface-container-high text-primary font-semibold">
                                                {student.permitType}
                                            </span>
                                        </td>
                                        <td className="py-5 px-4 text-sm font-bold">
                                            {student.status === 'present' && (
                                                <span className="inline-flex items-center gap-2 text-emerald-700">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />في الموعد
                                                </span>
                                            )}
                                            {student.status === 'late' && (
                                                <span className="inline-flex items-center gap-2 text-rose-700">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />متأخر (45 د)
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-5 px-4 text-secondary">
                                            <button
                                                className="h-8 w-8 rounded-full hover:bg-white/60"
                                                onClick={() => toggleNoteEditor(student.id)}
                                                type="button"
                                            >
                                                <span
                                                    className="material-symbols-outlined text-base"
                                                    onClick={() => toggleNoteEditor(student.id)}
                                                >
                                                    edit
                                                </span>
                                            </button>
                                        </td>
                                    </tr>

                                    {openNoteForId === student.id && (
                                        <tr className="bg-surface-container-low/35">
                                            <td className="px-4 py-4" colSpan={8}>
                                                <div className="rounded-xl border border-outline-variant/35 bg-white/80 p-4">
                                                    <p className="text-xs font-bold text-secondary mb-2">ملاحظات الطالب</p>
                                                    <textarea
                                                        className="w-full min-h-24 resize-y rounded-lg border border-outline-variant/35 bg-white px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/35"
                                                        onChange={(event) =>
                                                            setNotesByStudent((prev) => ({
                                                                ...prev,
                                                                [student.id]: event.target.value,
                                                            }))
                                                        }
                                                        placeholder="اكتب كل الملاحظات الخاصة بالطالب هنا"
                                                        value={notesByStudent[student.id] || ''}
                                                    />
                                                    <div className="mt-3 flex justify-end gap-2">
                                                        <button
                                                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-outline-variant/40 text-secondary hover:bg-surface-container-high"
                                                            onClick={() => setOpenNoteForId(null)}
                                                            type="button"
                                                        >
                                                            إلغاء
                                                        </button>
                                                        <button
                                                            className="px-3 py-1.5 rounded-lg text-xs font-bold satin-gradient text-white"
                                                            onClick={() => saveNote(student.id)}
                                                            type="button"
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
                        <p className="text-center text-sm text-secondary py-7">لا توجد نتائج مطابقة للفلاتر الحالية.</p>
                    )}
                </div>

                <div className="px-5 py-4 border-t border-outline-variant/30">
                    <div className="max-w-xs rounded-2xl bg-white/80 border border-outline-variant/30 px-4 py-3">
                        <p className="text-xs font-bold text-primary mb-2">آخر حالة وصول</p>
                        <div className="flex items-center justify-between">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-primary">الطالب / خالد الفقي</p>
                                <p className="text-[11px] text-emerald-700">تم تسجيل الدخول - 09:10 ص</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-surface-container-high text-primary grid place-items-center">
                                <span className="material-symbols-outlined text-lg">person</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}