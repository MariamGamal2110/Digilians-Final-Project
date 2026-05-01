import React from 'react'
import { LuTimerReset } from "react-icons/lu";
import { GoDot, GoDotFill } from "react-icons/go";


export default function ExcusStatus() {
  return (
    <>
  <div className="bg-white p-5 rounded-2xl shadow-sm w-full">

    {/* Title */}
    <h2 className="text-lg font-bold text-gray-700 mb-4">
      حالة آخر طلب
    </h2>

    <div className="flex items-center gap-3 mb-4">
      <div className="bg-yellow-100 text-[#555d30] p-2 rounded-lg">
        <LuTimerReset className="text-lg" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700">
          قيد المراجعة
        </h3>
        <p className="text-xs text-gray-400">
          طلب إجازة (24/10/2026)
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3 mb-4">
      <GoDotFill className="text-green-600 mt-1" />

      <div>
        <h3 className="text-sm font-semibold text-gray-700">
          تم تقديم الطلب
        </h3>
        <p className="text-xs text-gray-400">
          22 أكتوبر 2026 - 10:25 صباحاً
        </p>
      </div>
    </div>

    <div className="flex items-start gap-3">
      <GoDot className="text-gray-300 mt-1" />

      <div>
        <h3 className="text-sm font-semibold text-gray-500">
          جاري المراجعة
        </h3>
        <p className="text-xs text-gray-400">
          بانتظار الرد...
        </p>
      </div>
    </div>

  </div>
</>

  )
}
