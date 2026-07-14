import nodemailer from 'nodemailer'

const SMTP = {
  host: 'mt-valve.guzelhosting.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@engpublish.com',
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 7000,
  socketTimeout: 7000,
  greetingTimeout: 7000,
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false })

  const {
    pack_name, pack_id, price,
    parent_name, student_name,
    country, campus,
    from_email, phone, note, order_date,
  } = req.body ?? {}

  if (!from_email || !student_name) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }

  // ── Internal notification to info@engpublish.com ─────────────
  const internalText = `
YENİ SİPARİŞ — ENG Publish
============================================
Paket       : ${pack_name} (${pack_id})
Fiyat       : ${price}

Veli        : ${parent_name}
Öğrenci     : ${student_name}
Ülke        : ${country}
Kampüs/Okul : ${campus}

E-posta     : ${from_email}
Telefon     : ${phone}
Not         : ${note || '—'}

Sipariş Tar.: ${order_date}
============================================`.trim()

  try {
    const t1 = nodemailer.createTransport(SMTP)
    await t1.sendMail({
      from: '"ENG Publish" <info@engpublish.com>',
      to:   'info@engpublish.com',
      replyTo: from_email,
      subject: `Yeni Sipariş: ${pack_name} — ${student_name}`,
      text: internalText,
    })
  } catch (err) {
    console.error('Internal mail failed:', err.message)
    return res.status(500).json({ ok: false, error: 'mail_failed' })
  }

  // ── Return success to user immediately ───────────────────────
  res.status(200).json({ ok: true })

  // ── Auto-responder HTML to customer (best-effort, after response) ─
  const autoHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Başvurunuz Alındı</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <tr>
        <td style="background:#1B3D2A;padding:36px 40px 28px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);">ENG Publish · 2026–2027</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Başvurunuz Alındı ✓</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:32px 40px 12px;text-align:center;">
          <p style="margin:0 0 10px;font-size:18px;font-weight:600;color:#1B3D2A;">Sayın ${parent_name},</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4a5568;">
            <strong>${student_name}</strong> için <strong>${pack_name}</strong> kaynak paketi<br/>
            başvurunuz başarıyla alınmıştır.<br/><br/>
            <strong>En kısa sürede sizinle iletişime geçeceğiz.</strong>
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 40px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faf9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#718096;">Sipariş Özeti</span>
            </td></tr>
            <tr><td style="padding:16px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;width:42%;">Paket</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${pack_name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;">Fiyat</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${price}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;">Öğrenci</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${student_name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;">Kampüs</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;">${campus}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:0 40px 32px;text-align:center;">
          <p style="margin:0;font-size:13.5px;line-height:1.7;color:#718096;">
            Sorularınız için <a href="mailto:info@engpublish.com" style="color:#1B3D2A;font-weight:600;text-decoration:none;">info@engpublish.com</a> adresine yazabilirsiniz.
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f8faf9;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#a0aec0;">
            © 2026 ENG Publish · 2026–2027 Akademik Yılı Kaynak Paketleri<br/>
            Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

  const autoText = `Sayın ${parent_name},\n\n${student_name} için ${pack_name} başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.\n\nSipariş özeti:\nPaket: ${pack_name}\nFiyat: ${price}\nÖğrenci: ${student_name}\nKampüs: ${campus}\n\nSorular için: info@engpublish.com\n\nENG Publish`

  try {
    const t2 = nodemailer.createTransport(SMTP)
    await t2.sendMail({
      from:    '"ENG Publish" <info@engpublish.com>',
      to:      from_email,
      subject: `Başvurunuz Alındı — ${pack_name}`,
      text:    autoText,
      html:    autoHtml,
    })
    console.log('Auto-responder sent to', from_email)
  } catch (err) {
    console.error('Auto-responder failed (non-critical):', err.message)
  }
}

  const {
    pack_name, pack_id, price,
    parent_name, student_name,
    country, campus,
    from_email, phone, note, order_date,
  } = req.body ?? {}

  if (!from_email || !student_name) {
    return res.status(400).json({ ok: false, error: 'Missing fields' })
  }

  const transporter = nodemailer.createTransport({
    host: 'mt-valve.guzelhosting.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@engpublish.com',
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })

  // ── 1) Internal order notification ──────────────────────────
  const internalText = `
YENİ SİPARİŞ — ENG Publish
============================================

Paket       : ${pack_name} (${pack_id})
Fiyat       : ${price}

Veli        : ${parent_name}
Öğrenci     : ${student_name}
Ülke        : ${country}
Kampüs/Okul : ${campus}

E-posta     : ${from_email}
Telefon     : ${phone}
Not         : ${note || '—'}

Sipariş Tar.: ${order_date}
============================================
  `.trim()

  // ── 2) Auto-responder HTML to the customer ───────────────────
  const autoHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Başvurunuz Alındı</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#1B3D2A;padding:36px 40px 28px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);">ENG Publish · 2026–2027</p>
          <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Başvurunuz Alındı</h1>
        </td>
      </tr>

      <!-- Check icon -->
      <tr>
        <td align="center" style="padding:32px 40px 0;">
          <div style="width:64px;height:64px;background:#e8f5ed;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1B3D2A" stroke-width="2.5" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:24px 40px 12px;text-align:center;">
          <p style="margin:0 0 10px;font-size:18px;font-weight:600;color:#1B3D2A;">Sayın ${parent_name},</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4a5568;">
            <strong>${student_name}</strong> için <strong>${pack_name}</strong> kaynak paketi başvurunuz başarıyla alınmıştır.<br/>
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
        </td>
      </tr>

      <!-- Order summary card -->
      <tr>
        <td style="padding:0 40px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8faf9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#718096;">Sipariş Özeti</span>
            </td></tr>
            <tr><td style="padding:16px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;width:40%;">Paket</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${pack_name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;">Fiyat</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${price}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;padding-bottom:8px;">Öğrenci</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;padding-bottom:8px;">${student_name}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#718096;">Kampüs</td>
                  <td style="font-size:13px;color:#1a202c;font-weight:600;">${campus}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td>
      </tr>

      <!-- CTA note -->
      <tr>
        <td style="padding:0 40px 32px;text-align:center;">
          <p style="margin:0;font-size:13.5px;line-height:1.7;color:#718096;">
            Sorularınız için <a href="mailto:info@engpublish.com" style="color:#1B3D2A;font-weight:600;text-decoration:none;">info@engpublish.com</a> adresine yazabilirsiniz.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8faf9;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#a0aec0;">
            © 2026 ENG Publish · 2026–2027 Akademik Yılı Kaynak Paketleri<br/>
            Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`

  try {
    await Promise.all([
      // Order notification → internal
      transporter.sendMail({
        from: '"ENG Publish" <info@engpublish.com>',
        to: 'info@engpublish.com',
        replyTo: from_email,
        subject: `Yeni Sipariş: ${pack_name} — ${student_name}`,
        text: internalText,
      }),
      // Auto-responder → customer
      transporter.sendMail({
        from: '"ENG Publish" <info@engpublish.com>',
        to: from_email,
        subject: `Başvurunuz Alındı — ${pack_name}`,
        html: autoHtml,
      }),
    ])
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
