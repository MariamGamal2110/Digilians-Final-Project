import { useMemo, useState } from 'react'

import StudentSearchDetailsModal from '../../components/adminProfileComponents/StudentSearchDetailsModal'
import AdminProfileTopBar from '../../components/adminProfileComponents/AdminProfileTopBar'
import AdminInfoHeader from '../../components/adminProfileComponents/AdminInfoHeader'
import AdminStatsCards from '../../components/adminProfileComponents/AdminStatsCards'
import AdminActionsList from '../../components/adminProfileComponents/AdminActionsList'

export default function ProfileAdmin() {
  const [selectedStudent, setSelectedStudent] = useState(null)

  const [adminProfile] = useState({
    admin: {
      name: 'أحمد المنصور',
      role: 'القائد المسؤول',
      militaryId: '369257',
      department: 'مسؤول شؤون الطلاب',
      avatar: '/images/admin-avatar.png',
      email: 'admin@academy.com',
    },

    contacts: {
      studentEmail: 'ahmed.m@gmail.com',
      supervisorEmail: 'supervisor@academy.com',
    },

    warningOneStudents: [
      { name: 'أحمد محمد' },
      { name: 'محمد عبد الرحمن' },
      { name: 'ياسين إبراهيم' },
      { name: 'محمود علي' },
      { name: 'سيف خالد' },
      { name: 'عبد الله سعيد' },
      { name: 'مروان حسن' },
      { name: 'يوسف إبراهيم' },
      { name: 'كريم محمود' },
      { name: 'حسن سمير' },
      { name: 'إبراهيم علي' },
      { name: 'عمر خالد' },
      { name: 'زياد أحمد' },
      { name: 'مصطفى محمد' },
      { name: 'علي حسن' },
      { name: 'أحمد سمير' },
      { name: 'محمود حسن' },
      { name: 'يوسف خالد' },
    ],

    warningTwoStudents: [
      { name: 'أحمد محمد' },
      { name: 'ياسين إبراهيم' },
      { name: 'محمود علي' },
      { name: 'سيف خالد' },
      { name: 'عبد الله سعيد' },
      { name: 'مروان حسن' },
      { name: 'يوسف إبراهيم' },
      { name: 'كريم محمود' },
      { name: 'حسن سمير' },
    ],

    dismissedStudents: [
      { name: 'أحمد محمد' },
      { name: 'محمود علي' },
      { name: 'ياسين إبراهيم' },
    ],

    actions: [
      {
        id: 1,
        title: 'عدد الطلاب الواقع عليهم المخالفات',
        time: 'منذ يومين',
        reportType: 'المخالفات بجميع أنواعها',
        detailLabel: 'نوع المخالفة',
        punishmentLabel: 'العقوبة',
        students: [
          {
            name: 'أحمد محمد',
            detail: 'تأخير عن الطابور',
            punishment: 'تأخير 3 ساعات',
          },
          {
            name: 'محمد عبد الرحمن',
            detail: 'عدم الالتزام بالزي',
            punishment: 'حرمان من الإجازة',
          },
          {
            name: 'ياسين إبراهيم',
            detail: 'غياب بدون إذن',
            punishment: 'إنذار إداري',
          },
          {
            name: 'محمود علي',
            detail: 'مخالفة تعليمات السكن',
            punishment: 'خصم درجات سلوك',
          },
        ],
      },
      {
        id: 2,
        title: 'عدد الطلاب الغير مسددين للمصروفات',
        time: 'منذ 4 أيام',
        reportType: 'عدم سداد المصروفات',
        detailLabel: 'حالة السداد',
        punishmentLabel: 'ملاحظات',
        students: [
          {
            name: 'أحمد محمد',
            detail: 'لم يتم السداد',
            punishment: 'جاري إرسال المندوب',
          },
          {
            name: 'سيف خالد',
            detail: 'لم يتم السداد',
            punishment: 'تم إرسال المندوب',
          },
          {
            name: 'عبد الله سعيد',
            detail: 'لم يتم السداد',
            punishment: 'تم إرسال المندوب',
          },
          {
            name: 'مروان حسن',
            detail: 'لم يتم السداد',
            punishment: 'جاري إرسال المندوب',
          },
          {
            name: 'يوسف إبراهيم',
            detail: 'لم يتم السداد',
            punishment: 'تم إرسال المندوب',
          },
        ],
      },
      {
        id: 3,
        title: 'عدد الطلاب المتقدمين بالالتماسات',
        time: 'منذ 5 أيام',
        reportType: 'طلبات الالتماس',
        detailLabel: 'نوع الالتماس',
        punishmentLabel: 'الحالة',
        students: [
          {
            name: 'ياسين إبراهيم',
            detail: 'التماس بالخروج لأداء الامتحانات',
            punishment: 'قيد المراجعة',
          },
          {
            name: 'كريم محمود',
            detail: 'التماس بالخروج لحالة وفاة',
            punishment: 'تم الاستلام',
          },
          {
            name: 'حسن سمير',
            detail: 'التماس بالخروج لمناسبة من الدرجة الأولى',
            punishment: 'قيد المراجعة',
          },
        ],
      },
      {
        id: 4,
        title: 'عدد طلبات الراغبين في حجز الأتوبيس',
        time: 'منذ أسبوع',
        reportType: 'طلبات حجز الأتوبيس',
        detailLabel: 'خط السير',
        punishmentLabel: 'حالة الحجز',
        students: [
          {
            name: 'أحمد محمد',
            detail: 'موقف السلام',
            punishment: 'مؤكد',
          },
          {
            name: 'محمد عبد الرحمن',
            detail: 'موقف السلام',
            punishment: 'مؤكد',
          },
          {
            name: 'يوسف إبراهيم',
            detail: 'موقف عبود',
            punishment: 'قيد المراجعة',
          },
        ],
      },
      {
        id: 5,
        title: 'عدد الطلاب بالأجازات الرسمية',
        time: 'منذ 3 أيام',
        reportType: 'الرغبة في الأجازات',
        detailLabel: 'الرغبة',
        punishmentLabel: 'الحالة',
        students: [
          {
            name: 'سيف خالد',
            detail: 'يرغب في النزول',
            punishment: 'موافق عليه',
          },
          {
            name: 'مروان حسن',
            detail: 'يرغب في النزول',
            punishment: 'موافق عليه',
          },
          {
            name: 'عبد الله سعيد',
            detail: 'لا يرغب في النزول',
            punishment: 'غير موافق عليه',
          },
          {
            name: 'كريم محمود',
            detail: 'لا يرغب في النزول',
            punishment: 'موافق عليه',
          },
        ],
      },
    ],
  })

  const students = [
    {
      id: 1,
      name: 'أحمد محمد',
      militaryId: '36581',
      email: 'ahmed.m@gmail.com',
      avatar: '/images/student-avatar.png',
      duration: '4 أشهر',
      behaviorGrade: 75,
      absenceDays: 3,

      busRequests: [
        {
          title: 'الحجز لموقف السلام ',
          status: 'تم الحجز',
          date: '2026-04-15',
        },
        {
          title: 'الحجز لموقف عبود ',
          status: 'لم يتم ',
          date: '2026-03-20',
        },
      ],

      permits: [
        {
          title: 'تصريح خروج',
          status: 'تم في الموعد',
          date: '2026-04-12',
        },
        {
          title: 'تصريح خروج',
          status: 'تأخر عن الموعد',
          date: '2026-04-18',
        },
      ],

      petitions: [
        {
          title: 'التماس بالخروج لأداء الامتحانات',
          status: 'مقبول',
          date: '2026-04-10',
        },
        {
          title: 'التماس بالخروج لظرف عائلي',
          status: 'مرفوض',
          date: '2026-03-18',
        },
      ],

      holidayRequests: [
        {
          title: 'يرغب في النزول',
          status: 'موافق عليه',
          date: '2026-04-25',
        },
        {
          title: 'لا يرغب في النزول',
          status: 'تم التسجيل',
          date: '2026-03-25',
        },
      ],

      payments: [
        {
          title: 'مصروفات الدورة',
          status: 'مسدد',
          date: '2026-04-01',
        },
        {
          title: 'رسوم إضافية',
          status: 'غير مسدد',
          date: '2026-04-20',
        },
      ],

      punishments: [
        {
          title: 'تأخير عن الطابور',
          status: 'خصم درجتين من السلوك',
          date: '2026-04-05',
        },
        {
          title: 'عدم الالتزام بالزي',
          status: 'خصم 3 درجات من السلوك',
          date: '2026-04-12',
        },
      ],
    },
    {
      id: 2,
      name: 'محمد عبد الرحمن',
      militaryId: '36582',
      email: 'mohamed.r@gmail.com',
      avatar: '/images/student-avatar.png',
      duration: '9 أشهر',
      behaviorGrade: 88,
      absenceDays: 1,

      busRequests: [
        {
          title: 'موقف السلام',
          status: 'مؤكد',
          date: '2026-04-12',
        },
      ],

      permits: [
        {
          title: 'تصريح خروج',
          status: 'تم في الموعد',
          date: '2026-04-10',
        },
      ],

      petitions: [
        {
          title: 'التماس بالخروج لحالة عائلية',
          status: 'قيد المراجعة',
          date: '2026-04-18',
        },
      ],

      holidayRequests: [
        {
          title: 'لا يرغب في النزول',
          status: 'تم التسجيل',
          date: '2026-04-25',
        },
      ],

      payments: [
        {
          title: 'مصروفات الدورة',
          status: 'غير مسدد',
          date: '2026-04-01',
        },
      ],

      punishments: [
        {
          title: 'غياب بدون إذن',
          status: 'إنذار إداري',
          date: '2026-04-08',
        },
      ],
    },
    {
      id: 3,
      name: 'ياسين إبراهيم',
      militaryId: '36583',
      email: 'yassin@gmail.com',
      avatar: '/images/student-avatar.png',
      duration: 'سنة واحدة',
      behaviorGrade: 64,
      absenceDays: 6,

      busRequests: [
        {
          title: 'موقف عبود',
          status: 'قيد المراجعة',
          date: '2026-04-22',
        },
      ],

      permits: [
        {
          title: 'تصريح خروج',
          status: 'تأخر عن الموعد',
          date: '2026-04-16',
        },
        {
          title: 'تصريح خروج',
          status: 'مرفوض',
          date: '2026-04-19',
        },
      ],

      petitions: [
        {
          title: 'التماس بالخروج لأداء الامتحانات',
          status: 'قيد المراجعة',
          date: '2026-04-20',
        },
      ],

      holidayRequests: [
        {
          title: 'يرغب في النزول',
          status: 'موافق عليه',
          date: '2026-04-25',
        },
      ],

      payments: [
        {
          title: 'مصروفات الدورة',
          status: 'مسدد',
          date: '2026-04-01',
        },
      ],

      punishments: [],
    },
  ]

  const statsCards = useMemo(() => {
    const warningOneCount = adminProfile.warningOneStudents.length
    const warningTwoCount = adminProfile.warningTwoStudents.length
    const dismissedCount = adminProfile.dismissedStudents.length

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
  }, [adminProfile])

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AdminProfileTopBar
          admin={adminProfile.admin}
          students={students}
          onSelectStudent={setSelectedStudent}
        />

        <div className="p-8">
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