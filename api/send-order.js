import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // CORS
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

  const text = `
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

  try {
    await transporter.sendMail({
      from: '"ENG Publish" <info@engpublish.com>',
      to: 'info@engpublish.com',
      replyTo: from_email,
      subject: `Yeni Sipariş: ${pack_name} — ${student_name}`,
      text,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    return res.status(500).json({ ok: false, error: err.message })
  }
}
