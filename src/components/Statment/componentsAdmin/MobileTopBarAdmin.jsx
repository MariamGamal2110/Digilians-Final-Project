import React from 'react'

export default function MobileTopBarAdmin() {
  return (
    <header className="md:hidden flex justify-between items-center w-full px-6 h-20 bg-surface border-b border-outline-variant/20 backdrop-blur">
      <span className="text-xl font-bold text-primary tracking-tighter">لوحة التصاريح</span>
      <div className="flex gap-4">
        <span className="material-symbols-outlined text-primary">notifications</span>
        <span className="material-symbols-outlined text-primary">account_circle</span>
      </div>
    </header>
  )
}