import { useMemo, useState } from 'react'

import StudentSearchDetailsModal from '../../components/adminProfileComponents/StudentSearchDetailsModal'
import AdminProfileTopBar from '../../components/adminProfileComponents/AdminProfileTopBar'
import AdminInfoHeader from '../../components/adminProfileComponents/AdminInfoHeader'
import AdminStatsCards from '../../components/adminProfileComponents/AdminStatsCards'
import AdminActionsList from '../../components/adminProfileComponents/AdminActionsList'

const mockAdminProfile = {
  admin: {
    name: 'محمد أحمد',
    role: 'قائد السرية',
    militaryId: 'ADM-1001',
    department: 'مسؤول شؤون الطلاب والمتابعة',
    avatar: '/images/admin-avatar.png',
    email: 'admin@academy.com',
  },
  contacts: {
    studentEmail: 'student@academy.com',
    supervisorEmail: 'admin@academy.com',
  },
}

const mockStudents = [
  {
    id: 1,
    _id: 1,
    name: 'أحمد محمد علي',
    militaryId: '2024001',
    email: 'ahmed@student.com',
    avatar: '/images/student-avatar.png',
    status: 'warning_one',
  },
  {
    id: 2,
    _id: 2,
    name: 'محمود خالد حسن',
    militaryId: '2024002',
    email: 'mahmoud@student.com',
    avatar: '/images/student-avatar.png',
    status: 'warning_two',
  },
  {
    id: 3,
    _id: 3,
    name: 'يوسف سامي إبراهيم',
    militaryId: '2024003',
    email: 'youssef@student.com',
    avatar: '/images/student-avatar.png',
    status: 'dismissed',
  },
  {
    id: 4,
    _id: 4,
    name: 'عمر أحمد محمود',
    militaryId: '2024004',
    email: 'omar@student.com',
    avatar: '/images/student-avatar.png',
    status: 'warning_one',
  },
]

const mockStudentDetails = [
  {
    id: 1,
    _id: 1,
    name: 'أحمد محمد علي',
    militaryId: '2024001',
    email: 'ahmed@student.com',
    avatar: '/images/student-avatar.png',
    duration: '9 أشهر',
    behaviorGrade: 85,
    absenceDays: 3,
    busRequests: [
      {
        title: 'طلب حجز أتوبيس خط القاهرة',
        status: 'مقبول',
        date: '2026-05-01',
      },
      {
        title: 'تعديل خط السير',
        status: 'قيد المراجعة',
        date: '2026-05-10',
      },
    ],
    permits: [
      {
        title: 'تصريح عودة للطالب',
        status: 'تم في الموعد',
        date: '2026-04-18',
      },
    ],
    petitions: [
      {
        title: 'التماس بخصوص درجة السلوك',
        status: 'قيد المراجعة',
        date: '2026-05-06',
      },
    ],
    holidayRequests: [
      {
        title: 'رغبة نزول في الإجازة الرسمية',
        status: 'مقبول',
        date: '2026-05-12',
      },
    ],
    payments: [
      {
        title: 'مصروفات شهر مايو',
        status: 'تم السداد',
        date: '2026-05-03',
      },
    ],
    punishments: [
      {
        title: 'تأخير عن الطابور',
        status: 'إنذار أول',
        date: '2026-04-25',
      },
    ],
  },
  {
    id: 2,
    _id: 2,
    name: 'محمود خالد حسن',
    militaryId: '2024002',
    email: 'mahmoud@student.com',
    avatar: '/images/student-avatar.png',
    duration: '8 أشهر',
    behaviorGrade: 72,
    absenceDays: 7,
    busRequests: [
      {
        title: 'طلب حجز أتوبيس خط الجيزة',
        status: 'مقبول',
        date: '2026-04-29',
      },
    ],
    permits: [
      {
        title: 'تصريح عودة متأخر',
        status: 'تأخر عن الموعد',
        date: '2026-05-04',
      },
    ],
    petitions: [
      {
        title: 'التماس غياب',
        status: 'مرفوض',
        date: '2026-05-08',
      },
    ],
    holidayRequests: [],
    payments: [
      {
        title: 'مصروفات شهر مايو',
        status: 'لم يتم السداد',
        date: '2026-05-01',
      },
    ],
    punishments: [
      {
        title: 'غياب بدون إذن',
        status: 'إنذار ثاني',
        date: '2026-05-09',
      },
    ],
  },
  {
    id: 3,
    _id: 3,
    name: 'يوسف سامي إبراهيم',
    militaryId: '2024003',
    email: 'youssef@student.com',
    avatar: '/images/student-avatar.png',
    duration: '6 أشهر',
    behaviorGrade: 55,
    absenceDays: 14,
    busRequests: [],
    permits: [],
    petitions: [
      {
        title: 'التماس إعادة نظر',
        status: 'قيد المراجعة',
        date: '2026-05-11',
      },
    ],
    holidayRequests: [],
    payments: [
      {
        title: 'مصروفات شهر أبريل',
        status: 'متأخر',
        date: '2026-04-01',
      },
    ],
    punishments: [
      {
        title: 'تكرار الغياب والمخالفات',
        status: 'فصل من الدورة',
        date: '2026-05-13',
      },
    ],
  },
  {
    id: 4,
    _id: 4,
    name: 'عمر أحمد محمود',
    militaryId: '2024004',
    email: 'omar@student.com',
    avatar: '/images/student-avatar.png',
    duration: '10 أشهر',
    behaviorGrade: 88,
    absenceDays: 2,
    busRequests: [
      {
        title: 'طلب حجز أتوبيس خط شبرا',
        status: 'مقبول',
        date: '2026-05-02',
      },
    ],
    permits: [],
    petitions: [],
    holidayRequests: [
      {
        title: 'طلب نزول إجازة',
        status: 'قيد المراجعة',
        date: '2026-05-15',
      },
    ],
    payments: [
      {
        title: 'مصروفات شهر مايو',
        status: 'تم السداد',
        date: '2026-05-05',
      },
    ],
    punishments: [],
  },
]

