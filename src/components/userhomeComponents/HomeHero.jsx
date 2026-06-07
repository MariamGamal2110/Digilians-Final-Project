import { FiHash, FiHome } from 'react-icons/fi'

export default function HomeHero({ user }) {
  return (
    <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-10 mb-7 min-h-[165px] flex items-center justify-between">
      <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute left-20 bottom-[-55px] w-36 h-36 rounded-full bg-white/5" />

      <div className="relative text-right">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
          <FiHome size={16} />
          الصفحة الرئيسية
        </div>

        <h1 className="text-white text-3xl font-extrabold mb-3">
          أهلا {user.name || 'بالطالب'}
        </h1>

        <p className="text-white/80 text-sm leading-8">
          مرحبا بك في منصة الأكاديمية العسكرية للدورات المدنية
          <br />
          مسارك وتفوقك هدفنا اليوم.
        </p>
      </div>

      <div className="relative bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-center min-w-[180px]">
        <div className="flex items-center justify-center gap-2 mb-2 text-white/80 text-sm font-bold">
          <FiHash size={15} />
          الرقم العسكري
        </div>

        <p className="text-white font-extrabold text-4xl">
          {user.militaryId}
        </p>
      </div>
    </div>
  )
}
