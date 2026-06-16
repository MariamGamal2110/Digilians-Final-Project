// import { useState, useEffect } from 'react'
// import { getToken } from  '../../api/client'

// const divisions = ['ماجستير العلوم 24 شهراً', 'الماجستير المهني 12 شهراً', 'الدبلوم المتخصص 9 أشهر', 'الدبلوم المكثف 4 أشهر']
// const stations = ['محطة الصعود', 'محطة الإسكندرية', 'محطة الكاندرد', 'محطة الهبوط']

// export default function BookUser() {
//   const [form, setForm] = useState({
//     studentId: '',
//     studentName: '',
//     division: '',
//     boardingStation: '',
//     alightingStation: '',
//   })
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [previousBookings, setPreviousBookings] = useState([])

//   // جلب الحجوزات السابقة
//   useEffect(() => {
//     if (form.studentId.length > 3) {
//       fetchMyBookings(form.studentId)
//     }
//   }, [form.studentId])

//   const fetchMyBookings = async (studentId) => {
//   try {
//     const token = getToken('user')
//     const res = await fetch(`http://localhost:5000/api/booking/my/${studentId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     const data = await res.json()
//     if (data.success && Array.isArray(data.data)) {
//       setPreviousBookings(data.data)
//     } else {
//       setPreviousBookings([])
//     }
//   } catch (err) {
//     console.error('خطأ في جلب الحجوزات:', err)
//     setPreviousBookings([])
//   }
// }

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value })
//   }

//   const handleSubmit = async () => {
//     if (!form.division || !form.studentId || !form.studentName || !form.boardingStation || !form.alightingStation) {
//       setError('يرجى تعبئة جميع الحقول المطلوبة')
//       return
//     }

//     setLoading(true)
//     setError('')

//     try {
//       const token = getToken('user')
//       const res = await fetch('http://localhost:5000/api/booking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       })

//       const data = await res.json()

//       if (data.success) {
//         setSubmitted(true)
//         fetchMyBookings(form.studentId)
//       } else {
//         setError(data.message || 'حدث خطأ، حاول مرة أخرى')
//       }
//     } catch (err) {
//       setError('تعذر الاتصال بالخادم' + err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getStatusLabel = (status) => {
//     if (status === 'confirmed') return { text: 'تم الحجز ✅', color: 'text-accent' }
//     if (status === 'rejected') return { text: 'مرفوض ❌', color: 'text-red-400' }
//     return { text: 'قيد الانتظار ⏳', color: 'text-secondary' }
//   }

//   return (
//     <div dir="rtl" className="bg-background">

//       {/* هيدر الصفحة */}
//       <div className="bg-secondary px-8 py-12 mb-6">
//         <h1 className="text-background font-bold text-4xl leading-relaxed mb-3">
//           احجز مكانك في
//           <br />
//           حافلة الإجازة الأسبوعية
//         </h1>
//         <p className="text-accent text-sm leading-relaxed max-w-sm">
//           نظام الأكاديمية الإلكتروني لحجز الحافلات العسكرية
//           <br />
//           لضمان رحلة مريحة وآمنة لجميع أبنائها
//         </p>
//       </div>

//       <div className="px-6 pb-6 flex gap-6">

//         {/* يمين - بيانات الحجز */}
//         <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="text-primary font-bold text-lg mb-5 flex items-center gap-2">
//             <span className="w-1 h-5 bg-accent rounded-full inline-block"></span>
//             بيانات الحجز
//           </h2>

//           {/* القسم الدراسي */}
//           <div className="mb-4">
//             <label className="text-secondary text-xs mb-1 block">القسم الدراسي</label>
//             <select
//               value={form.division}
//               onChange={(e) => handleChange('division', e.target.value)}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
//             >
//               <option value="">اختر القسم</option>
//               {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
//             </select>
//           </div>

