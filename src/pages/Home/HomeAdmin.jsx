import AdminWelcomeHeader from '../../components/adminhomeComponents/AdminWelcomeHeader'
import AdminStatsCards from '../../components/adminhomeComponents/AdminStatsCards'
import AdminFooterSection from '../../components/adminhomeComponents/AdminFooterSection'
import AdminQuickActions from '../../components/adminhomeComponents/AdminQuickActions'

export default function HomeAdmin() {
  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-[760px]">
          <div className="p-10">
            <AdminWelcomeHeader />

            <div className="mt-8">
              <AdminStatsCards />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 mt-16">
              <AdminFooterSection />
              <AdminQuickActions />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}