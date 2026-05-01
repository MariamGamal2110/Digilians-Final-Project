import React, { useState, useEffect } from 'react';
import StatsGrid from "../../components/PaymentComponents/Admin/StatsGrid";
import TransactionsTable from "../../components/PaymentComponents/Admin/TransactionsTable";
import SearchBar from '../../components/SearchBar';

const PaymentAdmin = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // جلب البيانات (محاكاة)
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setStudents([
          { name: 'أحمد محمد علي', id: '20241055', duration: '4 شهور', amount: '2,000', status: 'paid', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
          { name: 'خالد محمود حسن', id: '20241081', duration: '9 شهور', amount: '2,000', status: 'late', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
          { name: 'أحمد محمد حسين', id: '20241022', duration: '4 شهور', amount: '2,000', status: 'paid', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
          { name: 'خالد اشرف حسن', id: '20241033', duration: '9 شهور', amount: '2,000', status: 'paid', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
          { name: 'أحمد سالم علي', id: '20241044', duration: '4 شهور', amount: '2,000', status: 'paid', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
          { name: 'خالد زاهر حسن', id: '20241085', duration: '9 شهور', amount: '2,000', status: 'late', receiptImg: 'https://th.bing.com/th/id/OIP.QtpGyDB5wEO7EZ02gykhewHaNL?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
        ]);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    fetchPayments();
  }, []);

  // منطق الفلترة
  const filteredData = students.filter(item => {
    const term = searchTerm.toLowerCase();
    const nameMatch = item.name ? item.name.toLowerCase().includes(term) : false;
    const idMatch = item.id ? String(item.id).includes(term) : false;
    return nameMatch || idMatch;
  });

  return (
    // استخدام bg-[rgb(var(--surface))] وتوسيط المحتوى
    <div className="bg-[rgb(var(--surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      
      {/* Container الرئيسي لضمان التوسيط max-w-7xl */}
      <main className="w-full max-w-7xl pt-24 pb-12 px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-r-4 border-[rgb(var(--primary-container))] pr-6">
          <div>
            <h2 className="text-4xl font-black text-[rgb(var(--primary-container))] mb-2 tracking-tight">إدارة المصاريف</h2>
            <p className="text-[rgb(var(--on-surface))] opacity-60 font-medium">متابعة التحصيل المالي وإيصالات الدفع الرسمية</p>
          </div>

          {/* مكون البحث مع تمرير البروبس */}
          <div className="w-full md:w-96">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
            />
          </div>
        </div>

        {/* شبكة الإحصائيات - تأكد أن مكون StatsGrid يستخدم ألوان الـ root داخلياً أيضاً */}
        <div className="mb-10 w-full">
          <StatsGrid 
            total={students.length} 
            paid={students.filter(s => s.status === 'paid').length} 
            late={students.filter(s => s.status === 'late').length}
          />
        </div>

        {/* جدول المعاملات - مغلف بـ Glass Card للاتساق مع التصميم */}
        <div className="bg-[rgb(var(--surface-container-low))] rounded-3xl border border-[rgb(var(--outline-variant))/0.3] shadow-sm overflow-hidden glass-card">
          <TransactionsTable data={filteredData} />
        </div>
        
      </main>
    </div>
  );
};

export default PaymentAdmin;