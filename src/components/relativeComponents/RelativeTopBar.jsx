export default function RelativeTopBar({ searchText, setSearchText }) {
  return (
    <div
      dir="ltr"
      className="flex items-center justify-end border-b border-gray-200 px-7 py-4"
    >
      <div className="relative w-72">
        <input
          dir="rtl"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="ابحث باسم القريب..."
          className="w-full bg-[#f7f5f0] border border-gray-200 rounded-lg py-3 pr-4 pl-10 text-sm outline-none focus:border-[#555d30]"
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555d30]">
          ⌕
        </span>
      </div>
    </div>
  )
}
