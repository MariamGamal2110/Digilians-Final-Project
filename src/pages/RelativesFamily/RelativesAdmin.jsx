import { useEffect, useMemo, useState } from 'react'

import {
  getStudentRelatives,
} from '../../api/relatives'
import { searchProfileStudents } from '../../api/profile'
import AdminRelativesTopBar from '../../components/adminRelativeComponents/AdminRelativesTopBar'
import StudentsListPanel from '../../components/adminRelativeComponents/StudentsListPanel'
import AdminRelativesTable from '../../components/adminRelativeComponents/AdminRelativesTable'
import RelativeDetailsCard from '../../components/adminRelativeComponents/RelativeDetailsCard'
import RelativeDetailsModal from '../../components/adminRelativeComponents/RelativeDetailsModal'
import SecurityStatusCard from '../../components/adminRelativeComponents/SecurityStatusCard'
import SupervisorCard from '../../components/adminRelativeComponents/SupervisorCard'

function normalizeArabicSearchText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
}

function toStudentOption(student) {
  return {
    ...student,
    relativesCount: student.relativesCount ?? 0,
  }
}

export default function RelativesAdmin() {
  const [searchText, setSearchText] = useState('')
  const [allStudents, setAllStudents] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [studentDetails, setStudentDetails] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasLoadedStudents, setHasLoadedStudents] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [isLoadingStudent, setIsLoadingStudent] = useState(false)
  const [studentError, setStudentError] = useState('')
  const [selectedRelative, setSelectedRelative] = useState(null)

  const deferredSearch = useMemo(() => searchText.trim(), [searchText])
  const normalizedSearch = useMemo(
    () => normalizeArabicSearchText(deferredSearch),
    [deferredSearch]
  )

  useEffect(() => {
    let isMounted = true
    
    async function loadStudentsDirectory() {
      setIsSearching(true)
      setSearchError('')

      try {
        const results = await searchProfileStudents('')

        if (!isMounted) {
          return
        }

        setAllStudents(results.map(toStudentOption))
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setSearchError(loadError.message || 'فشل البحث عن الطلاب')
        setAllStudents([])
        setSelectedStudentId('')
        setStudentDetails(null)
        setSelectedRelative(null)
      } finally {
        if (isMounted) {
          setIsSearching(false)
          setHasLoadedStudents(true)
        }
      }
    }

    loadStudentsDirectory()

    return () => {
      isMounted = false
    }
  }, [])

  const students = useMemo(() => {
    if (!normalizedSearch) {
      return allStudents
    }

    return allStudents.filter((student) => {
      const normalizedName = normalizeArabicSearchText(student.name)
      const normalizedMilitaryId = normalizeArabicSearchText(student.militaryId)
      const normalizedEmail = normalizeArabicSearchText(student.email)

      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedMilitaryId.includes(normalizedSearch) ||
        normalizedEmail.includes(normalizedSearch)
      )
    })
  }, [allStudents, normalizedSearch])

  useEffect(() => {
    if (searchError) {
      return
    }

    if (students.length === 0) {
      setSelectedStudentId('')
      setStudentDetails(null)
      setSelectedRelative(null)
      return
    }

    setSelectedStudentId((currentId) => {
      const hasCurrent = students.some((student) => student.id === currentId)
      return hasCurrent ? currentId : students[0].id
    })
  }, [students, searchError])

  useEffect(() => {
    if (!selectedStudentId) {
      setSelectedRelative(null)
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
        setSelectedRelative(null)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setStudentError(loadError.message || 'فشل جلب سجلات الأقارب')
        setStudentDetails(null)
        setSelectedRelative(null)
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
    setSelectedRelative(null)
  }

  function handleOpenRelativeDetails(relative) {
    setSelectedRelative(relative)
  }

  function handleCloseRelativeDetails() {
    setSelectedRelative(null)
  }

  const selectedStudent =
    studentDetails?.student ||
    students.find((student) => student.id === selectedStudentId) ||
    null
  const relatives = studentDetails?.relatives || []

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
                isLoading={isSearching}
                error={searchError}
                hasLoaded={hasLoadedStudents}
              />
            </div>

            <div className="lg:col-span-3">
              <AdminRelativesTable
                selectedStudent={selectedStudent}
                relatives={relatives}
                onSelectRelative={handleOpenRelativeDetails}
                isLoading={isLoadingStudent}
                error={studentError}
              />
            </div>
          </div>
        </div>
      </div>

      <RelativeDetailsModal
        relative={selectedRelative}
        student={selectedStudent}
        onClose={handleCloseRelativeDetails}
      />
    </section>
  )
}
