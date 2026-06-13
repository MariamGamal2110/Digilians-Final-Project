// Frontend API wrapper for excuses
import { apiRequest } from './client.js';

// Create a new excuse/request (works for optional-auth users)
export const createExcuse = async (data) => {
  // if data is FormData (file upload), pass through to apiRequest directly
  const isForm = typeof FormData !== 'undefined' && data instanceof FormData;

  const options = isForm
    ? { method: 'POST', body: data }
    : { method: 'POST', body: JSON.stringify(data) };

  const response = await apiRequest('/excuses', options, 'user');
  return (response && (response.data?.excuse || response.excuse)) || response;
};

// Get excuses for the currently authenticated user
export const getMyExcuses = async () => {
  const response = await apiRequest('/excuses/me', { method: 'GET' }, 'user');
  return (response && (response.data?.excuses || response.excuses)) || response;
};

// Admin: get all excuses
export const getAllExcuses = async () => {
  const response = await apiRequest('/excuses', { method: 'GET' }, 'admin');
  return (response && (response.data?.excuses || response.excuses)) || response;
};

// Admin: respond to an excuse (id) with payload { response, status }
export const respondToExcuse = async (id, payload) => {
  const response = await apiRequest(`/excuses/${id}/respond`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, 'admin');
  return (response && (response.data?.excuse || response.excuse)) || response;
};

export default { createExcuse, getMyExcuses, getAllExcuses, respondToExcuse };
