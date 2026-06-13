import { useEffect, useMemo, useState } from 'react'
import { FiBell } from 'react-icons/fi'

import ProfileInfo from '../../components/profileComponents/ProfileInfo'
import DurationCard from '../../components/profileComponents/DurationCard'
import GradesCard from '../../components/profileComponents/GradesCard'
import AttendanceCard from '../../components/profileComponents/AttendanceCard'
import AcademicChart from '../../components/profileComponents/AcademicChart'
import EditProfileModal from '../../components/profileComponents/EditProfileModal'
import MessagesCenterModal from '../../components/profileComponents/MessagesCenterModal'
import { getSavedUser } from '../../api/client'
import {
  getStudentProfile,
  updateStudentProfile,
} from '../../api/profile'
import {
  getStudentConversation,
  getStudentInbox,
  getStudentUnreadCount,
  studentReplyToConversation,
} from '../../api/messages'

function clampGrade(value) {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return 0
  }

  return Math.max(0, Math.min(100, Math.round(numericValue)))
}

function createFallbackProfile(savedUser) {
  return {
    student: {
      name: savedUser?.name || 'الطالب',
      email: savedUser?.email || '',
      militaryId: savedUser?.militaryId || savedUser?.id || 'غير محدد',
    },
    specializationDuration: '4 أشهر',
    grades: {
      behavior: 100,
      history: [],
    },
    attendance: {
      absenceDays: 0,
    },
  }
}

function mergeProfileWithFallback(profile, fallbackProfile) {
  return {
    ...fallbackProfile,
    ...profile,
    student: {
      ...fallbackProfile.student,
      ...profile?.student,
    },
    grades: {
      ...fallbackProfile.grades,
      ...profile?.grades,
      history: Array.isArray(profile?.grades?.history)
        ? profile.grades.history
        : fallbackProfile.grades.history,
    },
    attendance: {
      ...fallbackProfile.attendance,
      ...profile?.attendance,
    },
  }
}

function buildBehaviorChartData(profile) {
  const finalGrade = clampGrade(profile?.grades?.behavior || 0)
  const history = Array.isArray(profile?.grades?.history)
    ? profile.grades.history
    : []

  const series = [
    {
      label: 'البداية',
      value: 100,
    },
  ]

  history.forEach((item, index) => {
    const previousValue = series[series.length - 1].value
    const nextValue = Math.max(
      finalGrade,
      Math.min(previousValue, clampGrade(item?.value)),
    )

    if (nextValue !== previousValue) {
      series.push({
        label: item?.label || `الخصم ${index + 1}`,
        value: nextValue,
      })
    }
  })

  const lastValue = series[series.length - 1].value

  if (lastValue !== finalGrade || series.length === 1) {
    series.push({
      label: 'النتيجة',
      value: Math.min(lastValue, finalGrade),
    })
  }

  return series
}

