import React from 'react'

export default function WelcomeHeader({ student, loading }) {
  const displayName = student?.name || 'طالب'
  const militaryId = student?.militaryId || '—'

  return (
    <header className="mb-12">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2">
        {loading ? 'جاري التحميل...' : `أهلاً بك، ${displayName}`}
      </h2>
      <div className="flex items-center gap-2 text-secondary">
        <span className="text-label-md font-bold uppercase tracking-widest text-sm bg-surface-container-high px-3 py-1 rounded">
          الرقم العسكري: {loading ? '...' : militaryId}
        </span>
      </div>
    </header>
  )
}
