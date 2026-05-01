// import React, { useState } from 'react';
// import StatsGrid from '../../components/PaymentComponents/User/StatsGrid';

// const SovereignLedger = () => {
//   // بيانات تجريبية للسجل
//   const [transactions] = useState([
//     { month: 'مايو 2024', date: '15 مايو 2024', amount: '2,500', id: '12458', status: 'paid' },
//     { month: 'أبريل 2024', date: '20 أبريل 2024', amount: '2,500', id: '32598', status: 'pending' },
//     { month: 'مارس 2024', date: '10 مارس 2024', amount: '3,000', id: '45329', status: 'paid' },
//   ]);

//   return (
//     <div className="bg-[rgb(var(--surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      
//       <main className="w-full max-w-6xl pt-24 pb-12 px-6 lg:px-12">
        
//         {/* 1. Header Section */}
//         <header className="flex justify-between items-end mb-12 border-r-4 border-[rgb(var(--primary-container))] pr-6">
//           <div>
//             <h1 className="text-4xl font-black tracking-tight text-[rgb(var(--primary-container))] mb-2">
//               سجل المصاريف الشخصية
//             </h1>
//             <p className="text-[rgb(var(--on-surface))] opacity-70 font-medium italic">إدارة ومتابعة الالتزامات المالية والمدفوعات الخاصة بك</p>
//           </div>
//         </header>

//         {/* 2. StatsGrid Component */}
//         <div className="mb-12 w-full">
//           <StatsGrid 
//             totalAmount="12,500" 
//             paidAmount="8,000" 
//             remainingAmount="4,500" 
//           />
//         </div>

//         {/* 3. Action Area (Upload & Instructions) */}
//         <section className="bg-[rgb(var(--surface-container-high))] rounded-2xl p-1.5 gap-1.5 mb-12 flex flex-col md:flex-row shadow-sm">
          
//           {/* Upload Section (Main Content) */}
//           <div className="flex-[2] bg-white rounded-xl p-8 flex flex-col items-center justify-center border-2 border-dashed border-[rgb(var(--outline-variant))/0.5] hover:border-[rgb(var(--primary-container))/0.5] transition-all group">
//             <div className="w-14 h-14 bg-[rgb(var(--surface))] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
//               <span className="material-symbols-outlined text-[rgb(var(--outline-variant))] text-3xl group-hover:text-[rgb(var(--primary-container))]">cloud_upload</span>
//             </div>
//             <h3 className="text-lg font-bold text-[rgb(var(--primary-container))] mb-1 font-['Cairo']">رفع إيصال دفع جديد</h3>
//             <p className="text-xs opacity-60 text-center mb-5 max-w-xs font-medium">يرجى إرفاق صورة واضحة من إيصال السداد البنكي (PDF/JPG)</p>
//             <input className="hidden" id="receipt-upload" type="file" />
//             <label 
//   htmlFor="receipt-upload" 
//   className="satin-gradient text-[rgb(var(--on-primary-container))] px-8 py-3 rounded-xl font-bold text-xs cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/10"
// >
//   <span className="material-symbols-outlined text-sm text-[rgb(var(--primary-container))]">attach_file</span>
//   <span className="tracking-wide text-[rgb(var(--primary-container))]">اختيار الملف</span>
// </label>
//           </div>

//           {/* Instructions Section (Small Sidebar) */}
//           <div className="w-full md:w-72 bg-[rgb(var(--primary-container))] p-6 rounded-xl flex flex-col justify-between text-[rgb(var(--on-primary-container))] relative overflow-hidden satin-gradient shadow-lg">
//             <div>
//               <h4 className="text-sm font-bold mb-4 z-10 flex items-center gap-2 border-b border-white/20 pb-2">
//                 <span className="material-symbols-outlined text-sm">gavel</span>
//                 تعليمات هامة
//               </h4>
//               <ul className="space-y-3 text-[11px] opacity-90 leading-relaxed z-10 font-medium">
//                 <InstructionItem text="الرقم العسكري بوضوح على الإيصال." />
//                 <InstructionItem text="تتم المراجعة خلال ٤٨ ساعة عمل." />
//                 <InstructionItem text="يجب الاحتفاظ بأصل الإيصال الورقي." />
//               </ul>
//             </div>
            
//             <button className="mt-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[9px] font-bold tracking-widest transition-colors z-10 uppercase">
//               انظر جدول المصروفات
//             </button>
            
