export default function PaymentPage() {
  return (
    <div className="payment-page">
      <div className="container" style={{ maxWidth: 800, paddingTop: 80, paddingBottom: 80 }}>
        <div className="payment-card">
          {/* Ödeme Bilgilendirme Mesajı */}
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            border: '1.5px solid #dee2e6',
            borderRadius: '12px',
            padding: '24px 28px',
            marginBottom: '32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1B3D2A',
              marginBottom: '14px',
              fontFamily: 'var(--font-serif)'
            }}>
              Değerli Velilerimiz,
            </div>
            <div style={{
              fontSize: '14.5px',
              lineHeight: '1.7',
              color: '#2d3748',
              marginBottom: '14px'
            }}>
              2026–2027 eğitim öğretim yılında kullanılacak kaynak kitaplar ve dijital içeriklerle ilgili olarak, 
              ENG Publish ile yapılan görüşmelerde, ENG Publish velilerimize aşağıdaki ödeme seçeneklerini 
              sunacağını beyan etmiştir:
            </div>
            <ul style={{
              fontSize: '14.5px',
              lineHeight: '1.8',
              color: '#2d3748',
              paddingLeft: '20px',
              marginBottom: '14px'
            }}>
              <li style={{ marginBottom: '8px' }}>
                Peşin veya havale/EFT ödemelerinde <strong>%10 indirim</strong> uygulanacaktır.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Mevcut rakamlar üzerinden <strong>4 taksite kadar</strong> ödeme yapılabilecektir.
              </li>
              <li>
                6 taksit seçeneğinde ise <strong>%10 fiyat farkı</strong> uygulanacaktır.
              </li>
            </ul>
            <div style={{
              fontSize: '14px',
              color: '#495057',
              fontStyle: 'italic',
              marginTop: '12px'
            }}>
              Bilgilerinize sunarız.
            </div>
          </div>

          <div className="payment-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <h1>Ödeme Sayfası</h1>
          </div>

          <div className="payment-form">
            <div className="form-section">
              <h3>Kart Bilgileri</h3>
              <div className="form-group">
                <label>Kart Üzerindeki İsim</label>
                <input type="text" className="form-input" placeholder="Ad Soyad" />
              </div>
              <div className="form-group">
                <label>Kart Numarası</label>
                <input type="text" className="form-input" placeholder="1234 5678 9012 3456" maxLength="19" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Son Kullanma Tarihi</label>
                  <input type="text" className="form-input" placeholder="AA/YY" maxLength="5" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" className="form-input" placeholder="123" maxLength="3" />
                </div>
              </div>
            </div>

            <div className="payment-summary">
              <h3>Sipariş Özeti</h3>
              <div className="summary-line">
                <span>Paket</span>
                <span>—</span>
              </div>
              <div className="summary-line total">
                <span>Toplam</span>
                <span>—</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: 20 }}>
              Ödemeyi Tamamla
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <div className="payment-security-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Ödemeniz 256-bit SSL ile şifrelenmektedir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
