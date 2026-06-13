import React from 'react'

export default function HolidayForm({ formData, onFormChange, onSubmit, onCancel }) {
  const governorates = [
    'اختر المحافظة',
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'القليوبية',
    'الدقهلية',
    'الغربية',
    'المنوفية',
    'الشرقية',
    'الإسماعيلية',
    'بور سعيد',
    'السويس',
    'الفيوم',
    'بني سويف',
    'المنيا',
    'أسيوط',
    'سوهاج',
    'قنا',
    'الأقصر',
    'أسوان',
    'البحر الأحمر',
    'مطروح',
    'الوادي الجديد',
    'جنوب سيناء',
    'شمال سيناء'
  ]

  return (
    <div dir="rtl" className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mt-8">
      {/* Section Header */}
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
      
<h3 className="text-2xl font-bold text-primary mb-2">
          تأكيد طلب الدخول للإجازة الأسبوعية
        </h3>



        <p className="text-sm text-gray-600">
          يرجى تصفية البيانات التالية مع توضيح سبب عدم الدخول للإجازة الأسبوعية
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name and Military ID Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-accent">👤</span>
              <span>الاسم الكامل</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onFormChange}
              placeholder="أدخل الاسم الكامل"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>

          {/* Military ID */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-accent">🆔</span>
              <span>الرقم العسكري</span>
            </label>
            <input
              type="text"
              name="militaryId"
              value={formData.militaryId}
              onChange={onFormChange}
              placeholder="أدخل الرقم العسكري"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>
        </div>

        {/* Governorate */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-accent">📍</span>
            <span>المحافظة</span>
          </label>
          <select
            name="governorate"
            value={formData.governorate}
            onChange={onFormChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235f6f41' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left 12px center',
              paddingLeft: '35px'
            }}
          >
            {governorates.map((gov) => (
              <option key={gov} value={gov}>
                {gov}
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-accent">📝</span>
            <span>سبب عدم الدخول</span>
          </label>

          {/* Quick select for "عدم رغبة" */}
          <div className="mb-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onFormChange({ target: { name: 'reason', value: 'عدم رغبة' } })}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                formData.reason === 'عدم رغبة'
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              عدم رغبة
            </button>
          </div>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={onFormChange}
            placeholder="اكتب سبب عدم الدخول للإجازة الأسبوعية..."
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none h-32"
          />
          <p className="text-xs text-gray-500 mt-2 text-left">
            الحد الأقصى {formData.reason.length}/500 حرف
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-[#555d30]  text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✓</span>
            <span>إرسال الطلب</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✕</span>
            <span>إلغاء</span>
          </button>
        </div>
      </form>
    </div>
  )
}
