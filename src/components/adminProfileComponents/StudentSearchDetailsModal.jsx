import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

export default function StudentSearchDetailsModal({ student, onClose }) {
  const [openedService, setOpenedService] = useState(null)
  const [openedPayments, setOpenedPayments] = useState(false)
  const [openedPunishments, setOpenedPunishments] = useState(false)

  if (!student) {
    return null
  }

  const busRequests = student.busRequests || []
  const permits = student.permits || []
  const petitions = student.petitions || []
  const holidayRequests = student.holidayRequests || []
  const payments = student.payments || []
  const punishments = student.punishments || []

  function getLastItem(list) {
    if (!list || list.length === 0) {
      return null
    }

    return list[list.length - 1]
  }

  const lastPayment = getLastItem(payments)

  const serviceRows = [
    {
      key: 'bus',
      title: 'حجز الأتوبيس للطالب',
      subtitle: 'عرض كل مرات حجز الأتوبيس السابقة والحالية',
      records: busRequests,
      emptyMessage: 'لا يوجد سجل لحجز الأتوبيس لهذا الطالب',
    },
    {
      key: 'permits',
      title: 'التصريح بعودة الطالب',
      subtitle: 'عرض مواعيد التصاريح وهل تمت في الموعد أو تأخرت',
      records: permits,
      emptyMessage: 'لا يوجد سجل للتصاريح لهذا الطالب',
    },
    {
      key: 'petitions',
      title: 'الالتماسات المقدَّم عليها من الطالب',
      subtitle: 'عرض كل الالتماسات المقبولة والمرفوضة وقيد المراجعة',
      records: petitions,
      emptyMessage: 'لا يوجد سجل للالتماسات لهذا الطالب',
    },
    {
      key: 'holidays',
      title: 'الإجازات الرسمية للطالب',
      subtitle: 'عرض رغبات النزول والإجازات الرسمية المسجلة',
      records: holidayRequests,
      emptyMessage: 'لا يوجد سجل للإجازات الرسمية لهذا الطالب',
    },
  ]

  const punishmentRow = {
    title: 'المخالفات والعقوبات للطالب',
    subtitle: 'عرض كل المخالفات والعقوبات القديمة والحالية',
    records: punishments,
    emptyMessage: 'لا توجد مخالفات أو عقوبات مسجلة لهذا الطالب',
  }

  function toggleService(key) {
    setOpenedService((currentKey) => {
      if (currentKey === key) {
        return null
      }

      return key
    })
  }

  function renderRecords(records, emptyMessage) {
    if (!records || records.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-[#ddd6c6] bg-[#fcfaf7] px-4 py-5 text-center">
          <p className="text-[#3b3120] text-sm font-bold">
            {emptyMessage}
          </p>
        </div>
      )
    }

    return (
      <div className="rounded-2xl border border-[#ece7da] bg-[#fcfaf6] overflow-hidden">
        <div className="bg-[#f7f3ea] border-b border-[#ece7da] px-4 py-3 flex items-center justify-between">
          <p className="text-[#3b3120] font-bold text-sm">
            السجل التفصيلي
          </p>

          <span className="bg-white border border-[#e5e0d3] text-[#3b3120] rounded-full px-3 py-1 text-xs font-bold">
            {records.length} سجل
          </span>
        </div>

        <div className="divide-y divide-[#ece7da]">
          {records.map((record, index) => (
            <div
              key={index}
              className="px-4 py-4 flex items-start gap-4 hover:bg-[#faf7f1] transition"
            >
              <span className="w-8 h-8 rounded-full border border-[#ddd6c6] bg-white text-[#3b3120] flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>

              <div className="flex-1 text-right">
                <p className="text-[#3b3120] font-extrabold text-sm leading-7">
                  {record.title}
                </p>

                <p className="text-[#3b3120] text-sm font-bold mt-1">
                  الحالة: {record.status}
                </p>

                {record.date && (
                  <p className="text-[#3b3120] text-xs mt-1">
                    التاريخ: {record.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderServiceAccordion() {
    return (
      <div className="rounded-2xl border border-[#e8e5dc] overflow-hidden bg-white">
        <div className="bg-[#f3f1e8] px-5 py-4 border-b border-[#e8e5dc]">
          <h3 className="text-[#3b3120] font-extrabold">
            الطلبات والخدمات
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {serviceRows.map((row) => {
            const isOpen = openedService === row.key

            return (
              <div
                key={row.key}
                className="rounded-2xl border border-[#ece7da] bg-[#fffdf9] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleService(row.key)}
                  className="w-full px-4 py-4 flex items-center justify-between gap-4 hover:bg-[#faf7f1] transition text-right"
                >
                  <div className="flex-1">
                    <p className="text-[#3b3120] font-extrabold text-sm leading-7">
                      {row.title}
                    </p>

                    <p className="text-[#3b3120] text-xs mt-1">
                      {row.subtitle}
                    </p>
                  </div>

                  <span className="w-9 h-9 rounded-full border border-[#ddd6c6] bg-white text-[#3b3120] flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <FiChevronUp size={17} />
                    ) : (
                      <FiChevronDown size={17} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    {renderRecords(row.records, row.emptyMessage)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  function renderPunishmentsAccordion() {
    return (
      <div className="rounded-2xl border border-[#e8e5dc] overflow-hidden bg-white">
        <div className="p-4 space-y-3">
          <div className="rounded-2xl border border-[#ece7da] bg-[#fffdf9] overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenedPunishments((value) => !value)}
              className="w-full px-4 py-4 flex items-center justify-between gap-4 hover:bg-[#faf7f1] transition text-right"
            >
              <div className="flex-1">
                <p className="text-[#3b3120] font-extrabold text-sm leading-7">
                  {punishmentRow.title}
                </p>

                <p className="text-[#3b3120] text-xs mt-1">
                  {punishmentRow.subtitle}
                </p>
              </div>

              <span className="w-9 h-9 rounded-full border border-[#ddd6c6] bg-white text-[#3b3120] flex items-center justify-center shrink-0">
                {openedPunishments ? (
                  <FiChevronUp size={17} />
                ) : (
                  <FiChevronDown size={17} />
                )}
              </span>
            </button>

            {openedPunishments && (
              <div className="px-4 pb-4">
                {renderRecords(
                  punishmentRow.records,
                  punishmentRow.emptyMessage
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[80] bg-black/45 flex items-center justify-center px-4">
      <div
        dir="rtl"
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#e8e5dc] overflow-hidden"
      >
        <div className="relative bg-[#f8f6f0] border-b border-[#e8e5dc] px-8 py-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-6 top-6 w-10 h-10 rounded-full border border-[#e8e5dc] flex items-center justify-center text-[#3b3120] hover:bg-[#f3f1e8] transition"
          >
            ×
          </button>

          <div className="flex items-center gap-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-24 h-24 rounded-2xl object-cover border border-[#c8cdb8]"
            />

            <div>
              <h2 className="text-[#3b3120] text-3xl font-extrabold mb-2">
                {student.name}
              </h2>

              <p className="text-[#3b3120] text-sm font-bold mb-1">
                الرقم العسكري: {student.militaryId}
              </p>

              <p className="text-[#3b3120] text-sm">
                {student.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setOpenedPayments((value) => !value)}
              className="rounded-2xl border border-[#e8e5dc] p-5 text-center hover:bg-[#faf9f4] transition"
            >
              <p className="text-[#3b3120] text-sm mb-2">
                إجمالي المصروفات للطالب
              </p>

              <p className="text-[#3b3120] font-extrabold">
                {lastPayment ? lastPayment.status : 'لا يوجد'}
              </p>
            </button>

            <div className="rounded-2xl border border-[#e8e5dc] p-5 text-center">
              <p className="text-[#3b3120] text-sm mb-2">
                أيام الغياب
              </p>

              <p className="text-[#3b3120] font-extrabold text-3xl">
                {student.absenceDays}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e5dc] p-5 text-center">
              <p className="text-[#3b3120] text-sm mb-2">
                درجات السلوك
              </p>

              <p className="text-[#3b3120] font-extrabold text-3xl">
                {student.behaviorGrade}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e5dc] p-5 text-center">
              <p className="text-[#3b3120] text-sm mb-2">
                مدة التخصص
              </p>

              <p className="text-[#3b3120] font-extrabold text-xl">
                {student.duration}
              </p>
            </div>
          </div>

          {openedPayments && (
            <div className="mb-6 rounded-2xl border border-[#e8e5dc] overflow-hidden bg-white">
              <div className="bg-[#f3f1e8] px-5 py-4 flex items-center justify-between border-b border-[#e8e5dc]">
                <h3 className="text-[#3b3120] font-extrabold">
                  سجل المصروفات
                </h3>

                <button
                  type="button"
                  onClick={() => setOpenedPayments(false)}
                  className="w-9 h-9 rounded-full border border-[#ddd6c6] bg-white text-[#3b3120] flex items-center justify-center"
                >
                  <FiChevronUp size={17} />
                </button>
              </div>

              <div className="p-5">
                {renderRecords(
                  payments,
                  'لا يوجد سجل مصروفات لهذا الطالب'
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {renderServiceAccordion()}

            {renderPunishmentsAccordion()}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#555d30] text-white rounded-xl px-8 py-3 font-bold hover:bg-[#454c27] transition"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
