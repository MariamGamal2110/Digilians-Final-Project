// import React, { useState, useEffect } from 'react';
// import StatsGrid from "../../components/PaymentComponents/Admin/StatsGrid";
// import SearchBar from '../../components/SearchBar';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api/payments';
// const BACKEND_SERVER_URL = 'http://localhost:5000';

// const getAuthHeader = () => {
//   let token = localStorage.getItem('token')
//     || localStorage.getItem('digilians_token')
//     || localStorage.getItem('adminToken');

//   if (!token) {
//     const keys = ['authData', 'digilians_user', 'user', 'admin', 'adminData'];
//     for (const key of keys) {
//       try {
//         const stored = localStorage.getItem(key);
//         if (stored) {
//           const parsed = JSON.parse(stored);
//           token = parsed?.token || parsed?.data?.token || parsed?.state?.token;
//           if (token) break;
//         }
//       } catch (e) {}
//     }
//   }
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const StatusBadge = ({ status }) => {
//   const config = {
//     paid:         { text: 'مقبول',        css: 'bg-green-50 text-green-700 border-green-200' },
//     under_review: { text: 'قيد المراجعة',  css: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' },
//     late:         { text: 'مرفوض',        css: 'bg-red-50 text-red-700 border-red-200' },
//     pending:      { text: 'قيد الانتظار',  css: 'bg-gray-50 text-gray-500 border-gray-200' },
//   };
//   const c = config[status] || config.late;
//   return (
//     <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black border ${c.css}`}>
//       {c.text}
//     </span>
//   );
// };

// const PaymentAdmin = () => {
//   const [students, setStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const loadAdminData = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/admin/all-payments`, {
//         headers: getAuthHeader()
//       });
//       if (response.data?.success) {
//         setStudents(response.data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching payment data:", error);
//     }
//   };

//   useEffect(() => {
//     loadAdminData();
//     const interval = setInterval(loadAdminData, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleVerify = async (studentId, monthId, action) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/admin/verify-payment`,
//         { studentId, monthId, action },
//         { headers: getAuthHeader() }
//       );

//       if (response.data?.success) {
//         setStudents(prev => prev.map(student => {
//           if (student._id !== studentId) return student;
//           return {
//             ...student,
//             months: student.months.map(month => {
//               if (month._id !== monthId) return month;
//               return {
//                 ...month,
//                 status: action === 'approve' ? 'paid' : 'late',
//                 // لو الأدمن رفض، بنسيب الـ receiptUrl زي ما هو عشان يفضل ظاهر في جدول الأدمن كمرفوض، 
//                 // والباك إند عندك بيمسحه لما الطالب يقرر يرفع واحد جديد مكانه.
//                 receiptUrl: month.receiptUrl 
//               };
//             })
//           };
//         }));
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'حدث خطأ أثناء تحديث حالة الدفع');
//     }
//   };

//   // 🎯 الفلترة السحرية هنا
//   const allRows = [];
//   students.forEach(student => {
//     if (!student.months) return;
//     student.months.forEach(month => {
      
//       // ❌ [تعديل جوهري]: تخطي أي شهر ليس لديه إيصال مرفوع نهائياً
//       if (!month.receiptUrl) return; 

//       allRows.push({
//         studentId: student._id,
//         name: student.studentName,
//         militaryId: student.militaryId || student.studentId?.militaryId || "0000000000",
//         monthId: month._id,
//         monthName: month.monthName,
//         amount: month.amount,
//         status: month.status,
//         receiptImg: `${BACKEND_SERVER_URL}${month.receiptUrl}`
//       });
//     });
//   });

//   const filteredData = allRows.filter(item => {
//     const term = searchTerm.toLowerCase();
//     return (
//       (item.name && item.name.toLowerCase().includes(term)) ||
//       (item.militaryId && item.militaryId.includes(term))
//     );
//   });

//   return (
//     <div className="bg-[rgb(var(--surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
//       <main className="w-full max-w-7xl pt-24 pb-12 px-6 lg:px-12">

//         {/* الكومبوننت الخاص بالإحصائيات العلوي */}
//         <div className="mb-8 w-full">
//           <StatsGrid students={students} />
//         </div>