//           {/* اسم الطالب */}
//           <div className="mb-4">
//             <label className="text-secondary text-xs mb-1 block">اسم الطالب</label>
//             <input
//               type="text"
//               value={form.studentName}
//               onChange={(e) => handleChange('studentName', e.target.value)}
//               placeholder="أدخل اسمك الكامل"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
//             />
//           </div>

//           {/* الرقم العسكري */}
//           <div className="mb-4">
//             <label className="text-secondary text-xs mb-1 block">الرقم العسكري</label>
//             <input
//               type="text"
//               value={form.studentId}
//               onChange={(e) => handleChange('studentId', e.target.value)}
//               placeholder="أدخل رقمك العسكري"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
//             />
//           </div>

//           {/* محطة الصعود والهبوط */}
//           <div className="flex gap-3 mb-6">
//             <div className="flex-1">
//               <label className="text-secondary text-xs mb-1 block">محطة الصعود</label>
//               <select
//                 value={form.boardingStation}
//                 onChange={(e) => handleChange('boardingStation', e.target.value)}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
//               >
//                 <option value="">اختر المحطة</option>
//                 {stations.map((s) => <option key={s} value={s}>{s}</option>)}
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="text-secondary text-xs mb-1 block">وقت العودة المطلوب</label>
//               <select
//                 value={form.alightingStation}
//                 onChange={(e) => handleChange('alightingStation', e.target.value)}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-primary bg-background focus:outline-none focus:border-accent"
//               >
//                 <option value="">اختر الموعد</option>
//                 {stations.map((s) => <option key={s} value={s}>{s}</option>)}
//               </select>
//             </div>
//           </div>

//           {error && <p className="text-red-400 text-xs mb-3 text-center">{error}</p>}

//           <button
//             onClick={handleSubmit}
//             disabled={loading || submitted}
//             className="w-full bg-primary text-background font-bold py-3 rounded-xl hover:bg-secondary transition-colors disabled:opacity-50"
//           >
//             {loading ? 'جاري الإرسال...' : submitted ? '✅ تم إرسال الطلب' : 'تأكيد عملية الحجز'}
//           </button>
//         </div>

//         {/* يسار - ملخص + سجل */}
//         <div className="w-72 flex flex-col gap-4">

//           {/* ملخص الحجز */}
//           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <div className="flex items-center gap-2 mb-4">
//               <span className="text-lg">🚌</span>
//               <span className="text-primary font-bold text-sm">ملخص الحجز</span>
//             </div>
//             <div className="space-y-2 text-xs">
//               <div className="flex justify-between">
//                 <span className="text-secondary">رقم الحافلة</span>
//                 <span className="text-primary font-medium">AC-4427</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-secondary">وقت التحرك</span>
//                 <span className="text-primary font-medium">02:00 ظهراً</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-secondary">وقت العودة</span>
//                 <span className="text-primary font-medium">{form.alightingStation || '—'}</span>
//               </div>
//               <hr className="border-gray-100 my-2" />
//               <div className="flex justify-between">
//                 <span className="text-secondary">إجمالي التكلفة</span>
//                 <span className="text-primary font-bold text-base">50 ج.م</span>
//               </div>
//             </div>
//           </div>

//           {/* سجل الحجوزات السابقة */}
//           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <h3 className="text-primary font-bold text-sm mb-3">سجل الحجوزات السابقة</h3>
//             {previousBookings.length === 0 ? (
//               <p className="text-secondary text-xs text-center py-2">لا توجد حجوزات سابقة</p>
//             ) : (
//               <table className="w-full text-xs">
//                 <thead>
//                   <tr className="border-b border-gray-100">
//                     <th className="text-right text-secondary font-medium pb-2">التاريخ</th>
//                     <th className="text-right text-secondary font-medium pb-2">الوجهة</th>
//                     <th className="text-right text-secondary font-medium pb-2">الحالة</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previousBookings.map((b) => {
//                     const statusInfo = getStatusLabel(b.status)
//                     return (
//                       <tr key={b._id} className="border-b border-gray-50">
//                         <td className="py-2 text-secondary">
//                           {new Date(b.createdAt).toLocaleDateString('ar-EG')}
//                         </td>
//                         <td className="py-2 text-primary font-medium">{b.boardingStation}</td>
//                         <td className={`py-2 font-medium ${statusInfo.color}`}>{statusInfo.text}</td>
//                       </tr>
//                     )
//                   })}
//                 </tbody>
//               </table>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }











































