export default function AdminSupervisorCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-6">
      <h2 className="text-[#1f220f] font-bold mb-4">
        المسؤول المباشر
      </h2>

      <div className="flex items-center gap-4">
        <img
          src="/images/student-avatar.png"
          alt="صورة المسؤول"
          className="w-14 h-14 rounded-lg object-cover border border-[#c8cdb8]"
        />

        <div>
          <p className="text-[#1f220f] font-bold">
            أحمد المنصور
          </p>

          <p className="text-[#555d30] text-sm">
            المسؤول العام
          </p>
        </div>
      </div>
    </div>
  )
}