import { useState } from 'react'

export default function EditProfileModal({ student, onClose, onSave }) {
  const [name, setName] = useState(student.name)
  const [militaryId, setMilitaryId] = useState(student.militaryId)
  const [email, setEmail] = useState(student.email)

  function handleSave() {
    onSave({
      name: name,
      militaryId: militaryId,
      email: email,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-[#1f220f] text-xl font-bold mb-6 text-center">
          تعديل بيانات الطالب
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#555d30] mb-2">
              الاسم
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#555d30] mb-2">
              الرقم العسكري
            </label>
            <input
              value={militaryId}
              onChange={(event) => setMilitaryId(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#555d30] mb-2">
              البريد الإلكتروني
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-7">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-[#1f220f] rounded-lg py-3 font-bold hover:bg-gray-100 transition"
          >
            إلغاء
          </button>

          <button
            onClick={handleSave}
            className="w-full bg-[#555d30] text-white rounded-lg py-3 font-bold hover:bg-[#3f4723] transition"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  )
}