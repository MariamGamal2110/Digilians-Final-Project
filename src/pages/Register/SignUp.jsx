import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, saveAuthData } from "../../api/client";

const InputField = ({
  label,
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  align = "right",
}) => {
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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    militaryId: "",
    email: "",
    password: "",
    phoneNumber: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("الرجاء إدخال الاسم والبريد الإلكتروني وكلمة المرور.");
      return;
    }

    // Validate password format
    const numberCount = (formData.password.match(/\d/g) || []).length;
    const letterCount = (formData.password.match(/[A-Za-z]/g) || []).length;

    if (numberCount === formData.password.length) {
      setError("كلمة المرور لا يمكن أن تكون أرقامًا فقط.");
      return;
    }

    if (letterCount < 4) {
      setError("كلمة المرور يجب أن تحتوي على 4 أحرف على الأقل.");
      return;
    }

    if (!/^[A-Z]/.test(formData.password)) {
      setError("كلمة المرور يجب أن تبدأ بحرف كابيتال.");
      return;
    }

    if (formData.password.length < 4 || formData.password.length > 15) {
      setError("كلمة المرور يجب أن تكون بين 4 و 15 حرفًا.");
      return;
    }

    if (numberCount === 0) {
      setError("كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.");
      return;
    }

    if (numberCount > 10) {
      setError("كلمة المرور يجب أن تحتوي على 10 أرقام على الأكثر.");
      return;
    }

    if (isAdmin && !formData.adminCode) {
      setError("يرجى إدخال كود المسؤول.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          militaryId: formData.militaryId || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          role: isAdmin ? "admin" : "student",
          adminCode: isAdmin ? formData.adminCode : undefined,
        }),
      });

      saveAuthData({ token: data.token, user: data.user, role: isAdmin ? 'admin' : 'user' });
      navigate(isAdmin ? "/admin/home" : "/home");
    } catch (err) {
      setError(err.message || "فشل التسجيل، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] flex flex-col items-center justify-center relative overflow-hidden font-['Cairo']"
      dir="rtl"
    >
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
              <span className="material-symbols-outlined text-[rgb(var(--primary-container))] text-4xl">
                account_circle
              </span>
            </div>
            <h1 className="text-3xl text-[rgb(var(--primary-container))] mb-2 font-black tracking-tight">
              {isAdmin ? "تسجيل مسؤول جديد" : "تسجيل طالب جديد"}
            </h1>
            <p className="text-sm text-[rgb(var(--on-surface))] opacity-60 font-bold">
              يرجى إدخال بياناتك الرسمية للوصول إلى السجل
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="mb-6 flex items-center gap-3">
            <label className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm font-bold text-[rgb(var(--primary-container))]">
                هل أنت مسؤول؟
              </span>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="الاسم بالكامل"
              icon="person"
              placeholder="الاسم الثلاثي كما هو في البطاقة"
              name="name"
              value={formData.name}
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

            <InputField
              label="رقم الهاتف"
              icon="phone"
              placeholder="+20xxxxxxxxx"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              align="left"
            />

            {/* حقل كلمة المرور */}
            <div className="group">
              <label className="block text-[11px] font-black uppercase tracking-widest text-[rgb(var(--primary-container))] mb-2 px-1">
                كلمة المرور
              </label>
              <div className="relative flex items-center border-b-2 border-[rgb(var(--outline-variant))/0.2] bg-[rgb(var(--surface-container-low))] px-4 py-3.5 group-focus-within:border-[rgb(var(--primary-container))] transition-all rounded-t-xl">
                <span className="material-symbols-outlined text-[rgb(var(--primary-container))] ml-3 text-xl">
                  lock
                </span>
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
                  className="material-symbols-outlined text-[rgb(var(--outline-variant))] hover:text-[rgb(var(--primary-container))] mr-2 transition-colors cursor-pointer"
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </button>
              </div>
            </div>

            {isAdmin && (
              <InputField
                label="كود المسؤول"
                icon="security"
                placeholder="أدخل كود المسؤول"
                type="password"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                align="left"
              />
            )}

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={loading}
              className="w-full satin-gradient text-white font-black text-lg py-5 rounded-2xl shadow-lg transform active:scale-[0.98] transition-all duration-200 mt-6 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "جاري التسجيل..." : "تسجيل الحساب"}
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          {/* تذييل النموذج */}
          <div className="mt-8 pt-6 border-t border-[rgb(var(--outline-variant))/0.1] text-center">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-[10px] text-[rgb(var(--primary-container))] hover:underline font-bold uppercase tracking-[0.2em]"
            >
              هل لديك حساب بالفعل؟ تسجيل دخول
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
