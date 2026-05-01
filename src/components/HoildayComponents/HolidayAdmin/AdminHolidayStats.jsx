import React from 'react'

export default function AdminHolidayStats({ stats, selectedStat, onCardClick }) {
  const cardTypes = [
    { id: 'total', label: 'إجمالي الطلبات', value: stats.total, icon: '📄' },
    { id: 'approved', label: 'طلبات معتمدة', value: stats.approved, icon: '✅' },
    { id: 'pending', label: 'طلبات قيد الانتظار', value: stats.pending, icon: '⏳' },
    { id: 'rejected', label: 'طلبات مرفوضة', value: stats.rejected, icon: '✖️' }
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {cardTypes.map((card) => (
        <div 
          key={card.id} 
          onClick={() => onCardClick(card.id)}
          className={`rounded-xl p-4 shadow-sm border-2 flex items-center gap-4 cursor-pointer transition-all duration-200 ${
            selectedStat === card.id 
              ? 'border-accent bg-accent/5' 
              : 'border-gray-100 bg-white hover:border-accent/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
            selectedStat === card.id 
              ? 'bg-accent text-white' 
              : 'bg-accent/10 text-accent'
          }`}>
            {card.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-bold text-primary">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
