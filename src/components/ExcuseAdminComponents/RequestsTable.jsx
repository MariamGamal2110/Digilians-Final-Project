import ExcuseStatusBadge from "./ExcuseStatusBadge";

export default function RequestsTable({ data, selectedId, onSelect }) {
  return (
    <div dir="rtl" className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-[#1f220f]">
          مراجعة والبت في طلبات الالتماسات
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          اضغط على أي طلب لعرض تفاصيله والبت فيه
        </p>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 px-6 py-2 bg-[#f3f1e8] text-xs font-bold text-[#555d30]">
        <span>اسم الطالب</span>
        <span>الرقم العسكري</span>
        <span>نوع الالتماس</span>
        <span className="text-center">الحالة</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {data.map((row) => {
          const isSelected = row.id === selectedId;
          return (
            <div
              key={row.id}
              onClick={() => onSelect(row)}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center px-6 py-3.5 cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#f3f1e8] border-r-4 border-[#555d30]"
                  : "hover:bg-gray-50 border-r-4 border-transparent"
              }`}
            >
              <span className="text-sm font-bold text-[#1f220f] truncate">
                {row.name}
              </span>
              <span className="text-sm text-gray-500">{row.militaryId || row.id}</span>
              <span className="text-sm text-gray-600">{row.type}</span>
              <div className="flex justify-center items-center gap-2">
                {row.attachments && row.attachments.length > 0 && (
                  <span title={`${row.attachments.length} مرفق`} className="text-xs text-gray-500">📎</span>
                )}
                <ExcuseStatusBadge status={row.status} />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
