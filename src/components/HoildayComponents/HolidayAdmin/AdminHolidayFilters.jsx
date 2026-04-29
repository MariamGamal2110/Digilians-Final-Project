import React from 'react'

export default function AdminHolidayFilters({ filters, onFilterChange }) {
  return (
    <div dir="rtl" className="bg-white rounded-xl p-6 shadow-md mb-8">
      <div className="flex gap-4 items-end">
        {/* Search by Name */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            البحث باسم الطالب
          </label>
          <input
            type="text"
            value={filters.searchName}
            onChange={(e) => onFilterChange('searchName', e.target.value)}
            placeholder="ابحث باسم الطالب..."
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors"
            style={{ borderColor: filters.searchName ? '#5f6f41' : '#d1d5db' }}
          />
        </div>

        {/* Search by Military ID */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            البحث برقم الطالب
          </label>
          <input
            type="text"
            value={filters.searchMilitaryId}
            onChange={(e) => onFilterChange('searchMilitaryId', e.target.value)}
            placeholder="ابحث برقم الطالب..."
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent transition-colors"
            style={{ borderColor: filters.searchMilitaryId ? '#5f6f41' : '#d1d5db' }}
          />
        </div>

        {/* Filter by Status */}
        <div className="flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            حسب الحالة
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none transition-colors appearance-none bg-white"
            style={{
              borderColor: filters.status ? '#5f6f41' : '#d1d5db',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235f6f41' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left 12px center',
              paddingLeft: '35px'
            }}
          >
            <option value="">جميع الحالات</option>
            <option value="معتمد">معتمد</option>
            <option value="قيد الانتظار">قيد الانتظار</option>
            <option value="مرفوض">مرفوض</option>
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={() => onFilterChange('clear', '')}
          className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
        >
          مسح البحث
        </button>
      </div>
    </div>
  )
}
