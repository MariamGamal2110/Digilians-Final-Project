import { FiBell, FiSettings } from 'react-icons/fi'

export default function RelativeTopBar({ searchText, setSearchText }) {
  return (
    <div
      dir="ltr"
      className="flex items-center justify-between border-b border-gray-200 px-7 py-4"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          title="الإعدادات"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition"
        >
          <FiSettings size={20} />
        </button>

        <button
          type="button"
          title="الإشعارات"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#3b3120] hover:bg-[#f3efe4] hover:scale-110 transition"
        >
          <FiBell size={20} />
        </button>
      </div>

      <div className="relative w-72">
        <input
          dir="rtl"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="البحث ..."
          className="w-full bg-[#f7f5f0] border border-gray-200 rounded-lg py-3 pr-4 pl-10 text-sm outline-none focus:border-[#555d30]"
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555d30]">
          ⌕
        </span>
      </div>
    </div>
  )
}