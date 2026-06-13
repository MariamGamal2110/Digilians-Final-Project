import React, { useState } from 'react'

export default function AdminHolidayFilters({ onSearch }) {
  const [searchInput, setSearchInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const handleSearch = () => {
    if (searchInput.trim() || statusFilter) {
      onSearch(searchInput.trim(), statusFilter)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div dir="rtl" className="bg-white rounded-xl p-6 shadow-md mb-4">
      <div className="flex gap-3 items-end">

        {/* Input البحث */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            البحث بالاسم أو الرقم العسكري
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ابحث بالاسم أو الرقم العسكري..."
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none transition-colors"
            style={{ borderColor: searchInput ? '#5f6f41' : '#d1d5db' }}
          />
        </div>

        {/* Select الحالة */}
      
        {/* زرار بحث */}
        <button
          onClick={handleSearch}
          disabled={!searchInput.trim() && !statusFilter}
          className="px-6 py-2.5 bg-[#5f6f41] text-white rounded-lg font-bold hover:bg-[#4a5632] disabled:opacity-50 transition-colors"
        >
          بحث
        </button>
      </div>
    </div>
  )
}