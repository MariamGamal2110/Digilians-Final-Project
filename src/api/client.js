const API_BASE_URL = 'http://localhost:5000/api'

export function getToken() {
  return localStorage.getItem('digilians_token')
}

export function saveAuthData({ token, user }) {
  localStorage.setItem('digilians_token', token)
  localStorage.setItem('digilians_user', JSON.stringify(user))
}

export function getSavedUser() {
  const savedUser = localStorage.getItem('digilians_user')

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch {
    return null
  }
}

export function clearAuthData() {
  localStorage.removeItem('digilians_token')
  localStorage.removeItem('digilians_user')
}

export async function apiRequest(path, options = {}) {
  const token = getToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'حدث خطأ أثناء الاتصال بالسيرفر')
  }

  return data
}