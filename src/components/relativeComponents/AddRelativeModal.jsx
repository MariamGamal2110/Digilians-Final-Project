import { useState } from 'react'

export default function AddRelativeModal({ onClose, onAdd, onEdit, selectedRelative }) {
    const [name, setName] = useState(selectedRelative ? selectedRelative.name : '')
    const [relation, setRelation] = useState(selectedRelative ? selectedRelative.relation : 'أب')
    const [nationalId, setNationalId] = useState(selectedRelative ? selectedRelative.nationalId : '')
    const [birthDate, setBirthDate] = useState(selectedRelative ? selectedRelative.birthDate : '')
    const [job, setJob] = useState(selectedRelative ? selectedRelative.job : '')
    const [socialStatus, setSocialStatus] = useState(selectedRelative ? selectedRelative.socialStatus : 'متزوج')

    function handleSubmit(event) {
        event.preventDefault()

        if (name === '' || nationalId === '' || birthDate === '' || job === '') {
            alert('من فضلك ادخلي البيانات المطلوبة')
            return
        }

        const relativeData = {
            id: selectedRelative ? selectedRelative.id : Date.now(),
            name: name,
            relation: relation,
            nationalId: nationalId,
            birthDate: birthDate,
            job: job,
            socialStatus: socialStatus,
        }

        if (selectedRelative) {
            onEdit(relativeData)
        } else {
            onAdd(relativeData)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div dir="rtl" className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
                <h2 className="text-[#1f220f] text-xl font-bold text-center mb-6">
                    {selectedRelative ? 'تعديل بيانات قريب' : 'إضافة بيانات قريب'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            الاسم
                        </label>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                            placeholder="اكتبي الاسم"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            صلة القرابة
                        </label>
                        <select
                            value={relation}
                            onChange={(event) => setRelation(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                        >
                            <option>أب</option>
                            <option>أم</option>
                            <option>أخ</option>
                            <option>أخت</option>
                            <option>زوج</option>
                            <option>زوجة</option>
                            <option>ابن</option>
                            <option>ابنة</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            الرقم القومي
                        </label>
                        <input
                            value={nationalId}
                            onChange={(event) => setNationalId(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                            placeholder="اكتبي الرقم القومي"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            تاريخ الميلاد
                        </label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(event) => setBirthDate(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            الوظيفة
                        </label>
                        <input
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                            placeholder="مثال: يعمل بالخارج"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#555d30] mb-2">
                            الحالة الاجتماعية
                        </label>
                        <select
                            value={socialStatus}
                            onChange={(event) => setSocialStatus(event.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#555d30]"
                        >
                            <option>متزوج</option>
                            <option>متزوجة</option>
                            <option>أعزب</option>
                            <option>عزباء</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full border border-gray-300 text-[#1f220f] rounded-lg py-3 font-bold hover:bg-gray-100 transition"
                        >
                            إلغاء
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-[#555d30] text-white rounded-lg py-3 font-bold hover:bg-[#3f4723] transition"
                        >
                            {selectedRelative ? 'حفظ التعديل' : 'حفظ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}