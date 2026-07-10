import { useState } from 'react'
import { packs } from './data/packs'

/* ─── helpers ─────────────────────────────────────── */
const classIcons = {
  'eyfs-junior': '🌱',
  'eyfs-1':      '🐣',
  'eyfs-2':      '🦋',
  'year-1':      '📚',
  'year-2':      '✏️',
  'year-3':      '🔭',
  'year-4':      '🧪',
  'year-5':      '🌍',
  'year-6':      '🎨',
  'year-7':      '⚡',
  'year-8':      '🎓',
}

function totalResourceCount(pack) {
  let count = 0
  pack.groups.forEach(g => g.items.forEach(i => { count += i.resources.length }))
  return count
}
/* ─── Logolar 2 Strip ───────────────────────────────── */
const logolar2List = [
  { src: '/logolar 2/cambridge-active.webp', alt: 'Cambridge Assessment' },
  { src: '/logolar 2/ib-active.webp', alt: 'IB' },
  { src: '/logolar 2/cobis-active.webp', alt: 'COBIS' },
  { src: '/logolar 2/cis-active.webp', alt: 'CIS' },
  { src: '/logolar 2/collegeboard-active.webp', alt: 'College Board' },
  { src: '/logolar 2/dofe-active.webp', alt: "Duke of Edinburgh's Award" },
  { src: '/logolar 2/msa-active.webp', alt: 'MSA' },
]

