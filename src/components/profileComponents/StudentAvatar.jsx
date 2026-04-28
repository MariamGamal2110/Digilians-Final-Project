export default function StudentAvatar({ small = false }) {
  return (
    <div
      className={
        small
          ? 'w-10 h-10 rounded-lg bg-[#dfe3d2] border border-[#c8cdb8] overflow-hidden'
          : 'w-24 h-24 rounded-xl bg-[#dfe3d2] border border-[#c8cdb8] overflow-hidden'
      }
    >
      <img
        src="/images/student-avatar.png"
        alt="صورة الطالب"
        className="w-full h-full object-cover"
      />
    </div>
  )
}