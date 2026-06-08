// import React, { useState, useEffect, useCallback } from 'react';
// import { getSavedUser } from '../../api/client';
// import {
//   fetchMyMedicalRecords,
//   saveMedicalRecord,
//   updateMedicalRecord,
//   deleteMedicalRecord,
// } from '../../api/medical';

// const DEFAULT_FORM = {
//   date: '',
//   symptoms: '',
//   medications: '',
//   emergencyContact: '+20 '
// };

// const MedicalUser = () => {
//   const savedUser = getSavedUser();
  
//   // ⚡ جلب التوكن من الـ localStorage بناءً على الاسم الفعلي في المتصفح
//   const token = localStorage.getItem('digilians_token');

//   const [formData, setFormData] = useState(DEFAULT_FORM);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);

//   // إعداد الهيدر لتمريره مع كل طلب تواصل مع الباك آند
//   const getAuthConfig = useCallback(() => {
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     };
//   }, [token]);

//   const loadMedicalRecords = useCallback(async () => {
//     if (!token) return; // منع الطلب إذا لم يكن التوكن موجوداً
//     try {
//       // تمرير التوكن في الطلب ليتخطى الـ authMiddleware بالباك آند بنجاح
//       const records = await fetchMyMedicalRecords(getAuthConfig());
//       setMedicalRecords(records);
//     } catch (err) {
//       console.error('Error loading records:', err);
//     }
//   }, [token, getAuthConfig]);

//   useEffect(() => {
//     loadMedicalRecords();
//   }, [loadMedicalRecords]);

//   const normalizeEmergencyContact = (value) => {
//     const digits = String(value).replace(/\D/g, '');
//     if (digits.startsWith('20') && digits.length === 13) {
//       return digits.slice(2);
//     }
//     return digits;
//   };

//   const isValidEmergencyContact = (value) => {
//     const normalized = normalizeEmergencyContact(value);
//     return /^(010|011|012)\d{8}$/.test(normalized);
//   };

//   const isValidMedicalDate = (value) => {
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
//       return false;
//     }
//     const selected = new Date(value);
//     if (Number.isNaN(selected.getTime())) {
//       return false;
//     }
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     return selected <= today;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       alert('جلسة العمل غير صالحة، يرجى إعادة تسجيل الدخول لتجديد التوكن.');
//       return;
//     }

//     if (!formData.date || !formData.symptoms || !formData.medications || !formData.emergencyContact) {
//       alert('يرجى ملء جميع الحقول المطلوبة');
//       return;
//     }

//     if (!isValidMedicalDate(formData.date)) {
//       alert('التاريخ غير صالح، تأكد أنه صحيح وليس تاريخ مستقبلي');
//       return;
//     }

//     if (!isValidEmergencyContact(formData.emergencyContact)) {
//       alert('رقم الطوارئ يجب أن يبدأ بـ 010 أو 011 أو 012 ويتكون من 11 رقماً');
//       return;
//     }

//     const normalizedContact = normalizeEmergencyContact(formData.emergencyContact);

//     try {
//       if (editingIndex !== null) {
//         const existingRecord = medicalRecords[editingIndex];
//         // تمرير البيانات مع ترويسة المصادقة للتعديل
//         const record = await updateMedicalRecord(
//           existingRecord._id || existingRecord.id, 
//           {
//             date: formData.date,
//             symptoms: formData.symptoms,
//             medications: formData.medications,
//             emergencyContact: normalizedContact,
//           },
//           getAuthConfig()
//         );

//         const updatedRecords = [...medicalRecords];
//         updatedRecords[editingIndex] = record;
//         setMedicalRecords(updatedRecords);
//         setEditingIndex(null);
//       } else {
//         // تمرير البيانات مع ترويسة المصادقة للإضافة الجديدة
//         const record = await saveMedicalRecord({
//           studentName: savedUser?.name || 'طالب مجهول',
//           date: formData.date,
//           symptoms: formData.symptoms,
//           medications: formData.medications,
//           emergencyContact: normalizedContact,
//         }, getAuthConfig());
        
