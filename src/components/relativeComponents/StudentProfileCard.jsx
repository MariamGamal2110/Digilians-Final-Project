export default function StudentProfileCard({ student }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-8 min-h-[320px] flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[#c8cdb8]">
      <img
        src="/images/student-avatar.png"
        alt="صورة الطالب"
        className="w-32 h-32 rounded-xl object-cover border border-[#c8cdb8] transition-transform duration-300 ease-out group-hover:scale-[1.03]"
      />

      <h2 className="text-[#1f220f] text-2xl font-bold mt-7 transition-transform duration-300 group-hover:-translate-y-0.5">
        {student?.name || 'غير متوفر'}
      </h2>

      <p className="mt-3 text-sm text-[#555d30]">
        {student?.militaryId || student?.email || 'بيانات الطالب غير متاحة'}
      </p>

      <div className="flex items-center gap-3 mt-6">
        <span className="w-4 h-4 rounded-full bg-[#d7ddc7] transition-all duration-300 group-hover:bg-[#bfc8aa] group-hover:scale-110"></span>

        <span className="w-4 h-4 rounded-full bg-[#d7ddc7] transition-all duration-300 delay-75 group-hover:bg-[#bfc8aa] group-hover:scale-110"></span>
      </div>
    </div>
  )
}
