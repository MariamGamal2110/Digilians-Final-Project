import React from 'react'


export default function UserPunishmentTable() {
    const punishments = [
    { violation : 'تأخير أثناء عودة أجازات', punishment: 'خصم درجات ', value:2 },
    { violation: 'عدم الإلتزام بهيئة الزى', punishment: 'تأخير ساعتين عن نزول الإجازات' , value:5 },
    { violation: 'الاستيقاظ بعد نوبة نوم', punishment: 'حرمان من الإجازه يوم الاربعاء' , value:5}
  ]
  return (
    <>
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100 ">
          <th className="text-right text-secondary font-medium p-8"> </th>
          <th className="text-right text-secondary font-medium p-8">المخالفه </th>
          <th className="text-right text-secondary font-medium pb-3">العقوبه </th>
          <th className="text-right text-secondary font-medium pb-3">العقوبه بالدرجات  </th>
        </tr>
      </thead>
          <tbody>
            {punishments.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                <td className="py-8 text-secondary font-medium">{i+1}</td>
                <td className="py-8 text-primary font-medium">{row.violation}</td>
                <td className="py-8 text-primary font-medium">{row.punishment}</td>
                <td className="py-8 text-primary font-medium">{row.value}</td>
              </tr>
            ))}
          </tbody>
       
      </table>
    </>
  )
}
