import { FiEye,FiTrash2  ,FiEdit2 ,FiClock, FiShield, FiSun,FiPlus } from 'react-icons/fi'
import { useState } from "react";
import AdminAddPunishmentModal from "./AdminAddPunishmentModal";

// function PunishmentsPage() {
//   const [showModal, setShowModal] = useState(false);
//   const [punishments, setPunishments] = useState([]);

//   const handleAddPunishment = (newPunishment) => {
//     setPunishments([...punishments, newPunishment]);
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <button onClick={() => setShowModal(true)}>
//         إضافة عقوبة جديدة
//       </button>

//       {showModal && (
//         <AddPunishmentModal
//           onClose={() => setShowModal(false)}
//           onSave={handleAddPunishment}
//         />
//       )}

//       {/* الجدول */}
//       {punishments.map((p, index) => (
//         <div key={index}>{p.studentName}</div>
//       ))}
//     </div>
//   );
// }

export default function AdminPunishmentTable() {
    const [showModal, setShowModal] = useState(false);
    const [punishments, setPunishments] = useState([]);

    const handleAddPunishment = (newPunishment) => {
    setPunishments([...punishments, newPunishment]);
    setShowModal(false);
  };

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
  ];


  return(
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
              <th className="py-3 px-4 font-bold">إجراءات</th>

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
                 <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                        <button onClick={setShowModal(true)} 
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                                title="عرض"
                            >
                                <FiEye size={18} />
                            </button>

                            <button
                                // onClick={() => openEditModal(student)}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                                title="تعديل"
                            >
                                <FiEdit2 size={17} />
                            </button>

                            <button
                                // onClick={() => deletePunishment(student.id)}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b5b3e] hover:bg-[#f3efe4] hover:scale-105 transition"
                                title="حذف"
                            >
                                <FiTrash2 size={17} />
                            </button>
                        </div>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div  className='p-5' >
          <button onClick={() => setShowModal(true)} className="p-2 rounded bg-[#555d30] text-white flex items-center justify-center font-bold">
            <FiPlus />
        <span className='mx-2'>
                    إدخال عقوبة  
        </span>

          </button>
                {showModal && (
        <AddPunishmentModal
          onClose={() => setShowModal(false)}
          onSave={handleAddPunishment}
        />
      )}


      </div>
        </div>
  </>
  )
}

