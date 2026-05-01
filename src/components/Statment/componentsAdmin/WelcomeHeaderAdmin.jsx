import React from 'react'

export default function WelcomeHeaderAdmin() {
  return (
    <header className="mb-6 text-right flex flex-col ">
      <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight mb-1">سجل وصول الطلاب</h2>
      <div className="flex items-center justify-end gap-2 text-secondary text-sm">
        <span>متابعة يومية لحركة الوصول </span>
        <span className="text-outline-variant">.</span>
        <span>الأحد، 22 أكتوبر 2023</span>
      </div>
    </header>
  )
}
