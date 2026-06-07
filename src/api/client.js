const API_BASE_URL = 'http://localhost:5000/api'

// Separate storage keys for admin and user to prevent session mixing
const STORAGE_KEYS = {
  admin: {
    token: 'digilians_admin_token',
    user: 'digilians_admin_user',
  },
  user: {
    token: 'digilians_user_token',
    user: 'digilians_user_user',
  },
}

export function getToken(role = 'user') {
  const keys = role === 'admin' || role === 'commander' || role === 'super_admin'
    ? STORAGE_KEYS.admin
    : STORAGE_KEYS.user
  return localStorage.getItem(keys.token)
}

export function saveAuthData({ token, user, role = 'user' }) {
  const keys = role === 'admin' || role === 'commander' || role === 'super_admin'
    ? STORAGE_KEYS.admin
    : STORAGE_KEYS.user
  localStorage.setItem(keys.token, token)
  localStorage.setItem(keys.user, JSON.stringify(user))
}

export function getSavedUser(role = 'user') {
  const keys = role === 'admin' || role === 'commander' || role === 'super_admin'
    ? STORAGE_KEYS.admin
    : STORAGE_KEYS.user
  const savedUser = localStorage.getItem(keys.user)

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch {
    return null
  }
}

export function clearAuthData(role = 'user') {
  const keys = role === 'admin' || role === 'commander' || role === 'super_admin'
    ? STORAGE_KEYS.admin
    : STORAGE_KEYS.user
  localStorage.removeItem(keys.token)
  localStorage.removeItem(keys.user)
}

export async function apiRequest(path, options = {}, role = 'user') {
  const token = getToken(role)

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  const data = await response.json()

  if (response.status === 401) {
    clearAuthData(role)
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'حدث خطأ أثناء الاتصال بالسيرفر')
  }

  return data
}