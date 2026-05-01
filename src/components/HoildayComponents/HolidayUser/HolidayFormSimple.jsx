import React from 'react'

export default function HolidayFormSimple({ formData, onFormChange, onSubmit, onCancel }) {
  return (
    <div dir="rtl" className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 mt-8">
      {/* Section Header */}
      <div className="mb-6 pb-6 border-b-2 border-gray-200">
        


          <h3 className="text-2xl font-bold text-primary mb-2">
          بيانات الطالب (من لا يرغب في الدخول للإجازة الأسبوعية)
        </h3>
        <p className="text-sm text-gray-600">
          يرجى إدخال بيانات التعريف الخاصة بك فقط
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

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-[#555d30]  text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✓</span>
            <span>تأكيد الطلب</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border-2  border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>✕</span>
            <span>إلغاء</span>
          </button>
        </div>
      </form>
    </div>
  )
}