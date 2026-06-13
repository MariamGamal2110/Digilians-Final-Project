import { useState } from 'react'
import {
  FiFileText,
  FiList,
  FiPrinter,
  FiUsers,
  FiX,
} from 'react-icons/fi'

function ActionReportModal({ action, onClose }) {
  if (!action) return null

  const students = action.students || []

  function handlePrint() {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/45 flex items-center justify-center px-4">
      <div
        dir="rtl"
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#e8e5dc]"
      >
        <div className="relative px-8 py-7 text-right border-b border-[#e8e5dc] bg-[#f8f6f0]">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-6 top-6 w-10 h-10 rounded-full border border-[#e8e5dc] flex items-center justify-center text-[#1f220f] hover:bg-[#f3f1e8] transition"
          >
            <FiX size={20} />
          </button>

          <p className="text-[#7b815f] text-sm font-bold mb-2">
            تقرير إداري تفصيلي
          </p>

          <h2 className="text-[#1f220f] text-2xl font-extrabold mb-2">
            {action.title}
          </h2>

          <p className="text-[#7b815f] text-sm">
            قائمة الطلاب المرتبطين بهذا الإجراء
          </p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-[#e8e5dc] rounded-2xl p-5 text-center">
              <p className="text-[#7b815f] text-sm mb-2">نوع التقرير</p>

              <p className="text-[#1f220f] font-extrabold">
                {action.reportType}
              </p>
            </div>

            <div className="border border-[#e8e5dc] rounded-2xl p-5 text-center">
              <p className="text-[#7b815f] text-sm mb-2">عدد الطلاب</p>

              <p className="text-[#555d30] font-extrabold text-3xl">
                {students.length}
              </p>
            </div>

            <div className="border border-[#e8e5dc] rounded-2xl p-5 text-center">
              <p className="text-[#7b815f] text-sm mb-2">حالة البيانات</p>

              <p className="text-[#1f220f] font-extrabold">
                محدثة
              </p>
            </div>
          </div>

          <div className="border border-[#e8e5dc] rounded-2xl overflow-hidden mb-5">
            <div className="bg-[#f3f1e8] px-5 py-4">
              <h3 className="text-[#1f220f] font-extrabold">
                قائمة الطلاب
              </h3>
            </div>

            <table className="w-full text-sm text-right">
              <thead>
                <tr className="bg-[#faf9f4] border-b border-[#e8e5dc]">
                  <th className="px-5 py-4 font-bold text-[#1f220f]">
                    الرقم
                  </th>

                  <th className="px-5 py-4 font-bold text-[#1f220f]">
                    اسم الطالب
                  </th>

                  <th className="px-5 py-4 font-bold text-[#1f220f]">
                    {action.detailLabel || 'التفاصيل'}
                  </th>

                  <th className="px-5 py-4 font-bold text-[#1f220f]">
                    {action.punishmentLabel || 'الإجراء'}
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr
                      key={`${student.name}-${index}`}
                      className="border-b border-[#f1eee5] last:border-b-0 hover:bg-[#faf9f4] transition"
                    >
                      <td className="px-5 py-4 text-[#555d30] font-bold">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 text-[#1f220f] font-bold">
                        {student.name}
                      </td>

                      <td className="px-5 py-4 text-[#555d30] font-medium">
                        {student.detail}
                      </td>

                      <td className="px-5 py-4 text-[#1f220f] font-medium">
                        {student.punishment}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 py-8 text-center text-[#7b815f] font-medium"
                    >
                      لا توجد بيانات طلاب لهذا الإجراء
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="bg-[#f3f1e8] px-6 py-5 flex items-center justify-between">
              <p className="text-[#1f220f] font-extrabold">
                إجمالي عدد الطلاب
              </p>

              <div className="w-12 h-12 rounded-full bg-[#555d30] text-white flex items-center justify-center font-extrabold text-lg">
                {students.length}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border border-[#e8e5dc] rounded-2xl px-5 py-4">
            <p className="text-[#7b815f] text-sm leading-7">
              هذا التقرير يعرض أسماء الطلاب المرتبطين بهذا الإجراء الإداري.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#555d30] text-white rounded-xl px-5 py-3 text-sm font-bold flex items-center gap-2 hover:bg-[#454c27] transition"
              >
                <FiPrinter />
                طباعة التقرير
              </button>

              <button
                type="button"
                onClick={onClose}
                className="border border-[#e8e5dc] text-[#1f220f] rounded-xl px-5 py-3 text-sm font-bold hover:bg-[#f3f1e8] transition"
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

function AllActionsModal({ actions, onClose, onSelectAction }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center px-4 py-6">
      <div
        dir="rtl"
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-[#e8e5dc] max-h-[85vh] flex flex-col"
      >
        <div className="relative px-8 py-6 border-b border-[#e8e5dc] bg-[#f8f6f0] shrink-0">
          <div className="text-right">
            <h2 className="text-[#1f220f] text-2xl font-extrabold mb-2">
              جميع الإجراءات الموثقة
            </h2>

            <p className="text-[#7b815f] text-sm">
              قائمة مختصرة بكل الإجراءات الإدارية المسجلة
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute left-6 top-6 w-10 h-10 rounded-full border border-[#e8e5dc] flex items-center justify-center text-[#1f220f] hover:bg-[#f3f1e8] transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 bg-[#fcfbf8] overflow-y-auto">
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
                      {action.students?.length || 0}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectAction(action)}
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
            type="button"
            onClick={onClose}
            className="w-full mt-6 border border-[#d9d2c4] text-[#6b5b3e] rounded-lg py-3 font-bold hover:bg-[#f6f2e8] transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  )
}

function ActionsListSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-[#eee9dc]" />
          <div className="h-4 w-24 rounded bg-[#f3f1e8]" />
        </div>
        <div className="w-11 h-11 rounded-xl bg-[#f3f1e8]" />
      </div>

      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center justify-between gap-5 px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f3f1e8]" />
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-[#eee9dc]" />
              <div className="h-3 w-24 rounded bg-[#f3f1e8]" />
            </div>
          </div>
          <div className="h-5 w-10 rounded bg-[#eee9dc]" />
        </div>
      ))}
    </div>
  )
}

export default function AdminActionsList({ actions = [], isRefreshingProfile = false }) {
  const [selectedAction, setSelectedAction] = useState(null)
  const [showAllActionsModal, setShowAllActionsModal] = useState(false)

  const safeActions = Array.isArray(actions) ? actions : []
  const latestActions = safeActions.slice(0, 3)

  function openActionFromAllActions(action) {
    setShowAllActionsModal(false)
    setSelectedAction(action)
  }

  if (isRefreshingProfile && safeActions.length === 0) {
    return <ActionsListSkeleton />
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-[#1f220f] text-xl font-extrabold">
              أحدث الإجراءات الإدارية
            </h2>

            <p className="text-[#7b815f] text-sm mt-1">
              آخر 30 يوم
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-[#f3f1e8] text-[#555d30] flex items-center justify-center">
            <FiList size={20} />
          </div>
        </div>

        <div>
          {latestActions.length > 0 ? (
            latestActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => setSelectedAction(action)}
                className="w-full flex items-center justify-between gap-5 px-6 py-5 border-b border-gray-100 last:border-b-0 hover:bg-[#faf9f4] transition text-right"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] text-[#555d30] flex items-center justify-center shrink-0">
                    <FiFileText size={20} />
                  </div>

                  <div>
                    <h3 className="text-[#1f220f] font-extrabold text-sm mb-1">
                      {action.title}
                    </h3>

                    <p className="text-[#7b815f] text-xs">
                      {action.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#555d30] font-bold text-sm">
                  <FiUsers size={17} />
                  {action.students?.length || 0}
                </div>
              </button>
            ))
          ) : (
            <div className="px-6 py-10 text-center">
              <p className="text-[#7b815f] font-medium">
                لا توجد إجراءات إدارية حاليًا
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowAllActionsModal(true)}
          className="w-full bg-[#f3f1e8] text-[#1f220f] font-extrabold py-4 hover:bg-[#e8e5dc] transition"
        >
          عرض جميع الإجراءات الموثقة
        </button>
      </div>

      {showAllActionsModal && (
        <AllActionsModal
          actions={safeActions}
          onClose={() => setShowAllActionsModal(false)}
          onSelectAction={openActionFromAllActions}
        />
      )}

      {selectedAction && (
        <ActionReportModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
        />
      )}
    </>
  )
}
