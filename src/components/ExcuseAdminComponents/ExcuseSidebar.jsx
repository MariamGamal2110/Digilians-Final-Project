import { useEffect, useState } from "react";
import { BACKEND_SERVER_URL, openSafeUrl } from "../../api/client";
import {
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiMessageSquare,
  FiPaperclip,
  FiXCircle,
} from "react-icons/fi";
import ExcuseStatusBadge from "./ExcuseStatusBadge";

const getAttachmentUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${BACKEND_SERVER_URL}${url}`;
};

export default function ExcuseSidebar({ request, onDecision }) {
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState(false);

  useEffect(() => {
    setNote("");
    setNoteError(false);
  }, [request?.id]);

  if (!request) {
    return (
      <div className="rounded-[24px] border border-[#e9e2d2] bg-white p-8 text-center shadow-[0_18px_48px_rgba(31,34,15,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3efe2] text-[#555d30]">
          <FiFileText size={28} />
        </div>
        <p className="mt-4 text-base font-bold text-[#1f220f]">
          اختر طلباً من القائمة
        </p>
        <p className="mt-2 text-sm leading-6 text-[#6b7053]">
          ستظهر هنا تفاصيل الالتماس والمرفقات وقرار المسؤول بمجرد تحديد أي
          صف من الجدول.
        </p>
      </div>
    );
  }

  const isDecided = request.status === "مقبول" || request.status === "مرفوض";

  function handleDecision(decision) {
    if (!note.trim()) {
      setNoteError(true);
      return;
    }

    setNoteError(false);
    onDecision(request.id, decision, note.trim());
  }

  return (
    <div
      dir="rtl"
      className="flex max-h-[620px] flex-col overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)] xl:max-h-[calc(100vh-11rem)]"
    >
      <div className="bg-[#555d30] px-5 py-5 text-white">
        <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
          تفاصيل الالتماس
        </div>
        <h3 className="text-lg font-extrabold leading-snug">{request.name}</h3>
        <p className="mt-1 text-sm text-white/70">
          الرقم العسكري: {request.militaryId || request.id}
        </p>
      </div>

      <div dir="ltr" className="flex-1 overflow-y-auto overscroll-contain">
        <div dir="rtl" className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#fcfbf7] p-4">
            <div>
              <p className="text-xs font-semibold text-[#8b8f78]">نوع الطلب</p>
              <p className="mt-1 text-sm font-bold text-[#1f220f]">
                {request.type}
              </p>
            </div>
            <ExcuseStatusBadge status={request.status} />
          </div>

          <div className="rounded-2xl border border-[#ece6d7] bg-[#fcfbf7] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#555d30]">
              <FiMessageSquare className="text-sm" />
              <p className="text-xs font-extrabold">نص الالتماس</p>
            </div>
            <p className="text-sm leading-7 text-[#4f543b]">
              {request.details || "لا توجد تفاصيل إضافية مرفقة بهذا الطلب."}
            </p>
          </div>

          {request.attachments && request.attachments.length > 0 && (
            <div className="rounded-2xl border border-[#ece6d7] bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-[#555d30]">
                <FiPaperclip className="text-sm" />
                <p className="text-xs font-extrabold">المرفقات</p>
              </div>

              <ul className="space-y-3">
                {request.attachments.map((a, idx) => (
                  <li
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-[#eee7d9] bg-[#fcfbf7]"
                  >
                    {a.mimetype && a.mimetype.startsWith("image/") ? (
                      <button
                        type="button"
                        onClick={() => openSafeUrl(a.url, a.originalName || a.filename)}
                        className="block w-full text-right"
                      >
                        <img
                          src={getAttachmentUrl(a.url)}
                          alt={a.originalName || a.filename}
                          className="max-h-44 w-full object-cover"
                        />
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#555d30]">
                          <FiImage />
                          {a.originalName || a.filename}
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openSafeUrl(a.url, a.originalName || a.filename)}
                        className="flex w-full items-center gap-2 px-3 py-3 text-sm font-semibold text-[#555d30] underline-offset-4 hover:underline text-right"
                      >
                        <FiPaperclip />
                        {a.originalName || a.filename}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isDecided && request.adminNote && (
            <div
              className={`rounded-2xl border p-4 text-sm leading-7 ${
                request.status === "مقبول"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-rose-200 bg-rose-50 text-rose-800"
              }`}
            >
              <span className="mb-1 block text-xs font-extrabold">
                ملاحظة المسؤول
              </span>
              {request.adminNote}
            </div>
          )}

          {!isDecided && (
            <>
              <div className="rounded-2xl border border-[#ece6d7] bg-[#fcfbf7] p-4">
                <label className="mb-2 block text-xs font-extrabold text-[#555d30]">
                  سبب القرار *
                </label>
                <textarea
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    if (e.target.value.trim()) {
                      setNoteError(false);
                    }
                  }}
                  placeholder="اكتب سبب الموافقة أو الرفض هنا..."
                  rows={4}
                  className={`w-full resize-none rounded-2xl border p-3 text-sm text-right outline-none transition ${
                    noteError
                      ? "border-rose-400 bg-rose-50 focus:border-rose-500"
                      : "border-[#ddd4c1] bg-white focus:border-[#555d30]"
                  }`}
                />
                {noteError && (
                  <p className="mt-2 text-xs font-semibold text-rose-600">
                    يرجى كتابة سبب القرار قبل المتابعة.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleDecision("مرفوض")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  <FiXCircle size={16} />
                  رفض الطلب
                </button>

                <button
                  type="button"
                  onClick={() => handleDecision("مقبول")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#555d30] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#444b26]"
                >
                  <FiCheckCircle size={16} />
                  اعتماد الطلب
                </button>
              </div>
            </>
          )}

          {isDecided && (
            <p className="rounded-2xl bg-[#f5f2e8] px-4 py-3 text-center text-xs font-semibold text-[#6b7053]">
              تم البت في هذا الطلب بالفعل، لذلك لا يمكن تعديل القرار من هذه
              الصفحة.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
