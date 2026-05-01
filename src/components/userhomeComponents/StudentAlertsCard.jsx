import { FiBell } from 'react-icons/fi'

export default function StudentAlertsCard() {
  return (
    <div className="bg-white rounded-2xl p-5 min-h-[120px] shadow-sm border border-[#d9dccd] hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="text-right">
          <h3 className="text-[#1f220f] font-bold text-lg mb-1">
            تنبيهات هامة
          </h3>

          <p className="text-[#7b815f] text-xs">
            إشعار مهم للطالب
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-[#f3f1e8] flex items-center justify-center text-[#1f220f]">
          <FiBell size={20} />
        </div>
      </div>

      <div className="bg-[#f8f7f2] border border-[#ece8da] rounded-xl px-4 py-3">
        <p className="text-[#4f572d] text-sm leading-7 font-medium">
          على جميع الطلاب الالتزام بجميع التوقيتات
        </p>
      </div>
    </div>
  )
}