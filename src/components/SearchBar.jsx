import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "بحث بالاسم أو الرقم العسكري..." }) => {
  return (
    <div className="relative w-full md:w-80">
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
        search
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#451518] outline-none transition-all"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;