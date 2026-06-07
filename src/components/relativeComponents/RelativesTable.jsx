import { useState } from 'react'
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'
import AddRelativeModal from './AddRelativeModal'
import { getSavedUser } from '../../api/client'

export default function RelativesTable({ searchText }) {
    const [showModal, setShowModal] = useState(false)
    const [selectedRelative, setSelectedRelative] = useState(null)
    
    // Check authorization
    const user = getSavedUser('admin')
    const adminRoles = ["admin", "commander", "super_admin"]
    const isAuthorized = user && adminRoles.includes(user.role)

    const [relatives, setRelatives] = useState([
        {
            id: 1,
            name: 'محمود إبراهيم علي',
            relation: 'أب',
            nationalId: '270091201014432',
            birthDate: '1970-05-12',
            job: 'يعمل بالخارج',
            socialStatus: 'متزوج',
        },
        {
            id: 2,
            name: 'سماح حسن كامل',
            relation: 'أم',
            nationalId: '27508200109881',
            birthDate: '1975-06-20',
            job: 'ربة منزل',
            socialStatus: 'متزوجة',
        },
    ])

    const filteredRelatives = relatives.filter((relative) => {
        const searchValue = searchText.trim().toLowerCase()

        if (searchValue === '') {
            return true
        }

        return (
            relative.name.toLowerCase().includes(searchValue) ||
            relative.relation.toLowerCase().includes(searchValue) ||
            relative.nationalId.toLowerCase().includes(searchValue) ||
            relative.birthDate.toLowerCase().includes(searchValue) ||
            relative.job.toLowerCase().includes(searchValue) ||
            relative.socialStatus.toLowerCase().includes(searchValue)
        )
    })

    function openAddModal() {
        setSelectedRelative(null)
        setShowModal(true)
    }

    function openEditModal(relative) {
        setSelectedRelative(relative)
        setShowModal(true)
    }

    function closeModal() {
        setSelectedRelative(null)
        setShowModal(false)
    }

    function addRelative(newRelative) {
        setRelatives([...relatives, newRelative])
        closeModal()
    }

    function editRelative(updatedRelative) {
        const updatedRelatives = relatives.map((relative) => {
            if (relative.id === updatedRelative.id) {
                return updatedRelative
            }

            return relative
        })

        setRelatives(updatedRelatives)
        closeModal()
    }

function deleteRelative(relativeId) {
        // Check authorization before delete
        const user = getSavedUser('admin')
        const adminRoles = ["admin", "commander", "super_admin"]
        
        if (!user || !adminRoles.includes(user.role)) {
            alert("غير مصرح لك بالدخول لهذه العملية")
            return
        }
        
        const confirmDelete = confirm('هل أنتِ متأكدة من حذف هذا السجل؟')

        if (!confirmDelete) {
            return
        }

        const filteredData = relatives.filter((relative) => {
            return relative.id !== relativeId
        })

        setRelatives(filteredData)
    }

    function viewRelative(relative) {
        alert(
            `الاسم: ${relative.name}
صلة القرابة: ${relative.relation}
الرقم القومي: ${relative.nationalId}
تاريخ الميلاد: ${relative.birthDate}
الوظيفة: ${relative.job}
الحالة الاجتماعية: ${relative.socialStatus}`
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
                        {filteredRelatives.map((relative) => (
                            <tr
                                key={relative.id}
                                className="border-b border-gray-200 last:border-b-0"
                            >
                                <td className="py-4 px-4 text-[#1f220f]">
                                    {relative.name}
                                </td>

                                <td className="py-4 px-4 text-[#1f220f]">
                                    {relative.relation}
                                </td>

                                <td className="py-4 px-4 text-[#1f220f]">
                                    {relative.nationalId}
                                </td>

                                <td className="py-4 px-4 text-[#1f220f]">
                                    {relative.birthDate}
                                </td>

                                <td className="py-4 px-4 text-[#1f220f]">
                                    {relative.job}
                                </td>

                                <td className="py-4 px-4">
                                    <span className="bg-[#e8e5dc] text-[#1f220f] rounded-md px-4 py-2 text-xs font-bold">
                                        {relative.socialStatus}
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

                        {filteredRelatives.length === 0 && (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-8 text-center text-[#555d30] font-bold"
                                >
                                    لا توجد نتائج مطابقة للبحث
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <AddRelativeModal
                    onClose={closeModal}
                    onAdd={addRelative}
                    onEdit={editRelative}
                    selectedRelative={selectedRelative}
                />
            )}
        </div>
    )
}