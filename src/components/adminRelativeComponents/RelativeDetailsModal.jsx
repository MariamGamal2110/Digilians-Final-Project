import { useEffect } from 'react'

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

export default function RelativeDetailsModal({ relative, student, onClose }) {
  useEffect(() => {
    if (!relative) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, relative])

  if (!relative) {
    return null
  }

  const studentDetails = [
    { label: 'اسم الطالب', value: student?.name },
    { label: 'الرقم العسكري', value: student?.militaryId },
    { label: 'البريد الإلكتروني', value: student?.email },
  ]

  const relativeDetails = [
    { label: 'اسم القريب', value: relative.relativeName },
    { label: 'صلة القرابة', value: relative.relation },
    { label: 'الرقم القومي', value: relative.nationalId },
    { label: 'تاريخ الميلاد', value: relative.birthDate },
    { label: 'الوظيفة', value: relative.job },
    { label: 'الحالة الاجتماعية', value: relative.socialStatus },
    { label: 'رقم الهاتف', value: relative.phone ?? relative.phoneNumber },
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
                بيانات القريب كما أدخلها الطالب
              </p>
            </div>

            <div className="mt-4">
              <h3 className="mb-3 text-base font-bold text-[#1f220f]">
                بيانات الطالب
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {studentDetails.map((item) => (
                  <DetailCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <section className="rounded-2xl border border-[#e8e5dc] bg-white p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#1f220f]">
                  بيانات القريب
                </h3>
                <span className="rounded-full bg-[#f3f1e8] px-3 py-1 text-xs font-bold text-[#555d30]">
                  سجل فعلي
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {relativeDetails.map((item) => (
                  <DetailCard
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </section>
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
