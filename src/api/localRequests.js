const HOLIDAY_APPEALS_KEY = 'digilians_holiday_appeals'
const MEDICAL_RECORDS_KEY = 'digilians_medical_records'

export function getHolidayAppeals() {
  const saved = localStorage.getItem(HOLIDAY_APPEALS_KEY)

  if (!saved) {
    return []
  }

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function saveHolidayAppeal(appeal) {
  const appeals = getHolidayAppeals()
  const nextAppeals = [
    ...appeals,
    {
      ...appeal,
      id: appeal.id || `appeal-${Date.now()}`,
      requestType: 'appeal',
      status: 'قيد الانتظار',
      date: new Date().toLocaleDateString('ar-EG'),
    },
  ]

  localStorage.setItem(HOLIDAY_APPEALS_KEY, JSON.stringify(nextAppeals))
  return nextAppeals
}

export function getMedicalRecords() {
  const saved = localStorage.getItem(MEDICAL_RECORDS_KEY)

  if (!saved) {
    return []
  }

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function saveMedicalRecord(record) {
  const records = getMedicalRecords()
  const nextRecords = [
    { ...record, id: record.id || `medical-${Date.now()}` },
    ...records,
  ]

  localStorage.setItem(MEDICAL_RECORDS_KEY, JSON.stringify(nextRecords))
  return nextRecords
}

export function updateMedicalRecord(record) {
  const records = getMedicalRecords()
  const nextRecords = records.map((item) => (item.id === record.id ? record : item))
  localStorage.setItem(MEDICAL_RECORDS_KEY, JSON.stringify(nextRecords))
  return nextRecords
}

export function deleteMedicalRecord(recordId) {
  const records = getMedicalRecords()
  const nextRecords = records.filter((item) => item.id !== recordId)
  localStorage.setItem(MEDICAL_RECORDS_KEY, JSON.stringify(nextRecords))
  return nextRecords
}
