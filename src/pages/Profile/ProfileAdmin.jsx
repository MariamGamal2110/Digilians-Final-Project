import { useEffect, useMemo, useState } from 'react'

import StudentSearchDetailsModal from '../../components/adminProfileComponents/StudentSearchDetailsModal'
import AdminProfileTopBar from '../../components/adminProfileComponents/AdminProfileTopBar'
import AdminInfoHeader from '../../components/adminProfileComponents/AdminInfoHeader'
import AdminStatsCards from '../../components/adminProfileComponents/AdminStatsCards'
import AdminActionsList from '../../components/adminProfileComponents/AdminActionsList'
import WarningSummaryModal from '../../components/adminProfileComponents/WarningSummaryModal'
import SendStudentMessageModal from '../../components/adminProfileComponents/SendStudentMessageModal'
import MessagesCenterModal from '../../components/profileComponents/MessagesCenterModal'
import { getSavedUser } from '../../api/client'
import {
  getAdminProfile,
  getAdminWarningSummary,
  getAdminStudentSummary,
  searchProfileStudents,
} from '../../api/profile'
import {
  adminReplyToConversation,
  adminSendMessageToStudent,
  getAdminConversation,
  getAdminInbox,
  getAdminUnreadCount,
} from '../../api/messages'

function createFallbackAdminProfile() {
  const savedAdmin = getSavedUser('admin') || getSavedUser('user') || {}

  return {
    admin: {
      name: savedAdmin.name || 'المسؤول',
      email: savedAdmin.email || 'غير متوفر',
      role: savedAdmin.role || 'مشرف',
      militaryId: savedAdmin.militaryId || 'غير متوفر',
      department: savedAdmin.department || 'الإدارة',
    },
    contacts: {
      studentEmail: '',
    },
    stats: {
      warningOneCount: 0,
      warningTwoCount: 0,
      suspendedCount: 0,
      dismissedCount: 0,
    },
    actions: [],
  }
}

