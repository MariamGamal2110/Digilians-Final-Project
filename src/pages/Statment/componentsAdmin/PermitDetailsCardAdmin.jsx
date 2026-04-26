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
    <section className="lg:col-span-8 glass-card border border-outline-variant/20 rounded-xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="bg-white p-4 rounded-xl border border-surface-dim shadow-inner flex flex-col items-center">
          <img
            alt="QR Code"
            className="w-48 h-48"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6nK0JymSXrvF0hAX4QnIw7vtTvK80J6qg9EPCs2dwHFR0fpjQORIXjlpbLuZOGL5CtqCaaUAwCkQcXYVpbeszfTlWf_Fl09iWmzgGzXnsZd1tECX4zBQCHIzEdG-Jgt5IOrSDbdy2szyC8rn4_uhtJi-_B9f2JM8ApLnr65dYgGvhrUN5oFHbnlLekHqp4ABGKL2r_4DbijAYQFfnqaKMD3rnhvglnvX-7VM7fSPLj_QPCZtkLGllJhiaW-IEmBRGLCYsUYEUVEil"
          />
          <span className="mt-4 text-xs font-bold text-primary tracking-widest">VALID ACCESS CODE</span>
        </div>

        <div className="flex-1 text-right w-full">
          <div className="mb-6">
            <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">نوع التصريح</span>
            <h3 className="text-2xl font-bold text-primary">إجازة اعتيادية</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">تاريخ البدء</span>
              <p className="text-lg font-semibold text-on-surface">١٥ أكتوبر ٢٠٢٣</p>
            </div>
            <div>
              <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">تاريخ العودة</span>
              <p className="text-lg font-semibold text-on-surface">١٨ أكتوبر ٢٠٢٣</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-on-surface">تصريح نشط</span>
            </div>

            <div className="flex gap-2">
              <button className="satin-gradient text-white px-4 py-2.5 rounded text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">download</span>
                تحميل البطاقة
              </button>
              <button
                className="bg-primary-container text-white px-4 py-2.5 rounded text-sm font-semibold flex items-center gap-2"
                onClick={openScanner}
                type="button"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                Scan QR
              </button>
            </div>
          </div>

          {scanResult && <p className="mt-3 text-sm font-semibold text-emerald-700">نتيجة الفحص: {scanResult}</p>}
          {scanError && <p className="mt-3 text-sm font-semibold text-amber-700">{scanError}</p>}
        </div>
      </div>

      {isScannerOpen && (
        <div className="mt-6 border border-outline-variant/40 rounded-xl p-4 bg-surface-container-low">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-primary">كاميرا المسح</h4>
            <button className="text-xs font-bold text-secondary" onClick={closeScanner} type="button">
              إغلاق
            </button>
          </div>
          <video className="w-full rounded-lg bg-black/80 max-h-72 object-cover" ref={videoRef} playsInline muted />
        </div>
      )}
    </section>
  )
}
