import { useState } from "react";

export default function ExcuseUserForm() {
const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    type: "",
    details: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm w-full h-full flex flex-col justify-between"
    >
     

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <label htmlFor="startDate">تاريخ بداية الإجازة</label>
        <label htmlFor="endDate">تاريخ نهاية الإجازة</label>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          name="startDate"
          id="startDate"
          onChange={handleChange}
          className="border p-2 rounded-lg"
/>
        <input
          type="date"
          name="endDate"
          id="endDate"
          onChange={handleChange}
          className="border p-2 rounded-lg"
          />
      </div>

      {/* Select */}
      <select
        name="type"
        onChange={handleChange}
        className="border p-2 rounded-lg w-full mb-4"
      >
        <option>اختر نوع الالتماس</option>
        <option> طلب إجازة </option>
        <option>تأجيل </option>
      </select>

      {/* Textarea */}
      <textarea
        name="details"
        placeholder="يرجى شرح المبررات بالتفصيل..."
        onChange={handleChange}
 className="border p-3 rounded-lg w-full mb-4 min-h-[120px] flex-grow"      />

      {/* Upload */}
      <div className="border-2 border-dashed p-6 rounded-lg text-center mb-4  h-80">
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="hidden"
          id="upload"
        />
        <label htmlFor="upload" className="cursor-pointer text-gray-500">
          اسحب أو ارفع الملفات هنا
          <br />
          <span className="text-sm">PDF, JPG (MAX 5MB)</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-[#555d30] text-white px-6 py-2 rounded-lg"
        >
          تأكيد التقديم
        </button>
        <button
          type="button"
          className="text-gray-500"
        >
          إلغاء الطلب
        </button>
      </div>
    </form>  )
}
