import { useState } from 'react'
import { updateAttendancePermitType } from '../../../api/statement'

const PERMIT_TYPES = [
  'اعتيادي',
  'مرضي',
  'طارئ',
  'فري',
  'دراسة',
  'إلحاق',
  'سفر',
  'حادث',
]

export default function EditPermitTypeModal({
  record,
  currentPermitType = 'اعتيادي',
  onClose,
  onSave,
  role = 'admin',
}) {
  const [permitType, setPermitType] = useState(currentPermitType)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      await updateAttendancePermitType(record._id || record.id, permitType, role)
      onSave?.(permitType)
      onClose()
    } catch (err) {
      setError(err.message || 'تعذر حفظ النوع')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1f220f]">تعديل حالة الطلب</h2>
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
          <p className="font-bold text-lg">{record.name}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">
            اختر نوع الإذن
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PERMIT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPermitType(type)}
                className={`py-2 px-3 rounded-lg font-bold text-sm transition-all ${
                  permitType === type
                    ? 'bg-[#555d30] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
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
