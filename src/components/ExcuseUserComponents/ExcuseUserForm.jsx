import { useState } from "react";
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
      // ensure endDate is not earlier than startDate
      if (name === 'startDate') {
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

  const resetForm = () => setFormData({ type: "", details: "", startDate: today, endDate: today });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.type || !formData.details.trim()) {
      setError("يرجى ملء نوع ونص الالتماس");
      return;
    }

    setLoading(true);
    try {
      // support file uploads using FormData when files are present
      let created;
      if (files && files.length > 0) {
        const fd = new FormData();
        fd.append('title', formData.type);
        fd.append('message', formData.details);
        if (formData.startDate) fd.append('startDate', formData.startDate);
        if (formData.endDate) fd.append('endDate', formData.endDate);
        files.forEach((f) => fd.append('attachments', f));
        created = await createExcuse(fd);
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
      setSuccess('تم إرسال طلبك بنجاح');
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm w-full h-full flex flex-col justify-between">
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label htmlFor="startDate">تاريخ بداية الإجازة</label>
          <label htmlFor="endDate">تاريخ نهاية الإجازة</label>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} min={today} className="border p-2 rounded-lg" />
          <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} min={formData.startDate || today} className="border p-2 rounded-lg" />
        </div>

        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded-lg w-full mb-4">
          <option value="">اختر نوع الالتماس</option>
          <option value="طلب إجازة">طلب إجازة</option>
          <option value="تأجيل">تأجيل</option>
        </select>

        <textarea name="details" placeholder="يرجى شرح المبررات بالتفصيل..." value={formData.details} onChange={handleChange} className="border p-3 rounded-lg w-full mb-4 min-h-[120px] flex-grow" />

        <div className="mb-4">
          <label className="block text-sm mb-2">إضافة مرفقات (صور أو PDF) — حتى 5 ملفات</label>
          <input type="file" accept="image/*,application/pdf" multiple onChange={handleFiles} />
          {files.length > 0 && (
            <div className="mt-2">
              <ul className="text-xs mt-2 space-y-2 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 border p-2 rounded-md bg-white">
                    {f.type && f.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(f)} alt={f.name} className="h-12 rounded-md object-cover" />
                    ) : (
                      <span className="text-sm">📄</span>
                    )}
                    <span className="truncate max-w-[160px]">{f.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-[#555d30] text-white px-6 py-2 rounded-lg">
            {loading ? "جاري الإرسال..." : "تأكيد التقديم"}
          </button>
          <button type="button" onClick={resetForm} className="text-gray-500">
            إلغاء الطلب
          </button>
        </div>
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </div>
    </form>
  );
}
