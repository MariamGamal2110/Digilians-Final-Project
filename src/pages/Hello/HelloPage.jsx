import { useState } from 'react'
import NavBarHello from './NavBar-Hello'
import FooterHello from './Footer-Hello'
import { useNavigate } from 'react-router-dom'

export default function HelloPage() {
  const navigate = useNavigate()
const [contactOpen, setContactOpen] = useState(false)
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background">
    <NavBarHello onContact={() => setContactOpen(!contactOpen)} />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">

        {/* العنوان */}
        <h1 className="text-primary font-bold text-4xl leading-relaxed mb-4">
          أهلاً بك في منظومة الدورات المدنيه
          <br />
          داخل الأكاديمية العسكرية
        </h1>
        <p className="text-secondary text-sm mb-12 max-w-lg leading-relaxed">
          المنصة المركزية الموحدة لإدارة السجلات الأكاديمية والعمليات الإدارية بكفاءة وموثوقية عالية
        </p>

        {/* الكارتين */}
        <div className="flex gap-6 justify-center flex-wrap">

          {/* بوابة الطالب */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 w-72 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h2 className="text-primary font-bold text-lg mb-2">بوابة الطالب</h2>
            <p className="text-secondary text-xs leading-relaxed mb-6">
              متابعة أداء الطالب، وتوفير المعلومات اللازمة
              لتسهيل الخدمات داخل الأكاديمية.
            </p>
            <button
              onClick={() => navigate('/app')}
              className="flex items-center gap-2 text-accent text-sm font-medium hover:text-primary transition-colors mx-auto"
            >
              الدخول للملف الأكاديمي ←
            </button>
          </div>

          {/* بوابة المسؤول */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 w-72 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-primary font-bold text-lg mb-2">بوابة المسؤول</h2>
            <p className="text-secondary text-xs leading-relaxed mb-6">
              إدارة السجلات، متابعة الإدارية، إصدار
              التقارير.
            </p>
            <button
              onClick={() => navigate('/app/admin-home')}
              className="flex items-center gap-2 text-accent text-sm font-medium hover:text-primary transition-colors mx-auto"
            >
              دخول الكادر الإداري ←
            </button>
          </div>

        </div>
        {contactOpen && (
  <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md text-center shadow-sm">
    <h3 className="text-primary font-bold text-sm mb-4">تواصل معنا</h3>
    <div className="flex items-center justify-between bg-background border border-gray-200 rounded-xl px-4 py-3 mb-3">
      <span className="text-secondary text-sm">الكلية الحربيه : Milacademy@mod.gov.eg </span>
      <button
        onClick={() => navigator.clipboard.writeText('info@militaryacademy.edu.eg')}
        className="text-accent hover:text-primary text-xs font-medium transition-colors mr-3"
      >
        نسخ
      </button>
    </div>
    <div className="flex items-center justify-between bg-background border border-gray-200 rounded-xl px-4 py-3">
      <span className="text-secondary text-sm"> رقم المنوب : 0226217984 </span>
      <button
        onClick={() => navigator.clipboard.writeText('0226217984')}
        className="text-accent hover:text-primary text-xs font-medium transition-colors mr-3"
      >
        نسخ
      </button>
    </div>
  </div>
)}
      </main>

      <FooterHello />
    </div>
  )
}