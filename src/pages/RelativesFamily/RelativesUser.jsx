import { useEffect, useMemo, useState } from 'react'

import { getSavedUser } from '../../api/client'
import {
  createRelative,
  deleteRelative,
  getMyRelatives,
  updateRelative,
} from '../../api/relatives'
import RelativeTopBar from '../../components/relativeComponents/RelativeTopBar'
import StudentProfileCard from '../../components/relativeComponents/StudentProfileCard'
import StudentDetailsCard from '../../components/relativeComponents/StudentDetailsCard'
import RelativesTable from '../../components/relativeComponents/RelativesTable'

export default function RelativesUser() {
  const [searchText, setSearchText] = useState('')
  const [relatives, setRelatives] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const student = useMemo(
    () => getSavedUser('user') || getSavedUser('admin') || null,
    [],
  )

  useEffect(() => {
    let isMounted = true

    async function loadRelatives() {
      setIsLoading(true)
      setError('')

      try {
        const records = await getMyRelatives()

        if (isMounted) {
          setRelatives(records)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'فشل تحميل بيانات الأقارب')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRelatives()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleCreateRelative(payload) {
    setError('')

    const record = await createRelative(payload)
    setRelatives((current) => [record, ...current])
  }

  async function handleUpdateRelative(id, payload) {
    setError('')

    const record = await updateRelative(id, payload)
    setRelatives((current) =>
      current.map((relative) => (relative.id === id ? record : relative)),
    )
  }

  async function handleDeleteRelative(id) {
    setError('')

    try {
      await deleteRelative(id)
      setRelatives((current) => current.filter((relative) => relative.id !== id))
    } catch (deleteError) {
      setError(deleteError.message || 'تعذر حذف بيانات القريب')
    }
  }

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <RelativeTopBar
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StudentProfileCard student={student} />

            <div className="lg:col-span-2">
              <StudentDetailsCard
                student={student}
                relativesCount={relatives.length}
              />
            </div>
          </div>

          <RelativesTable
            searchText={searchText}
            relatives={relatives}
            isLoading={isLoading}
            error={error}
            onCreateRelative={handleCreateRelative}
            onUpdateRelative={handleUpdateRelative}
            onDeleteRelative={handleDeleteRelative}
          />
        </div>
      </div>
    </section>
  )
}
