import { useEffect, useMemo, useState } from 'react'
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi'

function formatDateTime(value) {
  if (!value) {
    return 'غير محدد'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'غير محدد'
  }

  return date.toLocaleString('ar-EG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getCounterpartLabel(conversation, viewerType) {
  if (viewerType === 'admin') {
    return conversation?.student?.name || conversation?.student?.email || 'الطالب'
  }

  return conversation?.admin?.name || conversation?.admin?.email || 'الإدارة'
}

export default function MessagesCenterModal({
  isOpen,
  title,
  viewerType,
  unreadCount = 0,
  conversations = [],
  selectedConversation = null,
  isLoadingInbox = false,
  inboxError = '',
  isLoadingConversation = false,
  onClose,
  onOpenConversation,
  onReply,
  isSendingReply = false,
}) {
  const [replyBody, setReplyBody] = useState('')

  useEffect(() => {
    setReplyBody('')
  }, [selectedConversation?.conversation?.id])

  const canReply = Boolean(selectedConversation?.conversation?.id && onReply)

  const selectedMessages = useMemo(
    () => selectedConversation?.messages || [],
    [selectedConversation],
  )

  if (!isOpen) {
    return null
  }

  async function handleReplySubmit(event) {
    event.preventDefault()

    if (!replyBody.trim() || !selectedConversation?.conversation?.id || !onReply) {
      return
    }

    await onReply(selectedConversation.conversation.id, replyBody)
    setReplyBody('')
  }

  return (
    <div className="fixed inset-0 z-[90] bg-black/45 flex items-center justify-center px-4 py-6">
      <div
        dir="rtl"
        className="bg-white w-full max-w-6xl max-h-[88vh] rounded-2xl shadow-2xl border border-[#e8e5dc] overflow-hidden flex flex-col"
      >
        <div className="relative px-6 py-5 border-b border-[#e8e5dc] bg-[#f8f6f0] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-5 top-5 w-10 h-10 rounded-full border border-[#e8e5dc] flex items-center justify-center text-[#1f220f] hover:bg-[#f3f1e8] transition"
          >
            <FiX size={20} />
          </button>

          <div className="text-right">
            <h2 className="text-[#1f220f] text-2xl font-extrabold mb-2">{title}</h2>
            <p className="text-[#7b815f] text-sm">
              {unreadCount > 0 ? `لديك ${unreadCount} رسالة غير مقروءة` : 'لا توجد رسائل غير مقروءة'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] min-h-0 flex-1">
          <div className="border-l border-[#e8e5dc] bg-[#fcfbf8] min-h-0 flex flex-col">
            <div className="px-4 py-4 border-b border-[#e8e5dc] shrink-0">
              <h3 className="text-[#1f220f] font-extrabold">المحادثات</h3>
            </div>

            <div className="overflow-y-auto min-h-0">
              {isLoadingInbox ? (
                <div className="p-4 space-y-3 animate-pulse">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="rounded-xl border border-[#ece7da] bg-white p-4 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-[#eee9dc]" />
                      <div className="h-3 w-1/2 rounded bg-[#f3f1e8]" />
                    </div>
                  ))}
                </div>
              ) : inboxError ? (
                <div className="p-4 text-center text-red-600 font-bold">{inboxError}</div>
              ) : conversations.length === 0 ? (
                <div className="p-6 text-center text-[#7b815f] font-bold">لا توجد رسائل</div>
              ) : (
                conversations.map((conversation) => {
                  const isActive = selectedConversation?.conversation?.id === conversation.id

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => onOpenConversation(conversation.id)}
                      className={`w-full text-right px-4 py-4 border-b border-[#ece7da] transition ${
                        isActive ? 'bg-[#f3f1e8]' : 'hover:bg-[#faf7f1]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#1f220f] font-extrabold text-sm truncate">
                            {conversation.subject}
                          </p>
                          <p className="text-[#555d30] text-xs mt-1 truncate">
                            {getCounterpartLabel(conversation, viewerType)}
                          </p>
                          <p className="text-[#7b815f] text-xs mt-1 truncate">
                            {conversation.lastMessage || 'بدون محتوى'}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[#7b815f] text-[11px] whitespace-nowrap">
                            {formatDateTime(conversation.lastMessageAt)}
                          </span>

                          {conversation.unreadCount > 0 && (
                            <span className="min-w-6 h-6 px-2 rounded-full bg-[#555d30] text-white text-xs font-extrabold flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>

          <div className="min-h-0 flex flex-col bg-white">
            {isLoadingConversation ? (
              <div className="flex-1 p-6 animate-pulse space-y-4">
                <div className="h-6 w-48 rounded bg-[#eee9dc]" />
                <div className="h-20 w-full rounded-2xl bg-[#f3f1e8]" />
                <div className="h-20 w-4/5 rounded-2xl bg-[#eee9dc]" />
              </div>
            ) : !selectedConversation ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-[#f3f1e8] text-[#555d30] flex items-center justify-center mb-4">
                  <FiMessageSquare size={28} />
                </div>
                <h3 className="text-[#1f220f] font-extrabold text-lg mb-2">اختر محادثة</h3>
                <p className="text-[#7b815f] text-sm">اختر رسالة من القائمة لعرض المحتوى والرد عليها.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-5 border-b border-[#e8e5dc] bg-[#fcfbf8] shrink-0">
                  <h3 className="text-[#1f220f] font-extrabold text-lg">
                    {selectedConversation.conversation.subject}
                  </h3>
                  <p className="text-[#555d30] text-sm mt-1">
                    {getCounterpartLabel(selectedConversation.conversation, viewerType)}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-[#faf9f4]">
                  {selectedMessages.length > 0 ? (
                    selectedMessages.map((message) => {
                      const isMine = message.senderType === viewerType

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isMine ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                              isMine
                                ? 'bg-[#e8e5dc] text-[#1f220f]'
                                : 'bg-[#555d30] text-white'
                            }`}
                          >
                            <p className="text-sm leading-7 whitespace-pre-wrap">{message.body}</p>
                            <p className={`text-[11px] mt-2 ${isMine ? 'text-[#6b6f5a]' : 'text-white/80'}`}>
                              {formatDateTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center text-[#7b815f] font-bold py-10">لا توجد رسائل داخل هذه المحادثة</div>
                  )}
                </div>

                {canReply && (
                  <form onSubmit={handleReplySubmit} className="border-t border-[#e8e5dc] p-4 bg-white shrink-0">
                    <div className="flex flex-col gap-3">
                      <textarea
                        value={replyBody}
                        onChange={(event) => setReplyBody(event.target.value)}
                        placeholder="اكتب ردك هنا..."
                        rows={4}
                        className="w-full rounded-2xl border border-[#d8d4c7] bg-[#fcfbf8] px-4 py-3 text-sm outline-none focus:border-[#555d30] resize-none"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[#7b815f] text-xs">سيتم حفظ الرد داخل النظام وإظهاره للطرف الآخر.</p>

                        <button
                          type="submit"
                          disabled={isSendingReply || !replyBody.trim()}
                          className="bg-[#555d30] text-white rounded-xl px-5 py-3 text-sm font-bold flex items-center gap-2 hover:bg-[#454c27] transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          إرسال الرد
                          <FiSend size={16} />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
