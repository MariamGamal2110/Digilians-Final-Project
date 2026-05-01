import { FiBell, FiSettings, FiHelpCircle, FiSearch } from 'react-icons/fi'

export default function AdminRelativesTopBar({ searchText, setSearchText }) {
  return (
    <div dir="ltr" className="flex items-center justify-between border-b border-gray-200 px-7 py-4">
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition">
          <FiHelpCircle size={19} />
        </button>

        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition">
          <FiSettings size={19} />
        </button>

        <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition">
          <FiBell size={19} />
        </button>
      </div>

      <div className="relative w-80">
        <input
          dir="rtl"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          type="text"
          placeholder="البحث عن الطالب ..."
          className="w-full bg-[#f7f5f0] border border-gray-200 rounded-lg py-3 pr-4 pl-10 text-sm outline-none focus:border-[#555d30]"
        />

        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555d30]" />
      </div>
    </div>
  )
}