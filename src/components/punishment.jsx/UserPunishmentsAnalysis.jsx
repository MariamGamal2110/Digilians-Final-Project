import React from 'react'

export default function UserPunishmentsAnalysis({studentName, degree , totalDegrees}){
  return (
    <>
    <h2> 
    بيان مخالفات الطالب { studentName }
    </h2>
    <div> {degree} </div>
    <div> {totalDegrees}</div>



    
    </>
  )
}
