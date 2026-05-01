import { useState } from 'react'
import { FiFileText, FiPrinter, FiX } from 'react-icons/fi'

const actions = [
  {
    id: 1,
    title: 'عدد الطلاب الواقع عليهم المخالفات',
    time: 'منذ يومين',
    reportType: 'المخالفات بجميع أنواعها',
    detailLabel: 'نوع المخالفة',
    punishmentLabel: 'العقوبة',
    students: [
      {
        name: 'أحمد محمد',
        detail: 'تأخير عن الطابور',
        punishment: 'تأخير 3 ساعات',
      },
      {
        name: 'محمد عبد الرحمن',
        detail: 'عدم الالتزام بالزي',
        punishment: 'حرمان من الإجازة',
      },
      {
        name: 'ياسين إبراهيم',
        detail: 'غياب بدون إذن',
        punishment: 'إنذار إداري',
      },
      {
        name: 'محمود علي',
        detail: 'مخالفة تعليمات السكن',
        punishment: 'خصم درجات سلوك',
      },
    ],
  },
  {
    id: 2,
    title: 'عدد الطلاب الغير مسددين للمصروفات',
    time: 'منذ 4 أيام',
    reportType: 'عدم سداد المصروفات',
    detailLabel: 'حالة السداد',
    punishmentLabel: 'ملاحظات',
    students: [
      {
        name: 'أحمد محمد',
        detail: ' لم يتم السداد',
        punishment: 'جاري ارسال المندوب',
      },
      {
        name: 'سيف خالد',
        detail: 'لم يتم السداد ',
        punishment: 'تم ارسال المندوب',
      },
      {
        name: 'عبد الله سعيد',
        detail: 'لم يتم السداد  ',
        punishment: 'تم ارسال المندوب',
      },
      {
        name: 'مروان حسن',
        detail: 'لم يتم السداد ',
        punishment: 'جاري ارسال المندوب',
      },
      {
        name: 'يوسف إبراهيم',
        detail: 'لم يتم السداد   ',
        punishment: 'تم ارسال المندوب',
      },
    ],
  },
  {
    id: 3,
    title: 'عدد الطلاب المتقدمين بالالتماسات',
    time: 'منذ 5 أيام',
    reportType: 'طلبات الالتماس ',
    detailLabel: 'نوع الالتماس',
    punishmentLabel: 'الحالة',
    students: [
      {
        name: 'ياسين إبراهيم',
        detail: 'الالتماس بالخروج لأداء الامتحانات',
        punishment: 'قيد المراجعة',
      },
      {
        name: 'كريم محمود',
        detail: 'الالتماس بالخروج لحاله وفاه',
        punishment: 'تم الاستلام',
      },
      {
        name: 'حسن سمير',
        detail: 'الالتماس بالخروج لمناسبه من الدرجه الاولي ',
        punishment: 'قيد المراجعة',
      },
    ],
  },
  {
    id: 4,
    title: 'عدد طلبات الراغبين في حجز الأتوبيس',
    time: 'منذ أسبوع',
    reportType: 'طلبات حجز الأتوبيس',
    detailLabel: 'خط السير',
    punishmentLabel: 'حالة الحجز',
    students: [
      {
        name: 'أحمد محمد',
        detail: ' موقف السلام ',
        punishment: 'مؤكد',
      },
      {
        name: 'محمد عبد الرحمن',
        detail: ' موقف السلام ',
        punishment: 'مؤكد',
      },
      {
        name: 'يوسف إبراهيم',
        detail: ' موقف عبود ',
        punishment: 'قيد المراجعة',
      },
    ],
  },
  {
    id: 5,
    title: 'عدد الطلاب بالأجازات الرسميه ',
    time: 'منذ 3 أيام',
    reportType: 'الرغبه في الأجازات',
    detailLabel: 'الرغبه',
    punishmentLabel: 'الحالة',
    students: [
      {
        name: 'سيف خالد',
        detail: 'يرغب في النزول  ',
        punishment: 'موافق عليه',
      },
      {
        name: 'مروان حسن',
        detail: 'يرغب في النزول   ',
        punishment: 'موافق عليه',
      },
      {
        name: 'عبد الله سعيد',
        detail: '  لا يرغب في النزول',
        punishment: 'غير موافق عليه',
      },
      {
        name: 'كريم محمود',
        detail: '  لا يرغب في النزول',
        punishment: 'موافق عليه',
      },
    ],
  },
]

