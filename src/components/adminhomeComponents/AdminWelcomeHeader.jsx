import { FiHome, FiShield } from 'react-icons/fi'

export default function AdminWelcomeHeader() {
  return (
    <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-10 mb-10 min-h-[165px] flex items-center justify-between">
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>
      <div className="absolute left-20 bottom-[-55px] w-36 h-36 rounded-full bg-white/5"></div>

      <div className="relative text-right">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
          <FiHome size={16} />
          الصفحة الرئيسية للإدارة
        </div>

        <h1 className="text-white text-3xl font-extrabold mb-3">
          مرحبًا بك، سيادة القائد
        </h1>

        <p className="text-white/80 text-sm leading-8">
          نظرة عامة على حالة الأكاديمية العسكرية لهذا اليوم
          <br />
          متابعة فورية للطلاب والحضور والإجراءات الإدارية.
        </p>
      </div>

      <div className="relative bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-center min-w-[150px]">
        <div className="flex items-center justify-center gap-2 mb-2 text-white/80 text-sm font-bold">
          <FiShield size={16} />
          مركز القيادة
        </div>

        <p className="text-white font-extrabold text-2xl">

          متابعة الأكاديمية
        </p>
      </div>
    </div>
  )
}