// import { useState, useEffect } from 'react'
// import { getToken } from '../../api/client'
// import { FiTruck, FiMapPin, FiClock, FiUser, FiHash } from 'react-icons/fi'

// const divisions = ['ماجستير العلوم 24 شهراً', 'الماجستير المهني 12 شهراً', 'الدبلوم المتخصص 9 أشهر', 'الدبلوم المكثف 4 أشهر']
// const stations = ['محطة الصعود', 'محطة الإسكندرية', 'محطة الكاندرد', 'محطة الهبوط']

// export default function BookUser() {
//   const [form, setForm] = useState({
//     studentId: '',
//     studentName: '',
//     division: '',
//     boardingStation: '',
//     alightingStation: '',
//   })
//   const [submitted, setSubmitted] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [previousBookings, setPreviousBookings] = useState([])

//   useEffect(() => {
//     if (form.studentId.length > 3) {
//       fetchMyBookings(form.studentId)
//     }
//   }, [form.studentId])

//   const fetchMyBookings = async (studentId) => {
//     try {
//       const token = getToken('user')
//       const res = await fetch(`http://localhost:5000/api/booking/my/${studentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = await res.json()
//       if (data.success && Array.isArray(data.data)) {
//         setPreviousBookings(data.data)
//       } else {
//         setPreviousBookings([])
//       }
//     } catch (err) {
//       console.error('خطأ في جلب الحجوزات:', err)
//       setPreviousBookings([])
//     }
//   }

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value })
//   }

//   const handleSubmit = async () => {
//     if (!form.division || !form.studentId || !form.studentName || !form.boardingStation || !form.alightingStation) {
//       setError('يرجى تعبئة جميع الحقول المطلوبة')
//       return
//     }
//     setLoading(true)
//     setError('')
//     try {
//       const token = getToken('user')
//       const res = await fetch('http://localhost:5000/api/booking', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form),
//       })
//       const data = await res.json()
//       if (data.success) {
//         setSubmitted(true)
//         fetchMyBookings(form.studentId)
//       } else {
//         setError(data.message || 'حدث خطأ، حاول مرة أخرى')
//       }
//     } catch (err) {
//       setError('تعذر الاتصال بالخادم' + err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getStatusLabel = (status) => {
//     if (status === 'confirmed') return { text: 'تم الحجز', css: 'bg-green-50 text-green-700 border-green-200' }
//     if (status === 'rejected') return { text: 'مرفوض', css: 'bg-red-50 text-red-700 border-red-200' }
//     return { text: 'قيد الانتظار', css: 'bg-amber-50 text-amber-700 border-amber-200' }
//   }

//   const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right bg-white focus:outline-none focus:ring-2 focus:ring-[#555d30]/30 focus:border-[#555d30]/50"

//   return (
//     <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
//       <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-8">

//           {/* الهيدر الأخضر */}
//           <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
//             <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
//             <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
//             <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//               <div className="text-right">
//                 <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
//                   <FiTruck />
//                   نظام حجز الحافلات العسكرية
//                 </div>
//                 <h1 className="text-white text-3xl font-extrabold mb-3">
//                   احجز مكانك في حافلة الإجازة
//                 </h1>
//                 <p className="text-white/80 text-sm leading-7 max-w-xl">
//                   لضمان رحلة مريحة وآمنة لجميع أبناء الأكاديمية
//                 </p>
//               </div>
//               <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
//                 <FiTruck size={36} />
//               </div>
//             </div>
//           </div>

//           {/* المحتوى */}
//           <div className="flex flex-col md:flex-row gap-6">

