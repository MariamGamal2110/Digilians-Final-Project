import React from 'react'

export default function StatementFooterAdmin() {
  return (
    <footer className="mt-20 py-12 border-t border-outline-variant/10 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-8 text-secondary text-xs font-bold tracking-[0.2em] uppercase">
          <span>الدقة</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>الانضباط</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>المتابعة</span>
        </div>
        <p className="text-secondary/50 text-[10px] max-w-md mx-auto">لوحة متابعة التصاريح والحضور - الأكاديمية العسكرية ٢٠٢٣. جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  )
}