//             <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-white/5 text-7xl pointer-events-none select-none">info</span>
//           </div>
//         </section>

//         {/* 4. Transactions History Table */}
//         <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgb(var(--outline-variant))/0.3] glass-card">
//           <div className="px-8 py-6 border-b border-[rgb(var(--outline-variant))/0.2] flex justify-between items-center bg-[rgb(var(--surface-container-low))/0.5]">
//             <h3 className="text-lg font-bold text-[rgb(var(--primary-container))]">سجل العمليات السابقة</h3>
            
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-right border-collapse">
//               <thead>
//                 <tr className="text-[rgb(var(--outline-variant))] text-[11px] font-bold uppercase tracking-widest border-b border-[rgb(var(--outline-variant))/0.2]">
//                   <th className="px-8 py-5">الشهر المستحق</th>
//                   <th className="px-8 py-5">تاريخ الدفع</th>
//                   <th className="px-8 py-5">المبلغ</th>
//                   <th className="px-8 py-5">الرقم المرجعي</th>
//                   <th className="px-8 py-5 text-center">الحالة</th>
//                   <th className="px-8 py-5 text-center">الإجراء</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[rgb(var(--outline-variant))/0.1]">
//                 {transactions.map((item, index) => (
//                   <tr key={index} className="hover:bg-[rgb(var(--surface-container-low))/0.3] transition-colors group">
//                     <td className="px-8 py-6 font-bold text-[rgb(var(--primary-container))]">{item.month}</td>
//                     <td className="px-8 py-6 text-stone-500 text-sm">{item.date}</td>
//                     <td className="px-8 py-6 font-black text-[rgb(var(--on-surface))]">{item.amount} ج.م</td>
//                     <td className="px-8 py-6 font-mono text-xs text-stone-400">{item.id}</td>
//                     <td className="px-8 py-6 text-center">
//                       <StatusBadge status={item.status} />
//                     </td>
//                     <td className="px-8 py-6 text-center">
//                       <button className="text-[rgb(var(--primary-container))] hover:underline text-[10px] font-black uppercase tracking-tighter">
//                         عرض الإيصال
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* 5. Footer Layout */}
//         <footer className="mt-20 pt-10 border-t border-[rgb(var(--outline-variant))/0.3] flex flex-col items-center gap-6">
//           <div className="text-[rgb(var(--primary-container))] text-lg font-black tracking-[0.3em] flex items-center gap-6 opacity-40 select-none">
//             <span>الواجب</span>
//             <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></span>
//             <span>الشرف</span>
//             <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></span>
//             <span>الوطن</span>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// };

// // --- المكونات الفرعية (Sub-components) ---

// const InstructionItem = ({ text }) => (
//   <li className="flex gap-2 items-start">
//     <span className="material-symbols-outlined text-[14px] mt-0.5 opacity-80">verified</span>
//     <span>{text}</span>
//   </li>
// );

// const TableActionIcon = ({ icon }) => (
//   <button className="p-2 hover:bg-[rgb(var(--surface))] rounded-lg text-[rgb(var(--outline-variant))] hover:text-[rgb(var(--primary-container))] transition-colors border border-transparent hover:border-[rgb(var(--outline-variant))/0.3]">
//     <span className="material-symbols-outlined text-xl">{icon}</span>
//   </button>
// );

// const StatusBadge = ({ status }) => {
//   const isPaid = status === 'paid';
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
//       isPaid 
//       ? 'bg-green-50 text-green-700 border-green-100' 
//       : 'bg-amber-50 text-amber-700 border-amber-100'
//     }`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-green-600' : 'bg-amber-600 animate-pulse'}`}></span>
//       {isPaid ? 'تم السداد' : 'تحت المراجعة'}
//     </span>
//   );
// };

// export default SovereignLedger;
import React, { useState } from 'react';
import StatsGrid from '../../components/PaymentComponents/User/StatsGrid';

