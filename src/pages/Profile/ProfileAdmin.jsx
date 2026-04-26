import AdminProfileTopBar from '../../components/adminProfileComponents/AdminProfileTopBar'
import AdminInfoHeader from '../../components/adminProfileComponents/AdminInfoHeader'
import AdminStatsCards from '../../components/adminProfileComponents/AdminStatsCards'
import AdminActionsList from '../../components/adminProfileComponents/AdminActionsList'

export default function ProfileAdmin() {
    return (
        <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
            <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <AdminProfileTopBar />

                <div className="p-8">
                    <AdminInfoHeader />

                    <AdminStatsCards />

                    <div>
                        <AdminActionsList />
                    </div>
                </div>
            </div>
        </section>
    )
}