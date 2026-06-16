import React, { useState } from 'react'

export default function SearchInputsPanel({
  onApply,
  onAdd,
  adding = false,
  searching = false,
  searchResults = [],
  searchNotFound = false,
  showResultAdd = false,
}) {
  const [searchValue, setSearchValue] = useState('')
  const [addValue, setAddValue] = useState('')
  const [addError, setAddError] = useState('')

  const handleAddStudent = async (event) => {
    event.preventDefault()
    const trimmed = addValue.trim()

    if (!trimmed || !onAdd) {
      return
    }

    if (!trimmed.includes('@') && !/^\d+$/.test(trimmed)) {
      setAddError('استخدمي الرقم العسكري أو البريد الإلكتروني، أو ابحثي بالاسمواضغطي إضافة من النتيجة.')
      return
    }

    setAddError('')
    await onAdd(trimmed)
    setAddValue('')
  }

  const handleAddSearchResult = async (student) => {
    const identifier = student.militaryId || student.email

    if (!identifier) {
      setAddError('نتيجة البحث دي ناقصها الرقم العسكري أو البريد الإلكتروني، جربي الإضافة يدوي بالرقم العسكري.')
      return
    }

    if (!onAdd) {
      return
    }

    setAddError('')
    await onAdd(identifier)
  }

  const submitFilters = (event) => {
    event.preventDefault()
    onApply({ searchValue: searchValue.trim() })
  }

  return (
    <section className="w-2/4 mx-auto px-4 py-4 space-y-4">
      <form className="space-y-2" onSubmit={handleAddStudent}>
       
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white h-9 border border-surface-dim rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40"
            onChange={(event) => setAddValue(event.target.value)}
            placeholder="الرقم العسكري أو البريد الإلكتروني"
            type="text"
            value={addValue}
          />
          <button
            className="bg-[#555d30] text-white transition-all duration-200 px-4 py-2 rounded-lg text-xs font-bold border-2 border-transparent hover:text-black disabled:opacity-60"
            disabled={adding || !addValue.trim()}
            type="submit"
          >
            {adding ? 'جاري الإضافة...' : 'إضافة'}
          </button>
        </div>
        {addError && (
          <p className="rounded-lg bg-amber-50 border border-amber-200 text-amber-800 px-3 py-2 text-[11px] font-semibold">
            {addError}
          </p>
        )}
      </form>

      <form className="space-y-2" onSubmit={submitFilters}>
        <input
          className="w-full bg-white h-9 border border-surface-dim rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40"
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="بحث أو الرقم العسكري أو البريد الإلكتروني"
          type="text"
          value={searchValue}
        />

        <div className="flex gap-2 pt-1">
          <button
            className="bg-[#555d30] text-white transition-all duration-200 px-3 py-2 rounded-lg text-xs font-bold border-2 border-transparent hover:text-black disabled:opacity-60"
            disabled={searching || !searchValue.trim()}
            type="submit"
          >
            {searching ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>
      </form>

      {searchNotFound && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 text-xs font-semibold text-center">
          الطالب مش موجود
        </div>
      )}

{searchResults.length > 0 && (
        <div className="space-y-2">
          {searchResults.map((student) => (
            <div
              key={student._id || student.militaryId || student.email}
              className="rounded-lg border border-outline-variant/30 bg-white/80 px-4 py-3 text-xs shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-bold text-sm text-on-surface">
                  {student.name} <br />
                   {student.email}
                </p>
                {showResultAdd && (
                  <button
                    className="bg-[#555d30] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:text-black disabled:opacity-60"
                    disabled={adding}
                    onClick={() => handleAddSearchResult(student)}
                    type="button"
                  >
                    {adding ? 'جاري الإضافة...' : 'إضافة للتصريح'}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-secondary">
                <p>
                  <span className="font-bold text-on-surface">الرقم العسكري: </span>
                  <span className="font-bold">{student.militaryId}</span>
                </p>
                <p>
                  <span className="font-bold text-on-surface">وقت الوصول: </span>
                  <span className="font-bold">{student.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
