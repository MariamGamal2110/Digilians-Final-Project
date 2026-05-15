import React from 'react'
import { GiThorHammer } from "react-icons/gi";

export default function ExcuseDef() {
  return (
    <>
    <div dir='rtl' className='w-25 bg-white p-6 rounded-2xl shadow-md w-full"
 '>
        <div className='flex  justify-evenly'>
        <GiThorHammer />
        <h2>قـواعــد الالـتـمـاســـات</h2>
        </div >
        <ol>
            <li>يتم تقديم الالتماسات بحد أقصى <strong>يوم السبت</strong> حتى تتمكن الأكاديمية من النظر فى الأمر المطلوب </li>
            <li> يتحمل الطالب مسؤوليه صحة البيانات و المستندات المرفقة بالكامل وفى حالة أى مستندات غير صحيحه يتعرض الطالب للمخالفة و العقوبه </li>
        </ol>
    </div>
    </>
  )
}
