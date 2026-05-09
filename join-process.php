<?php
declare(strict_types=1);

/**
 * ekhane HTML form theke data receive kore validate kore,
 *  tarpor success or error message shoho redirect kore.
 */

if($_SERVER['REQUEST_METHOD']!=='POST'){
    header('Location: join.html#join',true,303);
     exit;
}

$fullName=trim((string)($_POST['fullName']??''));
$email=trim((string)($_POST['email'] ?? ''));
$department = trim((string)($_POST['department']??''));
$interest=(string)($_POST['interest'] ?? '');
$message=trim((string)($_POST['message']??''));

$allowed=['iot', 'robotics', 'ai-ml', 'embedded'];

$ok = $fullName !== '' &&
    filter_var($email,FILTER_VALIDATE_EMAIL) !== false &&
    $department !=='' &&
    in_array($interest, $allowed, true) &&
    $message !== '';

if ($ok){
   
    header('Location: join.html?join_success=1#join',true,303);
    exit;
}

header('Location:join.html?join_error=1#join',true,303);
exit;
