import { useEffect, useState } from 'react'
import { FiClipboard, FiEdit3, FiUserCheck, FiUsers } from 'react-icons/fi'
import client, { getToken } from '../../api/client'

export default function AdminStatsCards() {
  const [stats, setStats] = useState({
    totalStudents: '...',
    presentStudents: '...',
    pendingExcuses: '...',
    dismissedStudents: '...',
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await client.apiRequest('/profile/admin', {}, 'admin')

      if (data.success && data.profile) {
        const s = data.profile.stats || {}
        const totalStudents = s.totalStudents || 0
        const dismissedStudents = s.dismissedCount || 0
        const pendingRequests = s.pendingRequestsCount || 0
        const presentStudents = Math.max(0, totalStudents - dismissedStudents)
        const attendancePercent = totalStudents > 0
          ? Math.round((presentStudents / totalStudents) * 100)
          : 0

        setStats({
          totalStudents: totalStudents.toLocaleString('ar-EG'),
          presentStudents: presentStudents.toLocaleString('ar-EG'),
          attendancePercent,
          pendingExcuses: pendingRequests.toLocaleString('ar-EG'),
          dismissedStudents: dismissedStudents.toLocaleString('ar-EG'),
        })
      }
    } catch (err) {
      console.error('خطأ في جلب الإحصائيات:', err)
    }
  }

  const statsCards = [
    {
      title: 'العدد الإجمالي',
      value: stats.totalStudents,
      description: 'طالب بالأكاديمية',
      icon: <FiUsers size={24} />,
    },
    {
      title: 'الحاضرون',
      value: stats.presentStudents,
      description: `${stats.attendancePercent || 0}% نسبة الحضور`,
      icon: <FiUserCheck size={24} />,
    },
    {
      title: 'الالتماسات',
      value: stats.pendingExcuses,
      description: 'الالتماسات لخارج الأكاديمية العسكرية',
      icon: <FiEdit3 size={24} />,
    },
    {
      title: 'المفصولون',
      value: stats.dismissedStudents,
      description: 'تم الفصل تحت المراجعة الإدارية',
      icon: <FiClipboard size={24} />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
      {statsCards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 min-h-[155px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-full h-1 bg-[#555d30]"></div>

          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] text-[#555d30] flex items-center justify-center">
              {card.icon}
            </div>
            <span className="bg-[#f3f1e8] text-[#555d30] px-3 py-1 rounded-full text-xs font-bold">
              {card.title}
            </span>
          </div>

          <div className="text-right">
            <p className="text-[#1f220f] text-4xl font-extrabold mb-2">
              {card.value}
            </p>
            <p className="text-[#6b6f5a] text-xs font-medium leading-6">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}