import React from 'react'

export default function AcademyImg
() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm relative">
  <img
    src="public/images/Academy.jpg"
    alt="academy"
  className="w-full aspect-[4/3] object-cover rounded-2xl"
  />
  <div className="p-3 text-lg font-bold text-white absolute bottom-0 ">
    الأكاديمية العسكرية العليا
  </div>
</div>

  )
}