//         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-r-4 border-[rgb(var(--primary-container))] pr-6">
//           <div>
//             <h2 className="text-4xl font-black text-[rgb(var(--primary-container))] mb-2">إدارة ومراجعة المصاريف</h2>
//             <p className="text-[rgb(var(--on-surface))] opacity-60 font-medium">
//               طلبات الإيصالات المرفوعة الحالية ({filteredData.length})
//             </p>
//           </div>
//           <div className="w-full md:w-96">
//             <SearchBar value={searchTerm} onChange={setSearchTerm} />
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl border border-[rgb(var(--outline-variant))/0.3] shadow-sm overflow-hidden glass-card">
//           <div className="overflow-x-auto">
//             <table className="w-full text-right border-collapse">
//               <thead>
//                 <tr className="text-[rgb(var(--outline-variant))] text-[11px] font-bold border-b border-[rgb(var(--outline-variant))/0.2]">
//                   <th className="px-6 py-5">اسم الطالب</th>
//                   <th className="px-6 py-5">الرقم العسكري</th>
//                   <th className="px-6 py-5">الشهر</th>
//                   <th className="px-6 py-5">المبلغ</th>
//                   <th className="px-6 py-5 text-center">الحالة</th>
//                   <th className="px-6 py-5 text-center">الإيصال</th>
//                   <th className="px-6 py-5 text-center">القرار</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[rgb(var(--outline-variant))/0.1]">
//                 {filteredData.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="text-center py-10 text-stone-400 font-medium">
//                       لا توجد طلبات أو إيصالات مرفوعة حالياً.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredData.map((item) => (
//                     <tr
//                       key={`${item.studentId}-${item.monthId}`}
//                       className={`transition-colors ${
//                         item.status === 'under_review' ? 'bg-amber-50/40' :
//                         item.status === 'paid'         ? 'bg-green-50/30' :
//                         item.status === 'late'         ? 'bg-red-50/20'   :
//                         'hover:bg-stone-50'
//                       }`}
//                     >
//                       <td className="px-6 py-5 font-bold text-stone-800">{item.name}</td>
//                       <td className="px-6 py-5 font-mono text-sm text-stone-500">{item.militaryId}</td>
//                       <td className="px-6 py-5 text-stone-600 font-medium">{item.monthName}</td>
//                       <td className="px-6 py-5 font-black text-stone-900">{item.amount} ج.م</td>
                      
//                       <td className="px-6 py-5 text-center">
//                         <StatusBadge status={item.status} />
//                       </td>

//                       <td className="px-6 py-5 text-center">
//                         <a
//                           href={item.receiptImg}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="inline-flex items-center gap-1 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
//                         >
//                           <span className="material-symbols-outlined text-sm">open_in_new</span>
//                           عرض الإيصال
//                         </a>
//                       </td>

//                       <td className="px-6 py-5 text-center">
//                         {item.status === 'under_review' && (
//                           <div className="flex gap-2 justify-center">
//                             <button
//                               onClick={() => handleVerify(item.studentId, item.monthId, 'approve')}
//                               className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
//                             >
//                               <span className="material-symbols-outlined text-sm">check</span>
//                               قبول
//                             </button>
//                             <button
//                               onClick={() => handleVerify(item.studentId, item.monthId, 'reject')}
//                               className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
//                             >
//                               <span className="material-symbols-outlined text-sm">close</span>
//                               رفض
//                             </button>
//                           </div>
//                         )}

//                         {item.status === 'paid' && (
//                           <span className="text-green-600 text-xs font-bold flex items-center justify-center gap-1">
//                             <span className="material-symbols-outlined text-sm">verified</span>
//                             تم الاعتماد
//                           </span>
//                         )}

//                         {item.status === 'late' && (
//                           <span className="text-red-500 text-xs font-bold flex items-center justify-center gap-1">
//                             <span className="material-symbols-outlined text-sm">cancel</span>
//                             مرفوض
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PaymentAdmin;



































import React, { useState, useEffect } from 'react';
import { FiShield, FiCreditCard, FiCheck, FiX, FiExternalLink, FiSearch } from "react-icons/fi";
import StatsGrid from "../../components/PaymentComponents/Admin/StatsGrid";
import SearchBar from '../../components/SearchBar';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/payments';
const BACKEND_SERVER_URL = 'http://localhost:5000';

