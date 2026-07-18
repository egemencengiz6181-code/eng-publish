import { useState, createContext, useContext } from 'react'
import { packs } from './data/packs'
import { translations } from './translations'

/* ─── Legal Pages ────────────────────────────── */
import MesafeliSatisSozlesmesi from './pages/legal/MesafeliSatisSozlesmesi'
import KVKKAydinlatma from './pages/legal/KVKKAydinlatma'
import GizlilikPolitikasi from './pages/legal/GizlilikPolitikasi'
import IptalIadeKosullari from './pages/legal/IptalIadeKosullari'
import TeslimatKargoKosullari from './pages/legal/TeslimatKargoKosullari'

/* ─── Payment Pages ──────────────────────────── */
import PaymentPage from './pages/payment/PaymentPage'
import SecureVerification from './pages/payment/SecureVerification'
import OrderSuccess from './pages/payment/OrderSuccess'
import PaymentFailed from './pages/payment/PaymentFailed'

/* ─── Language Context ────────────────────────── */
const LangContext = createContext('en')
function useLang() {
  const lang = useContext(LangContext)
  return translations[lang]
}

/* ─── Pricing Data ────────────────────────────── */
// Temmuz = former "Haziran" prices | Ağustos = former "Temmuz-Ağustos" prices
const packPrices = {
  'eyfs-junior': { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
  'eyfs-1':      { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
  'eyfs-2':      { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
  'year-1':      { temmuz: '₺89.794,50', agustos: '₺92.787,65', eylul: '₺102.066,42' },
  'year-2':      { temmuz: '₺80.392,50', agustos: '₺83.072,25', eylul: '₺91.379,48' },
  'year-3':      { temmuz: '₺81.019,50', agustos: '₺83.720,15', eylul: '₺92.092,17' },
  'year-4':      { temmuz: '₺90.721,50', agustos: '₺93.745,55', eylul: '₺103.120,11' },
  'year-5':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
  'year-6':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
  'year-7':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
  'year-8':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
  'prep':        { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
}

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
  'prep':        '🌟',
}

function totalResourceCount(pack) {
  let count = 0
  pack.groups.forEach(g => g.items.forEach(i => { count += i.resources.length }))
  return count
}

/* ─── Pricing Box ─────────────────────────────── */
function PricingBox({ packId }) {
  const t = useLang()
  const prices = packPrices[packId]
  if (!prices) return null
  const month = new Date().getMonth()
  const current = month < 7 ? 'temmuz' : month === 7 ? 'agustos' : 'eylul'

  return (
    <div className="pricing-box fade-up">
      <div className="pricing-box-header">
        <span style={{ fontWeight: 700, fontSize: 15, flexShrink: 0, color: 'var(--navy)', lineHeight: 1 }}>₺</span>
        <span className="pricing-box-title">{t.pricingTitle}</span>
      </div>
      <div className="pricing-box-rows">
        <div className={`pricing-box-row${current === 'temmuz' ? ' pricing-current' : ''}`}>
          <span className="pricing-month">{t.pricingTemmuz}</span>
          <span className="pricing-amount">{prices.temmuz}</span>
          {current === 'temmuz' && <span className="pricing-badge">{t.currentPrice}</span>}
        </div>
        <div className={`pricing-box-row${current === 'agustos' ? ' pricing-current' : ''}`}>
          <span className="pricing-month">{t.pricingAgustos}</span>
          <span className="pricing-amount">{prices.agustos}</span>
          {current === 'agustos' && <span className="pricing-badge">{t.currentPrice}</span>}
        </div>
        <div className={`pricing-box-row pricing-eylul${current === 'eylul' ? ' pricing-current' : ''}`}>
          <span className="pricing-month">{t.pricingEylul}</span>
          <span className="pricing-amount">{prices.eylul}</span>
          {current === 'eylul' && <span className="pricing-badge">{t.currentPrice}</span>}
        </div>
      </div>
      <div className="pricing-eylul-msg">{t.eylulWarning}</div>
    </div>
  )
}

/* ─── Logolar 2 Strip ───────────────────────────────── */
const logolar2List = [
  { src: '/logolar 2/cupcolorlogo.png', alt: 'Cambridge University Press' },
  { src: '/logolar 2/Oxford_University_Press_logo.svg.png', alt: 'Oxford University Press' },
  { src: '/logolar 2/Pearson_logo.svg.png', alt: 'Pearson' },
  { src: '/logolar 2/64f54c9208460c591c315ccb_logo-mc-graw-hill.png', alt: 'McGraw-Hill' },
  { src: '/logolar 2/Harvard_univ_press.svg.png', alt: 'Harvard University Press' },
  { src: '/logolar 2/PRH-GlobalCorporate-Logo-RGB.png', alt: 'Penguin Random House' },
  { src: '/logolar 2/66f162ae34ce3b4fd720c7f9_BBC (1).png', alt: 'BBC' },
  { src: '/logolar 2/nyt-logo.png', alt: 'New York Times' },
]

function Logolar2Strip() {
  return (
    <div className="logolar2-strip">
      <div className="logolar2-inner">
        {[...logolar2List, ...logolar2List].map((logo, i) => (
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
  const t = useLang()
  return (
    <div className="uni-logos-section">
      <div className="uni-logos-header">
        <p className="uni-logos-subtitle">{t.graduatesTitle}</p>
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
  const t = useLang()
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span>{t.academicYear}</span>
        <span>{t.engPublishOfficial}</span>
        <span>{t.internationalCurriculum}</span>
      </div>
      <div className="top-bar-right">
        <a href="mailto:info@engpublish.com" className="top-bar-contact">info@engpublish.com</a>
      </div>
    </div>
  )
}

/* ─── Deadline Banner ─────────────────────────────── */
function DeadlineBanner() {
  const t = useLang()
  return (
    <div className="deadline-banner">
      <div className="deadline-banner-inner">
        <span className="deadline-badge">{t.orderDeadline}</span>
        <span className="deadline-text">
          {t.deadlineText} <strong>{t.deadlineDate}</strong> {t.deadlineSuffix}
        </span>
        <span className="deadline-sep" />
        <span className="deadline-lang">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
          </svg>
          {t.foreignLang}
        </span>
      </div>
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────── */
function Nav({ lang, setLang }) {
  const t = useLang()
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div>
            <div className="nav-logo-text">ENG Publish</div>
            <div className="nav-logo-sub">{t.schoolResourcePacks}</div>
          </div>
        </a>
        <div className="nav-right">
          <span className="year-indicator">2026 – 2027</span>
          <div className="lang-switcher">
            <button
              className={`lang-btn${lang === 'tr' ? ' lang-btn-active' : ''}`}
              onClick={() => setLang('tr')}
            >TR</button>
            <button
              className={`lang-btn${lang === 'en' ? ' lang-btn-active' : ''}`}
              onClick={() => setLang('en')}
            >EN</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

/* ─── Hero / Form ─────────────────────────────────── */
const premiumSchoolsByCountry = {
  'United Kingdom': ['Eton College', 'Harrow School', 'Winchester College', 'Rugby School', 'Marlborough College'],
  'Germany': ['Salem International College', 'Strothoff International School', 'Metropolitan School Frankfurt'],
  'France': ['Lycée International de Saint-Germain-en-Laye', 'American School of Paris', 'Collège International de Lyon'],
  'Netherlands': ['Amsterdam International Community School', 'International School Haarlem', 'Rotterdam International Secondary School'],
  'Sweden': ['International School of Stockholm', 'Viktor Rydberg Gymnasium', 'Interskolan Stockholm'],
  'Switzerland': ['Institut Le Rosey', 'Brillantmont International School', 'Leysin American School in Switzerland'],
  'Norway': ['Oslo International School', 'Nansen International School', 'Oslo Katedralskole'],
  'Denmark': ['Copenhagen International School', 'Rygaards International School', 'Birkerød Gymnasium'],
  'Finland': ['International School of Helsinki', 'Tampere International School', 'Espoo International School'],
  'Austria': ['Vienna International School', 'American International School Vienna', 'Sir Karl Popper Schule'],
  'Belgium': ['International School of Brussels', "St. John's International School", 'European School Brussels'],
}

function HeroSection({ onSubmit }) {
  const t = useLang()
  const [form, setForm] = useState({
    parentFirst: '', parentLast: '', studentFirst: '', studentLast: '', country: '', campus: '', school: ''
  })
  const [errors, setErrors] = useState({})

  const isTurkey = form.country === 'Türkiye'
  const isOtherCountry = form.country && !isTurkey

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => {
      const updated = { ...f, [name]: value }
      // Reset campus/school when country changes
      if (name === 'country' && value !== 'Türkiye') updated.campus = ''
      if (name === 'country') updated.school = ''
      return updated
    })
    if (errors[name]) setErrors(ev => ({ ...ev, [name]: '' }))
    if (name === 'country') setErrors(ev => ({ ...ev, country: '', campus: '', countryNotAvailable: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.parentFirst.trim())   errs.parentFirst   = t.required
    if (!form.parentLast.trim())    errs.parentLast    = t.required
    if (!form.studentFirst.trim())  errs.studentFirst  = t.required
    if (!form.studentLast.trim())   errs.studentLast   = t.required
    if (!form.country)              errs.country       = t.countryRequired
    if (isOtherCountry)             errs.countryNotAvailable = t.countryNotAvailable
    if (isTurkey && !form.campus)   errs.campus        = t.required
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
        <div className="fade-up">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t.nowOpenForOrders}
          </div>
          <h1 className="hero-title">
            {t.heroTitle1}<br />
            <em>{t.heroTitle2}</em><br />
            {t.heroTitle3}
          </h1>
          <p className="hero-desc">{t.heroDesc}</p>
        </div>

        <div className="form-card fade-up stagger-2">
          <h3 className="form-card-title">{t.getStarted}</h3>
          <p className="form-card-sub">{t.formSub}</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section-label">{t.parentGuardian}</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.firstName}</label>
                <input className="form-input" name="parentFirst" value={form.parentFirst} onChange={handleChange} placeholder={t.firstNamePlaceholder} style={errors.parentFirst ? { borderColor: '#E53E3E' } : {}} />
                {errors.parentFirst && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.parentFirst}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t.lastName}</label>
                <input className="form-input" name="parentLast" value={form.parentLast} onChange={handleChange} placeholder={t.lastNamePlaceholder} style={errors.parentLast ? { borderColor: '#E53E3E' } : {}} />
                {errors.parentLast && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.parentLast}</span>}
              </div>
            </div>
            <div className="form-divider" />
            <div className="form-section-label">{t.student}</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t.studentFirstName}</label>
                <input className="form-input" name="studentFirst" value={form.studentFirst} onChange={handleChange} placeholder={t.studentFirstPlaceholder} style={errors.studentFirst ? { borderColor: '#E53E3E' } : {}} />
                {errors.studentFirst && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.studentFirst}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t.studentLastName}</label>
                <input className="form-input" name="studentLast" value={form.studentLast} onChange={handleChange} placeholder={t.studentLastPlaceholder} style={errors.studentLast ? { borderColor: '#E53E3E' } : {}} />
                {errors.studentLast && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.studentLast}</span>}
              </div>
            </div>
            <div className="form-divider" />
            <div className="form-section-label">{t.country}</div>
            <div className="form-group">
              <label className="form-label">{t.selectCountry}</label>
              <select className="form-input form-select" name="country" value={form.country} onChange={handleChange} style={errors.country || errors.countryNotAvailable ? { borderColor: '#E53E3E' } : {}}>
                <option value="">{t.selectCountryOption}</option>
                <option value="Türkiye">Türkiye</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Finland">Finland</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
              </select>
              {errors.country && !errors.countryNotAvailable && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.country}</span>}
              {errors.countryNotAvailable && (
                <div className="country-unavailable-msg">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>{errors.countryNotAvailable}</span>
                </div>
              )}
            </div>
            {isOtherCountry && premiumSchoolsByCountry[form.country] && (
              <>
                <div className="form-section-label">Premium Schools</div>
                <div className="form-group">
                  <label className="form-label">Select School</label>
                  <select className="form-input form-select" name="school" value={form.school} onChange={handleChange}>
                    <option value="">— Select school —</option>
                    {premiumSchoolsByCountry[form.country].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {isTurkey && (
              <>
                <div className="form-section-label">{t.campus}</div>
                <div className="form-group">
                  <label className="form-label">{t.selectCampus}</label>
                  <select className="form-input form-select" name="campus" value={form.campus} onChange={handleChange} style={errors.campus ? { borderColor: '#E53E3E' } : {}}>
                    <option value="">{t.selectCampusOption}</option>
                    <option value="Bahçeşehir Garden Campus">Bahçeşehir Garden Campus</option>
                    <option value="Çamlıca Hill Campus">Çamlıca Hill Campus</option>
                    <option value="Zekeriyaköy Hill Side Campus">Zekeriyaköy Hill Side Campus</option>
                    <option value="Alkent Village Campus">Alkent Village Campus</option>
                  </select>
                  {errors.campus && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.campus}</span>}
                </div>
              </>
            )}
            <button type="submit" className="btn-primary">
              {t.continueToClass}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ─── Student Info Bar ────────────────────────────── */
function StudentBar({ formData, onEdit }) {
  const t = useLang()
  return (
    <div className="student-bar">
      <div className="student-bar-inner">
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">{t.parent}</div>
            <div>{formData.parentFirst} {formData.parentLast}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}><path d="M5 12h14"/></svg>
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">{t.student}</div>
            <div>{formData.studentFirst} {formData.studentLast}</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', flexShrink: 0 }}><path d="M5 12h14"/></svg>
        <div className="student-bar-chip">
          <div>
            <div className="student-bar-chip-label">{t.campus}</div>
            <div>{formData.campus}</div>
          </div>
        </div>
        <button className="student-bar-edit" onClick={onEdit}>{t.editDetails}</button>
      </div>
    </div>
  )
}

/* ─── Class Selection ─────────────────────────────── */
function ClassSelection({ formData, onSelect, onBack }) {
  const t = useLang()
  return (
    <section className="section class-selection-section">
      <div className="container">
        <div className="class-selection-header fade-up">
          <div className="class-selection-step">{t.step2of2}</div>
          <h2 className="class-selection-title">{t.selectYearGroup}</h2>
          <p className="class-selection-desc">{t.selectYearGroupDesc}</p>
        </div>
        <div className="class-list fade-up stagger-2">
          {packs.map((pack) => {
            const count = totalResourceCount(pack)
            return (
              <div key={pack.id} className="class-list-item" onClick={() => onSelect(pack.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onSelect(pack.id)}>
                <div className="class-list-bar" />
                <div className="class-list-body">
                  <span className="class-list-pill">{pack.label}</span>
                  <div className="class-list-name">{pack.name}</div>
                  <div className="class-list-sub">{pack.subtitle}</div>
                </div>
                <div className="class-list-meta">
                  <span className="class-list-count">{count} {t.resources}</span>
                  <div className="class-list-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <button className="btn-secondary" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {t.backToForm}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Resource Group ──────────────────────────────── */
function ResourceGroup({ group, index }) {
  const t = useLang()
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        <span className="resource-group-name" style={{ color }}>{group.group}</span>
        <span className="resource-group-badge">{totalItems} {t.items}</span>
      </div>
      <table className="resource-table">
        <thead><tr><th>{t.lessonSubject}</th><th>{t.resource}</th></tr></thead>
        <tbody>
          {group.items.map((item, j) => (
            <tr key={j}>
              <td><span className="lesson-name">{item.lesson}</span></td>
              <td>
                <ul className="resource-list">
                  {item.resources.map((r, k) => (
                    <li key={k} className={`resource-item${r === 'During The Year' ? ' during' : ''}`}>{r}</li>
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

/* ─── Letter from School Management ─────────────────────────── */
function LetterSection({ packId }) {
  const t = useLang()
  return (
    <div className="letter-section fade-up">
      <div className="letter-toggle" style={{ cursor: 'default' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>{t.letterToggleTitle}</span>
      </div>
      <div className="letter-body">
        <p className="letter-greeting"><strong>{t.letterGreeting}</strong></p>
        <p>{t.letterP1}</p>
        <p>{t.letterP2}</p>
        <p>{t.letterP3}</p>
        <p>{t.letterP4}</p>
        <ul className="letter-list">
          {t.letterList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <p>{t.letterP5}</p>
        <p>{t.letterP6}</p>
        <p className="letter-sign"><em>{t.letterSign.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</em></p>
      </div>
    </div>
  )
}

/* ─── Class Pack Information ─────────────────────────────────── */
function ClassPackInfo({ packId }) {
  const t = useLang()
  const isYear = packId.startsWith('year-') || packId === 'prep'
  const baseItems = [
    { title: t.classPackCoding,      desc: t.classPackCodingDesc },
    { title: t.classPackIDP,         desc: t.classPackIDPDesc },
    { title: t.classPackAssessment,  desc: t.classPackAssessmentDesc },
    { title: t.classPackStudentDev,  desc: t.classPackStudentDevDesc },
    { title: t.classPackAudit,       desc: t.classPackAuditDesc },
    { title: t.classPackCognitive,   desc: t.classPackCognitiveDesc },
  ]
  const turkishItem  = { title: t.classPackTurkish,    desc: t.classPackTurkishDesc }
  const salfordItem  = { title: t.classPackSalford,    desc: t.classPackSalfordDesc }
  const items = isYear ? [...baseItems, turkishItem, salfordItem] : baseItems
  return (
    <div className="class-pack-info fade-up">
      <div className="class-pack-info-header">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <div>
          <span className="class-pack-info-title">{t.classPackInfoTitle}</span>
          <p className="class-pack-info-sub">{t.classPackInfoSub}</p>
        </div>
      </div>
      <div className="class-pack-info-items">
        {items.map((item, i) => (
          <div key={i} className="class-pack-info-item">
            <div className="class-pack-info-item-title">{item.title}</div>
            <div className="class-pack-info-item-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <div className="class-pack-info-proref">
        <div className="proref-inner">
          <img src="/proref/proref-logo-text.png" alt="Pro/Ref" className="proref-logo" />
          <div className="proref-content">
            <div className="proref-label">{t.prorefLabel}</div>
            <p className="proref-desc">{t.prorefDesc}</p>
            <a href="https://proref360.com" target="_blank" rel="noopener noreferrer" className="proref-link">
              {t.prorefLink}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Payment Modal ─────────────────────────────────────────── */
function PaymentModal({ pack, formData, onClose }) {
  const t = useLang()
  const [contact, setContact] = useState({ email: '', phone: '', note: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setContact(c => ({ ...c, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!contact.email.trim()) errs.email = t.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = t.invalidEmail
    if (!contact.phone.trim()) errs.phone = t.required
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    setSendError('')

    const month = new Date().getMonth()
    const pricePeriod = month < 7 ? 'Temmuz' : month === 7 ? 'Ağustos' : 'Eylül'
    const priceMap = {
      'eyfs-junior': { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
      'eyfs-1':      { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
      'eyfs-2':      { temmuz: '₺75.739,70', agustos: '₺79.726,00', eylul: '₺87.698,60' },
      'year-1':      { temmuz: '₺89.794,50', agustos: '₺92.787,65', eylul: '₺102.066,42' },
      'year-2':      { temmuz: '₺80.392,50', agustos: '₺83.072,25', eylul: '₺91.379,48' },
      'year-3':      { temmuz: '₺81.019,50', agustos: '₺83.720,15', eylul: '₺92.092,17' },
      'year-4':      { temmuz: '₺90.721,50', agustos: '₺93.745,55', eylul: '₺103.120,11' },
      'year-5':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
      'year-6':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
      'year-7':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
      'year-8':      { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
      'prep':        { temmuz: '₺95.340,00', agustos: '₺98.518,00', eylul: '₺108.369,80' },
    }
    const p = priceMap[pack.id]
    const priceStr = p ? `${month < 7 ? p.temmuz : month === 7 ? p.agustos : p.eylul} (${pricePeriod})` : 'N/A'

    const payload = {
      pack_name:    pack.name,
      pack_id:      pack.id,
      price:        priceStr,
      parent_name:  `${formData.parentFirst} ${formData.parentLast}`,
      student_name: `${formData.studentFirst} ${formData.studentLast}`,
      country:      formData.country || '—',
      campus:       formData.campus  || formData.school || '—',
      from_email:   contact.email,
      phone:        contact.phone,
      note:         contact.note || '—',
      order_date:   new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    }

    // Dev ortamında PHP yok — sadece UI akışını test et
    if (import.meta.env.DEV) {
      console.log('[DEV] Form payload:', payload)
      setTimeout(() => { setSending(false); setSubmitted(true) }, 800)
      return
    }

    fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(r => r.text())
      .then(text => {
        setSending(false)
        try {
          const res = JSON.parse(text)
          if (res.ok) setSubmitted(true)
          else setSendError('Gönderim hatası. Lütfen info@engpublish.com ile iletişime geçin.')
        } catch {
          // PHP hata çıktısı var — mail yine de gönderilmiş olabilir
          console.error('PHP response:', text)
          setSendError('Gönderim hatası. Lütfen info@engpublish.com ile iletişime geçin.')
        }
      })
      .catch(() => {
        setSending(false)
        setSendError('Gönderim hatası. Lütfen info@engpublish.com ile iletişime geçin.')
      })
  }

  return (
    <>
      <div className="modal-overlay" onClick={submitted ? onClose : undefined} />
      <div className="modal" role="dialog" aria-modal="true">
        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-check">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="modal-success-title">{t.thankYou}</h2>
            <p className="modal-success-desc">{t.paymentUnderReview}</p>
            <p className="modal-success-tr">{t.paymentUnderReviewTR}</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: 20 }}>{t.close}</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{pack.name} — {t.orderDetails}</h2>
              <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
            </div>

            <PricingBox packId={pack.id} />

            <div className="modal-payment-box">
              <div className="modal-payment-row">
                <span className="modal-payment-label">{t.accountHolder}</span>
                <span className="modal-payment-value">ENG Eğitim Hizmetleri Ticaret Limited Şirketi</span>
              </div>
              <div className="modal-payment-row">
                <span className="modal-payment-label">{t.bank}</span>
                <span className="modal-payment-value">Vakıfbank</span>
              </div>
              <div className="modal-payment-row">
                <span className="modal-payment-label">{t.iban}</span>
                <span className="modal-payment-value">TR84 0001 5001 5800 7390 9344 79</span>
              </div>
              <div className="modal-payment-row">
                <span className="modal-payment-label">{t.paymentReference}</span>
                <span className="modal-payment-value">{formData.studentFirst} {formData.studentLast}</span>
              </div>
            </div>

            <div className="modal-digital-payment-notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
              <span>{t.digitalPaymentNotice}</span>
            </div>

            <p className="modal-desc">{t.modalPaymentDesc}</p>

            <form className="modal-contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">{t.emailAddress}</label>
                <input className="form-input" type="email" name="email" value={contact.email} onChange={handleChange} placeholder="your@email.com" style={errors.email ? { borderColor: '#E53E3E' } : {}} />
                {errors.email && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t.phoneNumber}</label>
                <input className="form-input" type="tel" name="phone" value={contact.phone} onChange={handleChange} placeholder="+90 5xx xxx xx xx" style={errors.phone ? { borderColor: '#E53E3E' } : {}} />
                {errors.phone && <span style={{ fontSize: 11, color: '#E53E3E' }}>{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t.note} <span className="label-optional">{t.optional}</span></label>
                <textarea className="form-input" name="note" value={contact.note} onChange={handleChange} placeholder={t.notePlaceholder} rows={3} style={{ resize: 'vertical' }} />
              </div>
              {sendError && (
                <div style={{ fontSize: 12, color: '#C53030', background: '#FFF5F5', border: '1px solid #FC8181', borderRadius: 6, padding: '8px 12px', marginBottom: 4 }}>
                  {sendError}
                </div>
              )}
              <button type="submit" className="btn-primary modal-submit" disabled={sending}>
                {sending
                  ? <span style={{ opacity: 0.7 }}>Gönderiliyor…</span>
                  : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{t.submitOrder}</>
                }
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

/* ─── Pack Detail ─────────────────────────────────────────── */
function PackDetail({ packId, formData, onBack }) {
  const t = useLang()
  const [showModal, setShowModal] = useState(false)
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
        <div className="breadcrumb fade-up" style={{ paddingTop: 20 }}>
          <span className="breadcrumb-item" onClick={() => onBack('classes')}>{t.allClasses}</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{pack.name} {t.resourcePack}</span>
        </div>
        <div style={{ paddingTop: 24 }}>
          <div className="pack-detail">
            <div className="pack-header fade-up">
              <div className="pack-header-left">
                <div className="pack-icon-lg" style={{ background: 'rgba(27,61,42,0.08)', color: 'var(--navy)' }}>
                  <span className="pack-icon-initials">{pack.label}</span>
                </div>
                <div className="pack-title-block">
                  <div className="pack-tag" style={{ color: 'var(--navy-soft)' }}>{t.academicYearLabel}</div>
                  <h1 className="pack-header-title">{pack.name} {t.resourcePack}</h1>
                  <div className="pack-header-sub">{pack.subtitle} · {count} {t.resourcesAcross} {pack.groups.length} {t.categories}</div>
                </div>
              </div>
              <button className="btn-buynow" onClick={() => setShowModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                {t.buyNow}
              </button>
            </div>

            <LetterSection packId={packId} />

            {pack.note && (
              <div className="pack-note-box fade-up">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>{pack.note}</span>
              </div>
            )}

            {pack.groups.map((group, i) => (
              <ResourceGroup key={i} group={group} index={i} />
            ))}

            <ClassPackInfo packId={packId} />

            <div className="pack-payment-section fade-up">
              <div className="pack-payment-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <span className="pack-payment-title">{t.paymentDetails}</span>
              </div>
              <p className="pack-payment-desc">
                {t.paymentDesc} <strong>{t.deadlineDate}</strong>{t.paymentDescMid}
              </p>

              <PricingBox packId={packId} />

              <div className="pack-payment-grid">
                <div className="pack-payment-field">
                  <span className="pack-payment-label">{t.accountHolder}</span>
                  <span className="pack-payment-value">ENG Eğitim Hizmetleri Ticaret Limited Şirketi</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">{t.bank}</span>
                  <span className="pack-payment-value">Vakıfbank</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">{t.iban}</span>
                  <span className="pack-payment-value">TR84 0001 5001 5800 7390 9344 79</span>
                </div>
                <div className="pack-payment-field">
                  <span className="pack-payment-label">{t.paymentReference}</span>
                  <span className="pack-payment-value">{formData.studentFirst} {formData.studentLast}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24, flexWrap: 'wrap' }} className="fade-up">
              <button className="btn-buynow" onClick={() => setShowModal(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                {t.buyNow}
              </button>
              <button className="btn-secondary" onClick={() => onBack('classes')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                {t.backToAllClasses}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <PaymentModal pack={pack} formData={formData} onClose={() => setShowModal(false)} />}
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────── */
function Footer({ onNavigate }) {
  const t = useLang()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-text">ENG Publish</div>
          <p className="footer-desc">{t.footerDesc}</p>
          <div className="footer-contact-list">
            <a href="mailto:info@engpublish.com" className="footer-contact-link">info@engpublish.com</a>
          </div>
        </div>
        <div>
          <div className="footer-col-title">{t.orderDeadlineFooter}</div>
          <div className="footer-deadline">
            <div className="footer-deadline-label">2026–2027 Academic Year</div>
            <div className="footer-deadline-date">20 July 2026</div>
            <div className="footer-deadline-sub">{t.foreignLangFooter}</div>
          </div>
        </div>
      </div>
      <div className="footer-legal-links">
        <button onClick={() => onNavigate('mesafeli-satis')} className="footer-legal-link">
          {t.mesafeliSatis || 'Mesafeli Satış Sözleşmesi'}
        </button>
        <span className="footer-legal-sep">|</span>
        <button onClick={() => onNavigate('kvkk')} className="footer-legal-link">
          {t.kvkk || 'KVKK Aydınlatma Metni'}
        </button>
        <span className="footer-legal-sep">|</span>
        <button onClick={() => onNavigate('gizlilik')} className="footer-legal-link">
          {t.gizlilik || 'Gizlilik ve Güvenlik'}
        </button>
        <span className="footer-legal-sep">|</span>
        <button onClick={() => onNavigate('iptal-iade')} className="footer-legal-link">
          {t.iptalIade || 'İptal ve İade'}
        </button>
        <span className="footer-legal-sep">|</span>
        <button onClick={() => onNavigate('teslimat')} className="footer-legal-link">
          {t.teslimat || 'Teslimat Koşulları'}
        </button>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">{t.allRightsReserved}</span>
        <span className="footer-copy">{t.footerSub}</span>
      </div>
    </footer>
  )
}

/* ─── App (root) ──────────────────────────────────── */
export default function App() {
  const [step, setStep] = useState('form')
  const [formData, setFormData] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [lang, setLang] = useState('en')

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

  function handleNavigate(page) {
    setStep(page)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  // Render legal pages
  if (step === 'mesafeli-satis') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <MesafeliSatisSozlesmesi />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'kvkk') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <KVKKAydinlatma />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'gizlilik') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <GizlilikPolitikasi />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'iptal-iade') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <IptalIadeKosullari />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'teslimat') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <TeslimatKargoKosullari />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  // Payment pages
  if (step === 'odeme') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <PaymentPage />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'odeme-dogrulama') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <SecureVerification />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'odeme-basarili') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <OrderSuccess />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  if (step === 'odeme-basarisiz') {
    return (
      <LangContext.Provider value={lang}>
        <div>
          <div className="top-compact">
            <TopBar />
            <DeadlineBanner />
          </div>
          <Nav lang={lang} setLang={setLang} />
          <PaymentFailed />
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <button className="btn-secondary" onClick={() => handleBack('form')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Ana Sayfaya Dön
            </button>
          </div>
          <ParallaxStrip />
          <Footer onNavigate={handleNavigate} />
        </div>
      </LangContext.Provider>
    )
  }

  return (
    <LangContext.Provider value={lang}>
      <div>
        <div className={step === 'pack' ? 'top-compact' : ''}>
          <TopBar />
          <DeadlineBanner />
        </div>
        <Nav lang={lang} setLang={setLang} />
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
          <ClassSelection formData={formData} onSelect={handleClassSelect} onBack={() => handleBack('form')} />
        )}

        {step === 'pack' && selectedClass && formData && (
          <PackDetail packId={selectedClass} formData={formData} cart={cart} onAddToCart={handleAddToCart} onBack={handleBack} />
        )}

        <ParallaxStrip />
        <Footer onNavigate={handleNavigate} />
      </div>
    </LangContext.Provider>
  )
}
