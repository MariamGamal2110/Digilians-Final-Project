import React, { useEffect, useRef, useState } from "react";
import { FiBell, FiClock, FiFileText } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { getMyExcuses } from "../../api/excuse";
import ExcuseStatusBadge from "../../components/ExcuseAdminComponents/ExcuseStatusBadge";

export default function ExcusStatus() {
  const [lastRequest, setLastRequest] = useState(null);
  const [notice, setNotice] = useState(null);
  const prevRequestRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchLatest = async () => {
      try {
        const excuses = await getMyExcuses();

        if (!mounted) return;

        if (!excuses || excuses.length === 0) {
          setLastRequest(null);
          prevRequestRef.current = null;
          return;
        }

        const sortedExcuses = [...excuses].sort(
          (a, b) =>
            new Date(b.createdAt || b.date || b._id) -
            new Date(a.createdAt || a.date || a._id)
        );

        const latest = sortedExcuses[0];
        const prev = prevRequestRef.current;

        if (prev && latest && latest._id === prev._id) {
          const statusChanged = prev.status !== latest.status;
          const responseChanged = prev.response !== latest.response;
          const adminNoteChanged = prev.adminNote !== latest.adminNote;
          const respondedAtChanged = prev.respondedAt !== latest.respondedAt;

          if (
            statusChanged ||
            responseChanged ||
            adminNoteChanged ||
            respondedAtChanged
          ) {
            const action =
              latest.status === "مقبول"
                ? "قبول الطلب"
                : latest.status === "مرفوض"
                  ? "رفض الطلب"
                  : "تحديث حالة الطلب";

            const adminNote = latest.response || latest.adminNote || "";

            setNotice({
              title: `تم ${action}`,
              text: adminNote,
            });
          }
        }

        prevRequestRef.current = latest;
        setLastRequest(latest);
      } catch (err) {
        console.error("Failed to load excuses", err);
      }
    };

    fetchLatest();

    const interval = setInterval(fetchLatest, 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!lastRequest) {
    return (
      <div className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]">
        <div className="bg-[#555d30] px-6 py-5 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
            <FiClock />
            حالة آخر طلب
          </div>
        </div>
        <div className="p-6">
        <div className="rounded-2xl bg-[#fcfbf7] p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3efe2] text-[#555d30]">
            <FiFileText size={24} />
          </div>
          <p className="mt-4 text-sm font-bold text-[#1f220f]">
            لا يوجد طلبات حالياً
          </p>
          <p className="mt-2 text-xs leading-6 text-[#6b7053]">
            بعد إرسال أول التماس ستظهر هنا آخر حالة للطلب ورد الإدارة عليه.
          </p>
        </div>
        </div>
      </div>
    );
  }

  const status = lastRequest.status || "قيد المراجعة";
  const title = lastRequest.title || lastRequest.type || "التماس";

  const created = lastRequest.createdAt
    ? new Date(lastRequest.createdAt)
    : lastRequest.date
      ? new Date(lastRequest.date)
      : null;

  const createdLabel = created
    ? created.toLocaleString("ar-EG", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "-";

  const adminNote = lastRequest.response || lastRequest.adminNote || "";

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]">
      {notice && (
        <div className="mx-6 mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sky-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <strong className="flex items-center gap-2 text-sm">
                <FiBell />
                {notice.title}
              </strong>

              {notice.text && (
                <p className="mt-2 text-sm leading-6">{notice.text}</p>
              )}
            </div>

            <button
              onClick={() => setNotice(null)}
              className="text-xs font-bold text-sky-700 hover:underline"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#555d30] px-6 py-5 text-white">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
            <FiClock />
            حالة آخر طلب
          </div>
          <h2 className="mt-3 text-lg font-extrabold text-white">
            متابعة الالتماس الأخير
          </h2>
        </div>
      </div>

      <div className="p-6">
      <div className="mb-5 rounded-2xl bg-[#fcfbf7] p-4">
        <p className="text-sm font-bold text-[#1f220f]">{title}</p>
        <p className="mt-1 text-xs text-[#8b8f78]">{createdLabel}</p>
      </div>

      <div className="mb-5 flex items-start gap-3">
        <GoDotFill className="mt-1 shrink-0 text-emerald-600" />
        <div>
          <h3 className="text-sm font-semibold text-[#4f543b]">
            تم تقديم الطلب
          </h3>
          <p className="text-xs text-[#8b8f78]">{createdLabel}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#ece6d7] bg-white p-4">
        <h4 className="mb-2 text-sm font-bold text-[#555d30]">نص الطلب</h4>
        <p className="text-sm leading-7 text-[#4f543b]">
          {lastRequest.message || lastRequest.details || "-"}
        </p>
      </div>

      {adminNote && (
        <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-800">
          <span className="mb-1 block font-bold">رد الإدارة:</span>
          {adminNote}
        </div>
      )}
      </div>
    </div>
  );
}
