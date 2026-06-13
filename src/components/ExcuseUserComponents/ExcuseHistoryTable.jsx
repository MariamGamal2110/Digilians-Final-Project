import { FiClock, FiInbox } from "react-icons/fi";
import ExcuseStatusBadge from "../ExcuseAdminComponents/ExcuseStatusBadge";

function getRequestTimestamp(request) {
  return new Date(request.createdAt || request.date || request._id || 0).getTime();
}

export default function ExcuseHistoryTable({ requests = [] }) {
  const sortedRequests = [...requests].sort(
    (a, b) => getRequestTimestamp(b) - getRequestTimestamp(a)
  );

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]">
      <div className="border-b border-[#4a5128] bg-[#555d30] px-5 py-4 text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
          <FiClock />
          السجل السابق
        </div>
        <h3 className="mt-3 text-lg font-extrabold text-white">
          الالتماسات السابقة
        </h3>
      </div>

      {sortedRequests.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3efe2] text-[#555d30]">
            <FiInbox size={24} />
          </div>
          <p className="mt-4 text-sm font-bold text-[#1f220f]">
            لا توجد التماسات سابقة
          </p>
          <p className="mt-2 text-xs leading-6 text-[#6b7053]">
            ستظهر الطلبات السابقة هنا تلقائيًا بعد تقديمها.
          </p>
        </div>
      ) : (
        <div dir="ltr" className="max-h-[340px] overflow-y-auto overscroll-contain">
          <div dir="rtl">
            <div className="sticky top-0 z-10 grid grid-cols-[minmax(0,1.4fr)_auto] gap-3 border-b border-[#eee7d9] bg-[#f3efe2] px-5 py-3 text-xs font-bold text-[#555d30]">
              <span>الالتماس</span>
              <span className="text-left">الحالة</span>
            </div>

            <div className="divide-y divide-[#f0eadc]">
              {sortedRequests.map((request) => {
                const created = request.createdAt
                  ? new Date(request.createdAt)
                  : request.date
                    ? new Date(request.date)
                    : null;

                const createdLabel = created
                  ? created.toLocaleDateString("ar-EG")
                  : "-";

                return (
                  <div
                    key={request._id || request.id || `${request.title}-${createdLabel}`}
                    className="grid grid-cols-[minmax(0,1.4fr)_auto] gap-3 px-5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#1f220f]">
                        {request.title || request.type || "التماس"}
                      </p>
                      <p className="mt-1 text-xs text-[#8b8f78]">
                        {createdLabel}
                      </p>
                    </div>
                    <div className="flex items-center justify-end">
                      <ExcuseStatusBadge
                        status={request.status || "قيد المراجعة"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
