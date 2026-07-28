import pptxgen from 'pptxgenjs'

const BLUE = '2563EB'
const NAVY = '0F172A'
const NAVY2 = '1E293B'
const EMERALD = '10B981'
const SLATE = '64748B'
const WHITE = 'FFFFFF'
const LIGHT = 'F8FAFC'
const BLUE_LIGHT = 'EFF6FF'
const EMERALD_LIGHT = 'ECFDF5'
const RED = 'EF4444'
const ORANGE = 'F97316'
const AMBER = 'F59E0B'
const VIOLET = '8B5CF6'
const PINK = 'EC4899'
const CYAN = '06B6D4'
const INDIGO = '6366F1'

// Slide dimensions: 10 x 5.625 (16:9 widescreen)
const W = 10
const H = 5.625

// ── helpers ──────────────────────────────────────────────────────────────────

function slideHeader(
  slide: pptxgen.Slide,
  tag: string,
  title: string,
  sub?: string,
  dark = false,
) {
  const bg = dark ? NAVY : WHITE
  const fg = dark ? WHITE : NAVY
  const tagColor = dark ? EMERALD : BLUE

  slide.addShape('rect', { x: 0, y: 0, w: W, h: 1.05, fill: { color: bg }, line: { color: bg } })
  slide.addText(tag.toUpperCase(), {
    x: 0.5, y: 0.1, w: 4, h: 0.25,
    fontSize: 7, bold: true, color: tagColor, fontFace: 'Calibri',
    charSpacing: 2,
  })
  slide.addText(title, {
    x: 0.5, y: 0.35, w: 9, h: 0.45,
    fontSize: 20, bold: true, color: fg, fontFace: 'Calibri',
  })
  if (sub) {
    slide.addText(sub, {
      x: 0.5, y: 0.78, w: 9, h: 0.22,
      fontSize: 9, color: SLATE, fontFace: 'Calibri',
    })
  }
  // divider line
  slide.addShape('line', {
    x: 0.5, y: 1.02, w: 9, h: 0,
    line: { color: dark ? '1E293B' : 'E2E8F0', width: 1 },
  })
}

function card(
  slide: pptxgen.Slide,
  x: number, y: number, w: number, h: number,
  fillColor = WHITE,
) {
  slide.addShape('roundRect', {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: fillColor },
    line: { color: 'E2E8F0', width: 0.5 },
    shadow: { type: 'outer', color: '00000012', blur: 6, offset: 2, angle: 90 },
  })
}


function progressBar(
  slide: pptxgen.Slide,
  x: number, y: number, w: number,
  label: string, pct: number, barColor: string, alert = false,
) {
  slide.addText(label, { x, y, w: w * 0.55, h: 0.18, fontSize: 8, color: NAVY, fontFace: 'Calibri' })
  if (alert) {
    slide.addText('LOW STOCK', {
      x: x + w * 0.55, y, w: w * 0.28, h: 0.18,
      fontSize: 6, bold: true, color: RED, fontFace: 'Calibri',
      align: 'right',
    })
  }
  slide.addText(`${pct}%`, {
    x: x + w * 0.83, y, w: w * 0.17, h: 0.18,
    fontSize: 8, bold: true, color: alert ? RED : NAVY,
    align: 'right', fontFace: 'Calibri',
  })
  // track
  slide.addShape('roundRect', { x, y: y + 0.2, w, h: 0.06, rectRadius: 0.03, fill: { color: 'E2E8F0' }, line: { color: 'E2E8F0' } })
  // fill
  slide.addShape('roundRect', { x, y: y + 0.2, w: w * (pct / 100), h: 0.06, rectRadius: 0.03, fill: { color: barColor }, line: { color: barColor } })
}

// ── Slide generators ──────────────────────────────────────────────────────────

function addSlide1(prs: pptxgen) {
  const slide = prs.addSlide()
  // Full dark bg
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: NAVY }, line: { color: NAVY } })
  // Right panel lighter
  slide.addShape('rect', { x: 5.8, y: 0, w: 4.2, h: H, fill: { color: NAVY2 }, line: { color: NAVY2 } })
  // Blue glow blob
  slide.addShape('ellipse', { x: 3, y: -1, w: 5, h: 4, fill: { color: BLUE + '18' }, line: { color: BLUE + '18' } })

  // Tag line
  slide.addShape('roundRect', { x: 0.5, y: 0.45, w: 2.4, h: 0.25, rectRadius: 0.12, fill: { color: BLUE + '30' }, line: { color: BLUE + '55' } })
  slide.addText('● SaaS PRODUCT PRESENTATION', { x: 0.55, y: 0.47, w: 2.3, h: 0.2, fontSize: 6.5, color: EMERALD, bold: true, fontFace: 'Calibri', charSpacing: 1 })

  // Title
  slide.addText('Restaurant POS &\nBilling Software', {
    x: 0.5, y: 0.78, w: 5, h: 1.1,
    fontSize: 32, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.1,
  })
  // Blue highlighted word
  slide.addShape('rect', { x: 0.5, y: 0.78, w: 0.05, h: 1.1, fill: { color: BLUE }, line: { color: BLUE } })

  // Tagline
  slide.addText('Smart. Fast. Scalable.', {
    x: 0.5, y: 1.95, w: 5, h: 0.35,
    fontSize: 16, bold: true, color: EMERALD, fontFace: 'Calibri',
  })
  // Subtitle
  slide.addText('A Complete Cloud-Based Restaurant Management Solution designed\nfor modern restaurants, cloud kitchens, and multi-branch food service businesses.', {
    x: 0.5, y: 2.38, w: 5, h: 0.55,
    fontSize: 9, color: WHITE + 'AA', fontFace: 'Calibri', lineSpacingMultiple: 1.4,
  })

  // KPIs
  const kpis = [
    { label: 'Restaurants Served', val: '2,400+' },
    { label: 'Daily Transactions', val: '1.2M+' },
    { label: 'Uptime SLA', val: '99.9%' },
  ]
  kpis.forEach((k, i) => {
    const x = 0.5 + i * 1.7
    slide.addText(k.val, { x, y: 3.1, w: 1.5, h: 0.35, fontSize: 18, bold: true, color: WHITE, fontFace: 'Calibri' })
    slide.addText(k.label, { x, y: 3.45, w: 1.5, h: 0.2, fontSize: 7.5, color: WHITE + '66', fontFace: 'Calibri' })
  })

  // Right panel cards
  const rcards = [
    { label: 'POS Terminal', color: BLUE },
    { label: 'Captain App', color: EMERALD },
    { label: 'Cloud Dashboard', color: '818CF8' },
    { label: 'Analytics', color: AMBER },
  ]
  rcards.forEach((c, i) => {
    const y = 0.9 + i * 1.05
    slide.addShape('roundRect', { x: 6.1, y, w: 3.4, h: 0.75, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: WHITE + '15' } })
    slide.addShape('roundRect', { x: 6.25, y: y + 0.15, w: 0.45, h: 0.45, rectRadius: 0.06, fill: { color: c.color + '30' }, line: { color: c.color + '30' } })
    slide.addText(c.label, { x: 6.8, y: y + 0.24, w: 2.5, h: 0.28, fontSize: 10, color: WHITE + 'CC', fontFace: 'Calibri' })
  })

  // Footer
  slide.addText('Confidential — For Discussion Purposes Only', { x: 0.5, y: H - 0.22, w: 5, h: 0.18, fontSize: 7, color: WHITE + '44', fontFace: 'Calibri' })
  slide.addText('© 2025 Restaurant POS Platform', { x: 5.5, y: H - 0.22, w: 4, h: 0.18, fontSize: 7, color: WHITE + '44', fontFace: 'Calibri', align: 'right' })
}