export default function ProfileAdmin() {
  const [adminProfile, setAdminProfile] = useState(() => createFallbackAdminProfile())
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isRefreshingProfile, setIsRefreshingProfile] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [warningSummary, setWarningSummary] = useState({
    oneWarning: { count: 0, students: [] },
    twoWarnings: { count: 0, students: [] },
    dismissed: { count: 0, students: [] },
  })
  const [isLoadingWarningSummary, setIsLoadingWarningSummary] = useState(true)
  const [warningSummaryError, setWarningSummaryError] = useState('')
  const [openedWarningCategory, setOpenedWarningCategory] = useState(null)

  const [adminUnreadCount, setAdminUnreadCount] = useState(0)
  const [showInboxModal, setShowInboxModal] = useState(false)
  const [showSendMessageModal, setShowSendMessageModal] = useState(false)
  const [adminInbox, setAdminInbox] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [isLoadingInbox, setIsLoadingInbox] = useState(false)
  const [isLoadingConversation, setIsLoadingConversation] = useState(false)
  const [isSendingReply, setIsSendingReply] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [inboxError, setInboxError] = useState('')
  const [sendMessageError, setSendMessageError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadAdminProfile() {
      try {
        setIsRefreshingProfile(true)
        setErrorMessage('')
        const profile = await getAdminProfile()

        if (isMounted && profile) {
          setAdminProfile((current) => ({
            ...current,
            ...profile,
            admin: {
              ...current.admin,
              ...(profile.admin || {}),
            },
            contacts: {
              ...current.contacts,
              ...(profile.contacts || {}),
            },
            stats: {
              ...current.stats,
              ...(profile.stats || {}),
            },
            actions: Array.isArray(profile.actions) ? profile.actions : current.actions,
          }))
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'تعذر تحميل ملف الأدمن')
        }
      } finally {
        if (isMounted) {
          setIsRefreshingProfile(false)
        }
      }
    }

    async function loadUnreadCount() {
      try {
        const unreadCount = await getAdminUnreadCount()

        if (isMounted) {
          setAdminUnreadCount(unreadCount || 0)
        }
      } catch {
        if (isMounted) {
          setAdminUnreadCount(0)
        }
      }
    }

    async function loadWarningSummary() {
      try {
        setIsLoadingWarningSummary(true)
        setWarningSummaryError('')
        const summary = await getAdminWarningSummary()

        if (!isMounted) {
          return
        }

        setWarningSummary({
          oneWarning: summary?.oneWarning || { count: 0, students: [] },
          twoWarnings: summary?.twoWarnings || { count: 0, students: [] },
          dismissed: summary?.dismissed || { count: 0, students: [] },
        })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setWarningSummaryError(error.message || 'تعذر تحميل ملخص الإنذارات')
        setWarningSummary({
          oneWarning: { count: 0, students: [] },
          twoWarnings: { count: 0, students: [] },
          dismissed: { count: 0, students: [] },
        })
      } finally {
        if (isMounted) {
          setIsLoadingWarningSummary(false)
        }
      }
    }

    loadAdminProfile()
    loadUnreadCount()
    loadWarningSummary()

    return () => {
      isMounted = false
    }
  }, [])

  async function refreshAdminUnreadCount() {
    const unreadCount = await getAdminUnreadCount()
    setAdminUnreadCount(unreadCount || 0)
  }

  async function loadAdminInbox() {
    try {
      setIsLoadingInbox(true)
      setInboxError('')
      const conversations = await getAdminInbox()
      setAdminInbox(Array.isArray(conversations) ? conversations : [])
    } catch (error) {
      setInboxError(error.message || 'تعذر تحميل صندوق الرسائل')
    } finally {
      setIsLoadingInbox(false)
    }
  }

  async function openAdminInbox() {
    setShowInboxModal(true)
    setSelectedConversation(null)
    await Promise.all([loadAdminInbox(), refreshAdminUnreadCount()])
  }

  async function openAdminConversation(conversationId) {
    try {
      setIsLoadingConversation(true)
      const conversation = await getAdminConversation(conversationId)
      setSelectedConversation(conversation)
      await Promise.all([loadAdminInbox(), refreshAdminUnreadCount()])
    } catch (error) {
      setInboxError(error.message || 'تعذر تحميل المحادثة')
    } finally {
      setIsLoadingConversation(false)
    }
  }

  async function handleAdminReply(conversationId, body) {
    try {
      setIsSendingReply(true)
      const conversation = await adminReplyToConversation(conversationId, body)
      setSelectedConversation(conversation)
      await Promise.all([loadAdminInbox(), refreshAdminUnreadCount()])
    } catch (error) {
      setInboxError(error.message || 'تعذر إرسال الرد')
    } finally {
      setIsSendingReply(false)
    }
  }

  async function handleSearchStudents(searchValue) {
    const results = await searchProfileStudents(searchValue)
    setStudents(results)
    return results
  }

  async function handleSelectStudent(student) {
    const studentId = student._id || student.id
    const summary = await getAdminStudentSummary(studentId)
    setSelectedStudent(summary)
  }

  function openSendMessageModal() {
    setSendMessageError('')
    setShowSendMessageModal(true)
  }

  async function handleSendMessage(payload) {
    try {
      setIsSendingMessage(true)
      setSendMessageError('')
      await adminSendMessageToStudent(payload)
      setShowSendMessageModal(false)
      await Promise.all([loadAdminInbox(), refreshAdminUnreadCount()])
    } catch (error) {
      setSendMessageError(error.message || 'تعذر إرسال الرسالة')
    } finally {
      setIsSendingMessage(false)
    }
  }

  const statsCards = useMemo(() => {
    const oneWarning = warningSummary?.oneWarning || { count: 0, students: [] }
    const twoWarnings = warningSummary?.twoWarnings || { count: 0, students: [] }
    const dismissed = warningSummary?.dismissed || { count: 0, students: [] }

    return [
      {
        title: 'طلاب حصلوا على إنذار واحد',
        count: oneWarning.count || 0,
        description: 'طلاب لديهم إنذار أول ويحتاجون متابعة بسيطة',
        level: 'متابعة عادية',
        percent: Math.min((oneWarning.count || 0) * 25, 100),
        type: 'warning-one',
        isLoading: isLoadingWarningSummary,
        errorMessage: warningSummaryError,
        onClick: () =>
          setOpenedWarningCategory({
            title: 'طلاب حصلوا على إنذار واحد',
            description: 'طلاب لديهم إنذار أول ويحتاجون متابعة بسيطة',
            count: oneWarning.count || 0,
            students: oneWarning.students || [],
            type: 'warning-one',
          }),
      },
      {
        title: 'طلاب حصلوا على إنذارين',
        count: twoWarnings.count || 0,
        description: 'طلاب يحتاجون متابعة عاجلة قبل الفصل من الدورة',
        level: 'متابعة عاجلة',
        percent: Math.min((twoWarnings.count || 0) * 35, 100),
        type: 'warning-two',
        isLoading: isLoadingWarningSummary,
        errorMessage: warningSummaryError,
        onClick: () =>
          setOpenedWarningCategory({
            title: 'طلاب حصلوا على إنذارين',
            description: 'طلاب يحتاجون متابعة عاجلة قبل الفصل من الدورة',
            count: twoWarnings.count || 0,
            students: twoWarnings.students || [],
            type: 'warning-two',
          }),
      },
      {
        title: 'طلاب مفصولون من الدورة',
        count: dismissed.count || 0,
        description: 'طلاب لديهم ثلاثة إنذارات أو أكثر وفق سجلات العقوبات',
        level: 'إجراء نهائي',
        percent: Math.min((dismissed.count || 0) * 25, 100),
        type: 'dismissed',
        isLoading: isLoadingWarningSummary,
        errorMessage: warningSummaryError,
        onClick: () =>
          setOpenedWarningCategory({
            title: 'طلاب مفصولون من الدورة',
            description: 'طلاب لديهم ثلاثة إنذارات أو أكثر',
            count: dismissed.count || 0,
            students: dismissed.students || [],
            type: 'dismissed',
          }),
      },
    ]
  }, [isLoadingWarningSummary, warningSummary, warningSummaryError])

  return (
    <section dir="rtl" className="bg-[#fafafa] min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <AdminProfileTopBar
          students={students}
          onSelectStudent={handleSelectStudent}
          onSearchStudents={handleSearchStudents}
          onOpenInbox={openAdminInbox}
          unreadCount={adminUnreadCount}
        />

        <div className="p-8">
          {errorMessage && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {errorMessage}
            </div>
          )}

          <AdminInfoHeader
            admin={adminProfile.admin}
            contacts={{
              ...adminProfile.contacts,
              studentEmail: selectedStudent?.email || adminProfile.contacts?.studentEmail,
            }}
            isRefreshingProfile={isRefreshingProfile}
            onContactStudent={openSendMessageModal}
          />

          <AdminStatsCards
            statsCards={statsCards}
            isRefreshingProfile={isRefreshingProfile}
          />

          <AdminActionsList
            actions={adminProfile.actions}
            isRefreshingProfile={isRefreshingProfile}
          />
        </div>
      </div>

      {selectedStudent && (
        <StudentSearchDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      <SendStudentMessageModal
        isOpen={showSendMessageModal}
        initialEmail={selectedStudent?.email || adminProfile.contacts?.studentEmail || ''}
        isSending={isSendingMessage}
        errorMessage={sendMessageError}
        onClose={() => setShowSendMessageModal(false)}
        onSend={handleSendMessage}
      />

      <MessagesCenterModal
        isOpen={showInboxModal}
        title="رسائل الطلاب"
        viewerType="admin"
        unreadCount={adminUnreadCount}
        conversations={adminInbox}
        selectedConversation={selectedConversation}
        isLoadingInbox={isLoadingInbox}
        inboxError={inboxError}
        isLoadingConversation={isLoadingConversation}
        onClose={() => setShowInboxModal(false)}
        onOpenConversation={openAdminConversation}
        onReply={handleAdminReply}
        isSendingReply={isSendingReply}
      />

      <WarningSummaryModal
        isOpen={Boolean(openedWarningCategory)}
        category={openedWarningCategory}
        onClose={() => setOpenedWarningCategory(null)}
      />
    </section>
  )
}
