/* All 19 slides for Restaurant POS presentation */

const BLUE = '#2563EB'
const NAVY = '#0F172A'
const EMERALD = '#10B981'
const WHITE = '#FFFFFF'
const SLATE = '#64748B'
const LIGHT = '#F8FAFC'
const BLUE_LIGHT = '#EFF6FF'
const EMERALD_LIGHT = '#ECFDF5'

// ── Shared primitives ──────────────────────────────────────────────────────────

const H1 = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, margin: 0, lineHeight: 1.1, ...style }}>
    {children}
  </h1>
)
const H2 = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, margin: 0, lineHeight: 1.2, ...style }}>
    {children}
  </h2>
)
const H3 = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, margin: 0, lineHeight: 1.3, ...style }}>
    {children}
  </h3>
)
const P = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ fontFamily: "'Inter', sans-serif", margin: 0, lineHeight: 1.6, ...style }}>{children}</p>
)

const Badge = ({ children, color = BLUE }: { children: React.ReactNode; color?: string }) => (
  <span style={{
    display: 'inline-block',
    alignSelf: 'flex-start',
    background: color + '18',
    color,
    border: `1px solid ${color}30`,
    borderRadius: 20,
    padding: '3px 12px',
    fontSize: '0.7em',
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  }}>
    {children}
  </span>
)

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    background: WHITE,
    borderRadius: 12,
    border: '1px solid #E2E8F0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    ...style,
  }}>
    {children}
  </div>
)

// ── Slide layout wrapper ───────────────────────────────────────────────────────
const SlideWrap = ({ children, bg = WHITE, style }: {
  children: React.ReactNode
  bg?: string
  style?: React.CSSProperties
}) => (
  <div style={{
    width: 1280,
    height: 720,
    background: bg,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    ...style,
  }}>
    {children}
  </div>
)

// ── Header bar used on most content slides ─────────────────────────────────────
const SlideHeader = ({ tag, title, sub, light = false }: {
  tag: string; title: string; sub?: string; light?: boolean
}) => (
  <div style={{
    padding: '24px 48px 16px',
    borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 6,
  }}>
    <Badge color={light ? EMERALD : BLUE}>{tag}</Badge>
    <H2 style={{ fontSize: 22, color: light ? WHITE : NAVY }}>{title}</H2>
    {sub && <P style={{ fontSize: 12, color: light ? 'rgba(255,255,255,0.6)' : SLATE }}>{sub}</P>}
  </div>
)

// ── SVG Icon set ───────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = BLUE }: { name: string; size?: number; color?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
    box: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    gitbranch: <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    cpu: <><rect x="9" y="9" width="6" height="6"/><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M9 2v7M15 2v7M9 15v7M15 15v7M2 9h7M2 15h7M15 9h7M15 15h7"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    cloud: <><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    wifi: <><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
    package: <><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    printer: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
    creditcard: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    map: <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    server: <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    tool: <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    key: <><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 0116 1.18 2 2 0 0118 3.18v3a2 2 0 01-1.56 1.95l-1.5.38a14 14 0 006.46 6.46l.38-1.5A2 2 0 0122 16.92z"/></>,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    mic: <><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    qr: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3"/><rect x="16" y="5" width="3" height="3"/><rect x="5" y="16" width="3" height="3"/><path d="M14 14h3v3h-3z"/><path d="M17 17h3v3h-3z"/><path d="M14 17h.01"/><path d="M17 14h.01"/></>,
    link: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    gift: <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    ai: <><path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2z"/><path d="M12 16a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2v-2a2 2 0 012-2z"/><path d="M2 12a2 2 0 012-2h2a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z"/><path d="M16 12a2 2 0 012-2h2a2 2 0 012 2 2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
  }
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name] ?? <circle cx="12" cy="12" r="10"/>}
    </svg>
  )
}

