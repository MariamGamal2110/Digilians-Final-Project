import React from 'react'

export default function CurrentStatusCard() {
  return (
    <section className="lg:col-span-4 bg-[#555d30] text-on-primary-container rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
      <div className="relative z-10">
        <span className="text-xs font-bold tracking-widest uppercase text-on-primary-container/70 mb-4 block">حالة الوصول الحالية</span>
        <h3 className="text-3xl font-headline font-bold text-white mb-2">خارج المنشأة</h3>
        <p className="text-on-primary-container/80 text-sm leading-relaxed">أنت الآن في فترة الإجازة الرسمية. يرجى التأكد من العودة قبل الموعد المحدد لتجنب المخالفات.</p>
      </div>

      <div className="mt-8 relative z-10">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <span className="block text-3xl font-bold text-white">24</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">ساعة متبقية</span>
          </div>
          <span className="material-symbols-outlined text-6xl opacity-20">verified_user</span>
        </div>
      </div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
    </section>
  )
}
