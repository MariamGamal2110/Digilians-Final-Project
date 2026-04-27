import React from 'react'

export default function StatementFooterAdmin() {
  return (
    <footer className="mt-10 py-8 text-center border-t border-outline-variant/20">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6 text-secondary text-[11px] font-bold tracking-[0.15em] uppercase">
          <span>الدقة</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>الانضباط</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>المتابعة</span>
        </div>
      </div>
    </footer>
  )
}