// ── SLIDE 1 – Cover ────────────────────────────────────────────────────────────
const Slide1 = () => (
  <SlideWrap bg={NAVY} style={{ justifyContent: 'center' }}>
    {/* Background geometric accent */}
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `radial-gradient(ellipse at 70% 30%, #1E40AF22 0%, transparent 60%),
                   radial-gradient(ellipse at 20% 80%, ${EMERALD}11 0%, transparent 50%)`,
    }} />
    <div style={{
      position: 'absolute', right: 0, top: 0, width: '45%', height: '100%',
      background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
      clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
    }} />
    {/* Grid lines */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} viewBox="0 0 1280 720">
      {Array.from({ length: 20 }, (_, i) => (
        <line key={i} x1={i * 64} y1="0" x2={i * 64} y2="720" stroke="white" strokeWidth="1"/>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" y1={i * 64} x2="1280" y2={i * 64} stroke="white" strokeWidth="1"/>
      ))}
    </svg>

    <div style={{ position: 'relative', zIndex: 1, padding: '0 64px', maxWidth: '60%' }}>
      {/* Tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: `${BLUE}25`, border: `1px solid ${BLUE}50`,
        borderRadius: 20, padding: '5px 16px', marginBottom: 24,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: EMERALD }} />
        <span style={{ color: EMERALD, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>
          SaaS Product Presentation
        </span>
      </div>

      <H1 style={{ fontSize: 42, color: WHITE, marginBottom: 10 }}>
        Restaurant POS &<br />
        <span style={{ color: BLUE }}>Billing Software</span>
      </H1>
      <H2 style={{ fontSize: 22, color: EMERALD, fontWeight: 500, marginBottom: 16 }}>
        Smart. Fast. Scalable.
      </H2>
      <P style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 480, marginBottom: 40 }}>
        A Complete Cloud-Based Restaurant Management Solution designed for modern restaurants, cloud kitchens, and multi-branch food service businesses.
      </P>


    </div>

    {/* Right panel decorative */}
    <div style={{
      position: 'absolute', right: 64, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {[
        { icon: 'monitor', label: 'POS Terminal', color: BLUE },
        { icon: 'smartphone', label: 'Captain App', color: EMERALD },
        { icon: 'cloud', label: 'Cloud Dashboard', color: '#818CF8' },
        { icon: 'chart', label: 'Analytics', color: '#F59E0B' },
      ].map(item => (
        <div key={item.label} style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 12, padding: '12px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${item.color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={item.icon} size={18} color={item.color} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div style={{
      position: 'absolute', bottom: 20, left: 64, right: 64,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>Confidential — For Discussion Purposes Only</span>
      <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>© 2025 Restaurant POS Platform</span>
    </div>
  </SlideWrap>
)

// ── SLIDE 2 – Problem Statement ────────────────────────────────────────────────
const Slide2 = () => {
  const problems = [
    { icon: 'clock', title: 'Slow Billing', desc: 'Manual billing takes 5–8 min per table, creating queues and poor experience', color: '#EF4444' },
    { icon: 'list', title: 'Manual KOT', desc: 'Paper-based kitchen tickets lead to lost orders and preparation errors', color: '#F97316' },
    { icon: 'box', title: 'Inventory Mismatch', desc: 'No real-time stock tracking causes over-purchasing and wastage', color: '#F59E0B' },
    { icon: 'alert', title: 'Human Errors', desc: 'Wrong orders, incorrect billing, and cash discrepancies are costly', color: '#EF4444' },
    { icon: 'chart', title: 'No Centralized Reports', desc: 'Owners lack real-time visibility into sales, costs, and performance', color: '#8B5CF6' },
    { icon: 'gitbranch', title: 'Multi-Branch Chaos', desc: 'Managing multiple outlets without unified tools is fragmented', color: '#6366F1' },
    { icon: 'users', title: 'Poor Customer Insights', desc: 'No CRM or loyalty tools means lost repeat business opportunities', color: '#EC4899' },
    { icon: 'trending', title: 'Revenue Leakage', desc: 'Unbilled items, staff pilferage, and untracked discounts drain profits', color: '#DC2626' },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="The Challenge" title="Why Restaurants Struggle Today" sub="Key operational pain points limiting growth and profitability" />
      <div style={{ flex: 1, padding: '16px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 14 }}>
        {problems.map(p => (
          <Card key={p.title} style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${p.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={p.icon} size={18} color={p.color} />
              </div>
              <H3 style={{ fontSize: 13, color: NAVY }}>{p.title}</H3>
            </div>
            <P style={{ fontSize: 11.5, color: SLATE, lineHeight: 1.5 }}>{p.desc}</P>
          </Card>
        ))}
      </div>
      {/* Bottom stat bar */}
      <div style={{ padding: '14px 48px', background: NAVY, display: 'flex', gap: 40, justifyContent: 'center' }}>
        {[
          { v: '₹2.4L', label: 'Avg. annual loss from errors' },
          { v: '23%', label: 'Revenue lost to poor tracking' },
          { v: '68%', label: 'Owners lack real-time data' },
          { v: '4.1x', label: 'Cost of manual vs automated' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ color: BLUE, fontSize: 20, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>{s.v}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 3 – Our Solution ─────────────────────────────────────────────────────
const Slide3 = () => {
  const solutions = [
    { icon: 'creditcard', label: 'POS Billing', color: BLUE },
    { icon: 'printer', label: 'Kitchen Mgmt', color: EMERALD },
    { icon: 'box', label: 'Inventory', color: '#F59E0B' },
    { icon: 'users', label: 'CRM', color: '#8B5CF6' },
    { icon: 'chart', label: 'Analytics', color: '#EC4899' },
    { icon: 'smartphone', label: 'Mobile Ordering', color: '#06B6D4' },
    { icon: 'gitbranch', label: 'Multi-Branch', color: '#F97316' },
    { icon: 'cloud', label: 'Cloud Dashboard', color: '#6366F1' },
  ]
  return (
    <SlideWrap>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left */}
        <div style={{ width: '42%', background: NAVY, padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Badge color={EMERALD}>Our Platform</Badge>
          <H1 style={{ fontSize: 30, color: WHITE, marginTop: 16, marginBottom: 16 }}>
            One Platform.<br />
            <span style={{ color: BLUE }}>Every Solution.</span>
          </H1>
          <P style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 32 }}>
            A unified, cloud-native restaurant management platform that automates your entire operations — from table to kitchen to reports.
          </P>
          {/* Key differentiators */}
          {['Cloud-first, offline-capable architecture', 'Real-time sync across all devices', 'GST-compliant billing engine', 'White-label ready for enterprises'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${EMERALD}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={12} color={EMERALD} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Right - Hub visual */}
        <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          {/* Center hub */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 12px ${BLUE}15, 0 8px 32px ${BLUE}40`,
            }}>
              <Icon name="zap" size={24} color={WHITE} />
              <span style={{ color: WHITE, fontSize: 9, fontWeight: 600, marginTop: 3, fontFamily: "'Poppins', sans-serif" }}>CORE PLATFORM</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {solutions.map(s => (
              <Card key={s.label} style={{ padding: '16px 12px', textAlign: 'center', cursor: 'default' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${s.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <Icon name={s.icon} size={20} color={s.color} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 4 – Product Ecosystem ────────────────────────────────────────────────
const Slide4 = () => {
  const leftModules = [
    { label: 'POS Billing', desc: 'Fast checkout & GST engine', icon: 'creditcard', color: BLUE },
    { label: 'Kitchen KDS', desc: 'Live ticket display & prep timer', icon: 'printer', color: '#F97316' },
    { label: 'Inventory & Recipe', desc: 'Auto stock deduction & alerts', icon: 'box', color: '#F59E0B' },
    { label: 'CRM & Loyalty', desc: '360° customer profile & rewards', icon: 'users', color: '#8B5CF6' },
    { label: 'Analytics & BI', desc: 'Real-time sales & profit reports', icon: 'chart', color: EMERALD },
  ]

  const rightModules = [
    { label: 'Online Orders', desc: 'Swiggy/Zomato direct integration', icon: 'globe', color: '#06B6D4' },
    { label: 'Payments Engine', desc: 'UPI, Cards, Cash & Split pay', icon: 'creditcard', color: '#EC4899' },
    { label: 'Multi-Outlet Admin', desc: 'Central menu & branch control', icon: 'gitbranch', color: '#F97316' },
    { label: 'QR Ordering', desc: 'Contactless table ordering', icon: 'qr', color: BLUE },
    { label: 'Role Access', desc: 'Granular staff permissions', icon: 'key', color: '#8B5CF6' },
  ]

  return (
    <SlideWrap>
      <SlideHeader
        tag="Product Ecosystem"
        title="Complete Restaurant Management Hub"
        sub="Everything connected — real-time, bidirectional data flow across all modules"
      />
      <div style={{ flex: 1, padding: '16px 40px 20px', display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: 20, alignItems: 'center' }}>
        {/* Left Column Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {leftModules.map(m => (
            <Card key={m.label} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, borderLeft: `4px solid ${m.color}` }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${m.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={m.icon} size={18} color={m.color} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{m.label}</div>
                <div style={{ fontSize: 10, color: SLATE }}>{m.desc}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Center Hub Card */}
        <Card style={{
          padding: '28px 20px',
          background: `linear-gradient(145deg, ${NAVY} 0%, #1E293B 100%)`,
          border: `1px solid ${BLUE}40`,
          boxShadow: `0 12px 32px ${NAVY}40, 0 0 0 1px ${BLUE}20`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle bg glow */}
          <div style={{
            position: 'absolute', width: 180, height: 180, borderRadius: '50%',
            background: `${BLUE}20`, filter: 'blur(30px)', top: -30, zIndex: 0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 10px ${BLUE}20, 0 0 0 20px ${BLUE}10`,
              marginBottom: 16,
            }}>
              <Icon name="zap" size={32} color={WHITE} />
            </div>

            <Badge color={EMERALD}>Central Data Bus</Badge>

            <H3 style={{ fontSize: 16, color: WHITE, marginTop: 12, marginBottom: 6 }}>
              Restaurant POS Platform
            </H3>
            <P style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', maxWidth: 220, marginBottom: 16, lineHeight: 1.4 }}>
              Unified event-driven core orchestrating real-time sync across all 10 modules
            </P>

            <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: EMERALD }}>&lt; 50ms</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>Sync Latency</div>
              </div>
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: BLUE }}>Bidirectional</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>Data Flow</div>
              </div>
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#F59E0B' }}>Offline-First</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>Auto Re-Sync</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Column Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rightModules.map(m => (
            <Card key={m.label} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, borderRight: `4px solid ${m.color}` }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${m.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={m.icon} size={18} color={m.color} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{m.label}</div>
                <div style={{ fontSize: 10, color: SLATE }}>{m.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 5 – Core Features ────────────────────────────────────────────────────
const Slide5 = () => {
  const features = [
    { icon: 'creditcard', label: 'Billing Engine', desc: 'Fast checkout, split bills & item customization', color: BLUE },
    { icon: 'tag', label: 'GST Compliance', desc: 'Auto tax computation & E-invoicing export', color: EMERALD },
    { icon: 'map', label: 'Table Management', desc: 'Visual floor map with real-time occupancy', color: '#F59E0B' },
    { icon: 'printer', label: 'KOT Generation', desc: 'Instant kitchen ticket routing & prep timers', color: '#F97316' },
    { icon: 'list', label: 'Menu Management', desc: 'Dynamic pricing, variants & combo menus', color: '#8B5CF6' },
    { icon: 'box', label: 'Inventory Control', desc: 'Real-time stock deduction on every order', color: '#06B6D4' },
    { icon: 'tool', label: 'Recipe Mgmt', desc: 'Ingredient mapping & food cost tracking', color: EMERALD },
    { icon: 'trending', label: 'Expense Tracker', desc: 'Log daily outlet expenses & petty cash', color: '#EC4899' },
    { icon: 'users', label: 'Customer CRM', desc: '360° guest profiles & order preferences', color: '#6366F1' },
    { icon: 'star', label: 'Loyalty Engine', desc: 'Automated points, rewards & WhatsApp perks', color: '#F59E0B' },
    { icon: 'qr', label: 'QR Ordering', desc: 'Contactless digital menu & table ordering', color: BLUE },
    { icon: 'gitbranch', label: 'Multi-Outlet Admin', desc: 'Centralized menu, pricing & branch control', color: '#F97316' },
    { icon: 'chart', label: 'Reports & BI', desc: '50+ real-time financial & sales insights', color: EMERALD },
    { icon: 'key', label: 'Role Permissions', desc: 'Granular access for cashiers, managers & staff', color: '#8B5CF6' },
    { icon: 'wifi', label: 'Offline Billing', desc: 'Uninterrupted billing during internet outages', color: '#EC4899' },
    { icon: 'cloud', label: 'Cloud Sync', desc: 'Instant multi-device cloud synchronization', color: BLUE },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Core Features" title="16 Powerful Modules Built In" sub="Everything your restaurant needs — out of the box, no plugins required" />
      <div style={{ flex: 1, padding: '14px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', gap: 10 }}>
        {features.map(f => (
          <Card key={f.label} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${f.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name={f.icon} size={18} color={f.color} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{f.label}</div>
              <div style={{ fontSize: 9.5, color: SLATE, lineHeight: 1.3 }}>{f.desc}</div>
            </div>
          </Card>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 6 – End-to-End Workflow ──────────────────────────────────────────────
const Slide6 = () => {
  const steps = [
    { icon: 'user', label: 'Customer\nArrives', color: BLUE },
    { icon: 'map', label: 'Table\nAssigned', color: '#6366F1' },
    { icon: 'phone', label: 'Order\nTaken', color: '#8B5CF6' },
    { icon: 'send', label: 'KOT\nSent', color: '#F97316' },
    { icon: 'tool', label: 'Kitchen\nPreps', color: '#F59E0B' },
    { icon: 'home', label: 'Food\nServed', color: EMERALD },
    { icon: 'creditcard', label: 'Bill\nGenerated', color: '#06B6D4' },
    { icon: 'zap', label: 'Payment\nDone', color: EMERALD },
    { icon: 'refresh', label: 'Stock\nUpdated', color: '#EC4899' },
    { icon: 'chart', label: 'Reports\nUpdated', color: BLUE },
  ]

  return (
    <SlideWrap>
      <SlideHeader tag="Workflow" title="End-to-End Restaurant Operations" sub="Fully automated — from customer arrival to inventory reconciliation" />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 48px' }}>
        {/* Horizontal flow */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 'none' }}>
                {/* Step number */}
                <div style={{
                  fontSize: 9, fontWeight: 700, color: s.color,
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `${s.color}12`,
                  border: `2px solid ${s.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={s.icon} size={20} color={s.color} />
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: NAVY, textAlign: 'center',
                  fontFamily: "'Poppins', sans-serif", whiteSpace: 'pre-line', lineHeight: 1.3,
                }}>
                  {s.label}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: 2,
                  background: `linear-gradient(90deg, ${s.color}60, ${steps[i+1].color}60)`,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', right: -5, top: -4,
                    borderLeft: `8px solid ${steps[i+1].color}60`,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Auto-trigger note */}
      <div style={{ padding: '12px 48px', background: BLUE_LIGHT, borderTop: `1px solid ${BLUE}20` }}>
        <P style={{ fontSize: 11, color: BLUE, textAlign: 'center' }}>
          Every step auto-triggers the next — zero manual handoffs. Real-time sync across POS, KDS, Inventory, and Reporting modules.
        </P>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 7 – POS Billing Module ───────────────────────────────────────────────
const Slide7 = () => (
  <SlideWrap>
    <SlideHeader tag="Module Deep Dive" title="POS Billing Interface" sub="Designed for speed — cashiers complete a full billing cycle in under 60 seconds" />
    <div style={{ flex: 1, padding: '12px 48px 20px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
      {/* POS Mockup */}
      <Card style={{ padding: 16, background: NAVY, border: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Category bar */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Starters', 'Mains', 'Beverages', 'Desserts'].map((c, i) => (
            <div key={c} style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 10, fontWeight: 500,
              background: i === 0 ? BLUE : 'rgba(255,255,255,0.08)',
              color: i === 0 ? WHITE : 'rgba(255,255,255,0.6)',
              fontFamily: "'Inter', sans-serif", cursor: 'pointer',
            }}>{c}</div>
          ))}
        </div>
        {/* Item grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { name: 'Paneer Tikka', price: '₹320' },
            { name: 'Dal Makhani', price: '₹280' },
            { name: 'Butter Naan', price: '₹60' },
            { name: 'Veg Biryani', price: '₹340' },
            { name: 'Mango Lassi', price: '₹120' },
            { name: 'Gulab Jamun', price: '₹90' },
            { name: 'Tandoori Roti', price: '₹40' },
            { name: 'Palak Paneer', price: '₹300' },
          ].map(item => (
            <div key={item.name} style={{
              background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 8px',
              textAlign: 'center', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: EMERALD }}>{item.price}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Order summary */}
      <Card style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <H3 style={{ fontSize: 13, color: NAVY }}>Order #1042</H3>
          <Badge color={EMERALD}>Table 5</Badge>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { name: 'Paneer Tikka', qty: 2, price: 640 },
            { name: 'Butter Naan', qty: 4, price: 240 },
            { name: 'Dal Makhani', qty: 1, price: 280 },
            { name: 'Mango Lassi', qty: 2, price: 240 },
          ].map(item => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', background: LIGHT, borderRadius: 6 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>{item.name}</div>
                <div style={{ fontSize: 9, color: SLATE }}>×{item.qty}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: NAVY }}>₹{item.price}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { label: 'Subtotal', val: '₹1,400' },
            { label: 'Discount (10%)', val: '−₹140', color: EMERALD },
            { label: 'GST 5%', val: '+₹63' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: SLATE }}>{r.label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: r.color || NAVY }}>{r.val}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '8px 0', borderTop: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>Total</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: BLUE, fontFamily: "'Poppins', sans-serif" }}>₹1,323</span>
          </div>
        </div>
        {/* Payment buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {['Cash', 'Card', 'UPI'].map(m => (
            <div key={m} style={{
              padding: '8px', borderRadius: 8, textAlign: 'center',
              background: m === 'UPI' ? BLUE : LIGHT,
              color: m === 'UPI' ? WHITE : NAVY,
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}>{m}</div>
          ))}
        </div>
        <div style={{
          background: EMERALD, borderRadius: 8, padding: '10px',
          textAlign: 'center', color: WHITE, fontWeight: 700, fontSize: 12,
          fontFamily: "'Poppins', sans-serif", cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="printer" size={14} color={WHITE} /> Print Bill
        </div>
      </Card>
    </div>
  </SlideWrap>
)

// ── SLIDE 8 – Kitchen Display System ──────────────────────────────────────────
const Slide8 = () => {
  const columns = [
    {
      label: 'Pending', color: '#F97316', bg: '#FFF7ED',
      orders: [
        { id: '#1047', items: ['Chicken Biryani ×2', 'Raita ×2'], time: '0:45', table: 'T-3' },
        { id: '#1048', items: ['Veg Thali ×1'], time: '1:12', table: 'T-8' },
      ],
    },
    {
      label: 'Preparing', color: BLUE, bg: BLUE_LIGHT,
      orders: [
        { id: '#1044', items: ['Paneer Tikka ×2', 'Naan ×4'], time: '4:22', table: 'T-5' },
        { id: '#1045', items: ['Dal Makhani ×1', 'Rice ×1'], time: '6:10', table: 'T-1' },
      ],
    },
    {
      label: 'Ready', color: EMERALD, bg: EMERALD_LIGHT,
      orders: [
        { id: '#1041', items: ['Palak Paneer ×1', 'Roti ×3'], time: '9:05', table: 'T-2' },
      ],
    },
    {
      label: 'Served', color: SLATE, bg: LIGHT,
      orders: [
        { id: '#1038', items: ['Biryani ×3'], time: '14:50', table: 'T-7' },
        { id: '#1039', items: ['Dosa ×2', 'Sambar'], time: '16:30', table: 'T-4' },
        { id: '#1040', items: ['Chole Bhature ×1'], time: '19:00', table: 'T-6' },
      ],
    },
  ]
  return (
    <SlideWrap bg={NAVY}>
      <SlideHeader tag="Kitchen Display System" title="Real-Time KOT Management" sub="Live order status across kitchen stations — zero paper tickets" light />
      <div style={{ flex: 1, padding: '16px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {columns.map(col => (
          <div key={col.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: col.color, borderRadius: 8,
            }}>
              <span style={{ color: WHITE, fontWeight: 700, fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>{col.label}</span>
              <span style={{ background: 'rgba(255,255,255,0.3)', color: WHITE, borderRadius: 12, padding: '1px 8px', fontSize: 10, fontWeight: 700 }}>
                {col.orders.length}
              </span>
            </div>
            {col.orders.map(order => (
              <div key={order.id} style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: 10,
                border: `1px solid ${col.color}40`, padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: col.color, fontWeight: 700, fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>{order.id}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>{order.table}</span>
                </div>
                {order.items.map(item => (
                  <div key={item} style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10.5, marginBottom: 3, paddingLeft: 8, borderLeft: `2px solid ${col.color}60` }}>
                    {item}
                  </div>
                ))}
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="clock" size={10} color={col.color} />
                  <span style={{ color: col.color, fontSize: 10, fontWeight: 600 }}>{order.time}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 9 – Inventory & Recipe ───────────────────────────────────────────────
const Slide9 = () => {
  const flow = [
    { icon: 'truck', label: 'Supplier Mgmt', desc: 'Vendor directory & purchase orders', color: '#F97316' },
    { icon: 'package', label: 'Inward Purchase', desc: 'Stock receiving & GRN verification', color: '#F59E0B' },
    { icon: 'box', label: 'Central Inventory', desc: 'Real-time multi-location stock tracking', color: BLUE },
    { icon: 'tool', label: 'Recipe Mapping', desc: 'Exact ingredient portion & yield calculation', color: '#8B5CF6' },
    { icon: 'printer', label: 'Order Placement', desc: 'POS order trigger from billing terminal', color: EMERALD },
    { icon: 'refresh', label: 'Auto Deduction', desc: 'Instant automated ingredient deduction', color: '#EC4899' },
  ]
  const items = [
    { name: 'Chicken Breast', stock: 82, alert: false, qty: '41 kg / 50 kg' },
    { name: 'Basmati Rice', stock: 45, alert: false, qty: '45 kg / 100 kg' },
    { name: 'Paneer', stock: 12, alert: true, qty: '2.4 kg / 20 kg' },
    { name: 'Tomatoes', stock: 65, alert: false, qty: '19.5 kg / 30 kg' },
    { name: 'Cooking Oil', stock: 8, alert: true, qty: '4L / 50L' },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Inventory" title="Smart Inventory & Recipe Management" sub="AI-powered stock tracking with automatic deduction on every order" />
      <div style={{ flex: 1, padding: '16px 48px 24px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, alignItems: 'center' }}>
        {/* Left: flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <H3 style={{ fontSize: 13, color: NAVY, marginBottom: 2 }}>Automated Inventory Flow</H3>
          {flow.map((step, i) => (
            <Card key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderLeft: `3px solid ${step.color}` }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${step.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={step.icon} size={15} color={step.color} />
              </div>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{step.label}</div>
                <div style={{ fontSize: 9.5, color: SLATE }}>{step.desc}</div>
              </div>
              {i === flow.length - 1 && (
                <span style={{ marginLeft: 'auto', fontSize: 9, background: EMERALD_LIGHT, color: EMERALD, borderRadius: 10, padding: '3px 8px', fontWeight: 700 }}>Real-Time</span>
              )}
            </Card>
          ))}
        </div>

        {/* Right: stock levels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <H3 style={{ fontSize: 13, color: NAVY }}>Live Stock Levels</H3>
              <Badge color={BLUE}>5 Active Ingredients</Badge>
            </div>
            {items.map(item => (
              <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11.5, color: NAVY, fontWeight: 600 }}>{item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 9.5, color: SLATE }}>{item.qty}</span>
                    {item.alert && (
                      <span style={{ fontSize: 8.5, background: '#FEF2F2', color: '#EF4444', borderRadius: 8, padding: '2px 6px', fontWeight: 700 }}>LOW STOCK</span>
                    )}
                    <span style={{ fontSize: 11, fontWeight: 800, color: item.alert ? '#EF4444' : NAVY }}>{item.stock}%</span>
                  </div>
                </div>
                <div style={{ height: 7, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${item.stock}%`,
                    background: item.stock < 20 ? '#EF4444' : item.stock < 40 ? '#F59E0B' : EMERALD,
                    borderRadius: 4,
                  }} />
                </div>
              </div>
            ))}
          </Card>

          <Card style={{ padding: 14, background: EMERALD_LIGHT, border: `1px solid ${EMERALD}30`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${EMERALD}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="zap" size={18} color={EMERALD} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>Auto Purchase Order Trigger</div>
              <div style={{ fontSize: 10, color: SLATE }}>System auto-generates supplier POs when ingredient stock drops below threshold</div>
            </div>
          </Card>
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 10 – Customer CRM & Loyalty ─────────────────────────────────────────
const Slide10 = () => (
  <SlideWrap>
    <SlideHeader tag="CRM & Loyalty" title="Know Your Customers Better" sub="360° customer intelligence to drive repeat visits and increase lifetime value" />
    <div style={{ flex: 1, padding: '12px 48px 20px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20 }}>
      {/* Customer Card */}
      <Card style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: `linear-gradient(135deg, ${BLUE} 0%, #7C3AED 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: WHITE, fontSize: 18, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
          }}>RA</div>
          <div>
            <H3 style={{ fontSize: 14, color: NAVY }}>Rahul Agarwal</H3>
            <P style={{ fontSize: 11, color: SLATE }}>Gold Member · +91 98765 43210</P>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Badge color={EMERALD}>Gold</Badge>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Total Visits', val: '47', icon: 'calendar', color: BLUE },
            { label: 'Total Spent', val: '₹38,400', icon: 'trending', color: EMERALD },
            { label: 'Reward Points', val: '2,840', icon: 'star', color: '#F59E0B' },
            { label: 'Avg. Order', val: '₹816', icon: 'activity', color: '#8B5CF6' },
          ].map(s => (
            <div key={s.label} style={{ background: LIGHT, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Icon name={s.icon} size={12} color={s.color} />
                <span style={{ fontSize: 9, color: SLATE }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, fontFamily: "'Poppins', sans-serif" }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: SLATE, marginBottom: 8 }}>FAVOURITE ITEMS</div>
          {['Chicken Biryani', 'Paneer Tikka', 'Mango Lassi'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE }} />
              <span style={{ fontSize: 11, color: NAVY }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Loyalty Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { icon: 'star', title: 'Points System', desc: 'Earn 1 point per ₹10 spent. Redeem at any visit.', color: '#F59E0B' },
          { icon: 'gift', title: 'Birthday Offers', desc: 'Auto-trigger special discount on customer birthdays', color: '#EC4899' },
          { icon: 'award', title: 'Membership Plans', desc: 'Silver, Gold & Platinum tiers with exclusive benefits', color: '#8B5CF6' },
          { icon: 'message', title: 'WhatsApp Alerts', desc: 'Auto-send bills, offers & updates via WhatsApp', color: EMERALD },
          { icon: 'heart', title: 'Personalisation', desc: 'Recommend dishes based on order history', color: '#EF4444' },
          { icon: 'chart', title: 'Visit Analytics', desc: 'Track cohort retention and churn risk scores', color: BLUE },
        ].map(f => (
          <Card key={f.title} style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={f.icon} size={16} color={f.color} />
              </div>
              <div>
                <H3 style={{ fontSize: 11, color: NAVY, marginBottom: 3 }}>{f.title}</H3>
                <P style={{ fontSize: 10, color: SLATE }}>{f.desc}</P>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </SlideWrap>
)

// ── SLIDE 11 – Integrations ────────────────────────────────────────────────────
const Slide11 = () => {
  const integrations = [
    { name: 'Swiggy', color: '#FF5200', cat: 'Food Delivery' },
    { name: 'Zomato', color: '#E23744', cat: 'Food Delivery' },
    { name: 'Dunzo', color: '#00C2A8', cat: 'Quick Commerce' },
    { name: 'Amazon Food', color: '#FF9900', cat: 'Food Delivery' },
    { name: 'Restaurant Website', color: BLUE, cat: 'Direct Orders' },
    { name: 'QR Ordering', color: '#8B5CF6', cat: 'Table Service' },
    { name: 'WhatsApp', color: '#25D366', cat: 'Messaging' },
    { name: 'Razorpay', color: '#2D81F7', cat: 'Payments' },
    { name: 'Tally', color: '#1A1A2E', cat: 'Accounting' },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Integrations" title="Connected Across Every Platform" sub="One-click integrations with India's leading food, payment, and business platforms" />
      <div style={{ flex: 1, padding: '16px 48px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* API Hub diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, flex: 1 }}>
          {integrations.map(int => (
            <Card key={int.name} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${int.color}15`,
                border: `1px solid ${int.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontSize: 14, fontWeight: 800, color: int.color, fontFamily: "'Poppins', sans-serif",
              }}>
                {int.name[0]}
              </div>
              <div>
                <H3 style={{ fontSize: 12, color: NAVY }}>{int.name}</H3>
                <P style={{ fontSize: 10, color: SLATE }}>{int.cat}</P>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: EMERALD }} />
              </div>
            </Card>
          ))}
        </div>

        {/* API note */}
        <Card style={{ padding: '14px 20px', background: NAVY, border: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Icon name="link" size={20} color={BLUE} />
          <P style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            RESTful API architecture with webhook support — integrate with any third-party tool in minutes. 40+ native integrations available.
          </P>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexShrink: 0 }}>
            {['REST API', 'Webhooks', 'SDK'].map(tag => (
              <span key={tag} style={{
                background: `${BLUE}30`, border: `1px solid ${BLUE}50`,
                color: BLUE, borderRadius: 6, padding: '3px 10px', fontSize: 10, fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}>{tag}</span>
            ))}
          </div>
        </Card>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 12 – Analytics Dashboard ────────────────────────────────────────────
const Slide12 = () => {
  const bars = [62, 78, 55, 90, 83, 71, 95]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <SlideWrap bg={NAVY}>
      <SlideHeader tag="Analytics" title="Actionable Business Intelligence" sub="Real-time insights that drive smarter decisions across all your outlets" light />
      <div style={{ flex: 1, padding: '12px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto 1fr', gap: 12 }}>
        {/* KPI Cards */}
        {[
          { label: "Today's Sales", val: '₹84,320', change: '+12.4%', icon: 'trending', color: EMERALD },
          { label: 'Orders', val: '247', change: '+8.1%', icon: 'activity', color: BLUE },
          { label: 'Avg. Order Value', val: '₹341', change: '+5.6%', icon: 'chart', color: '#F59E0B' },
          { label: 'Customer Growth', val: '+38', change: 'new today', icon: 'users', color: '#8B5CF6' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: 'rgba(255,255,255,0.06)', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{kpi.label}</span>
              <Icon name={kpi.icon} size={16} color={kpi.color} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: WHITE, fontFamily: "'Poppins', sans-serif" }}>{kpi.val}</div>
            <span style={{ fontSize: 10, color: kpi.color, fontWeight: 600 }}>{kpi.change}</span>
          </div>
        ))}

        {/* Revenue Chart */}
        <div style={{
          gridColumn: '1 / 3',
          background: 'rgba(255,255,255,0.06)', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px',
        }}>
          <H3 style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 12, fontWeight: 500 }}>Weekly Revenue Trend</H3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: i === 6 ? EMERALD : `linear-gradient(to top, ${BLUE}, ${BLUE}80)`,
                  borderRadius: '4px 4px 0 0',
                  minHeight: 8,
                }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px',
        }}>
          <H3 style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 10, fontWeight: 500 }}>Top Selling Items</H3>
          {[
            { name: 'Chicken Biryani', pct: 92 },
            { name: 'Paneer Tikka', pct: 78 },
            { name: 'Dal Makhani', pct: 64 },
            { name: 'Mango Lassi', pct: 48 },
          ].map(item => (
            <div key={item.name} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{item.name}</span>
                <span style={{ fontSize: 9, color: EMERALD, fontWeight: 600 }}>{item.pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${item.pct}%`, background: EMERALD, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Payment Split */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px',
        }}>
          <H3 style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 10, fontWeight: 500 }}>Payment Methods</H3>
          {[
            { label: 'UPI', pct: 48, color: BLUE },
            { label: 'Cash', pct: 30, color: '#F59E0B' },
            { label: 'Card', pct: 22, color: EMERALD },
          ].map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', flex: 1 }}>{p.label}</span>
              <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 9, color: p.color, fontWeight: 600, width: 28, textAlign: 'right' }}>{p.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 13 – User Roles ──────────────────────────────────────────────────────
const Slide13 = () => {
  const roles = [
    {
      role: 'Restaurant Owner', icon: 'award', color: '#F59E0B',
      perms: ['Full system access', 'Financial reports', 'Multi-outlet view', 'Staff management', 'Settings & config'],
    },
    {
      role: 'Manager', icon: 'users', color: BLUE,
      perms: ['Outlet reports', 'Staff scheduling', 'Inventory control', 'Discount approval', 'Menu updates'],
    },
    {
      role: 'Cashier', icon: 'creditcard', color: EMERALD,
      perms: ['Billing & POS', 'Payment collection', 'Daily cash report', 'Discount within limit', 'Customer lookup'],
    },
    {
      role: 'Captain', icon: 'user', color: '#8B5CF6',
      perms: ['Table management', 'Take orders', 'Send KOT', 'Modify orders', 'Customer notes'],
    },
    {
      role: 'Kitchen Staff', icon: 'tool', color: '#F97316',
      perms: ['View KOT', 'Update status', 'Recipe access', 'Inventory view', 'Wastage entry'],
    },
    {
      role: 'Inventory Manager', icon: 'box', color: '#EC4899',
      perms: ['Stock updates', 'Purchase orders', 'Supplier mgmt', 'Recipe mapping', 'Wastage reports'],
    },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Access Control" title="Role-Based Access Management" sub="Granular permissions — every staff member sees only what they need" />
      <div style={{ flex: 1, padding: '12px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 14 }}>
        {roles.map(r => (
          <Card key={r.role} style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${r.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={r.icon} size={18} color={r.color} />
              </div>
              <H3 style={{ fontSize: 13, color: NAVY }}>{r.role}</H3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {r.perms.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={10} color={r.color} />
                  <span style={{ fontSize: 10.5, color: SLATE }}>{p}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 14 – System Architecture ────────────────────────────────────────────
const Slide14 = () => (
  <SlideWrap bg={NAVY}>
    <SlideHeader tag="Architecture" title="Enterprise-Grade System Design" sub="Scalable microservices architecture built for reliability and performance" light />
    <div style={{ flex: 1, padding: '16px 48px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Client layer */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, color: BLUE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Client Layer</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Desktop POS', icon: 'monitor', color: BLUE },
            { label: 'Tablet / Captain App', icon: 'smartphone', color: '#8B5CF6' },
            { label: 'Admin Dashboard', icon: 'globe', color: EMERALD },
          ].map(c => (
            <div key={c.label} style={{
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${c.color}40`,
              borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Icon name={c.icon} size={16} color={c.color} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>↕</div>

      {/* Backend */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, color: BLUE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Backend Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { label: 'API Gateway', icon: 'shield', color: BLUE },
            { label: 'Auth Service', icon: 'key', color: '#F59E0B' },
            { label: 'Business Logic', icon: 'cpu', color: '#8B5CF6' },
            { label: 'WebSockets', icon: 'activity', color: EMERALD },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${s.color}30`,
              borderRadius: 10, padding: '10px 12px', textAlign: 'center',
            }}>
              <Icon name={s.icon} size={18} color={s.color} />
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>↕</div>

      {/* Data layer */}
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, color: BLUE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Data & Infrastructure</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { label: 'PostgreSQL', icon: 'database', color: '#4ECDC4' },
            { label: 'Redis Cache', icon: 'zap', color: '#F97316' },
            { label: 'Cloud Storage', icon: 'cloud', color: BLUE },
            { label: 'Analytics DB', icon: 'chart', color: EMERALD },
          ].map(d => (
            <div key={d.label} style={{
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${d.color}30`,
              borderRadius: 10, padding: '10px 12px', textAlign: 'center',
            }}>
              <Icon name={d.icon} size={18} color={d.color} />
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 6 }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideWrap>
)

// ── SLIDE 15 – Technology Stack ────────────────────────────────────────────────
const Slide15 = () => {
  const categories = [
    {
      label: 'Frontend', color: BLUE, icon: 'monitor',
      items: [
        { name: 'React.js', desc: 'Web dashboard & admin panel' },
        { name: 'Electron', desc: 'Desktop POS application' },
        { name: 'React Native', desc: 'Captain & mobile apps' },
      ],
    },
    {
      label: 'Backend', color: EMERALD, icon: 'server',
      items: [
        { name: 'Node.js + NestJS', desc: 'Scalable API microservices' },
        { name: 'WebSockets', desc: 'Real-time KDS & POS sync' },
        { name: 'GraphQL', desc: 'Flexible data querying' },
      ],
    },
    {
      label: 'Database', color: '#F59E0B', icon: 'database',
      items: [
        { name: 'PostgreSQL', desc: 'Primary relational database' },
        { name: 'Redis', desc: 'Caching & session store' },
        { name: 'Prisma ORM', desc: 'Type-safe DB queries' },
      ],
    },
    {
      label: 'Infrastructure', color: '#8B5CF6', icon: 'cloud',
      items: [
        { name: 'AWS / GCP', desc: 'Multi-region cloud hosting' },
        { name: 'Docker + K8s', desc: 'Container orchestration' },
        { name: 'Cloudflare', desc: 'CDN, DDoS, WAF protection' },
      ],
    },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Tech Stack" title="Modern, Battle-Tested Technology" sub="Industry-standard open-source stack for reliability, scale, and developer velocity" />
      <div style={{ flex: 1, padding: '16px 48px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {categories.map(cat => (
          <div key={cat.label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              background: `linear-gradient(135deg, ${cat.color} 0%, ${cat.color}BB 100%)`,
              borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Icon name={cat.icon} size={20} color={WHITE} />
              <H3 style={{ fontSize: 14, color: WHITE }}>{cat.label}</H3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.items.map(item => (
                <Card key={item.name} style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 3, fontFamily: "'Poppins', sans-serif" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: SLATE }}>{item.desc}</div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 16 – Future Modules ──────────────────────────────────────────────────
const Slide16 = () => {
  const modules = [
    { icon: 'calendar', label: 'Reservation System', desc: 'Online table booking with confirmation SMS', color: BLUE },
    { icon: 'monitor', label: 'Token Display', desc: 'Queue management for QSR and cloud kitchens', color: '#F97316' },
    { icon: 'star', label: 'Feedback System', desc: 'Post-meal digital feedback & rating collection', color: '#F59E0B' },
    { icon: 'qr', label: 'QR Menu Builder', desc: 'Contactless digital menu with live pricing', color: EMERALD },
    { icon: 'globe', label: 'Website Builder', desc: 'One-click restaurant website with online ordering', color: '#8B5CF6' },
    { icon: 'layers', label: 'Subscription Plans', desc: 'SaaS billing & plan management module', color: '#06B6D4' },
    { icon: 'ai', label: 'AI Sales Prediction', desc: 'ML-powered demand forecasting by hour & day', color: '#EC4899' },
    { icon: 'trending', label: 'AI Inventory Forecast', desc: 'Prevent stockouts with predictive reordering', color: BLUE },
    { icon: 'mic', label: 'Voice Ordering', desc: 'AI voice assistant for hands-free KOT entry', color: '#F59E0B' },
    { icon: 'smartphone', label: 'Marketplace', desc: 'Multi-vendor food court & cloud kitchen hub', color: EMERALD },
    { icon: 'eye', label: 'Computer Vision', desc: 'AI dish detection & automatic billing', color: '#F97316' },
    { icon: 'trending', label: 'AI Dynamic Pricing', desc: 'ML-based smart pricing & margin optimization', color: '#6366F1' },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Roadmap" title="Future Innovation Pipeline" sub="Next-generation features powered by AI and emerging technology" />
      <div style={{ flex: 1, padding: '16px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 12 }}>
        {modules.map(m => (
          <Card key={m.label} style={{ padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={m.icon} size={16} color={m.color} />
            </div>
            <div>
              <H3 style={{ fontSize: 11, color: NAVY, marginBottom: 3 }}>{m.label}</H3>
              <P style={{ fontSize: 9.5, color: SLATE, lineHeight: 1.4 }}>{m.desc}</P>
            </div>
          </Card>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 17 – Development Roadmap ────────────────────────────────────────────
const Slide17 = () => {
  const phases = [
    {
      num: '01', label: 'Phase 1', title: 'Core POS', color: BLUE,
      items: ['POS Billing Engine', 'Table Management', 'KOT Generation', 'GST Billing', 'Basic Reports'],
      status: 'Completed',
    },
    {
      num: '02', label: 'Phase 2', title: 'Operations', color: EMERALD,
      items: ['Inventory Module', 'Recipe Management', 'Customer CRM', 'Loyalty Program', 'Advanced Reports'],
      status: 'Completed',
    },
    {
      num: '03', label: 'Phase 3', title: 'Integrations', color: '#F59E0B',
      items: ['Swiggy / Zomato', 'Payment Gateways', 'Mobile Captain App', 'Multi-Branch', 'WhatsApp Alerts'],
      status: 'In Progress',
    },
    {
      num: '04', label: 'Phase 4', title: 'AI & Scale', color: '#8B5CF6',
      items: ['AI Predictions', 'Voice Ordering', 'SaaS Platform', 'Enterprise APIs', 'Marketplace'],
      status: 'Planned',
    },
  ]
  const statusColor: Record<string, string> = {
    Completed: EMERALD,
    'In Progress': '#F59E0B',
    Planned: SLATE,
  }
  return (
    <SlideWrap>
      <SlideHeader tag="Development Roadmap" title="From MVP to Enterprise Platform" sub="Phased execution strategy — each phase builds on the previous" />
      {/* Timeline line */}
      <div style={{ position: 'relative', padding: '0 48px', marginBottom: 0 }}>
        <div style={{
          position: 'absolute', top: 20, left: 'calc(48px + 56px)', right: 'calc(48px + 56px)',
          height: 2, background: `linear-gradient(90deg, ${BLUE}, ${EMERALD}, #F59E0B, #8B5CF6)`,
          zIndex: 0,
        }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {phases.map(p => (
            <div key={p.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: p.status === 'Planned' ? LIGHT : p.color,
                border: `3px solid ${p.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.status === 'Planned' ? p.color : WHITE,
                fontSize: 12, fontWeight: 800, fontFamily: "'Poppins', sans-serif",
              }}>
                {p.num}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 48px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {phases.map(p => (
          <Card key={p.num} style={{ padding: '18px 20px', borderTop: `4px solid ${p.color}` }}>
            <div style={{ marginBottom: 12 }}>
              <H3 style={{ fontSize: 14, color: NAVY, marginBottom: 4 }}>{p.title}</H3>
              <span style={{
                fontSize: 9.5, fontWeight: 700, color: statusColor[p.status],
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{p.status}</span>
            </div>
            {p.items.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  background: p.status === 'Planned' ? LIGHT : `${p.color}20`,
                  border: `1.5px solid ${p.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {p.status !== 'Planned' && <Icon name="check" size={10} color={p.color} />}
                </div>
                <span style={{ fontSize: 11, color: SLATE }}>{item}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 18 – Why Choose Us ───────────────────────────────────────────────────
const Slide18 = () => {
  const reasons = [
    { icon: 'monitor', title: 'Modern UI/UX', desc: 'Designed for speed. Staff learn in minutes, not days.' },
    { icon: 'cloud', title: 'Cloud Native', desc: 'Access your data from anywhere, anytime.' },
    { icon: 'wifi', title: 'Offline Support', desc: 'Never stop billing — even without internet.' },
    { icon: 'zap', title: 'Fast Billing', desc: 'Complete a bill in under 60 seconds flat.' },
    { icon: 'trending', title: 'Scalable', desc: 'From 1 outlet to 500 — same platform, zero limits.' },
    { icon: 'tool', title: 'Custom Dev', desc: 'Built to your workflow, not the other way around.' },
    { icon: 'link', title: 'API Ready', desc: 'Connect to any third-party system out of the box.' },
    { icon: 'gitbranch', title: 'Multi-Branch', desc: 'Centralized control across all your locations.' },
    { icon: 'shield', title: 'Enterprise Security', desc: 'SOC2 compliant with AES-256 encryption.' },
    { icon: 'calendar', title: 'Future Ready', desc: 'AI, voice, and ML modules on the roadmap.' },
  ]
  return (
    <SlideWrap>
      <SlideHeader tag="Why Us" title="Built Different. Engineered to Last." sub="Not just software — a long-term technology partnership for your restaurant business" />
      <div style={{ flex: 1, padding: '12px 48px 20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: '1fr 1fr', gap: 12 }}>
        {reasons.map((r, i) => (
          <Card key={r.title} style={{
            padding: '16px 14px', textAlign: 'center',
            background: i === 0 ? NAVY : WHITE,
            border: i === 0 ? 'none' : '1px solid #E2E8F0',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: i === 0 ? `${BLUE}30` : BLUE_LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px',
            }}>
              <Icon name={r.icon} size={18} color={i === 0 ? '#93C5FD' : BLUE} />
            </div>
            <H3 style={{ fontSize: 11, color: i === 0 ? WHITE : NAVY, marginBottom: 5 }}>{r.title}</H3>
            <P style={{ fontSize: 9.5, color: i === 0 ? 'rgba(255,255,255,0.55)' : SLATE }}>{r.desc}</P>
          </Card>
        ))}
      </div>
    </SlideWrap>
  )
}

// ── SLIDE 19 – Thank You ───────────────────────────────────────────────────────
const Slide19 = () => (
  <SlideWrap bg={NAVY} style={{ justifyContent: 'center', alignItems: 'center' }}>
    {/* BG accent */}
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 30% 50%, ${BLUE}22 0%, transparent 55%),
                   radial-gradient(ellipse at 80% 50%, ${EMERALD}11 0%, transparent 50%)`,
    }} />
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }} viewBox="0 0 1280 720">
      {Array.from({ length: 20 }, (_, i) => (
        <line key={i} x1={i * 64} y1="0" x2={i * 64} y2="720" stroke="white" strokeWidth="1"/>
      ))}
    </svg>

    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 640, padding: '0 48px' }}>
      {/* Logo mark */}
      <div style={{
        width: 80, height: 80, borderRadius: 24,
        background: `linear-gradient(135deg, ${BLUE} 0%, #1D4ED8 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px',
        boxShadow: `0 0 0 16px ${BLUE}15`,
      }}>
        <Icon name="zap" size={36} color={WHITE} />
      </div>

      <H1 style={{ fontSize: 52, color: WHITE, marginBottom: 12 }}>Thank You</H1>
      <H2 style={{ fontSize: 18, color: EMERALD, fontWeight: 500, marginBottom: 32 }}>
        Questions & Discussion
      </H2>
      <P style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 48 }}>
        Ready to transform your restaurant operations?<br />
        Let's build the future of hospitality technology together.
      </P>


    </div>

    {/* Footer */}
    <div style={{
      position: 'absolute', bottom: 20, left: 48, right: 48,
      display: 'flex', justifyContent: 'space-between',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>Confidential — For Discussion Purposes Only</span>
      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>Restaurant POS Platform © 2025</span>
    </div>
  </SlideWrap>
)

// ── Export all slides ──────────────────────────────────────────────────────────
export const slides: React.ComponentType[] = [
  Slide1, Slide2, Slide3, Slide4, Slide5,
  Slide6, Slide7, Slide8, Slide9, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
  Slide16, Slide17, Slide18, Slide19,
]
