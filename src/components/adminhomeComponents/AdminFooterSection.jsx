export default function AdminFooterSection() {
  return (
    <div className="relative overflow-hidden bg-[#f3f1e8] rounded-2xl py-12 px-6 text-center border border-[#e8e5dc]">
      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-[#555d30]/10"></div>
      <div className="absolute left-10 bottom-[-45px] w-32 h-32 rounded-full bg-[#555d30]/10"></div>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-[#555d30] mx-auto mb-4 flex items-center justify-center text-white font-extrabold text-xl">
          ⚜
        </div>

        <h2 className="text-[#1f220f] font-extrabold text-xl mb-2">
          الواجب · الشرف · الوطن
        </h2>

        <p className="text-[#555d30] text-sm font-medium">
          جميع الحقوق محفوظة للأكاديمية العسكرية © 2026
        </p>
      </div>
    </div>
  )
}