//         setMedicalRecords([record, ...medicalRecords]);
//       }

//       setFormData(DEFAULT_FORM);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || 'حدث خطأ أثناء حفظ السجل الطبي');
//     }
//   };

//   const handleEdit = (index) => {
//     const record = medicalRecords[index];
//     setFormData({
//       date: record.date || '',
//       symptoms: record.symptoms || '',
//       medications: record.medications || '',
//       emergencyContact: record.emergencyContact || '+20 ',
//     });
//     setEditingIndex(index);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleDelete = async (index) => {
//     if (!token) return;
//     const record = medicalRecords[index];
//     try {
//       await deleteMedicalRecord(record._id || record.id, getAuthConfig());
//       setMedicalRecords(medicalRecords.filter((_, i) => i !== index));
//     } catch (err) {
//       console.error(err);
//       alert(err.message || 'حدث خطأ أثناء حذف السجل');
//     }
//   };

//   return (
//     <div className="bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
//       <main className="w-full max-w-3xl py-16 px-6 md:px-8">
        
//         {/* 🚨 التنبيه الذكي للمستخدم عند اختفاء التوكن أو انتهاء الجلسة */}
//         {!token && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center font-bold shadow-sm">
//             جلسة العمل انتهت أو غير موجودة، يرجى إعادة تسجيل الدخول لتجديد التوكن.
//           </div>
//         )}

//         <div className="mb-12 text-center">
//           <h3 className="text-3xl font-black text-[rgb(var(--primary-container))] mb-3">
//             {editingIndex !== null ? 'تعديل السجل الطبي' : 'إدخال بيانات طبية جديدة'}
//           </h3>
//           <p className="opacity-70 text-sm font-medium">أضف سجلاتك الصحية لمتابعة الحالة باستمرار داخل الأكاديمية.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6 bg-[rgb(var(--surface-container-low))] p-8 rounded-3xl border border-[rgb(var(--outline-variant))/0.3] shadow-sm mb-16 glass-card">
//           <div className="grid grid-cols-1 gap-6">
//             <InputGroup 
//               label="تاريخ الشعور بالتعب" 
//               type="date" 
//               value={formData.date} 
//               onChange={(e) => setFormData({...formData, date: e.target.value})} 
//             />
            
//             <div className="space-y-2">
//               <label className="block text-xs font-bold text-[rgb(var(--primary-container))] uppercase tracking-widest">التعب والأعراض الحالية</label>
//               <textarea 
//                 className="w-full bg-[rgb(var(--surface))] border border-[rgb(var(--outline-variant))/0.5] rounded-xl px-4 py-3 outline-none focus:border-[rgb(var(--primary-container))] transition-all resize-none" 
//                 value={formData.symptoms} 
//                 onChange={(e) => setFormData({...formData, symptoms: e.target.value})} 
//                 rows="3" 
//                 placeholder="وصف الحالة بالتفصيل..."
//               ></textarea>
//             </div>

//             <InputGroup 
//               label="الأدوية المستخدمة" 
//               placeholder="اسم الدواء والجرعة" 
//               value={formData.medications} 
//               onChange={(e) => setFormData({...formData, medications: e.target.value})} 
//             />
            
//             <InputGroup 
//               label="رقم طوارئ ولي الأمر" 
//               placeholder="+20" 
//               value={formData.emergencyContact} 
//               onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} 
//             />
//           </div>

//           <button 
//             disabled={!token}
//             className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 satin-gradient ${
//               !token ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[rgb(var(--primary-container))] text-[rgb(var(--on-primary-container))] hover:shadow-lg hover:shadow-[rgb(var(--primary-container))/0.2]'
//             }`}
//           >
//             <span className="material-symbols-outlined">{editingIndex !== null ? 'check_circle' : 'add_circle'}</span>
//             {editingIndex !== null ? 'حفظ التعديلات' : 'إضافة السجل الطبي'}
//           </button>
//         </form>

