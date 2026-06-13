import React, { useState, useEffect, useCallback } from 'react';
import { getSavedUser, getToken } from '../../api/client';
import {
  fetchMyMedicalRecords,
  saveMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../../api/medical';

const DEFAULT_FORM = {
  date: '',
  symptoms: '',
  medications: '',
  emergencyContact: '+20 '
};

const MedicalUser = () => {
  const savedUser = getSavedUser('user');
  const token = getToken('user');

  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const loadMedicalRecords = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetchMyMedicalRecords();
      const actualRecords = response?.data || response;
      setMedicalRecords(Array.isArray(actualRecords) ? actualRecords : []);
    } catch (err) {
      console.error('Error loading records:', err);
    }
  }, [token]);

  useEffect(() => {
    loadMedicalRecords();
  }, [loadMedicalRecords]);

  const normalizeEmergencyContact = (value) => {
    const digits = String(value).replace(/\D/g, '');
    if (digits.startsWith('20') && digits.length === 13) {
      return digits.slice(2);
    }
    return digits;
  };

  const isValidEmergencyContact = (value) => {
    const normalized = normalizeEmergencyContact(value);
    return /^(010|011|012)\d{8}$/.test(normalized);
  };

  const isValidMedicalDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const selected = new Date(value);
    if (Number.isNaN(selected.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected <= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('جلسة العمل غير صالحة، يرجى إعادة تسجيل الدخول لتجديد التوكن.');
      return;
    }

    if (!formData.date || !formData.symptoms || !formData.medications || !formData.emergencyContact) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (!isValidMedicalDate(formData.date)) {
      alert('التاريخ غير صالح، تأكد أنه صحيح وليس تاريخ مستقبلي');
      return;
    }

    if (!isValidEmergencyContact(formData.emergencyContact)) {
      alert('رقم الطوارئ يجب أن يبدأ بـ 010 أو 011 أو 012 ويتكون من 11 رقماً');
      return;
    }

    const normalizedContact = normalizeEmergencyContact(formData.emergencyContact);

    try {
      if (editingIndex !== null) {
        const existingRecord = medicalRecords[editingIndex];
        const response = await updateMedicalRecord(existingRecord._id || existingRecord.id, {
          date: formData.date,
          symptoms: formData.symptoms,
          medications: formData.medications,
          emergencyContact: normalizedContact,
        });

        const updatedRecord = response?.data || response;
        const updatedRecords = [...medicalRecords];
        updatedRecords[editingIndex] = updatedRecord;
        setMedicalRecords(updatedRecords);
        setEditingIndex(null);
      } else {
        const response = await saveMedicalRecord({
          studentName: savedUser?.name || 'طالب مجهول',
          studentEmail: savedUser?.email || 'unknown@digilians.com',
          militaryId: savedUser?.militaryId || savedUser?.nationalId || '0000000000',
          date: formData.date,
          symptoms: formData.symptoms,
          medications: formData.medications,
          emergencyContact: normalizedContact,
        });

        const newRecord = response?.data || response;
        setMedicalRecords([newRecord, ...medicalRecords]);
      }

      setFormData(DEFAULT_FORM);
    } catch (err) {
      console.error(err);
      alert(err.message || 'حدث خطأ أثناء حفظ السجل الطبي');
    }
  };

  const handleEdit = (index) => {
    const record = medicalRecords[index];
    setFormData({
      date: record.date || '',
      symptoms: record.symptoms || '',
      medications: record.medications || '',
      emergencyContact: record.emergencyContact || '+20 ',
    });
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (index) => {
    if (!token) return;
    const record = medicalRecords[index];
    try {
      await deleteMedicalRecord(record._id || record.id);
      setMedicalRecords(medicalRecords.filter((_, i) => i !== index));
    } catch (err) {
      console.error(err);
      alert(err.message || 'حدث خطأ أثناء حذف السجل');
    }
  };

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8 font-['Cairo']">
      <div className="max-w-3xl mx-auto">

        {/* ───── Token error banner ───── */}
        {!token && (
          <div className="mb-5 px-5 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-bold text-sm">
            جلسة العمل انتهت أو غير موجودة، يرجى إعادة تسجيل الدخول لتجديد التوكن.
          </div>
        )}

        {/* ───── Header ───── */}
        <div className="relative overflow-hidden bg-[#555d30] rounded-2xl p-8 mb-6">
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute left-16 bottom-[-45px] w-32 h-32 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-bold mb-4">
                <span className="material-symbols-outlined text-base">medical_services</span>
                السجل الطبي الشخصي
              </div>
              <h1 className="text-white text-3xl font-extrabold mb-3">
                {editingIndex !== null ? 'تعديل السجل الطبي' : 'إدخال بيانات طبية جديدة'}
              </h1>
              <p className="text-white/80 text-sm leading-7 max-w-xl">
                أضف سجلاتك الصحية لمتابعة الحالة باستمرار داخل الأكاديمية.
              </p>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined" style={{ fontSize: 36 }}>health_and_safety</span>
            </div>
          </div>
        </div>

        {/* ───── Form card ───── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Date */}
              <InputGroup
                label="تاريخ الشعور بالتعب"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              {/* Symptoms textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  التعب والأعراض الحالية
                </label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#555d30] focus:ring-2 focus:ring-[#555d30]/10 transition-all resize-none"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  rows="3"
                  placeholder="وصف الحالة بالتفصيل..."
                />
              </div>

              {/* Medications */}
              <InputGroup
                label="الأدوية المستخدمة"
                placeholder="اسم الدواء والجرعة"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
              />

              {/* Emergency contact */}
              <InputGroup
                label="رقم طوارئ ولي الأمر"
                placeholder="+20"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />

              {/* Submit */}
              <button
                disabled={!token}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  !token
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#555d30] hover:bg-[#444b25] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {editingIndex !== null ? 'check_circle' : 'add_circle'}
                </span>
                {editingIndex !== null ? 'حفظ التعديلات' : 'إضافة السجل الطبي'}
              </button>

            </form>
          </div>
        </div>

        {/* ───── Records list ───── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 text-base">
              <span className="material-symbols-outlined text-[#555d30] text-lg">history</span>
              سجل المتابعة الصحية
            </h4>
            <span className="bg-[#555d30]/10 text-[#555d30] px-2.5 py-0.5 rounded-md font-black text-xs">
              {medicalRecords.length} سجل
            </span>
          </div>

          <div className="p-6 space-y-4">
            {medicalRecords.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-bold text-sm border-2 border-dashed border-gray-200 rounded-xl">
                <span className="material-symbols-outlined text-4xl mb-2 block text-gray-300">medical_services</span>
                لا توجد سجلات طبية مسجلة حالياً
              </div>
            ) : (
              medicalRecords.map((record, index) => (
                <div
                  key={record._id || record.id || index}
                  className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50/70 transition-colors group"
                >
                  {/* Card header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#555d30]/10 text-[#555d30] px-3 py-1 rounded-full text-xs font-bold border border-[#555d30]/20">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {record.date || '---'}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">الأعراض</p>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">{record.symptoms || '---'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">الأدوية</p>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">{record.medications || '---'}</p>
                    </div>
                    <div className="md:col-span-2 pt-3 border-t border-gray-100 flex items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400 text-sm">phone_in_talk</span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">رقم الطوارئ:</p>
                      <p className="text-sm font-mono font-bold text-[#555d30]">{record.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

const InputGroup = ({ label, type = 'text', value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
    <input
      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#555d30] focus:ring-2 focus:ring-[#555d30]/10 transition-all font-medium"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default MedicalUser;