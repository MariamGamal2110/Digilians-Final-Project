import { FiInbox, FiPaperclip } from "react-icons/fi";
import ExcuseStatusBadge from "./ExcuseStatusBadge";

export default function RequestsTable({ data, selectedId, onSelect }) {
  return (
    <div
      dir="rtl"
      className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]"
    >
      <div className="border-b border-[#4a5128] bg-[#555d30] px-6 py-5 text-white">
        <h2 className="text-lg font-extrabold text-white">
          مراجعة والبت في طلبات الالتماس
        </h2>
        <p className="mt-1 text-sm leading-6 text-white/80">
          اختر أي طلب من الجدول لعرض التفاصيل الكاملة واتخاذ القرار المناسب.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="rounded-full bg-[#f3efe2] p-4 text-[#555d30]">
            <FiInbox className="text-2xl" />
          </div>
          <p className="mt-4 text-base font-bold text-[#1f220f]">
            لا توجد طلبات متاحة حالياً
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#6b7053]">
            ستظهر الالتماسات هنا فور وصولها من النظام، ويمكن بعدها استعراضها
            واتخاذ القرار من نفس الصفحة.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full">
            <div
              dir="ltr"
              className="max-h-[520px] overflow-y-auto overscroll-contain"
            >
              <div dir="rtl">
                <div className="sticky top-0 z-10 hidden grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)] gap-3 border-b border-[#eee7d9] bg-[#f3efe2] px-6 py-3 text-xs font-bold text-[#555d30] md:grid">
                  <span>اسم الطالب</span>
                  <span>الرقم العسكري</span>
                  <span>نوع الالتماس</span>
                  <span className="text-center">الحالة</span>
                </div>

                <div className="divide-y divide-[#f0eadc]">
                {data.map((row) => {
                  const isSelected = row.id === selectedId;

                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => onSelect(row)}
                      className={`grid w-full grid-cols-1 gap-4 px-5 py-4 text-right transition md:grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)] md:px-6 ${
                        isSelected
                          ? "bg-[#f6f2e7] shadow-[inset_-4px_0_0_#555d30]"
                          : "bg-white hover:bg-[#fbf8f1]"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-[#1f220f] truncate">
                          {row.name}
                        </p>
                        <p className="mt-1 text-xs text-[#8b8f78] md:hidden">
                          الرقم العسكري: {row.militaryId || row.id}
                        </p>
                      </div>

                      <div className="hidden items-center text-sm text-[#6b7053] md:flex">
                        {row.militaryId || row.id}
                      </div>

                      <div className="flex items-center text-sm text-[#4b5034]">
                        {row.type}
                      </div>

                      <div className="flex items-center justify-between gap-2 md:justify-center">
                        {row.attachments && row.attachments.length > 0 && (
                          <span
                            title={`${row.attachments.length} مرفق`}
                            className="inline-flex items-center gap-1 rounded-full bg-[#ece6d7] px-2.5 py-1 text-xs font-semibold text-[#555d30]"
                          >
                            <FiPaperclip className="text-xs" />
                            {row.attachments.length}
                          </span>
                        )}
                        <ExcuseStatusBadge status={row.status} />
                      </div>
                    </button>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