//         <div className="space-y-6">
//           <h4 className="text-xl font-bold text-[rgb(var(--primary-container))] flex items-center gap-2 pr-2">
//             <span className="material-symbols-outlined">history</span>
//             سجل المتابعة الصحية ({medicalRecords.length})
//           </h4>

//           {medicalRecords.length === 0 ? (
//             <div className="text-center py-12 border-2 border-dashed border-[rgb(var(--outline-variant))/0.3] rounded-3xl opacity-40">
//               <span className="material-symbols-outlined text-4xl mb-2">medical_services</span>
//               <p className="text-sm">لا توجد سجلات طبية مسجلة حالياً</p>
//             </div>
//           ) : (
//             medicalRecords.map((record, index) => (
//               <div key={record._id || record.id || index} className="bg-[rgb(var(--surface-container-low))] border border-[rgb(var(--outline-variant))/0.2] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative group">
//                 <div className="flex justify-between items-start mb-5">
//                   <span className="bg-[rgb(var(--primary-container))/0.1] text-[rgb(var(--primary-container))] px-4 py-1 rounded-full text-xs font-bold border border-[rgb(var(--primary-container))/0.1]">
//                     {record.date || '---'}
//                   </span>
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button onClick={() => handleEdit(index)} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
//                       <span className="material-symbols-outlined text-sm">edit</span>
//                     </button>
//                     <button onClick={() => handleDelete(index)} className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
//                       <span className="material-symbols-outlined text-sm">delete</span>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1 tracking-tighter">الأعراض</label>
//                     <p className="text-sm font-medium leading-relaxed">{record.symptoms || '---'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1 tracking-tighter">الأدوية</label>
//                     <p className="text-sm font-medium leading-relaxed">{record.medications || '---'}</p>
//                   </div>
//                   <div className="md:col-span-2 pt-3 border-t border-[rgb(var(--outline-variant))/0.2] flex items-center gap-2">
//                     <span className="material-symbols-outlined text-stone-400 text-sm">phone_in_talk</span>
//                     <label className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">رقم الطوارئ:</label>
//                     <p className="text-sm font-mono font-bold text-[rgb(var(--primary-container))]">{record.emergencyContact}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// const InputGroup = ({ label, type = "text", value, onChange, placeholder }) => (
//   <div className="space-y-2">
//     <label className="block text-xs font-bold text-[rgb(var(--primary-container))] uppercase tracking-widest">{label}</label>
//     <input 
//       className="w-full bg-[rgb(var(--surface))] border border-[rgb(var(--outline-variant))/0.5] rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[rgb(var(--primary-container))/0.2] focus:border-[rgb(var(--primary-container))] transition-all font-medium" 
//       type={type} 
//       value={value} 
//       onChange={onChange} 
//       placeholder={placeholder} 
//     />
//   </div>
// );

