import { useState } from 'react'

import ProfileTopBar from '../../components/profileComponents/ProfileTopBar'
import ProfileInfo from '../../components/profileComponents/ProfileInfo'
import DurationCard from '../../components/profileComponents/DurationCard'
import GradesCard from '../../components/profileComponents/GradesCard'
import AttendanceCard from '../../components/profileComponents/AttendanceCard'
import AcademicChart from '../../components/profileComponents/AcademicChart'
import EditProfileModal from '../../components/profileComponents/EditProfileModal'

export default function ProfileUser() {
  const [showEditModal, setShowEditModal] = useState(false)

  const [studentProfile, setStudentProfile] = useState({
    student: {
      name: 'أحمد محمد',
      militaryId: '36581',
      email: 'ahmed.m@gmail.com',
    },

    specializationDuration: '4 أشهر',

    attendance: {
      absenceDays: 3,
    },

    grades: {
      behavior: 75,
      history: [
        { label: 'الشهر الأول', value: 100 },
        { label: 'الشهر الثاني', value: 93 },
        { label: 'الشهر الثالث', value: 85 },
        { label: 'الشهر الرابع', value: 80 },
      ],
    },
  })

  const behaviorChartData = [
    ...studentProfile.grades.history,
    {
      label: 'الإجمالي',
      value: studentProfile.grades.behavior,
    },
  ]

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

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <ProfileTopBar />

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <ProfileInfo student={studentProfile.student} />

            <button
              onClick={openEditModal}
              className="bg-[#555d30] text-white rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#3f4723] transition"
            >
              تعديل بيانات
              <span>✎</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DurationCard selectedDuration={studentProfile.specializationDuration} />

            <GradesCard behaviorGrade={studentProfile.grades.behavior} />

            <AttendanceCard absenceDays={studentProfile.attendance.absenceDays} />
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