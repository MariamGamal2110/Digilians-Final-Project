import { useEffect, useMemo, useState } from 'react'

import StudentSearchDetailsModal from '../../components/adminProfileComponents/StudentSearchDetailsModal'
import AdminProfileTopBar from '../../components/adminProfileComponents/AdminProfileTopBar'
import AdminInfoHeader from '../../components/adminProfileComponents/AdminInfoHeader'
import AdminStatsCards from '../../components/adminProfileComponents/AdminStatsCards'
import AdminActionsList from '../../components/adminProfileComponents/AdminActionsList'
import { apiRequest } from '../../api/client'

const defaultActions = [
  {
    id: 1,
    title: 'عدد الطلاب الواقع عليهم المخالفات',
    time: 'قيد الربط',
    reportType: 'المخالفات بجميع أنواعها',
    detailLabel: 'نوع المخالفة',
    punishmentLabel: 'العقوبة',
    students: [],
  },
  {
    id: 2,
    title: 'عدد الطلاب الغير مسددين للمصروفات',
    time: 'قيد الربط',
    reportType: 'عدم سداد المصروفات',
    detailLabel: 'حالة السداد',
    punishmentLabel: 'ملاحظات',
    students: [],
  },
  {
    id: 3,
    title: 'عدد الطلاب المتقدمين بالالتماسات',
    time: 'قيد الربط',
    reportType: 'طلبات الالتماس',
    detailLabel: 'نوع الالتماس',
    punishmentLabel: 'الحالة',
    students: [],
  },
  {
    id: 4,
    title: 'عدد طلبات الراغبين في حجز الأتوبيس',
    time: 'قيد الربط',
    reportType: 'طلبات حجز الأتوبيس',
    detailLabel: 'خط السير',
    punishmentLabel: 'حالة الحجز',
    students: [],
  },
  {
    id: 5,
    title: 'عدد الطلاب بالأجازات الرسمية',
    time: 'قيد الربط',
    reportType: 'الرغبة في الأجازات',
    detailLabel: 'الرغبة',
    punishmentLabel: 'الحالة',
    students: [],
  },
]

function mapCommanderProfile(data) {
  return {
    admin: {
      name: data.commander?.name || 'القائد',
      role: data.responsibility || 'القائد المسؤول',
      militaryId: data.commander?.militaryId || 'غير محدد',
      department: data.department || data.responsibility || 'مسؤول شؤون الطلاب',
      avatar: data.commander?.image?.includes('ui-avatars.com')
        ? '/images/admin-avatar.png'
        : data.commander?.image || '/images/admin-avatar.png', email: data.commander?.email || '',
    },
    contacts: {
      studentEmail: '',
      supervisorEmail: data.commander?.email || '',
    },
    actions: defaultActions,
  }
}

function mapStudentForSearch(student) {
  return {
    id: student._id,
    _id: student._id,
    name: student.name,
    militaryId: student.militaryId || '',
    email: student.email || '',
    avatar: student.image || '/images/student-avatar.png',
  }
}

function mapStudentSummary(data) {
  return {
    id: data.student?._id,
    _id: data.student?._id,
    name: data.student?.name || 'طالب',
    militaryId: data.student?.militaryId || '',
    email: data.student?.email || '',
    avatar: data.student?.image || '/images/student-avatar.png',
    duration: data.specializationDuration || 'غير محدد',
    behaviorGrade: data.summary?.behaviorGrade || data.grades?.behavior || 0,
    absenceDays: data.summary?.absenceDays || data.attendance?.absenceDays || 0,
    busRequests: [],
    permits: [],
    petitions: [],
    holidayRequests: [],
    payments: [],
    punishments: [],
  }
}

export default function ProfileAdmin() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [adminProfile, setAdminProfile] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [studentLoading, setStudentLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchAdminData() {
      try {
        setLoading(true)
        setError('')

        const commanderData = await apiRequest('/profile/commander/me')
        const studentsData = await apiRequest('/profile/commander/students')

        setAdminProfile(mapCommanderProfile(commanderData))
        setStudents((studentsData.students || []).map(mapStudentForSearch))
      } catch (err) {
        setError(err.message || 'حدث خطأ أثناء تحميل بيانات القائد')
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  async function handleSelectStudent(student) {
    try {
      setStudentLoading(true)
      setError('')

      const studentId = student._id || student.id
      const data = await apiRequest(`/profile/commander/students/${studentId}/summary`)

      setSelectedStudent(mapStudentSummary(data))
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء تحميل بيانات الطالب')
    } finally {
      setStudentLoading(false)
    }
  }

  const statsCards = useMemo(() => {
    const warningOneCount = students.filter((student) => student.status === 'warning_one').length
    const warningTwoCount = students.filter((student) => student.status === 'warning_two').length
    const dismissedCount = students.filter((student) => student.status === 'dismissed').length

    return [
      {
        title: 'طلاب حصلوا على إنذار واحد',
        count: warningOneCount,
        description: 'طلاب لديهم إنذار أول ويحتاجون متابعة بسيطة',
        level: 'متابعة عادية',
        percent: Math.min(warningOneCount * 3, 100),
        type: 'warning-one',
      },
      {
        title: 'طلاب حصلوا على إنذارين',
        count: warningTwoCount,
        description: 'طلاب يحتاجون متابعة عاجلة قبل الفصل من الدورة',
        level: 'متابعة عاجلة',
        percent: Math.min(warningTwoCount * 4, 100),
        type: 'warning-two',
      },
      {
        title: 'طلاب مفصولون من الدورة',
        count: dismissedCount,
        description: 'طلاب تم فصلهم بسبب تكرار المخالفات أو عدم الالتزام',
        level: 'إجراء نهائي',
        percent: Math.min(dismissedCount * 5, 100),
        type: 'dismissed',
      },
    ]
  }, [students])

  if (loading) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6 text-[#555d30] font-bold">
          جاري تحميل بيانات القائد...
        </div>
      </section>
    )
  }

  if (error && !adminProfile) {
    return (
      <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm px-8 py-6 text-red-700 font-bold">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AdminProfileTopBar
          admin={adminProfile.admin}
          students={students}
          onSelectStudent={handleSelectStudent}
        />

        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {studentLoading && (
            <div className="mb-6 bg-[#f7f5f0] border border-gray-200 text-[#555d30] text-sm font-bold rounded-xl px-4 py-3">
              جاري تحميل ملخص الطالب...
            </div>
          )}

          <AdminInfoHeader
            admin={adminProfile.admin}
            contacts={adminProfile.contacts}
          />

          <AdminStatsCards statsCards={statsCards} />

          <AdminActionsList actions={adminProfile.actions} />
        </div>
      </div>

      {selectedStudent && (
        <StudentSearchDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </section>
  )
}