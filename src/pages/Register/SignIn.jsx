import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiRequest, saveAuthData } from "../../api/client";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roleQuery = searchParams.get("role");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();

    if (roleQuery === "commander") {
      if (normalizedEmail !== "sandy@gmail.com") {
        setError("لا يمكن السماح بالدخول لهذا المستخدم");
        return;
      }

      if (formData.password !== "Sandy123@") {
        setError("كلمة المرور غير صحيحة للمسؤول.");
        return;
      }
    } else {
      if (normalizedEmail === "sandy@gmail.com") {
        setError("هذا البريد محجوز للمسؤول ولا يمكن استخدامه كمستخدم عادي.");
        return;
      }

      if (formData.password === "Sandy123@") {
        setError("هذه كلمة المرور محجوزة للمسؤول.");
        return;
      }

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
    }

    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      saveAuthData({ token: data.token, user: data.user });

      const isAdmin =
        data.user.role === "admin" ||
        data.user.role === "commander" ||
        data.user.role === "super_admin";

      navigate(isAdmin ? "/admin/home" : "/home");
    } catch (err) {
      setError(err.message || "فشل تسجيل الدخول، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // استخدام المتغيرات من الـ root وخط Cairo
    <div
      className="min-h-screen flex flex-col bg-[rgb(var(--surface))] text-[rgb(var(--on-surface))] font-['Cairo'] flex flex-col items-center justify-center"
      dir="rtl"
    >
      {/* Container الرئيسي الموسط */}
      <main className="w-full max-w-5xl px-4 py-12">
        <div className="flex flex-col md:flex-row shadow-2xl rounded-[2rem] overflow-hidden bg-white border border-[rgb(var(--outline-variant))/0.2] glass-card min-h-[600px]">
          {/* الجانب الأيمن: التصميم العسكري (باستخدام التدرج الخاص بالمشروع) */}
          <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[rgb(var(--primary-container))] satin-gradient">
            {/* صورة تعبيرية خلفية مع Mix Blend */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <img
                src="https://images.unsplash.com/photo-1502101872923-d48509bff386?q=80&w=2000"
                alt="Architecture"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="relative z-10 p-16 flex flex-col justify-end h-full text-[rgb(var(--on-primary-container))]">
              <div className="mb-6 w-16 h-1 border-t-4 border-[rgb(var(--on-primary-container))] opacity-50"></div>
              <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
                نظام إدارة <br /> الأكاديمية العسكرية
              </h1>
              <p className="text-[rgb(var(--on-primary-container))] opacity-80 text-lg leading-relaxed max-w-sm font-medium">
                البوابة الإدارية المركزية للتحكم وإدارة كل ما يتعلق بالدورات
                المدنية داخل الأكاديمية العسكرية.
              </p>
            </div>

            {/* أيقونة الرتبة العسكرية في الخلفية */}
            <div className="absolute top-0 right-0 p-10">
              <span className="material-symbols-outlined text-[rgb(var(--on-primary-container))] opacity-5 text-[12rem] select-none">
                military_tech
              </span>
            </div>
          </div>

          {/* الجانب الأيسر: نموذج التحقق */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
            <div className="mb-12 text-right">
              <div className="inline-block p-3 bg-[rgb(var(--surface-container-low))] rounded-2xl mb-4">
                <span className="material-symbols-outlined text-[rgb(var(--primary-container))] text-3xl">
                  verified_user
                </span>
              </div>
              <h2 className="text-3xl font-black text-[rgb(var(--primary-container))] mb-2 tracking-tight">
                {roleQuery === "commander" ? "دخول المسؤول" : "دخول الطالب"}
              </h2>
              <p className="text-[rgb(var(--on-surface))] opacity-60 font-bold text-sm">
                يرجى إكمال خطوات التحقق للوصول إلى السجلات الرسمية.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="mt-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 p-4 text-sm font-semibold">
                  {error}
                </div>
              )}
              {/* حقل البريد الإلكتروني */}
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-[rgb(var(--outline-variant))] pr-1">
                  البريد الإلكتروني الرسمي
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-[rgb(var(--surface-container-low))] border-b-2 border-[rgb(var(--outline-variant))/0.3] focus:border-[rgb(var(--primary-container))] px-4 py-4 outline-none transition-all font-bold text-lg text-right rounded-t-xl"
                    placeholder="admin@academy.mil.gov"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="material-symbols-outlined absolute left-2 top-4 text-[rgb(var(--outline-variant))] group-focus-within:text-[rgb(var(--primary-container))] transition-colors">
                    alternate_email
                  </span>
                </div>
              </div>

              {/* حقل كلمة المرور */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pr-1">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-[rgb(var(--outline-variant))]">
                    كلمة المرور المشفرة
                  </label>
                  <button
                    type="button"
                    className="text-[10px] text-[rgb(var(--primary-container))] font-black hover:underline tracking-tighter uppercase"
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative group">
                  <input
                    className="w-full bg-[rgb(var(--surface-container-low))] border-b-2 border-[rgb(var(--outline-variant))/0.3] focus:border-[rgb(var(--primary-container))] px-4 py-4 outline-none transition-all font-bold text-lg text-right rounded-t-xl"
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute left-2 top-4 text-[rgb(var(--outline-variant))] group-focus-within:text-[rgb(var(--primary-container))] transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* زر الإرسال بتصميم Satin */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full satin-gradient text-[rgb(var(--primary-container))] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-[rgb(var(--primary-container))/0.3] active:scale-[0.98] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "جاري الدخول..." : "تأكيد الدخول للنظام"}
                  <span className="material-symbols-outlined">
                    shield_person
                  </span>
                </button>
              </div>
            </form>

            {/* Footer التنبيهي */}
            <div className="mt-16 pt-8 border-t border-[rgb(var(--outline-variant))/0.2] text-center">
              <div className="flex justify-center gap-2 mb-3 opacity-20">
                <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--primary-container))]"></div>
              </div>
              <p className="text-[10px] text-[rgb(var(--on-surface))] opacity-50 leading-relaxed font-bold uppercase tracking-widest">
                هذا النظام مخصص للموظفين المعتمدين فقط. <br /> جميع العمليات
                مسجلة ومراقبة استخباراتياً.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
