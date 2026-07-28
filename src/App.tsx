import { useState, useCallback, useEffect, useRef } from 'react'
import { slides } from './slides'

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
  const [showGrid, setShowGrid] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth
        setScale(cw / 1280)
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

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

  // Touch Swipe Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 40) {
      next()
    } else if (distance < -40) {
      prev()
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

  const Slide = slides[current]

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '-webkit-fill-available',
        background: '#090D16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px',
      }}
    >
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => setShowGrid(!showGrid)}
          style={{
            background: showGrid ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: 'white',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minHeight: 36,
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
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: 12,
            minHeight: 36,
          }}
        >
          {isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen'}
        </button>
      </div>

      {/* Slide Container - Scale-to-Fit 16:9 */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: 'min(98vw, calc(86vh * 16/9))',
          height: 'calc(min(98vw, calc(86vh * 16/9)) * 9 / 16)',
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <div
          style={{
            width: 1280,
            height: 720,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.18s ease-out',
          }}
        >
          <Slide />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, color: 'rgba(255,255,255,0.7)', zIndex: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
            color: current === 0 ? 'rgba(255,255,255,0.2)' : 'white',
            padding: '6px 14px', cursor: current === 0 ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 500, minHeight: 36,
          }}
        >
          ← Prev
        </button>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflowX: 'auto', maxWidth: '50vw', padding: '4px 0' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={slideTitles[i]}
              style={{
                width: i === current ? 20 : 6, height: 6, borderRadius: 3, flexShrink: 0,
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
            padding: '6px 14px', cursor: current === slides.length - 1 ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif", fontSize: 12.5, fontWeight: 500, minHeight: 36,
          }}
        >
          Next →
        </button>

        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Grid Modal Selector Overlay */}
      {showGrid && (
        <div
          className="index-modal"
          style={{
            position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(14px)', zIndex: 100, display: 'flex', flexDirection: 'column',
            padding: '28px 36px', overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ color: 'white', margin: 0, fontSize: 18, fontFamily: "'Poppins', sans-serif" }}>Presentation Index</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: 11 }}>Tap any slide to jump directly</p>
            </div>
            <button
              onClick={() => setShowGrid(false)}
              style={{
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
                borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12, minHeight: 36,
              }}
            >
              ✕ Close
            </button>
          </div>
          <div className="index-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {slideTitles.map((title, i) => (
              <div
                key={i}
                onClick={() => {
                  goTo(i)
                  setShowGrid(false)
                }}
                style={{
                  background: i === current ? '#2563EB18' : 'rgba(255,255,255,0.05)',
                  border: i === current ? '2px solid #2563EB' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: 12, cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex', flexDirection: 'column', gap: 4,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: i === current ? '#2563EB' : 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>
                  SLIDE {i + 1}
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>
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
