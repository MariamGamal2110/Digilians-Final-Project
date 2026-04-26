import React, { useState } from 'react'
import AttendanceTrackerSection from './componentsAdmin/AttendanceTrackerSection'
import CurrentStatusCardAdmin from './componentsAdmin/CurrentStatusCardAdmin'
import MobileBottomNavAdmin from './componentsAdmin/MobileBottomNavAdmin'
import MobileTopBarAdmin from './componentsAdmin/MobileTopBarAdmin'
import PermitDetailsCardAdmin from './componentsAdmin/PermitDetailsCardAdmin'
import SearchInputsPanel from './componentsAdmin/SearchInputsPanel'
// import SidebarNavAdmin from './componentsAdmin/SidebarNavAdmin'
import StatementFooterAdmin from './componentsAdmin/StatementFooterAdmin'
import WelcomeHeaderAdmin from './componentsAdmin/WelcomeHeaderAdmin'

export default function StatmentAdmin() {
	const [filters, setFilters] = useState({ nationalId: '', militaryId: '' })

	return (
		<div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden w-5/6 mx-auto pt-8">
			<MobileTopBarAdmin />
			{/* <SidebarNavAdmin /> */}

			<main className="md:mr-72 min-h-screen px-6 py-10 lg:px-12 lg:py-16">
				<WelcomeHeaderAdmin />
				<SearchInputsPanel onApply={setFilters} />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
					<PermitDetailsCardAdmin />
					<CurrentStatusCardAdmin />
				</div>

				<AttendanceTrackerSection filters={filters} />
				<StatementFooterAdmin />
			</main>

			<MobileBottomNavAdmin />
		</div>
	)
}