const SovereignLedger = () => {
  // بيانات تجريبية للسجل
  const [transactions, setTransactions] = useState([
    { month: 'مايو 2024', date: '15 مايو 2024', amount: '2,500', id: '12458', status: 'paid', receiptUrl: '/receipts/12458.pdf' },
    { month: 'أبريل 2024', date: '20 أبريل 2024', amount: '2,500', id: '32598', status: 'pending', receiptUrl: null },
    { month: 'مارس 2024', date: '10 مارس 2024', amount: '3,000', id: '45329', status: 'paid', receiptUrl: '/receipts/45329.pdf' },
  ]);

  // حساب الإحصائيات بناءً على المعاملات الفعلية
  const totalAmount = transactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/,/g, '')), 0);
  const paidAmount = transactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/,/g, '')), 0);
  const remainingAmount = totalAmount - paidAmount;

  // دالة رفع الإيصال
  const handleReceiptUpload = (transactionId, event) => {
    const file = event.target.files[0];
    if (file) {
      // هنا يمكنك رفع الملف إلى الخادم
      // هذا مثال باستخدام FileReader لعرض معاينة مؤقتة
      const reader = new FileReader();
      reader.onloadend = () => {
        // تحديث حالة المعاملة
        setTransactions(prevTransactions =>
          prevTransactions.map(trans =>
            trans.id === transactionId
              ? { 
                  ...trans, 
                  status: 'paid', 
                  receiptUrl: reader.result // في التطبيق الحقيقي، استخدم URL من الخادم
                }
              : trans
          )
        );
      };
      reader.readAsDataURL(file);
      
      // في التطبيق الحقيقي، يمكنك استخدام fetch أو axios لرفع الملف
      // const formData = new FormData();
      // formData.append('receipt', file);
      // formData.append('transactionId', transactionId);
      // fetch('/api/upload-receipt', { method: 'POST', body: formData })
      //   .then(res => res.json())
      //   .then(data => {
      //     if (data.success) {
      //       // تحديث الحالة
      //     }
      //   });
    }
  };

  // دالة عرض الإيصال
  const viewReceipt = (receiptUrl) => {
    if (receiptUrl) {
      window.open(receiptUrl, '_blank');
    }
  };

  return (
    <div className="bg-[rgb(var(--surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      
      <main className="w-full max-w-6xl pt-24 pb-12 px-6 lg:px-12">
        
        {/* 1. Header Section */}
        <header className="flex justify-between items-end mb-12 border-r-4 border-[rgb(var(--primary-container))] pr-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[rgb(var(--primary-container))] mb-2">
              سجل المصاريف الشخصية
            </h1>
            <p className="text-[rgb(var(--on-surface))] opacity-70 font-medium italic">إدارة ومتابعة الالتزامات المالية والمدفوعات الخاصة بك</p>
          </div>
        </header>

        {/* 2. StatsGrid Component */}
        <div className="mb-12 w-full">
          <StatsGrid 
            totalAmount={totalAmount.toLocaleString()} 
            paidAmount={paidAmount.toLocaleString()} 
            remainingAmount={remainingAmount.toLocaleString()} 
          />
        </div>

        {/* 3. Action Area (Upload & Instructions) */}
        <section className="bg-[rgb(var(--surface-container-high))] rounded-2xl p-1.5 gap-1.5 mb-12 flex flex-col md:flex-row shadow-sm">
          
          {/* Upload Section (Main Content) */}
          <div className="flex-[2] bg-white rounded-xl p-8 flex flex-col items-center justify-center border-2 border-dashed border-[rgb(var(--outline-variant))/0.5] hover:border-[rgb(var(--primary-container))/0.5] transition-all group">
            <div className="w-14 h-14 bg-[rgb(var(--surface))] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner">
              <span className="material-symbols-outlined text-[rgb(var(--outline-variant))] text-3xl group-hover:text-[rgb(var(--primary-container))]">cloud_upload</span>
            </div>
            <h3 className="text-lg font-bold text-[rgb(var(--primary-container))] mb-1 font-['Cairo']">رفع إيصال دفع جديد</h3>
            <p className="text-xs opacity-60 text-center mb-5 max-w-xs font-medium">يرجى إرفاق صورة واضحة من إيصال السداد البنكي (PDF/JPG)</p>
            <input className="hidden" id="receipt-upload" type="file" />
            <label 
              htmlFor="receipt-upload" 
              className="satin-gradient text-[rgb(var(--on-primary-container))] px-8 py-3 rounded-xl font-bold text-xs cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/10"
            >
              <span className="material-symbols-outlined text-sm text-[rgb(var(--primary-container))]">attach_file</span>
              <span className="tracking-wide text-[rgb(var(--primary-container))]">اختيار الملف</span>
            </label>
          </div>

          {/* Instructions Section (Small Sidebar) */}
          <div className="w-full md:w-72 bg-[rgb(var(--primary-container))] p-6 rounded-xl flex flex-col justify-between text-[rgb(var(--on-primary-container))] relative overflow-hidden satin-gradient shadow-lg">
            <div>
              <h4 className="text-sm font-bold mb-4 z-10 flex items-center gap-2 border-b border-white/20 pb-2">
                <span className="material-symbols-outlined text-sm">gavel</span>
                تعليمات هامة
              </h4>
              <ul className="space-y-3 text-[11px] opacity-90 leading-relaxed z-10 font-medium">
                <InstructionItem text="الرقم العسكري بوضوح على الإيصال." />
                <InstructionItem text="تتم المراجعة خلال ٤٨ ساعة عمل." />
                <InstructionItem text="يجب الاحتفاظ بأصل الإيصال الورقي." />
              </ul>
            </div>
            
            <button className="mt-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[9px] font-bold tracking-widest transition-colors z-10 uppercase">
              انظر جدول المصروفات
            </button>
            
            <span className="material-symbols-outlined absolute -bottom-4 -left-4 text-white/5 text-7xl pointer-events-none select-none">info</span>
          </div>
        </section>

        {/* 4. Transactions History Table */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgb(var(--outline-variant))/0.3] glass-card">
          <div className="px-8 py-6 border-b border-[rgb(var(--outline-variant))/0.2] flex justify-between items-center bg-[rgb(var(--surface-container-low))/0.5]">
            <h3 className="text-lg font-bold text-[rgb(var(--primary-container))]">سجل العمليات السابقة</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="text-[rgb(var(--outline-variant))] text-[11px] font-bold uppercase tracking-widest border-b border-[rgb(var(--outline-variant))/0.2]">
                  <th className="px-8 py-5">الشهر المستحق</th>
                  <th className="px-8 py-5">تاريخ الدفع</th>
                  <th className="px-8 py-5">المبلغ</th>
                  <th className="px-8 py-5">الرقم المرجعي</th>
                  <th className="px-8 py-5 text-center">الحالة</th>
                  <th className="px-8 py-5 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--outline-variant))/0.1]">
                {transactions.map((item, index) => (
                  <tr key={index} className="hover:bg-[rgb(var(--surface-container-low))/0.3] transition-colors group">
                    <td className="px-8 py-6 font-bold text-[rgb(var(--primary-container))]">{item.month}</td>
                    <td className="px-8 py-6 text-stone-500 text-sm">{item.date}</td>
                    <td className="px-8 py-6 font-black text-[rgb(var(--on-surface))]">{item.amount} ج.م</td>
                    <td className="px-8 py-6 font-mono text-xs text-stone-400">{item.id}</td>
                    <td className="px-8 py-6 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-8 py-6 text-center">
                      {item.status === 'pending' ? (
                        // زر رفع الإيصال للمعاملات المعلقة
                        <label className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[11px] font-bold transition-all border border-blue-200">
                          <span className="material-symbols-outlined text-sm">upload_file</span>
                          <span>رفع الإيصال</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleReceiptUpload(item.id, e)}
                          />
                        </label>
                      ) : (
                        // زر عرض الإيصال للمعاملات المدفوعة
                        <button
                          onClick={() => viewReceipt(item.receiptUrl)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-[11px] font-bold transition-all border border-green-200"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          <span>عرض الإيصال</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Footer Layout */}
        <footer className="mt-20 pt-10 border-t border-[rgb(var(--outline-variant))/0.3] flex flex-col items-center gap-6">
          <div className="text-[rgb(var(--primary-container))] text-lg font-black tracking-[0.3em] flex items-center gap-6 opacity-40 select-none">
            <span>الواجب</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></span>
            <span>الشرف</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></span>
            <span>الوطن</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

// --- المكونات الفرعية (Sub-components) ---

const InstructionItem = ({ text }) => (
  <li className="flex gap-2 items-start">
    <span className="material-symbols-outlined text-[14px] mt-0.5 opacity-80">verified</span>
    <span>{text}</span>
  </li>
);

const StatusBadge = ({ status }) => {
  const isPaid = status === 'paid';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
      isPaid 
      ? 'bg-green-50 text-green-700 border-green-100' 
      : 'bg-amber-50 text-amber-700 border-amber-100'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-green-600' : 'bg-amber-600 animate-pulse'}`}></span>
      {isPaid ? 'تم السداد' : 'تحت المراجعة'}
    </span>
  );
};

export default SovereignLedger;