// export default MedicalUser;














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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }
    const selected = new Date(value);
    if (Number.isNaN(selected.getTime())) {
      return false;
    }
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
        // 🌟 تعديل سينيور: تمرير كافة البيانات المطلوبة إجباريًا في الـ Mongoose Schema
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
    <div className="bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      <main className="w-full max-w-3xl py-16 px-6 md:px-8">
        
        {!token && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center font-bold shadow-sm">
            جلسة العمل انتهت أو غير موجودة، يرجى إعادة تسجيل الدخول لتجديد التوكن.
          </div>
        )}

        <div className="mb-12 text-center">
          <h3 className="text-3xl font-black text-[rgb(var(--primary-container))] mb-3">
            {editingIndex !== null ? 'تعديل السجل الطبي' : 'إدخال بيانات طبية جديدة'}
          </h3>
          <p className="opacity-70 text-sm font-medium">أضف سجلاتك الصحية لمتابعة الحالة باستمرار داخل الأكاديمية.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[rgb(var(--surface-container-low))] p-8 rounded-3xl border border-[rgb(var(--outline-variant))/0.3] shadow-sm mb-16 glass-card">
          <div className="grid grid-cols-1 gap-6">
            <InputGroup 
              label="تاريخ الشعور بالتعب" 
              type="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
            />
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[rgb(var(--primary-container))] uppercase tracking-widest">التعب والأعراض الحالية</label>
              <textarea 
                className="w-full bg-[rgb(var(--surface))] border border-[rgb(var(--outline-variant))/0.5] rounded-xl px-4 py-3 outline-none focus:border-[rgb(var(--primary-container))] transition-all resize-none" 
                value={formData.symptoms} 
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})} 
                rows="3" 
                placeholder="وصف الحالة بالتفصيل..."
              ></textarea>
            </div>

            <InputGroup 
              label="الأدوية المستخدمة" 
              placeholder="اسم الدواء والجرعة" 
              value={formData.medications} 
              onChange={(e) => setFormData({...formData, medications: e.target.value})} 
            />
            
            <InputGroup 
              label="رقم طوارئ ولي الأمر" 
              placeholder="+20" 
              value={formData.emergencyContact} 
              onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} 
            />
          </div>

          <button 
            disabled={!token}
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 satin-gradient ${
              !token ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[rgb(var(--primary-container))] text-[rgb(var(--on-primary-container))] hover:shadow-lg hover:shadow-[rgb(var(--primary-container))/0.2]'
            }`}
          >
            <span className="material-symbols-outlined">{editingIndex !== null ? 'check_circle' : 'add_circle'}</span>
            {editingIndex !== null ? 'حفظ التعديلات' : 'إضافة السجل الطبي'}
          </button>
        </form>

        <div className="space-y-6">
          <h4 className="text-xl font-bold text-[rgb(var(--primary-container))] flex items-center gap-2 pr-2">
            <span className="material-symbols-outlined">history</span>
            سجل المتابعة الصحية ({medicalRecords.length})
          </h4>

          {medicalRecords.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[rgb(var(--outline-variant))/0.3] rounded-3xl opacity-40">
              <span className="material-symbols-outlined text-4xl mb-2">medical_services</span>
              <p className="text-sm">لا توجد سجلات طبية مسجلة حالياً</p>
            </div>
          ) : (
            medicalRecords.map((record, index) => (
              <div key={record._id || record.id || index} className="bg-[rgb(var(--surface-container-low))] border border-[rgb(var(--outline-variant))/0.2] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative group">
                <div className="flex justify-between items-start mb-5">
                  <span className="bg-[rgb(var(--primary-container))/0.1] text-[rgb(var(--primary-container))] px-4 py-1 rounded-full text-xs font-bold border border-[rgb(var(--primary-container))/0.1]">
                    {record.date || '---'}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(index)} className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1 tracking-tighter">الأعراض</label>
                    <p className="text-sm font-medium leading-relaxed">{record.symptoms || '---'}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1 tracking-tighter">الأدوية</label>
                    <p className="text-sm font-medium leading-relaxed">{record.medications || '---'}</p>
                  </div>
                  <div className="md:col-span-2 pt-3 border-t border-[rgb(var(--outline-variant))/0.2] flex items-center gap-2">
                    <span className="material-symbols-outlined text-stone-400 text-sm">phone_in_talk</span>
                    <label className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">رقم الطوارئ:</label>
                    <p className="text-sm font-mono font-bold text-[rgb(var(--primary-container))]">{record.emergencyContact}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

const InputGroup = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-xs font-bold text-[rgb(var(--primary-container))] uppercase tracking-widest">{label}</label>
    <input 
      className="w-full bg-[rgb(var(--surface))] border border-[rgb(var(--outline-variant))/0.5] rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[rgb(var(--primary-container))/0.2] focus:border-[rgb(var(--primary-container))] transition-all font-medium" 
      type={type} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
    />
  </div>
);

export default MedicalUser;