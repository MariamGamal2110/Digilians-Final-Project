const HOLIDAY_APPEALS_KEY = 'digilians_holiday_appeals'

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
      status: 'Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±',
      date: new Date().toLocaleDateString('ar-EG'),
    },
  ]

  localStorage.setItem(HOLIDAY_APPEALS_KEY, JSON.stringify(nextAppeals))
  return nextAppeals
}
