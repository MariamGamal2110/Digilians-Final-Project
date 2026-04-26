export default function InfoCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[150px]">
      <h2 className="text-[#1f220f] font-bold text-center mb-7">
        {title}
      </h2>

      {children}
    </div>
  )
}