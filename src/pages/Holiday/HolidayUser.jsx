import React, { useState } from 'react'
import HolidayPageHeader from '../../components/HoildayComponents/HolidayUser/HolidayPageHeader'
import HolidayChoiceSection from '../../components/HoildayComponents/HolidayUser/HolidayChoiceSection'
import HolidayForm from '../../components/HoildayComponents/HolidayUser/HolidayForm'
import HolidayFormSimple from '../../components/HoildayComponents/HolidayUser/HolidayFormSimple'
import HolidaySuccessAlert from '../../components/HoildayComponents/HolidayUser/HolidaySuccessAlert'
import PendingStatus from '../../components/HoildayComponents/HolidayUser/PendingStatus'

export default function HolidayUser() {
  const [selectedChoice, setSelectedChoice] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPending, setShowPending] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    militaryId: '',
    governorate: 'اختر المحافظة',
    reason: ''
  })

  const handleChoiceChange = (choice) => {
    setSelectedChoice(choice)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    // التحقق من ملء الحقول المطلوبة حسب الاختيار
    if (selectedChoice === 'yes') {
      // أرغب في الدخول - نموذج مختصر (الاسم والرقم فقط)
      if (!formData.fullName || !formData.militaryId) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    } else if (selectedChoice === 'no') {
      // لا أرغب في الدخول - نموذج كامل (الاسم + الرقم + المحافظة + السبب)
      if (!formData.fullName || !formData.militaryId || formData.governorate === 'اختر المحافظة' || !formData.reason) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
    }

    console.log('Form submitted:', formData)
    setShowPending(true)
  }

  const handleCancel = () => {
    setSelectedChoice('')
    setFormData({
      fullName: '',
      militaryId: '',
      governorate: 'اختر المحافظة',
      reason: ''
    })
  }

  const handleResetPending = () => {
    setFormData({
      fullName: '',
      militaryId: '',
      governorate: 'اختر المحافظة',
      reason: ''
    })
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
            {/* رأس الصفحة */}
            <HolidayPageHeader />
            
            {/* قسم الاختيار */}
            <HolidayChoiceSection 
              selectedChoice={selectedChoice}
              onChoiceChange={handleChoiceChange}
            />

            {/* نموذج مختصر - عند اختيار نعم */}
            {selectedChoice === 'yes' && (
              <HolidayFormSimple
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            )}

            {/* نموذج كامل - عند اختيار لا */}
            {selectedChoice === 'no' && (
              <HolidayForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            )}

            {/* تنبيه النجاح */}
            {showSuccess && (
              <HolidaySuccessAlert
                message="تم استقبال طلبك بنجاح\nسيتم مراجعة الطلب من قبل الإدارة باقرب وقت ممكن"
                onClose={() => setShowSuccess(false)}
              />
            )}
          </div>
        </section>
      )}
    </>
  )
}