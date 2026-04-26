import React, { useMemo, useState } from 'react'

const students = [
    { id: 1, name: 'أحمد محمود', nationalId: '29901011234567', militaryId: '36581', status: 'present', note: '' },
    { id: 2, name: 'محمود سامح', nationalId: '30009011234567', militaryId: '36582', status: 'present', note: '' },
    { id: 3, name: 'مصطفى عادل', nationalId: '30103021234567', militaryId: '36583', status: 'absent', note: 'appeal' },
    { id: 4, name: 'حسين رضا', nationalId: '30005061234567', militaryId: '36584', status: 'absent', note: 'late' },
    { id: 5, name: 'خالد ياسر', nationalId: '29911121234567', militaryId: '36585', status: 'absent', note: '' },
]

export default function AttendanceTrackerSection({ filters }) {
    const [attendanceFilter, setAttendanceFilter] = useState('all')

    const visibleStudents = useMemo(() => {
        const normalizedNationalId = filters.nationalId || ''
        const normalizedMilitaryId = filters.militaryId || ''

        return students.filter((student) => {
            const matchesNationalId = normalizedNationalId ? student.nationalId.includes(normalizedNationalId) : true
            const matchesMilitaryId = normalizedMilitaryId ? student.militaryId.includes(normalizedMilitaryId) : true

            const matchesStatus =
                attendanceFilter === 'all' ||
                (attendanceFilter === 'present' && student.status === 'present') ||
                (attendanceFilter === 'absent' && student.status === 'absent') ||
                (attendanceFilter === 'appeal' && student.note === 'appeal') ||
                (attendanceFilter === 'late' && student.note === 'late')

            return matchesNationalId && matchesMilitaryId && matchesStatus
        })
    }, [attendanceFilter, filters.militaryId, filters.nationalId])

    const buttonStyle = (key) =>
        `px-3 py-2 rounded-lg text-xs font-bold transition-colors ${attendanceFilter === key
            ? 'bg-primary-container text-white'
            : 'bg-white text-secondary border border-outline-variant/40 hover:bg-surface-container-high'
        }`

    return (
        <section className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <h3 className="text-xl font-headline font-bold text-primary">متابعة الحضور اليومي</h3>
                <div className="flex flex-wrap gap-2">
                    <button className={buttonStyle('all')} onClick={() => setAttendanceFilter('all')} type="button">الكل</button>
                    <button className={buttonStyle('present')} onClick={() => setAttendanceFilter('present')} type="button">جاء</button>
                    <button className={buttonStyle('absent')} onClick={() => setAttendanceFilter('absent')} type="button">لم يحضر</button>
                    <button className={buttonStyle('appeal')} onClick={() => setAttendanceFilter('appeal')} type="button">معاه التماس</button>
                    <button className={buttonStyle('late')} onClick={() => setAttendanceFilter('late')} type="button">متأخر</button>
                </div>
            </div>

            <div className="overflow-x-auto glass-card border border-outline-variant/20 rounded-xl p-4">
                <table className="w-full text-right">
                    <thead>
                        <tr className="border-b border-surface-dim/70">
                            <th className="pb-3 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الاسم</th>
                            <th className="pb-3 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الرقم القومي</th>
                            <th className="pb-3 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الرقم العسكري</th>
                            <th className="pb-3 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">الحضور</th>
                            <th className="pb-3 pt-2 text-xs font-bold text-secondary tracking-widest uppercase">ملاحظة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-dim/30">
                        {visibleStudents.map((student) => (
                            <tr className="hover:bg-surface-container-low/40 transition-colors" key={student.id}>
                                <td className="py-4 text-sm font-semibold text-on-surface">{student.name}</td>
                                <td className="py-4 text-sm font-medium text-secondary">{student.nationalId}</td>
                                <td className="py-4 text-sm font-medium text-secondary">{student.militaryId}</td>
                                <td className="py-4 text-sm font-medium">
                                    {student.status === 'present' ? (
                                        <span className="inline-flex items-center gap-2 text-emerald-700">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                                            جاء
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 text-rose-700">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                                            لم يحضر                    </span>
                                    )}
                                </td>
                                <td className="py-4 text-sm font-medium">
                                    {student.note === 'appeal' && (
                                        <span className="inline-flex items-center gap-2 text-sky-700">
                                            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                                            التماس
                                        </span>
                                    )}
                                    {student.note === 'late' && (
                                        <span className="inline-flex items-center gap-2 text-amber-700">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                            متأخر
                                        </span>
                                    )}
                                    {student.note === '' && <span className="text-secondary/70">-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {visibleStudents.length === 0 && (
                    <p className="text-center text-sm text-secondary py-5">لا توجد نتائج مطابقة للفلاتر الحالية.</p>
                )}
            </div>
        </section>
    )
}
