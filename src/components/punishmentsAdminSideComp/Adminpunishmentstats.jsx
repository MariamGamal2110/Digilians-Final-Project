export default function AdminPunishmentStats({ total, females, males, shown }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

      {/* إجمالي السجلات */}
      <div className="bg-[#f3f1e8] border border-[#d6d3c4] rounded-xl p-4">
        <p className="text-xs font-bold text-[#555d30] mb-2">إجمالي السجلات</p>
        <p className="text-2xl font-bold text-[#1f220f]">{total}</p>
      </div>

      {/* عدد الإناث */}
      <div className="bg-[#fbeaf0] border border-[#f4c0d1] rounded-xl p-4">
        <p className="text-xs font-bold text-[#993556] mb-2 flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4537E]" />
          عدد الإناث
        </p>
        <p className="text-2xl font-bold text-[#D4537E]">{females}</p>
      </div>

      {/* عدد الذكور */}
      <div className="bg-[#e6f1fb] border border-[#b5d4f4] rounded-xl p-4">
        <p className="text-xs font-bold text-[#185fa5] mb-2 flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#378ADD]" />
          عدد الذكور
        </p>
        <p className="text-2xl font-bold text-[#378ADD]">{males}</p>
      </div>

      {/* نتائج البحث */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-bold text-gray-500 mb-2">نتائج البحث</p>
        <p className="text-2xl font-bold text-gray-800">{shown}</p>
      </div>

    </div>
  );
}