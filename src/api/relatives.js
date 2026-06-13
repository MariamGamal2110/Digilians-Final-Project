import { apiRequest } from './client'

export async function getMyRelatives(role = 'user') {
  const data = await apiRequest('/relatives/me', { method: 'GET' }, role)
  return data.records
}

export async function createRelative(payload, role = 'user') {
  const data = await apiRequest(
    '/relatives',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    role,
  )

  return data.record
}

export async function updateRelative(id, payload, role = 'user') {
  const data = await apiRequest(
    `/relatives/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    role,
  )

  return data.record
}

export async function deleteRelative(id, role = 'user') {
  return apiRequest(
    `/relatives/${id}`,
    {
      method: 'DELETE',
    },
    role,
  )
}

export async function searchStudentsRelatives(search = '', role = 'admin') {
  const query = `?search=${encodeURIComponent(search)}`
  const data = await apiRequest(`/relatives/admin/search${query}`, {}, role)
  return data.students
}

export async function getStudentRelatives(studentId, role = 'admin') {
  const data = await apiRequest(
    `/relatives/admin/student/${studentId}`,
    {},
    role,
  )

  return data
}
