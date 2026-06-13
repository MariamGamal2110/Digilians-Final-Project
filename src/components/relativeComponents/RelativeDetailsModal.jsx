function getValue(value) {
  if (value === null || value === undefined) {
    return 'غير متوفر'
  }

  if (typeof value === 'string' && value.trim() === '') {
    return 'غير متوفر'
  }

  return value
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#ece7da] bg-[#fcfaf6] px-4 py-3">
      <span className="mb-1 block text-xs font-bold text-[#777f55]">
        {label}
      </span>
      <span className="block break-words text-sm font-semibold leading-7 text-[#1f220f]">
        {getValue(value)}
      </span>
    </div>
  )
}

export default function RelativeDetailsModal({ relative, onClose }) {
  if (!relative) {
    return null
  }

  const fields = [
    { label: 'الاسم', value: relative.relativeName },
    { label: 'صلة القرابة', value: relative.relation },
    { label: 'الرقم القومي', value: relative.nationalId },
    { label: 'تاريخ الميلاد', value: relative.birthDate },
    { label: 'الوظيفة', value: relative.job },
    { label: 'الحالة الاجتماعية', value: relative.socialStatus },
    { label: 'رقم الهاتف', value: relative.phone },
    { label: 'العنوان', value: relative.address },
    { label: 'ملاحظات', value: relative.notes },
  ]

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/40 px-3 py-4 sm:px-5 sm:py-6"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          dir="rtl"
          className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-[#e8e5dc] bg-[#f8f6f0] px-5 py-4 sm:px-6">
            <div className="text-right">
              <h2 className="text-xl font-bold text-[#1f220f]">
                تفاصيل القريب
              </h2>
              <p className="mt-1 text-sm text-[#555d30]">
                عرض بيانات القريب المسجلة
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <DetailCard
                  key={field.label}
                  label={field.label}
                  value={field.value}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-[#ece7da] bg-white px-5 py-4 sm:px-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-[#555d30] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#454c27]"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
