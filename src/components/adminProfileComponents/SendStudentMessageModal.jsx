import { useEffect, useState } from 'react'
import { FiMail, FiSend, FiX } from 'react-icons/fi'

export default function SendStudentMessageModal({
  isOpen,
  initialEmail = '',
  isSending = false,
  errorMessage = '',
  onClose,
  onSend,
}) {
  const [studentEmail, setStudentEmail] = useState(initialEmail)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (isOpen) {
      setStudentEmail(initialEmail || '')
      setSubject('')
      setBody('')
    }
  }, [isOpen, initialEmail])

  if (!isOpen) {
    return null
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSend({
      studentEmail,
      subject,
      body,
    })
  }

  return (
    <div className="fixed inset-0 z-[95] bg-black/45 flex items-center justify-center px-4 py-6">
      <div
        dir="rtl"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e8e5dc] overflow-hidden"
      >
        <div className="relative px-6 py-5 border-b border-[#e8e5dc] bg-[#f8f6f0]">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-5 top-5 w-10 h-10 rounded-full border border-[#e8e5dc] flex items-center justify-center text-[#1f220f] hover:bg-[#f3f1e8] transition"
          >
            <FiX size={20} />
          </button>

          <h2 className="text-[#1f220f] text-2xl font-extrabold mb-2">إرسال رسالة للطالب</h2>
          <p className="text-[#7b815f] text-sm">اكتب رسالة داخلية تُحفظ داخل النظام وتظهر للطالب من جرس الإشعارات.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-[#1f220f] font-bold mb-2">بريد الطالب الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                value={studentEmail}
                onChange={(event) => setStudentEmail(event.target.value)}
                placeholder="student@example.com"
                className="w-full rounded-2xl border border-[#d8d4c7] bg-[#fcfbf8] px-4 py-3 pr-12 text-sm outline-none focus:border-[#555d30]"
              />
              <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555d30]" />
            </div>
          </div>

          <div>
            <label className="block text-[#1f220f] font-bold mb-2">الموضوع</label>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="عنوان الرسالة"
              className="w-full rounded-2xl border border-[#d8d4c7] bg-[#fcfbf8] px-4 py-3 text-sm outline-none focus:border-[#555d30]"
            />
          </div>

          <div>
            <label className="block text-[#1f220f] font-bold mb-2">محتوى الرسالة</label>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="اكتب الرسالة التي تريد إرسالها للطالب..."
              rows={6}
              className="w-full rounded-2xl border border-[#d8d4c7] bg-[#fcfbf8] px-4 py-3 text-sm outline-none focus:border-[#555d30] resize-none"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#d8d4c7] text-[#1f220f] rounded-xl px-5 py-3 text-sm font-bold hover:bg-[#f3f1e8] transition"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isSending}
              className="bg-[#555d30] text-white rounded-xl px-5 py-3 text-sm font-bold flex items-center gap-2 hover:bg-[#454c27] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              إرسال الرسالة
              <FiSend size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