export default function ProfileUser() {
  const savedUser = useMemo(() => getSavedUser('user'), [])
  const fallbackProfile = useMemo(() => createFallbackProfile(savedUser), [savedUser])

  const [showEditModal, setShowEditModal] = useState(false)
  const [showMessagesModal, setShowMessagesModal] = useState(false)
  const [studentProfile, setStudentProfile] = useState(fallbackProfile)
  const [hasLoadedProfile, setHasLoadedProfile] = useState(false)
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [saveErrorMessage, setSaveErrorMessage] = useState('')

  const [studentUnreadCount, setStudentUnreadCount] = useState(0)
  const [studentInbox, setStudentInbox] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [isLoadingInbox, setIsLoadingInbox] = useState(false)
  const [isLoadingConversation, setIsLoadingConversation] = useState(false)
  const [isSendingReply, setIsSendingReply] = useState(false)
  const [messagesError, setMessagesError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      try {
        setIsRefreshingProfile(true)
        setErrorMessage('')
        const profile = await getStudentProfile()

        if (isMounted) {
          setStudentProfile(mergeProfileWithFallback(profile, fallbackProfile))
          setHasLoadedProfile(true)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'تعذر تحميل بيانات الملف الشخصي')
        }
      } finally {
        if (isMounted) {
          setIsRefreshingProfile(false)
        }
      }
    }

    async function loadUnreadCount() {
      try {
        const unreadCount = await getStudentUnreadCount()

        if (isMounted) {
          setStudentUnreadCount(unreadCount || 0)
        }
      } catch {
        if (isMounted) {
          setStudentUnreadCount(0)
        }
      }
    }

    loadProfile()
    loadUnreadCount()

    return () => {
      isMounted = false
    }
  }, [fallbackProfile])

  function openEditModal() {
    setSaveErrorMessage('')
    setShowEditModal(true)
  }

  function closeEditModal() {
    setShowEditModal(false)
  }

  async function saveStudentData(newData) {
    try {
      setIsSaving(true)
      setSaveErrorMessage('')
      const updatedProfile = await updateStudentProfile(newData)
      setStudentProfile((currentProfile) =>
        mergeProfileWithFallback(updatedProfile, currentProfile),
      )
      setShowEditModal(false)
      setHasLoadedProfile(true)
    } catch (error) {
      setSaveErrorMessage(error.message || 'تعذر حفظ البريد الإلكتروني')
    } finally {
      setIsSaving(false)
    }
  }

  async function refreshStudentUnreadCount() {
    const unreadCount = await getStudentUnreadCount()
    setStudentUnreadCount(unreadCount || 0)
  }

  async function loadStudentInbox() {
    try {
      setIsLoadingInbox(true)
      setMessagesError('')
      const conversations = await getStudentInbox()
      setStudentInbox(Array.isArray(conversations) ? conversations : [])
    } catch (error) {
      setMessagesError(error.message || 'تعذر تحميل الرسائل')
    } finally {
      setIsLoadingInbox(false)
    }
  }

  async function openStudentInbox() {
    setShowMessagesModal(true)
    setSelectedConversation(null)
    await Promise.all([loadStudentInbox(), refreshStudentUnreadCount()])
  }

  async function openStudentConversation(conversationId) {
    try {
      setIsLoadingConversation(true)
      const conversation = await getStudentConversation(conversationId)
      setSelectedConversation(conversation)
      await Promise.all([loadStudentInbox(), refreshStudentUnreadCount()])
    } catch (error) {
      setMessagesError(error.message || 'تعذر تحميل المحادثة')
    } finally {
      setIsLoadingConversation(false)
    }
  }

  async function handleStudentReply(conversationId, body) {
    try {
      setIsSendingReply(true)
      const conversation = await studentReplyToConversation(conversationId, body)
      setSelectedConversation(conversation)
      await Promise.all([loadStudentInbox(), refreshStudentUnreadCount()])
    } catch (error) {
      setMessagesError(error.message || 'تعذر إرسال الرد')
    } finally {
      setIsSendingReply(false)
    }
  }

  const behaviorChartData = useMemo(() => {
    return buildBehaviorChartData(studentProfile)
  }, [studentProfile])

  const specializationDuration = '4 أشهر'
  // Temporary fallback until a real specialization duration source is defined later.

  const showInlineSkeletons = isRefreshingProfile && !hasLoadedProfile

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-8">
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 font-bold text-center">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <ProfileInfo student={studentProfile.student} />

            <div className="relative flex items-center gap-3">
              <button
                type="button"
                onClick={openStudentInbox}
                title="رسائل الإدارة"
                className="relative w-12 h-12 rounded-full border border-[#d8d4c7] bg-[#f7f5f0] text-[#3b3120] flex items-center justify-center hover:bg-[#f3efe4] transition"
              >
                <FiBell size={20} />
                {studentUnreadCount > 0 && (
                  <span className="absolute -top-1 -left-1 min-w-5 h-5 px-1 rounded-full bg-[#b42318] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {studentUnreadCount > 99 ? '99+' : studentUnreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={openEditModal}
                className="bg-[#555d30] text-white rounded-md px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-[#3f4723] transition"
              >
                تعديل بيانات
                <span>✎</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={showInlineSkeletons ? 'animate-pulse' : ''}>
              <DurationCard selectedDuration={specializationDuration} />
            </div>

            <div className={showInlineSkeletons ? 'animate-pulse' : ''}>
              <GradesCard behaviorGrade={studentProfile.grades?.behavior || 0} />
            </div>

            <div className={showInlineSkeletons ? 'animate-pulse' : ''}>
              <AttendanceCard absenceDays={studentProfile.attendance?.absenceDays || 0} />
            </div>
          </div>

          <div className={showInlineSkeletons ? 'animate-pulse' : ''}>
            <AcademicChart chartData={behaviorChartData} />
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          student={studentProfile.student}
          onClose={closeEditModal}
          onSave={saveStudentData}
          isSaving={isSaving}
          errorMessage={saveErrorMessage}
        />
      )}

      <MessagesCenterModal
        isOpen={showMessagesModal}
        title="رسائل الإدارة"
        viewerType="student"
        unreadCount={studentUnreadCount}
        conversations={studentInbox}
        selectedConversation={selectedConversation}
        isLoadingInbox={isLoadingInbox}
        inboxError={messagesError}
        isLoadingConversation={isLoadingConversation}
        onClose={() => setShowMessagesModal(false)}
        onOpenConversation={openStudentConversation}
        onReply={handleStudentReply}
        isSendingReply={isSendingReply}
      />
    </section>
  )
}
