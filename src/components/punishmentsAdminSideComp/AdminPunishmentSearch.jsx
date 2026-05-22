export default function AdminPunishmentSearch({ searchText, onSearchChange, onAddClick }) {
  return (
    <div className="flex items-center justify-between mb-4 gap-3">

      {/* Search Input */}
      <div className="relative flex-1 max-w-xs">
        <input
          dir="rtl"
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="البحث بالاسم أو الرقم العسكري..."
          className="w-full bg-[#f7f5f0] border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm outline-none focus:border-[#555d30] transition"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555d30] text-lg pointer-events-none">
          ⌕
        </span>
      </div>

      {/* Add Button */}
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 bg-[#555d30] hover:bg-[#3f4723] text-white rounded-lg px-4 py-2 text-sm font-bold transition whitespace-nowrap"
      >
        <span>＋</span>
        إدخال عقوبة
      </button>

    </div>
  );
}