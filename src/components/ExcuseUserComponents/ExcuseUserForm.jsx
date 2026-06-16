import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiPaperclip,
  FiRotateCcw,
  FiSend,
} from "react-icons/fi";
import { createExcuse } from "../../api/excuse";

export default function ExcuseUserForm({ onSubmitted }) {
  const today = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    type: "",
    details: "",
    startDate: today,
    endDate: today,
  });
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => {
      const next = { ...s, [name]: value };
      if (name === "startDate") {
        if (!next.endDate || next.endDate < value) next.endDate = value;
      }
      return next;
    });
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 5) {
      setError("يمكن رفع حتى 5 ملفات كحد أقصى");
      return;
    }
    setError(null);
    setFiles(selected);
  };

  const resetForm = () =>
    setFormData({ type: "", details: "", startDate: today, endDate: today });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.type || !formData.details.trim()) {
      setError("يرجى ملء نوع ونص الالتماس");
      return;
    }

    setLoading(true);
    try {
      let created;
      if (files && files.length > 0) {
        const attachments = await Promise.all(
          files.map(async (f) => {
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(f);
              reader.onload = () => resolve(reader.result);
            });
            return {
              filename: f.name,
              originalName: f.name,
              mimetype: f.type,
              size: f.size,
              base64: base64
            };
          })
        );
        const payload = {
          title: formData.type,
          message: formData.details,
          startDate: formData.startDate,
          endDate: formData.endDate,
          attachments
        };
        created = await createExcuse(payload);
      } else {
        const payload = {
          title: formData.type,
          message: formData.details,
          startDate: formData.startDate,
          endDate: formData.endDate,
        };
        created = await createExcuse(payload);
      }
      resetForm();
      setFiles([]);
      setSuccess("تم إرسال طلبك بنجاح");
      setTimeout(() => setSuccess(null), 5000);
      if (onSubmitted) onSubmitted(created);
    } catch (err) {
      console.error(err);
      setError(err.message || "فشل الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]"
    >
      <div className="border-b border-[#4a5128] bg-[#555d30] px-6 py-5 text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
          <FiFileText />
          نموذج تقديم الالتماس
        </div>
        <h2 className="mt-3 text-xl font-extrabold text-white">
          اكتب تفاصيل الطلب بشكل واضح
        </h2>
        
      </div>

      <div className="flex flex-1 flex-col space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-[#555d30]"
            >
              <FiCalendar className="text-sm" />
              تاريخ بداية الإلتماس
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={today}
              className="w-full rounded-2xl border border-[#ddd4c1] bg-[#fcfbf7] px-4 py-3 text-sm outline-none transition focus:border-[#555d30]"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-[#555d30]"
            >
              <FiCalendar className="text-sm" />
              تاريخ نهاية الإلتماس
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || today}
              className="w-full rounded-2xl border border-[#ddd4c1] bg-[#fcfbf7] px-4 py-3 text-sm outline-none transition focus:border-[#555d30]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 inline-block text-sm font-bold text-[#555d30]">
            نوع الالتماس
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[#ddd4c1] bg-[#fcfbf7] px-4 py-3 text-sm outline-none transition focus:border-[#555d30]"
          >
            <option value="">اختر نوع الالتماس</option>
            <option value="إلتماس داخلى">إلتماس داخلي </option>
            <option value="إلتماس خارجي ">إلتماس خارجي </option>
          </select>
        </div>

        <div>
          <label className="mb-2 inline-block text-sm font-bold text-[#555d30]">
            التفاصيل
          </label>
          <textarea
            name="details"
            placeholder="يرجى شرح المبررات بالتفصيل..."
            value={formData.details}
            onChange={handleChange}
            className="min-h-[160px] w-full rounded-2xl border border-[#ddd4c1] bg-[#fcfbf7] p-4 text-sm leading-7 outline-none transition focus:border-[#555d30]"
          />
        </div>

        <div className="rounded-2xl border border-dashed border-[#d7ceb8] bg-[#fcfbf7] p-4">
          <label className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#555d30]">
            <FiPaperclip className="text-sm" />
            إضافة مرفقات (صور أو PDF) حتى 5 ملفات
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFiles}
            className="block w-full text-sm text-[#6b7053] file:ml-3 file:rounded-xl file:border-0 file:bg-[#555d30] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
          />

          {files.length > 0 && (
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {files.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-[#e7dfcd] bg-white p-3"
                >
                  {f.type && f.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3efe2] text-[#555d30]">
                      <FiFileText />
                    </div>
                  )}
                  <span className="truncate text-xs font-semibold text-[#4f543b]">
                    {f.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#555d30] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#444b26] disabled:opacity-50"
          >
            <FiSend size={15} />
            {loading ? "جارٍ الإرسال..." : "تأكيد التقديم"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d7ceb8] bg-white px-6 py-3 text-sm font-bold text-[#6b7053] transition hover:bg-[#faf7ef]"
          >
            <FiRotateCcw size={15} />
            إلغاء الطلب
          </button>
        </div>
      </div>
    </form>
  );
}
