import { useState } from 'react'

const securityItems = [
    {
        id: 1,
        title: 'السجلات الأمنية',
        details: 'تمت مراجعة السجلات الأمنية، ولا توجد ملاحظات خطيرة على هذا الملف.',
    },
  
    {
        id: 3,
        title: '  المخالفات الأمنية',
        details: 'الحالة الأمنية مستقرة، ولم يتم تسجيل أي مخالفات أمنية.',
    },
    {
        id: 4,
        title: ' الاشتباهات الأمنية',
        details: 'لم يتم رصد أي اشتباهات أمنية مرتبطة بهذا الملف.',
    },
]

export default function SecurityStatusCard() {
    const [selectedItem, setSelectedItem] = useState(null)
    const [showFullReport, setShowFullReport] = useState(false)

    function handleSelectItem(item) {
        setSelectedItem(item)
    }

    function openFullReport() {
        setShowFullReport(true)
    }

    function closeFullReport() {
        setShowFullReport(false)
    }

    return (
        <>
            <div className="bg-[#555d30] text-white rounded-xl p-5 min-h-[280px]">
                <h2 className="font-bold text-lg mb-5">
                    تقرير الحالة الأمنية
                </h2>

                <div className="space-y-3 text-sm">
                    {securityItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSelectItem(item)}
                            className={
                                selectedItem && selectedItem.id === item.id
                                    ? 'w-full text-right bg-[#2f351c] rounded-lg px-3 py-2 transition'
                                    : 'w-full text-right hover:bg-[#6b7440] rounded-lg px-3 py-2 transition'
                            }
                        >
                            › {item.title}
                        </button>
                    ))}
                </div>

                {selectedItem && (
                    <div className="mt-5 bg-white/10 border border-white/20 rounded-lg p-4 text-sm leading-7">
                        <p className="font-bold mb-2">
                            {selectedItem.title}
                        </p>

                        <p>
                            {selectedItem.details}
                        </p>
                    </div>
                )}

                <button
                    onClick={openFullReport}
                    className="w-full mt-6 bg-[#2f351c] text-white rounded-lg py-3 font-bold hover:bg-[#242915] transition"
                >
                    سجل التقرير الكامل
                </button>
            </div>

            {showFullReport && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div
                        dir="rtl"
                        className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6"
                    >
                        <h2 className="text-[#1f220f] text-xl font-bold text-center mb-6">
                            سجل التقرير الأمني الكامل
                        </h2>

                        <div className="space-y-4">
                            {securityItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="border border-gray-200 rounded-xl p-4"
                                >
                                    <h3 className="text-[#555d30] font-bold mb-2">
                                        {item.title}
                                    </h3>

                                    <p className="text-[#1f220f] text-sm leading-7">
                                        {item.details}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={closeFullReport}
                            className="w-full mt-6 bg-[#555d30] text-white rounded-lg py-3 font-bold hover:bg-[#3f4723] transition"
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}