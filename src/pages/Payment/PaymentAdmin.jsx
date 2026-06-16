import client, { getToken } from '../../api/client';
import axios from 'axios';
import { FiCheck, FiX, FiExternalLink, FiShield, FiCreditCard } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';




const getAuthHeader = () => {
  const token = localStorage.getItem('digilians_token');
  return token ? { Authorization: `Bearer ${token}` } : null;
};

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/payments`;
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;

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
      // جلب ALL الشهور - سواء عندهم receipt أو لأ
      allRows.push({
        studentId: student._id,
        name: student.studentName,
        militaryId: student.militaryId || "0000000000",
        monthId: month._id,
        monthName: month.monthName,
        amount: month.amount,
        status: month.status,
        receiptImg: month.receiptUrl ? (month.receiptUrl.startsWith('data:') ? month.receiptUrl : `${BACKEND_SERVER_URL}${month.receiptUrl}`) : null
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
                          {item.receiptImg ? (
                            <a
                              href={item.receiptImg}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-blue-600 bg-blue-50/60 px-3 py-1 rounded-lg border border-blue-200 text-xs font-bold hover:bg-blue-100 transition-colors"
                            >
                              <FiExternalLink size={13} />
                              عرض الإيصال
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs">لم يتم الرفع</span>
                          )}
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

                          {item.status === 'pending' && (
                            <span className="text-gray-500 text-xs font-bold inline-flex items-center gap-1 justify-center bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                              بانتظار الدفع
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
