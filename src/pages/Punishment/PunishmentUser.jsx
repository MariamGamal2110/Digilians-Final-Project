import { FiAlertTriangle, FiShield } from 'react-icons/fi'
import UserPunishmentsAnalysis from "../../components/punishment.jsx/UserPunishmentsAnalysis";
import UserPunishmentTable from "../../components/punishment.jsx/UserPunishmentTable";

export default function PunishmentUser() {
  const mockUser = {
    name: 'أحمد محمد',
    militaryId: '12489',
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">
          {/* العنوان و توضيح دور الصفحة */}
       <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
  <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>
  <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5"></div>

  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    <div className="text-right">
      <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
        <FiShield />
        سجل السلوك والانضباط
      </div>

      <h1 className="text-white text-3xl font-extrabold mb-3">
        العقوبات والمخالفات
      </h1>

      <p className="text-white/80 text-sm leading-7 max-w-xl">
        عرض جميع المخالفات والعقوبات المطبقة عليك، مع توضيح الدرجات المخصومة وباقي درجات السلوك.
      </p>
    </div>

    <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
      <FiAlertTriangle size={36} />
    </div>
  </div>
</div>

          {/* عرض الرسوم التوضيحية لمخالفات الطالب */}
          <UserPunishmentsAnalysis studentName={mockUser.name} />

          {/* عرض جدول تفصيلي بالمخالفات */}
          <UserPunishmentTable />
        </div>
      </div>
    </section>
  )
}