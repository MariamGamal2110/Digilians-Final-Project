import React, { useCallback, useEffect, useState } from 'react'
import CurrentStatusCard from '../../components/Statment/componentsUser/CurrentStatusCard'
import MobileBottomNav from '../../components/Statment/componentsUser/MobileBottomNav'
import MobileTopBar from '../../components/Statment/componentsUser/MobileTopBar'
import PermitDetailsCard from '../../components/Statment/componentsUser/PermitDetailsCard'
import PermitHistorySection from '../../components/Statment/componentsUser/PermitHistorySection'
import StatementFooter from '../../components/Statment/componentsUser/StatementFooter'
import WelcomeHeader from '../../components/Statment/componentsUser/WelcomeHeader'
import { fetchMyStatement } from '../../api/statement'
import { getSavedUser, getToken, saveAuthData } from '../../api/client'

export default function StatmentUser() {
  const [statementData, setStatementData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadStatement = useCallback(async () => {
    if (!getToken()) {
      setLoading(false)
      return
    }

    try {
      setError('')
      const data = await fetchMyStatement()
      setStatementData(data)

      if (data?.student) {
        const savedUser = getSavedUser()
        if (savedUser) {
          saveAuthData({
            token: getToken(),
            user: {
              ...savedUser,
              name: data.student.name,
              militaryId: data.student.militaryId,
            },
          })
        }
      }
    } catch (err) {
      setError(err.message || 'تعذر تحميل بيانات التصريح')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStatement()
  }, [loadStatement])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadStatement()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [loadStatement])

  return (
    <div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden">
      <MobileTopBar student={statementData?.student} loading={loading} />

      <main className="min-h-screen flex justify-center px-4 py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-[1300px] rounded-[28px] border border-outline-variant/35 bg-white/55 shadow-[0_18px_50px_rgba(66,58,40,0.10)] backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-hidden">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <WelcomeHeader
            student={statementData?.student}
            loading={loading}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-12">
            <PermitDetailsCard
              latestAttendance={statementData?.latestAttendance}
              student={statementData?.student}
              loading={loading}
            />
            <CurrentStatusCard
              latestAttendance={statementData?.latestAttendance}
              loading={loading}
            />
          </div>

          <PermitHistorySection
            history={statementData?.history || []}
            loading={loading}
          />
          <StatementFooter />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}