function addSlide2(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'The Challenge', 'Why Restaurants Struggle Today', 'Key operational pain points limiting growth and profitability')

  const problems = [
    { title: 'Slow Billing', desc: 'Manual billing takes 5–8 min per table, creating long queues and poor experience', color: RED },
    { title: 'Manual KOT', desc: 'Paper-based kitchen tickets lead to lost orders and preparation errors', color: ORANGE },
    { title: 'Inventory Mismatch', desc: 'No real-time stock tracking causes over-purchasing and wastage', color: AMBER },
    { title: 'Human Errors', desc: 'Wrong orders, incorrect billing, and cash discrepancies are costly', color: RED },
    { title: 'No Central Reports', desc: 'Owners lack real-time visibility into sales, costs and performance', color: VIOLET },
    { title: 'Multi-Branch Chaos', desc: 'Managing multiple outlets without unified tools is fragmented', color: INDIGO },
    { title: 'Poor Customer Insights', desc: 'No CRM or loyalty tools means lost repeat business opportunities', color: PINK },
  ]

  const cols = 4
  problems.forEach((p, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = 0.25 + col * 2.38
    const y = 1.15 + row * 1.55
    const w = 2.2
    const h = 1.38
    card(slide, x, y, w, h)
    // Color bar top
    slide.addShape('roundRect', { x: x + 0.12, y: y + 0.1, w: 0.38, h: 0.38, rectRadius: 0.06, fill: { color: p.color + '22' }, line: { color: p.color + '22' } })
    slide.addText('!', { x: x + 0.12, y: y + 0.1, w: 0.38, h: 0.38, fontSize: 14, bold: true, color: p.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(p.title, { x: x + 0.6, y: y + 0.14, w: w - 0.72, h: 0.3, fontSize: 9.5, bold: true, color: NAVY, fontFace: 'Calibri' })
    slide.addText(p.desc, { x: x + 0.12, y: y + 0.52, w: w - 0.24, h: 0.75, fontSize: 7.5, color: SLATE, fontFace: 'Calibri', lineSpacingMultiple: 1.3 })
  })

  // Bottom stat bar
  slide.addShape('rect', { x: 0, y: H - 0.62, w: W, h: 0.62, fill: { color: NAVY }, line: { color: NAVY } })
  const stats = [
    { v: '₹2.4L', label: 'Avg. annual loss from errors' },
    { v: '23%', label: 'Revenue lost to poor tracking' },
    { v: '68%', label: 'Owners lack real-time data' },
    { v: '4.1x', label: 'Cost: manual vs automated' },
  ]
  stats.forEach((s, i) => {
    const x = 1.2 + i * 2.2
    slide.addText(s.v, { x, y: H - 0.55, w: 1.8, h: 0.3, fontSize: 16, bold: true, color: BLUE, fontFace: 'Calibri', align: 'center' })
    slide.addText(s.label, { x, y: H - 0.26, w: 1.8, h: 0.18, fontSize: 7, color: WHITE + '88', fontFace: 'Calibri', align: 'center' })
  })
}

function addSlide3(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })

  // Left dark panel
  slide.addShape('rect', { x: 0, y: 0, w: 3.8, h: H, fill: { color: NAVY }, line: { color: NAVY } })

  slide.addShape('roundRect', { x: 0.3, y: 0.3, w: 1.6, h: 0.22, rectRadius: 0.11, fill: { color: EMERALD + '30' }, line: { color: EMERALD + '55' } })
  slide.addText('OUR PLATFORM', { x: 0.35, y: 0.32, w: 1.5, h: 0.18, fontSize: 7, bold: true, color: EMERALD, fontFace: 'Calibri', charSpacing: 1 })

  slide.addText('One Platform.\nEvery Solution.', { x: 0.3, y: 0.65, w: 3.2, h: 0.9, fontSize: 22, bold: true, color: WHITE, fontFace: 'Calibri', lineSpacingMultiple: 1.1 })
  slide.addText('One Platform. ', { x: 0.3, y: 0.65, w: 3.2, h: 0.4, fontSize: 22, bold: true, color: WHITE, fontFace: 'Calibri' })
  slide.addText('Every Solution.', { x: 0.3, y: 1.0, w: 3.2, h: 0.4, fontSize: 22, bold: true, color: BLUE, fontFace: 'Calibri' })

  slide.addText('A unified, cloud-native restaurant management platform that automates your entire operations — from table to kitchen to reports.', {
    x: 0.3, y: 1.55, w: 3.2, h: 0.6, fontSize: 8.5, color: WHITE + 'AA', fontFace: 'Calibri', lineSpacingMultiple: 1.4,
  })

  const checks = [
    'Cloud-first, offline-capable architecture',
    'Real-time sync across all devices',
    'GST-compliant billing engine',
    'White-label ready for enterprises',
  ]
  checks.forEach((c, i) => {
    slide.addShape('ellipse', { x: 0.3, y: 2.3 + i * 0.38, w: 0.18, h: 0.18, fill: { color: EMERALD + '33' }, line: { color: EMERALD + '33' } })
    slide.addText('✓', { x: 0.3, y: 2.3 + i * 0.38, w: 0.18, h: 0.18, fontSize: 8, color: EMERALD, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(c, { x: 0.55, y: 2.32 + i * 0.38, w: 3, h: 0.18, fontSize: 8.5, color: WHITE + 'CC', fontFace: 'Calibri' })
  })

  // Right: module grid
  slideHeader(slide, 'Our Solution', 'The Complete Restaurant Platform', undefined)
  const modules = [
    { label: 'POS Billing', color: BLUE },
    { label: 'Kitchen Mgmt', color: EMERALD },
    { label: 'Inventory', color: AMBER },
    { label: 'CRM', color: VIOLET },
    { label: 'Analytics', color: PINK },
    { label: 'Mobile Ordering', color: CYAN },
    { label: 'Multi-Branch', color: ORANGE },
    { label: 'Cloud Dashboard', color: INDIGO },
  ]
  // Center hub
  slide.addShape('ellipse', { x: 6.1, y: 2.1, w: 0.7, h: 0.7, fill: { color: BLUE }, line: { color: BLUE } })
  slide.addText('⚡', { x: 6.1, y: 2.1, w: 0.7, h: 0.7, fontSize: 18, align: 'center', valign: 'middle', fontFace: 'Calibri' })

  const cols2 = 4
  modules.forEach((m, i) => {
    const col = i % cols2
    const row = Math.floor(i / cols2)
    const x = 4.1 + col * 1.45
    const y = 1.25 + row * 1.7
    card(slide, x, y, 1.3, 1.5)
    slide.addShape('roundRect', { x: x + 0.4, y: y + 0.15, w: 0.5, h: 0.5, rectRadius: 0.07, fill: { color: m.color + '22' }, line: { color: m.color + '22' } })
    slide.addText('■', { x: x + 0.4, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 16, color: m.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(m.label, { x: x + 0.05, y: y + 0.75, w: 1.2, h: 0.4, fontSize: 8, bold: true, color: NAVY, align: 'center', fontFace: 'Calibri' })
  })
}

function addSlide4(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Product Ecosystem', 'Complete Restaurant Management Hub', 'Everything connected — real-time, bidirectional data flow across all modules')

  // Hub center
  slide.addShape('ellipse', { x: 4.25, y: 2.25, w: 1.5, h: 1.05, fill: { color: BLUE }, line: { color: BLUE } })
  slide.addText('RESTAURANT\nPOS PLATFORM', {
    x: 4.25, y: 2.25, w: 1.5, h: 1.05,
    fontSize: 8, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri', lineSpacingMultiple: 1.2,
  })

  const spokes = [
    { label: 'POS Billing', color: BLUE, x: 1.2, y: 1.0 },
    { label: 'Kitchen KDS', color: ORANGE, x: 4.0, y: 1.1 },
    { label: 'Inventory', color: AMBER, x: 7.0, y: 1.0 },
    { label: 'CRM', color: VIOLET, x: 8.2, y: 2.6 },
    { label: 'Reports', color: EMERALD, x: 7.2, y: 4.1 },
    { label: 'Payments', color: PINK, x: 4.5, y: 4.6 },
    { label: 'Online Orders', color: CYAN, x: 2.0, y: 4.3 },
    { label: 'Loyalty', color: AMBER, x: 0.5, y: 3.0 },
    { label: 'Analytics', color: INDIGO, x: 1.3, y: 2.0 },
    { label: 'Admin', color: SLATE, x: 6.2, y: 2.2 },
  ]

  const hubX = 5.0, hubY = 2.78
  spokes.forEach(s => {
    // line from hub to node
    slide.addShape('line', {
      x: Math.min(hubX, s.x + 0.3), y: Math.min(hubY, s.y + 0.2),
      w: Math.abs(hubX - (s.x + 0.3)), h: Math.abs(hubY - (s.y + 0.2)),
      line: { color: s.color + '55', width: 1, dashType: 'dash' },
      flipH: hubX < s.x + 0.3,
      flipV: hubY < s.y + 0.2,
    })
    slide.addShape('ellipse', { x: s.x, y: s.y, w: 1.0, h: 0.5, fill: { color: s.color + '22' }, line: { color: s.color, width: 1 } })
    slide.addText(s.label, { x: s.x, y: s.y, w: 1.0, h: 0.5, fontSize: 7.5, bold: true, color: s.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  })
}

function addSlide5(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Core Features', '16 Powerful Modules Built In', 'Everything your restaurant needs — out of the box, no plugins required')

  const features = [
    { label: 'Billing Software', color: BLUE },
    { label: 'GST Billing', color: EMERALD },
    { label: 'Table Management', color: AMBER },
    { label: 'KOT Generation', color: ORANGE },
    { label: 'Menu Management', color: VIOLET },
    { label: 'Inventory Mgmt', color: CYAN },
    { label: 'Recipe Mgmt', color: EMERALD },
    { label: 'Expense Tracking', color: PINK },
    { label: 'Customer CRM', color: INDIGO },
    { label: 'Loyalty Program', color: AMBER },
    { label: 'QR Ordering', color: BLUE },
    { label: 'Multi-Outlet', color: ORANGE },
    { label: 'Reports', color: EMERALD },
    { label: 'Role Based Access', color: VIOLET },
    { label: 'Offline Billing', color: PINK },
    { label: 'Cloud Sync', color: BLUE },
  ]

  const cols = 8
  features.forEach((f, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = 0.22 + col * 1.2
    const y = 1.18 + row * 2.05
    const w = 1.08, h = 1.85
    card(slide, x, y, w, h)
    slide.addShape('roundRect', { x: x + 0.3, y: y + 0.18, w: 0.48, h: 0.48, rectRadius: 0.07, fill: { color: f.color + '22' }, line: { color: f.color + '22' } })
    slide.addText('✦', { x: x + 0.3, y: y + 0.18, w: 0.48, h: 0.48, fontSize: 16, color: f.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(f.label, { x: x + 0.04, y: y + 0.76, w: w - 0.08, h: 0.65, fontSize: 7.5, bold: true, color: NAVY, align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.2 })
  })
}

function addSlide6(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Workflow', 'End-to-End Restaurant Operations', 'Fully automated — from customer arrival to inventory reconciliation')

  const steps = [
    { label: 'Customer\nArrives', color: BLUE },
    { label: 'Table\nAssigned', color: INDIGO },
    { label: 'Order\nTaken', color: VIOLET },
    { label: 'KOT\nSent', color: ORANGE },
    { label: 'Kitchen\nPreps', color: AMBER },
    { label: 'Food\nServed', color: EMERALD },
    { label: 'Bill\nGenerated', color: CYAN },
    { label: 'Payment\nDone', color: EMERALD },
    { label: 'Stock\nUpdated', color: PINK },
    { label: 'Reports\nUpdated', color: BLUE },
  ]

  const stepW = 0.78
  const gap = 0.2
  const totalW = steps.length * stepW + (steps.length - 1) * gap
  const startX = (W - totalW) / 2

  steps.forEach((s, i) => {
    const x = startX + i * (stepW + gap)
    const circleY = 1.8
    const circleR = 0.32

    // Step number
    slide.addText(String(i + 1).padStart(2, '0'), { x, y: 1.38, w: stepW, h: 0.22, fontSize: 7, bold: true, color: s.color, align: 'center', fontFace: 'Calibri' })

    // Circle
    slide.addShape('ellipse', { x: x + (stepW - circleR * 2) / 2, y: circleY - circleR, w: circleR * 2, h: circleR * 2, fill: { color: s.color + '22' }, line: { color: s.color, width: 1.5 } })
    slide.addText('●', { x: x + (stepW - circleR * 2) / 2, y: circleY - circleR, w: circleR * 2, h: circleR * 2, fontSize: 14, color: s.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })

    // Arrow connector
    if (i < steps.length - 1) {
      const arrowX = x + stepW
      slide.addShape('line', { x: arrowX, y: circleY, w: gap, h: 0, line: { color: s.color + '80', width: 1.5, endArrowType: 'arrow' } })
    }

    // Label
    slide.addText(s.label, { x, y: circleY + 0.38, w: stepW, h: 0.5, fontSize: 7.5, bold: true, color: NAVY, align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.2 })
  })

  // Bottom note
  slide.addShape('rect', { x: 0, y: H - 0.55, w: W, h: 0.55, fill: { color: BLUE_LIGHT }, line: { color: BLUE + '33' } })
  slide.addText('Every step auto-triggers the next — zero manual handoffs. Real-time sync across POS, KDS, Inventory, and Reporting modules.', {
    x: 0.5, y: H - 0.48, w: 9, h: 0.38, fontSize: 9, color: BLUE, align: 'center', fontFace: 'Calibri',
  })
}

function addSlide7(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Module Deep Dive', 'POS Billing Interface', 'Designed for speed — cashiers complete a full billing cycle in under 60 seconds')

  // Left: POS mockup (dark)
  slide.addShape('roundRect', { x: 0.25, y: 1.15, w: 5.8, h: 4.2, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } })

  // Category tabs
  const cats = ['All', 'Starters', 'Mains', 'Beverages', 'Desserts']
  cats.forEach((c, i) => {
    slide.addShape('roundRect', { x: 0.4 + i * 1.07, y: 1.28, w: 0.95, h: 0.25, rectRadius: 0.06, fill: { color: i === 0 ? BLUE : WHITE + '22' }, line: { color: i === 0 ? BLUE : WHITE + '22' } })
    slide.addText(c, { x: 0.4 + i * 1.07, y: 1.28, w: 0.95, h: 0.25, fontSize: 7.5, bold: i === 0, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  })

  // Menu items grid
  const items = [
    { name: 'Paneer Tikka', price: '₹320' }, { name: 'Dal Makhani', price: '₹280' },
    { name: 'Butter Naan', price: '₹60' }, { name: 'Veg Biryani', price: '₹340' },
    { name: 'Mango Lassi', price: '₹120' }, { name: 'Gulab Jamun', price: '₹90' },
    { name: 'Tandoori Roti', price: '₹40' }, { name: 'Palak Paneer', price: '₹300' },
  ]
  items.forEach((item, i) => {
    const col = i % 4, row = Math.floor(i / 4)
    const x = 0.4 + col * 1.35, y = 1.65 + row * 1.3
    slide.addShape('roundRect', { x, y, w: 1.22, h: 1.15, rectRadius: 0.07, fill: { color: WHITE + '11' }, line: { color: WHITE + '22' } })
    slide.addText(item.name, { x, y: y + 0.2, w: 1.22, h: 0.4, fontSize: 7, color: WHITE + 'CC', align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.1 })
    slide.addText(item.price, { x, y: y + 0.68, w: 1.22, h: 0.25, fontSize: 10, bold: true, color: EMERALD, align: 'center', fontFace: 'Calibri' })
  })

  // Right: Order summary
  card(slide, 6.25, 1.15, 3.5, 4.2)

  slide.addText('Order #1042', { x: 6.4, y: 1.25, w: 2, h: 0.25, fontSize: 11, bold: true, color: NAVY, fontFace: 'Calibri' })
  slide.addShape('roundRect', { x: 8.3, y: 1.27, w: 0.9, h: 0.22, rectRadius: 0.11, fill: { color: EMERALD + '22' }, line: { color: EMERALD + '55' } })
  slide.addText('Table 5', { x: 8.3, y: 1.27, w: 0.9, h: 0.22, fontSize: 7.5, bold: true, color: EMERALD, align: 'center', valign: 'middle', fontFace: 'Calibri' })

  const orderItems = [
    { name: 'Paneer Tikka', qty: '×2', price: '₹640' },
    { name: 'Butter Naan', qty: '×4', price: '₹240' },
    { name: 'Dal Makhani', qty: '×1', price: '₹280' },
    { name: 'Mango Lassi', qty: '×2', price: '₹240' },
  ]
  orderItems.forEach((item, i) => {
    const y = 1.58 + i * 0.52
    slide.addShape('roundRect', { x: 6.35, y, w: 3.3, h: 0.44, rectRadius: 0.05, fill: { color: LIGHT }, line: { color: 'E2E8F0' } })
    slide.addText(item.name, { x: 6.45, y: y + 0.04, w: 2.2, h: 0.2, fontSize: 8.5, bold: true, color: NAVY, fontFace: 'Calibri' })
    slide.addText(item.qty, { x: 6.45, y: y + 0.24, w: 1, h: 0.15, fontSize: 7, color: SLATE, fontFace: 'Calibri' })
    slide.addText(item.price, { x: 8.8, y: y + 0.12, w: 0.75, h: 0.2, fontSize: 8.5, bold: true, color: NAVY, align: 'right', fontFace: 'Calibri' })
  })

  // Totals
  slide.addShape('line', { x: 6.35, y: 3.67, w: 3.3, h: 0, line: { color: 'E2E8F0', width: 0.75 } })
  const totals = [
    { label: 'Subtotal', val: '₹1,400' },
    { label: 'Discount (10%)', val: '−₹140', color: EMERALD },
    { label: 'GST 5%', val: '+₹63' },
  ]
  totals.forEach((t, i) => {
    const y = 3.73 + i * 0.27
    slide.addText(t.label, { x: 6.35, y, w: 2.5, h: 0.22, fontSize: 8, color: SLATE, fontFace: 'Calibri' })
    slide.addText(t.val, { x: 6.35, y, w: 3.3, h: 0.22, fontSize: 8, bold: true, color: t.color || NAVY, align: 'right', fontFace: 'Calibri' })
  })
  slide.addShape('line', { x: 6.35, y: 4.55, w: 3.3, h: 0, line: { color: 'E2E8F0', width: 0.75 } })
  slide.addText('Total', { x: 6.35, y: 4.6, w: 2, h: 0.28, fontSize: 12, bold: true, color: NAVY, fontFace: 'Calibri' })
  slide.addText('₹1,323', { x: 6.35, y: 4.6, w: 3.3, h: 0.28, fontSize: 13, bold: true, color: BLUE, align: 'right', fontFace: 'Calibri' })

  // Pay buttons
  const payMethods = ['Cash', 'Card', 'UPI']
  payMethods.forEach((m, i) => {
    slide.addShape('roundRect', { x: 6.35 + i * 1.08, y: H - 0.85, w: 0.96, h: 0.3, rectRadius: 0.05, fill: { color: m === 'UPI' ? BLUE : LIGHT }, line: { color: 'E2E8F0' } })
    slide.addText(m, { x: 6.35 + i * 1.08, y: H - 0.85, w: 0.96, h: 0.3, fontSize: 8, bold: true, color: m === 'UPI' ? WHITE : NAVY, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  })
  slide.addShape('roundRect', { x: 6.35, y: H - 0.48, w: 3.3, h: 0.33, rectRadius: 0.06, fill: { color: EMERALD }, line: { color: EMERALD } })
  slide.addText('🖨  Print Bill', { x: 6.35, y: H - 0.48, w: 3.3, h: 0.33, fontSize: 9.5, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })
}

function addSlide8(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: NAVY }, line: { color: NAVY } })
  slideHeader(slide, 'Kitchen Display System', 'Real-Time KOT Management', 'Live order status across kitchen stations — zero paper tickets', true)

  const columns = [
    {
      label: 'Pending', color: ORANGE,
      orders: [
        { id: '#1047', items: ['Chicken Biryani ×2', 'Raita ×2'], time: '0:45', table: 'T-3' },
        { id: '#1048', items: ['Veg Thali ×1'], time: '1:12', table: 'T-8' },
      ],
    },
    {
      label: 'Preparing', color: BLUE,
      orders: [
        { id: '#1044', items: ['Paneer Tikka ×2', 'Naan ×4'], time: '4:22', table: 'T-5' },
        { id: '#1045', items: ['Dal Makhani ×1', 'Rice ×1'], time: '6:10', table: 'T-1' },
      ],
    },
    {
      label: 'Ready', color: EMERALD,
      orders: [
        { id: '#1041', items: ['Palak Paneer ×1', 'Roti ×3'], time: '9:05', table: 'T-2' },
      ],
    },
    {
      label: 'Served', color: SLATE,
      orders: [
        { id: '#1038', items: ['Biryani ×3'], time: '14:50', table: 'T-7' },
        { id: '#1039', items: ['Dosa ×2', 'Sambar'], time: '16:30', table: 'T-4' },
      ],
    },
  ]

  columns.forEach((col, ci) => {
    const cx = 0.25 + ci * 2.42
    const cw = 2.28
    // Column header
    slide.addShape('roundRect', { x: cx, y: 1.15, w: cw, h: 0.35, rectRadius: 0.06, fill: { color: col.color }, line: { color: col.color } })
    slide.addText(`${col.label}  ${col.orders.length}`, { x: cx, y: 1.15, w: cw, h: 0.35, fontSize: 9.5, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })

    col.orders.forEach((order, oi) => {
      const oy = 1.62 + oi * 1.8
      slide.addShape('roundRect', { x: cx, y: oy, w: cw, h: 1.65, rectRadius: 0.08, fill: { color: WHITE + '0A' }, line: { color: col.color + '55', width: 1 } })
      slide.addText(order.id, { x: cx + 0.12, y: oy + 0.1, w: 1.4, h: 0.25, fontSize: 9.5, bold: true, color: col.color, fontFace: 'Calibri' })
      slide.addText(order.table, { x: cx + cw - 0.5, y: oy + 0.12, w: 0.38, h: 0.2, fontSize: 7.5, color: WHITE + '88', align: 'right', fontFace: 'Calibri' })
      order.items.forEach((item, ii) => {
        slide.addShape('line', { x: cx + 0.12, y: oy + 0.45 + ii * 0.32, w: 0.02, h: 0.22, line: { color: col.color, width: 2 } })
        slide.addText(item, { x: cx + 0.2, y: oy + 0.43 + ii * 0.32, w: cw - 0.3, h: 0.24, fontSize: 8, color: WHITE + 'CC', fontFace: 'Calibri' })
      })
      slide.addText(`⏱  ${order.time}`, { x: cx + 0.12, y: oy + 1.35, w: 1.5, h: 0.2, fontSize: 8, bold: true, color: col.color, fontFace: 'Calibri' })
    })
  })
}

function addSlide9(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Inventory', 'Smart Inventory & Recipe Management', 'AI-powered stock tracking with automatic deduction on every order')

  // Left flow
  slide.addText('Inventory Flow', { x: 0.3, y: 1.2, w: 4, h: 0.25, fontSize: 11, bold: true, color: NAVY, fontFace: 'Calibri' })
  const flow = [
    { label: 'Supplier', color: ORANGE },
    { label: 'Purchase Order', color: AMBER },
    { label: 'Inventory', color: BLUE },
    { label: 'Recipe Mapping', color: VIOLET },
    { label: 'Customer Order', color: EMERALD },
    { label: 'Auto Stock Deduction', color: PINK },
  ]
  flow.forEach((f, i) => {
    const y = 1.52 + i * 0.63
    card(slide, 0.3, y, 4.2, 0.5)
    slide.addShape('roundRect', { x: 0.42, y: y + 0.07, w: 0.36, h: 0.36, rectRadius: 0.06, fill: { color: f.color + '22' }, line: { color: f.color + '22' } })
    slide.addText('►', { x: 0.42, y: y + 0.07, w: 0.36, h: 0.36, fontSize: 12, color: f.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(f.label, { x: 0.88, y: y + 0.12, w: 3.5, h: 0.26, fontSize: 9.5, bold: i === 5, color: NAVY, fontFace: 'Calibri' })
    if (i === 5) {
      slide.addShape('roundRect', { x: 3.2, y: y + 0.1, w: 1.1, h: 0.25, rectRadius: 0.08, fill: { color: EMERALD_LIGHT }, line: { color: EMERALD + '55' } })
      slide.addText('Automated', { x: 3.2, y: y + 0.1, w: 1.1, h: 0.25, fontSize: 7, bold: true, color: EMERALD, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    }
    if (i < flow.length - 1) {
      slide.addShape('line', { x: 0.6, y: y + 0.5, w: 0, h: 0.13, line: { color: f.color + '66', width: 1.5, endArrowType: 'arrow' } })
    }
  })

  // Right: stock
  slide.addText('Live Stock Levels', { x: 5.0, y: 1.2, w: 4.5, h: 0.25, fontSize: 11, bold: true, color: NAVY, fontFace: 'Calibri' })
  const items = [
    { name: 'Chicken Breast', stock: 82, alert: false },
    { name: 'Basmati Rice', stock: 45, alert: false },
    { name: 'Paneer', stock: 12, alert: true },
    { name: 'Tomatoes', stock: 65, alert: false },
    { name: 'Cooking Oil', stock: 8, alert: true },
  ]
  items.forEach((item, i) => {
    const barColor = item.stock < 20 ? RED : item.stock < 40 ? AMBER : EMERALD
    progressBar(slide, 5.0, 1.58 + i * 0.63, 4.7, item.name, item.stock, barColor, item.alert)
  })

  // Auto PO note
  slide.addShape('roundRect', { x: 5.0, y: 4.75, w: 4.7, h: 0.62, rectRadius: 0.08, fill: { color: EMERALD_LIGHT }, line: { color: EMERALD + '55' } })
  slide.addText('⚡  Auto Purchase Orders', { x: 5.15, y: 4.82, w: 4.4, h: 0.22, fontSize: 9.5, bold: true, color: NAVY, fontFace: 'Calibri' })
  slide.addText('System auto-generates POs when stock falls below threshold', { x: 5.15, y: 5.04, w: 4.4, h: 0.22, fontSize: 8, color: SLATE, fontFace: 'Calibri' })
}

function addSlide10(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'CRM & Loyalty', 'Know Your Customers Better', '360° customer intelligence to drive repeat visits and increase lifetime value')

  // Customer card left
  card(slide, 0.25, 1.15, 3.8, 4.2)

  // Avatar
  slide.addShape('ellipse', { x: 0.45, y: 1.3, w: 0.7, h: 0.7, fill: { color: BLUE }, line: { color: BLUE } })
  slide.addText('RA', { x: 0.45, y: 1.3, w: 0.7, h: 0.7, fontSize: 16, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  slide.addText('Rahul Agarwal', { x: 1.25, y: 1.35, w: 2.2, h: 0.25, fontSize: 11, bold: true, color: NAVY, fontFace: 'Calibri' })
  slide.addText('Gold Member · +91 98765 43210', { x: 1.25, y: 1.6, w: 2.2, h: 0.2, fontSize: 7.5, color: SLATE, fontFace: 'Calibri' })
  slide.addShape('roundRect', { x: 3.35, y: 1.37, w: 0.6, h: 0.2, rectRadius: 0.1, fill: { color: EMERALD + '22' }, line: { color: EMERALD + '55' } })
  slide.addText('Gold', { x: 3.35, y: 1.37, w: 0.6, h: 0.2, fontSize: 7, bold: true, color: EMERALD, align: 'center', valign: 'middle', fontFace: 'Calibri' })

  const kpis = [
    { label: 'Total Visits', val: '47', color: BLUE },
    { label: 'Total Spent', val: '₹38,400', color: EMERALD },
    { label: 'Reward Points', val: '2,840', color: AMBER },
    { label: 'Avg. Order', val: '₹816', color: VIOLET },
  ]
  kpis.forEach((k, i) => {
    const x = 0.38 + (i % 2) * 1.85
    const y = 2.12 + Math.floor(i / 2) * 0.75
    slide.addShape('roundRect', { x, y, w: 1.7, h: 0.6, rectRadius: 0.07, fill: { color: LIGHT }, line: { color: 'E2E8F0' } })
    slide.addText(k.val, { x, y: y + 0.04, w: 1.7, h: 0.3, fontSize: 12, bold: true, color: NAVY, align: 'center', fontFace: 'Calibri' })
    slide.addText(k.label, { x, y: y + 0.36, w: 1.7, h: 0.2, fontSize: 7, color: SLATE, align: 'center', fontFace: 'Calibri' })
  })

  slide.addText('FAVOURITE ITEMS', { x: 0.38, y: 3.68, w: 3.5, h: 0.18, fontSize: 7, bold: true, color: SLATE, fontFace: 'Calibri', charSpacing: 1 })
  ;['Chicken Biryani', 'Paneer Tikka', 'Mango Lassi'].forEach((item, i) => {
    slide.addShape('ellipse', { x: 0.38, y: 3.92 + i * 0.32, w: 0.1, h: 0.1, fill: { color: BLUE }, line: { color: BLUE } })
    slide.addText(item, { x: 0.56, y: 3.89 + i * 0.32, w: 3, h: 0.2, fontSize: 9, color: NAVY, fontFace: 'Calibri' })
  })

  // Right: loyalty features
  const feats = [
    { icon: '★', title: 'Points System', desc: 'Earn 1 point per ₹10 spent. Redeem at any visit.', color: AMBER },
    { icon: '🎁', title: 'Birthday Offers', desc: 'Auto-trigger special discount on customer birthdays', color: PINK },
    { icon: '🏆', title: 'Membership Plans', desc: 'Silver, Gold & Platinum tiers with exclusive benefits', color: VIOLET },
    { icon: '💬', title: 'WhatsApp Alerts', desc: 'Auto-send bills, offers & updates via WhatsApp', color: EMERALD },
    { icon: '❤', title: 'Personalisation', desc: 'Recommend dishes based on order history', color: RED },
    { icon: '📊', title: 'Visit Analytics', desc: 'Track cohort retention and churn risk scores', color: BLUE },
  ]
  feats.forEach((f, i) => {
    const x = 4.3 + (i % 2) * 2.8
    const y = 1.18 + Math.floor(i / 2) * 1.38
    card(slide, x, y, 2.65, 1.22)
    slide.addShape('roundRect', { x: x + 0.12, y: y + 0.12, w: 0.45, h: 0.45, rectRadius: 0.07, fill: { color: f.color + '22' }, line: { color: f.color + '22' } })
    slide.addText(f.icon, { x: x + 0.12, y: y + 0.12, w: 0.45, h: 0.45, fontSize: 14, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(f.title, { x: x + 0.65, y: y + 0.15, w: 1.9, h: 0.22, fontSize: 9, bold: true, color: NAVY, fontFace: 'Calibri' })
    slide.addText(f.desc, { x: x + 0.12, y: y + 0.5, w: 2.4, h: 0.55, fontSize: 7.5, color: SLATE, fontFace: 'Calibri', lineSpacingMultiple: 1.3 })
  })
}

function addSlide11(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Integrations', 'Connected Across Every Platform', "One-click integrations with India's leading food, payment, and business platforms")

  const integrations = [
    { name: 'Swiggy', cat: 'Food Delivery', color: ORANGE },
    { name: 'Zomato', cat: 'Food Delivery', color: RED },
    { name: 'Dunzo', cat: 'Quick Commerce', color: '00C2A8' },
    { name: 'Amazon Food', cat: 'Food Delivery', color: AMBER },
    { name: 'Website / App', cat: 'Direct Orders', color: BLUE },
    { name: 'QR Ordering', cat: 'Table Service', color: VIOLET },
    { name: 'WhatsApp', cat: 'Messaging', color: '25D366' },
    { name: 'Razorpay', cat: 'Payments', color: '2D81F7' },
    { name: 'Tally ERP', cat: 'Accounting', color: SLATE },
  ]

  integrations.forEach((int, i) => {
    const col = i % 3, row = Math.floor(i / 3)
    const x = 0.25 + col * 3.25, y = 1.18 + row * 1.35
    card(slide, x, y, 3.1, 1.18)
    slide.addShape('roundRect', { x: x + 0.12, y: y + 0.15, w: 0.5, h: 0.5, rectRadius: 0.07, fill: { color: int.color + '22' }, line: { color: int.color + '44' } })
    slide.addText(int.name[0], { x: x + 0.12, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: int.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(int.name, { x: x + 0.75, y: y + 0.18, w: 2.1, h: 0.26, fontSize: 10, bold: true, color: NAVY, fontFace: 'Calibri' })
    slide.addText(int.cat, { x: x + 0.75, y: y + 0.46, w: 2.1, h: 0.2, fontSize: 8, color: SLATE, fontFace: 'Calibri' })
    slide.addShape('ellipse', { x: x + 2.88, y: y + 0.48, w: 0.1, h: 0.1, fill: { color: EMERALD }, line: { color: EMERALD } })
  })

  // API bar
  slide.addShape('roundRect', { x: 0.25, y: H - 0.68, w: 9.5, h: 0.55, rectRadius: 0.08, fill: { color: NAVY }, line: { color: NAVY } })
  slide.addText('🔗  RESTful API with webhook support — integrate with any third-party tool in minutes. 40+ native integrations available.', {
    x: 0.45, y: H - 0.64, w: 7.5, h: 0.38, fontSize: 8.5, color: WHITE + 'CC', fontFace: 'Calibri',
  })
  ;['REST API', 'Webhooks', 'SDK'].forEach((tag, i) => {
    slide.addShape('roundRect', { x: 8.0 + i * 0.55, y: H - 0.58, w: 0.48, h: 0.24, rectRadius: 0.06, fill: { color: BLUE + '44' }, line: { color: BLUE + '88' } })
    slide.addText(tag, { x: 8.0 + i * 0.55, y: H - 0.58, w: 0.48, h: 0.24, fontSize: 6, bold: true, color: BLUE, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  })
}

function addSlide12(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: NAVY }, line: { color: NAVY } })
  slideHeader(slide, 'Analytics', 'Actionable Business Intelligence', 'Real-time insights that drive smarter decisions across all your outlets', true)

  // KPI row
  const kpis = [
    { label: "Today's Sales", val: '₹84,320', change: '+12.4%', color: EMERALD },
    { label: 'Orders', val: '247', change: '+8.1%', color: BLUE },
    { label: 'Avg. Order Value', val: '₹341', change: '+5.6%', color: AMBER },
    { label: 'New Customers', val: '+38', change: 'today', color: VIOLET },
  ]
  kpis.forEach((k, i) => {
    const x = 0.25 + i * 2.42
    slide.addShape('roundRect', { x, y: 1.15, w: 2.28, h: 1.05, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: WHITE + '1A' } })
    slide.addText(k.label, { x: x + 0.12, y: 1.22, w: 2, h: 0.2, fontSize: 8, color: WHITE + '88', fontFace: 'Calibri' })
    slide.addText(k.val, { x: x + 0.12, y: 1.46, w: 2, h: 0.38, fontSize: 18, bold: true, color: WHITE, fontFace: 'Calibri' })
    slide.addText(k.change, { x: x + 0.12, y: 1.88, w: 2, h: 0.2, fontSize: 8, bold: true, color: k.color, fontFace: 'Calibri' })
  })

  // Revenue bar chart
  slide.addShape('roundRect', { x: 0.25, y: 2.32, w: 4.8, h: 2.98, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: WHITE + '1A' } })
  slide.addText('Weekly Revenue Trend', { x: 0.45, y: 2.42, w: 4, h: 0.22, fontSize: 9, color: WHITE + '88', fontFace: 'Calibri' })
  const bars = [62, 78, 55, 90, 83, 71, 95]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const chartH = 1.7, chartY = 2.78
  bars.forEach((h, i) => {
    const bx = 0.5 + i * 0.65, bh = chartH * h / 100
    const by = chartY + chartH - bh
    slide.addShape('roundRect', { x: bx, y: by, w: 0.5, h: bh, rectRadius: 0.04, fill: { color: i === 6 ? EMERALD : BLUE }, line: { color: i === 6 ? EMERALD : BLUE } })
    slide.addText(days[i], { x: bx, y: chartY + chartH + 0.05, w: 0.5, h: 0.18, fontSize: 7, color: WHITE + '66', align: 'center', fontFace: 'Calibri' })
  })

  // Top items
  slide.addShape('roundRect', { x: 5.2, y: 2.32, w: 2.2, h: 2.98, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: WHITE + '1A' } })
  slide.addText('Top Selling Items', { x: 5.35, y: 2.42, w: 1.9, h: 0.22, fontSize: 9, color: WHITE + '88', fontFace: 'Calibri' })
  const topItems = [
    { name: 'Chicken Biryani', pct: 92 },
    { name: 'Paneer Tikka', pct: 78 },
    { name: 'Dal Makhani', pct: 64 },
    { name: 'Mango Lassi', pct: 48 },
  ]
  topItems.forEach((item, i) => {
    const ty = 2.73 + i * 0.6
    slide.addText(item.name, { x: 5.35, y: ty, w: 1.6, h: 0.2, fontSize: 8, color: WHITE + 'CC', fontFace: 'Calibri' })
    slide.addText(`${item.pct}%`, { x: 7.0, y: ty, w: 0.35, h: 0.2, fontSize: 8, bold: true, color: EMERALD, align: 'right', fontFace: 'Calibri' })
    slide.addShape('roundRect', { x: 5.35, y: ty + 0.24, w: 1.9, h: 0.07, rectRadius: 0.03, fill: { color: WHITE + '22' }, line: { color: WHITE + '22' } })
    slide.addShape('roundRect', { x: 5.35, y: ty + 0.24, w: 1.9 * item.pct / 100, h: 0.07, rectRadius: 0.03, fill: { color: EMERALD }, line: { color: EMERALD } })
  })

  // Payment split
  slide.addShape('roundRect', { x: 7.55, y: 2.32, w: 2.2, h: 2.98, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: WHITE + '1A' } })
  slide.addText('Payment Methods', { x: 7.7, y: 2.42, w: 1.9, h: 0.22, fontSize: 9, color: WHITE + '88', fontFace: 'Calibri' })
  const payments = [
    { label: 'UPI', pct: 48, color: BLUE },
    { label: 'Cash', pct: 30, color: AMBER },
    { label: 'Card', pct: 22, color: EMERALD },
  ]
  payments.forEach((p, i) => {
    const py = 2.75 + i * 0.8
    slide.addShape('ellipse', { x: 7.7, y: py + 0.04, w: 0.12, h: 0.12, fill: { color: p.color }, line: { color: p.color } })
    slide.addText(p.label, { x: 7.88, y: py, w: 1, h: 0.22, fontSize: 8, color: WHITE + 'CC', fontFace: 'Calibri' })
    slide.addText(`${p.pct}%`, { x: 9.3, y: py, w: 0.35, h: 0.22, fontSize: 8, bold: true, color: p.color, align: 'right', fontFace: 'Calibri' })
    slide.addShape('roundRect', { x: 7.7, y: py + 0.27, w: 1.9, h: 0.07, rectRadius: 0.03, fill: { color: WHITE + '22' }, line: { color: WHITE + '22' } })
    slide.addShape('roundRect', { x: 7.7, y: py + 0.27, w: 1.9 * p.pct / 100, h: 0.07, rectRadius: 0.03, fill: { color: p.color }, line: { color: p.color } })
  })
}

function addSlide13(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Access Control', 'Role-Based Access Management', 'Granular permissions — every staff member sees only what they need')

  const roles = [
    { role: 'Restaurant Owner', perms: ['Full system access', 'Financial reports', 'Multi-outlet view', 'Staff management'], color: AMBER },
    { role: 'Manager', perms: ['Outlet reports', 'Staff scheduling', 'Inventory control', 'Discount approval'], color: BLUE },
    { role: 'Cashier', perms: ['Billing & POS', 'Payment collection', 'Daily cash report', 'Customer lookup'], color: EMERALD },
    { role: 'Captain', perms: ['Table management', 'Take orders', 'Send KOT', 'Modify orders'], color: VIOLET },
    { role: 'Kitchen Staff', perms: ['View KOT', 'Update status', 'Recipe access', 'Wastage entry'], color: ORANGE },
    { role: 'Inventory Mgr', perms: ['Stock updates', 'Purchase orders', 'Supplier mgmt', 'Wastage reports'], color: PINK },
  ]

  roles.forEach((r, i) => {
    const col = i % 3, row = Math.floor(i / 3)
    const x = 0.25 + col * 3.25, y = 1.15 + row * 2.12
    card(slide, x, y, 3.1, 1.95)
    // Color top border
    slide.addShape('roundRect', { x, y, w: 3.1, h: 0.06, rectRadius: 0.03, fill: { color: r.color }, line: { color: r.color } })
    slide.addShape('roundRect', { x: x + 0.12, y: y + 0.15, w: 0.45, h: 0.45, rectRadius: 0.07, fill: { color: r.color + '22' }, line: { color: r.color + '22' } })
    slide.addText('👤', { x: x + 0.12, y: y + 0.15, w: 0.45, h: 0.45, fontSize: 14, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(r.role, { x: x + 0.65, y: y + 0.22, w: 2.3, h: 0.28, fontSize: 10, bold: true, color: NAVY, fontFace: 'Calibri' })
    r.perms.forEach((p, pi) => {
      slide.addText('✓  ' + p, { x: x + 0.12, y: y + 0.73 + pi * 0.3, w: 2.85, h: 0.24, fontSize: 8, color: SLATE, fontFace: 'Calibri' })
    })
  })
}

function addSlide14(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: NAVY }, line: { color: NAVY } })
  slideHeader(slide, 'Architecture', 'Enterprise-Grade System Design', 'Scalable microservices architecture built for reliability and performance', true)

  const layers = [
    {
      label: 'CLIENT LAYER', y: 1.18,
      items: [
        { label: 'Desktop POS', color: BLUE },
        { label: 'Tablet / Captain App', color: VIOLET },
        { label: 'Admin Dashboard', color: EMERALD },
      ],
    },
    {
      label: 'BACKEND SERVICES', y: 2.55,
      items: [
        { label: 'API Gateway', color: BLUE },
        { label: 'Auth Service', color: AMBER },
        { label: 'Business Logic', color: VIOLET },
        { label: 'WebSockets', color: EMERALD },
      ],
    },
    {
      label: 'DATA & INFRASTRUCTURE', y: 3.9,
      items: [
        { label: 'PostgreSQL', color: '4ECDC4' },
        { label: 'Redis Cache', color: ORANGE },
        { label: 'Cloud Storage', color: BLUE },
        { label: 'Analytics DB', color: EMERALD },
      ],
    },
  ]

  layers.forEach(layer => {
    slide.addText(layer.label, { x: 0.5, y: layer.y, w: 4, h: 0.2, fontSize: 7.5, bold: true, color: BLUE, fontFace: 'Calibri', charSpacing: 1.5 })
    const iw = (W - 1.0) / layer.items.length - 0.15
    layer.items.forEach((item, i) => {
      const ix = 0.5 + i * (iw + 0.15)
      slide.addShape('roundRect', { x: ix, y: layer.y + 0.22, w: iw, h: 0.75, rectRadius: 0.08, fill: { color: WHITE + '0D' }, line: { color: item.color + '55', width: 1 } })
      slide.addText(item.label, { x: ix, y: layer.y + 0.22, w: iw, h: 0.75, fontSize: 9, bold: true, color: WHITE + 'CC', align: 'center', valign: 'middle', fontFace: 'Calibri' })
    })

    if (layer.y < 3.5) {
      slide.addText('↕', { x: 4.6, y: layer.y + 0.95, w: 0.8, h: 0.28, fontSize: 14, color: WHITE + '44', align: 'center', fontFace: 'Calibri' })
    }
  })
}

function addSlide15(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Tech Stack', 'Modern, Battle-Tested Technology', 'Industry-standard open-source stack for reliability, scale, and developer velocity')

  const categories = [
    {
      label: 'Frontend', color: BLUE,
      items: [
        { name: 'React.js', desc: 'Web dashboard & admin panel' },
        { name: 'Electron', desc: 'Desktop POS application' },
        { name: 'React Native', desc: 'Captain & mobile apps' },
      ],
    },
    {
      label: 'Backend', color: EMERALD,
      items: [
        { name: 'Node.js + NestJS', desc: 'Scalable API microservices' },
        { name: 'WebSockets', desc: 'Real-time KDS & POS sync' },
        { name: 'GraphQL', desc: 'Flexible data querying' },
      ],
    },
    {
      label: 'Database', color: AMBER,
      items: [
        { name: 'PostgreSQL', desc: 'Primary relational database' },
        { name: 'Redis', desc: 'Caching & session store' },
        { name: 'Prisma ORM', desc: 'Type-safe DB queries' },
      ],
    },
    {
      label: 'Infrastructure', color: VIOLET,
      items: [
        { name: 'AWS / GCP', desc: 'Multi-region cloud hosting' },
        { name: 'Docker + K8s', desc: 'Container orchestration' },
        { name: 'Cloudflare', desc: 'CDN, DDoS & WAF protection' },
      ],
    },
  ]

  categories.forEach((cat, ci) => {
    const x = 0.25 + ci * 2.42
    const cw = 2.28
    slide.addShape('roundRect', { x, y: 1.15, w: cw, h: 0.48, rectRadius: 0.08, fill: { color: cat.color }, line: { color: cat.color } })
    slide.addText(cat.label, { x, y: 1.15, w: cw, h: 0.48, fontSize: 13, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })

    cat.items.forEach((item, ii) => {
      const iy = 1.73 + ii * 1.27
      card(slide, x, iy, cw, 1.15)
      slide.addText(item.name, { x: x + 0.15, y: iy + 0.14, w: cw - 0.3, h: 0.3, fontSize: 10.5, bold: true, color: NAVY, fontFace: 'Calibri' })
      slide.addText(item.desc, { x: x + 0.15, y: iy + 0.48, w: cw - 0.3, h: 0.45, fontSize: 8.5, color: SLATE, fontFace: 'Calibri', lineSpacingMultiple: 1.3 })
    })
  })
}

function addSlide16(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Roadmap', 'Future Innovation Pipeline', 'Next-generation features powered by AI and emerging technology')

  const modules = [
    { label: 'Reservation System', desc: 'Online table booking with SMS', color: BLUE },
    { label: 'Token Display', desc: 'Queue mgmt for QSR kitchens', color: ORANGE },
    { label: 'Feedback System', desc: 'Post-meal digital feedback', color: AMBER },
    { label: 'QR Menu Builder', desc: 'Contactless digital menus', color: EMERALD },
    { label: 'Website Builder', desc: 'Restaurant site + online orders', color: VIOLET },
    { label: 'Subscription Plans', desc: 'SaaS billing module', color: CYAN },
    { label: 'AI Sales Prediction', desc: 'ML demand forecasting', color: PINK },
    { label: 'AI Inventory Forecast', desc: 'Predictive stock reordering', color: BLUE },
    { label: 'Voice Ordering', desc: 'Hands-free KOT entry', color: AMBER },
    { label: 'Marketplace', desc: 'Multi-vendor cloud kitchen hub', color: EMERALD },
    { label: 'Computer Vision', desc: 'AI dish detection & auto billing', color: ORANGE },
  ]

  modules.forEach((m, i) => {
    const col = i % 4, row = Math.floor(i / 4)
    const x = 0.25 + col * 2.42, y = 1.15 + row * 1.5
    card(slide, x, y, 2.28, 1.32)
    slide.addShape('roundRect', { x: x + 0.12, y: y + 0.12, w: 0.38, h: 0.38, rectRadius: 0.06, fill: { color: m.color + '22' }, line: { color: m.color + '22' } })
    slide.addText('✦', { x: x + 0.12, y: y + 0.12, w: 0.38, h: 0.38, fontSize: 12, color: m.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(m.label, { x: x + 0.58, y: y + 0.14, w: 1.6, h: 0.28, fontSize: 9, bold: true, color: NAVY, fontFace: 'Calibri' })
    slide.addText(m.desc, { x: x + 0.12, y: y + 0.58, w: 2.05, h: 0.55, fontSize: 7.5, color: SLATE, fontFace: 'Calibri', lineSpacingMultiple: 1.3 })
  })
}

function addSlide17(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Development Roadmap', 'From MVP to Enterprise Platform', 'Phased execution strategy — each phase builds on the previous')

  const phases = [
    { num: '01', title: 'Phase 1\nCore POS', timeline: 'Q1 2025', color: BLUE, status: 'Completed', items: ['POS Billing Engine', 'Table Management', 'KOT Generation', 'GST Billing', 'Basic Reports'] },
    { num: '02', title: 'Phase 2\nOperations', timeline: 'Q2 2025', color: EMERALD, status: 'Completed', items: ['Inventory Module', 'Recipe Management', 'Customer CRM', 'Loyalty Program', 'Advanced Reports'] },
    { num: '03', title: 'Phase 3\nIntegrations', timeline: 'Q3–Q4 2025', color: AMBER, status: 'In Progress', items: ['Swiggy / Zomato', 'Payment Gateways', 'Captain App', 'Multi-Branch', 'WhatsApp'] },
    { num: '04', title: 'Phase 4\nAI & Scale', timeline: '2026', color: VIOLET, status: 'Planned', items: ['AI Predictions', 'Voice Ordering', 'SaaS Platform', 'Enterprise APIs', 'Marketplace'] },
  ]

  const statusColor: Record<string, string> = { Completed: EMERALD, 'In Progress': AMBER, Planned: SLATE }

  // Timeline line
  slide.addShape('line', { x: 1.2, y: 1.55, w: 7.7, h: 0, line: { color: 'E2E8F0', width: 2 } })

  phases.forEach((p, i) => {
    const x = 0.25 + i * 2.42, cw = 2.28
    const cx = x + cw / 2

    // Circle on timeline
    slide.addShape('ellipse', { x: cx - 0.25, y: 1.3, w: 0.5, h: 0.5, fill: { color: p.status === 'Planned' ? WHITE : p.color }, line: { color: p.color, width: 2 } })
    slide.addText(p.num, { x: cx - 0.25, y: 1.3, w: 0.5, h: 0.5, fontSize: 9, bold: true, color: p.status === 'Planned' ? p.color : WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })

    card(slide, x, 1.9, cw, 3.48, WHITE)
    slide.addShape('roundRect', { x, y: 1.9, w: cw, h: 0.04, rectRadius: 0.02, fill: { color: p.color }, line: { color: p.color } })

    slide.addText(p.timeline, { x: x + 0.12, y: 2.0, w: cw - 0.24, h: 0.2, fontSize: 7.5, color: SLATE, fontFace: 'Calibri' })
    slide.addText(p.title, { x: x + 0.12, y: 2.22, w: cw - 0.24, h: 0.5, fontSize: 11, bold: true, color: NAVY, fontFace: 'Calibri', lineSpacingMultiple: 1.1 })
    slide.addText(p.status.toUpperCase(), { x: x + 0.12, y: 2.76, w: cw - 0.24, h: 0.2, fontSize: 7, bold: true, color: statusColor[p.status], fontFace: 'Calibri', charSpacing: 0.8 })

    p.items.forEach((item, ii) => {
      const done = p.status !== 'Planned'
      slide.addShape('ellipse', { x: x + 0.12, y: 3.05 + ii * 0.45, w: 0.16, h: 0.16, fill: { color: done ? p.color + '22' : LIGHT }, line: { color: p.color, width: 1 } })
      if (done) slide.addText('✓', { x: x + 0.12, y: 3.05 + ii * 0.45, w: 0.16, h: 0.16, fontSize: 7, color: p.color, align: 'center', valign: 'middle', fontFace: 'Calibri' })
      slide.addText(item, { x: x + 0.35, y: 3.07 + ii * 0.45, w: cw - 0.48, h: 0.22, fontSize: 8.5, color: SLATE, fontFace: 'Calibri' })
    })
  })
}

function addSlide18(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: WHITE }, line: { color: WHITE } })
  slideHeader(slide, 'Why Us', 'Built Different. Engineered to Last.', 'Not just software — a long-term technology partnership for your restaurant business')

  const reasons = [
    { icon: '🖥', title: 'Modern UI/UX', desc: 'Staff learn in minutes, not days.' },
    { icon: '☁', title: 'Cloud Native', desc: 'Access data from anywhere, anytime.' },
    { icon: '📶', title: 'Offline Support', desc: 'Never stop billing — even offline.' },
    { icon: '⚡', title: 'Fast Billing', desc: 'Complete a bill in under 60 seconds.' },
    { icon: '📈', title: 'Scalable', desc: '1 to 500 outlets — same platform.' },
    { icon: '🔧', title: 'Custom Dev', desc: 'Built to your workflow, not vice versa.' },
    { icon: '🔗', title: 'API Ready', desc: 'Connect any third-party system easily.' },
    { icon: '🌐', title: 'Multi-Branch', desc: 'Centralized control, all locations.' },
    { icon: '🛡', title: 'Secure', desc: 'SOC2 compliant, AES-256 encryption.' },
    { icon: '🚀', title: 'Future Ready', desc: 'AI, voice & ML modules on roadmap.' },
  ]

  reasons.forEach((r, i) => {
    const col = i % 5, row = Math.floor(i / 5)
    const x = 0.2 + col * 1.93, y = 1.15 + row * 2.1
    const dark = i === 0

    if (dark) {
      slide.addShape('roundRect', { x, y, w: 1.8, h: 1.92, rectRadius: 0.1, fill: { color: NAVY }, line: { color: NAVY } })
    } else {
      card(slide, x, y, 1.8, 1.92)
    }
    slide.addShape('roundRect', { x: x + 0.65, y: y + 0.15, w: 0.5, h: 0.5, rectRadius: 0.08, fill: { color: dark ? BLUE + '44' : BLUE_LIGHT }, line: { color: dark ? BLUE + '44' : BLUE_LIGHT } })
    slide.addText(r.icon, { x: x + 0.65, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 16, align: 'center', valign: 'middle', fontFace: 'Calibri' })
    slide.addText(r.title, { x: x + 0.12, y: y + 0.76, w: 1.56, h: 0.28, fontSize: 9.5, bold: true, color: dark ? WHITE : NAVY, align: 'center', fontFace: 'Calibri' })
    slide.addText(r.desc, { x: x + 0.12, y: y + 1.05, w: 1.56, h: 0.6, fontSize: 7.5, color: dark ? WHITE + '88' : SLATE, align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.3 })
  })
}

function addSlide19(prs: pptxgen) {
  const slide = prs.addSlide()
  slide.addShape('rect', { x: 0, y: 0, w: W, h: H, fill: { color: NAVY }, line: { color: NAVY } })

  // Glow blobs
  slide.addShape('ellipse', { x: -1, y: 0.5, w: 5, h: 4, fill: { color: BLUE + '1A' }, line: { color: BLUE + '1A' } })
  slide.addShape('ellipse', { x: 6, y: 1, w: 5, h: 4, fill: { color: EMERALD + '0F' }, line: { color: EMERALD + '0F' } })

  // Logo mark
  slide.addShape('roundRect', { x: 4.4, y: 0.55, w: 1.2, h: 1.2, rectRadius: 0.2, fill: { color: BLUE }, line: { color: BLUE } })
  slide.addText('⚡', { x: 4.4, y: 0.55, w: 1.2, h: 1.2, fontSize: 32, align: 'center', valign: 'middle', fontFace: 'Calibri' })

  slide.addText('Thank You', { x: 2, y: 1.9, w: 6, h: 0.8, fontSize: 44, bold: true, color: WHITE, align: 'center', fontFace: 'Calibri' })
  slide.addText('Questions & Discussion', { x: 2, y: 2.72, w: 6, h: 0.38, fontSize: 16, color: EMERALD, align: 'center', fontFace: 'Calibri' })
  slide.addText('Ready to transform your restaurant operations?\nLet\'s build the future of hospitality technology together.', {
    x: 1.5, y: 3.18, w: 7, h: 0.6, fontSize: 10.5, color: WHITE + '88', align: 'center', fontFace: 'Calibri', lineSpacingMultiple: 1.5,
  })

  // CTA buttons
  slide.addShape('roundRect', { x: 2.5, y: 3.92, w: 2.1, h: 0.42, rectRadius: 0.08, fill: { color: BLUE }, line: { color: BLUE } })
  slide.addText('Schedule a Demo', { x: 2.5, y: 3.92, w: 2.1, h: 0.42, fontSize: 10, bold: true, color: WHITE, align: 'center', valign: 'middle', fontFace: 'Calibri' })
  slide.addShape('roundRect', { x: 5.4, y: 3.92, w: 2.1, h: 0.42, rectRadius: 0.08, fill: { color: WHITE + '18' }, line: { color: WHITE + '33' } })
  slide.addText('Request a Proposal', { x: 5.4, y: 3.92, w: 2.1, h: 0.42, fontSize: 10, color: WHITE + 'CC', align: 'center', valign: 'middle', fontFace: 'Calibri' })

  // Contact
  const contacts = ['🌐  www.restaurantpos.in', '📞  +91 98765 43210', '✉  hello@restaurantpos.in']
  contacts.forEach((c, i) => {
    slide.addText(c, { x: 1.0 + i * 2.75, y: 4.52, w: 2.6, h: 0.2, fontSize: 8.5, color: WHITE + '66', align: 'center', fontFace: 'Calibri' })
  })

  // Footer
  slide.addText('Confidential — For Discussion Purposes Only', { x: 0.5, y: H - 0.22, w: 5, h: 0.18, fontSize: 7, color: WHITE + '44', fontFace: 'Calibri' })
  slide.addText('Restaurant POS Platform © 2025', { x: 5.5, y: H - 0.22, w: 4, h: 0.18, fontSize: 7, color: WHITE + '44', align: 'right', fontFace: 'Calibri' })
}

// ── Main export ────────────────────────────────────────────────────────────────

export async function generatePptx() {
  const prs = new pptxgen()

  prs.layout = 'LAYOUT_WIDE'
  prs.title = 'Restaurant POS & Billing Software'
  prs.subject = 'Smart. Fast. Scalable.'
  prs.company = 'Restaurant POS Platform'

  addSlide1(prs)
  addSlide2(prs)
  addSlide3(prs)
  addSlide4(prs)
  addSlide5(prs)
  addSlide6(prs)
  addSlide7(prs)
  addSlide8(prs)
  addSlide9(prs)
  addSlide10(prs)
  addSlide11(prs)
  addSlide12(prs)
  addSlide13(prs)
  addSlide14(prs)
  addSlide15(prs)
  addSlide16(prs)
  addSlide17(prs)
  addSlide18(prs)
  addSlide19(prs)

  await prs.writeFile({ fileName: 'Restaurant-POS-Presentation.pptx' })
}