function Logolar2Strip() {
  return (
    <div className="logolar2-strip">
      <div className="logolar2-inner">
        {logolar2List.map((logo, i) => (
          <div key={i} className="logolar2-item">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── University Logos Strip ─────────────────────────── */
const universityLogos = [
  '/logolar/_0000_university-of-cambridge-logo-3.webp',
  '/logolar/_0001_University_of_Toronto-Logo.wine.webp',
  '/logolar/_0002_UC-Berkeley-Emblem.webp',
  '/logolar/_0003_UBC.webp',
  '/logolar/_0004_seul.webp',
  '/logolar/_0005_NYU-Logo.webp',
  '/logolar/_0006_London_school_of_economics_logo_with_name.svg.webp',
  '/logolar/_0007_imperial-college-london-logo-vector.webp',
  '/logolar/_0008_Brown-University-Emblem.webp',
  '/logolar/_0009_glasgow.webp',
  '/logolar/_0010_durham.webp',
  '/logolar/_0011_edinburg.webp',
  '/logolar/_0012_goldsmiths.webp',
  '/logolar/_0013_kingscollege.webp',
  '/logolar/_0014_lucern.webp',
  '/logolar/_0015_nothingam.webp',
  '/logolar/_0016_royal_halloway.webp',
  '/logolar/_0017_southampton.webp',
  '/logolar/_0018_suffolk.webp',
  '/logolar/_0019_washginton.webp',
]

function UniversityLogosStrip() {
  return (
    <div className="uni-logos-section">
      <div className="uni-logos-header">
        <p className="uni-logos-subtitle">Our Graduates Continue Their Education At</p>
      </div>
      <div className="uni-logos-viewport">
        <div className="uni-logos-track">
          {[...universityLogos, ...universityLogos].map((src, i) => (
            <div key={i} className="uni-logo-item">
              <img src={src} alt={`University ${i % universityLogos.length}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Parallax Strip ─────────────────────────────────── */
function ParallaxStrip() {
  return (
    <div className="parallax-strip">
      <div className="parallax-strip-fade top" />
      <div className="parallax-strip-fade bottom" />
    </div>
  )
}
/* ─── Top Alert Bar ───────────────────────────────── */
function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span>2026–2027 Academic Year</span>
        <span>ENG Publish — Official School Resource Packs</span>
        <span>Cambridge International Curriculum</span>
      </div>
      <div className="top-bar-right">
        <a href="mailto:info@bis.k12.tr" className="top-bar-contact">info@bis.k12.tr</a>
        <a href="tel:+908502598484" className="top-bar-contact">+90 850 259 84 84</a>
      </div>
    </div>
  )
}

/* ─── Deadline Banner ─────────────────────────────── */
function DeadlineBanner() {
  return (
    <div className="deadline-banner">
      <div className="deadline-banner-inner">
        <span className="deadline-badge">Order Deadline</span>
        <span className="deadline-text">
          Place your order by <strong>Monday, 20 July 2026</strong> to ensure timely delivery before the start of term.
        </span>
        <span className="deadline-sep" />
        <span className="deadline-lang">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
          </svg>
          Foreign language resources require 6–8 weeks to procure
        </span>
      </div>
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">EP</div>
          <div>
            <div className="nav-logo-text">ENG Publish</div>
            <div className="nav-logo-sub">School Resource Packs</div>
          </div>
        </a>
        <div className="nav-right">
          <span className="year-indicator">2026 – 2027</span>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero / Form ─────────────────────────────────── */
function HeroSection({ onSubmit }) {
  const [form, setForm] = useState({
    parentFirst: '', parentLast: '', studentFirst: '', studentLast: '', campus: ''
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.parentFirst.trim())   errs.parentFirst   = 'Required'
    if (!form.parentLast.trim())    errs.parentLast    = 'Required'
    if (!form.studentFirst.trim())  errs.studentFirst  = 'Required'
    if (!form.studentLast.trim())   errs.studentLast   = 'Required'
    if (!form.campus)               errs.campus        = 'Required'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit(form)
  }

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left — copy */}
        <div className="fade-up">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now Open for Orders
          </div>
          <h1 className="hero-title">
            Your Child's<br />
            <em>Academic Year</em><br />
            Resource Pack
          </h1>
          <p className="hero-desc">
            Select the correct year group to view your child's complete resource list for 2026–2027,
            aligned with the Cambridge International Curriculum and Ministry of National Education outcomes.
          </p>

        </div>

        {/* Right — form */}
        <div className="form-card fade-up stagger-2">
          <h3 className="form-card-title">Get Started</h3>
          <p className="form-card-sub">Please enter your details to continue to class selection.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section-label">Parent / Guardian</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  className="form-input"
                  name="parentFirst"
                  value={form.parentFirst}
                  onChange={handleChange}
                  placeholder="e.g. Sarah"
                  style={errors.parentFirst ? { borderColor: '#E53E3E' } : {}}
                />
                {errors.parentFirst && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.parentFirst}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  className="form-input"
                  name="parentLast"
                  value={form.parentLast}
                  onChange={handleChange}
                  placeholder="e.g. Johnson"
                  style={errors.parentLast ? { borderColor: '#E53E3E' } : {}}
                />
                {errors.parentLast && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.parentLast}</span>}
              </div>
            </div>

            <div className="form-divider" />
            <div className="form-section-label">Student</div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Student First Name</label>
                <input
                  className="form-input"
                  name="studentFirst"
                  value={form.studentFirst}
                  onChange={handleChange}
                  placeholder="e.g. Emma"
                  style={errors.studentFirst ? { borderColor: '#E53E3E' } : {}}
                />
                {errors.studentFirst && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.studentFirst}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Student Last Name</label>
                <input
                  className="form-input"
                  name="studentLast"
                  value={form.studentLast}
                  onChange={handleChange}
                  placeholder="e.g. Johnson"
                  style={errors.studentLast ? { borderColor: '#E53E3E' } : {}}
                />
                {errors.studentLast && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.studentLast}</span>}
              </div>
            </div>

            <div className="form-divider" />
            <div className="form-section-label">Campus</div>
            <div className="form-group">
              <label className="form-label">Select Campus</label>
              <select
                className="form-input form-select"
                name="campus"
                value={form.campus}
                onChange={handleChange}
                style={errors.campus ? { borderColor: '#E53E3E' } : {}}
              >
                <option value="">— Select campus —</option>
                <option value="Zekeriyaköy">Zekeriyaköy</option>
                <option value="Bahçeşehir">Bahçeşehir</option>
                <option value="Çamlıca Hill">Çamlıca Hill</option>
              </select>
              {errors.campus && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.campus}</span>}
            </div>

            <button type="submit" className="btn-primary">
              Continue to Class Selection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

    </section>
  )
}

/* ─── Student Info Bar ────────────────────────────── */
function StudentBar({ formData, onEdit }) {
  return (
    <div className="student-bar">
      <div className="student-bar-inner">
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">Parent</div>
            <div>{formData.parentFirst} {formData.parentLast}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
          <path d="M5 12h14"/>
        </svg>
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">Student</div>
            <div>{formData.studentFirst} {formData.studentLast}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
          <path d="M5 12h14"/>
        </svg>
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">Campus</div>
            <div>{formData.campus}</div>
          </div>
        </div>
        <button className="student-bar-edit" onClick={onEdit}>Edit Details</button>
      </div>
    </div>
  )
}

/* ─── Class Selection ─────────────────────────────── */
function ClassSelection({ formData, onSelect, onBack }) {
  return (
    <section className="section class-selection-section">
      <div className="container">
        <div className="class-selection-header fade-up">
          <div className="class-selection-step">Step 2 of 2</div>
          <h2 className="class-selection-title">Select Your Child's Year Group</h2>
          <p className="class-selection-desc">
            Choose the class your child will be enrolled in for the 2026–2027 academic year.
          </p>
        </div>

        <div className="class-list fade-up stagger-2">
          {packs.map((pack) => {
            const count = totalResourceCount(pack)
            return (
              <div
                key={pack.id}
                className="class-list-item"
                onClick={() => onSelect(pack.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelect(pack.id)}
              >
                <div className="class-list-bar" />
                <div className="class-list-body">
                  <span className="class-list-pill">{pack.label}</span>
                  <div className="class-list-name">{pack.name}</div>
                  <div className="class-list-sub">{pack.subtitle}</div>
                </div>
                <div className="class-list-meta">
                  <span className="class-list-count">{count} resources</span>
                  <div className="class-list-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button className="btn-secondary" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Form
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Class Card ──────────────────────────────────── */
function ClassCard({ pack, delay, onClick }) {
  const icon = classIcons[pack.id] || '📖'
  const count = totalResourceCount(pack)

  return (
    <div
      className="class-card fade-up"
      style={{
        '--card-accent': pack.colorAccent,
        '--card-bg': pack.colorBg,
        animationDelay: `${delay}s`,
        cursor: 'pointer',
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="class-card-top">
        <div className="class-card-icon-wrap">{icon}</div>
        <span className="class-card-label-pill">{pack.label}</span>
      </div>
      <div>
        <div className="class-card-name">{pack.name}</div>
        <div className="class-card-sub">{pack.subtitle}</div>
      </div>
      <div className="class-card-footer">
        <span className="class-card-count">{count} resources</span>
        <div className="class-card-arrow">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ─── Resource Group ──────────────────────────────── */
function ResourceGroup({ group, index }) {
  const groupColors = {
    'Modern Foreign Language': '#7B6FA0',
    'English (Cambridge International Curriculum)': '#4A6FA5',
    'Turkish': '#6BAF82',
    'Class Pack': '#B8983C',
  }
  const color = groupColors[group.group] || '#4A6FA5'
  const totalItems = group.items.reduce((sum, i) => sum + i.resources.length, 0)

  return (
    <div className="resource-group fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="resource-group-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span className="resource-group-name" style={{ color }}>{group.group}</span>
        <span className="resource-group-badge">{totalItems} items</span>
      </div>
      <table className="resource-table">
        <thead>
          <tr>
            <th>Lesson / Subject</th>
            <th>Resource</th>
          </tr>
        </thead>
        <tbody>
          {group.items.map((item, j) => (
            <tr key={j}>
              <td><span className="lesson-name">{item.lesson}</span></td>
              <td>
                <ul className="resource-list">
                  {item.resources.map((r, k) => (
                    <li
                      key={k}
                      className={`resource-item${r === 'During The Year' ? ' during' : ''}`}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const genelImages = [
  '/genel/03781205-3749-4468-a69e-e1ee5cad4117.jpg',
  '/genel/776ffad9-afd9-4474-9d9d-464ec8b85c18.jpg',
  '/genel/800fd17e-e2d6-4657-bcd3-b8afb351aaac.jpg',
  '/genel/e3bec6f3-dbcb-45d6-b8c9-2a7f0e103513.jpg',
]

/* ─── Pack Detail ───────────────────────────────────── */
function PackDetail({ packId, formData, onBack }) {
  const pack = packs.find(p => p.id === packId)
  if (!pack) return null

  const packIndex = packs.findIndex(p => p.id === packId)
  const bannerImg = genelImages[packIndex % genelImages.length]
  const count = totalResourceCount(pack)

  return (
    <section className="pack-section">
      <div className="pack-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="pack-banner-overlay" />
      </div>

      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb fade-up" style={{ paddingTop: 20 }}>
          <span className="breadcrumb-item" onClick={() => onBack('classes')}>All Classes</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{pack.name} Resource Pack</span>
        </div>

        <div style={{ paddingTop: 24 }}>
          <div className="pack-detail">
            {/* Header */}
            <div className="pack-header fade-up">
              <div className="pack-header-left">
                <div
                  className="pack-icon-lg"
                  style={{ background: 'rgba(27,61,42,0.08)', color: 'var(--navy)' }}
                >
                  <span className="pack-icon-initials">{pack.label}</span>
                </div>
                <div className="pack-title-block">
                  <div className="pack-tag" style={{ color: 'var(--navy-soft)' }}>
                    2026–2027 Academic Year
                  </div>
                  <h1 className="pack-header-title">{pack.name} Resource Pack</h1>
                  <div className="pack-header-sub">{pack.subtitle} · {count} resources across {pack.groups.length} categories</div>
                </div>
              </div>
            </div>

            {/* MFL Note */}
            {pack.note && (
              <div className="pack-note-box fade-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{pack.note}</span>
              </div>
            )}

            {/* Resource Groups */}
            {pack.groups.map((group, i) => (
              <ResourceGroup key={i} group={group} index={i} />
            ))}

            {/* Payment Details */}
            <div className="pack-payment-section fade-up">
              <div className="pack-payment-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <span className="pack-payment-title">Payment Details</span>
              </div>
              <p className="pack-payment-desc">
                Place your order by <strong>Monday, 20 July 2026</strong>. Transfer the total amount to the account below and use your child's name as the payment reference.
              </p>
              <div className="pack-payment-grid">
                <div className="pack-payment-field">
                  <span className="pack-payment-label">Account Holder</span>
                  <span className="pack-payment-value">Eng eğitim hizmetleri ticaret limited şirketi</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">Bank</span>
                  <span className="pack-payment-value">Vakıfbank</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">IBAN</span>
                  <span className="pack-payment-value">TR84 0001 5001 5800 7390 9344 79</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">Payment Reference</span>
                  <span className="pack-payment-value">{formData.studentFirst} {formData.studentLast}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }} className="fade-up">
              <button className="btn-secondary" onClick={() => onBack('classes')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to All Classes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Cart Panel ──────────────────────────────────── */
function CartPanel({ cart, formData, onRemove, onClose }) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-panel-header">
          <h2 className="cart-panel-title">Your Order</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <div className="cart-empty-text">No items in your order yet</div>
            </div>
          ) : (
            <>
              {confirmed && (
                <div className="success-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Order request submitted! Please complete payment via bank transfer.
                </div>
              )}

              {/* Order for info */}
              <div style={{
                background: 'var(--bg-muted)', borderRadius: 'var(--r-sm)',
                padding: '12px 14px', fontSize: 13, marginBottom: 4
              }}>
                <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 2 }}>Order For</div>
                <div style={{ color: 'var(--text-sec)' }}>
                  {formData.studentFirst} {formData.studentLast}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                  Parent: {formData.parentFirst} {formData.parentLast}
                </div>
              </div>

              {/* Cart items */}
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-icon" style={{ background: item.colorBg }}>
                    {classIcons[item.id] || '📖'}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name} Resource Pack</div>
                    <div className="cart-item-sub">{item.subtitle}</div>
                  </div>
                  <button className="cart-item-remove" onClick={() => onRemove(item.id)} title="Remove">×</button>
                </div>
              ))}
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-panel-footer">
            <div className="cart-order-info">
              <div className="cart-order-title">Payment via Bank Transfer</div>
              <div className="cart-order-sub">Please transfer the total amount to the account below and use your child's name as the reference.</div>
              <div className="payment-row">
                <div className="payment-field">
                  <span className="payment-field-label">Bank Name</span>
                  <span className="payment-field-value">Vakıfbank</span>
                </div>
                <div className="payment-field">
                  <span className="payment-field-label">Account Holder</span>
                  <span className="payment-field-value">Eng eğitim hizmetleri ticaret limited şirketi</span>
                </div>
                <div className="payment-field">
                  <span className="payment-field-label">IBAN</span>
                  <span className="payment-field-value">TR84 0001 5001 5800 7390 9344 79</span>
                </div>
                <div className="payment-field">
                  <span className="payment-field-label">Reference</span>
                  <span className="payment-field-value">{formData.studentFirst} {formData.studentLast}</span>
                </div>
              </div>
              <div className="payment-placeholder">
                💳 Online payment integration coming soon
              </div>
            </div>
            <button
              className="btn-confirm"
              onClick={() => setConfirmed(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Confirm Order Request
            </button>
          </div>
        )}
      </div>
    </>
  )
}

/* ─── Footer ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-text">ENG Publish</div>
          <p className="footer-desc">
            A trusted global provider of International Curriculum resource packs. Proudly serving the world's leading schools.
          </p>
          <div className="footer-contact-list">
            <a href="mailto:info@bis.k12.tr" className="footer-contact-link">info@bis.k12.tr</a>
            <a href="tel:+908502598484" className="footer-contact-link">+90 850 259 84 84</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Order Deadline</div>
          <div className="footer-deadline">
            <div className="footer-deadline-label">2026–2027 Academic Year</div>
            <div className="footer-deadline-date">20 July 2026</div>
            <div className="footer-deadline-sub">
              Foreign language resources: 6–8 weeks procurement lead time
            </div>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Payment Details</div>
          <div className="footer-payment-box">
            <div className="footer-payment-row">
              <span className="footer-payment-label">Account Holder</span>
              <span className="footer-payment-value">Eng eğitim hizmetleri ticaret limited şirketi</span>
            </div>
            <div className="footer-payment-row">
              <span className="footer-payment-label">Bank</span>
              <span className="footer-payment-value">Vakıfbank</span>
            </div>
            <div className="footer-payment-row">
              <span className="footer-payment-label">IBAN</span>
              <span className="footer-payment-value">TR84 0001 5001 5800 7390 9344 79</span>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 ENG Publish. All rights reserved. · 2026–2027 Academic Year Resource Packs</span>
        <span className="footer-copy">Cambridge International Curriculum · Ministry of National Education</span>
      </div>
    </footer>
  )
}

/* ─── App (root) ──────────────────────────────────── */
export default function App() {
  const [step, setStep] = useState('form')         // 'form' | 'classes' | 'pack'
  const [formData, setFormData] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function handleFormSubmit(data) {
    setFormData(data)
    setStep('classes')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  function handleClassSelect(id) {
    setSelectedClass(id)
    setStep('pack')
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  function handleBack(to) {
    setStep(to)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  function handleAddToCart(pack) {
    setCart(c => [...c.filter(i => i.id !== pack.id), pack])
    setCartOpen(true)
  }

  function handleRemoveFromCart(id) {
    setCart(c => c.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className={step === 'pack' ? 'top-compact' : ''}>
        <TopBar />
        <DeadlineBanner />
      </div>
      <Nav />
      <Logolar2Strip />

      {step !== 'form' && formData && (
        <StudentBar formData={formData} onEdit={() => handleBack('form')} />
      )}

      {step === 'form' && (
        <>
          <HeroSection onSubmit={handleFormSubmit} />
          <UniversityLogosStrip />
        </>
      )}

      {step === 'classes' && formData && (
        <ClassSelection
          formData={formData}
          onSelect={handleClassSelect}
          onBack={() => handleBack('form')}
        />
      )}

      {step === 'pack' && selectedClass && formData && (
        <PackDetail
          packId={selectedClass}
          formData={formData}
          cart={cart}
          onAddToCart={handleAddToCart}
          onBack={handleBack}
        />
      )}

      <ParallaxStrip />
      <Footer />
    </div>
  )
}