const mockActions = [
  {
    id: 1,
    title: 'عدد الطلاب الواقع عليهم المخالفات',
    time: 'آخر 30 يوم',
    reportType: 'المخالفات بجميع أنواعها',
    detailLabel: 'نوع المخالفة',
    punishmentLabel: 'العقوبة',
    students: [
      {
        name: 'أحمد محمد علي',
        detail: 'تأخير عن الطابور',
        punishment: 'إنذار أول',
      },
      {
        name: 'محمود خالد حسن',
        detail: 'غياب بدون إذن',
        punishment: 'إنذار ثاني',
      },
      {
        name: 'يوسف سامي إبراهيم',
        detail: 'تكرار مخالفات',
        punishment: 'فصل من الدورة',
      },
    ],
  },
  {
    id: 2,
    title: 'عدد الطلاب الغير مسددين للمصروفات',
    time: 'آخر 30 يوم',
    reportType: 'عدم سداد المصروفات',
    detailLabel: 'حالة السداد',
    punishmentLabel: 'ملاحظات',
    students: [
      {
        name: 'محمود خالد حسن',
        detail: 'لم يتم السداد',
        punishment: 'متابعة مع الإدارة المالية',
      },
      {
        name: 'يوسف سامي إبراهيم',
        detail: 'متأخر',
        punishment: 'تنبيه نهائي',
      },
    ],
  },
  {
    id: 3,
    title: 'عدد الطلاب المتقدمين بالالتماسات',
    time: 'آخر 30 يوم',
    reportType: 'طلبات الالتماس',
    detailLabel: 'نوع الالتماس',
    punishmentLabel: 'الحالة',
    students: [
      {
        name: 'أحمد محمد علي',
        detail: 'التماس درجة السلوك',
        punishment: 'قيد المراجعة',
      },
      {
        name: 'يوسف سامي إبراهيم',
        detail: 'التماس إعادة نظر',
        punishment: 'قيد المراجعة',
      },
    ],
  },
  {
    id: 4,
    title: 'عدد طلبات الراغبين في حجز الأتوبيس',
    time: 'آخر 30 يوم',
    reportType: 'طلبات حجز الأتوبيس',
    detailLabel: 'خط السير',
    punishmentLabel: 'حالة الحجز',
    students: [
      {
        name: 'أحمد محمد علي',
        detail: 'خط القاهرة',
        punishment: 'مقبول',
      },
      {
        name: 'محمود خالد حسن',
        detail: 'خط الجيزة',
        punishment: 'مقبول',
      },
      {
        name: 'عمر أحمد محمود',
        detail: 'خط شبرا',
        punishment: 'مقبول',
      },
    ],
  },
  {
    id: 5,
    title: 'عدد الطلاب بالأجازات الرسمية',
    time: 'آخر 30 يوم',
    reportType: 'الرغبة في الأجازات',
    detailLabel: 'الرغبة',
    punishmentLabel: 'الحالة',
    students: [
      {
        name: 'أحمد محمد علي',
        detail: 'رغبة نزول',
        punishment: 'مقبول',
      },
      {
        name: 'عمر أحمد محمود',
        detail: 'طلب نزول إجازة',
        punishment: 'قيد المراجعة',
      },
    ],
  },
]

export default function ProfileAdmin() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  function handleSelectStudent(student) {
    const studentId = student._id || student.id

    const fullStudentData = mockStudentDetails.find((item) => {
      return item.id === studentId || item._id === studentId
    })

    setSelectedStudent(fullStudentData || student)
  }

  const statsCards = useMemo(() => {
    const warningOneCount = mockStudents.filter((student) => {
      return student.status === 'warning_one'
    }).length

    const warningTwoCount = mockStudents.filter((student) => {
      return student.status === 'warning_two'
    }).length

    const dismissedCount = mockStudents.filter((student) => {
      return student.status === 'dismissed'
    }).length

    return [
      {
        title: 'طلاب حصلوا على إنذار واحد',
        count: warningOneCount,
        description: 'طلاب لديهم إنذار أول ويحتاجون متابعة بسيطة',
        level: 'متابعة عادية',
        percent: Math.min(warningOneCount * 25, 100),
        type: 'warning-one',
      },
      {
        title: 'طلاب حصلوا على إنذارين',
        count: warningTwoCount,
        description: 'طلاب يحتاجون متابعة عاجلة قبل الفصل من الدورة',
        level: 'متابعة عاجلة',
        percent: Math.min(warningTwoCount * 35, 100),
        type: 'warning-two',
      },
      {
        title: 'طلاب مفصولون من الدورة',
        count: dismissedCount,
        description: 'طلاب تم فصلهم بسبب تكرار المخالفات أو عدم الالتزام',
        level: 'إجراء نهائي',
        percent: Math.min(dismissedCount * 45, 100),
        type: 'dismissed',
      },
    ]
  }, [])

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AdminProfileTopBar
          students={mockStudents}
          onSelectStudent={handleSelectStudent}
        />

        <div className="p-8">
          <AdminInfoHeader
            admin={mockAdminProfile.admin}
            contacts={mockAdminProfile.contacts}
          />

          <AdminStatsCards statsCards={statsCards} />

          <AdminActionsList actions={mockActions} />
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