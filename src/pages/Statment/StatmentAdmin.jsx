import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AttendanceTrackerSection from '../../components/Statment/componentsAdmin/AttendanceTrackerSection'
import CurrentStatusCardAdmin from '../../components/Statment/componentsAdmin/CurrentStatusCardAdmin'
import MobileBottomNavAdmin from '../../components/Statment/componentsAdmin/MobileBottomNavAdmin'
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
  fetchApprovedExcuses,
  confirmExcuse,
  rejectExcuse,
  searchStudentsWithStatus,
} from '../../api/statement'

function getRecordId(record) {
  return record?._id || record?.id
}

export default function StatmentAdmin() {
  const [filters, setFilters] = useState({ searchValue: '' })
  const [records, setRecords] = useState([])
  const [excuses, setExcuses] = useState([])
  const [serverStats, setServerStats] = useState({ totalExpected: 0 })
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [error, setError] = useState('')

  const stats = useMemo(() => ({
    totalExpected: serverStats.totalExpected,
    // Count attendance records (duplicates are prevented by backend)
    totalAttendance: records.filter((r) => r.status !== 'التماس').length,
    lateStudents: records.filter((r) => r.status === 'متأخر').length,
  }), [records, serverStats.totalExpected])

  const loadData = useCallback(async () => {
    try {
      setError('')
      // Fetch only attendance records (not excuses)
      const recordsData = await fetchAttendanceRecords('', 'admin')
      console.log('Attendance:', recordsData)
      setRecords(recordsData)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'تعذر تحميل بيانات التصريح')
    }
    // Load excuses separately
    try {
      const excusesData = await fetchApprovedExcuses('admin')
      console.log('Excuses:', excusesData)
      setExcuses(excusesData)
    } catch (err) {
      console.warn('Could not load excuses:', err)
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

  const handleApplySearch = async ({ searchValue }) => {
    const trimmed = searchValue.trim()
    setFilters({ searchValue: trimmed })
    setSearchResults([])
    setSearchNotFound(false)
    setError('')
    if (!trimmed) return

    setSearching(true)
    try {
      // Call API to search in DATABASE (PermitStudentDirectory), not local records
      const results = await searchStudentsWithStatus(trimmed, 'admin')
      setSearchResults(results)
      setSearchNotFound(results.length === 0)
    } catch (err) {
      // Backend returns "الطالب دا مش موجود" when not found in database
      if (err.statusCode === 404 || err.message?.includes('مش موجود')) {
        setSearchNotFound(true)
        setError('')
      } else {
        setError(err.message || 'تعذر البحث')
      }
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

  // Handle excuse confirmation - removes from excuses (DB handles creating attendance record)
  const handleExcuseConfirmed = useCallback(async (excuseId) => {
    try {
      // Call API to confirm and create attendance record
      await confirmExcuse(excuseId, 'admin')
      console.log('Confirmed excuse, record created in DB')

      // Remove from excuses list 
      setExcuses((prev) => prev.filter((e) => getRecordId(e) !== excuseId))

      // Reload attendance records to get the new record
      await loadData()
    } catch (err) {
      console.error('Error confirming excuse:', err)
      // If error is 409 (already exists), just remove from list
      if (err.statusCode === 409 || err.message?.includes('موجود')) {
        setExcuses((prev) => prev.filter((e) => getRecordId(e) !== excuseId))
        await loadData()
      } else {
        setError(err.message || 'تعذر تأكيد التماس')
      }
    }
  }, [excuses])

  // Handle excuse rejection - removes from excuses without creating attendance record
  const handleExcuseRejected = useCallback(async (excuseId) => {
    if (!window.confirm('هل أنت متأكد من رفض هذا التماس؟')) {
      return
    }
    try {
      // Call API to reject and delete the excuse
      await rejectExcuse(excuseId, 'admin')
      console.log('Rejected and removed excuse')

      // Remove from excuses list 
      setExcuses((prev) => prev.filter((e) => getRecordId(e) !== excuseId))
    } catch (err) {
      console.error('Error rejecting excuse:', err)
      setError(err.message || 'تعذر رفض التماس')
    }
  }, [])

  return (



    <div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden">




      <main className="min-h-screen flex justify-center px-4 py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-[1300px] rounded-[28px] bg-white/55 shadow-[0_18px_50px_rgba(66,58,40,0.10)] backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-hidden">
          <div className="flex justify-between gap-4 bg-[#555d30] rounded-2xl p-8 mb-6 text-white ">
            <WelcomeHeaderAdmin />
          </div>



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
              excuses={excuses}
              loading={loading}
              onRecordDeleted={handleRecordDeleted}
              onClearAll={handleClearAll}
              onExcuseConfirmed={handleExcuseConfirmed}
              onExcuseRejected={handleExcuseRejected}
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
