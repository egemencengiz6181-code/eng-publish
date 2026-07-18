export default function PaymentFailed() {
  return (
    <div className="payment-page">
      <div className="container" style={{ maxWidth: 600, paddingTop: 80, paddingBottom: 80 }}>
        <div className="payment-card">
          <div className="error-animation">
            <div className="error-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" style={{ stroke: '#EF4444' }}/>
                <line x1="15" y1="9" x2="9" y2="15" style={{ stroke: '#EF4444' }}/>
                <line x1="9" y1="9" x2="15" y2="15" style={{ stroke: '#EF4444' }}/>
              </svg>
            </div>
          </div>

          <div className="error-content">
            <h1>Ödeme Başarısız</h1>
            <p className="error-subtitle">
              Ödemeniz işlenirken bir sorun oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyiniz.
            </p>

            <div className="error-reasons">
              <h3>Olası Nedenler</h3>
              <ul>
                <li>Yetersiz bakiye veya limit</li>
                <li>Yanlış kart bilgileri (numara, CVV, tarih)</li>
                <li>3D Secure doğrulama başarısız</li>
                <li>Bankanız tarafından işlem reddedildi</li>
                <li>İnternet bağlantısı koptu</li>
              </ul>
            </div>

            <div className="error-actions">
              <button className="btn-primary" style={{ width: '100%' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                Tekrar Dene
              </button>
              <button className="btn-secondary" style={{ width: '100%', marginTop: 10 }}>
                Farklı Ödeme Yöntemi Seç
              </button>
            </div>
          </div>

          <div className="support-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Sorun devam ederse: <strong>info@engpublish.com</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
