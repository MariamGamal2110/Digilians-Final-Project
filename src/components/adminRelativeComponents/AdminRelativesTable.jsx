import { useState } from 'react'
import { FiEye, FiPrinter } from 'react-icons/fi'

function getValue(value) {
  if (value === null || value === undefined) {
    return 'غير متوفر'
  }

  if (typeof value === 'string' && value.trim() === '') {
    return 'غير متوفر'
  }

  return value
}

function buildPrintWindowContent(selectedStudent, relatives) {
  const rows = relatives.length
    ? relatives.map((relative) => `
        <tr>
          <td>${getValue(relative.relativeName)}</td>
          <td>${getValue(relative.relation)}</td>
          <td>${getValue(relative.nationalId)}</td>
          <td>${getValue(relative.birthDate)}</td>
          <td>${getValue(relative.job)}</td>
          <td>${getValue(relative.socialStatus)}</td>
          <td>${getValue(relative.phone ?? relative.phoneNumber)}</td>
          <td>${getValue(relative.address)}</td>
          <td>${getValue(relative.notes)}</td>
        </tr>
      `).join('')
    : `
      <tr>
        <td colspan="9" class="empty-state">لا توجد بيانات أقارب مسجلة لهذا الطالب</td>
      </tr>
    `

  return `
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <title>طباعة سجل الأقارب</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
            margin: 24px;
            color: #1f220f;
          }
          .wrapper {
            border: 1px solid #d9d9d9;
            border-radius: 16px;
            padding: 24px;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 28px;
          }
          p {
            margin: 0 0 8px;
            font-size: 14px;
          }
          .student-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            margin: 24px 0;
          }
          .student-card {
            border: 1px solid #e8e5dc;
            border-radius: 12px;
            padding: 12px;
            background: #fcfaf6;
          }
          .student-card strong {
            display: block;
            margin-bottom: 6px;
            color: #555d30;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
            font-size: 13px;
          }
          th, td {
            border: 1px solid #ddd6c6;
            padding: 10px 8px;
            text-align: center;
            vertical-align: top;
          }
          th {
            background: #f3f1e8;
          }
          .empty-state {
            padding: 18px;
            font-weight: bold;
            color: #555d30;
          }
          @media print {
            body {
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <h1>سجل الأقارب</h1>
          <p>بيانات الطالب والأقارب المسجلين</p>

          <div class="student-grid">
            <div class="student-card">
              <strong>اسم الطالب</strong>
              <span>${getValue(selectedStudent?.name)}</span>
            </div>
            <div class="student-card">
              <strong>الرقم العسكري</strong>
              <span>${getValue(selectedStudent?.militaryId)}</span>
            </div>
            <div class="student-card">
              <strong>البريد الإلكتروني</strong>
              <span>${getValue(selectedStudent?.email)}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>اسم القريب</th>
                <th>صلة القرابة</th>
                <th>الرقم القومي</th>
                <th>تاريخ الميلاد</th>
                <th>الوظيفة</th>
                <th>الحالة الاجتماعية</th>
                <th>رقم الهاتف</th>
                <th>العنوان</th>
                <th>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `
}

export default function AdminRelativesTable({
  selectedStudent,
  relatives,
  onSelectRelative = () => {},
  isLoading,
  error,
}) {
  const [printMessage, setPrintMessage] = useState('')

  function printRecord() {
    if (!selectedStudent) {
      setPrintMessage('اختر طالبًا أولًا لطباعة السجل')
      return
    }

    setPrintMessage('')

    const printWindow = window.open('', '_blank', 'width=1200,height=900')

    if (!printWindow) {
      setPrintMessage('تعذر فتح نافذة الطباعة')
      return
    }

    printWindow.document.open()
    printWindow.document.write(
      buildPrintWindowContent(selectedStudent, relatives),
    )
    printWindow.document.close()
    printWindow.focus()

    printWindow.onload = () => {
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="text-right">
          <h2 className="text-[#1f220f] text-xl font-bold">
            الأفراد المسجلين
          </h2>

          <p className="text-[#555d30] text-sm mt-1">
            {selectedStudent
              ? `يوجد ${relatives.length} من سجلات الأقارب للطالب ${selectedStudent.name}`
              : 'ابدأ بالبحث عن طالب لعرض بيانات الأقارب'}
          </p>
        </div>

        <button
          type="button"
          onClick={printRecord}
          className="bg-[#e8e5dc] text-[#1f220f] px-4 py-2 rounded-md font-bold text-sm hover:bg-[#d8d4c7] transition flex items-center gap-2"
        >
          طباعة السجل
          <FiPrinter />
        </button>
      </div>

      {printMessage && (
        <div className="mb-4 rounded-lg border border-[#e6dfcf] bg-[#fcfaf6] px-4 py-3 text-sm font-bold text-[#555d30]">
          {printMessage}
        </div>
      )}

      {!selectedStudent ? (
        <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[250px] flex items-center justify-center text-center text-[#555d30]">
          ابدأ بالبحث عن طالب لعرض بيانات الأقارب
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-[#f3f1e8] text-[#1f220f]">
                <th className="py-3 px-3 font-bold">الاسم</th>
                <th className="py-3 px-3 font-bold">القرابة</th>
                <th className="py-3 px-3 font-bold">الرقم القومي</th>
                <th className="py-3 px-3 font-bold">تاريخ الميلاد</th>
                <th className="py-3 px-3 font-bold">الوظيفة</th>
                <th className="py-3 px-3 font-bold">الحالة</th>
                <th className="py-3 px-3 font-bold">إجراءات</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center text-[#555d30] font-bold"
                  >
                    جاري تحميل بيانات الأقارب...
                  </td>
                </tr>
              )}

              {!isLoading && error && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center text-red-600 font-bold"
                  >
                    {error}
                  </td>
                </tr>
              )}

              {!isLoading && !error && relatives.map((relative) => (
                <tr
                  key={relative.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-4 px-3 text-[#1f220f]">
                    {relative.relativeName}
                  </td>

                  <td className="py-4 px-3 text-[#1f220f]">
                    {relative.relation}
                  </td>

                  <td className="py-4 px-3 text-[#1f220f]">
                    {relative.nationalId || '—'}
                  </td>

                  <td className="py-4 px-3 text-[#1f220f]">
                    {relative.birthDate || '—'}
                  </td>

                  <td className="py-4 px-3 text-[#1f220f]">
                    {relative.job || '—'}
                  </td>

                  <td className="py-4 px-3">
                    <span className="bg-[#e8e5dc] text-[#1f220f] rounded-md px-4 py-2 text-xs font-bold">
                      {relative.socialStatus || '—'}
                    </span>
                  </td>

                  <td className="py-4 px-3">
                    <button
                      type="button"
                      onClick={() => onSelectRelative(relative)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition mx-auto"
                      title="عرض التفاصيل"
                    >
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}

              {!isLoading && !error && relatives.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-8 text-center text-[#555d30] font-bold"
                  >
                    لا توجد بيانات أقارب لهذا الطالب
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