//             {/* يمين - فورم الحجز */}
//             <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white">
//               <h2 className="text-[#555d30] font-black text-lg mb-5 flex items-center gap-2">
//                 <span className="w-1 h-5 bg-[#555d30] rounded-full inline-block" />
//                 بيانات الحجز
//               </h2>

//               <div className="mb-4">
//                 <label className="text-gray-500 text-xs mb-1.5 block font-bold">القسم الدراسي</label>
//                 <select
//                   value={form.division}
//                   onChange={(e) => handleChange('division', e.target.value)}
//                   className={inputClass}
//                 >
//                   <option value="">اختر القسم</option>
//                   {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="text-gray-500 text-xs mb-1.5 block font-bold">اسم الطالب</label>
//                 <input
//                   type="text"
//                   value={form.studentName}
//                   onChange={(e) => handleChange('studentName', e.target.value)}
//                   placeholder="أدخل اسمك الكامل"
//                   className={inputClass}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="text-gray-500 text-xs mb-1.5 block font-bold">الرقم العسكري</label>
//                 <input
//                   type="text"
//                   value={form.studentId}
//                   onChange={(e) => handleChange('studentId', e.target.value)}
//                   placeholder="أدخل رقمك العسكري"
//                   className={inputClass}
//                 />
//               </div>

//               <div className="flex gap-3 mb-6">
//                 <div className="flex-1">
//                   <label className="text-gray-500 text-xs mb-1.5 block font-bold">محطة الصعود</label>
//                   <select
//                     value={form.boardingStation}
//                     onChange={(e) => handleChange('boardingStation', e.target.value)}
//                     className={inputClass}
//                   >
//                     <option value="">اختر المحطة</option>
//                     {stations.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>
//                 <div className="flex-1">
//                   <label className="text-gray-500 text-xs mb-1.5 block font-bold">وقت العودة المطلوب</label>
//                   <select
//                     value={form.alightingStation}
//                     onChange={(e) => handleChange('alightingStation', e.target.value)}
//                     className={inputClass}
//                   >
//                     <option value="">اختر الموعد</option>
//                     {stations.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>
//               </div>

//               {error && (
//                 <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm text-center font-bold">
//                   {error}
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || submitted}
//                 className="w-full bg-[#555d30] hover:bg-[#464f28] text-white font-black py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
//               >
//                 {loading ? 'جاري الإرسال...' : submitted ? '✅ تم إرسال الطلب بنجاح' : 'تأكيد عملية الحجز'}
//               </button>
//             </div>

//             {/* يسار - ملخص + سجل */}
//             <div className="w-full md:w-72 flex flex-col gap-4">

//               {/* ملخص الحجز */}
//               <div className="border border-gray-200 rounded-xl p-5 bg-white">
//                 <h3 className="text-[#555d30] font-black text-sm mb-4 flex items-center gap-2">
//                   <FiTruck size={15} />
//                   ملخص الحجز
//                 </h3>
//                 <div className="space-y-3 text-xs">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500 flex items-center gap-1"><FiHash size={11} /> رقم الحافلة</span>
//                     <span className="text-gray-800 font-black">AC-4427</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500 flex items-center gap-1"><FiClock size={11} /> وقت التحرك</span>
//                     <span className="text-gray-800 font-black">02:00 ظهراً</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500 flex items-center gap-1"><FiMapPin size={11} /> وقت العودة</span>
//                     <span className="text-gray-800 font-black">{form.alightingStation || '—'}</span>
//                   </div>
//                   <hr className="border-gray-100" />
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500 font-bold">إجمالي التكلفة</span>
//                     <span className="text-[#555d30] font-black text-base">50 ج.م</span>
//                   </div>
//                 </div>
//               </div>

