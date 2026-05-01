import React from 'react'
import { MdCheckCircle, MdCancel } from 'react-icons/md'

export default function HolidayChoiceSection({ selectedChoice, onChoiceChange }) {
  return (
    <div dir="rtl" className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">الإجازات الأسبوعية</h2>
        <p className="text-gray-600 text-sm">
          يرجى تحديد رغبتك في الدخول للإجازات الأسبوعية أم لا
        </p>
      </div>

      {/* Choice Message */}
      <p className="text-center text-gray-700 font-semibold mb-8">
        حدد رغبتك في الدخول للإجازات الأسبوعية<br/>
        <span className="text-sm font-normal text-gray-600">اختر احد الخيارين التاليين</span>
      </p>

      {/* Radio Options */}
      <div className="flex gap-6 justify-center items-stretch mb-8">
        {/* أرغب في الدخول - أحمر */}
        <label
          className="flex-1 flex items-center gap-4 cursor-pointer p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-md"
          style={{
            borderColor: selectedChoice === 'yes' ? '#dc2626' : '#e5e7eb',
            backgroundColor: selectedChoice === 'yes' ? '#fee2e2' : '#ffffff'
          }}
        >
          <input
            type="radio"
            name="holiday-choice"
            value="yes"
            checked={selectedChoice === 'yes'}
            onChange={(e) => onChoiceChange(e.target.value)}
            className="w-6 h-6 cursor-pointer"
            style={{ accentColor: '#dc2626' }}
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-lg"> لا أرغب في الدخول للإجازة الأسبوعية</span>
              <span className="text-xs text-gray-500">يمكنك الآن تثبيت طلبك</span>
          </div>
          <MdCancel className="w-8 h-8  text-red-500 ml-auto" />
       
        </label>

        {/* لا أرغب في الدخول - أخضر */}
        <label
          className="flex-1 flex items-center gap-4 cursor-pointer p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-md"
          style={{
            borderColor: selectedChoice === 'no' ? '#22c55e' : '#e5e7eb',
            backgroundColor: selectedChoice === 'no' ? '#dcfce7' : '#ffffff'
          }}
        >
          <input
            type="radio"
            name="holiday-choice"
            value="no"
            checked={selectedChoice === 'no'}
            onChange={(e) => onChoiceChange(e.target.value)}
            className="w-6 h-6 cursor-pointer"
            style={{ accentColor: '#22c55e' }}
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-800 text-lg"> أرغب في الدخول للإجازة الأسبوعية</span>
         
        <span className="text-xs text-gray-500">يجب تبرير عدم الدخول</span>
          </div>
          <MdCheckCircle className="w-8 h-8  text-green-500 ml-auto" />
       
        </label>
      </div>
    </div>
  )
}