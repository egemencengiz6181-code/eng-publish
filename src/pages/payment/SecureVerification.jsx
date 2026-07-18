export default function SecureVerification() {
  return (
    <div className="payment-page">
      <div className="container" style={{ maxWidth: 600, paddingTop: 80, paddingBottom: 80 }}>
        <div className="payment-card">
          <div className="secure-header">
            <div className="secure-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1>3D Secure Doğrulama</h1>
            <p>Güvenli ödeme için bankanız tarafından gönderilen doğrulama kodunu giriniz.</p>
          </div>

          <div className="verification-box">
            <div className="bank-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <span>Bankanız: <strong>****1234</strong></span>
            </div>

            <div className="form-group" style={{ marginTop: 30 }}>
              <label>SMS veya E-posta ile gelen kod</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="6 haneli kod" 
                maxLength="6"
                style={{ textAlign: 'center', fontSize: 20, letterSpacing: 4 }}
              />
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: 20 }}>
              Doğrula ve Devam Et
            </button>

            <button className="btn-secondary" style={{ width: '100%', marginTop: 10 }}>
              İptal
            </button>

            <div className="verification-timer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Kalan süre: <strong>2:45</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
