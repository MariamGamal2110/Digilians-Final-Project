import { useState } from 'react'
import { updateStudentGrade } from '../../../api/statement'

export default function EditGradeModal({
  student,
  currentGrade = 0,
  onClose,
  onSave,
  role = 'admin',
}) {
  const [grade, setGrade] = useState(currentGrade)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (grade < 0 || grade > 100) {
      setError('الدرجة يجب أن تكون بين 0 و 100')
      return
    }

    setSaving(true)
    setError('')

    try {
      // Use student ID from nested student object, fallback to record ID
      const studentId = student.student?._id || student.student?.id || student._id || student.id
      await updateStudentGrade(studentId, grade, role)
      onSave?.(grade)
      onClose()
    } catch (err) {
      setError(err.message || 'تعذر حفظ الدرجة')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1f220f]">تعديل درجات السلوك</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">اسم الطالب</p>
          <p className="font-bold text-lg">{student.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">الرقم العسكري</p>
          <p className="font-bold">{student.militaryId}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            درجة السلوك (0 - 100)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-3 text-lg font-bold text-center"
            placeholder="0 - 100"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition"
            type="button"
            disabled={saving}
          >
            إلغاء
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-[#555d30] text-white rounded-lg font-bold hover:bg-[#3f4723] transition disabled:opacity-60"
            type="button"
            disabled={saving}
          >
            {saving ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </div>
    </div>
  )
}