const getAuthHeader = () => {
  let token = localStorage.getItem('token')
    || localStorage.getItem('digilians_token')
    || localStorage.getItem('adminToken');

  if (!token) {
    const keys = ['authData', 'digilians_user', 'user', 'admin', 'adminData'];
    for (const key of keys) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          token = parsed?.token || parsed?.data?.token || parsed?.state?.token;
          if (token) break;
        }
      } catch (e) {}
    }
  }
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const StatusBadge = ({ status }) => {
  const config = {
    paid:         { text: 'مقبول',        css: 'bg-green-50 text-green-700 border-green-200' },
    under_review: { text: 'قيد المراجعة',  css: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' },
    late:         { text: 'مرفوض',        css: 'bg-red-50 text-red-700 border-red-200' },
    pending:      { text: 'قيد الانتظار',  css: 'bg-gray-50 text-gray-500 border-gray-200' },
  };
  const c = config[status] || config.late;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${c.css}`}>
      {c.text}
    </span>
  );
};

const PaymentAdmin = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadAdminData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/all-payments`, {
        headers: getAuthHeader()
      });
      if (response.data?.success) {
        setStudents(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    loadAdminData();
    const interval = setInterval(loadAdminData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async (studentId, monthId, action) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/verify-payment`,
        { studentId, monthId, action },
        { headers: getAuthHeader() }
      );

      if (response.data?.success) {
        setStudents(prev => prev.map(student => {
          if (student._id !== studentId) return student;
          return {
            ...student,
            months: student.months.map(month => {
              if (month._id !== monthId) return month;
              return {
                ...month,
                status: action === 'approve' ? 'paid' : 'late',
                receiptUrl: month.receiptUrl 
              };
            })
          };
        }));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ أثناء تحديث حالة الدفع');
    }
  };

  const allRows = [];
  students.forEach(student => {
    if (!student.months) return;
    student.months.forEach(month => {
      if (!month.receiptUrl) return; 

      allRows.push({
        studentId: student._id,
        name: student.studentName,
        militaryId: student.militaryId || "0000000000",
        monthId: month._id,
        monthName: month.monthName,
        amount: month.amount,
        status: month.status,
        receiptImg: `${BACKEND_SERVER_URL}${month.receiptUrl}`
      });
    });
  });

  const filteredData = allRows.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.militaryId && item.militaryId.includes(term))
    );
  });

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* 🌟 الهيدر الجديد الفخم باللون العسكري والدوائر */}
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <FiShield />
                  الشئون المالية والإدارية
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  إدارة ومراجعة مصاريف الطلاب
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  مراجعة واعتماد إيصالات الدفع المرفوعة وتحديث الحسابات المالية حياً
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <FiCreditCard size={36} />
              </div>
            </div>
          </div>

          {/* الإحصائيات الفوقية */}
          {/* <div className="mb-6">
            <StatsGrid students={students} />
          </div> */}

          {/* الفلترة والبحث السريع */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-right w-full md:w-auto">
              <span className="text-gray-500 font-bold text-sm">إجمالي طلبات المراجعة الحالية: </span>
              <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">{filteredData.length} طلب</span>
            </div>
            <div className="w-full md:w-80 relative">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>

          {/* جدول عرض البيانات */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-200">
                    <th className="px-6 py-4">اسم الطالب</th>
                    <th className="px-6 py-4">الرقم العسكري</th>
                    <th className="px-6 py-4">الشهر المستهدف</th>
                    <th className="px-6 py-4">المبلغ</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">الإيصال المرفق</th>
                    <th className="px-6 py-4 text-center">الإجراء والقرار</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-gray-400 font-bold text-sm">
                        لا توجد طلبات إيصالات مرفوعة حالياً بانتظار اتخاذ إجراء.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={`${item.studentId}-${item.monthId}`} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{item.name}</td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 font-bold">{item.militaryId}</td>
                        <td className="px-6 py-4 text-gray-700 font-medium">{item.monthName}</td>
                        <td className="px-6 py-4 font-black text-gray-900">{item.amount} ج.م</td>
                        
                        <td className="px-6 py-4 text-center">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-6 py-4 text-center">
                          <a
                            href={item.receiptImg}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50/60 px-3 py-1 rounded-lg border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
                          >
                            <FiExternalLink size={13} />
                            عرض الإيصال
                          </a>
                        </td>

                        <td className="px-6 py-4 text-center">
                          {item.status === 'under_review' && (
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleVerify(item.studentId, item.monthId, 'approve')}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                              >
                                <FiCheck /> قبول
                              </button>
                              <button
                                onClick={() => handleVerify(item.studentId, item.monthId, 'reject')}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                              >
                                <FiX /> رفض
                              </button>
                            </div>
                          )}

                          {item.status === 'paid' && (
                            <span className="text-green-600 text-xs font-bold inline-flex items-center gap-1 justify-center bg-green-50 px-2 py-1 rounded-md border border-green-200">
                              <FiCheck /> تم الاعتماد
                            </span>
                          )}

                          {item.status === 'late' && (
                            <span className="text-red-500 text-xs font-bold inline-flex items-center gap-1 justify-center bg-red-50 px-2 py-1 rounded-md border border-red-200">
                              <FiX /> مرفوض
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PaymentAdmin;