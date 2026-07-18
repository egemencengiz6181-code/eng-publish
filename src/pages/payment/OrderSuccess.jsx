export default function OrderSuccess() {
  return (
    <div className="payment-page">
      <div className="container" style={{ maxWidth: 600, paddingTop: 80, paddingBottom: 80 }}>
        <div className="payment-card">
          <div className="success-animation">
            <div className="success-checkmark">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" style={{ stroke: '#10B981' }}/>
                <polyline points="9 12 11 14 15 10" style={{ stroke: '#10B981' }}/>
              </svg>
            </div>
          </div>

          <div className="success-content">
            <h1>Siparişiniz Alındı!</h1>
            <p className="success-subtitle">
              Ödemeniz başarıyla tamamlandı. Sipariş detaylarınız e-posta adresinize gönderildi.
            </p>

            <div className="order-details-box">
              <div className="order-detail-row">
                <span>Sipariş No</span>
                <strong>#ENG-2026-0001</strong>
              </div>
              <div className="order-detail-row">
                <span>Tarih</span>
                <strong>17 Temmuz 2026</strong>
              </div>
              <div className="order-detail-row">
                <span>Tutar</span>
                <strong>₺95.340,00</strong>
              </div>
            </div>

            <div className="next-steps">
              <h3>Sıradaki Adımlar</h3>
              <ul>
                <li>Sipariş detayları e-posta ile gönderildi</li>
                <li>Teslimat bilgileri ayrıca bildirilecektir</li>
                <li>Ürünleriniz kurumumuzdan teslim alınacaktır</li>
              </ul>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: 30 }}>
              Ana Sayfaya Dön
            </button>
          </div>

          <div className="support-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>Sorularınız için: <strong>info@engpublish.com</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
