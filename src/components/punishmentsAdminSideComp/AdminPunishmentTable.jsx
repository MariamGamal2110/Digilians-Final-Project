import React from 'react'


export default function AdminPunishmentTable() {
    const punishmentRecords = [
    { studentName : "محمد حسن على ", milateryNum:22589 , violation:'خصم درجات ', punishment:"إنذار كتابي ",degree:"2" },
    { studentName : "جهاد محمد  على", milateryNum:22589 ,violation: 'الاستيقاظ بعد نوبة نوم', punishment: 'حرمان من الإجازه يوم الاربعاء' , degree:5 },
    { studentName : "احمد سمير ابراهيم ", milateryNum:22789 , violation:'خصم درجات ', punishment:"إنذار كتابي ",degree:"2" },
    { studentName : "محمد حسن على ", milateryNum:22589 ,  violation: 'عدم الإلتزام بهيئة الزى', punishment: 'تأخير ساعتين عن نزول الإجازات' , degree:5 },
  ]
  return (
    <>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100 ">
          <th className="text-right text-secondary font-medium p-8"> </th>
          <th className="text-right text-secondary font-medium p-8">اسم الطالب  </th>
          <th className="text-right text-secondary font-medium p-8">الرقم العسكري </th>
          <th className="text-right text-secondary font-medium p-8">المخالفه </th>
          <th className="text-right text-secondary font-medium pb-3">العقوبه </th>
          <th className="text-right text-secondary font-medium pb-3">العقوبه بالدرجات  </th>
        </tr>
      </thead>
          <tbody>
            {punishmentRecords.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                <td className="py-8 text-secondary font-medium">{i+1}</td>

                <td className="py-8 text-primary font-medium">{row.studentName}</td>
                <td className="py-8 text-primary font-medium">{row.milateryNum}</td>
                <td className="py-8 text-primary font-medium">{row.violation}</td>
                <td className="py-8 text-primary font-medium">{row.punishment}</td>
                <td className="py-8 text-primary font-medium">{row.degree}</td>
              </tr>
            ))}
          </tbody>
       
      </table>
    </>
  )
}
