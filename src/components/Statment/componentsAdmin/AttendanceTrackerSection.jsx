import React, { useMemo, useState } from 'react'
import { updateAttendanceDeduction } from '../../../api/statement'

function getRecordId(record) {
    return record._id || record.id
}

export default function AttendanceTrackerSection({
    records = [],
    loading = false,
    onRecordDeleted,
    onClearAll,
    role = 'user'
}) {
    const [attendanceFilter, setAttendanceFilter] = useState('all')
    const [openNoteForId, setOpenNoteForId] = useState(null)
    const [notesByStudent, setNotesByStudent] = useState({})
    const [deductionsByStudent, setDeductionsByStudent] = useState({})
    const [openDeductionForId, setOpenDeductionForId] = useState(null)

    const handleClearAll = () => {
        if (window.confirm('هل أنت متأكد من حذف كل السجلات؟')) {
            onClearAll?.()
            alert('تم حذف كل السجلات بنجاح')
        }
    }

const visibleStudents = useMemo(() => {
        return records.filter((student) => {
            const matchesStatus =
                attendanceFilter === 'all' ||
                (attendanceFilter === 'present' && student.status === 'present') ||
                (attendanceFilter === 'late' && student.status === 'late') ||
                (attendanceFilter === 'permit' && (!student.permitType || student.permitType === '—'))
            return matchesStatus
        })
    }, [attendanceFilter, records])

    const toggleNoteEditor = (studentId) => {
        setOpenNoteForId((prev) => (prev === studentId ? null : studentId))
    }

    const saveNote = () => {
        setOpenNoteForId(null)
    }

    const handleDeleteRecord = (recordId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا السجل؟')) {
            onRecordDeleted?.(recordId)
            alert('تم الحذف بنجاح')
        }
    }

const getDeduction = (studentId, defaultDeduction = 0) => {
        return deductionsByStudent[studentId] ?? defaultDeduction
    }

    const changeDeduction = async (studentId, delta, defaultDeduction = 0) => {
        // Calculate new deduction value
        const current = deductionsByStudent[studentId] ?? defaultDeduction
        const next = Math.max(0, current + delta)
        
        // Update local state immediately for responsive UI
        setDeductionsByStudent((prev) => {
            return { ...prev, [studentId]: next }
        })
        
        // Save to database
        try {
            await updateAttendanceDeduction(studentId, next, role)
        } catch (error) {
            console.error('Failed to save deduction:', error)
            // Revert on error
            setDeductionsByStudent((prev) => {
                return { ...prev, [studentId]: current }
            })
            alert('تعذر حفظ الدرجة')
        }
    }

    return (
        <section className="mb-8">
            <div className="glass-card border border-outline-variant/20 rounded-2xl overflow-hidden">

                {/* Filters */}
                <div className="border-b border-outline-variant/30 px-4 py-4 md:px-6 flex justify-between">
                    <div className="flex flex-wrap items-center gap-3">
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
                    <button
                        onClick={handleClearAll}
                        className="px-4 py-2 rounded-lg transition-all bg-red-600 text-white hover:bg-red-700"
                    >
                        مسح الكل
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-right">
                        <thead>
                            <tr className="border-b bg-white/30">
                                <th className="py-4 px-4 text-xs font-bold">الرقم العسكري</th>
                                <th className="py-4 px-4 text-xs font-bold">اسم الطالب</th>
                                <th className="py-4 px-4 text-xs font-bold">البريد الإلكتروني</th>
                                <th className="py-4 px-4 text-xs font-bold">تاريخ الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">وقت الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">حالة الطلب</th>
                                <th className="py-4 px-4 text-xs font-bold">حالة الوصول</th>
                                <th className="py-4 px-4 text-xs font-bold">الدرجات</th>
                                <th className="py-4 px-4 text-xs font-bold">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-6">
                                        جاري تحميل البيانات...
                                    </td>
                                </tr>
                            ) : visibleStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-6">
                                        لا توجد بيانات
                                    </td>
                                </tr>
                            ) : (
                                visibleStudents.map((student) => {
                                    const recordId = getRecordId(student)
                                    const deduction = getDeduction(recordId, student.deduction ?? 0)
                                    const isDeductionOpen = openDeductionForId === recordId

                                    return (
                                        <React.Fragment key={recordId}>
                                            <tr className="hover:bg-gray-50">
                                                <td className="py-4 px-4 font-bold">{student.militaryId}</td>
                                                <td className="py-4 px-4">{student.name}</td>
                                                <td className="py-4 px-4">{student.email}</td>
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

                                                {/* ✅ عمود الدرجات */}
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <button
                                                            className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center text-sm font-bold"
                                                            onClick={() => changeDeduction(recordId, -1, student.deduction ?? 0)}
                                                            title="إنقاص درجة"
                                                        >
                                                            −
                                                        </button>
<span className="w-8 text-center font-bold text-sm">
                                                            {deduction > 0 ? `-${deduction}` : '0'}
                                                        </span>
                                                        <button
                                                            className="w-6 h-6 rounded-full bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center text-sm font-bold"
                                                            onClick={() => changeDeduction(   recordId, +1, student.deduction ?? 0)}
                                                            title="إضافة درجة"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            className="p-2 rounded-full hover:bg-gray-200 flex items-center justify-center"
                                                            onClick={() => toggleNoteEditor(recordId)}
                                                        >
                                                            <span className="material-symbols-outlined text-lg">edit</span>
                                                        </button>
                                                        <button
                                                            className="p-2 rounded-full hover:bg-red-100 flex items-center justify-center text-red-600"
                                                            onClick={() => handleDeleteRecord(recordId)}
                                                        >
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {openNoteForId === recordId && (
                                                <tr>
                                                    <td colSpan={9} className="p-4 bg-gray-50">
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
                                    )
                                })
                            )}
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
