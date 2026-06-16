// Digilians-Final-Project/src/api/client.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:5000/api';

export const BACKEND_SERVER_URL = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;

export const openSafeUrl = (url, title = 'عرض الملف') => {
  if (!url) return;
  if (url.startsWith('data:')) {
    const newTab = window.open();
    if (newTab) {
      if (url.includes('application/pdf')) {
        newTab.document.write(`<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      } else {
        newTab.document.write(`<img src="${url}" style="max-width:100%; display:block; margin:auto;" />`);
      }
      newTab.document.title = title;
    }
  } else {
    const isAbsolute = url.startsWith('http://') || url.startsWith('https://');
    const finalUrl = isAbsolute ? url : `${BACKEND_SERVER_URL}${url}`;
    window.open(finalUrl, '_blank', 'noreferrer');
  }
};

// تعديل المسميات لتطابق ما يتم تخزينه فعلياً في متصفحك ومنع الـ session mixed
const STORAGE_KEYS = {
  admin: {
    token: 'digilians_token', 
    user: 'digilians_user',
  },
  user: {
    token: 'digilians_token',
    user: 'digilians_user',
  },
}

// دالة لمعرفة هل الحساب الحالي يمتلك صلاحيات إدارة أم لا
function isAdminRole(role) {
  if (!role) return false;
  const lowerRole = role.toLowerCase();
  return lowerRole === 'admin' || lowerRole === 'commander' || lowerRole === 'super_admin' || lowerRole === 'superadmin';
}

export function getToken(role = 'user') {
  const keys = isAdminRole(role) ? STORAGE_KEYS.admin : STORAGE_KEYS.user;
  return localStorage.getItem(keys.token);
}

export function saveAuthData({ token, user, role = 'user' }) {
  const keys = isAdminRole(role) ? STORAGE_KEYS.admin : STORAGE_KEYS.user;
  localStorage.setItem(keys.token, token);
  localStorage.setItem(keys.user, JSON.stringify(user));
}

export function getSavedUser(role = 'user') {
  const keys = isAdminRole(role) ? STORAGE_KEYS.admin : STORAGE_KEYS.user;
  const savedUser = localStorage.getItem(keys.user);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

export function clearAuthData(role = 'user') {
  const keys = isAdminRole(role) ? STORAGE_KEYS.admin : STORAGE_KEYS.user;
  localStorage.removeItem(keys.token);
  localStorage.removeItem(keys.user);
}

export async function apiRequest(path, options = {}, role = 'user') {
  const token = getToken(role);

  // If the body is FormData, do not set Content-Type header (browser will set multipart boundary)
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  if (!isFormData) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // معالجة حالة الـ 404 لروابط الأدمن أو المشاكل العامة
  if (response.status === 404) {
    console.error(`❌ الرابط غير موجود بالسيرفر: ${path}`);
  }

  // في حال لم تكن الاستجابة JSON صافي
  let data = {};
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    throw new Error('حدث خطأ داخلي في السيرفر (Internal Server Error 500)');
  }

  if (response.status === 401) {
    clearAuthData(role);
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'حدث خطأ أثناء الاتصال بالسيرفر');
  }

  return data;
}

// 🔥 إضافة التصدير الافتراضي لحماية بقية الملفات من الانهيار
const client = { apiRequest, getToken, getSavedUser, saveAuthData, clearAuthData };
export default client;
