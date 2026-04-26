import React from 'react'
import CurrentStatusCard from './componentsUser/CurrentStatusCard'
import MobileBottomNav from './componentsUser/MobileBottomNav'
import MobileTopBar from './componentsUser/MobileTopBar'
import PermitDetailsCard from './componentsUser/PermitDetailsCard'
import PermitHistorySection from './componentsUser/PermitHistorySection'
import SidebarNav from './componentsUser/SidebarNav'
import StatementFooter from './componentsUser/StatementFooter'
import WelcomeHeader from './componentsUser/WelcomeHeader'

export default function StatmentUser() {
  return (
    <div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden mx-auto pt-8 w-5/6  ">
      <MobileTopBar />
      {/* <SidebarNav /> */}

      <main className="md:mr-72 min-h-screen  px-6 py-10 lg:px-12 lg:py-16">
        <WelcomeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <PermitDetailsCard />
          <CurrentStatusCard />
        </div>

        <PermitHistorySection />
        <StatementFooter />
      </main>

      <MobileBottomNav />
    </div>
  )
}