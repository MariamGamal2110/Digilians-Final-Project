import InfoCard from './InfoCard'

export default function GradesCard({ behaviorGrade }) {
  return (
    <div className="rounded-xl transition-transform duration-300 ease-out hover:-translate-y-1">
      <InfoCard title="درجات السلوك">
        <div className="flex items-center justify-center gap-6 py-3.5">
          <div className="text-center">
            <p className="text-[#555d30] text-sm mb-2">
              درجات الطالب
            </p>

            <p className="text-[#1f220f] font-bold text-4xl">
              {behaviorGrade}
            </p>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}