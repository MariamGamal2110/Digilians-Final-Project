import { useEffect, useState } from 'react'

import AdminRelativesTopBar from '../../components/adminRelativeComponents/AdminRelativesTopBar'
import StudentsListPanel from '../../components/adminRelativeComponents/StudentsListPanel'
import AdminRelativesTable from '../../components/adminRelativeComponents/AdminRelativesTable'
import RelativeDetailsCard from '../../components/adminRelativeComponents/RelativeDetailsCard'
import SecurityStatusCard from '../../components/adminRelativeComponents/SecurityStatusCard'
import SupervisorCard from '../../components/adminRelativeComponents/SupervisorCard'

const studentsData = [
    {
        id: 1,
        name: 'أحمد محمد',
        militaryId: '36581',
        email: 'ahmed.m@gmail.com',
        track: 'Software development',
        specialization: 'Professional React',
        enrollmentDate: '1/6/2026',
        relatives: [
            {
                id: 1,
                name: 'محمد إبراهيم علي',
                relation: 'أب',
                nationalId: '270091201014432',
                birthDate: '1970-05-12',
                job: 'يعمل بالخارج',
                status: 'متزوج',
                phone: '+20 100 222 3333',
                email: 'father@email.com',
                address: 'القاهرة',
                enrollmentDate: '1/6/2026',
            },
            {
                id: 2,
                name: 'سماح حسن كامل',
                relation: 'أم',
                nationalId: '27508200109881',
                birthDate: '1975-06-20',
                job: 'ربة منزل',
                status: 'متزوجة',
                phone: '+20 111 222 3333',
                email: 'mother@email.com',
                address: 'الجيزة',
                enrollmentDate: '1/6/2026',
            },
        ],
    },
    {
        id: 2,
        name: 'محمد عبد الرحمن',
        militaryId: '36264',
        email: 'mohamed.r@email.com',
        track: 'Backend development',
        specialization: 'Django REST Framework',
        enrollmentDate: '1/6/2026',
        relatives: [
            {
                id: 3,
                name: 'عبد الرحمن حسن',
                relation: 'أب',
                nationalId: '27009120101458',
                birthDate: '1968-01-12',
                job: 'تاجر',
                status: 'متزوج',
                phone: '+20 122 333 4444',
                email: 'abdelrahman@email.com',
                address: 'المنوفية',
                enrollmentDate: '1/6/2026',
            },
            {
                id: 4,
                name: 'زينب السيد',
                relation: 'أم',
                nationalId: '27508200101222',
                birthDate: '1972-03-18',
                job: 'ربة منزل',
                status: 'متزوجة',
                phone: '+20 101 444 5555',
                email: 'zeinab@email.com',
                address: 'المنوفية',
                enrollmentDate: '1/6/2026',
            },
        ],
    },
    {
        id: 3,
        name: 'ياسين إبراهيم',
        militaryId: '76253',
        email: 'yassin@email.com',
        track: 'Frontend development',
        specialization: 'React',
        enrollmentDate: '1/6/2026',
        relatives: [
            {
                id: 5,
                name: 'إبراهيم خليل',
                relation: 'أب',
                nationalId: '26009120101458',
                birthDate: '1972-04-10',
                job: 'محاسب',
                status: 'متزوج',
                phone: '+20 155 666 7777',
                email: 'ibrahim@email.com',
                address: 'الإسكندرية',
                enrollmentDate: '1/6/2026',
            },
        ],
    },
]

function normalizeArabic(text) {
    return text
        .toLowerCase()
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .trim()
}

export default function RelativesAdmin() {
    const [searchText, setSearchText] = useState('')
    const [selectedStudent, setSelectedStudent] = useState(studentsData[0])
    const [selectedRelative, setSelectedRelative] = useState(
        studentsData[0].relatives[0]
    )

    const filteredStudents = studentsData
        .filter((student) => {
            const searchValue = normalizeArabic(searchText)

            if (searchValue === '') {
                return true
            }

            const studentName = normalizeArabic(student.name)
            const studentMilitaryId = normalizeArabic(student.militaryId)
            const studentEmail = normalizeArabic(student.email)

            return (
                studentName.includes(searchValue) ||
                studentMilitaryId.includes(searchValue) ||
                studentEmail.includes(searchValue)
            )
        })
        .sort((firstStudent, secondStudent) => {
            const searchValue = normalizeArabic(searchText)

            if (searchValue === '') {
                return 0
            }

            const firstName = normalizeArabic(firstStudent.name)
            const secondName = normalizeArabic(secondStudent.name)

            const firstStartsWithSearch = firstName.startsWith(searchValue)
            const secondStartsWithSearch = secondName.startsWith(searchValue)

            if (firstStartsWithSearch && !secondStartsWithSearch) {
                return -1
            }

            if (!firstStartsWithSearch && secondStartsWithSearch) {
                return 1
            }

            return 0
        })

    useEffect(() => {
        if (filteredStudents.length > 0) {
            const firstStudent = filteredStudents[0]

            setSelectedStudent(firstStudent)

            if (firstStudent.relatives.length > 0) {
                setSelectedRelative(firstStudent.relatives[0])
            } else {
                setSelectedRelative(null)
            }
        }
    }, [searchText])

    function handleSelectStudent(student) {
        setSelectedStudent(student)

        if (student.relatives.length > 0) {
            setSelectedRelative(student.relatives[0])
        } else {
            setSelectedRelative(null)
        }
    }

    return (
        <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
            <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <AdminRelativesTopBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <div className="p-8">
                    {selectedRelative && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <SupervisorCard student={selectedStudent} />

                            <RelativeDetailsCard student={selectedStudent} />
                            <SecurityStatusCard />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-1">
                            <StudentsListPanel
                                students={filteredStudents}
                                selectedStudent={selectedStudent}
                                onSelectStudent={handleSelectStudent}
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <AdminRelativesTable
                                selectedStudent={selectedStudent}
                                onSelectRelative={setSelectedRelative}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}