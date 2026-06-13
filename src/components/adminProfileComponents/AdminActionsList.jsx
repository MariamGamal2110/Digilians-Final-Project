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
    <div className="fixed inset-0 z-[60] bg-black/45 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
      <div
        dir="rtl"
        className="mx-auto flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white shadow-2xl"
      >
        <div className="relative shrink-0 border-b border-[#e8e5dc] bg-[#f8f6f0] px-5 py-5 text-right sm:px-8 sm:py-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e5dc] text-[#1f220f] transition hover:bg-[#f3f1e8] sm:left-6 sm:top-6"
          >
            <FiX size={20} />
          </button>

          <p className="text-[#7b815f] text-sm font-bold mb-2">
            تقرير إداري تفصيلي
          </p>

          <h2 className="mb-2 pl-12 text-xl font-extrabold text-[#1f220f] sm:pl-0 sm:text-2xl">
            {action.title}
          </h2>

          <p className="text-[#7b815f] text-sm">
            {action.reportDescription || 'قائمة الطلاب المرتبطين بهذا الإجراء'}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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

            <div className="mb-5 overflow-hidden rounded-2xl border border-[#e8e5dc]">
              <div className="bg-[#f3f1e8] px-4 py-4 sm:px-5">
                <h3 className="text-[#1f220f] font-extrabold">
                  قائمة الطلاب
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-right text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e5dc] bg-[#faf9f4]">
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
                          className="border-b border-[#f1eee5] transition hover:bg-[#faf9f4] last:border-b-0"
                        >
                          <td className="px-5 py-4 font-bold text-[#555d30]">
                            {index + 1}
                          </td>

                          <td className="px-5 py-4 font-bold text-[#1f220f]">
                            {student.name}
                          </td>

                          <td className="px-5 py-4 font-medium text-[#555d30]">
                            {student.detail}
                          </td>

                          <td className="px-5 py-4 font-medium text-[#1f220f]">
                            {student.punishment}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-5 py-8 text-center font-medium text-[#7b815f]"
                        >
                          {action.emptyMessage || 'لا توجد بيانات'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between bg-[#f3f1e8] px-4 py-5 sm:px-6">
                <p className="font-extrabold text-[#1f220f]">
                  إجمالي عدد الطلاب
                </p>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#555d30] text-lg font-extrabold text-white">
                  {students.length}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-[#e8e5dc] px-4 py-4 sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm leading-7 text-[#7b815f]">
                {action.summaryNote || 'هذا التقرير يعرض أسماء الطلاب المرتبطين بهذا الإجراء الإداري.'}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#555d30] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#454c27]"
                >
                  <FiPrinter />
                  طباعة التقرير
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#e8e5dc] px-5 py-3 text-sm font-bold text-[#1f220f] transition hover:bg-[#f3f1e8]"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AllActionsModal({ actions, onClose, onSelectAction }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/45 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
      <div
        dir="rtl"
        className="mx-auto flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white shadow-2xl"
      >
        <div className="relative shrink-0 border-b border-[#e8e5dc] bg-[#f8f6f0] px-5 py-5 sm:px-8 sm:py-6">
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
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e5dc] text-[#1f220f] transition hover:bg-[#f3f1e8] sm:left-6 sm:top-6"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto bg-[#fcfbf8] p-4 sm:p-6">
          <div className="space-y-4">
            {actions.map((action) => (
              <div
                key={action.id}
                className="bg-white border border-[#e7e1d5] rounded-xl p-5 hover:shadow-sm transition"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

                  <div className="flex items-center justify-between gap-3 sm:justify-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5d6631] text-lg font-extrabold text-white">
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
            className="mt-6 w-full rounded-lg border border-[#d9d2c4] py-3 font-bold text-[#6b5b3e] transition hover:bg-[#f6f2e8]"
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

  const safeActions = Array.isArray(actions)
    ? [...actions].sort((firstAction, secondAction) => {
        const firstTimestamp = firstAction?.sortTimestamp || 0
        const secondTimestamp = secondAction?.sortTimestamp || 0
        return secondTimestamp - firstTimestamp
      })
    : []
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
