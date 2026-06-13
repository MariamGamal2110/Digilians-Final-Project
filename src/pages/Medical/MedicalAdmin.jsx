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
  if (status === 'حرج') return 'bg-red-50 text-red-700 border-red-200';
  if (status === 'قيد المراجعة') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (status === 'تم قبول') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return 'bg-gray-100 text-gray-500 border-gray-200';
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
                  <span className="material-symbols-outlined text-base">medical_services</span>
                  الشئون الطبية والصحية
                </div>
                <h1 className="text-white text-3xl font-extrabold mb-3">
                  إدارة ومراجعة السجلات الطبية
                </h1>
                <p className="text-white/80 text-sm leading-7 max-w-xl">
                  نظام المراقبة الصحية المركزية | الأكاديمية العسكرية — مراجعة واعتماد الحالات الطبية حياً
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <span className="material-symbols-outlined" style={{ fontSize: 36 }}>health_and_safety</span>
              </div>
            </div>
          </div>

          {/* ───── Stats ───── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon="hourglass_top" label="بانتظار المراجعة" value={pendingCount} />
            <StatCard icon="priority_high" label="الحالات الحرجة" value={urgentCount} isCritical />
            <StatCard icon="check_circle" label="الحالات المقبولة" value={approvedCount} />
            <StatCard icon="groups" label="إجمالي (حرجة + مقبولة)" value={totalCustomCount} />
          </div>

          {/* ───── Success message ───── */}
          {successMessage && (
            <div className="mb-6 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {successMessage}
            </div>
          )}

          {/* ───── Filters + count ───── */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="text-right w-full md:w-auto">
              <span className="text-gray-500 font-bold text-sm">السجلات الظاهرة حالياً: </span>
              <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">
                {visibleStudents.length} سجل
              </span>
            </div>
            <div className="flex flex-wrap gap-2 justify-end w-full md:w-auto">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilterStatus(option.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                    filterStatus === option.id
                      ? 'bg-[#555d30] text-white border-[#555d30]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#555d30]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{option.icon}</span>
                  {option.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                  filterStatus === 'all'
                    ? 'bg-[#555d30] text-white border-[#555d30]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#555d30]/40'
                }`}
              >
                <span className="material-symbols-outlined text-sm">filter_alt</span>
                عرض الكل
              </button>
            </div>
          </div>

          {/* ───── Table ───── */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold border-b border-gray-200">
                    <th className="px-6 py-4">الرقم العسكري</th>
                    <th className="px-6 py-4">اسم الطالب</th>
                    <th className="px-6 py-4">التشخيص</th>
                    <th className="px-6 py-4">الأدوية</th>
                    <th className="px-6 py-4 text-center">الحالة</th>
                    <th className="px-6 py-4 text-center">الإجراء والقرار</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shouldShowEmpty ? (
                    <tr>
                      <td colSpan="6" className="text-center py-12 text-gray-400 font-bold text-sm">
                        لا توجد سجلات لهذه الفئة حالياً
                      </td>
                    </tr>
                  ) : (
                    visibleStudents.map((student, idx) => (
                      <tr
                        key={`${student.id}-${idx}`}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 font-bold">
                          {student.militaryId || '---'}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800">{student.name}</td>
                        <td className="px-6 py-4 text-gray-700 text-sm">{student.diagnosis}</td>
                        <td className="px-6 py-4 text-gray-500 text-xs">{student.meds}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${student.statusColor}`}>
                            {STATUS_LABELS[student.status] || student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              type="button"
                              disabled={updatingIds.has(student.id)}
                              onClick={() => handleStatusUpdate(student, 'حرج')}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                          </div>
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

const StatCard = ({ icon, label, value, isCritical }) => (
  <div className={`bg-white p-5 rounded-xl border border-gray-200 shadow-sm border-b-4 transition-all hover:-translate-y-1 ${isCritical ? 'border-b-red-500' : 'border-b-[#555d30]'}`}>
    <div className="flex justify-between items-start mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 ${isCritical ? 'text-red-600' : 'text-[#555d30]'}`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right leading-tight max-w-[80px]">{label}</span>
    </div>
    <p className="text-3xl font-black text-gray-800">{value}</p>
  </div>
);

export default MedicalAdmin;