//               {/* سجل الحجوزات */}
//               <div className="border border-gray-200 rounded-xl p-5 bg-white">
//                 <h3 className="text-[#555d30] font-black text-sm mb-4">سجل الحجوزات السابقة</h3>
//                 {previousBookings.length === 0 ? (
//                   <p className="text-gray-400 text-xs text-center py-4 font-bold">لا توجد حجوزات سابقة</p>
//                 ) : (
//                   <div className="space-y-2">
//                     {previousBookings.map((b) => {
//                       const statusInfo = getStatusLabel(b.status)
//                       return (
//                         <div key={b._id} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
//                           <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.css}`}>
//                             {statusInfo.text}
//                           </span>
//                           <div className="text-right">
//                             <p className="text-gray-800 font-bold text-xs">{b.boardingStation}</p>
//                             <p className="text-gray-400 text-[10px]">{new Date(b.createdAt).toLocaleDateString('ar-EG')}</p>
//                           </div>
//                         </div>
//                       )
//                     })}
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }



















import { useState, useEffect } from 'react'
import client, { getToken } from '../../api/client'
import { FiTruck, FiMapPin, FiClock, FiHash } from 'react-icons/fi'

const divisions = ['ماجستير العلوم 24 شهراً', 'الماجستير المهني 12 شهراً', 'الدبلوم المتخصص 9 أشهر', 'الدبلوم المكثف 4 أشهر']
const boardingStations = ['بوابة 5']
const alightingStations = ['موقف السلام', 'موقف رمسيس']

const getBusNumber = (alightingStation) => {
  if (alightingStation === 'موقف السلام') return 'اتوبيس موقف السلام (باص 1)';
  if (alightingStation === 'موقف رمسيس') return 'اتوبيس موقف رمسيس (باص 2)';
  return '—';
};

