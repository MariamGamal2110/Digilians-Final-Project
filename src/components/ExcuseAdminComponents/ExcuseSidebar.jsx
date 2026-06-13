import { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiFileText } from "react-icons/fi";
import ExcuseStatusBadge from "./ExcuseStatusBadge";

// Props:
//   request    — the currently selected request object (or null)
//   onDecision — (id, newStatus, adminNote) => void  — called when admin approves/rejects
export default function ExcuseSidebar({ request, onDecision }) {
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState(false);

  // reset note whenever a different request is selected
  useEffect(() => {
    setNote("");
    setNoteError(false);
  }, [request?.id]);

  // Empty state
  if (!request) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400 flex flex-col items-center gap-3">
        <FiFileText size={32} className="text-gray-300" />
        <p className="text-sm">اختر طلباً من الجدول لعرض تفاصيله</p>
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
      className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 overflow-hidden"
    >
      {/* Top strip */}
      <div className="bg-[#555d30] px-5 py-4">
        <h3 className="font-bold text-white text-base leading-snug">
          {request.name}
        </h3>
        <p className="text-white/70 text-xs mt-1">
          الرقم العسكري: {request.militaryId || request.id}
        </p>
      </div>

      <div className="px-5 pb-5 flex flex-col gap-4">

        {/* Type + Current Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{request.type}</span>
          <ExcuseStatusBadge status={request.status} />
        </div>

        {/* Request Details */}
        <div className="bg-[#f9f8f4] border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-bold text-[#555d30] mb-2">نص الالتماس</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {request.details}
          </p>
        </div>

        {/* Attachments */}
        {request.attachments && request.attachments.length > 0 && (
          <div className="rounded-xl p-3 bg-white border border-gray-100">
            <p className="text-xs font-bold text-[#555d30] mb-2">المرفقات</p>
            <ul className="space-y-2">
              {request.attachments.map((a, idx) => (
                <li key={idx}>
                  {a.mimetype && a.mimetype.startsWith('image/') ? (
                    <a href={a.url} target="_blank" rel="noreferrer" className="inline-block">
                      <img src={a.url} alt={a.originalName || a.filename} className="max-h-40 rounded-md" />
                    </a>
                  ) : (
                    <a href={a.url} target="_blank" rel="noreferrer" className="text-sm text-[#555d30] underline">{a.originalName || a.filename}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Admin Note from previous decision */}
        {isDecided && request.adminNote && (
          <div className={`rounded-xl p-3 text-xs leading-relaxed ${
            request.status === "مقبول"
              ? "bg-green-50 border border-green-100 text-green-700"
              : "bg-red-50 border border-red-100 text-red-700"
          }`}>
            <span className="font-bold block mb-1">ملاحظة المسؤول:</span>
            {request.adminNote}
          </div>
        )}

        {/* Decision area — hidden once decided */}
        {!isDecided && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#555d30] mb-1.5">
                سبب القرار *
              </label>
              <textarea
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  if (e.target.value.trim()) setNoteError(false);
                }}
                placeholder="اكتب سبب الموافقة أو الرفض..."
                rows={3}
                className={`w-full border rounded-xl p-3 text-sm text-right resize-none outline-none transition ${
                  noteError
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-200 bg-gray-50 focus:border-[#555d30]"
                }`}
              />
              {noteError && (
                <p className="text-red-500 text-xs mt-1">
                  يرجى كتابة سبب القرار قبل المتابعة
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {/* Reject */}
              <button
                onClick={() => handleDecision("مرفوض")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-50 rounded-xl py-2.5 text-sm font-bold transition"
              >
                <FiXCircle size={15} />
                رفض
              </button>

              {/* Approve */}
              <button
                onClick={() => handleDecision("مقبول")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#555d30] hover:bg-[#3f4723] text-white rounded-xl py-2.5 text-sm font-bold transition"
              >
                <FiCheckCircle size={15} />
                موافقة
              </button>
            </div>
          </>
        )}

        {/* Already decided message */}
        {isDecided && (
          <p className="text-center text-xs text-gray-400">
            تم البت في هذا الطلب ولا يمكن تغيير قراره
          </p>
        )}

      </div>
    </div>
  );
}