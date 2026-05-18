import { useState } from 'react'

export default function EditProfileModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: student.name || '',
    email: student.email || '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      name: formData.name,
      email: formData.email,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden" dir="rtl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-[#1f220f] text-xl font-extrabold">
              تعديل بيانات الطالب
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f3f1e8] text-[#1f220f] flex items-center justify-center font-bold hover:bg-[#e8e5dc] transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[#1f220f] font-bold text-sm mb-2">
              الاسم
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#555d30]"
              placeholder="اكتب اسم الطالب"
            />
          </div>

          <div>
            <label className="block text-[#1f220f] font-bold text-sm mb-2">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#555d30]"
              placeholder="اكتب البريد الإلكتروني"
            />
          </div>

          <div>
            <label className="block text-[#1f220f] font-bold text-sm mb-2">
              الرقم العسكري
            </label>

            <div className="w-full border border-[#e8e5dc] bg-[#f8f7f2] rounded-xl px-4 py-3 text-sm text-[#555d30] font-bold flex items-center justify-between">
              <span>{student.militaryId}</span>
              <span className="text-xs text-[#7b815f]">
                غير قابل للتعديل
              </span>
            </div>

            <p className="text-[#7b815f] text-xs mt-2">
              الرقم العسكري يتم تحديده من الإدارة ولا يمكن تعديله من الطالب.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-200 text-[#1f220f] font-bold hover:bg-[#f8f7f2] transition"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#555d30] text-white font-bold hover:bg-[#454c27] transition"
            >
              حفظ التعديل
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}