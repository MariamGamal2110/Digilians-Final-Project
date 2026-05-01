import React, { useState } from 'react';

const MedicalAdmin = () => {
  // بيانات الحالات
  const [students] = useState([
    { id: '52687', name: 'فهد بن ناصر العتيبي', diagnosis: 'ربو حاد (نوبة موسمية)', meds: 'فنتولين بخاخ / ٤ ساعات', phone: '010XXXXX92', status: 'نقل طارئ', statusColor: 'bg-red-50 text-red-700 border-red-100' },
    { id: '23857', name: 'سلطان محمد الشمري', diagnosis: 'حساسية طعام شديدة', meds: 'إيبيبن (عند اللزوم)', phone: '010XXXXX14', status: 'تحت المراقبة', statusColor: 'bg-amber-50 text-amber-700 border-amber-100' },
    { id: '65327', name: 'خالد عبدالله الدوسري', diagnosis: 'كسر إجهادي (الساق)', meds: 'مسكنات / راحة تامة', phone: '010XXXXX88', status: 'مستقر', statusColor: 'bg-stone-100 text-stone-600 border-stone-200' },
    { id: '96328', name: 'محمد فيصل المطيري', diagnosis: 'التهاب الجيوب الأنفية', meds: 'مضاد حيوي ٥٠٠ ملجم', phone: '010XXXXX33', status: 'مستقر', statusColor: 'bg-stone-100 text-stone-600 border-stone-200' },
  ]);

  // حساب الإحصائيات
  const totalStudentsCount = 1284;
  const patientsCount = students.length;
  const criticalCases = students.filter(s => s.status === 'نقل طارئ').length;
  const underObservation = students.filter(s => s.status === 'تحت المراقبة').length;

  return (
    // استخدام bg-[rgb(var(--surface))] ليرتبط بالـ root
    <div className="min-h-screen bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] font-['Cairo'] flex flex-col items-center" dir="rtl">
      
      {/* Main Content Wrapper */}
      <main className="w-full max-w-7xl pt-12 px-6 md:px-12 pb-20">
        
        {/* Page Title Section */}
        <div className="mb-12 text-right border-r-4 border-[rgb(var(--primary-container))] pr-6">
          <h2 className="text-4xl font-black text-[rgb(var(--primary-container))] mb-2 tracking-tight">إدارة السجلات الطبية - القيادة العامة</h2>
          <p className="opacity-80 font-medium">نظام المراقبة الصحية المركزية | الأكاديمية العسكرية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon="groups" label="إجمالي الطلاب" value={totalStudentsCount} />
          <StatCard icon="emergency" label="حالات حرجة" value={criticalCases} isCritical />
          <StatCard icon="pill" label="عدد المرضى حالياً" value={patientsCount} />
          <StatCard icon="local_hospital" label="بانتظار إجراء" value={underObservation} />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Table Section */}
          <div className="col-span-12 lg:col-span-9 bg-[rgb(var(--surface-container-lowest))] rounded-2xl shadow-sm border border-[rgb(var(--outline-variant))/0.3] overflow-hidden glass-card">
            <div className="px-8 py-6 flex justify-between items-center border-b border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--primary-container))/0.03]">
              <h3 className="font-bold text-[rgb(var(--primary-container))] text-xl">نظرة عامة على الحالة الصحية</h3>
              <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">تحديث مباشر</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-[rgb(var(--surface-container-high))/0.5]">
                  <tr className="text-[11px] font-bold uppercase tracking-widest opacity-60 border-b border-[rgb(var(--outline-variant))/0.2]">
                    <th className="px-8 py-4">الرقم العسكري</th>
                    <th className="px-8 py-4">اسم الطالب</th>
                    <th className="px-8 py-4">التشخيص</th>
                    <th className="px-8 py-4">الأدوية</th>
                    <th className="px-8 py-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[rgb(var(--outline-variant))/0.1]">
                  {students.map((student, idx) => (
                    <tr key={idx} className="hover:bg-[rgb(var(--surface-container-low))] transition-colors group">
                      <td className="px-8 py-5 font-mono text-xs opacity-50">{student.id}</td>
                      <td className="px-8 py-5 font-bold text-[rgb(var(--on-surface))] group-hover:text-[rgb(var(--primary-container))]">{student.name}</td>
                      <td className="px-8 py-5 opacity-80">{student.diagnosis}</td>
                      <td className="px-8 py-5 opacity-60 text-xs">{student.meds}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${student.statusColor}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Emergency Sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-[rgb(var(--primary-container))] rounded-2xl p-6 shadow-xl text-[rgb(var(--on-primary-container))] relative overflow-hidden satin-gradient">
              <h3 className="font-bold mb-4 flex items-center justify-between relative z-10">
                تنبيهات طارئة 
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              </h3>
              
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 mb-4 relative z-10">
                <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-tighter">إجراء فوري مطلوب</p>
                <p className="text-sm font-bold mb-2">حالة نقل نشطة</p>
                <p className="text-[11px] opacity-70 leading-relaxed mb-4">فهد العتيبي: نوبة موسمية حادة تحتاج تأكيد الإخلاء الطبي.</p>
                <button className="w-full bg-[rgb(var(--on-primary-container))] text-[rgb(var(--primary-container))] py-2.5 rounded-lg text-xs font-black hover:bg-white transition-all uppercase tracking-widest">تأكيد النقل</button>
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-[rgb(var(--surface-container))] p-6 rounded-2xl border border-[rgb(var(--outline-variant))/0.5]">
               <h4 className="text-[rgb(var(--primary-container))] font-bold text-sm mb-3">الدعم الطبي</h4>
               <p className="text-xs opacity-60 mb-4">في حال وجود استفسار فني حول السجلات:</p>
               <div className="flex items-center gap-3 text-[rgb(var(--primary-container))] opacity-80">
                 <span className="material-symbols-outlined text-lg">support_agent</span>
                 <span className="text-xs font-bold">900-ACADEMY-MED</span>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// مكون الكروت المساعدة Stats
const StatCard = ({ icon, label, value, isCritical }) => (
  <div className={`bg-[rgb(var(--surface-container-low))] p-6 rounded-2xl shadow-sm border-b-4 transition-all hover:translate-y-[-4px] border-[rgb(var(--outline-variant))/0.5] ${isCritical ? 'border-b-red-500' : 'border-b-[rgb(var(--primary-container))]'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[rgb(var(--surface-container-high))] ${isCritical ? 'text-red-600' : 'text-[rgb(var(--primary-container))]'}`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-3xl font-black text-[rgb(var(--on-surface))]">{value}</p>
  </div>
);

export default MedicalAdmin;