import React from 'react'

export default function AbsentAll() {
    return (
        <section className="glass-card border  border-outline-variant/30 rounded-2xl px-6 py-5 ">


            <p className="text-xs font-bold text-secondary tracking-widest mb-2">طلاب متأخرين</p>
            <div className="flex items-end gap-2">
                <span className="text-4xl leading-none font-black text-primary">42</span>
                <span className="text-xs font-semibold text-rose-700 pb-1">اليوم</span>
            </div>
            <p className="mt-3 text-xs text-secondary">إجمالي الطلاب المتأخرين في الكشوف الحالية.</p>
        </section>
    )
}
