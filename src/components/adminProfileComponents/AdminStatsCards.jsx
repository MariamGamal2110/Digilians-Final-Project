import { FiAlertTriangle, FiBell, FiUserX } from 'react-icons/fi'

function getCardIcon(type) {
  if (type === 'warning-one') {
    return <FiBell size={26} />
  }

  if (type === 'warning-two') {
    return <FiAlertTriangle size={26} />
  }

  return <FiUserX size={26} />
}

function StatsCardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 min-h-[190px] animate-pulse">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4f1e8] rounded-bl-[70px]" />

      <div className="relative flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#f4f1e8] border border-[#ddd6c8]" />

        <div className="text-right space-y-2">
          <div className="h-5 w-40 bg-[#f1ede3] rounded" />
          <div className="h-6 w-24 bg-[#f1ede3] rounded-full" />
        </div>
      </div>

      <div className="relative flex items-end justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="h-4 w-full bg-[#f1ede3] rounded" />
          <div className="h-2 w-full bg-[#eee9dc] rounded-full" />
        </div>

        <div className="w-20 h-20 rounded-full bg-[#e7e1d5] shrink-0" />
      </div>
    </div>
  )
}

export default function AdminStatsCards({ statsCards = [], isRefreshingProfile = false }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {statsCards.map((card) => (
        <button
          key={card.title}
          type="button"
          onClick={() => card.onClick?.()}
          disabled={card.isDisabled}
          className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 min-h-[190px] hover:shadow-lg hover:-translate-y-1 transition text-right disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4f1e8] rounded-bl-[70px]" />

          <div className="relative flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#f4f1e8] border border-[#ddd6c8] flex items-center justify-center text-[#555d30] shadow-sm">
              {getCardIcon(card.type)}
            </div>

            <div className="text-right">
              <h2 className="text-[#1f220f] font-extrabold text-lg leading-7">
                {card.title}
              </h2>

              <span className="inline-block mt-2 rounded-full bg-[#f3f1e8] px-3 py-1 text-xs font-bold text-[#555d30]">
                {card.level}
              </span>
            </div>
          </div>

          <div className="relative flex items-end justify-between gap-4">
            <div className="text-right flex-1">
              <p className="text-[#6b6f5a] text-sm leading-7 mb-4">
                {card.description}
              </p>

              <div className="w-full bg-[#eee9dc] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#555d30] h-full rounded-full"
                  style={{ width: `${card.percent}%` }}
                />
              </div>
            </div>

            <div className="w-20 h-20 rounded-full bg-[#555d30] text-white flex items-center justify-center text-4xl font-extrabold shadow-md shrink-0">
              {card.isLoading ? '...' : card.count}
            </div>
          </div>

          {card.errorMessage && (
            <p className="relative mt-4 text-xs font-bold text-red-600">
              {card.errorMessage}
            </p>
          )}
        </button>
      ))}

      {isRefreshingProfile && statsCards.length === 0 && (
        <>
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </>
      )}
    </div>
  )
}
