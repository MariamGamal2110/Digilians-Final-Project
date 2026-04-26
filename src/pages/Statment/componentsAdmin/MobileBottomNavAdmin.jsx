import React from 'react'

export default function MobileBottomNavAdmin() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container flex justify-around items-center h-16 border-t-0 shadow-lg px-2">
      <a className="flex flex-col items-center text-primary font-bold" href="#">
        <span className="material-symbols-outlined">assignment_turned_in</span>
        <span className="text-[10px]">التصاريح</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">groups</span>
        <span className="text-[10px]">الحضور</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">photo_camera</span>
        <span className="text-[10px]">Scan</span>
      </a>
      <a className="flex flex-col items-center text-stone-500" href="#">
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px]">إعدادات</span>
      </a>
    </nav>
  )
}
