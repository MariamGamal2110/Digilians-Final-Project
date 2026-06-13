import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AttendanceTrackerSection from '../../components/Statment/componentsAdmin/AttendanceTrackerSection'
import CurrentStatusCardAdmin from '../../components/Statment/componentsAdmin/CurrentStatusCardAdmin'
import MobileBottomNavAdmin from '../../components/Statment/componentsAdmin/MobileBottomNavAdmin'
import PermitDetailsCardAdmin from '../../components/Statment/componentsAdmin/PermitDetailsCardAdmin'
import SearchInputsPanel from '../../components/Statment/componentsAdmin/SearchInputsPanel'
import WelcomeHeaderAdmin from '../../components/Statment/componentsAdmin/WelcomeHeaderAdmin'
import AttendenceAll from '../../components/Statment/componentsAdmin/AttendenceAll'
import AbsentAll from '../../components/Statment/componentsAdmin/AbsentAll'
import {
  addStudentAttendance,
  fetchAttendanceRecords,
  fetchStatementStats,
  deleteAttendanceRecord,
  clearAllAttendanceRecords,
} from '../../api/statement'

function getRecordId(record) {
  return record?._id || record?.id
}

export default function StatmentAdmin() {
  const [filters, setFilters] = useState({ searchValue: '' })
  const [records, setRecords] = useState([])
  const [serverStats, setServerStats] = useState({ totalExpected: 0 })
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [error, setError] = useState('')

  const stats = useMemo(() => ({
    totalExpected: serverStats.totalExpected,
    totalAttendance: records.length,
    lateStudents: records.filter((r) => r.status === 'late').length,
  }), [records, serverStats.totalExpected])

  const loadData = useCallback(async () => {
    try {
      setError('')
      const recordsData = await fetchAttendanceRecords('', 'admin')
      setRecords(recordsData)
    } catch (err) {
      setError(err.message || 'تعذر تحميل بيانات التصريح')
    }
    try {
      const statsData = await fetchStatementStats('admin')
      setServerStats({ totalExpected: statsData.totalExpected })
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
      const newRecord = await addStudentAttendance(identifier, 'admin')
      if (newRecord) {
        setRecords((prev) => [newRecord, ...prev])
      } else {
        await loadData()
      }
    } catch (err) {
      if (err.statusCode === 409 || err.message?.includes('موجود')) {
        try {
          const allRecords = await fetchAttendanceRecords('', 'admin')
          const trimmed = identifier.trim().toLowerCase()
          const existingRecord = allRecords.find((r) =>
            [r.name, r.militaryId, r.email]
              .filter(Boolean)
              .some((v) => String(v).toLowerCase().includes(trimmed))
          )
          if (existingRecord) {
            const alreadyInTable = records.some(
              (r) => getRecordId(r) === getRecordId(existingRecord)
            )
            if (!alreadyInTable) {
              setRecords((prev) => [existingRecord, ...prev])
            } else {
              setError('الطالب موجود بالفعل في الجدول')
            }
          }
        } catch {
          setError(err.message || 'تعذر إضافة الطالب')
        }
      } else {
        setError(err.message || 'تعذر إضافة الطالب')
      }
    } finally {
      setAdding(false)
    }
  }

  const handleApplySearch = ({ searchValue }) => {
    const trimmed = searchValue.trim()
    setFilters({ searchValue: trimmed })
    setSearchResults([])
    setSearchNotFound(false)
    setError('')
    if (!trimmed) return

    setSearching(true)
    try {
      const normalizedSearch = trimmed.toLowerCase()
      const results = records.filter((student) =>
        [student.name, student.militaryId, student.email]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedSearch))
      )
      setSearchResults(results)
      setSearchNotFound(results.length === 0)
    } catch (err) {
      setError(err.message || 'تعذر البحث')
    } finally {
      setSearching(false)
    }
  }

  const handleRecordDeleted = async (recordId) => {
    try {
      await deleteAttendanceRecord(recordId, 'admin')
      setRecords((prev) => prev.filter((r) => getRecordId(r) !== recordId))
    } catch (err) {
      setError(err.message || 'تعذر حذف السجل')
    }
  }

  const handleClearAll = async () => {
    try {
      await clearAllAttendanceRecords('admin')
      setRecords([])
    } catch (err) {
      setError(err.message || 'تعذر مسح السجلات')
    }
  }

  // تحديث الدرجة في الـ records بعد الحفظ في السيرفر
  const handleDeductionChanged = useCallback((recordId, newDeduction) => {
    setRecords((prev) =>
      prev.map((r) =>
        getRecordId(r) === recordId ? { ...r, deduction: newDeduction } : r
      )
    )
  }, [])

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

            {/* Filter - دائماً ظاهر فوق الجدول */}


            {/* Table - دائماً ظاهر */}
            <AttendanceTrackerSection
              filters={filters}
              records={records}
              loading={loading}
              onRecordDeleted={handleRecordDeleted}
              onClearAll={handleClearAll}
              onDeductionChanged={handleDeductionChanged}
              role="admin"
            />
          </div>
        </div>
      </main>

      <MobileBottomNavAdmin />
    </div>
  )
}