export default function AdminActionsList() {
  const [selectedAction, setSelectedAction] = useState(null)
  const [showAllActions, setShowAllActions] = useState(false)

  function openActionDetails(action) {
    setSelectedAction(action)
  }

  function closeActionDetails() {
    setSelectedAction(null)
  }

  function openAllActions() {
    setShowAllActions(true)
  }

  function closeAllActions() {
    setShowAllActions(false)
  }

  function openDetailsFromAllActions(action) {
    setShowAllActions(false)
    setSelectedAction(action)
  }

  function printReport() {
    if (!selectedAction) {
      return
    }

    const studentsRows = selectedAction.students
      .map((student, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.detail}</td>
            <td>${student.punishment}</td>
          </tr>
        `
      })
      .join('')

    const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>${selectedAction.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              direction: rtl;
            }

            h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }

            p {
              font-size: 16px;
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th,
            td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: center;
              font-size: 15px;
            }

            th {
              background: #f3f1e8;
            }

            .total {
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
            }
          </style>
        </head>

        <body>
          <h1>${selectedAction.title}</h1>
          <p>نوع التقرير: ${selectedAction.reportType}</p>
          <p>عدد الطلاب: ${selectedAction.students.length}</p>

          <table>
            <thead>
              <tr>
                <th>رقم</th>
                <th>اسم الطالب</th>
                <th>${selectedAction.detailLabel}</th>
                <th>${selectedAction.punishmentLabel}</th>
              </tr>
            </thead>

            <tbody>
              ${studentsRows}
            </tbody>
          </table>

          <p class="total">إجمالي عدد الطلاب: ${selectedAction.students.length} طلاب</p>
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-[#1f220f] font-bold text-right">
            أحدث الإجراءات الإدارية
          </h2>

          <p className="text-[#555d30] text-sm">
            آخر 30 يوم
          </p>
        </div>

        <div>
          {actions.slice(0, 3).map((action) => (
            <button
              key={action.id}
              onClick={() => openActionDetails(action)}
              className="w-full flex items-center justify-between px-6 py-5 border-b border-gray-200 hover:bg-[#faf9f4] transition text-right"
            >
              <div className="text-right">
                <p className="text-[#1f220f] font-bold text-sm mb-1">
                  {action.title}
                </p>

                <p className="text-[#555d30] text-xs">
                  {action.time}
                </p>
              </div>

              <div className="w-11 h-11 rounded-lg bg-[#e8e5dc] flex items-center justify-center text-[#555d30]">
                <FiFileText size={20} />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={openAllActions}
          className="w-full bg-[#f3f1e8] text-[#1f220f] py-4 font-bold hover:bg-[#e8e5dc] transition"
        >
          عرض جميع الإجراءات الموثقة
        </button>
      </div>

      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            dir="rtl"
            className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-[#e6e1d5] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
          >
            <div className="border-b border-[#ece7dc] bg-gradient-to-l from-[#f8f6f0] to-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={closeActionDetails}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd6c8] text-[#6b5b3e] transition hover:bg-[#f3efe4]"
                  title="إغلاق"
                >
                  <FiX size={21} />
                </button>

                <div className="flex-1 text-center">
                  <p className="mb-1 text-sm font-medium text-[#8a7a58]">
                    تقرير إداري تفصيلي
                  </p>

                  <h3 className="text-2xl font-extrabold text-[#1f220f]">
                    {selectedAction.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#7a7a68]">
                    قائمة الطلاب المرتبطين بهذا الإجراء
                  </p>
                </div>

                <div className="w-10 h-10"></div>
              </div>
            </div>

            <div className="bg-[#fcfbf8] px-6 py-5">
              <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-[#e7e1d5] bg-white p-4 text-center shadow-sm">
                  <p className="mb-2 text-sm font-medium text-[#7a7a68]">
                    نوع التقرير
                  </p>

                  <p className="text-base font-bold text-[#1f220f]">
                    {selectedAction.reportType}
                  </p>
                </div>

                <div className="rounded-xl border border-[#e7e1d5] bg-white p-4 text-center shadow-sm">
                  <p className="mb-2 text-sm font-medium text-[#7a7a68]">
                    عدد الطلاب
                  </p>

                  <p className="text-2xl font-extrabold text-[#5d6631]">
                    {selectedAction.students.length}
                  </p>
                </div>

                <div className="rounded-xl border border-[#e7e1d5] bg-white p-4 text-center shadow-sm">
                  <p className="mb-2 text-sm font-medium text-[#7a7a68]">
                    حالة البيانات
                  </p>

                  <p className="text-base font-bold text-[#1f220f]">
                    محدثة
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#e7e1d5] bg-white shadow-sm">
                <div className="border-b border-[#ece7dc] bg-[#f4f1e8] px-5 py-3">
                  <h4 className="text-base font-bold text-[#1f220f]">
                    قائمة الطلاب
                  </h4>
                </div>

                <div className="overflow-hidden">
                  <div className="grid grid-cols-4 bg-[#faf8f2] px-5 py-3 text-sm font-bold text-[#1f220f]">
                    <div className="text-center">الرقم</div>
                    <div className="text-right">اسم الطالب</div>
                    <div className="text-right">{selectedAction.detailLabel}</div>
                    <div className="text-right">{selectedAction.punishmentLabel}</div>
                  </div>

                  {selectedAction.students.map((student, index) => (
                    <div
                      key={`${student.name}-${index}`}
                      className={
                        index !== selectedAction.students.length - 1
                          ? 'grid grid-cols-4 px-5 py-3 text-sm transition hover:bg-[#faf9f4] border-t border-[#f0ece3]'
                          : 'grid grid-cols-4 px-5 py-3 text-sm transition hover:bg-[#faf9f4]'
                      }
                    >
                      <div className="text-center font-bold text-[#5d6631]">
                        {index + 1}
                      </div>

                      <div className="text-right font-medium text-[#1f220f]">
                        {student.name}
                      </div>

                      <div className="text-right text-[#555d30] font-bold">
                        {student.detail}
                      </div>

                      <div className="text-right text-[#1f220f] font-bold">
                        {student.punishment}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-[#e8e2d6] bg-[#f4f1e8] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-[#7a7a68] text-xs font-medium mb-1">
                          ملخص القائمة
                        </p>

                        <p className="text-[#1f220f] font-extrabold text-xl">
                          إجمالي عدد الطلاب
                        </p>
                      </div>

                      <div className="w-14 h-14 rounded-full bg-[#5d6631] text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
                        {selectedAction.students.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#ebe5d9] bg-white px-5 py-4 md:flex-row md:items-center">
                <div className="text-right">
                  <p className="text-sm text-[#7a7a68]">
                    هذا التقرير يعرض أسماء الطلاب المرتبطين بهذا الإجراء الإداري.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={closeActionDetails}
                    className="rounded-lg border border-[#d9d2c4] px-5 py-2 text-sm font-bold text-[#6b5b3e] transition hover:bg-[#f6f2e8]"
                  >
                    إغلاق
                  </button>

                  <button
                    onClick={printReport}
                    className="rounded-lg bg-[#5d6631] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#4f5728] flex items-center gap-2"
                  >
                    طباعة التقرير
                    <FiPrinter />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllActions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div
            dir="rtl"
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#e6e1d5] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#f8f6f0]">
              <button
                onClick={closeAllActions}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] transition"
                title="إغلاق"
              >
                <FiX size={21} />
              </button>

              <div className="text-right">
                <h3 className="text-[#1f220f] text-xl font-extrabold">
                  جميع الإجراءات الموثقة
                </h3>

                <p className="text-[#7a7a68] text-sm mt-1">
                  قائمة مختصرة بكل الإجراءات الإدارية المسجلة
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#fcfbf8] max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    className="bg-white border border-[#e7e1d5] rounded-xl p-5 hover:shadow-sm transition"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-right">
                        <h4 className="text-[#1f220f] font-bold mb-2">
                          {action.title}
                        </h4>

                        <p className="text-[#555d30] text-sm mb-1">
                          نوع التقرير: {action.reportType}
                        </p>

                        <p className="text-[#7a7a68] text-xs">
                          {action.time}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#5d6631] text-white flex items-center justify-center font-extrabold text-lg">
                          {action.students.length}
                        </div>

                        <button
                          onClick={() => openDetailsFromAllActions(action)}
                          className="bg-[#e8e5dc] text-[#1f220f] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#d8d4c7] transition"
                        >
                          عرض التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={closeAllActions}
                className="w-full mt-6 border border-[#d9d2c4] text-[#6b5b3e] rounded-lg py-3 font-bold hover:bg-[#f6f2e8] transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}