import React from 'react'

export default function StatementFooter() {
  return (
    <footer className="mt-20 py-12 border-t border-outline-variant/10 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-8 text-secondary text-xs font-bold tracking-[0.2em] uppercase">
          <span>الواجب</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>الشرف</span>
          <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/40"></span>
          <span>الوطن</span>
        </div>
      </div>
    </footer>
  )
}
