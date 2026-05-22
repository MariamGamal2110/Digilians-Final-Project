import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function AdminDeletePunishmentModal({ record, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState(false);

  function handleConfirm() {
    if (confirmText.trim() !== "حذف") {
      setError(true);
      return;
    }
    onConfirm();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div dir="rtl" className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1f220f] text-lg font-bold">تأكيد الحذف</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-5">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <FiTrash2 size={22} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">هل أنت متأكد من حذف سجل عقوبة</p>
          <p className="text-base font-bold text-red-600">{record.studentName}</p>
          <p className="text-xs text-red-500 mt-2">سيتم حذف هذا السجل نهائياً ولا يمكن التراجع</p>
        </div>

        {/* Typed Confirmation */}
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-2">
            للتأكيد، اكتب كلمة <strong className="text-gray-700">حذف</strong> في الحقل أدناه:
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              setError(false);
            }}
            placeholder='اكتب "حذف" للتأكيد'
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition ${
              error
                ? "border-red-400 bg-red-50 focus:border-red-500"
                : "border-gray-300 bg-gray-50 focus:border-[#555d30]"
            }`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1">يجب كتابة كلمة "حذف" للمتابعة</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-[#1f220f] rounded-lg py-2 text-sm font-bold hover:bg-gray-100 transition"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-bold transition"
          >
            حذف السجل
          </button>
        </div>

      </div>
    </div>
  );
}