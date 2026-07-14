<?php
// Suppress ALL PHP notices/warnings so JSON output is never corrupted
error_reporting(0);
ini_set('display_errors', 0);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['ok' => true]));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['ok' => false, 'error' => 'Method not allowed']));
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    exit(json_encode(['ok' => false, 'error' => 'Invalid JSON']));
}

function c($v) {
    return strip_tags(trim((string)$v));
}

$packName    = c($data['pack_name']    ?? '');
$packId      = c($data['pack_id']      ?? '');
$price       = c($data['price']        ?? '');
$parentName  = c($data['parent_name']  ?? '');
$studentName = c($data['student_name'] ?? '');
$country     = c($data['country']      ?? '');
$campus      = c($data['campus']       ?? '');
$fromEmail   = c($data['from_email']   ?? '');
$phone       = c($data['phone']        ?? '');
$note        = c($data['note']         ?? '-');
$orderDate   = c($data['order_date']   ?? date('d.m.Y H:i'));

if (empty($fromEmail) || empty($studentName)) {
    http_response_code(400);
    exit(json_encode(['ok' => false, 'error' => 'Missing required fields']));
}

$to      = 'info@engpublish.com';
$subject = '=?UTF-8?B?' . base64_encode("Yeni Siparis: {$packName} - {$studentName}") . '?=';

$body  = "YENI SIPARIS - ENG Publish\n";
$body .= str_repeat("=", 44) . "\n\n";
$body .= "Paket       : {$packName} ({$packId})\n";
$body .= "Fiyat       : {$price}\n\n";
$body .= "Veli        : {$parentName}\n";
$body .= "Ogrenci     : {$studentName}\n";
$body .= "Ulke        : {$country}\n";
$body .= "Kampus/Okul : {$campus}\n\n";
$body .= "E-posta     : {$fromEmail}\n";
$body .= "Telefon     : {$phone}\n";
$body .= "Not         : {$note}\n\n";
$body .= "Siparis Tar.: {$orderDate}\n";
$body .= str_repeat("=", 44) . "\n";

$headers  = "From: noreply@engpublish.com\r\n";
$headers .= "Reply-To: {$fromEmail}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";

$encodedBody = chunk_split(base64_encode($body));

$ok = @mail($to, $subject, $encodedBody, $headers);

if ($ok) {
    exit(json_encode(['ok' => true]));
}

// Fallback: try SMTP directly
$result = sendSmtp($to, $subject, $body, $fromEmail);
exit(json_encode(['ok' => $result]));

function sendSmtp($to, $subject, $body, $replyTo) {
    $host     = 'mt-valve.guzelhosting.com';
    $port     = 465;
    $username = 'info@engpublish.com';
    $password = 'BURAYA_EMAIL_SIFRENIZI_YAZIN';   // cPanel info@engpublish.com sifresi
    $from     = 'info@engpublish.com';

    $ctx = stream_context_create(['ssl' => [
        'verify_peer'       => false,
        'verify_peer_name'  => false,
        'allow_self_signed' => true,
    ]]);

    $sock = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$sock) return false;

    function smtp_cmd($sock, $cmd, $expect) {
        if ($cmd) fwrite($sock, $cmd . "\r\n");
        $res = '';
        while ($line = fgets($sock, 512)) {
            $res .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return strpos($res, $expect) === 0;
    }

    fgets($sock, 512); // greeting
    if (!smtp_cmd($sock, "EHLO engpublish.com", '250')) { fclose($sock); return false; }
    if (!smtp_cmd($sock, "AUTH LOGIN", '334'))           { fclose($sock); return false; }
    if (!smtp_cmd($sock, base64_encode($username), '334')){ fclose($sock); return false; }
    if (!smtp_cmd($sock, base64_encode($password), '235')){ fclose($sock); return false; }
    if (!smtp_cmd($sock, "MAIL FROM:<{$from}>", '250'))  { fclose($sock); return false; }
    if (!smtp_cmd($sock, "RCPT TO:<{$to}>", '250'))      { fclose($sock); return false; }
    if (!smtp_cmd($sock, "DATA", '354'))                 { fclose($sock); return false; }

    $msg  = "From: ENG Publish <{$from}>\r\n";
    $msg .= "To: {$to}\r\n";
    $msg .= "Subject: {$subject}\r\n";
    $msg .= "Reply-To: {$replyTo}\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $msg .= $body . "\r\n.\r\n";

    fwrite($sock, $msg);
    $res = '';
    while ($line = fgets($sock, 512)) {
        $res .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }
    smtp_cmd($sock, "QUIT", '221');
    fclose($sock);
    return strpos($res, '250') === 0;
}