export default function BookUser() {
  const [form, setForm] = useState({
    studentId: '',
    studentName: '',
    division: '',
    boardingStation: 'بوابة 5',
    alightingStation: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previousBookings, setPreviousBookings] = useState([])

  useEffect(() => {
    if (form.studentId.length > 3) {
      fetchMyBookings(form.studentId)
    }
  }, [form.studentId])
useEffect(() => {
  const hasPending = previousBookings.some(b => b.status === 'pending')
  if (!hasPending || form.studentId.length <= 3) return

  const interval = setInterval(() => {
    fetchMyBookings(form.studentId)
  }, 10000)

  return () => clearInterval(interval)
}, [previousBookings, form.studentId])

  const fetchMyBookings = async (studentId) => {
    try {
      const data = await client.apiRequest(`/booking/my/${studentId}`)
      if (data.success && Array.isArray(data.data)) {
        setPreviousBookings(data.data)
      } else {
        setPreviousBookings([])
      }
    } catch (err) {
      console.error('خطأ في جلب الحجوزات:', err)
      setPreviousBookings([])
    }
  }

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = async () => {
    if (!form.division || !form.studentId || !form.studentName || !form.boardingStation || !form.alightingStation) {
      setError('يرجى تعبئة جميع الحقول المطلوبة')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await client.apiRequest('/booking', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      if (data.success) {
        setSubmitted(true)
        fetchMyBookings(form.studentId)
      } else {
        setError(data.message || 'حدث خطأ، حاول مرة أخرى')
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusLabel = (status) => {
    if (status === 'confirmed') return { text: 'تم الحجز', css: 'bg-green-50 text-green-700 border-green-200' }
    if (status === 'rejected') return { text: 'مرفوض', css: 'bg-red-50 text-red-700 border-red-200' }
    return { text: 'قيد الانتظار', css: 'bg-amber-50 text-amber-700 border-amber-200' }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right bg-white focus:outline-none focus:ring-2 focus:ring-[#555d30]/30 focus:border-[#555d30]/50"

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* الهيدر الأخضر */}
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <FiTruck />
                  نظام حجز الحافلات العسكرية
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  احجز مكانك في حافلة الإجازة
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  لضمان رحلة مريحة وآمنة لجميع أبناء الأكاديمية
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <FiTruck size={36} />
              </div>
            </div>
          </div>

          {/* المحتوى */}
          <div className="flex flex-col md:flex-row gap-6">

            {/* يمين - فورم الحجز */}
            <div className="flex-1 border border-gray-200 rounded-xl p-6 bg-white">
              <h2 className="text-[#555d30] font-black text-lg mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#555d30] rounded-full inline-block" />
                بيانات الحجز
              </h2>

              <div className="mb-4">
                <label className="text-gray-500 text-xs mb-1.5 block font-bold">القسم الدراسي</label>
                <select
                  value={form.division}
                  onChange={(e) => handleChange('division', e.target.value)}
                  className={inputClass}
                >
                  <option value="">اختر القسم</option>
                  {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-gray-500 text-xs mb-1.5 block font-bold">اسم الطالب</label>
                <input
                  type="text"
                  value={form.studentName}
                  onChange={(e) => handleChange('studentName', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className={inputClass}
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-500 text-xs mb-1.5 block font-bold">الرقم العسكري</label>
                <input
                  type="text"
                  value={form.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  placeholder="أدخل رقمك العسكري"
                  className={inputClass}
                />
              </div>

              <div className="flex gap-3 mb-6">
                <div className="flex-1">
                  <label className="text-gray-500 text-xs mb-1.5 block font-bold">محطة الصعود</label>
                  <select
                    value={form.boardingStation}
                    onChange={(e) => handleChange('boardingStation', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">اختر المحطة</option>
                    {boardingStations.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-gray-500 text-xs mb-1.5 block font-bold">محطة الهبوط</label>
                  <select
                    value={form.alightingStation}
                    onChange={(e) => handleChange('alightingStation', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">اختر محطة الهبوط</option>
                    {alightingStations.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm text-center font-bold">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || submitted}
                className="w-full bg-[#555d30] hover:bg-[#464f28] text-white font-black py-3.5 rounded-xl transition-colors disabled:opacity-50 text-sm"
              >
                {loading ? 'جاري الإرسال...' : submitted ? '✅ تم إرسال الطلب بنجاح' : 'تأكيد عملية الحجز'}
              </button>
            </div>

            {/* يسار - ملخص + سجل */}
            <div className="w-full md:w-72 flex flex-col gap-4">

              {/* ملخص الحجز */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-[#555d30] font-black text-sm mb-4 flex items-center gap-2">
                  <FiTruck size={15} />
                  ملخص الحجز
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-black">{getBusNumber(form.alightingStation)}</span>
                    <span className="text-gray-500 flex items-center gap-1"><FiHash size={11} /> رقم الحافلة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-black">02:00 ظهراً</span>
                    <span className="text-gray-500 flex items-center gap-1"><FiClock size={11} /> وقت التحرك</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-black">{form.alightingStation || '—'}</span>
                    <span className="text-gray-500 flex items-center gap-1"><FiMapPin size={11} /> محطة الهبوط</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#555d30] font-black text-base">50 ج.م</span>
                    <span className="text-gray-500 font-bold">إجمالي التكلفة</span>
                  </div>
                </div>
              </div>

              {/* سجل الحجوزات السابقة */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white">
                <h3 className="text-[#555d30] font-black text-sm mb-4">سجل الحجوزات السابقة</h3>
                {previousBookings.length === 0 ? (
                  <p className="text-gray-400 text-xs text-center py-4 font-bold">لا توجد حجوزات سابقة</p>
                ) : (
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-right text-gray-400 font-bold pb-2">التاريخ</th>
                        <th className="text-right text-gray-400 font-bold pb-2">الوجهة</th>
                        <th className="text-right text-gray-400 font-bold pb-2">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousBookings.map((b) => {
                        const statusInfo = getStatusLabel(b.status)
                        return (
                          <tr key={b._id} className="border-b border-gray-50">
                            <td className="py-2 text-gray-400">
                              {new Date(b.createdAt).toLocaleDateString('ar-EG')}
                            </td>
                            <td className="py-2 text-gray-800 font-bold">{b.alightingStation}</td>
                            <td className="py-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusInfo.css}`}>
                                {statusInfo.text}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}