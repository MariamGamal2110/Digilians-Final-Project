import { useState } from 'react'

import RelativeTopBar from '../../components/relativeComponents/RelativeTopBar'
import StudentProfileCard from '../../components/relativeComponents/StudentProfileCard'
import StudentDetailsCard from '../../components/relativeComponents/StudentDetailsCard'
import RelativesTable from '../../components/relativeComponents/RelativesTable'

export default function RelativesUser() {
  const [searchText, setSearchText] = useState('')

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <RelativeTopBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StudentProfileCard />

            <div className="lg:col-span-2">
              <StudentDetailsCard />
            </div>
          </div>

          <RelativesTable searchText={searchText} />
        </div>
      </div>
    </section>
  )
}