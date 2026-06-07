import { apiRequest } from './client'

export async function addStudentAttendance(identifier, role = 'user') {
  const data = await apiRequest('/statement/attendance', {
    method: 'POST',
    body: JSON.stringify({ identifier }),
  }, role)
  return data.record
}

export async function fetchAttendanceRecords(search = '', role = 'user') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/statement/attendance${query}`, {}, role)
  return data.records
}

export async function fetchStatementStats(role = 'user') {
  const data = await apiRequest('/statement/stats', {}, role)
  return data.stats
}

export async function fetchMyStatement(role = 'user') {
  const data = await apiRequest('/statement/me', {}, role)
  return data.data
}

export async function saveAttendanceNote(id, note, role = 'user') {
  const data = await apiRequest(`/statement/attendance/${id}/note`, {
    method: 'PATCH',
    body: JSON.stringify({ note }),
  }, role)
  return data.record
}

export async function deleteAttendanceRecord(id, role = 'user') {
  await apiRequest(`/statement/attendance/${id}`, {
    method: 'DELETE',
  }, role)
}

export async function deleteAttendanceRecords(ids = [], role = 'user') {
  await Promise.all(ids.map((id) => deleteAttendanceRecord(id, role)))
}

export async function searchStudentsWithStatus(search = '', role = 'user') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/statement/search${query}`, {}, role)
  return data.results
}


export async function updateAttendancePermitType(recordId, permitType, role = 'user') {
  const data = await apiRequest(`/statement/attendance/${recordId}/permit-type`, {
    method: 'PATCH',
    body: JSON.stringify({ permitType }),
  }, role)
  return data.record
}
