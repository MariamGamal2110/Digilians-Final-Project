export default function WelcomeHeaderAdmin() {
  return (
    <div 
      style={{ direction: 'rtl' }}
      className="relative flex flex-row-reverse items-center gap-6 bg-[#555d30] rounded-2xl p-8  w-full overflow-hidden"
    >
      {/* دوايرة زخرفية - خلف الأيقونة على اليسار */}
      <div className="absolute left-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute left-16 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 pointer-events-none" />

     

      {/* النص - على اليمين */}
      <div className="relative z-10 flex-1 text-right">
        {/* Category label */}
      
        <h2 className="text-white text-[32px] font-black tracking-tight leading-tight mb-2">
          سجل وصول الطلاب
        </h2>
        <p className="text-white/70 text-sm">
          متابعة وتسجيل حضور الطلاب وتحديث السجلات اليومية حياً
        </p>
      </div>
    </div>
  )
}