import React from 'react'

export default function CurrentStatusCard({ latestAttendance, loading }) {
  const hasArrival = !!latestAttendance
  const status = latestAttendance?.status || ''
  const isLate = status === 'متأخر'
  const isExcuse = status === 'التماس'

  const cardColor = hasArrival && isLate ? 'bg-red-600' : 'bg-[#555d30]'

  return (
    <section className={`lg:col-span-4 ${cardColor} text-on-primary-container rounded-xl p-8 flex flex-col justify-between overflow-hidden relative`}>
      <div className="relative z-10">
        <span className="text-xs font-bold tracking-widest uppercase text-on-primary-container/70 mb-4 block">
          حالة الوصول الحالية
        </span>

        {loading ? (
          <h3 className="text-3xl font-headline font-bold text-white mb-2">جاري التحميل...</h3>
        ) : hasArrival ? (
          <>
            <h3 className="text-3xl font-headline font-bold text-white mb-2">
              {isExcuse ? 'معتمد بالتماس' : isLate ? 'وصلت متأخرا' : 'وصلت في الموعد'}
            </h3>
            <p className="text-on-primary-container/80 text-sm leading-relaxed">
              {isExcuse
                ? `تم تسجيل وصولك بالتماس يوم ${latestAttendance.date} الساعة ${latestAttendance.time}. لا يتم خصم أي درجات.`
                : `تم تسجيل وصولك يوم ${latestAttendance.date} الساعة ${latestAttendance.time}.${isLate
                  ? ` تم خصم ${latestAttendance.deduction} درجات بسبب التأخير بعد الساعة 5 مساء.`
                  : ' لم يتم تطبيق أي خصم على درجاتك.'}`}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-3xl font-headline font-bold text-white mb-2">لم يتم التسجيل بعد</h3>
            <p className="text-on-primary-container/80 text-sm leading-relaxed">
              لم يقم المسؤول بتسجيل وصولك حتى الآن. ستظهر بيانات الوصول هنا فور إضافتك من لوحة الإدارة.
            </p>
          </>
        )}
      </div>

<div className="mt-8 relative z-10">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <span className={`block text-3xl font-bold ${hasArrival && latestAttendance.deduction > 0 && !isExcuse ? 'text-red-200' : 'text-white'}`}>
              {hasArrival
                ? (isExcuse ? '0' : (latestAttendance.deduction > 0 ? `-${latestAttendance.deduction}` : '0'))
                : 0}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              درجات الخصم
            </span>
          </div>
          <span className="material-symbols-outlined text-6xl opacity-20">verified_user</span>
        </div>
      </div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
    </section>
  )
}
