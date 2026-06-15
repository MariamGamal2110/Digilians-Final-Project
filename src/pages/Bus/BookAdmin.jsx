// import { useState, useEffect } from "react";
// import { getToken } from "../../api/client";

// export default function BookAdmin() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchAllBookings();
//   }, []);


// const fetchAllBookings = async () => {
//   try {
//     const res = await fetch('http://localhost:5000/api/booking/all')
//     const data = await res.json()

//     if (data.success) {
//       console.log('#Data Type:', typeof data, Array.isArray(data));

//       const bookingsArray = Array.isArray(data.data) 
//         ? data['0'] 
//         : [data['0']];
//       setBookings(bookingsArray)
//       console.log('#final Bookings:', bookingsArray)
//     } else {
//       setBookings([])
//         console.log('No bookings found')
//     }
//   } catch (err) {
//     setError('تعذر الاتصال بالخادم' + err.message)
//     setBookings([])
//   } finally {
//     setLoading(false)
//   }
// }

//   const handleUpdateStatus = async (id, status) => {
//     try {
//       const token = getToken("admin");
//       const res = await fetch(
//         `http://localhost:5000/api/booking/${id}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status }),
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
//       }
//     } catch (err) {
//       alert("حدث خطأ أثناء التحديث");
//     }
//   };

//   // إحصائيات الوجهات
//   const getStats = () => {
//     const stationCounts = {};
//     bookings.forEach((b) => {
//       stationCounts[b.boardingStation] =
//         (stationCounts[b.boardingStation] || 0) + 1;
//     });
//     const absent = bookings.filter((b) => b.status === "rejected").length;
//     return { stationCounts, absent };
//   };

//   const { stationCounts, absent } = getStats();

//   const getStatusLabel = (status) => {
//     if (status === "confirmed")
//       return { text: "تم الحجز ✅", color: "text-accent" };
//     if (status === "rejected")
//       return { text: "مرفوض ❌", color: "text-red-400" };
//     return { text: "قيد الانتظار ⏳", color: "text-secondary" };
//   };

//   if (loading)
//     return (
//       <div className="text-center py-20 text-secondary">جاري التحميل...</div>
//     );
//   if (error)
//     return <div className="text-center py-20 text-red-400">{error}</div>;

//   return (
//     <div dir="rtl">
//       {/* إحصائيات الوجهات */}
//       <div className="mb-6">
//         <h2 className="text-primary font-bold text-lg mb-4">
//           إحصائيات وجهات الطلاب
//         </h2>
//         <div className="flex gap-3 flex-wrap">
//           {Object.entries(stationCounts).map(([station, count]) => (
//             <div
//               key={station}
//               className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24"
//             >
//               <p className="text-secondary text-xs mb-1">{station}</p>
//               <p className="text-primary font-bold text-2xl">{count}</p>
//             </div>
//           ))}
//           <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24">
//             <p className="text-secondary text-xs mb-1">الغياب</p>
//             <p className="text-primary font-bold text-2xl">{absent}</p>
//           </div>
//         </div>
//       </div>

//       {/* جدول الطلبات */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h2 className="text-primary font-bold text-lg">
//             طلبات الحجز الواردة
//           </h2>
//           <span className="text-secondary text-sm">
//             إجمالي الطلاب: {bookings.length}
//           </span>
//         </div>

