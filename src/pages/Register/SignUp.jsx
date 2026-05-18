import React, { useState } from 'react';

// --- مكون الإدخال المطور (InputField) ---
// تم وضعه هنا لسهولة الوصول إليه أو يمكنك نقله لملف منفصل
const InputField = ({ label, icon, type = "text", placeholder, name, value, onChange, align = "right" }) => {
  return (
    <div className="group">
      <label className="block text-[11px] font-black uppercase tracking-widest text-[rgb(var(--primary-container))] mb-2 group-focus-within:text-[rgb(var(--primary-container))] transition-colors px-1">
        {label}
      </label>
      <div className="relative flex items-center border-b-2 border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--surface-container-low))] px-4 py-3.5 group-focus-within:border-[rgb(var(--primary-container))] transition-all rounded-t-xl">
        <span className="material-symbols-outlined text-[rgb(var(--primary-container))] ml-3 text-xl group-focus-within:text-[rgb(var(--primary-container))] transition-colors">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{ textAlign: align }}
          className="flex-1 w-full bg-transparent border-none focus:ring-0 text-lg font-bold text-[rgb(var(--on-surface))] placeholder:text-stone-300 outline-none"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    militaryId: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('بيانات تسجيل الدخول:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] flex flex-col items-center justify-center relative overflow-hidden font-['Cairo']" dir="rtl">
      
      {/* الخلفية المزخرفة */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(var(--primary-container))_0.5px,transparent_0.5px)] [background-size:24px_24px]"></div>
      </div>

      {/* نموذج تسجيل الدخول */}
      <main className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white shadow-2xl p-8 md:p-12 rounded-[2rem] relative overflow-hidden border border-[rgb(var(--outline-variant))/0.2] glass-card">
          
          {/* الخط الزخرفي العلوي */}
          <div className="absolute top-0 left-0 right-0 h-2 satin-gradient"></div>

          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[rgb(var(--surface-container-low))] rounded-2xl mb-4 shadow-inner">
              <span className="material-symbols-outlined text-[rgb(var(--primary-container))] text-4xl">account_circle</span>
            </div>
            <h1 className="text-3xl text-[rgb(var(--primary-container))] mb-2 font-black tracking-tight">تسجيل الدخول</h1>
            <p className="text-sm text-[rgb(var(--on-surface))] opacity-60 font-bold">يرجى إدخال بياناتك الرسمية للوصول إلى السجل</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <InputField 
              label="الاسم بالكامل" 
              icon="person" 
              placeholder="الاسم الثلاثي كما هو في البطاقة"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              align="right"
            />

            <InputField 
              label="الرقم العسكري" 
              icon="military_tech" 
              placeholder="مثال: 2024XXXXXX"
              name="militaryId"
              value={formData.militaryId}
              onChange={handleChange}
              align="right" 
            />

            <InputField 
              label="البريد الإلكتروني" 
              icon="mail" 
              placeholder="example@domain.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              align="left" 
            />

            {/* حقل كلمة المرور */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-[11px] font-black uppercase tracking-widest text-[rgb(var(--primary-container))]">كلمة المرور</label>
                <button type="button" className="text-[10px] font-black text-[rgb(var(--primary-container))] hover:underline uppercase tracking-tighter">نسيت كلمة المرور؟</button>
              </div>
              <div className="relative flex items-center border-b-2 border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--surface-container-low))] px-4 py-3.5 group-focus-within:border-[rgb(var(--primary-container))] transition-all rounded-t-xl">
                <span className="material-symbols-outlined text-[rgb(var(--primary-container))] ml-3 text-xl">lock</span>
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-none focus:ring-0 text-lg font-bold outline-none placeholder:text-stone-300" 
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined text-[rgb(var(--outline-variant))] hover:text-[rgb(var(--primary-container))] mr-2 transition-colors"
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </button>
              </div>
            </div>

            {/* زر الدخول - تأكدي أن satin-gradient معرف في CSS */}
            <button 
              type="submit" 
              className="w-full satin-gradient text-white font-black text-lg py-5 rounded-2xl shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-6 flex items-center justify-center gap-3"
            >
              دخول النظام
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          {/* تذييل النموذج */}
          <div className="mt-8 pt-6 border-t border-[rgb(var(--outline-variant))/0.1] text-center">
            <p className="text-[10px] text-[rgb(var(--primary-container))] leading-relaxed font-bold uppercase tracking-[0.2em]">
              نظام إدارة المعلومات - الأكاديمية العسكرية
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;