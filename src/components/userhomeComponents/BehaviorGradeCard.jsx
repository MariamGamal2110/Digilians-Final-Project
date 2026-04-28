import { FaTrophy } from 'react-icons/fa'

export default function BehaviorGradeCard({ grade }) {
  const progress = grade

  function getEncouragementText(score) {
    if (score >= 90) {
      return 'ممتاز جدًا، استمر على هذا المستوى الرائع.'
    }

    if (score >= 75) {
      return 'أداؤك جيد، استمر في الالتزام لتحسين درجاتك.'
    }

    if (score >= 60) {
      return 'أنت في مستوى جيد، لكن تحتاج إلى مزيد من الالتزام.'
    }

    return 'تحتاج إلى تحسين سلوكك وانضباطك خلال الفترة القادمة.'
  }

  return (
    <div className="bg-white rounded-2xl p-7 min-h-[210px] shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#1f220f] font-bold text-lg flex items-center gap-2">
          <FaTrophy className="text-[#1f220f]" size={18} />
          درجات السلوك
        </h2>

        <span className="bg-[#f3f1e8] text-[#555d30] text-xs font-bold px-3 py-1 rounded-full">
          تقييم الطالب
        </span>
      </div>

      <p className="text-[#555d30] text-xs font-bold mb-2">
        الدرجة الحالية
      </p>

      <div className="flex items-end gap-1 mb-4">
        <span className="text-[#1f220f] font-extrabold text-4xl">
          {grade}
        </span>

        <span className="text-[#555d30] text-sm font-bold mb-1">
          / 100
        </span>
      </div>

      <div className="w-full bg-[#e8e5dc] rounded-full h-2.5 mb-4 overflow-hidden">
        <div
          className="bg-[#555d30] h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-[#6b6f5a] text-xs leading-7">
        {getEncouragementText(grade)}
      </p>
    </div>
  )
}