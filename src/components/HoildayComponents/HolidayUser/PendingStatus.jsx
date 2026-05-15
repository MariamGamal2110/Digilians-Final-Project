import React from 'react'
import { MdHourglassEmpty } from 'react-icons/md'

export default function PendingStatus({ onReset }) {
  return (
    <section dir="rtl" className="min-h-screen bg-background px-6 py-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          {/* Pending Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-yellow-100 rounded-full p-8 animate-pulse">
              <MdHourglassEmpty className="w-20 h-20 text-yellow-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-primary mb-4">طلبك قيد الانتظار</h2>

          {/* Message */}
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            شكراً لتقديمك طلب الإجازة الأسبوعية<br/>
            تم استقبال طلبك بنجاح وهو حالياً قيد المراجعة من قبل الإدارة<br/>
            سيتم إخطارك برد الإدارة خلال الفترة القادمة
          </p>

          {/* Status Indicator */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-yellow-800 font-bold text-lg">قيد الانتظار - يرجى الانتظار</p>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-right">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-bold text-primary">الحالة:</span> قيد المراجعة
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-primary">التاريخ:</span> {new Date().toLocaleDateString('ar-EG')}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={onReset}
            className="bg-accent text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-200"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </section>
  )
}
