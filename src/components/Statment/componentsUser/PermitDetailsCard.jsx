import React from 'react'

export default function PermitDetailsCard({ latestAttendance, student, loading }) {
  const hasArrival = !!latestAttendance
  const isLate = latestAttendance?.status === 'متأخر' || latestAttendance?.status === 'Ù…ØªØ£Ø®Ø±'

  return (
    <section className="lg:col-span-8 glass-card border border-outline-variant/20 rounded-xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="bg-white p-4 rounded-xl border border-surface-dim shadow-inner flex flex-col items-center">
          <img
            alt="QR Code"
            className="w-48 h-48"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6nK0JymSXrvF0hAX4QnIw7vtTvK80J6qg9EPCs2dwHFR0fpjQORIXjlpbLuZOGL5CtqCaaUAwCkQcXYVpbeszfTlWf_Fl09iWmzgGzXnsZd1tECX4zBQCHIzEdG-Jgt5IOrSDbdy2szyC8rn4_uhtJi-_B9f2JM8ApLnr65dYgGvhrUN5oFHbnlLekHqp4ABGKL2r_4DbijAYQFfnqaKMD3rnhvglnvX-7VM7fSPLj_QPCZtkLGllJhiaW-IEmBRGLCYsUYEUVEil"
          />
          <span className="mt-4 text-xs font-bold text-primary tracking-widest">
            {student?.militaryId ? `رقم عسكري: ${student.militaryId}` : 'VALID ACCESS CODE'}
          </span>
        </div>

        <div className="flex-1 text-right w-full">
          <div className="mb-6">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">
              نوع التصريح
            </span>
            <h3 className="text-2xl font-bold text-primary">
              {loading ? 'جاري التحميل...' : latestAttendance?.task || 'إجازة اعتيادية'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">
                تاريخ الوصول
              </span>
              <p className="text-lg font-semibold text-on-surface">
                {hasArrival ? latestAttendance.date : '—'}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">
                وقت الوصول
              </span>
              <p className="text-lg font-semibold text-on-surface">
                {hasArrival ? latestAttendance.time : '—'}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  hasArrival
                    ? isLate
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-emerald-500 animate-pulse'
                    : 'bg-gray-400'
                }`}
              ></div>
              <span className="text-sm font-medium text-on-surface">
                {loading
                  ? 'جاري التحميل...'
                  : hasArrival
                    ? latestAttendance.status
                    : 'في انتظار تسجيل الوصول'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
