import { FiClock } from 'react-icons/fi'

export default function ScheduleTimeline({ schedule }) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-8 min-h-[410px] shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-7">
        <div className="text-right">
          <h2 className="text-[#1f220f] font-bold text-lg flex items-center gap-2">
            <span className="w-1 h-5 bg-[#555d30] rounded-full inline-block"></span>
            جدول توقيتات الأكاديمية
          </h2>

          <p className="text-[#6b6f5a] text-xs mt-2">
            مواعيد اليوم التدريبي الأساسية للطالب
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-[#f3f1e8] border border-[#e8e5dc] text-[#555d30] flex items-center justify-center">
          <FiClock size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((row, i) => (
          <div
            key={i}
            className="group flex items-center justify-between gap-5 rounded-xl border border-[#eee9dc] bg-[#fcfbf8] px-5 py-4 transition-all duration-200 hover:bg-white hover:border-[#c8cdb8] hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#f3f1e8] text-[#555d30] flex items-center justify-center font-bold">
                {i + 1}
              </div>

              <div className="text-right">
                <p className="text-[#1f220f] font-bold text-sm">
                  {row.activity}
                </p>

                <p className="text-[#7a7a68] text-xs mt-1">
                  نشاط يومي
                </p>
              </div>
            </div>

            <div className="rounded-full bg-white border border-[#e8e5dc] px-4 py-2 text-[#555d30] text-xs font-bold shadow-sm">
              {row.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}