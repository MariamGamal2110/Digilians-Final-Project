import React from 'react'

export default function WelcomeHeaderAdmin() {
  return (
    <header className="mb-8">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2">أهلاً بك، مسؤول النظام</h2>
      <div className="flex items-center gap-2 text-secondary">
        <span className="text-label-md font-bold uppercase tracking-widest text-sm bg-surface-container-high px-3 py-1 rounded">إدارة الحضور والتصاريح</span>
      </div>
    </header>
  )
}
