import React from 'react'

export default function MobileTopBarAdmin() {
  return (
    <header className="md:hidden flex justify-between items-center w-full px-6 h-20 bg-surface border-b-0">
      <span className="text-xl font-bold text-primary tracking-tighter">لوحة إدارة التصاريح</span>
      <div className="flex gap-4">
        <span className="material-symbols-outlined text-primary">notifications</span>
        <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
      </div>
    </header>
  )
}
