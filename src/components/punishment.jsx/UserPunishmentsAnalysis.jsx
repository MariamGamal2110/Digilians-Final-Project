import React from 'react'

export default function UserPunishmentsAnalysis({studentName}){
  const stats = [
    { title: "عدد المخالفات", value: 3 },
    { title: "الدرجات المخصومة", value: 12 },
  { title: "باقي الدرجات", value: 88 }
];
  return (
    
    <>
    <h2 className='text-secondary p-5 text-3xl font-bold mb-2'> 
    بيان مخالفات الطالب { studentName }
    </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <h3 className="text-gray-500 mb-2">{item.title}</h3>
            <p className="text-3xl font-bold text-secondary">
              {item.value}
            </p>
          </div>
        ))}
      </div>
   



    
    </>
  )
}
