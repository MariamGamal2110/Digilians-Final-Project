import { useState } from "react";

const emptyForm = {
  studentName: "",
  militaryNum: "",
  gender: "male",
  violation: "",
  punishment: "",
  degree: "",
  comment: "",
};

const requiredFields = [
  { key: "studentName", label: "اسم الطالب" },
  { key: "militaryNum", label: "الرقم العسكري" },
  { key: "violation", label: "المخالفة" },
  { key: "punishment", label: "العقوبة" },
  { key: "degree", label: "الدرجات" },
];


export default function AdminAddPunishmentModal({ onClose, onSave, initialData = null }) {
  const isEdit = initialData !== null;
  // initialData is read once on mount — remounting via `key` resets state cleanly
  const [form, setForm] = useState(isEdit ? { ...initialData } : { ...emptyForm });
  const [errors, setErrors] = useState({});

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  }

  function validate() {
    const newErrors = {};
    requiredFields.forEach(({ key }) => {
      const val = String(form[key]).trim();
      if (!val) {
        newErrors[key] = true;
      }
    });
    if (form.degree !== "" && (Number(form.degree) < 0 || Number(form.degree) > 20)) {
      newErrors.degree = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSave({
      studentName: form.studentName.trim(),
      militaryNum: form.militaryNum.trim(),
      gender: form.gender,
      violation: form.violation.trim(),
      punishment: form.punishment.trim(),
      degree: Number(form.degree),
      comment: form.comment?.trim() || "",
    });
  }

  const inputClass = (key) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition ${
      errors[key]
        ? "border-red-400 bg-red-50 focus:border-red-500"
        : "border-gray-300 bg-gray-50 focus:border-[#555d30]"
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div dir="rtl" className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1f220f] text-lg font-bold">
            {isEdit ? "تعديل بيانات العقوبة" : "إضافة عقوبة جديدة"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-[#555d30] mb-1">
                اسم الطالب *
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                placeholder="الاسم كاملاً"
                className={inputClass("studentName")}
              />
              {errors.studentName && (
                <p className="text-red-500 text-xs mt-1">يرجى إدخال اسم الطالب</p>
              )}
            </div>

            {/* Military Number */}
            <div>
              <label className="block text-xs font-bold text-[#555d30] mb-1">
                الرقم العسكري *
              </label>
              <input
                type="text"
                value={form.militaryNum}
                onChange={(e) => handleChange("militaryNum", e.target.value)}
                placeholder="مثال: 22589"
                className={inputClass("militaryNum")}
              />
              {errors.militaryNum && (
                <p className="text-red-500 text-xs mt-1">يرجى إدخال الرقم العسكري</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-[#555d30] mb-1">النوع</label>
              <select
                value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#555d30] transition"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>

            {/* Degree */}
            <div>
              <label className="block text-xs font-bold text-[#555d30] mb-1">
                الدرجات * (0-20)
              </label>
              <input
                type="number"
                min={0}
                max={20}
                value={form.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
                placeholder="0"
                className={inputClass("degree")}
              />
              {errors.degree && (
                <p className="text-red-500 text-xs mt-1">يرجى إدخال درجات صحيحة (0-20)</p>
              )}
            </div>
          </div>

          {/* Violation */}
          <div>
            <label className="block text-xs font-bold text-[#555d30] mb-1">المخالفة *</label>
            <input
              type="text"
              value={form.violation}
              onChange={(e) => handleChange("violation", e.target.value)}
              placeholder="نوع المخالفة"
              className={inputClass("violation")}
            />
            {errors.violation && (
              <p className="text-red-500 text-xs mt-1">يرجى إدخال المخالفة</p>
            )}
          </div>

          {/* Punishment */}
          <div>
            <label className="block text-xs font-bold text-[#555d30] mb-1">العقوبة *</label>
            <textarea
              value={form.punishment}
              onChange={(e) => handleChange("punishment", e.target.value)}
              placeholder="وصف العقوبة"
              rows={3}
              className={`${inputClass("punishment")} resize-none`}
            />
            {errors.punishment && (
              <p className="text-red-500 text-xs mt-1">يرجى إدخال العقوبة</p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-[#1f220f] rounded-lg py-2 text-sm font-bold hover:bg-gray-100 transition"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#555d30] text-white rounded-lg py-2 text-sm font-bold hover:bg-[#3f4723] transition"
          >
            {isEdit ? "حفظ التعديل" : "حفظ"}
          </button>
        </div>

      </div>
    </div>
  );
}
