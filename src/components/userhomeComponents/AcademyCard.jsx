export default function AcademyCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[135px] shadow-sm border border-gray-200 bg-[#555d30]">
      <img
        src="/images/academy-banner.png.png"
        alt="الأكاديمية العسكرية"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/35 to-black/65"></div>

      <div className="relative z-10 min-h-[135px] flex flex-col items-center justify-center text-center px-5 py-6">
        <div className="text-white font-extrabold text-lg mb-2">
          الأكاديمية العسكرية
        </div>

        <div className="text-white/90 text-sm leading-6">
          تساعدك دائمًا للوصول لأفضل مستوى
        </div>
      </div>
    </div>
  )
}