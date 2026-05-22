import { useState } from 'react'

import ProfileTopBar from '../../components/profileComponents/ProfileTopBar'
import ProfileInfo from '../../components/profileComponents/ProfileInfo'
import DurationCard from '../../components/profileComponents/DurationCard'
import GradesCard from '../../components/profileComponents/GradesCard'
import AttendanceCard from '../../components/profileComponents/AttendanceCard'
import AcademicChart from '../../components/profileComponents/AcademicChart'
import EditProfileModal from '../../components/profileComponents/EditProfileModal'

const defaultStudentProfile = {
  student: {
    name: 'أحمد محمد علي',
    email: 'student@academy.com',
    militaryId: '2024001',
  },
  specializationDuration: '9 أشهر',
  grades: {
    behavior: 85,
    history: [
      { label: 'يناير', value: 70 },
      { label: 'فبراير', value: 78 },
      { label: 'مارس', value: 82 },
      { label: 'أبريل', value: 80 },
    ],
  },
  attendance: {
    absenceDays: 3,
  },
}

export default function ProfileUser() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [studentProfile, setStudentProfile] = useState(defaultStudentProfile)
  const [searchText, setSearchText] = useState('')

  function openEditModal() {
    setShowEditModal(true)
  }

  function closeEditModal() {
    setShowEditModal(false)
  }

  function saveStudentData(newData) {
    setStudentProfile((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        name: newData.name,
        email: newData.email,
      },
    }))

    setShowEditModal(false)
  }

  const behaviorChartData = [
    ...(studentProfile.grades?.history || []),
    {
      label: 'الإجمالي',
      value: studentProfile.grades?.behavior || 0,
    },
  ]

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ProfileTopBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <ProfileInfo student={studentProfile.student} />

            <button
              type="button"
              onClick={openEditModal}
              className="bg-[#555d30] text-white rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#3f4723] transition"
            >
              تعديل بيانات
              <span>✎</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DurationCard selectedDuration={studentProfile.specializationDuration} />

            <GradesCard behaviorGrade={studentProfile.grades?.behavior || 0} />

            <AttendanceCard absenceDays={studentProfile.attendance?.absenceDays || 0} />
          </div>

          <AcademicChart chartData={behaviorChartData} />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          student={studentProfile.student}
          onClose={closeEditModal}
          onSave={saveStudentData}
        />
      )}
    </section>
  )
}