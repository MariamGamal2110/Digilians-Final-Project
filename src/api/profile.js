import { apiRequest } from './client'

export async function getStudentProfile(role = 'user') {
  const data = await apiRequest('/profile/student', { method: 'GET' }, role)
  return data.profile
}

export async function updateStudentProfile(payload, role = 'user') {
  const data = await apiRequest(
    '/profile/student',
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    role,
  )

  return data.profile
}

export async function getAdminProfile(role = 'admin') {
  const data = await apiRequest('/profile/admin', { method: 'GET' }, role)
  return data.profile
}

export async function searchProfileStudents(search = '', role = 'admin') {
  const data = await apiRequest(
    `/profile/admin/students/search?search=${encodeURIComponent(search)}`,
    { method: 'GET' },
    role,
  )

  return data.students
}

export async function getAdminStudentSummary(studentId, role = 'admin') {
  const data = await apiRequest(
    `/profile/admin/students/${studentId}/summary`,
    { method: 'GET' },
    role,
  )

  return data.profileSummary
}
