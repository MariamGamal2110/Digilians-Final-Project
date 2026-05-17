import { useEffect, useState } from 'react'

import ProfileTopBar from '../../components/profileComponents/ProfileTopBar'
import ProfileInfo from '../../components/profileComponents/ProfileInfo'
import DurationCard from '../../components/profileComponents/DurationCard'
import GradesCard from '../../components/profileComponents/GradesCard'
import AttendanceCard from '../../components/profileComponents/AttendanceCard'
import AcademicChart from '../../components/profileComponents/AcademicChart'
import EditProfileModal from '../../components/profileComponents/EditProfileModal'
import { apiRequest } from '../../api/client'

export default function ProfileUser() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [studentProfile, setStudentProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStudentProfile() {
      try {
        setLoading(true)
        setError('')

        const data = await apiRequest('/profile/student/me')

        setStudentProfile(data)
      } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل بيانات الطالب')
      } finally {
        setLoading(false)
      }
    }

    fetchStudentProfile()
  }, [])

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

  if (loading) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6 text-[#555d30] font-bold">
          جاري تحميل بيانات الطالب...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm px-8 py-6 text-red-700 font-bold">
          {error}
        </div>
      </section>
    )
  }

  if (!studentProfile) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6 text-gray-700 font-bold">
          لا توجد بيانات للطالب
        </div>
      </section>
    )
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