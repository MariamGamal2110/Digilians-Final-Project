import { useMemo, useState } from 'react'

const RELATIONS = [
  'أب',
  'أم',
  'أخ',
  'أخت',
  'زوج',
  'زوجة',
  'ابن',
  'ابنة',
  'جد',
  'جدة',
  'عم',
  'عمة',
  'خال',
  'خالة',
  'ابن عم',
  'ابنة عم',
  'ابن خال',
  'ابنة خال',
  'قريب آخر',
]

const SOCIAL_STATUSES = [
  'متزوج',
  'متزوجة',
  'أعزب',
  'عزباء',
  'مطلق',
  'مطلقة',
  'أرمل',
  'أرملة',
]

export default function AddRelativeModal({
  onClose,
  onSubmit,
  selectedRelative,
  isSubmitting = false,
  errorMessage = '',
}) {
  const [relativeName, setRelativeName] = useState(selectedRelative?.relativeName || '')
  const [relation, setRelation] = useState(selectedRelative?.relation || 'أب')
  const [nationalId, setNationalId] = useState(selectedRelative?.nationalId || '')
  const [birthDate, setBirthDate] = useState(selectedRelative?.birthDate || '')
  const [job, setJob] = useState(selectedRelative?.job || '')
  const [socialStatus, setSocialStatus] = useState(selectedRelative?.socialStatus || 'متزوج')
  const [phone, setPhone] = useState(selectedRelative?.phone || '')
  const [address, setAddress] = useState(selectedRelative?.address || '')
  const [notes, setNotes] = useState(selectedRelative?.notes || '')

  const relationOptions = useMemo(() => {
    if (!relation || RELATIONS.includes(relation)) {
      return RELATIONS
    }

    return [relation, ...RELATIONS]
  }, [relation])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!relativeName.trim() || !relation.trim()) {
      return
    }

    await onSubmit({
      relativeName,
      relation,
      nationalId,
      birthDate,
      job,
      socialStatus,
      phone,
      address,
      notes,
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 px-3 py-4 sm:px-4 sm:py-6">
      <div className="flex min-h-full items-center justify-center">
        <div
          dir="rtl"
          className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
        >
          <div className="shrink-0 border-b border-gray-100 px-5 py-4 sm:px-6">
            <h2 className="text-center text-xl font-bold text-[#1f220f]">
              {selectedRelative ? 'تعديل بيانات قريب' : 'إضافة بيانات قريب'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    الاسم
                  </label>
                  <input
                    value={relativeName}
                    onChange={(event) => setRelativeName(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="اكتبي الاسم"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    صلة القرابة
                  </label>
                  <select
                    value={relation}
                    onChange={(event) => setRelation(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    disabled={isSubmitting}
                  >
                    {relationOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    الرقم القومي
                  </label>
                  <input
                    value={nationalId}
                    onChange={(event) => setNationalId(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="اكتبي الرقم القومي"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    تاريخ الميلاد
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    الوظيفة
                  </label>
                  <input
                    value={job}
                    onChange={(event) => setJob(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="مثال: يعمل بالخارج"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    الحالة الاجتماعية
                  </label>
                  <select
                    value={socialStatus}
                    onChange={(event) => setSocialStatus(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    disabled={isSubmitting}
                  >
                    {SOCIAL_STATUSES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    رقم الهاتف
                  </label>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="اكتبي رقم الهاتف"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    العنوان
                  </label>
                  <input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="اكتبي العنوان"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#555d30]">
                    ملاحظات
                  </label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="min-h-24 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#555d30]"
                    placeholder="ملاحظات إضافية"
                    disabled={isSubmitting}
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-lg border border-gray-300 py-3 font-bold text-[#1f220f] transition hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#555d30] py-3 font-bold text-white transition hover:bg-[#3f4723]"
                  disabled={isSubmitting || !relativeName.trim() || !relation.trim()}
                >
                  {isSubmitting
                    ? 'جاري الحفظ...'
                    : selectedRelative
                      ? 'حفظ التعديل'
                      : 'حفظ'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
