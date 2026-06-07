export default function AdminViewPunishmentModal({ record, onClose }) {
  const rows = [
    { label: "اسم الطالب", value: record.studentName },
    { label: "الرقم العسكري", value: record.militaryNum },
    { label: "النوع", value: record.gender === "female" ? "أنثى" : "ذكر" },
    { label: "المخالفة", value: record.violation },
    { label: "العقوبة", value: record.punishment },
    { label: "الدرجات", value: record.degree },
    { label: "تعليق الأدمن", value: record.comment || "لا يوجد تعليق" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div dir="rtl" className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1f220f] text-lg font-bold">تفاصيل العقوبة</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
          >
            ×
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-4 py-3">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-sm font-bold text-[#1f220f] text-left">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-[#1f220f] rounded-lg py-2 text-sm font-bold hover:bg-gray-100 transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
