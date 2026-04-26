import InfoCard from './InfoCard'

export default function DurationCard() {
  const selectedDuration = '4 أشهر'

  const durations = [
    '4 أشهر',
    '9 أشهر',
    'سنة واحدة',
    'سنتين',
  ]

  return (
    <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1">
      <InfoCard title="مدة التخصص">
        <div className="grid grid-cols-2 gap-3">
          {durations.map((duration) => (
            <button
              key={duration}
              type="button"
              disabled
              className={
                duration === selectedDuration
                  ? 'bg-[#555d30] text-white rounded-md py-2.5 font-bold cursor-default'
                  : 'bg-[#e8e5dc] text-[#1f220f] rounded-md py-2.5 font-bold cursor-default'
              }
            >
              {duration}
            </button>
          ))}
        </div>
      </InfoCard>
    </div>
  )
}