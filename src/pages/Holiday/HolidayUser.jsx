import React, { useState } from 'react'
import HolidayPageHeader from '../../components/HoildayComponents/HolidayUser/HolidayPageHeader'
import HolidayChoiceSection from '../../components/HoildayComponents/HolidayUser/HolidayChoiceSection'
import HolidayForm from '../../components/HoildayComponents/HolidayUser/HolidayForm'
import HolidayFormSimple from '../../components/HoildayComponents/HolidayUser/HolidayFormSimple'
import HolidaySuccessAlert from '../../components/HoildayComponents/HolidayUser/HolidaySuccessAlert'
import PendingStatus from '../../components/HoildayComponents/HolidayUser/PendingStatus'
import { getSavedUser } from '../../api/client'
import { saveHolidayAppeal } from '../../api/localRequests'

const DEFAULT_GOVERNORATE = 'اختر المحافظة'

export default function HolidayUser() {
  const savedUser = getSavedUser()
  const [selectedChoice, setSelectedChoice] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPending, setShowPending] = useState(false)
  const [formData, setFormData] = useState({
    fullName: savedUser?.name || '',
    militaryId: savedUser?.militaryId || '',
    governorate: DEFAULT_GOVERNORATE,
    reason: '',
    hasAppeal: false,
  })

  const resetForm = () => {
    setFormData({
      fullName: savedUser?.name || '',
      militaryId: savedUser?.militaryId || '',
      governorate: DEFAULT_GOVERNORATE,
      reason: '',
      hasAppeal: false,
    })
  }

  const handleChoiceChange = (choice) => {
    setSelectedChoice(choice)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (selectedChoice === 'yes') {
      if (!formData.fullName || !formData.militaryId) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    } else if (selectedChoice === 'no') {
      if (!formData.fullName || !formData.militaryId || formData.governorate === DEFAULT_GOVERNORATE || !formData.reason) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    }

    if (formData.hasAppeal) {
      saveHolidayAppeal({
        fullName: formData.fullName,
        militaryId: formData.militaryId,
        governorate: formData.governorate,
        reason: formData.reason || 'التماس من الطالب',
        penalty: selectedChoice === 'yes' ? null : 'التماس إجازة',
      })
    }

    setShowPending(true)
  }

  const handleCancel = () => {
    setSelectedChoice('')
    resetForm()
  }

  const handleResetPending = () => {
    resetForm()
    setSelectedChoice('')
    setShowPending(false)
  }

  return (
    <>
      {showPending ? (
        <PendingStatus onReset={handleResetPending} />
      ) : (
        <section dir="rtl" className="min-h-screen bg-background px-6 py-8">
          <div className="max-w-[1300px] mx-auto px-6">
            <HolidayPageHeader />

            <HolidayChoiceSection
              selectedChoice={selectedChoice}
              onChoiceChange={handleChoiceChange}
            />

            {selectedChoice && (
              <div className="mt-6 bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between gap-4">
                <div className="text-right">
                  <h3 className="text-primary font-bold">تقديم التماس للإدارة</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    عند تفعيل الالتماس سيظهر الطلب مباشرة في جزء الإجازات عند الأدمن.
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    name="hasAppeal"
                    checked={formData.hasAppeal}
                    onChange={handleFormChange}
                    className="peer sr-only"
                  />
                  <span className="h-7 w-12 rounded-full bg-gray-300 transition peer-checked:bg-[#555d30] after:absolute after:right-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:-translate-x-5" />
                </label>
              </div>
            )}

            {selectedChoice === 'yes' && (
              <HolidayFormSimple
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            )}

            {selectedChoice === 'no' && (
              <HolidayForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            )}

            {showSuccess && (
              <HolidaySuccessAlert
                message="تم استقبال طلبك بنجاح\nسيتم مراجعة الطلب من قبل الإدارة بأقرب وقت ممكن"
                onClose={() => setShowSuccess(false)}
              />
            )}
          </div>
        </section>
      )}
    </>
  )
}
