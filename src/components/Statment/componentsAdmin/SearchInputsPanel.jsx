import React, { useState } from 'react'

export default function SearchInputsPanel({ onApply }) {
  const [searchValue, setSearchValue] = useState('')

  const submitFilters = (event) => {
    event.preventDefault()
    onApply({ searchValue: searchValue.trim() })
  }

  const clearFilters = () => {
    setSearchValue('')
    onApply({ searchValue: '' })
  }
  return (
    <section className=" w-2/4 mx-auto   px-4 py-4">


      <form className="space-y-2" onSubmit={submitFilters}>
        <input
          className="w-full bg-white h-9 border border-surface-dim mb-2 rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40"
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="بحث بالرقم القومي أو الرقم العسكري"
          type="text"
          value={searchValue}
        />

        <div className="flex gap-2 pt-1 ">
          <button
            className="bg-[#555d30] text-white transition-all duration-200 px-3 py-2 rounded-lg text-xs font-bold  border-2 border-transparent  hover:text-black "
            type="submit"
          >
            تطبيق
          </button>
          <button
            className="px-3 py-2 rounded-lg text-xs transition-all duration-200 hover:border-[#434a26]  hover:text-black font-bold border border-outline-variant/50 text-secondary hover:bg-surface-container-high"
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
