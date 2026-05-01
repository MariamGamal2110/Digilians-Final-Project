import React from 'react';

const StatCard = ({ title, count, icon, colorClass, label }) => (
  <div className={`bg-[rgb(var(--surface-container-low))] p-6 rounded-2xl border-b-4 ${colorClass} shadow-sm transition-all hover:translate-y-[-4px] hover:shadow-md glass-card`}>
    <div className="flex justify-between items-start mb-4">
      <span className="text-[rgb(var(--on-surface))] opacity-50 font-bold text-xs uppercase tracking-tight">{title}</span>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[rgb(var(--surface-container-high))]">
        <span className="material-symbols-outlined text-[rgb(var(--primary-container))]">{icon}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-black text-[rgb(var(--on-surface))]">{count}</span>
      <span className="text-xs font-bold text-[rgb(var(--on-surface))] opacity-40">طالب</span>
    </div>
    <div className="mt-4 text-[10px] text-[rgb(var(--primary-container))] uppercase tracking-widest font-black opacity-60">
      {label}
    </div>
  </div>
);

const StatsGrid = ({ total, paid, late }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <StatCard 
        title="إجمالي المسجلين" 
        count={total} 
        icon="groups" 
        // لون محايد من لوحة ألوانك
        colorClass="border-[rgb(var(--outline-variant))]" 
        label="القوة الإجمالية للدفعات"
      />
      <StatCard 
        title="طلاب تم السداد" 
        count={paid} 
        icon="check_circle" 
        // استخدام لون الـ primary ليدل على النجاح/السداد
        colorClass="border-[rgb(var(--primary-container))]" 
        label="تم التحقق من الإيصالات"
      />
      <StatCard 
        title="طلاب متأخرين" 
        count={late} 
        icon="error" 
        // لون أحمر خفيف للتحذير مع الحفاظ على روح التصميم
        colorClass="border-[#991b1b]" 
        label="بحاجة لمتابعة مالية"
      />
    </section>
  );
};

export default StatsGrid;