<?php
declare(strict_types=1);

/**
 * Handles HACK join form POST. Validates all fields; on success redirects with join_success=1.
 * Serve this folder with PHP (e.g. php -S localhost:8080) so the form can post here.
 */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: lab02.html#join', true, 303);
    exit;
}

$fullName = trim((string)($_POST['fullName'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$department = trim((string)($_POST['department'] ?? ''));
$interest = (string)($_POST['interest'] ?? '');
$message = trim((string)($_POST['message'] ?? ''));

$allowedInterest = ['iot', 'robotics', 'ai-ml', 'embedded'];

$ok =
    $fullName !== '' &&
    filter_var($email, FILTER_VALIDATE_EMAIL) !== false &&
    $department !== '' &&
    in_array($interest, $allowedInterest, true) &&
    $message !== '';

if ($ok) {
    // You can log, send email, or save to DB here.
    header('Location: lab02.html?join_success=1#join', true, 303);
    exit;
}

header('Location: lab02.html?join_error=1#join', true, 303);
exit;
