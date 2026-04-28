const studentDetails = [
    { label: 'الاسم', value: 'أحمد محمد' },
    { label: 'الرقم العسكري', value: '36581' },
    { label: 'البريد الالكتروني', value: 'ahmed.m@gmail.com' },
    { label: 'التراك', value: 'Software development' },
    { label: 'التخصص', value: 'Professional React' },
    { label: 'تاريخ الالتحاق', value: '1/6/2026' },
]

export default function StudentDetailsCard() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[270px]">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#1f220f] font-bold text-right w-full">
                    جدول الطالب
                </h2>
            </div>

            <div className="divide-y divide-gray-200">
                {studentDetails.map((item) => (
                    <div
                        key={item.label}
                        className="grid grid-cols-2 gap-4 py-3 text-sm items-center"
                    >
                        <p className="text-[#555d30] font-bold text-right">
                            {item.label}
                        </p>

                        <p className="text-[#1f220f] text-left">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}