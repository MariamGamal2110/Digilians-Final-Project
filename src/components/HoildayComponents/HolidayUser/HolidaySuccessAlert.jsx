import React from 'react'
import { MdCheckCircle } from 'react-icons/md'

export default function HolidaySuccessAlert({ message, onClose }) {
  return (
    <div dir="rtl" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full animate-bounce">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="bg-green-100 rounded-full p-6 animate-pulse">
            <MdCheckCircle className="w-16 h-16 text-accent" />
          </div>
          <h3 className="text-3xl font-bold text-primary">تم بنجاح ✓</h3>
          <p className="text-gray-600 text-lg">
            {message || 'تم استقبال طلبك بنجاح سيتم مراجعة الطلب من قبل الإدارة قريباً'}
          </p>
          <button
            onClick={onClose}
            className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 w-full mt-4"
          >
            حسناً
          </button>
        </div>
      </div>
    </div>
  )
}
