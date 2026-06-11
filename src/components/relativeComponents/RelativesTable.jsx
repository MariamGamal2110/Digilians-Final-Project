import { useState } from 'react'
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'
import AddRelativeModal from './AddRelativeModal'

export default function RelativesTable({
  searchText,
  relatives,
  isLoading,
  error,
  onCreateRelative,
  onUpdateRelative,
  onDeleteRelative,
}) {
  const [showModal, setShowModal] = useState(false)
  const [selectedRelative, setSelectedRelative] = useState(null)
  const [modalError, setModalError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredRelatives = relatives.filter((relative) => {
    const searchValue = searchText.trim().toLowerCase()

    if (searchValue === '') {
      return true
    }

    return (
      (relative.relativeName || '').toLowerCase().includes(searchValue) ||
      (relative.relation || '').toLowerCase().includes(searchValue) ||
      (relative.nationalId || '').toLowerCase().includes(searchValue) ||
      (relative.birthDate || '').toLowerCase().includes(searchValue) ||
      (relative.job || '').toLowerCase().includes(searchValue) ||
      (relative.socialStatus || '').toLowerCase().includes(searchValue) ||
      (relative.phone || '').toLowerCase().includes(searchValue) ||
      (relative.address || '').toLowerCase().includes(searchValue)
    )
  })

  function openAddModal() {
    setSelectedRelative(null)
    setModalError('')
    setShowModal(true)
  }

  function openEditModal(relative) {
    setSelectedRelative(relative)
    setModalError('')
    setShowModal(true)
  }

  function closeModal() {
    setSelectedRelative(null)
    setModalError('')
    setShowModal(false)
  }

  async function handleSubmit(relativeData) {
    setIsSubmitting(true)
    setModalError('')

    try {
      if (selectedRelative) {
        await onUpdateRelative(selectedRelative.id, relativeData)
      } else {
        await onCreateRelative(relativeData)
      }

      closeModal()
    } catch (submitError) {
      setModalError(submitError.message || 'تعذر حفظ البيانات')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteRelative(relativeId) {
    const confirmDelete = confirm('هل أنتِ متأكدة من حذف هذا السجل؟')

    if (!confirmDelete) {
      return
    }

    await onDeleteRelative(relativeId)
  }

  function viewRelative(relative) {
    alert(
      `الاسم: ${relative.relativeName}
صلة القرابة: ${relative.relation}
الرقم القومي: ${relative.nationalId || 'غير متوفر'}
تاريخ الميلاد: ${relative.birthDate || 'غير متوفر'}
الوظيفة: ${relative.job || 'غير متوفر'}
الحالة الاجتماعية: ${relative.socialStatus || 'غير متوفر'}
رقم الهاتف: ${relative.phone || 'غير متوفر'}
العنوان: ${relative.address || 'غير متوفر'}
ملاحظات: ${relative.notes || 'لا توجد'}`,
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#1f220f] font-bold flex items-center gap-2">
          بيانات الأقارب المسجلة
          <span className="text-[#555d30]">👥</span>
        </h2>

        <button
          onClick={openAddModal}
          className="bg-[#e8e5dc] text-[#1f220f] px-5 py-3 rounded-md font-bold text-sm transition-all duration-200 hover:bg-[#555d30] hover:text-white active:bg-[#3f4723] active:text-white focus:bg-[#555d30] focus:text-white focus:outline-none"
        >
          + إضافة سجل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-[#f3f1e8] text-[#1f220f]">
              <th className="py-3 px-4 font-bold">الاسم</th>
              <th className="py-3 px-4 font-bold">صلة القرابة</th>
              <th className="py-3 px-4 font-bold">الرقم القومي</th>
              <th className="py-3 px-4 font-bold">تاريخ الميلاد</th>
              <th className="py-3 px-4 font-bold">الوظيفة</th>
              <th className="py-3 px-4 font-bold">الحالة الاجتماعية</th>
              <th className="py-3 px-4 font-bold">إجراءات</th>
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

            {!isLoading && !error && filteredRelatives.map((relative) => (
              <tr
                key={relative.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <td className="py-4 px-4 text-[#1f220f]">
                  {relative.relativeName}
                </td>

                <td className="py-4 px-4 text-[#1f220f]">
                  {relative.relation}
                </td>

                <td className="py-4 px-4 text-[#1f220f]">
                  {relative.nationalId || '—'}
                </td>

                <td className="py-4 px-4 text-[#1f220f]">
                  {relative.birthDate || '—'}
                </td>

                <td className="py-4 px-4 text-[#1f220f]">
                  {relative.job || '—'}
                </td>

                <td className="py-4 px-4">
                  <span className="bg-[#e8e5dc] text-[#1f220f] rounded-md px-4 py-2 text-xs font-bold">
                    {relative.socialStatus || '—'}
                  </span>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => viewRelative(relative)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                      title="عرض"
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      onClick={() => openEditModal(relative)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                      title="تعديل"
                    >
                      <FiEdit2 size={17} />
                    </button>

                    <button
                      onClick={() => deleteRelative(relative.id)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                      title="حذف"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!isLoading && !error && filteredRelatives.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-[#555d30] font-bold"
                >
                  {relatives.length === 0
                    ? 'لا توجد بيانات أقارب مسجلة بعد'
                    : 'لا توجد نتائج مطابقة للبحث'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddRelativeModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          selectedRelative={selectedRelative}
          isSubmitting={isSubmitting}
          errorMessage={modalError}
        />
      )}
    </div>
  )
}
