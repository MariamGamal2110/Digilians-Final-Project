// Digilians-Final-Project/src/api/medical.js
import { apiRequest } from './client.js';

// ==========================================
// --- دالات الطالب (User) ---
// ==========================================

// جلب السجلات الخاصة بالطالب الحالي
export const fetchMyMedicalRecords = async () => {
  const response = await apiRequest('/medical/me', { method: 'GET' }, 'user');
  return response.data || response;
};

// حفظ سجل طبي جديد
export const saveMedicalRecord = async (data) => {
  const response = await apiRequest('/medical', {
    method: 'POST',
    body: JSON.stringify(data),
  }, 'user');
  return response.data || response;
};

// تحديث السجل الطبي من قبل الطالب
export const updateMedicalRecord = async (id, data) => {
  const response = await apiRequest(`/medical/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, 'user');
  return response.data || response;
};

// حذف السجل الطبي
export const deleteMedicalRecord = async (id) => {
  const response = await apiRequest(`/medical/${id}`, { method: 'DELETE' }, 'user');
  return response.data || response;
};

// ==========================================
// --- دالات الإدارة (Admin) ---
// ==========================================

// جلب كل السجلات للأدمن
export const fetchMedicalRecordsAdmin = async () => {
  const response = await apiRequest('/medical', { method: 'GET' }, 'admin');
  return response.data || response;
};

// جلب الإحصائيات للأدمن
export const fetchMedicalStats = async () => {
  const response = await apiRequest('/medical/stats', { method: 'GET' }, 'admin');
  return response.data || response;
};

// تحديث حالة السجل (مقبول / حرج) من قبل الأدمن بالتوافق مع الـ Body والـ Role
export const updateMedicalStatus = async (id, status) => {
  try {
    const response = await apiRequest('/medical/status', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    }, 'admin');
    return response.data || response;
  } catch (error) {
    console.error('Error in updateMedicalStatus API call:', error);
    throw error;
  }
};