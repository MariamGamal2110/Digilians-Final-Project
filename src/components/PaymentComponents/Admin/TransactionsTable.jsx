import React from 'react';

const TransactionsTable = ({data}) => {
  return (
    <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200/50">
      <div className="px-8 py-6 flex justify-between items-center border-b border-stone-100">
        <h3 className="text-xl font-bold text-[#451518]">سجل معاملات الطلاب</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-stone-100 bg-[#fbf9f8]">
              {['اسم الطالب', 'الرقم العسكري', 'الدورة', 'المبلغ', 'إيصال الدفع', 'الحالة'].map((head) => (
                <th key={head} className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {data.map((student, idx) => (
              <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                <td className="px-8 py-5 font-bold">{student.name}</td>
                <td className="px-8 py-5 text-stone-500 font-mono">{student.id}</td>
                <td className="px-8 py-5 text-stone-500">{student.duration}</td>
                <td className="px-8 py-5 font-bold text-[#451518]">{student.amount} ج.م</td>
                <td className="px-8 py-5">
                  {student.receiptImg ? (
                    <img 
                      src={student.receiptImg} 
                      alt="Receipt" 
                      className="w-10 h-10 rounded border border-stone-200 object-cover cursor-pointer hover:opacity-80"
                      onClick={() => window.open(student.receiptImg, '_blank')}
                    />
                  ) : (
                    <span className="text-[10px] text-stone-400 italic">لا يوجد إيصال</span>
                  )}
                </td>
                <td className="px-8 py-5">
                  <StatusBadge type={student.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const StatusBadge = ({ type }) => {
  const isPaid = type === 'paid';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
      isPaid ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
      {isPaid ? 'تم السداد' : 'متأخر'}
    </span>
  );
};

export default TransactionsTable;