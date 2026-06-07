import React from 'react'

export default function AttendenceAll({ totalAttendance = 0 }) {
  return (
    <section className="glass-card border border-outline-variant/30 rounded-2xl px-6 py-5">
      <p className="text-xs font-bold text-secondary tracking-widest mb-2">إجمالي الحضور</p>
      <div className="flex items-end gap-2">
        <span className="text-4xl leading-none font-black text-primary">{totalAttendance}</span>
        <span className="text-xs tex text-secondary pb-1">طالب</span>
      </div>
    </section>
  )
}
