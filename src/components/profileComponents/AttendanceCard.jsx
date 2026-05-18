import InfoCard from './InfoCard'

function AttendanceCalendarIcon() {
  return (
    <div className="h-20 w-20 rounded-lg bg-[#dde1cf] flex items-center justify-center">
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="4" y="6" width="16" height="14" rx="2" fill="#6b7440" />
        <rect x="4" y="6" width="16" height="4" rx="2" fill="#4f572d" />
        <rect x="7" y="3.5" width="2" height="5" rx="1" fill="#4f572d" />
        <rect x="15" y="3.5" width="2" height="5" rx="1" fill="#4f572d" />

        <rect x="7" y="12" width="2" height="2" rx="0.4" fill="#ffffff" />
        <rect x="11" y="12" width="2" height="2" rx="0.4" fill="#ffffff" />
        <rect x="15" y="12" width="2" height="2" rx="0.4" fill="#ffffff" />

        <rect x="7" y="16" width="2" height="2" rx="0.4" fill="#ffffff" />
        <rect x="11" y="16" width="2" height="2" rx="0.4" fill="#ffffff" />
        <rect x="15" y="16" width="2" height="2" rx="0.4" fill="#ffffff" />
      </svg>
    </div>
  )
}

export default function AttendanceCard({ absenceDays }) {
  const formattedAbsenceDays = String(absenceDays).padStart(2, '0')

  return (
    <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1">
      <InfoCard title="سجل الحضور">
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="text-center">
            <p className="text-[#555d30] text-sm mb-2">
              عدد أيام الغياب
            </p>

            <p className="text-[#1f220f] font-bold text-4xl">
              {formattedAbsenceDays}
            </p>
          </div>

          <AttendanceCalendarIcon />
        </div>
      </InfoCard>
    </div>
  )
}