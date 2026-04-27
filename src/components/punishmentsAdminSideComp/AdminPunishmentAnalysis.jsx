import React from 'react'
import { FaMale,FaFemale } from 'react-icons/fa'
import { FiAlertTriangle,FiMinusCircle,FiCheckCircle ,FiEdit2 ,FiClock, FiShield, FiSun,FiPlus } from 'react-icons/fi'
function PunishmentIcon({ type }) {
  let icon = <FiClock size={18} />

  if (type === 'uniform') {
    icon = <FiShield size={18} />
  }

  if (type === 'sleep') {
    icon = <FiSun size={18} />
  }

  return (
    <div className="w-9 h-9 rounded-lg bg-[#f3f1e8] border border-[#e5dfd0] flex items-center justify-center text-[#1f220f]">
      {icon}
    </div>
  )
}

export default function AdminPunishmentTable() {
    const punishmentRecords = [
    { studentName : "محمد حسن على " ,
      milateryNum:22589 ,
      gender:"male",
       violation:'خصم درجات ',
        punishment:"إنذار كتابي ",
        type:"",
        degree:"2" },

    { studentName : "جهاد محمد  الشبراوى ",
       milateryNum:22589 ,
       gender:"female",
       violation: 'الاستيقاظ بعد نوبة نوم', 
       punishment: 'حرمان من الإجازه يوم الاربعاء' , 
       type:"sleep",
       degree:5 },

    { studentName : "احمد سمير ابراهيم ",
       milateryNum:22789 ,
       gender:"male",
        violation:'خصم درجات ',
         punishment:"إنذار كتابي ",
         degree:"2" ,
         type:'sleep' },

    { studentName : "محمد حسن على ",
       milateryNum:22589 ,  
       gender:"male",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },

    { studentName : "محمد عزالدين اكرم ",
       milateryNum:22589 ,  
       gender:"male",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },

    { studentName : "محمد اسلام محسن ",
       milateryNum:22589 ,  
       gender:"male",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },

    { studentName : "محمد كريم ابوالعينين ",
       milateryNum:22589 ,  
       gender:"male",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },

    { studentName : "عمر ابراهيم فرغلى ",
       milateryNum:22589 ,  
       gender:"male",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },

    { studentName : "أسماء حسين احمد ",
       milateryNum:22589 ,  
       gender:"female",
       violation: 'عدم الإلتزام بهيئة الزى',
        punishment: 'تأخير ساعتين عن نزول الإجازات' , 
        type:"uniform", 
        degree:5 },
  ]
const maleCount = punishmentRecords.filter(p => p.gender === "male").length;
const femaleCount = punishmentRecords.filter(p => p.gender === "female").length;

console.log(maleCount, femaleCount);    const analysisCards = [
      {
        title: 'إجمالي عدد المخالفات',
        value: punishmentRecords.length,
        description: 'إجمالي المخالفات المسجلة',
        icon: <FiAlertTriangle size={22} />,
      },
      {
        title: ' عدد الطلاب  المخالفين',
        value: maleCount,
        description: 'إجمالي  عدد الذكور',
        icon: <FaMale size={22} />,
      },
      {
        title:' عدد الطالبات المخالفات ',
        value: femaleCount,
        description: 'إجمالي عدد الإناث',
        icon: <FaFemale size={22} />,
      },
    ]  

  return (
<>
    <div className="mb-6">
      <div className="mb-6 text-right">
        <h2 className="text-[#1f220f] text-3xl font-extrabold">
          بيان مخالفات الطلاب 
        </h2>
        <p className="text-[#6b6f5a] text-sm mb-2">
          ملخص المخالفات والسلوك
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {analysisCards.map((card) => (
          <div
            key={card.title}
            className="group bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#c8cdb8]"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#f3f1e8] border border-[#e5dfd0] flex items-center justify-center text-[#1f220f] transition-all duration-300 group-hover:bg-[#555d30] group-hover:text-white">
                {card.icon}
              </div>

              <div className="text-right">
                <p className="text-[#6b6f5a] text-sm mb-2">
                  {card.title}
                </p>

                <p className="text-[#1f220f] text-4xl font-extrabold">
                  {card.value}
                </p>
              </div>
            </div>

            <div className="bg-[#faf9f4] rounded-xl px-4 py-3 text-right">
              <p className="text-[#6b6f5a] text-sm">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
