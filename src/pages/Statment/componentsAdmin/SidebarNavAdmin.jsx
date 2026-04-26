import React from 'react'

export default function SidebarNavAdmin() {
  return (
    <aside className="hidden md:flex fixed right-0 top-0 h-full w-72 flex-col py-8 gap-2 bg-surface-container-low border-l-0 shadow-none">
      <div className="px-8 mb-10">
        <h1 className="font-headline font-extrabold text-primary text-2xl tracking-tighter">سجل الطالب</h1>
        <p className="text-secondary text-xs font-medium">وضع الإدارة</p>
      </div>

      <nav className="flex-1 space-y-1">
        <a className="bg-primary-container text-white rounded-md shadow-sm mx-4 my-1 flex items-center px-4 py-3 opacity-90" href="#">
          <span className="material-symbols-outlined ml-3">assignment_turned_in</span>
          <span className="text-sm font-medium">إدارة التصاريح</span>
        </a>
        <a className="text-secondary hover:bg-[#dcd9d9]/30 mx-4 my-1 rounded-md flex items-center px-4 py-3 transition-all hover:translate-x-[-4px]" href="#">
          <span className="material-symbols-outlined ml-3">groups</span>
          <span className="text-sm font-medium">حضور الطلبة</span>
        </a>
        <a className="text-secondary hover:bg-[#dcd9d9]/30 mx-4 my-1 rounded-md flex items-center px-4 py-3 transition-all hover:translate-x-[-4px]" href="#">
          <span className="material-symbols-outlined ml-3">fact_check</span>
          <span className="text-sm font-medium">الالتماسات</span>
        </a>
      </nav>

      <div className="mt-auto border-t border-outline-variant/10 pt-4 space-y-1">
        <a className="text-secondary hover:bg-[#dcd9d9]/30 mx-4 my-1 rounded-md flex items-center px-4 py-3 transition-all" href="#">
          <span className="material-symbols-outlined ml-3">settings</span>
          <span className="text-sm font-medium">الإعدادات</span>
        </a>
        <a className="text-secondary hover:bg-[#dcd9d9]/30 mx-4 my-1 rounded-md flex items-center px-4 py-3 transition-all" href="#">
          <span className="material-symbols-outlined ml-3">logout</span>
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </a>
      </div>
    </aside>
  )
}
