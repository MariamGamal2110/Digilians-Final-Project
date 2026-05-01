import StudentAvatar from './StudentAvatar'

export default function ProfileInfo({ student }) {
  return (
    <div className="flex items-center gap-5">
      <StudentAvatar />

      <div className="text-right">
        <h1 className="text-[#1f220f] text-3xl font-bold mb-4">
          {student.name}
        </h1>

        <p className="text-[#1f220f] text-sm font-bold mb-2">
          رقم عسكري : {student.militaryId}
        </p>

        <p className="text-[#1f220f] text-sm">
          {student.email}
        </p>
      </div>
    </div>
  )
}