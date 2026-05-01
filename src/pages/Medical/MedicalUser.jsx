import React, { useState } from 'react';

const MedicalUser = () => {
  const [formData, setFormData] = useState({
    date: '',
    symptoms: '',
    medications: '',
    emergencyContact: '+20 '
  });

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedRecords = [...medicalRecords];
      updatedRecords[editingIndex] = formData;
      setMedicalRecords(updatedRecords);
      setEditingIndex(null);
    } else {
      setMedicalRecords([formData, ...medicalRecords]);
    }
    setFormData({ date: '', symptoms: '', medications: '', emergencyContact: '+20 ' });
  };

  const handleEdit = (index) => {
    setFormData(medicalRecords[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    setMedicalRecords(medicalRecords.filter((_, i) => i !== index));
  };

  return (
    // استخدام المتغيرات من الـ root وتوسيط المحتوى
    <div className="bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] min-h-screen font-['Cairo'] flex flex-col items-center" dir="rtl">
      
      {/* Container الرئيسي لضمان التوسيط */}
      <main className="w-full max-w-3xl py-16 px-6 md:px-8">
        
        {/* الهيدر بتنسيق الـ root */}
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-black text-[rgb(var(--primary-container))] mb-3">
            {editingIndex !== null ? 'تعديل السجل الطبي' : 'إدخال بيانات طبية جديدة'}
          </h3>
          <p className="opacity-70 text-sm font-medium">أضف سجلاتك الصحية لمتابعة الحالة باستمرار داخل الأكاديمية.</p>
        </div>

        {/* الفورم مع الستايل الجديد */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[rgb(var(--surface-container-low))] p-8 rounded-3xl border border-[rgb(var(--outline-variant))/0.3] shadow-sm mb-16 glass-card">
          <div className="grid grid-cols-1 gap-6">
            <InputGroup 
              label="تاريخ الشعور بالتعب" 
              type="date" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
            />
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[rgb(var(--primary-container))] uppercase tracking-widest">الأعراض الحالية</label>
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

          <button className="w-full bg-[rgb(var(--primary-container))] text-[rgb(var(--on-primary-container))] py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-[rgb(var(--primary-container))/0.2] transition-all flex items-center justify-center gap-2 satin-gradient">
            <span className="material-symbols-outlined">{editingIndex !== null ? 'check_circle' : 'add_circle'}</span>
            {editingIndex !== null ? 'حفظ التعديلات' : 'إضافة السجل الطبي'}
          </button>
        </form>

        {/* قائمة السجلات السابقة */}
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
              <div key={index} className="bg-[rgb(var(--surface-container-low))] border border-[rgb(var(--outline-variant))/0.2] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative group">
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

// مكون الإدخال الموحد باستخدام متغيرات الـ root
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
