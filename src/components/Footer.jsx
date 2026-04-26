export default function Footer() {
  return (
    <footer dir="rtl" className="bg-background border-t border-gray-200 mt-auto">
      <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">

        {/* يمين - الشعار والاسم */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent text-lg font-bold">
            ✦
          </div>
          <div>
            <p className="text-primary font-bold text-sm">الأكاديمية العسكرية</p>
            <p className="text-secondary text-xs">الواجب - الشرف - الوطن</p>
          </div>
        </div>

        {/* وسط - حقوق */}
        <p className="text-secondary text-xs text-center">
          جميع الحقوق محفوظة للإدارة العسكرية 2026
        </p>

        {/* يسار - روابط */}
        <div className="flex items-center gap-2 text-secondary text-xs">
          <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">الشروط</a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">الدعم</a>
        </div>

      </div>
    </footer>
  )
}