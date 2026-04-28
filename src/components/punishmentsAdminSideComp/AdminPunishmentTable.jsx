import React from 'react'
import { FiEdit2 ,FiClock, FiShield, FiSun,FiPlus } from 'react-icons/fi'
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
  return (
    <>
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="bg-[#f3f1e8] text-[#1f220f]">
              <th className="px-5 py-3 font-bold w-[70px]"></th>
              <th className="px-5 py-3 font-bold">اسم الطالب </th>
              <th className="px-5 py-3 font-bold">الرقم العسكري</th>
              <th className="px-5 py-3 font-bold">المخالفة</th>
              <th className="px-5 py-3 font-bold">العقوبه</th>
              <th className="px-5 py-3 font-bold text-center">
                العقوبة بالدرجات
              </th>
            </tr>
          </thead>

          <tbody>
            {punishmentRecords.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 last:border-b-0 hover:bg-[#faf9f4] transition"
              >
                <td className="px-5 py-4 text-[#555d30] font-bold">
                  {i + 1}
                </td>
                <td className="px-5 py-4">
                    <div>
                      <p className="text-[#1f220f] font-bold">
                        {row.studentName}
                      </p>
                      </div>
                  {/* </div> */}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* <PunishmentIcon type={row.type} /> */}

                    <div>
                      <p className="text-[#1f220f] font-bold">
                        {row.milateryNum}
                      </p>

                      </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-[#1f220f] font-bold">
                  {row.violation}
                </td>
                <td className="px-5 py-4 text-[#1f220f] font-bold">
                  {row.punishment}
                </td>

                
                <td className="px-5 py-4">
                  <div className="flex justify-center">
                    <span className="w-9 h-9 rounded-full bg-[#555d30] text-white flex items-center justify-center font-bold">
                      {row.degree}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div  className=' flex  p-5' >
          <button className=" flex p-2  mx-2 rounded font-bold bg-[#f3f1e8] text-[#1f220f]">
            <FiEdit2 />
            <span className='mx-2'>

            تعديل
            </span>

            </button>
          <button className="p-2 rounded bg-[#555d30] text-white flex items-center justify-center font-bold">
            <FiPlus />
        <span className='mx-2'>
                    إدخال عقوبة  
        </span>

          </button>

      </div>
        </div>
  </>
  )
}
