import React, { useState } from 'react'
import AttendanceTrackerSection from '../../components/Statment/componentsAdmin/AttendanceTrackerSection'
import CurrentStatusCardAdmin from '../../components/Statment/componentsAdmin/CurrentStatusCardAdmin'
import MobileBottomNavAdmin from '../../components/Statment/componentsAdmin/MobileBottomNavAdmin'
import PermitDetailsCardAdmin from '../../components/Statment/componentsAdmin/PermitDetailsCardAdmin'
import SearchInputsPanel from '../../components/Statment/componentsAdmin/SearchInputsPanel'
import StatementFooterAdmin from '../../components/Statment/componentsAdmin/StatementFooterAdmin'
import WelcomeHeaderAdmin from '../../components/Statment/componentsAdmin/WelcomeHeaderAdmin'
import AttendenceAll from '../../components/Statment/componentsAdmin/AttendenceAll'
import AbsentAll from '../../components/Statment/componentsAdmin/AbsentAll'

export default function StatmentAdmin() {
	const [filters, setFilters] = useState({ searchValue: '' })

	return (
		<div className="statement-page bg-surface text-on-surface antialiased overflow-x-hidden">
			<main className="min-h-screen flex justify-center px-4 py-8 md:py-10 lg:py-12">
				<div className="w-full max-w-[1300px] rounded-[28px] bg-white/55 shadow-[0_18px_50px_rgba(66,58,40,0.10)] backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-hidden">
					<SearchInputsPanel onApply={setFilters} />

					<div className="px-1 pb-8 pt-3">
						<div className="flex justify-between gap-4">
							<WelcomeHeaderAdmin />
							<PermitDetailsCardAdmin />
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
							<CurrentStatusCardAdmin />
							<AttendenceAll />

						
							<AbsentAll/>
						</div>

						<AttendanceTrackerSection filters={filters} />
						<StatementFooterAdmin />
					</div>
				</div>
			</main>

			<MobileBottomNavAdmin />
		</div>
	)
}
