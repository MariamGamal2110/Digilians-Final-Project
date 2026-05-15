import ExcuseUserForm from "../../components/ExcuseUserComponents/ExcuseUserForm"
import ExcuseDef from "../../components/ExcuseUserComponents/ExcuseDef"
import AcademyImg from "../../components/ExcuseUserComponents/AcademyImg"

export default function ExecuseUser() {
  return (
  <>
   <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">     
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-3xl font-extrabold mb-3">الالـتـمـاسـات</h1>
        <p className=" text-sm leading-7 max-w-xl font-extrabold">
        يرجى  إكمال البيانات بدقة لضمان معالجة الطلب  مع العلم أن الالـتـمـاسـات تقدم بحد أقصى يوم السبت للبت فى النظر بها و الاستجابه السريعه .     </p>
        
        </div>    
         <div className="flex gap-6">
          <ExcuseUserForm/>
          </div>  
      <div className="w-72 flex flex-col gap-5">
          <ExcuseDef/>
          <AcademyImg/>
             {/* <BehaviorGradeCard grade={behaviorGrade} /> */}
             {/* <AcademyCard /> */}
             {/* <StudentAlertsCard /> */}
           </div>
      </section>

  </>


)}
//   return (
//     <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
//       <div className="max-w-[1300px] mx-auto">
//         <HomeHero user={mockUser} />

        // <div className="flex gap-6">
//           <ScheduleTimeline schedule={schedule} />

//           <div className="w-72 flex flex-col gap-5">
//             <BehaviorGradeCard grade={behaviorGrade} />
//             <AcademyCard />
//             <StudentAlertsCard />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }