import { apiRequest } from './client'

// User submits holiday request
export async function submitHolidayRequest({ reason, startDate, endDate }, role = 'user') {
  const data = await apiRequest('/holiday/request', {
    method: 'POST',
    body: JSON.stringify({ reason, startDate, endDate }),
  }, role)
  return data.record
}

// User gets their requests
export async function fetchMyRequests(role = 'user') {
  const data = await apiRequest('/holiday/my-requests', {}, role)
  return data.records
}

// Admin gets pending requests
export async function fetchPendingRequests(search = '', role = 'admin') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/holiday/pending${query}`, {}, role)
  return data.records
}

// Admin approves request
export async function approveRequest(id, response = '', role = 'admin') {
  const data = await apiRequest(`/holiday/${id}/approve`, {
    method: 'PATCH',
    body: JSON.stringify({ response }),
  }, role)
  return data.record
}

// Admin rejects request
export async function rejectRequest(id, response = '', role = 'admin') {
  const data = await apiRequest(`/holiday/${id}/reject`, {
    method: 'PATCH',
    body: JSON.stringify({ response }),
  }, role)
  return data.record
}

// Admin sets request back to pending
export async function setPendingRequest(id, response = '', role = 'admin') {
  const data = await apiRequest(`/holiday/${id}/pending`, {
    method: 'PATCH',
    body: JSON.stringify({ response }),
  }, role)
  return data.record
}

// Get pending count (for badges)
export async function fetchPendingCount(role = 'admin') {
  const data = await apiRequest('/holiday/pending-count', {}, role)
  return data.pendingCount
}

// Admin gets stats (all requests count by status)
export async function fetchHolidayStats(role = 'admin') {
  const data = await apiRequest('/holiday/stats', {}, role)
  return data.stats
}

// Admin gets all requests (not just pending)
export async function fetchAllRequests(status = 'pending', search = '', role = 'admin') {
  let query = ''
  if (status || search) {
    const params = []
    if (status) params.push(`status=${status}`)
    if (search) params.push(`search=${encodeURIComponent(search)}`)
    query = '?' + params.join('&')
  }
  const data = await apiRequest(`/holiday/all${query}`, {}, role)
  return data.records
}

// Admin gets approved requests
export async function fetchApprovedRequests(search = '', role = 'admin') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/holiday/approved${query}`, {}, role)
  return data.records
}

// Admin gets rejected requests
export async function fetchRejectedRequests(search = '', role = 'admin') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/holiday/rejected${query}`, {}, role)
  return data.records
}

// Admin gets ALL requests regardless of status
export async function fetchAllHolidayRequests(search = '', role = 'admin') {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  const data = await apiRequest(`/holiday/all${query}`, {}, role)
  return data.records
}