//         {bookings.length === 0 ? (
//           <div className="text-center py-12 text-secondary">
//             لا توجد طلبات حجز حتى الآن
//           </div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-100 bg-background">
//                 <th className="text-right text-secondary font-medium px-6 py-3">
//                   اسم الطالب
//                 </th>
//                 <th className="text-right text-secondary font-medium px-6 py-3">
//                   الرقم العسكري
//                 </th>
//                 <th className="text-right text-secondary font-medium px-6 py-3">
//                   الوجهة
//                 </th>
//                 <th className="text-right text-secondary font-medium px-6 py-3">
//                   الحالة
//                 </th>
//                 <th className="text-right text-secondary font-medium px-6 py-3">
//                   الإجراء
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((b) => {
//                 const statusInfo = getStatusLabel(b.status);
//                 return (
//                   <tr
//                     key={b._id}
//                     className="border-b border-gray-50 hover:bg-background transition-colors"
//                   >
//                     <td className="px-6 py-4 text-primary font-bold">
//                       {b.studentName}
//                     </td>
//                     <td className="px-6 py-4 text-secondary">{b.studentId}</td>
//                     <td className="px-6 py-4 text-secondary">
//                       {b.boardingStation}
//                     </td>
//                     <td
//                       className={`px-6 py-4 font-medium text-xs ${statusInfo.color}`}
//                     >
//                       {statusInfo.text}
//                     </td>
//                    <td className="px-6 py-4">
//   <div className="flex items-center gap-2">
//     {b.status !== 'confirmed' && (
//       <button
//         onClick={() => handleUpdateStatus(b._id, 'confirmed')}
//         className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
//       >
//         تم الحجز
//       </button>
//     )}
//     {b.status !== 'rejected' && (
//       <button
//         onClick={() => handleUpdateStatus(b._id, 'rejected')}
//         className="border border-gray-200 text-secondary text-xs px-4 py-2 rounded-lg hover:bg-background transition-colors"
//       >
//         اعتذار
//       </button>
//     )}
//   </div>
// </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }


















































import { useState, useEffect } from "react";
import { getToken } from "../../api/client";
import { FiShield, FiTruck, FiCheck, FiX } from "react-icons/fi";

export default function BookAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllBookings();
  }, []);


  const fetchAllBookings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/booking/all')
      const data = await res.json()

      if (data.success) {
        console.log('#Data Type:', typeof data, Array.isArray(data));

        const bookingsArray = Array.isArray(data.data)
          ? data['0']
          : [data['0']];
        setBookings(bookingsArray)
        console.log('#final Bookings:', bookingsArray)
      } else {
        setBookings([])
        console.log('No bookings found')
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم' + err.message)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = getToken("admin");
      const res = await fetch(`http://localhost:5000/api/booking/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
      }
    } catch (err) {
      alert("حدث خطأ أثناء التحديث");
    }
  };

  const getStats = () => {
    const stationCounts = {};
    bookings.forEach((b) => {
      stationCounts[b.boardingStation] = (stationCounts[b.boardingStation] || 0) + 1;
    });
    const absent = bookings.filter((b) => b.status === "rejected").length;
    return { stationCounts, absent };
  };

  const { stationCounts, absent } = getStats();

  const getStatusLabel = (status) => {
    if (status === "confirmed") return { text: "تم الحجز ✅", color: "text-accent" };
    if (status === "rejected") return { text: "مرفوض ❌", color: "text-red-400" };
    return { text: "قيد الانتظار ⏳", color: "text-secondary" };
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.studentName && b.studentName.toLowerCase().includes(term)) ||
      (b.studentId && b.studentId.includes(term))
    );
  });

  if (loading) return <div className="text-center py-20 text-secondary">جاري التحميل...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* الهيدر الأخضر */}
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <FiShield />
                  شئون النقل والمواصلات
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  إدارة حجوزات الأتوبيس
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  مراجعة طلبات الحجز الواردة وتحديث حالة التنقل للطلاب حياً
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <FiTruck size={36} />
              </div>
            </div>
          </div>

          {/* إحصائيات الوجهات */}
          <div className="flex gap-3 flex-wrap mb-6">
            {Object.entries(stationCounts).map(([station, count]) => (
              <div key={station} className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24">
                <p className="text-gray-500 text-xs mb-1">{station}</p>
                <p className="text-[#555d30] font-black text-2xl">{count}</p>
              </div>
            ))}
            <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-center shadow-sm flex-1 min-w-24">
              <p className="text-gray-500 text-xs mb-1">الغياب</p>
              <p className="text-red-500 font-black text-2xl">{absent}</p>
            </div>
          </div>

          {/* شريط البحث */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-right w-full md:w-auto">
              <span className="text-gray-500 font-bold text-sm">إجمالي الطلاب: </span>
              <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">{filteredBookings.length} طالب</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث بالاسم أو الرقم العسكري..."
              className="w-full md:w-80 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right bg-white focus:outline-none focus:ring-2 focus:ring-[#555d30]/30"
            />
          </div>
          : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-background">
                <th className="text-right text-secondary font-medium px-6 py-3">
                  اسم الطالب
                </th>
                <th className="text-right text-secondary font-medium px-6 py-3">
                  الرقم العسكري
                </th>
                <th className="text-right text-secondary font-medium px-6 py-3">
                  الوجهة
                </th>
                <th className="text-right text-secondary font-medium px-6 py-3">
                  الحالة
                </th>
                <th className="text-right text-secondary font-medium px-6 py-3">
                  الإجراء
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const statusInfo = getStatusLabel(b.status);
                return (
                  <tr
                    key={b._id}
                    className="border-b border-gray-50 hover:bg-background transition-colors"
                  >
                    <td className="px-6 py-4 text-primary font-bold">
                      {b.studentName}
                    </td>
                    <td className="px-6 py-4 text-secondary">{b.studentId}</td>
                    <td className="px-6 py-4 text-secondary">
                      {b.boardingStation}
                    </td>
                    <td
                      className={`px-6 py-4 font-medium text-xs ${statusInfo.color}`}
                    >
                      {statusInfo.text}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {b.status !== 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'confirmed')}
                            className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                          >
                            تم الحجز
                          </button>
                        )}
                        {b.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateStatus(b._id, 'rejected')}
                            className="border border-gray-200 text-secondary text-xs px-4 py-2 rounded-lg hover:bg-background transition-colors"
                          >
                            اعتذار
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )
        </div>
      </div>

    </section>
  )}
