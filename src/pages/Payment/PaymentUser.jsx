import React, { useState, useEffect, useCallback } from 'react';
import StatsGrid from '../../components/PaymentComponents/User/StatsGrid';
import axios from "axios";

// const API_BASE_URL = 'http://localhost:5000/api/payments';
// const BACKEND_SERVER_URL = 'http://localhost:5000';
// ✅ صح
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/payments`;
const BACKEND_SERVER_URL = import.meta.env.VITE_SERVER_URL;


const getAuthHeader = () => {
  // تحقق إن المستخدم student مش admin
  try {
    const storedUser = localStorage.getItem('digilians_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.role === 'admin') {
        console.warn("Admin cannot access student payments");
        return null;
      }
    }
  } catch (e) {
    console.error("Error parsing user data", e);
  }

  let token = localStorage.getItem('digilians_token');

  if (!token) {
    try {
      const storedUser = localStorage.getItem('authData') || localStorage.getItem('digilians_user') || localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        token = parsed?.token || parsed?.data?.token || parsed?.state?.token;
      }
    } catch (e) {
      console.error("Error parsing auth data", e);
    }
  }

  return token ? { Authorization: `Bearer ${token}` } : null;
};

const STATIC_YEAR_MONTHS = [
  { id: 1, name: 'يناير' }, { id: 2, name: 'فبراير' }, { id: 3, name: 'مارس' },
  { id: 4, name: 'أبريل' }, { id: 5, name: 'مايو' }, { id: 6, name: 'يونيو' },
  { id: 7, name: 'يوليو' }, { id: 8, name: 'أغسطس' }, { id: 9, name: 'سبتمبر' },
  { id: 10, name: 'أكتوبر' }, { id: 11, name: 'نوفمبر' }, { id: 12, name: 'ديسمبر' }
];

const SovereignLedger = () => {
  const [serverPayments, setServerPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPaymentRecords = useCallback(async () => {
    const headers = getAuthHeader();
    if (!headers || !headers.Authorization) {
      console.warn("No token found or user is admin");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/my-payments`, { headers });
      if (response.data && response.data.success) {
        const fetchedMonths = response.data.data?.months || response.data.data || [];
        setServerPayments(fetchedMonths);
      }
    } catch (err) {
      console.error('Error loading payments:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('digilians_token');
        window.location.href = '/login';
      }
    }
  }, []);

  useEffect(() => {
    loadPaymentRecords();
    const interval = setInterval(() => {
      loadPaymentRecords();
    }, 10000);
    return () => clearInterval(interval);
  }, [loadPaymentRecords]);

  const transactions = STATIC_YEAR_MONTHS.map((staticMonth) => {
    const serverMatch = Array.isArray(serverPayments)
      ? serverPayments.find((sp) => sp.monthName.includes(staticMonth.name))
      : null;

    return {
      _id: serverMatch?._id || `static-${staticMonth.id}`,
      monthName: serverMatch?.monthName || `${staticMonth.name} ${new Date().getFullYear()}`,
      amount: serverMatch?.amount || 2500,
      status: serverMatch?.status || 'late',
      receiptUrl: serverMatch?.receiptUrl || null
    };
  });

  const paidAmount = transactions.reduce((sum, item) => item.status === 'paid' ? sum + item.amount : sum, 0);
  const remainingAmount = transactions.reduce((sum, item) => (item.status === 'late' || item.status === 'pending') ? sum + item.amount : sum, 0);
  const totalAmount = paidAmount + remainingAmount;

  const handleReceiptUpload = async (monthId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (String(monthId).startsWith('static-')) {
      alert('يرجى الانتظار ثانية حتى يتم مزامنة الشهور مع السيرفر بشكل صحيح.');
      return;
    }

    const headers = getAuthHeader();
    if (!headers) {
      alert('جلسة العمل انتهت. يرجى إعادة تسجيل الدخول.');
      return;
    }

    const formData = new FormData();
    formData.append('receipt', file);
    formData.append('monthId', monthId);

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/upload-receipt`, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.success) {
        alert('تم رفع الإيصال بنجاح، وهو الآن قيد المراجعة.');
        loadPaymentRecords();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ أثناء رفع الإيصال');
    } finally {
      setLoading(false);
    }
  };

  const viewReceipt = (receiptUrl) => {
    if (!receiptUrl) return;
    window.open(`${BACKEND_SERVER_URL}${receiptUrl}`, '_blank', 'noreferrer');
  };

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">

          {/* ───── Header ───── */}
          <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                  <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                  الشئون المالية الشخصية
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  سجل المصاريف الشخصية
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  إدارة ومتابعة الالتزامات المالية والمدفوعات الخاصة بك
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontSize: 36 }}>payments</span>
              </div>
            </div>
          </div>

          {/* ───── Stats ───── */}
          <div className="mb-6">
            <StatsGrid
              totalAmount={totalAmount.toLocaleString()}
              paidAmount={paidAmount.toLocaleString()}
              remainingAmount={remainingAmount.toLocaleString()}
            />
          </div>

          {/* ───── Table count bar ───── */}
          <div className="flex justify-between items-center mb-4 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <div>
              <span className="text-gray-500 font-bold text-sm">خطة السداد السنوية: </span>
              <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">12 شهر</span>
            </div>
          </div>

          {/* ───── Table ───── */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-200">
                    <th className="px-6 py-4">الشهر المستحق</th>
                    <th className="px-6 py-4">المبلغ المطلوب</th>
                    <th className="px-6 py-4 text-center">الحالة الحالية</th>
                    <th className="px-6 py-4 text-center">الإجراء / رفع الإيصال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((item) => (
                    <tr key={item.monthName} className="hover:bg-gray-50/70 transition-colors">

                      <td className="px-6 py-4 font-bold text-gray-800">{item.monthName}</td>

                      <td className="px-6 py-4 font-black text-gray-900">{item.amount} ج.م</td>

                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="px-6 py-4 text-center">
                        {(item.status === 'late' || item.status === 'pending') && (
                          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold border border-blue-200 transition-colors">
                            <span className="material-symbols-outlined text-sm">upload_file</span>
                            رفع الإيصال
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              disabled={loading}
                              onChange={(e) => handleReceiptUpload(item._id, e)}
                            />
                          </label>
                        )}

                        {item.status === 'under_review' && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 animate-pulse">
                            قيد المراجعة من الإدارة
                          </span>
                        )}

                        {item.status === 'paid' && (
                          <button
                            onClick={() => viewReceipt(item.receiptUrl)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-200 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">verified</span>
                            مقبول (عرض الإيصال)
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const StatusBadge = ({ status }) => {
  const config = {
    paid:         { text: 'مقبول',             css: 'bg-green-50 text-green-700 border-green-200' },
    under_review: { text: 'قيد المراجعة',       css: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' },
    late:         { text: 'متأخر',             css: 'bg-red-50 text-red-700 border-red-200' },
    pending:      { text: 'قيد الانتظار',       css: 'bg-gray-50 text-gray-500 border-gray-200' },
  };
  const current = config[status] || config.late;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${current.css}`}>
      {current.text}
    </span>
  );
};

export default SovereignLedger;