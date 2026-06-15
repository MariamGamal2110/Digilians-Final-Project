export default function SupervisorCard({ student }) {
  return (
    <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-[#687147] bg-[#555d30] p-5">
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute left-14 bottom-[-48px] h-32 w-32 rounded-full bg-white/5" />

      <h2 className="relative text-white font-bold text-xl mb-6">
        الطالب المختار
      </h2>

      <div className="relative flex items-center gap-4">
        <img
          src="/images/student-avatar.png"
          alt="صورة الطالب"
          className="w-16 h-16 rounded-lg object-cover border border-[#c8cdb8]"
        />

        <div>
          <p className="text-white font-bold text-lg">
            {student.name}
          </p>

          <p className="text-sm text-white/85 mt-1">
            {student.email || student.militaryId || 'بيانات غير متوفرة'}
          </p>
        </div>
      </div>
    </div>
  )
}
