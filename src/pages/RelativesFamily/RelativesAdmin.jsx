import { useEffect, useMemo, useState } from 'react'

import {
  getStudentRelatives,
  searchStudentsRelatives,
} from '../../api/relatives'
import AdminRelativesTopBar from '../../components/adminRelativeComponents/AdminRelativesTopBar'
import StudentsListPanel from '../../components/adminRelativeComponents/StudentsListPanel'
import AdminRelativesTable from '../../components/adminRelativeComponents/AdminRelativesTable'
import RelativeDetailsCard from '../../components/adminRelativeComponents/RelativeDetailsCard'
import SecurityStatusCard from '../../components/adminRelativeComponents/SecurityStatusCard'
import SupervisorCard from '../../components/adminRelativeComponents/SupervisorCard'

export default function RelativesAdmin() {
  const [searchText, setSearchText] = useState('')
  const [students, setStudents] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [studentDetails, setStudentDetails] = useState(null)
  const [isSearching, setIsSearching] = useState(true)
  const [searchError, setSearchError] = useState('')
  const [isLoadingStudent, setIsLoadingStudent] = useState(false)
  const [studentError, setStudentError] = useState('')

  const deferredSearch = useMemo(() => searchText.trim(), [searchText])

  useEffect(() => {
    let isMounted = true

    const timeoutId = setTimeout(async () => {
      setIsSearching(true)
      setSearchError('')

      try {
        const results = await searchStudentsRelatives(deferredSearch)

        if (!isMounted) {
          return
        }

        setStudents(results)

        if (results.length === 0) {
          setSelectedStudentId('')
          setStudentDetails(null)
          return
        }

        setSelectedStudentId((currentId) => {
          const hasCurrent = results.some((student) => student.id === currentId)
          return hasCurrent ? currentId : results[0].id
        })
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setSearchError(loadError.message || 'فشل البحث عن الطلاب')
        setStudents([])
        setSelectedStudentId('')
        setStudentDetails(null)
      } finally {
        if (isMounted) {
          setIsSearching(false)
        }
      }
    }, 300)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [deferredSearch])

  useEffect(() => {
    if (!selectedStudentId) {
      return
    }

    let isMounted = true

    async function loadStudentDetails() {
      setIsLoadingStudent(true)
      setStudentError('')

      try {
        const payload = await getStudentRelatives(selectedStudentId)

        if (!isMounted) {
          return
        }

        setStudentDetails(payload)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setStudentError(loadError.message || 'فشل جلب سجلات الأقارب')
        setStudentDetails(null)
      } finally {
        if (isMounted) {
          setIsLoadingStudent(false)
        }
      }
    }

    loadStudentDetails()

    return () => {
      isMounted = false
    }
  }, [selectedStudentId])

  function handleSelectStudent(student) {
    setSelectedStudentId(student.id)
  }

  const selectedStudent =
    studentDetails?.student ||
    students.find((student) => student.id === selectedStudentId) ||
    null
  const relatives = studentDetails?.relatives || []
  const combinedError = searchError || studentError

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AdminRelativesTopBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="p-8">
          {selectedStudent && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <SupervisorCard student={selectedStudent} />

              <RelativeDetailsCard student={selectedStudent} />
              <SecurityStatusCard />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <StudentsListPanel
                students={students}
                selectedStudent={selectedStudent}
                onSelectStudent={handleSelectStudent}
              />
            </div>

            <div className="lg:col-span-3">
              <AdminRelativesTable
                selectedStudent={selectedStudent}
                relatives={relatives}
                isLoading={isSearching || isLoadingStudent}
                error={combinedError}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
