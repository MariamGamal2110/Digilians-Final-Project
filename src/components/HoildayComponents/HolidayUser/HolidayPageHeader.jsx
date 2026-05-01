import React from 'react'
import { MdEventNote } from 'react-icons/md'

export default function HolidayPageHeader() {
  return (
    <div dir="rtl" className="mb-8">
      <div className="bg-gradient-to-r bg-[#555d30]  rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-6">
          <div className="bg-white bg-opacity-20 p-4 rounded-xl backdrop-blur">
            <MdEventNote className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">الإجازات الأسبوعية</h1>
            <p className="text-white text-opacity-90 text-lg">
              نظام إدارة طلبات الإجازات الأسبوعية - يرجى تحديد رغبتك في الدخول للإجازة أو طلب التسهيلات الخاصة بك
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
