import React, { useState, useEffect, useCallback } from 'react';
import StatsGrid from '../../components/PaymentComponents/User/StatsGrid';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/payments';
const BACKEND_SERVER_URL = 'http://localhost:5000'; 

// 🔐 دالة جلب التوكن الذكية من الـ LocalStorage
const getAuthHeader = () => {
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

// 📅 مصفوفة الشهور الثابتة للمطابقة النصية لترتيب الـ 12 شهر بالتوالي
const STATIC_YEAR_MONTHS = [
  { id: 1, name: 'يناير' }, { id: 2, name: 'فبراير' }, { id: 3, name: 'مارس' },
  { id: 4, name: 'أبريل' }, { id: 5, name: 'مايو' }, { id: 6, name: 'يونيو' },
  { id: 7, name: 'يوليو' }, { id: 8, name: 'أغسطس' }, { id: 9, name: 'سبتمبر' },
  { id: 10, name: 'أكتوبر' }, { id: 11, name: 'نوفمبر' }, { id: 12, name: 'ديسمبر' }
];

const SovereignLedger = () => {
  const [serverPayments, setServerPayments] = useState([]);
  const [loading, setLoading] = useState(false);

//   // 📡 جلب البيانات من الباك إند
//   const loadPaymentRecords = useCallback(async () => {
//     const headers = getAuthHeader();
//     if (!headers) return;

//     try {
//       const response = await axios.get(`${API_BASE_URL}/my-payments`, { headers });
//       if (response.data && response.data.success) {
//         // ✅ سحب مصفوفة الشهور المحدثة القادمة من السيرفر مباشرة
//         const fetchedMonths = response.data.data?.months || [];
//         setServerPayments(fetchedMonths);
//       }
//     } catch (err) {
//       console.error('Error loading payments:', err);
//     }
//   }, []);

// useEffect(() => {
//   loadPaymentRecords();

//   // ✅ refresh تلقائي كل 10 ثواني
//   const interval = setInterval(() => {
//     loadPaymentRecords();
//   }, 10000);

//   return () => clearInterval(interval);
// }, [loadPaymentRecords]);



// 1. تأكدي أن دالة جلب البيانات مكتوبة بالشكل ده ومفيش جواها حاجة بتمسح الـ Token تلقائي
const loadPaymentRecords = useCallback(async () => {
  const headers = getAuthHeader();
  if (!headers || !headers.Authorization) {
    console.warn("No token found");
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
    // 🚨 لو الـ Token انتهت صلاحيته فعلياً من الباك إند (401 أو 403) يوجهه للوجن
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('digilians_token'); // تنظيف التوكن البايظ
      window.location.href = '/login'; 
    }
  }
}, []);

// 2. ⏳ المكان الصحيح للـ Auto-Refresh التلقائي بدون تهنيج
useEffect(() => {
  // جلب البيانات أول ما الصفحة تفتح
  loadPaymentRecords();

  // عمل تحديث دوري (Auto-refresh) كل 10 ثواني حياً
  const interval = setInterval(() => {
    loadPaymentRecords();
  }, 10000);

  // تنظيف الـ Interval عند مغادرة الصفحة منعاً لتكرار الطلبات وتخريب الـ Login
  return () => clearInterval(interval);
}, [loadPaymentRecords]);



  // 🔀 دمج البيانات وعمل الـ Mapping الديناميكي المحدث لقراءة حالة وحسابات السيرفر فوراً
  const transactions = STATIC_YEAR_MONTHS.map((staticMonth) => {
    const serverMatch = Array.isArray(serverPayments) 
      ? serverPayments.find((sp) => sp.monthName.includes(staticMonth.name))
      : null;

    return {
      // إذا وجد البيانات في السيرفر يأخذ الـ id والحالة والمبلغ الفعليين منه، وإلا يضع القيم الافتراضية
      _id: serverMatch?._id || `static-${staticMonth.id}`, 
      monthName: serverMatch?.monthName || `${staticMonth.name} ${new Date().getFullYear()}`,
      amount: serverMatch?.amount || 2500, 
      status: serverMatch?.status || 'late', // الحالات: 'paid', 'under_review', 'late', 'pending'
      receiptUrl: serverMatch?.receiptUrl || null
    };
  });

  // 🧮 حساب الإحصائيات الحية بناءً على الحالات المحدثة من السيرفر مباشرة
  const paidAmount = transactions.reduce((sum, item) => item.status === 'paid' ? sum + item.amount : sum, 0);
  const remainingAmount = transactions.reduce((sum, item) => (item.status === 'late' || item.status === 'pending') ? sum + item.amount : sum, 0);
  const totalAmount = paidAmount + remainingAmount;

  // 📤 دالة رفع الإيصال باستخدام الـ monthId
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
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.success) {
        alert('تم رفع الإيصال بنجاح، وهو الآن قيد المراجعة.');
        loadPaymentRecords(); // تحديث فوري للحالة بعد الرفع مباشرة لتبديل الزر لـ "قيد المراجعة"
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
    <div className="bg-[rgb(var(--surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      <main className="w-full max-w-6xl pt-24 pb-12 px-6 lg:px-12">
        
        <header className="flex justify-between items-end mb-12 border-r-4 border-[rgb(var(--primary-container))] pr-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[rgb(var(--primary-container))] mb-2">
              سجل المصاريف الشخصية
            </h1>
            <p className="text-[rgb(var(--on-surface))] opacity-70 font-medium italic">إدارة ومتابعة الالتزامات المالية والمدفوعات الخاصة بك</p>
          </div>
        </header>

        <div className="mb-12 w-full">
          <StatsGrid 
            totalAmount={totalAmount.toLocaleString()} 
            paidAmount={paidAmount.toLocaleString()} 
            remainingAmount={remainingAmount.toLocaleString()} 
          />
        </div>

        {/* جدول خطة السداد */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgb(var(--outline-variant))/0.3] glass-card">
          <div className="px-8 py-6 border-b border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--surface-container-low))/0.5]">
            <h3 className="text-lg font-bold text-[rgb(var(--primary-container))]">خطة السداد السنوية (12 شهر)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="text-[rgb(var(--outline-variant))] text-[11px] font-bold uppercase tracking-widest border-b border-[rgb(var(--outline-variant))/0.2]">
                  <th className="px-8 py-5">الشهر المستحق</th>
                  <th className="px-8 py-5">المبلغ المطلوب</th>
                  <th className="px-8 py-5 text-center">الحالة الحالية</th>
                  <th className="px-8 py-5 text-center">الإجراء / رفع الإيصال</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--outline-variant))/0.1]">
                {transactions.map((item) => (
                  <tr key={item.monthName} className="hover:bg-[rgb(var(--surface-container-low))/0.3] transition-colors">
                    
                    <td className="px-8 py-6 font-bold text-[rgb(var(--primary-container))]">
                      {item.monthName}
                    </td>
                    
                    <td className="px-8 py-6 font-black text-[rgb(var(--on-surface))]">
                      {item.amount} ج.م
                    </td>
                    
                    <td className="px-8 py-6 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    
                    <td className="px-8 py-6 text-center">
                      {/* ✅ الزر يظهر في حالة الرفض (late) أو الانتظار (pending) تلقائياً */}
                      {(item.status === 'late' || item.status === 'pending') && (
                        <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-bold border border-blue-200">
                          <span className="material-symbols-outlined text-sm">upload_file</span>
                          <span>رفع الإيصال</span>
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
                        <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 animate-pulse">
                          قيد المراجعة من الإدارة
                        </span>
                      )}

                      {item.status === 'paid' && (
                        <button
                          onClick={() => viewReceipt(item.receiptUrl)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-[11px] font-bold border border-green-200"
                        >
                          <span className="material-symbols-outlined text-sm">verified</span>
                          <span>مقبول (عرض الإيصال)</span>
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// 🎨 مكون الحالات والألوان الديناميكي المحدث
const StatusBadge = ({ status }) => {
  const config = {
    paid: { text: 'مقبول', css: 'bg-green-50 text-green-700 border-green-100' },
    under_review: { text: 'قيد المراجعة', css: 'bg-amber-50 text-amber-700 border-amber-100' },
    late: { text: 'متأخر', css: 'bg-red-50 text-red-700 border-red-100' },
    pending: { text: 'قيد الانتظار', css: 'bg-gray-50 text-gray-600 border-gray-200' } 
  };
  const current = config[status] || config.late;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${current.css}`}>
      {current.text}
    </span>
  );
};

export default SovereignLedger;









