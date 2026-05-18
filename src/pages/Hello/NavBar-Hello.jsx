export default function NavBarHello({ onContact }) {
  return (
    <nav dir="rtl" className="bg-background border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center text-accent font-bold text-lg">
          🏛
        </div>
        <div>
          <p className="text-primary font-bold text-sm leading-tight">الأكاديمية العسكرية</p>
          <p className="text-secondary text-xs">THE SOVEREIGN LEDGER</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="text-secondary hover:text-primary text-sm transition-colors">عن الأكاديمية</a>
        <a href="#" className="text-secondary hover:text-primary text-sm transition-colors">الدعم الفني</a>
        <button onClick={onContact} className="text-secondary hover:text-primary text-sm transition-colors">اتصل بنا</button>
      </div>
    </nav>
  )
}