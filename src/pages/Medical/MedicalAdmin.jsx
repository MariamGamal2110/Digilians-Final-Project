// Digilians-Final-Project/src/pages/Medical/MedicalAdmin.jsx
import React, { useEffect, useState } from 'react';
import { fetchMedicalRecordsAdmin, fetchMedicalStats, updateMedicalStatus } from '../../api/medical';

const STATUS_LABELS = {
  'قيد المراجعة': 'بانتظار المراجعة',
  'حرج': 'حرج',
  'تم قبول': 'تم قبول',
};

const FILTER_OPTIONS = [
  { id: 'pending', icon: 'hourglass_top', label: 'بانتظار المراجعة', status: 'قيد المراجعة' },
  { id: 'urgent', icon: 'priority_high', label: 'حرج', status: 'حرج' },
  { id: 'approved', icon: 'check_circle', label: 'تم قبول', status: 'تم قبول' },
];

const getStatusColor = (status) => {
  if (status === 'حرج') return 'bg-red-50 text-red-700 border-red-100';
  if (status === 'قيد المراجعة') return 'bg-amber-50 text-amber-700 border-amber-100';
  if (status === 'تم قبول') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  return 'bg-stone-100 text-stone-600 border-stone-200';
};

const MedicalAdmin = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ totalStudentsCount: 0, uniquePatientsCount: 0 });
  const [filterStatus, setFilterStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState('');

  const loadRecords = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      console.log('📥 Loading medical records...');
      const recordsData = await fetchMedicalRecordsAdmin();
      
      const records = Array.isArray(recordsData) ? recordsData : recordsData?.data || [];
      console.log('📥 Loaded records extracted:', records);
      
      const groupedRecords = new Map();

      records.forEach((record) => {
        if (!record) return;
        const key = (
          record.studentEmail || record.user || record.militaryId || record.studentName || record._id
        )
          ?.toString()
          ?.toLowerCase() || 'unknown';

        const existing = groupedRecords.get(key) || {
          id: record._id,
          militaryId: record.militaryId,
          name: record.studentName || 'طالب مجهول',
          diagnosis: [],
          meds: new Set(),
          phone: record.emergencyContact || '---',
          status: record.status || 'قيد المراجعة',
          studentEmail: record.studentEmail || '',
          latestTimestamp: new Date(record.createdAt || record.updatedAt || Date.now()),
        };

        existing.diagnosis.push(record.symptoms || '---');
        if (record.medications) existing.meds.add(record.medications);

        const recordDate = new Date(record.createdAt || record.updatedAt || Date.now());
        if (recordDate > existing.latestTimestamp) {
          existing.latestTimestamp = recordDate;
          existing.status = record.status || existing.status;
          existing.phone = record.emergencyContact || existing.phone;
        }

        groupedRecords.set(key, existing);
      });

      setStudents(
        Array.from(groupedRecords.values()).map((group) => ({
          id: group.id,
          militaryId: group.militaryId,
          name: group.name,
          diagnosis: group.diagnosis.join(' • '),
          meds: group.meds.size > 0 ? Array.from(group.meds).join(' • ') : '---',
          phone: group.phone,
          status: group.status,
          statusColor: getStatusColor(group.status),
          studentEmail: group.studentEmail || group.id,
        })),
      );
    } catch (err) {
      console.error(err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const medicalStats = await fetchMedicalStats();
      setStats(medicalStats || { totalStudentsCount: 0, uniquePatientsCount: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRecords();
    loadStats();
  }, []);

  const pendingCount = students.filter((s) => s.status === 'قيد المراجعة').length;
  const urgentCount = students.filter((s) => s.status === 'حرج').length;
  const approvedCount = students.filter((s) => s.status === 'تم قبول').length;
  const totalCustomCount = urgentCount + approvedCount;

  const visibleStudents = students.filter((student) => {
    if (filterStatus === 'pending') return student.status === 'قيد المراجعة';
    if (filterStatus === 'urgent') return student.status === 'حرج';
    if (filterStatus === 'approved') return student.status === 'تم قبول';
    return true;
  });

  const handleStatusUpdate = async (student, newStatus) => {
    const targetId = student.id; 
    console.log('🔘 Button clicked! ID:', targetId, 'New Status:', newStatus);
    
    if (!targetId) {
      console.error('❌ No ID provided');
      alert('خطأ: المعرف الفريد غير موجود');
      return;
    }

    try {
      setUpdatingIds((prev) => new Set([...prev, targetId]));

      // تمرير المعرف والحالة بشكل منفصل ليتطابق مع الـ API والـ Request body الجديد
      await updateMedicalStatus(targetId, newStatus);

      console.log('✅ Updated successfully in database.');

      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s.id === targetId
            ? { ...s, status: newStatus, statusColor: getStatusColor(newStatus) }
            : s
        )
      );
      
      await loadRecords(true);
      await loadStats();
      
      const statusLabel = newStatus === 'حرج' ? 'حرج' : newStatus === 'تم قبول' ? 'مقبول' : 'معلق';
      setSuccessMessage(`تم تحديث الحالة بنجاح وتخزينها: ${statusLabel}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('❌ Error updating status:', err);
      alert('حدث خطأ أثناء الاتصال بالسيرفر ولم يتم الحفظ، يرجى المحاولة مرة أخرى.');
    } finally {
      setUpdatingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(targetId);
        return updated;
      });
    }
  };

  const shouldShowEmpty = !isLoading && visibleStudents.length === 0;

  return (
    <div className="min-h-screen bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] font-['Cairo'] flex flex-col items-center" dir="rtl">
      <main className="w-full max-w-7xl pt-12 px-6 md:px-12 pb-20">
        <div className="mb-12 text-right border-r-4 border-[rgb(var(--primary-container))] pr-6">
          <h2 className="text-4xl font-black text-[rgb(var(--primary-container))] mb-2 tracking-tight">إدارة السجلات الطبية - القيادة العامة</h2>
          <p className="opacity-80 font-medium">نظام المراقبة الصحية المركزية | الأكاديمية العسكرية</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon="hourglass_top" label="بانتظار المراجعة" value={pendingCount} />
          <StatCard icon="priority_high" label="الحالات الحرجة" value={urgentCount} isCritical />
          <StatCard icon="check_circle" label="الحالات المقبولة" value={approvedCount} />
          <StatCard icon="groups" label="الطلاب الإجمالي (حرجة + مقبولة)" value={totalCustomCount} />
        </div>

        {successMessage && (
          <div className="mb-6 px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined">check_circle</span>
            {successMessage}
          </div>
        )}

        <div className="mb-8 flex flex-wrap gap-3 items-center">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilterStatus(option.id)}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${filterStatus === option.id ? 'bg-[rgb(var(--primary-container))] text-[rgb(var(--on-primary-container))] border-[rgb(var(--primary-container))]' : 'bg-[rgb(var(--surface-container))] text-[rgb(var(--on-surface))] border-[rgb(var(--outline-variant))/0.3]'}`}
            >
              <span className="material-symbols-outlined">{option.icon}</span>
              {option.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${filterStatus === 'all' ? 'bg-[rgb(var(--primary-container))] text-[rgb(var(--on-primary-container))] border-[rgb(var(--primary-container))]' : 'bg-[rgb(var(--surface-container))] text-[rgb(var(--on-surface))] border-[rgb(var(--outline-variant))/0.3]'}`}
          >
            <span className="material-symbols-outlined">filter_alt</span>
            عرض الكل
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-9 bg-[rgb(var(--surface-container-lowest))] rounded-2xl shadow-sm border border-[rgb(var(--outline-variant))/0.3] overflow-hidden glass-card">
            <div className="px-8 py-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--primary-container))/0.03]">
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
                    <th className="px-8 py-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[rgb(var(--outline-variant))/0.1]">
                  {visibleStudents.map((student, idx) => (
                    <tr key={`${student.id}-${idx}`} className="hover:bg-[rgb(var(--surface-container-low))] transition-colors group">
                      <td className="px-8 py-5 font-mono text-xs opacity-50">{student.militaryId || "---"}</td>
                      <td className="px-8 py-5 font-bold text-[rgb(var(--on-surface))] group-hover:text-[rgb(var(--primary-container))]">{student.name}</td>
                      <td className="px-8 py-5 opacity-80">{student.diagnosis}</td>
                      <td className="px-8 py-5 opacity-60 text-xs">{student.meds}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${student.statusColor}`}>
                          {STATUS_LABELS[student.status] || student.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center space-x-2 flex justify-center gap-2">
                        <button
                          type="button"
                          disabled={updatingIds.has(student.id)}
                          onClick={() => handleStatusUpdate(student, 'حرج')}
                          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {updatingIds.has(student.id) ? (
                            <>
                              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                              جاري...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-sm">priority_high</span>
                              طارئ
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          disabled={updatingIds.has(student.id)}
                          onClick={() => handleStatusUpdate(student, 'تم قبول')}
                          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {updatingIds.has(student.id) ? (
                            <>
                              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                              جاري...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                              قبول
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {shouldShowEmpty && (
                <div className="p-12 text-center text-sm opacity-70">
                  لا توجد سجلات لهذه الفئة حالياً
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-6">
            <div className="bg-[rgb(var(--primary-container))] rounded-2xl p-6 shadow-xl text-[rgb(var(--on-primary-container))] relative overflow-hidden satin-gradient">
              <h3 className="font-bold mb-4 flex items-center justify-between relative z-10">
                تنبئة طارئة
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              </h3>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 mb-4 relative z-10">
                <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-tighter">إجراء فوري مطلوب</p>
                <p className="text-sm font-bold mb-2">الحالات الحرجة</p>
                <p className="text-[11px] opacity-70 leading-relaxed mb-4">يرجى مراجعة حالات الطلاب المميزة كحرجة واتخاذ القرار الطبي المناسب بسرعة.</p>
                <button className="w-full bg-[rgb(var(--on-primary-container))] text-[rgb(var(--primary-container))] py-2.5 rounded-lg text-xs font-black hover:bg-white transition-all uppercase tracking-widest">مراجعة الآن</button>
              </div>
            </div>

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