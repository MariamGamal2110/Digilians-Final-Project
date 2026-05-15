import React from 'react'

export default function CurrentStatusCardAdmin() {
  return (
    <section className="glass-card border border-outline-variant/30 rounded-2xl px-6 py-5">
      <p className="text-xs font-bold text-secondary tracking-widest mb-2">إجمالي المتوقع</p>
      <div className="flex items-end gap-2">
        <span className="text-4xl leading-none font-black text-primary">1250</span>
        <span className="text-xs text-secondary pb-1">طالب</span>
      </div>
      <p className="mt-3 text-xs text-secondary">سجلات الطلاب المعتمدة لعملية الوصول.</p>
    </section>
  )
}
