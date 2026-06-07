import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AttendanceTrackerSection from '../../components/Statment/componentsAdmin/AttendanceTrackerSection'
import CurrentStatusCardAdmin from '../../components/Statment/componentsAdmin/CurrentStatusCardAdmin'
import MobileBottomNavAdmin from '../../components/Statment/componentsAdmin/MobileBottomNavAdmin'
import PermitDetailsCardAdmin from '../../components/Statment/componentsAdmin/PermitDetailsCardAdmin'
import SearchInputsPanel from '../../components/Statment/componentsAdmin/SearchInputsPanel'
import StatementFooterAdmin from '../../components/Statment/componentsAdmin/StatementFooterAdmin'
import WelcomeHeaderAdmin from '../../components/Statment/componentsAdmin/WelcomeHeaderAdmin'
import AttendenceAll from '../../components/Statment/componentsAdmin/AttendenceAll'
import AbsentAll from '../../components/Statment/componentsAdmin/AbsentAll'
import {
  addStudentAttendance,
  fetchAttendanceRecords,
  fetchStatementStats,
} from '../../api/statement'

const HIDDEN_ATTENDANCE_IDS_KEY = 'digilians_hidden_attendance_ids'

function getStoredHiddenIds() {
  try {
    const savedIds = localStorage.getItem(HIDDEN_ATTENDANCE_IDS_KEY)
    return savedIds ? JSON.parse(savedIds) : []
  } catch {
    return []
  }
}

function getRecordId(record) {
  return record?._id || record?.id
}

export default function StatmentAdmin() {
  const [filters, setFilters] = useState({ searchValue: '' })
  const [serverRecords, setServerRecords] = useState([])
  const [hiddenRecordIds, setHiddenRecordIds] = useState(getStoredHiddenIds)
  const [stats, setStats] = useState({
    totalExpected: 0,
    totalAttendance: 0,
    lateStudents: 0,
  })
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [error, setError] = useState('')

  const records = useMemo(() => {
    const hiddenIds = new Set(hiddenRecordIds)
    return serverRecords.filter((record) => !hiddenIds.has(getRecordId(record)))
  }, [hiddenRecordIds, serverRecords])

  const loadData = useCallback(async () => {
    try {
      setError('')
      const recordsData = await fetchAttendanceRecords('', 'admin')
      setServerRecords(recordsData)
    } catch (err) {
      setError(err.message || 'تعذر تحميل بيانات التصريح')
    }

    try {
      const statsData = await fetchStatementStats('admin')
      setStats(statsData)
    } catch (err) {
      console.warn('Could not load statement stats:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAddStudent = async (identifier) => {
    setAdding(true)
    setError('')

    try {
      await addStudentAttendance(identifier, 'admin')
      await loadData()
    } catch (err) {
      setError(err.message || 'تعذر إضافة الطالب')
    } finally {
      setAdding(false)
    }
  }

  const handleApplySearch = async ({ searchValue }) => {
    const trimmed = searchValue.trim()
    setFilters({ searchValue: trimmed })
    setSearchResults([])
    setSearchNotFound(false)
    setError('')

    if (!trimmed) {
      return
    }

    setSearching(true)
    try {
      const normalizedSearch = trimmed.toLowerCase()
      const results = records.filter((student) => {
        return [student.name, student.militaryId, student.email]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch))
      })

      setSearchResults(results)
      setSearchNotFound(results.length === 0)
    } catch (err) {
      setError(err.message || 'تعذر البحث')
    } finally {
      setSearching(false)
    }
  }

  const handleRefreshRecords = () => {
    loadData()
  }

  const hideRecordIds = (ids) => {
    const nextIds = Array.from(new Set([...hiddenRecordIds, ...ids.filter(Boolean)]))
    localStorage.setItem(HIDDEN_ATTENDANCE_IDS_KEY, JSON.stringify(nextIds))
    setHiddenRecordIds(nextIds)
  }

  const handleRecordDeleted = (recordId) => {
    hideRecordIds([recordId])
  }

  const handleRecordsCleared = (recordIds) => {
    hideRecordIds(recordIds)
  }

  return (
    <div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden">
      <main className="min-h-screen flex justify-center px-4 py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-[1300px] rounded-[28px] bg-white/55 shadow-[0_18px_50px_rgba(66,58,40,0.10)] backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-hidden">
          <SearchInputsPanel
            onApply={handleApplySearch}
            onAdd={handleAddStudent}
            adding={adding}
            searching={searching}
            searchResults={searchResults}
            searchNotFound={searchNotFound}
          />

          {error && (
            <div className="mx-auto w-2/4 mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <div className="px-1 pb-8 pt-3">
            <div className="flex justify-between gap-4">
              <WelcomeHeaderAdmin />
              <PermitDetailsCardAdmin />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <CurrentStatusCardAdmin totalExpected={stats.totalExpected} />
              <AttendenceAll totalAttendance={stats.totalAttendance} />
              <AbsentAll lateStudents={stats.lateStudents} />
            </div>

            <AttendanceTrackerSection
              filters={filters}
              records={records}
              loading={loading}
              onRefresh={handleRefreshRecords}
              onRecordDeleted={handleRecordDeleted}
              onRecordsCleared={handleRecordsCleared}
              role="admin"
            />
            <StatementFooterAdmin />
          </div>
        </div>
      </main>

      <MobileBottomNavAdmin />
    </div>
  )
}
