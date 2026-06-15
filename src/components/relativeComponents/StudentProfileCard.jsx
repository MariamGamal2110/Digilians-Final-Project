export default function StudentProfileCard({ student }) {
  return (
    <div className="group relative min-h-[320px] overflow-hidden rounded-xl border border-[#687147] bg-[#555d30] p-8 flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[#c8cdb8]">
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute left-14 bottom-[-48px] h-32 w-32 rounded-full bg-white/5" />
      <img
        src="/images/student-avatar.png"
        alt="صورة الطالب"
        className="relative w-32 h-32 rounded-xl object-cover border border-[#c8cdb8] transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />

      <h2 className="relative mt-7 text-2xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
        {student?.name || 'غير متوفر'}
      </h2>

      <p className="relative mt-3 text-sm text-white/85">
        {student?.militaryId || student?.email || 'بيانات الطالب غير متاحة'}
      </p>

      <div className="relative mt-6 flex items-center gap-3">
        <span className="w-4 h-4 rounded-full bg-white/65 transition-all duration-300 group-hover:bg-white/90 group-hover:scale-110"></span>

        <span className="w-4 h-4 rounded-full bg-white/65 transition-all duration-300 delay-75 group-hover:bg-white/90 group-hover:scale-110"></span>
      </div>
    </div>
  )
}
