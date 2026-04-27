import HomeHero from '../../components/userhomeComponents/HomeHero'
import ScheduleTimeline from '../../components/userhomeComponents/ScheduleTimeline'
import BehaviorGradeCard from '../../components/userhomeComponents/BehaviorGradeCard'
import AcademyCard from '../../components/userhomeComponents/AcademyCard'
import StudentAlertsCard from '../../components/userhomeComponents/StudentAlertsCard'

export default function HomeUser() {
  const mockUser = {
    name: 'أحمد محمد',
    militaryId: '12489',
  }

  const behaviorGrade = 75

  const schedule = [
    { time: '4:45 صباحًا', activity: 'نوبة صحيان' },
    { time: '5:50 صباحًا', activity: 'طابور اللياقة' },
    { time: '7:45 - 8:00 صباحًا', activity: 'وجبة الإفطار' },
    { time: '8:15 صباحًا', activity: 'طابور التفتيش' },
    { time: '9:00 صباحًا', activity: 'بداية المحاضرات' },
  ]

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-[1300px] mx-auto">
        <HomeHero user={mockUser} />

        <div className="flex gap-6">
          <ScheduleTimeline schedule={schedule} />

          <div className="w-72 flex flex-col gap-5">
            <BehaviorGradeCard grade={behaviorGrade} />
            <AcademyCard />
            <StudentAlertsCard />
          </div>
        </div>
      </div>
    </section>
  )
}