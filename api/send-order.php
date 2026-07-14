<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['ok' => false, 'error' => 'Method not allowed']));
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
    http_response_code(400);
    exit(json_encode(['ok' => false, 'error' => 'Invalid JSON']));
}

function clean($v) {
    return htmlspecialchars(strip_tags(trim((string)$v)), ENT_QUOTES, 'UTF-8');
}

$packName    = clean($data['pack_name']    ?? '');
$packId      = clean($data['pack_id']      ?? '');
$price       = clean($data['price']        ?? '');
$parentName  = clean($data['parent_name']  ?? '');
$studentName = clean($data['student_name'] ?? '');
$country     = clean($data['country']      ?? '');
$campus      = clean($data['campus']       ?? '');
$fromEmail   = clean($data['from_email']   ?? '');
$phone       = clean($data['phone']        ?? '');
$note        = clean($data['note']         ?? '—');
$orderDate   = clean($data['order_date']   ?? date('d.m.Y H:i'));

if (empty($fromEmail) || empty($studentName)) {
    http_response_code(400);
    exit(json_encode(['ok' => false, 'error' => 'Missing required fields']));
}

$to      = 'info@engpublish.com';
$subject = "=?UTF-8?B?" . base64_encode("Yeni Sipariş: {$packName} — {$studentName}") . "?=";

$body  = "YENİ SİPARİŞ — ENG Publish\n";
$body .= str_repeat("=", 40) . "\n\n";
$body .= "Paket       : {$packName} ({$packId})\n";
$body .= "Fiyat       : {$price}\n\n";
$body .= "Veli        : {$parentName}\n";
$body .= "Öğrenci     : {$studentName}\n";
$body .= "Ülke        : {$country}\n";
$body .= "Kampüs/Okul : {$campus}\n\n";
$body .= "E-posta     : {$fromEmail}\n";
$body .= "Telefon     : {$phone}\n";
$body .= "Not         : {$note}\n\n";
$body .= "Sipariş Tar.: {$orderDate}\n";
$body .= str_repeat("=", 40) . "\n";
$body .= "Bu e-posta engpublish.com sipariş formu tarafından otomatik gönderilmiştir.\n";

$headers  = "From: ENG Publish Orders <info@engpublish.com>\r\n";
$headers .= "Reply-To: {$fromEmail}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$ok = mail($to, $subject, $body, $headers);

echo json_encode(['ok' => $ok]);
