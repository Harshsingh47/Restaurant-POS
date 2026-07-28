import { useState, useCallback, useEffect } from 'react'
import { slides } from './slides'
import { generatePptx } from './generatePptx'

const slideTitles = [
  '01 Cover',
  '02 Pain Points & Challenges',
  '03 Platform Overview',
  '04 Product Ecosystem Hub',
  '05 16 Core Features',
  '06 End-to-End Workflow',
  '07 POS Billing Interface',
  '08 Kitchen Display System',
  '09 Smart Inventory & Recipe',
  '10 CRM & Loyalty',
  '11 Platform Integrations',
  '12 Analytics & BI',
  '13 Role Access Control',
  '14 System Architecture',
  '15 Technology Stack',
  '16 Innovation Pipeline',
  '17 Development Roadmap',
  '18 Why Choose Us',
  '19 Thank You & Q&A',
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === current) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 180)
  }, [transitioning, current])

  const prev = useCallback(() => goTo(Math.max(0, current - 1)), [goTo, current])
  const next = useCallback(() => goTo(Math.min(slides.length - 1, current + 1)), [goTo, current])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(slides.length - 1)
      } else if (e.key === 'Escape') {
        setShowGrid(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev, goTo])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generatePptx()
    } finally {
      setDownloading(false)
    }
  }

  const Slide = slides[current]

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#090D16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, zIndex: 10 }}>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            background: downloading ? 'rgba(37,99,235,0.5)' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            border: 'none',
            borderRadius: 8,
            color: 'white',
            padding: '7px 18px',
            cursor: downloading ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
            transition: 'all 0.15s ease',
          }}
        >
          {downloading ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Generating PPTX…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PPTX (19 Slides)
            </>
          )}
        </button>

        <button
          onClick={() => setShowGrid(!showGrid)}
          style={{
            background: showGrid ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: 'white',
            padding: '7px 14px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Slide Index
        </button>

        <button
          onClick={toggleFullscreen}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: 'white',
            padding: '7px 12px',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          {isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen'}
        </button>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Slide Container - 16:9 */}
      <div
        style={{
          width: 'min(95vw, calc(88vh * 16/9))',
          height: 'min(calc(95vw * 9/16), 88vh)',
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'scale(0.995)' : 'scale(1)',
            transition: 'all 0.18s ease-out',
          }}
        >
          <Slide />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, color: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
            color: current === 0 ? 'rgba(255,255,255,0.2)' : 'white',
            padding: '5px 14px', cursor: current === 0 ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 500,
          }}
        >
          ← Prev
        </button>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={slideTitles[i]}
              style={{
                width: i === current ? 22 : 6, height: 6, borderRadius: 3,
                background: i === current ? '#2563EB' : 'rgba(255,255,255,0.25)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
            color: current === slides.length - 1 ? 'rgba(255,255,255,0.2)' : 'white',
            padding: '5px 14px', cursor: current === slides.length - 1 ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 500,
          }}
        >
          Next →
        </button>

        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginLeft: 6 }}>
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Grid Modal Selector Overlay */}
      {showGrid && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(12px)', zIndex: 100, display: 'flex', flexDirection: 'column',
          padding: '32px 48px', overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h2 style={{ color: 'white', margin: 0, fontSize: 20, fontFamily: "'Poppins', sans-serif" }}>Presentation Overview</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: 12 }}>Click any slide to jump directly</p>
            </div>
            <button
              onClick={() => setShowGrid(false)}
              style={{
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
                borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13,
              }}
            >
              ✕ Close
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {slideTitles.map((title, i) => (
              <div
                key={i}
                onClick={() => {
                  goTo(i)
                  setShowGrid(false)
                }}
                style={{
                  background: i === current ? '#2563EB15' : 'rgba(255,255,255,0.05)',
                  border: i === current ? '2px solid #2563EB' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: 14, cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: i === current ? '#2563EB' : 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>
                  SLIDE {i + 1}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>
                  {title.replace(/^\d+\s*/, '')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
