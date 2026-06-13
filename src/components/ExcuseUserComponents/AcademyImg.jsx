import React from "react";

export default function AcademyImg() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#e9e2d2] bg-white shadow-[0_18px_48px_rgba(31,34,15,0.06)]">
      <div className="relative">
        <img
          src="/images/Academy.jpg"
          alt="academy"
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f220f]/85 via-[#1f220f]/40 to-transparent px-5 pb-5 pt-10 text-white">
          <p className="text-xs font-semibold text-white/75">الأكاديمية</p>
          <h3 className="mt-1 text-lg font-extrabold">
            الأكاديمية العسكرية العليا
          </h3>
        </div>
      </div>
    </div>
  );
}
