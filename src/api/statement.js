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

export async function clearAllAttendanceRecords(role = 'user') {
  const data = await apiRequest('/statement/attendance/clear-all', {
    method: 'DELETE',
  }, role)
  return data
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


export async function updateAttendanceDeduction(recordId, deduction, role = 'admin') {
  const data = await apiRequest(`/statement/attendance/${recordId}/deduction`, {
    method: 'PATCH',
    body: JSON.stringify({ deduction }),
  }, role)
  return data.record
}

export async function fetchApprovedExcuses(role = 'admin') {
  const data = await apiRequest('/statement/excuses', {}, role)
  return data.excuses
}

export async function confirmExcuse(excuseId, role = 'admin') {
  const data = await apiRequest('/statement/excuses/confirm', {
    method: 'POST',
    body: JSON.stringify({ excuseId }),
  }, role)
  return data.record
}

export async function rejectExcuse(excuseId, role = 'admin') {
  const data = await apiRequest('/statement/excuses/reject', {
    method: 'POST',
    body: JSON.stringify({ excuseId }),
  }, role)
  return data.deleted
}
