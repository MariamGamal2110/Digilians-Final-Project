import { apiRequest } from './client'

export async function adminSendMessageToStudent(data, role = 'admin') {
  const response = await apiRequest(
    '/messages/admin/send',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    role,
  )

  return response.conversation
}

export async function getAdminInbox(role = 'admin') {
  const response = await apiRequest('/messages/admin/inbox', { method: 'GET' }, role)
  return response.conversations
}

export async function getAdminUnreadCount(role = 'admin') {
  const response = await apiRequest('/messages/admin/unread-count', { method: 'GET' }, role)
  return response.unreadCount
}

export async function getAdminConversation(conversationId, role = 'admin') {
  const response = await apiRequest(
    `/messages/admin/conversation/${conversationId}`,
    { method: 'GET' },
    role,
  )

  return response.conversation
}

export async function adminReplyToConversation(conversationId, body, role = 'admin') {
  const response = await apiRequest(
    `/messages/admin/conversation/${conversationId}/reply`,
    {
      method: 'POST',
      body: JSON.stringify({ body }),
    },
    role,
  )

  return response.conversation
}

export async function getStudentInbox(role = 'user') {
  const response = await apiRequest('/messages/student/inbox', { method: 'GET' }, role)
  return response.conversations
}

export async function getStudentUnreadCount(role = 'user') {
  const response = await apiRequest('/messages/student/unread-count', { method: 'GET' }, role)
  return response.unreadCount
}

export async function getStudentConversation(conversationId, role = 'user') {
  const response = await apiRequest(
    `/messages/student/conversation/${conversationId}`,
    { method: 'GET' },
    role,
  )

  return response.conversation
}

export async function studentReplyToConversation(conversationId, body, role = 'user') {
  const response = await apiRequest(
    `/messages/student/conversation/${conversationId}/reply`,
    {
      method: 'POST',
      body: JSON.stringify({ body }),
    },
    role,
  )

  return response.conversation
}
