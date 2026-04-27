import React, { useEffect, useRef, useState } from 'react'

export default function PermitDetailsCardAdmin() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const rafRef = useRef(null)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState('')
  const [scanError, setScanError] = useState('')

  const stopScanner = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  const scanFrame = async (detector) => {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      rafRef.current = requestAnimationFrame(() => scanFrame(detector))
      return
    }

    try {
      const codes = await detector.detect(videoRef.current)
      if (codes.length > 0) {
        setScanResult(codes[0].rawValue || 'QR detected')
        setScanError('')
        setIsScannerOpen(false)
        stopScanner()
        return
      }
    } catch (error) {
      setScanError('تعذر قراءة الكود حالياً. حاول تقريب الكاميرا من QR.')
    }

    rafRef.current = requestAnimationFrame(() => scanFrame(detector))
  }

  const openScanner = async () => {
    setScanError('')
    setScanResult('')

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setScanError('هذا المتصفح لا يدعم فتح الكاميرا.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: { ideal: 'environment' } },
      })

      streamRef.current = stream
      setIsScannerOpen(true)

      setTimeout(async () => {
        if (!videoRef.current) {
          return
        }

        videoRef.current.muted = true
        videoRef.current.setAttribute('playsinline', 'true')
        videoRef.current.srcObject = stream
        await videoRef.current.play()

        if ('BarcodeDetector' in window) {
          const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
          scanFrame(detector)
        } else {
          setScanError('المتصفح لا يدعم QR scan تلقائي. تم فتح الكاميرا فقط.')
        }
      }, 0)
    } catch (error) {
      setScanError('رفض صلاحية الكاميرا أو لا توجد كاميرا متاحة.')
      stopScanner()
    }
  }

  const closeScanner = () => {
    setIsScannerOpen(false)
    stopScanner()
  }

  return (
    <section className="mb-5">
      <div className="max-w-sm">
        <button
          className="w-full bg-[#555d30] text-white rounded-md px-5 py-3.5 text-sm font-bold flex items-center  justify-between shadow"
          onClick={openScanner}
          type="button"
        >
          <span className="material-symbols-outlined text-lg ">qr_code_scanner</span>
          <span>مسح رمز الاستجابة السريعة (QR)</span>
        </button>
      </div>

      {isScannerOpen && (
        <div className="mt-4 border border-outline-variant/40 rounded-xl p-4 bg-surface-container-low max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-primary">كاميرا المسح</h4>
            <button className="text-xs font-bold text-secondary" onClick={closeScanner} type="button">
              إغلاق
            </button>
          </div>
          <video className="w-full rounded-lg bg-black/80 max-h-72 object-cover" ref={videoRef} playsInline muted autoPlay />
          {scanResult && <p className="mt-3 text-sm font-semibold text-emerald-700">نتيجة الفحص: {scanResult}</p>}
          {scanError && <p className="mt-3 text-sm font-semibold text-amber-700">{scanError}</p>}
        </div>
      )}
    </section>
  )
}
