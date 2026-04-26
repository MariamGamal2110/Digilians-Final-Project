import React from 'react'

export default function CurrentStatusCardAdmin() {
  return (
    <section className="lg:col-span-4 bg-primary-container text-on-primary-container rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
      <div className="relative z-10">
        <span className="text-xs font-bold tracking-widest uppercase text-on-primary-container/70 mb-4 block">إحصاء اليوم</span>
        <h3 className="text-3xl font-headline font-bold text-white mb-2">متابعة الحضور</h3>
        <p className="text-on-primary-container/80 text-sm leading-relaxed">راجع حالة كل طالب بسرعة: حضر، لم يحضر، لديه التماس، أو متأخر.</p>
      </div>

      <div className="mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <span className="block text-2xl font-bold text-white">34</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">حضر</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">8</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">لم يحضر</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">3</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">التماس</span>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
    </section>
  )
}
