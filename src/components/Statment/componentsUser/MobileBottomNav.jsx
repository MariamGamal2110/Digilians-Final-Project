import React from 'react'

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container flex justify-around items-center h-16 border-t-0 shadow-lg px-2">
      <a className="flex flex-col items-center text-primary font-bold" href="#">
        <span className="material-symbols-outlined">assignment_turned_in</span>
        <span className="text-[10px]">التصريح</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">payments</span>
        <span className="text-[10px]">الدفع</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">directions_bus</span>
        <span className="text-[10px]">الأتوبيس</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">gavel</span>
        <span className="text-[10px]">الالتماس</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px]">الملف</span>
      </a>
    </nav>
  )
}
