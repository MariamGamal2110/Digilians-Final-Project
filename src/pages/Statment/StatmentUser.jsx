import React from 'react'
import CurrentStatusCard from '../../components/Statment/componentsUser/CurrentStatusCard'
import MobileBottomNav from '../../components/Statment/componentsUser/MobileBottomNav'
import MobileTopBar from '../../components/Statment/componentsUser/MobileTopBar'
import PermitDetailsCard from '../../components/Statment/componentsUser/PermitDetailsCard'
import PermitHistorySection from '../../components/Statment/componentsUser/PermitHistorySection'
// import SidebarNav from '../../components/Statment/componentsUser/SidebarNav'
import StatementFooter from '../../components/Statment/componentsUser/StatementFooter'
import WelcomeHeader from '../../components/Statment/componentsUser/WelcomeHeader'
export default function StatmentUser() {
  return (
    <div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden">
      <MobileTopBar />

      <main className="min-h-screen flex justify-center px-4 py-8 md:py-10 lg:py-12">
        <div className="w-full max-w-[1300px] rounded-[28px] border border-outline-variant/35 bg-white/55 shadow-[0_18px_50px_rgba(66,58,40,0.10)] backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-hidden">
          <WelcomeHeader />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-12">
            <PermitDetailsCard />
            <CurrentStatusCard />
          </div>

          <PermitHistorySection />
          <StatementFooter />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}