import React, { useState } from 'react'

export default function SearchInputsPanel({ onApply }) {
  const [nationalId, setNationalId] = useState('')
  const [militaryId, setMilitaryId] = useState('')

  const submitFilters = (event) => {
    event.preventDefault()
    onApply({ nationalId: nationalId.trim(), militaryId: militaryId.trim() })
  }

  const clearFilters = () => {
    setNationalId('')
    setMilitaryId('')
    onApply({ nationalId: '', militaryId: '' })
  }

  return (
    <section className="glass-card border border-outline-variant/20 rounded-xl p-5 mb-8">
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={submitFilters}>
        <label className="flex flex-col gap-2 text-right">
          <span className="text-xs font-bold text-secondary tracking-widest">الرقم القومي</span>
          <input
            className="bg-white border border-surface-dim rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40"
            onChange={(event) => setNationalId(event.target.value)}
            placeholder="ادخل الرقم القومي"
            type="text"
            value={nationalId}
          />
        </label>

        <label className="flex flex-col gap-2 text-right">
          <span className="text-xs font-bold text-secondary tracking-widest">الرقم العسكري</span>
          <input
            className="bg-white border border-surface-dim rounded-lg px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40"
            onChange={(event) => setMilitaryId(event.target.value)}
            placeholder="ادخل الرقم العسكري"
            type="text"
            value={militaryId}
          />
        </label>

        <div className="flex items-end gap-2">
          <button className="satin-gradient text-white px-5 py-2.5 rounded-lg text-sm font-semibold" type="submit">
            تطبيق البحث
          </button>
          <button
            className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-outline-variant/50 text-secondary hover:bg-surface-container-high"
            onClick={clearFilters}
            type="button"
          >
            مسح
          </button>
        </div>
      </form>
    </section>
  )
}
